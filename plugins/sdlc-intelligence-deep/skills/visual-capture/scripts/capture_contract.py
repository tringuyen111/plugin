"""Deterministic contracts for the shared visual-capture evidence adapter."""

from __future__ import annotations

import hashlib
import json
import os
import re
from pathlib import Path
from typing import Any, Mapping

SCHEMA_VERSION = 4
MANIFEST_SCHEMA_VERSION = 4
INTENTS = {"documentation", "visual-conformance", "design-parity", "evidence"}
DEVICES = {
    "mobile": {"width": 375, "height": 812},
    "tablet": {"width": 768, "height": 1024},
    "desktop": {"width": 1440, "height": 960},
}
CAPTURE_MODES = {"viewport", "full-page", "element", "clip"}
CALLOUT_TYPES = {"box", "number", "label"}
CALLOUT_DIRECTIONS = {"left", "right", "top", "bottom"}
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
ENV_RE = re.compile(r"^[A-Z_][A-Z0-9_]*$")
COLOR_RE = re.compile(r"^#[0-9a-fA-F]{6}$")
SHA256_RE = re.compile(r"^[0-9a-f]{64}$")
LOCAL_EXECUTOR_PROVIDER = "chromium"
LOCAL_EXECUTOR_SOURCE_KIND = "local_adapter"
LOCAL_EXECUTOR_SOURCE_ID = "visual-capture-playwright"
CAPABILITY_RESOLUTION_SCHEMA_VERSION = 4
CAPTURE_CAPABILITY = "browser.capture"
CAPTURE_SIDE_EFFECT_CLASS = "LOCAL_WRITE"
ADMISSIBLE_RESOLUTION_STATUSES = {"READY"}
ADMISSIBLE_RESOLUTION_AVAILABILITY = {"AVAILABLE"}


def _validate_capability_resolution(binding: Any, *, label: str, findings: list[str]) -> None:
    if not isinstance(binding, Mapping):
        findings.append(f"{label} must be an object")
        return
    if set(binding) - {"record_ref", "record_sha256"}:
        findings.append(f"{label} contains unsupported fields")
    record_ref = binding.get("record_ref")
    if not isinstance(record_ref, str) or not record_ref:
        findings.append(f"{label}.record_ref must be a non-empty string")
    digest = binding.get("record_sha256")
    if not isinstance(digest, str) or not SHA256_RE.match(digest):
        findings.append(f"{label}.record_sha256 must be a lowercase SHA-256 digest")


def _validate_executor(executor: Any, *, label: str, findings: list[str]) -> None:
    if not isinstance(executor, Mapping):
        findings.append(f"{label} must be an object")
        return
    allowed = {"provider", "source_kind", "source_id", "namespace", "revision"}
    if set(executor) - allowed:
        findings.append(f"{label} contains unsupported fields")
    provider = executor.get("provider")
    if not isinstance(provider, str) or not provider:
        findings.append(f"{label}.provider must be a non-empty string")
    kind = executor.get("source_kind")
    if kind not in {"mcp", "connector", "native_tool", "api", "cli", "local_adapter"}:
        findings.append(f"{label}.source_kind is invalid")
    source_id = executor.get("source_id")
    if not isinstance(source_id, str) or not source_id:
        findings.append(f"{label}.source_id must be a non-empty string")
    for field in ("namespace", "revision"):
        value = executor.get(field)
        if value is not None and not isinstance(value, str):
            findings.append(f"{label}.{field} must be a string or null")


def validate_local_executor_binding(executor: Mapping[str, Any]) -> None:
    expected = {
        "provider": LOCAL_EXECUTOR_PROVIDER,
        "source_kind": LOCAL_EXECUTOR_SOURCE_KIND,
        "source_id": LOCAL_EXECUTOR_SOURCE_ID,
    }
    mismatches = [f"{key}={executor.get(key)!r} expected {value!r}" for key, value in expected.items() if executor.get(key) != value]
    if mismatches:
        raise ValueError("selected executor does not bind to this local adapter: " + "; ".join(mismatches))


def resolution_record_path(record_ref: str, root: Path) -> Path:
    path = Path(record_ref)
    if not path.is_absolute():
        path = (root / path).resolve()
    return path


