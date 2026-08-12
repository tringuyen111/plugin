#!/usr/bin/env python3
"""Verify persisted behavioral-evaluation evidence integrity.

This tool validates evidence structure, identity, path/hash bindings, and status
consistency. It does not score model semantic quality or invoke a model/provider.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
from typing import Any

VALID_TIERS = {"STANDARD", "ELEVATED", "CRITICAL"}
VALID_EXECUTION_ENVIRONMENTS = {"RUNTIME_ADVISORY", "SANDBOX_EXECUTABLE", "CANONICAL_SOURCE_QUALIFICATION"}
VALID_PROFILES = {
    "SANDBOX_OBSERVED",
    "SANDBOX_PROCEDURAL_COMPARISON",
    "RISK_SPECIFIC_ASSURANCE",
    "ATTESTED_INDEPENDENT",
}
VALID_ASSERTION_STATUS = {"PASS", "FAIL", "INCONCLUSIVE", "NOT_RUN"}
VALID_EVAL_STATUS = {"PASS", "DIRECTIONAL_PASS", "FAIL", "INCONCLUSIVE", "NOT_RUN"}
VALID_COMPARISON_STATUS = {"PASS", "DIRECTIONAL_PASS", "FAIL", "INCONCLUSIVE", "NOT_RUN", "NOT_APPLICABLE"}
VALID_EXECUTION_STATUS = {"EXECUTED", "ERROR", "NOT_RUN"}
VALID_VARIANTS = {"CANDIDATE", "BASELINE"}
PASSING_EVAL_STATUS = {"PASS", "DIRECTIONAL_PASS"}


def load_json(path: Path, errors: list[str], label: str) -> dict[str, Any]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"{label}: cannot parse JSON: {exc}")
        return {}
    if not isinstance(data, dict):
        errors.append(f"{label}: top-level value must be an object")
        return {}
    return data


def need_obj(value: Any, label: str, errors: list[str]) -> dict[str, Any]:
    if not isinstance(value, dict):
        errors.append(f"{label}: expected object")
        return {}
    return value


def need_list(value: Any, label: str, errors: list[str]) -> list[Any]:
    if not isinstance(value, list):
        errors.append(f"{label}: expected array")
        return []
    return value


def need_str(value: Any, label: str, errors: list[str]) -> str:
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{label}: expected non-empty string")
        return ""
    return value


def safe_relative(path_text: str) -> bool:
    try:
        p = PurePosixPath(path_text)
    except Exception:
        return False
    return bool(path_text) and not p.is_absolute() and ".." not in p.parts and "." != path_text


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def validate_suite(suite: dict[str, Any], errors: list[str]) -> tuple[dict[str, dict[str, Any]], bool]:
    if suite.get("schema_version") != 1:
        errors.append("suite.schema_version: expected 1")
    need_str(suite.get("suite_id"), "suite.suite_id", errors)
    artifact = need_obj(suite.get("artifact"), "suite.artifact", errors)
    need_str(artifact.get("id"), "suite.artifact.id", errors)
    need_str(artifact.get("revision"), "suite.artifact.revision", errors)
    need_str(suite.get("capability_claim"), "suite.capability_claim", errors)
    if suite.get("assurance_tier") not in VALID_TIERS:
        errors.append("suite.assurance_tier: invalid value")

    comparison = need_obj(suite.get("comparison"), "suite.comparison", errors)
    comparison_required = comparison.get("required")
    if not isinstance(comparison_required, bool):
        errors.append("suite.comparison.required: expected boolean")
        comparison_required = False
    baseline_kind = comparison.get("baseline_kind")
    if baseline_kind not in {"NONE", "WITHOUT_SKILL", "PREVIOUS_REVISION"}:
        errors.append("suite.comparison.baseline_kind: invalid value")
    if comparison_required and baseline_kind == "NONE":
        errors.append("suite.comparison: required comparison cannot use baseline_kind NONE")
    if not comparison_required and baseline_kind != "NONE":
        errors.append("suite.comparison: non-required comparison must use baseline_kind NONE")
    if baseline_kind == "PREVIOUS_REVISION":
        baseline_revision = need_str(comparison.get("baseline_revision"), "suite.comparison.baseline_revision", errors)
        if baseline_revision and baseline_revision == artifact.get("revision"):
            errors.append("suite.comparison.baseline_revision: must differ from candidate artifact revision")
    elif "baseline_revision" in comparison:
        errors.append("suite.comparison.baseline_revision: allowed only for PREVIOUS_REVISION")

    cases_by_id: dict[str, dict[str, Any]] = {}
    for idx, case_any in enumerate(need_list(suite.get("cases"), "suite.cases", errors)):
        case = need_obj(case_any, f"suite.cases[{idx}]", errors)
        case_id = need_str(case.get("case_id"), f"suite.cases[{idx}].case_id", errors)
        if case_id in cases_by_id:
            errors.append(f"suite.cases: duplicate case_id {case_id}")
        elif case_id:
            cases_by_id[case_id] = case
        input_obj = need_obj(case.get("input"), f"suite.cases[{idx}].input", errors)
        need_str(input_obj.get("prompt"), f"suite.cases[{idx}].input.prompt", errors)
        invariants = need_list(case.get("invariants"), f"suite.cases[{idx}].invariants", errors)
        if not invariants:
            errors.append(f"suite.cases[{idx}].invariants: at least one invariant required")
        seen_inv: set[str] = set()
        for j, inv_any in enumerate(invariants):
            inv = need_obj(inv_any, f"suite.cases[{idx}].invariants[{j}]", errors)
            inv_id = need_str(inv.get("invariant_id"), f"suite.cases[{idx}].invariants[{j}].invariant_id", errors)
            need_str(inv.get("criterion"), f"suite.cases[{idx}].invariants[{j}].criterion", errors)
            if not isinstance(inv.get("critical"), bool):
                errors.append(f"suite.cases[{idx}].invariants[{j}].critical: expected boolean")
            if inv_id in seen_inv:
                errors.append(f"suite case {case_id}: duplicate invariant_id {inv_id}")
            seen_inv.add(inv_id)
    if not cases_by_id:
        errors.append("suite.cases: at least one valid case required")
    return cases_by_id, bool(comparison_required)


def validate_report(
    suite: dict[str, Any],
    report: dict[str, Any],
    cases_by_id: dict[str, dict[str, Any]],
    comparison_required: bool,
    evidence_root: Path,
    errors: list[str],
) -> dict[str, int]:
    if report.get("schema_version") != 1:
        errors.append("report.schema_version: expected 1")
    need_str(report.get("evaluation_id"), "report.evaluation_id", errors)
    if report.get("suite_id") != suite.get("suite_id"):
        errors.append("report.suite_id: does not match suite")
    report_artifact = need_obj(report.get("artifact"), "report.artifact", errors)
    suite_artifact = need_obj(suite.get("artifact"), "suite.artifact", errors)
    if report_artifact.get("id") != suite_artifact.get("id"):
        errors.append("report.artifact.id: does not match suite")
    if report_artifact.get("revision") != suite_artifact.get("revision"):
        errors.append("report.artifact.revision: does not match suite")

    execution_environment = report.get("execution_environment")
    if execution_environment not in VALID_EXECUTION_ENVIRONMENTS:
        errors.append("report.execution_environment: invalid value")

    profile = report.get("evidence_profile")
    if execution_environment == "RUNTIME_ADVISORY":
        if profile is not None:
            errors.append("report.evidence_profile: RUNTIME_ADVISORY requires null because no evidence profile executed")
    elif profile not in VALID_PROFILES:
        errors.append("report.evidence_profile: executable environment requires an active evidence profile")

    independent = report.get("independent_claim_supported")
    if not isinstance(independent, bool):
        errors.append("report.independent_claim_supported: expected boolean")
        independent = False
    if independent and profile != "ATTESTED_INDEPENDENT":
        errors.append("report: independent claim requires ATTESTED_INDEPENDENT profile")
    if profile in {"SANDBOX_OBSERVED", "SANDBOX_PROCEDURAL_COMPARISON", "RISK_SPECIFIC_ASSURANCE"} and independent:
        errors.append("report: sandbox/risk-specific evidence cannot claim independent provenance")
    if execution_environment == "RUNTIME_ADVISORY" and independent:
        errors.append("report: RUNTIME_ADVISORY cannot claim independent provenance")

    runtime_value = report.get("runtime")
    if execution_environment == "RUNTIME_ADVISORY":
        if runtime_value is not None:
            errors.append("report.runtime: RUNTIME_ADVISORY requires null runtime identity")
    else:
        runtime = need_obj(runtime_value, "report.runtime", errors)
        for key in ("adapter_id", "host", "model"):
            need_str(runtime.get(key), f"report.runtime.{key}", errors)

    execution_by_key: dict[tuple[str, str], dict[str, Any]] = {}
    raw_verified = 0
    for idx, ex_any in enumerate(need_list(report.get("executions"), "report.executions", errors)):
        ex = need_obj(ex_any, f"report.executions[{idx}]", errors)
        case_id = need_str(ex.get("case_id"), f"report.executions[{idx}].case_id", errors)
        variant = ex.get("variant")
        status = ex.get("status")
        if case_id not in cases_by_id:
            errors.append(f"report.executions[{idx}]: unknown case_id {case_id}")
        if variant not in VALID_VARIANTS:
            errors.append(f"report.executions[{idx}].variant: invalid value")
        if status not in VALID_EXECUTION_STATUS:
            errors.append(f"report.executions[{idx}].status: invalid value")
        key = (case_id, variant)
        if key in execution_by_key:
            errors.append(f"report.executions: duplicate execution {case_id}/{variant}")
        else:
            execution_by_key[key] = ex

        if status == "EXECUTED":
            path_text = need_str(ex.get("raw_output_path"), f"report.executions[{idx}].raw_output_path", errors)
            expected_hash = need_str(ex.get("raw_output_sha256"), f"report.executions[{idx}].raw_output_sha256", errors)
            if expected_hash and (len(expected_hash) != 64 or any(c not in "0123456789abcdef" for c in expected_hash)):
                errors.append(f"report.executions[{idx}].raw_output_sha256: expected lowercase SHA-256")
            if path_text:
                if not safe_relative(path_text):
                    errors.append(f"report.executions[{idx}].raw_output_path: unsafe relative path")
                else:
                    resolved = (evidence_root / PurePosixPath(path_text)).resolve()
                    try:
                        resolved.relative_to(evidence_root)
                    except ValueError:
                        errors.append(f"report.executions[{idx}].raw_output_path: escapes evidence root")
                    else:
                        if not resolved.is_file():
                            errors.append(f"report.executions[{idx}].raw_output_path: missing file {path_text}")
                        elif expected_hash:
                            actual = sha256_file(resolved)
                            if actual != expected_hash:
                                errors.append(f"report.executions[{idx}].raw_output_sha256: mismatch for {path_text}")
                            else:
                                raw_verified += 1
        elif status == "ERROR":
            need_str(ex.get("error"), f"report.executions[{idx}].error", errors)

    review_by_key: dict[tuple[str, str], dict[str, Any]] = {}
    candidate_reviews_pass = True
    candidate_critical_nonpass = False
    for idx, rev_any in enumerate(need_list(report.get("reviews"), "report.reviews", errors)):
        rev = need_obj(rev_any, f"report.reviews[{idx}]", errors)
        case_id = need_str(rev.get("case_id"), f"report.reviews[{idx}].case_id", errors)
        variant = rev.get("variant")
        overall = rev.get("overall_status")
        if case_id not in cases_by_id:
            errors.append(f"report.reviews[{idx}]: unknown case_id {case_id}")
            case = {}
        else:
            case = cases_by_id[case_id]
        if variant not in VALID_VARIANTS:
            errors.append(f"report.reviews[{idx}].variant: invalid value")
        if overall not in VALID_ASSERTION_STATUS:
            errors.append(f"report.reviews[{idx}].overall_status: invalid value")
        key = (case_id, variant)
        if key in review_by_key:
            errors.append(f"report.reviews: duplicate review {case_id}/{variant}")
        else:
            review_by_key[key] = rev

        if execution_by_key.get(key, {}).get("status") != "EXECUTED" and overall in {"PASS", "FAIL", "INCONCLUSIVE"}:
            errors.append(f"report.reviews[{idx}]: semantic review requires EXECUTED raw output for {case_id}/{variant}")

        expected_inv = {inv.get("invariant_id"): inv for inv in case.get("invariants", []) if isinstance(inv, dict)}
        seen: set[str] = set()
        statuses: list[str] = []
        for j, a_any in enumerate(need_list(rev.get("assertions"), f"report.reviews[{idx}].assertions", errors)):
            assertion = need_obj(a_any, f"report.reviews[{idx}].assertions[{j}]", errors)
            inv_id = need_str(assertion.get("invariant_id"), f"report.reviews[{idx}].assertions[{j}].invariant_id", errors)
            status = assertion.get("status")
            if inv_id not in expected_inv:
                errors.append(f"report.reviews[{idx}]: unknown invariant_id {inv_id}")
            if inv_id in seen:
                errors.append(f"report.reviews[{idx}]: duplicate invariant_id {inv_id}")
            seen.add(inv_id)
            if status not in VALID_ASSERTION_STATUS:
                errors.append(f"report.reviews[{idx}].assertions[{j}].status: invalid value")
            else:
                statuses.append(status)
                if variant == "CANDIDATE" and expected_inv.get(inv_id, {}).get("critical") and status != "PASS":
                    candidate_critical_nonpass = True
        missing_inv = sorted(set(expected_inv) - seen)
        if missing_inv:
            errors.append(f"report.reviews[{idx}]: missing invariant reviews: {', '.join(missing_inv)}")
        if overall == "PASS" and any(s != "PASS" for s in statuses):
            errors.append(f"report.reviews[{idx}]: overall PASS requires every assertion PASS")
        if variant == "CANDIDATE" and overall != "PASS":
            candidate_reviews_pass = False

    evaluation_status = report.get("evaluation_status")
    if evaluation_status not in VALID_EVAL_STATUS:
        errors.append("report.evaluation_status: invalid value")
    promotion_gate = report.get("promotion_gate")
    if promotion_gate not in {"ELIGIBLE", "BLOCKED"}:
        errors.append("report.promotion_gate: invalid value")
    blockers = need_list(report.get("blockers"), "report.blockers", errors)

    comparison = need_obj(report.get("comparison"), "report.comparison", errors)
    comparison_status = comparison.get("status")
    if comparison_status not in VALID_COMPARISON_STATUS:
        errors.append("report.comparison.status: invalid value")
    if not isinstance(comparison.get("material_regression"), bool):
        errors.append("report.comparison.material_regression: expected boolean")

    for case_id in cases_by_id:
        if evaluation_status in PASSING_EVAL_STATUS:
            if execution_by_key.get((case_id, "CANDIDATE"), {}).get("status") != "EXECUTED":
                errors.append(f"report: passing evaluation missing executed candidate output for {case_id}")
            if review_by_key.get((case_id, "CANDIDATE"), {}).get("overall_status") != "PASS":
                errors.append(f"report: passing evaluation missing PASS candidate review for {case_id}")
        if comparison_required and comparison_status in {"PASS", "DIRECTIONAL_PASS"}:
            if execution_by_key.get((case_id, "BASELINE"), {}).get("status") != "EXECUTED":
                errors.append(f"report: passing comparison missing executed baseline output for {case_id}")
            if (case_id, "BASELINE") not in review_by_key:
                errors.append(f"report: passing comparison missing baseline review for {case_id}")

    if evaluation_status in PASSING_EVAL_STATUS and candidate_critical_nonpass:
        errors.append("report: passing evaluation cannot contain a non-PASS critical candidate invariant")
    if evaluation_status in PASSING_EVAL_STATUS and not candidate_reviews_pass:
        errors.append("report: passing evaluation requires PASS candidate reviews")

    if comparison_required and evaluation_status in PASSING_EVAL_STATUS and comparison_status not in {"PASS", "DIRECTIONAL_PASS"}:
        errors.append("report: passing evaluation with required comparison requires PASS or DIRECTIONAL_PASS comparison")
    if not comparison_required and comparison_status not in {"NOT_APPLICABLE", "NOT_RUN"}:
        errors.append("report: comparison not required but report claims a comparison verdict")

    if comparison_status == "DIRECTIONAL_PASS" and profile not in {"SANDBOX_PROCEDURAL_COMPARISON", "RISK_SPECIFIC_ASSURANCE"}:
        errors.append("report: DIRECTIONAL_PASS requires SANDBOX_PROCEDURAL_COMPARISON or RISK_SPECIFIC_ASSURANCE")
    if comparison_status == "PASS" and (profile != "ATTESTED_INDEPENDENT" or not independent):
        errors.append("report: comparison PASS requires ATTESTED_INDEPENDENT with independent claim support")

    if execution_environment == "RUNTIME_ADVISORY":
        for (case_id, variant), execution in execution_by_key.items():
            if execution.get("status") != "NOT_RUN":
                errors.append(f"report: RUNTIME_ADVISORY requires NOT_RUN execution for {case_id}/{variant}")
        for (case_id, variant), review in review_by_key.items():
            if review.get("overall_status") != "NOT_RUN":
                errors.append(f"report: RUNTIME_ADVISORY requires NOT_RUN review for {case_id}/{variant}")
            for assertion in review.get("assertions", []):
                if isinstance(assertion, dict) and assertion.get("status") != "NOT_RUN":
                    errors.append(f"report: RUNTIME_ADVISORY requires NOT_RUN assertions for {case_id}/{variant}")
        if evaluation_status != "NOT_RUN":
            errors.append("report: RUNTIME_ADVISORY requires evaluation_status NOT_RUN")
        if comparison_required and comparison_status != "NOT_RUN":
            errors.append("report: RUNTIME_ADVISORY with required comparison requires comparison status NOT_RUN")
        if not comparison_required and comparison_status not in {"NOT_RUN", "NOT_APPLICABLE"}:
            errors.append("report: RUNTIME_ADVISORY without required comparison permits only NOT_RUN or NOT_APPLICABLE comparison")
        if promotion_gate != "BLOCKED":
            errors.append("report: RUNTIME_ADVISORY requires promotion_gate BLOCKED")

    if promotion_gate == "ELIGIBLE":
        if evaluation_status not in PASSING_EVAL_STATUS:
            errors.append("report: ELIGIBLE promotion gate requires PASS or DIRECTIONAL_PASS evaluation status")
        if candidate_critical_nonpass or not candidate_reviews_pass:
            errors.append("report: ELIGIBLE promotion gate requires passing candidate invariants")
        if blockers:
            errors.append("report: ELIGIBLE promotion gate requires no blockers")
    elif promotion_gate == "BLOCKED" and evaluation_status not in PASSING_EVAL_STATUS and not blockers:
        errors.append("report: BLOCKED non-passing evaluation requires at least one blocker")

    return {
        "cases": len(cases_by_id),
        "executions": len(execution_by_key),
        "reviews": len(review_by_key),
        "raw_outputs_verified": raw_verified,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description="Verify SDLC behavioral-evaluation evidence integrity; does not score model semantics.")
    ap.add_argument("--suite", required=True, type=Path)
    ap.add_argument("--report", required=True, type=Path)
    ap.add_argument("--evidence-root", required=True, type=Path)
    args = ap.parse_args()

    errors: list[str] = []
    suite_path = args.suite.resolve()
    report_path = args.report.resolve()
    evidence_root = args.evidence_root.resolve()
    if not evidence_root.is_dir():
        errors.append(f"evidence root is not a directory: {evidence_root}")

    suite = load_json(suite_path, errors, "suite")
    report = load_json(report_path, errors, "report")
    cases_by_id, comparison_required = validate_suite(suite, errors)
    stats = validate_report(suite, report, cases_by_id, comparison_required, evidence_root, errors)

    result = {
        "status": "PASS" if not errors else "FAIL",
        "errors": errors,
        "stats": stats,
        "evidence_boundary": "machine/evidence integrity only; model semantic quality and provider/runtime availability are not evaluated",
    }
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
