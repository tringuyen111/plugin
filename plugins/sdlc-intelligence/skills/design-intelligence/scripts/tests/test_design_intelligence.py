import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parents[1]
SEARCH = SCRIPT_DIR / 'search.py'

def run(*args):
    return subprocess.run([sys.executable, str(SEARCH), *args], text=True, capture_output=True)

def test_search_returns_traceable_accessibility_evidence():
    r = run('focus keyboard', '--domain', 'ux', '-n', '2')
    assert r.returncode == 0
    assert 'Source:' in r.stdout
    assert 'Focus States' in r.stdout

def test_design_recommendation_has_no_persistence_cli():
    r = run('--help')
    assert r.returncode == 0
    for forbidden in ('--persist', '--output-dir', '--page', '--force'):
        assert forbidden not in r.stdout

def test_application_recommendation_avoids_landing_hero_cta_structure():
    r = run('B2B operations dashboard', '--design-system', '--format', 'markdown')
    assert r.returncode == 0
    text = r.stdout.lower()
    assert 'app shell' in text
    assert 'hero >' not in text
    assert 'cta placement: hero' not in text

def test_stack_search_is_explicit_and_traceable():
    r = run('image optimization', '--stack', 'nextjs', '-n', '1')
    assert r.returncode == 0
    assert '**Stack:** nextjs' in r.stdout
    assert '**Source:**' in r.stdout
