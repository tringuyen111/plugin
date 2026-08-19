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
from design_system import DesignSystemGenerator  # noqa: E402
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


def test_design_recommendation_has_no_persistence_cli():
    r = run("--help")
    assert r.returncode == 0
    for forbidden in ("--persist", "--output-dir", "--page", "--force"):
        assert forbidden not in r.stdout


def test_application_recommendation_avoids_landing_hero_cta_structure():
    r = run("B2B operations dashboard", "--design-system", "--format", "markdown")
    assert r.returncode == 0
    text = r.stdout.lower()
    assert "app shell" in text
    assert "hero >" not in text
    assert "cta placement: hero" not in text


def test_stack_search_is_explicit_traceable_and_requires_current_verification():
    r = run("image optimization", "--stack", "nextjs", "-n", "1", "--json")
    assert r.returncode == 0
    data = json.loads(r.stdout)
    assert data["stack"] == "nextjs"
    assert data["file"] == "stacks/nextjs.csv"
    assert data["evidence"]["implementation_owner"] == "frontend-engineering"
    assert data["evidence"]["technical_guidance"] == "REQUIRES_CURRENT_VERIFICATION"
    assert data["evidence"]["freshness"] == "BUNDLED_SNAPSHOT"


def test_default_ascii_design_recommendation_executes_with_advisory_boundary():
    r = run("B2B operations dashboard", "--design-system")
    assert r.returncode == 0, r.stderr
    text = r.stdout.upper()
    assert "DESIGN INTELLIGENCE RECOMMENDATION" in text
    assert "EVIDENCE BOUNDARY" in text
    assert "ADVISORY_LOCAL_CORPUS" in text
    assert "PRE-DELIVERY CHECKLIST" not in text


def test_markdown_and_json_synthesis_expose_same_advisory_evidence_identity():
    md = run("B2B operations dashboard", "--design-system", "--format", "markdown")
    js = run("B2B operations dashboard", "--design-system", "--json")
    assert md.returncode == 0
    assert js.returncode == 0
    assert "## Design Intelligence Recommendation:" in md.stdout
    assert "not a canonical Visual Contract" in md.stdout
    data = json.loads(js.stdout)
    assert data["evidence"]["authority"] == "ADVISORY_LOCAL_CORPUS"
    assert data["evidence"]["canonical"] is False
    assert data["evidence"]["freshness"] == "BUNDLED_SNAPSHOT"


def test_reasoning_preserves_multi_value_must_have():
    reasoning = DesignSystemGenerator()._apply_reasoning("B2B Service", {})
    assert reasoning["decision_rules"]["must_have"] == ["case-studies", "roi-messaging"]


def test_strict_json_parser_rejects_duplicate_object_names():
    with pytest.raises(DuplicateJsonKeyError):
        parse_json_object_strict('{"must_have":"case-studies","must_have":"roi-messaging"}')


def test_data_validator_passes_normalized_corpus_and_manifest():
    r = subprocess.run([sys.executable, str(VALIDATE)], text=True, capture_output=True)
    assert r.returncode == 0, r.stdout + r.stderr
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
