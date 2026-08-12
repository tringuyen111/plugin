from __future__ import annotations

import json
import subprocess
from pathlib import Path

GENERATOR = Path(__file__).parents[1] / 'design-tokens' / 'generate-tokens.cjs'
VALIDATOR = Path(__file__).parents[1] / 'design-tokens' / 'validate-tokens.cjs'

def run_node(script: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(['node', str(script), *args], text=True, capture_output=True, check=False)

def test_generator_accepts_documented_generic_dtcg_shape(tmp_path: Path) -> None:
    config = tmp_path / 'tokens.json'
    output = tmp_path / 'tokens.css'
    config.write_text(json.dumps({'color': {'blue': {'600': {'$value': '#2563EB', '$type': 'color'}}}}))
    result = run_node(GENERATOR, '--config', str(config), '--output', str(output))
    assert result.returncode == 0, result.stderr
    css = output.read_text()
    assert '--color-blue-600: #2563EB;' in css

def test_generator_preserves_layered_input_contract(tmp_path: Path) -> None:
    config = tmp_path / 'tokens.json'
    output = tmp_path / 'tokens.css'
    config.write_text(json.dumps({'primitive': {'color': {'blue': {'600': {'$value': '#2563EB'}}}}}))
    result = run_node(GENERATOR, '--config', str(config), '--output', str(output))
    assert result.returncode == 0, result.stderr
    assert '--primitive-color-blue-600: #2563EB;' in output.read_text()

def test_usage_validator_accepts_variable_usage_and_rejects_literal(tmp_path: Path) -> None:
    src = tmp_path / 'src'
    src.mkdir()
    app = src / 'app.css'
    app.write_text('.ok{color:var(--color-blue-600)}\n')
    good = run_node(VALIDATOR, '--dir', str(src))
    assert good.returncode == 0, good.stdout + good.stderr
    app.write_text('.bad{color:#2563EB}\n')
    bad = run_node(VALIDATOR, '--dir', str(src))
    assert bad.returncode != 0
    assert 'Hardcoded hex color' in bad.stdout
