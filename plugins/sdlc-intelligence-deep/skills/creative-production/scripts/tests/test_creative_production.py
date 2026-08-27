import importlib.util
import json
import subprocess
import sys
from pathlib import Path


SKILL_DIR = Path(__file__).resolve().parents[2]
SCRIPTS = SKILL_DIR / "scripts"
DATA = SKILL_DIR / "data"


def _load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


def _run_json(script: Path, *args: str):
    completed = subprocess.run(
        [sys.executable, str(script), *args, "--json"],
        check=True,
        text=True,
        capture_output=True,
    )
    return json.loads(completed.stdout)


def test_raw_retrieval_does_not_fabricate_no_match_evidence():
    query = "zzzxxyyqq nonexistentsignal"
    cip = _load_module("creative_cip_core", SCRIPTS / "cip" / "core.py")
    slides = _load_module("creative_slide_core", SCRIPTS / "slides" / "slide_search_core.py")
    logo = _load_module("creative_logo_core", SCRIPTS / "logo" / "core.py")

    assert cip.search_all(query) == {}
    assert slides.search_all(query) == {}
    assert logo.search_all(query) == {}


def test_cli_surface_is_retrieval_only_not_semantic_synthesis():
    commands = {
        SCRIPTS / "cip" / "search.py": "--cip-brief",
        SCRIPTS / "logo" / "search.py": "--design-brief",
        SCRIPTS / "slides" / "search-slides.py": "--context",
    }
    for script, forbidden_flag in commands.items():
        completed = subprocess.run(
            [sys.executable, str(script), "--help"],
            check=True,
            text=True,
            capture_output=True,
        )
        assert forbidden_flag not in completed.stdout


def test_deterministic_modules_do_not_export_creative_decision_engines():
    cip = _load_module("creative_cip_core_surface", SCRIPTS / "cip" / "core.py")
    slides = _load_module("creative_slide_core_surface", SCRIPTS / "slides" / "slide_search_core.py")

    assert not hasattr(cip, "get_cip_brief")
    for name in (
        "get_layout_for_goal",
        "get_typography_for_slide",
        "get_color_for_emotion",
        "get_background_config",
        "should_use_full_bleed",
        "calculate_pattern_break",
        "search_with_context",
    ):
        assert not hasattr(slides, name)


def test_no_competing_cip_presentation_renderer():
    assert not (SCRIPTS / "cip" / "render-html.py").exists()


def test_retained_slide_advisory_tables_are_direct_retrieval_domains():
    slides = _load_module("creative_slide_core_domains", SCRIPTS / "slides" / "slide_search_core.py")
    configured_files = {config["file"] for config in slides.CSV_CONFIG.values()}
    retained_advisory_files = {
        "slide-layout-logic.csv",
        "slide-typography.csv",
        "slide-color-logic.csv",
        "slide-backgrounds.csv",
    }
    assert retained_advisory_files <= configured_files

    for filename in retained_advisory_files:
        assert (DATA / "slides" / filename).exists()


def test_creative_docs_do_not_hardcode_next_skill_routes():
    route_tokens = {
        "/product-design",
        "/design-review",
        "/verify-quality",
        "/prototype",
        "/frontend-engineering",
        "/design-intelligence",
    }
    markdown_files = [SKILL_DIR / "SKILL.md", *sorted((SKILL_DIR / "references").glob("*.md"))]
    combined = "\n".join(path.read_text(encoding="utf-8") for path in markdown_files)
    for token in route_tokens:
        assert token not in combined
