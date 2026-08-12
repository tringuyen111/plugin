import json
import subprocess
import sys
from pathlib import Path

SCRIPT = Path(__file__).parents[1] / 'ui_registry.py'

def run(*args):
    return subprocess.run([sys.executable, str(SCRIPT), *args], text=True, capture_output=True)

def test_scan_bootstrap_reconcile_non_destructive(tmp_path):
    source = tmp_path / 'src' / 'components' / 'Button.tsx'
    source.parent.mkdir(parents=True)
    source.write_text('export const Button = () => <button />\n')
    r = run('scan', '--project', str(tmp_path))
    assert r.returncode == 0
    assert 'src/components/Button.tsx' in r.stdout
    r = run('bootstrap', '--project', str(tmp_path), '--registry-dir', 'work/current/ui-registry')
    assert r.returncode == 0
    idx = json.loads((tmp_path/'work/current/ui-registry/index.json').read_text())
    assert len(idx['records']) == 1
    rec_path = tmp_path/'work/current/ui-registry'/idx['records'][0]['file']
    assert rec_path.exists()
    source.unlink()
    r = run('reconcile', '--project', str(tmp_path), '--registry-dir', 'work/current/ui-registry')
    assert r.returncode == 0
    report = json.loads(r.stdout)
    assert report['stale_records'][0]['reason'] == 'source_missing'
    assert rec_path.exists(), 'reconcile must not delete stale records'

def test_registry_path_must_be_project_relative(tmp_path):
    r = run('bootstrap', '--project', str(tmp_path), '--registry-dir', '../escape')
    assert r.returncode == 2
    assert 'cannot contain ..' in r.stderr
