from __future__ import annotations

import json
import subprocess
from pathlib import Path

GENERATOR = Path(__file__).parents[1] / 'design-tokens' / 'generate-tokens.cjs'


def run_node(script: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(['node', str(script), *args], text=True, capture_output=True, check=False)


def test_generator_accepts_documented_generic_dtcg_shape(tmp_path: Path) -> None:
    config = tmp_path / 'tokens.json'
    output = tmp_path / 'tokens.css'
    config.write_text(json.dumps({'color': {'brand': {'primary': {'$value': '#123456', '$type': 'color'}}}}))
    result = run_node(GENERATOR, '--config', str(config), '--output', str(output))
    assert result.returncode == 0, result.stderr
    css = output.read_text()
    assert '--color-brand-primary: #123456;' in css


def test_generator_preserves_layered_input_contract(tmp_path: Path) -> None:
    config = tmp_path / 'tokens.json'
    output = tmp_path / 'tokens.css'
    config.write_text(json.dumps({'primitive': {'color': {'brand': {'primary': {'$value': '#123456'}}}}}))
    result = run_node(GENERATOR, '--config', str(config), '--output', str(output))
    assert result.returncode == 0, result.stderr
    assert '--primitive-color-brand-primary: #123456;' in output.read_text()


def test_generator_resolves_approved_aliases_without_selecting_values(tmp_path: Path) -> None:
    config = tmp_path / 'tokens.json'
    output = tmp_path / 'tokens.css'
    config.write_text(json.dumps({
        'primitive': {'color': {'brand': {'primary': {'$value': '#123456'}}}},
        'semantic': {'color': {'action': {'$value': '{primitive.color.brand.primary}'}}},
    }))
    result = run_node(GENERATOR, '--config', str(config), '--output', str(output))
    assert result.returncode == 0, result.stderr
    css = output.read_text()
    assert '--color-action: #123456;' in css


def test_generator_rejects_unknown_output_format(tmp_path: Path) -> None:
    config = tmp_path / 'tokens.json'
    config.write_text(json.dumps({'color': {'brand': {'primary': {'$value': '#123456'}}}}))
    result = run_node(GENERATOR, '--config', str(config), '--format', 'unknown')
    assert result.returncode == 2
    assert 'unsupported --format' in result.stderr


def test_generator_preserves_falsy_alias_values(tmp_path: Path) -> None:
    config = tmp_path / 'tokens.json'
    output = tmp_path / 'tokens.css'
    config.write_text(json.dumps({
        'primitive': {
            'space': {'none': {'$value': 0}},
            'motion': {'enabled': {'$value': False}},
        },
        'semantic': {
            'space': {'none': {'$value': '{primitive.space.none}'}},
            'motion': {'enabled': {'$value': '{primitive.motion.enabled}'}},
        },
    }))
    result = run_node(GENERATOR, '--config', str(config), '--output', str(output))
    assert result.returncode == 0, result.stderr
    css = output.read_text()
    assert '--space-none: 0;' in css
    assert '--motion-enabled: false;' in css
    assert '[object Object]' not in css


def test_generator_rejects_alias_cycles_explicitly(tmp_path: Path) -> None:
    config = tmp_path / 'tokens.json'
    config.write_text(json.dumps({
        'semantic': {
            'a': {'$value': '{semantic.b}'},
            'b': {'$value': '{semantic.a}'},
        },
    }))
    result = run_node(GENERATOR, '--config', str(config))
    assert result.returncode == 2
    assert 'cyclic token reference' in result.stderr.lower()
    assert 'maximum call stack' not in result.stderr.lower()
