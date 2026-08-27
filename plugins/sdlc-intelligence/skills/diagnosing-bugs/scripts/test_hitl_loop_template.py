from pathlib import Path
import os
import shutil
import subprocess


TEMPLATE = Path(__file__).with_name("hitl-loop.template.sh")


def _bash_command() -> list[str]:
    if os.name != "nt":
        return ["bash", "-n", str(TEMPLATE)]

    program_files = Path(os.environ.get("ProgramFiles", r"C:\Program Files"))
    git_bash = program_files / "Git" / "bin" / "bash.exe"
    if git_bash.is_file():
        return [str(git_bash), "-n", str(TEMPLATE)]

    bash = shutil.which("bash")
    if bash and Path(bash).name.lower() == "bash.exe":
        wsl = shutil.which("wsl.exe")
        if wsl:
            path = TEMPLATE.resolve().as_posix()
            drive = path[0].lower()
            linux_path = f"/mnt/{drive}{path[2:]}"
            return [wsl, "--", "bash", "-n", linux_path]
    raise AssertionError("No compatible Bash executable found")


def test_hitl_template_parses_with_bash():
    completed = subprocess.run(
        _bash_command(),
        text=True,
        capture_output=True,
        check=False,
    )
    assert completed.returncode == 0, completed.stderr


def test_hitl_template_uses_portable_line_endings():
    data = TEMPLATE.read_bytes()
    assert b"\r\n" not in data
