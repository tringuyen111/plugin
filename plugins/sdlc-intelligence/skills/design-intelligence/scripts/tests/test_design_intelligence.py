import json
import subprocess
import sys
from pathlib import Path

import pytest

SCRIPT_DIR = Path(__file__).parents[1]
SKILL_DIR = SCRIPT_DIR.parent
SEARCH = SCRIPT_DIR / "search.py"
VALIDATE = SCRIPT_DIR / "validate_data.py"

sys.path.insert(0, str(SCRIPT_DIR))
from validate_data import DuplicateJsonKeyError, parse_json_object_strict  # noqa: E402


def run(*args):
    return subprocess.run([sys.executable, str(SEARCH), *args], text=True, capture_output=True)


def test_search_returns_traceable_accessibility_evidence():
    r = run("focus keyboard", "--domain", "ux", "-n", "2")
    assert r.returncode == 0
    assert "Source:" in r.stdout
    assert "Evidence authority:" in r.stdout
    assert "BUNDLED_SNAPSHOT" in r.stdout
    assert "Focus States" in r.stdout


def test_search_cli_exposes_retrieval_not_semantic_synthesis_or_persistence():
    r = run("--help")
    assert r.returncode == 0
    for forbidden in (
        "--design-system", "--variance", "--motion", "--density",
        "--persist", "--output-dir", "--page", "--force",
    ):
        assert forbidden not in r.stdout


def test_raw_no_match_preserves_no_match_instead_of_injecting_defaults():
    r = run("zzzxxyyqq nonexistentsignal", "--domain", "style")
    assert r.returncode == 0
    assert "NO_MATCH" in r.stdout
    assert "Glassmorphism" not in r.stdout


def test_reasoning_rows_are_traceable_advisory_evidence():
    r = run("B2B Service", "--domain", "reasoning", "-n", "2", "--json")
    assert r.returncode == 0
    data = json.loads(r.stdout)
    assert data["file"] == "ui-reasoning.csv"
    assert data["count"] >= 1
    assert data["evidence"]["authority"] == "ADVISORY_LOCAL_CORPUS"
    assert data["evidence"]["canonical"] is False
    assert any(row.get("UI_Category") == "B2B Service" for row in data["results"])


def test_stack_search_is_explicit_traceable_and_requires_current_verification():
    r = run("image optimization", "--stack", "nextjs", "-n", "1", "--json")
    assert r.returncode == 0
    data = json.loads(r.stdout)
    assert data["stack"] == "nextjs"
    assert data["file"] == "stacks/nextjs.csv"
    assert data["evidence"]["implementation_owner"] == "frontend-engineering"
    assert data["evidence"]["technical_guidance"] == "REQUIRES_CURRENT_VERIFICATION"
    assert data["evidence"]["freshness"] == "BUNDLED_SNAPSHOT"


def test_semantic_synthesis_helper_is_not_active_source():
    assert not (SCRIPT_DIR / "design_system.py").exists()


def test_strict_json_parser_rejects_duplicate_object_names():
    with pytest.raises(DuplicateJsonKeyError):
        parse_json_object_strict('{"must_have":"case-studies","must_have":"roi-messaging"}')


def test_data_validator_passes_normalized_corpus_and_manifest():
    r = subprocess.run([sys.executable, str(VALIDATE)], text=True, capture_output=True)
    assert r.returncode == 0, r.stdout + r.stderr
    assert "13 domain files" in r.stdout
    assert "source-manifest.json" in r.stdout


def test_pro_rules_are_advisory_not_delivery_authority():
    text = (SKILL_DIR / "references" / "pro-rules.md").read_text(encoding="utf-8").lower()
    assert "canonical — the only one" not in text
    assert "pre-delivery checklist" not in text
    assert "advisory evidence" in text


def test_quick_reference_duplicate_truth_is_removed():
    assert not (SKILL_DIR / "references" / "quick-reference.md").exists()


def test_react_domain_evidence_requires_frontend_owner_and_current_verification():
    r = run("react usememo rerender performance", "--domain", "react", "-n", "1", "--json")
    assert r.returncode == 0
    data = json.loads(r.stdout)
    assert data["evidence"]["implementation_owner"] == "frontend-engineering"
    assert data["evidence"]["technical_guidance"] == "REQUIRES_CURRENT_VERIFICATION"
    assert data["evidence"]["live_current_claim"] is False