def validate_resolution_record_binding(
    binding: Mapping[str, Any],
    executor: Mapping[str, Any],
    *,
    root: Path,
) -> dict[str, Any]:
    """Reopen and verify the exact capability-resolution record before browser work."""
    record_ref = str(binding["record_ref"])
    record_path = resolution_record_path(record_ref, root)
    if not record_path.exists() or not record_path.is_file():
        raise ValueError(f"capability-resolution record is not a readable file: {record_ref}")
    raw = record_path.read_bytes()
    actual_sha256 = hashlib.sha256(raw).hexdigest()
    if actual_sha256 != binding["record_sha256"]:
        raise ValueError("capability-resolution record_sha256 does not match exact record bytes")
    try:
        record = json.loads(raw)
    except json.JSONDecodeError as error:
        raise ValueError(f"capability-resolution record is invalid JSON: {error.msg}") from error
    if not isinstance(record, Mapping):
        raise ValueError("capability-resolution record must be a JSON object")
    if record.get("schema_version") != CAPABILITY_RESOLUTION_SCHEMA_VERSION:
        raise ValueError(f"capability-resolution record must use schema_version {CAPABILITY_RESOLUTION_SCHEMA_VERSION}")
    if record.get("capability") != CAPTURE_CAPABILITY:
        raise ValueError(f"capability-resolution capability must be {CAPTURE_CAPABILITY}")
    if record.get("status") not in ADMISSIBLE_RESOLUTION_STATUSES:
        raise ValueError(f"capability-resolution status {record.get('status')!r} is not capture-admissible")
    if record.get("availability") not in ADMISSIBLE_RESOLUTION_AVAILABILITY:
        raise ValueError(f"capability-resolution availability {record.get('availability')!r} is not capture-admissible")
    if record.get("side_effect_class") != CAPTURE_SIDE_EFFECT_CLASS:
        raise ValueError(f"capability-resolution side_effect_class must be {CAPTURE_SIDE_EFFECT_CLASS}")
    if record.get("side_effect_match") is not True:
        raise ValueError("capability-resolution side_effect_match must be true")
    if record.get("profile_conflict") is not False:
        raise ValueError("capability-resolution profile_conflict must be false")
    if record.get("provider") != executor.get("provider"):
        raise ValueError("capability-resolution provider does not match selected executor")
    source = record.get("provider_source")
    if not isinstance(source, Mapping):
        raise ValueError("capability-resolution provider_source must be a selected source object")
    expected_source = {
        "kind": executor.get("source_kind"),
        "id": executor.get("source_id"),
        "namespace": executor.get("namespace"),
        "revision": executor.get("revision"),
    }
    mismatches = [
        f"{field}={source.get(field)!r} expected {expected!r}"
        for field, expected in expected_source.items()
        if source.get(field) != expected
    ]
    if mismatches:
        raise ValueError("capability-resolution provider_source does not match selected executor: " + "; ".join(mismatches))
    return dict(record)


def adapter_source_sha256(base: Path | None = None) -> str:
    base = Path(__file__).resolve().parent if base is None else base.resolve()
    digest = hashlib.sha256()
    for name in ("capture.py", "capture_contract.py"):
        path = base / name
        digest.update(name.encode("utf-8"))
        digest.update(b"\0")
        digest.update(path.read_bytes())
        digest.update(b"\0")
    return digest.hexdigest()


def _is_int(value: Any) -> bool:
    return isinstance(value, int) and not isinstance(value, bool)


def _positive_int(value: Any) -> bool:
    return _is_int(value) and value > 0


def _non_negative_number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool) and value >= 0


def normalize_viewport(value: Any) -> dict[str, int]:
    if value is None:
        return dict(DEVICES["desktop"])
    if isinstance(value, str):
        if value not in DEVICES:
            raise ValueError(f"unknown device: {value}")
        return dict(DEVICES[value])
    if isinstance(value, Mapping):
        width, height = value.get("width"), value.get("height")
        if not (_positive_int(width) and _positive_int(height)):
            raise ValueError("viewport width and height must be positive integers")
        return {"width": width, "height": height}
    raise ValueError("viewport must be a named device or width/height object")


