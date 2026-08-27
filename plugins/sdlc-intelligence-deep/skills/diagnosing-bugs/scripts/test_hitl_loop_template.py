from pathlib import Path
import subprocess


TEMPLATE = Path(__file__).with_name("hitl-loop.template.sh")


def test_hitl_template_parses_with_bash():
    completed = subprocess.run(
        ["bash", "-n", str(TEMPLATE)],
        text=True,
        capture_output=True,
        check=False,
    )
    assert completed.returncode == 0, completed.stderr


def test_hitl_template_uses_portable_line_endings():
    data = TEMPLATE.read_bytes()
    assert b"\r\n" not in data