def normalize_capture(value: Any) -> dict[str, Any]:
    if value is None:
        return {"mode": "viewport"}
    if not isinstance(value, Mapping):
        raise ValueError("capture must be an object")
    mode = value.get("mode")
    if mode not in CAPTURE_MODES:
        raise ValueError(f"capture.mode must be one of {sorted(CAPTURE_MODES)}")
    result: dict[str, Any] = {"mode": mode}
    if mode == "element":
        selector = value.get("selector")
        if not isinstance(selector, str) or not selector:
            raise ValueError("capture.selector is required for element mode")
        padding = value.get("padding", 16)
        if not _non_negative_number(padding):
            raise ValueError("capture.padding must be a non-negative number")
        result.update({"selector": selector, "padding": float(padding)})
    elif mode == "clip":
        clip = value.get("rect")
        if not isinstance(clip, Mapping):
            raise ValueError("capture.rect is required for clip mode")
        for key in ("x", "y", "width", "height"):
            current = clip.get(key)
            if not _non_negative_number(current) or (key in {"width", "height"} and current <= 0):
                raise ValueError(f"capture.rect.{key} must be a {'positive' if key in {'width', 'height'} else 'non-negative'} number")
        result["rect"] = {key: float(clip[key]) for key in ("x", "y", "width", "height")}
    return result


def _validate_step(step: Any, *, login: bool, label: str, findings: list[str]) -> None:
    if not isinstance(step, Mapping):
        findings.append(f"{label} must be an object")
        return
    actions = [key for key in ("fill", "click", "waitUrl", "waitFor", "scrollTo", "waitMs") if key in step]
    if len(actions) != 1:
        findings.append(f"{label} must define exactly one supported action")
        return
    if "thenWaitMs" in step and (not _is_int(step["thenWaitMs"]) or step["thenWaitMs"] < 0):
        findings.append(f"{label}.thenWaitMs must be a non-negative integer")
    if "fill" in step:
        if not isinstance(step["fill"], str) or not step["fill"]:
            findings.append(f"{label}.fill must be a non-empty selector")
        has_literal = "value" in step
        has_env = "valueFromEnv" in step
        if login and has_literal:
            findings.append(f"{label} cannot store a literal login value; use valueFromEnv")
        if has_literal == has_env:
            findings.append(f"{label} fill must define exactly one of value or valueFromEnv")
        if has_env and (not isinstance(step["valueFromEnv"], str) or not ENV_RE.match(step["valueFromEnv"])):
            findings.append(f"{label}.valueFromEnv must be an uppercase environment variable name")
    elif "waitMs" in step and (not _is_int(step["waitMs"]) or step["waitMs"] < 0):
        findings.append(f"{label}.waitMs must be a non-negative integer")
    elif "scrollTo" in step and not _is_int(step["scrollTo"]):
        findings.append(f"{label}.scrollTo must be an integer")
    else:
        action = actions[0]
        if action not in {"waitMs", "scrollTo"} and (not isinstance(step[action], str) or not step[action]):
            findings.append(f"{label}.{action} must be a non-empty string")


def _validate_selector_expectation(item: Any, *, label: str, findings: list[str]) -> None:
    if not isinstance(item, Mapping):
        findings.append(f"{label} must be an object")
        return
    selector = item.get("selector")
    if not isinstance(selector, str) or not selector:
        findings.append(f"{label}.selector must be a non-empty string")
    if "required" in item and not isinstance(item["required"], bool):
        findings.append(f"{label}.required must be a boolean")
    expected = item.get("expected_matches", 1)
    if not _positive_int(expected):
        findings.append(f"{label}.expected_matches must be a positive integer")
    color = item.get("color")
    if color is not None and (not isinstance(color, str) or not COLOR_RE.match(color)):
        findings.append(f"{label}.color must be a six-digit hex color")


def _validate_mask(mask: Any, *, label: str, findings: list[str]) -> None:
    _validate_selector_expectation(mask, label=label, findings=findings)
    if not isinstance(mask, Mapping):
        return
    if set(mask) - {"selector", "required", "expected_matches", "color"}:
        findings.append(f"{label} contains unsupported fields")


def _validate_callout(callout: Any, *, label: str, findings: list[str]) -> None:
    _validate_selector_expectation(callout, label=label, findings=findings)
    if not isinstance(callout, Mapping):
        return
    kind = callout.get("type")
    if kind not in CALLOUT_TYPES:
        findings.append(f"{label}.type must be one of {sorted(CALLOUT_TYPES)}")
    if kind == "label" and (not isinstance(callout.get("text"), str) or not callout.get("text")):
        findings.append(f"{label}.text is required for label callouts")
    if kind == "number" and not _positive_int(callout.get("n")):
        findings.append(f"{label}.n must be a positive integer for number callouts")
    direction = callout.get("dir", "left")
    if direction not in CALLOUT_DIRECTIONS:
        findings.append(f"{label}.dir must be one of {sorted(CALLOUT_DIRECTIONS)}")
    if "leader_line" in callout and not isinstance(callout["leader_line"], bool):
        findings.append(f"{label}.leader_line must be a boolean")
    supported = {"selector", "required", "expected_matches", "type", "text", "n", "dir", "color", "leader_line"}
    if set(callout) - supported:
        findings.append(f"{label} contains unsupported fields")


def validate_job(job: Any) -> list[str]:
    findings: list[str] = []
    if not isinstance(job, Mapping):
        return ["job must be a JSON object"]
    if job.get("schema_version") != SCHEMA_VERSION:
        findings.append(f"schema_version must be {SCHEMA_VERSION}")
    if "capability_resolution" in job:
        _validate_capability_resolution(job.get("capability_resolution"), label="capability_resolution", findings=findings)
    _validate_executor(job.get("executor"), label="executor", findings=findings)
    if job.get("intent") not in INTENTS:
        findings.append(f"intent must be one of {sorted(INTENTS)}")
    if not isinstance(job.get("environment"), str) or not job.get("environment"):
        findings.append("environment must be a non-empty string")
    if job.get("application_commit") is not None and not isinstance(job.get("application_commit"), str):
        findings.append("application_commit must be a string or null")
    if job.get("outDir") is not None and (not isinstance(job.get("outDir"), str) or not job.get("outDir")):
        findings.append("outDir must be a non-empty string")
    try:
        normalize_viewport(job.get("device"))
    except ValueError as error:
        findings.append(f"device: {error}")

    login = job.get("login")
    if login is not None:
        if not isinstance(login, Mapping):
            findings.append("login must be an object")
        else:
            has_storage = "storageStatePathFromEnv" in login
            has_script = "url" in login or "html" in login or "steps" in login
            if has_storage == has_script:
                findings.append("login must define either storageStatePathFromEnv or one source plus steps")
            if has_storage:
                env_name = login.get("storageStatePathFromEnv")
                if not isinstance(env_name, str) or not ENV_RE.match(env_name):
                    findings.append("login.storageStatePathFromEnv must be an uppercase environment variable name")
            if has_script:
                sources = [key for key in ("html", "url") if login.get(key)]
                if len(sources) != 1:
                    findings.append("login must define exactly one of html or url")
                steps = login.get("steps")
                if not isinstance(steps, list) or not steps:
                    findings.append("login.steps must be a non-empty array")
                else:
                    for index, step in enumerate(steps):
                        _validate_step(step, login=True, label=f"login.steps[{index}]", findings=findings)

    shots = job.get("shots")
    if not isinstance(shots, list) or not shots:
        findings.append("shots must be a non-empty array")
        return findings
    slugs: set[str] = set()
    for index, shot in enumerate(shots):
        label = f"shots[{index}]"
        if not isinstance(shot, Mapping):
            findings.append(f"{label} must be an object")
            continue
        slug = shot.get("slug")
        if not isinstance(slug, str) or not SLUG_RE.match(slug):
            findings.append(f"{label}.slug must be kebab-case")
        elif slug in slugs:
            findings.append(f"duplicate shot slug: {slug}")
        else:
            slugs.add(slug)
        sources = [key for key in ("html", "url") if shot.get(key)]
        if len(sources) != 1:
            findings.append(f"{label} must define exactly one of html or url")
        if not isinstance(shot.get("state"), str) or not shot.get("state"):
            findings.append(f"{label}.state must be a non-empty string")
        if shot.get("frame") is not None and (not isinstance(shot.get("frame"), str) or not shot.get("frame")):
            findings.append(f"{label}.frame must be a non-empty URL substring")
        for wait_field in ("waitMs",):
            if wait_field in shot and (not _is_int(shot[wait_field]) or shot[wait_field] < 0):
                findings.append(f"{label}.{wait_field} must be a non-negative integer")
        if shot.get("waitFor") is not None and (not isinstance(shot.get("waitFor"), str) or not shot.get("waitFor")):
            findings.append(f"{label}.waitFor must be a non-empty selector")
        try:
            normalize_viewport(shot.get("device", job.get("device")))
        except ValueError as error:
            findings.append(f"{label}.device: {error}")
        try:
            normalize_capture(shot.get("capture"))
        except ValueError as error:
            findings.append(f"{label}.{error}")
        steps = shot.get("steps", [])
        if not isinstance(steps, list):
            findings.append(f"{label}.steps must be an array")
        else:
            for step_index, step in enumerate(steps):
                _validate_step(step, login=False, label=f"{label}.steps[{step_index}]", findings=findings)
        callouts = shot.get("callouts", [])
        if not isinstance(callouts, list):
            findings.append(f"{label}.callouts must be an array")
        else:
            for callout_index, callout in enumerate(callouts):
                _validate_callout(callout, label=f"{label}.callouts[{callout_index}]", findings=findings)
        masks = shot.get("masks", [])
        if not isinstance(masks, list):
            findings.append(f"{label}.masks must be an array")
        else:
            for mask_index, mask in enumerate(masks):
                _validate_mask(mask, label=f"{label}.masks[{mask_index}]", findings=findings)
        allowed = {
            "slug", "state", "html", "url", "device", "steps", "callouts", "masks", "capture",
            "frame", "waitMs", "waitFor",
        }
        if set(shot) - allowed:
            findings.append(f"{label} contains unsupported fields: {sorted(set(shot) - allowed)}")
    allowed_job = {"schema_version", "capability_resolution", "executor", "intent", "environment", "application_commit", "device", "login", "shots", "outDir"}
    if set(job) - allowed_job:
        findings.append(f"job contains unsupported fields: {sorted(set(job) - allowed_job)}")
    return findings


def resolve_step_value(step: Mapping[str, Any], env: Mapping[str, str] | None = None) -> str:
    if "valueFromEnv" in step:
        source = os.environ if env is None else env
        key = step["valueFromEnv"]
        if key not in source:
            raise KeyError(f"missing environment variable: {key}")
        return source[key]
    return str(step.get("value", ""))


def summarize_steps(steps: list[Mapping[str, Any]] | None) -> list[dict[str, Any]]:
    summary: list[dict[str, Any]] = []
    for step in steps or []:
        if "fill" in step:
            summary.append({"action": "fill", "selector": step["fill"], "value_source": "env" if "valueFromEnv" in step else "literal"})
        else:
            action = next((key for key in ("click", "waitUrl", "waitFor", "scrollTo", "waitMs") if key in step), "unknown")
            summary.append({"action": action, "target": step.get(action)})
    return summary


def source_content_sha256(shot: Mapping[str, Any], root: Path | None = None) -> str | None:
    html = shot.get("html")
    if not isinstance(html, str) or not html:
        return None
    path = Path(html)
    if not path.is_absolute() and root is not None:
        path = (root / path).resolve()
    if not path.is_absolute() or not path.exists() or not path.is_file():
        return None
    return file_sha256(path)


def canonical_shot_digest(job: Mapping[str, Any], shot: Mapping[str, Any], *, root: Path | None = None) -> str:
    payload = {
        "schema_version": job.get("schema_version"),
        "capability_resolution": job.get("capability_resolution"),
        "executor": job.get("executor"),
        "intent": job.get("intent"),
        "environment": job.get("environment"),
        "application_commit": job.get("application_commit"),
        "shot": shot,
        "source_content_sha256": source_content_sha256(shot, root),
    }
    encoded = json.dumps(payload, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def file_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()
