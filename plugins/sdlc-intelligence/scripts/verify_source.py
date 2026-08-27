#!/usr/bin/env python3
"""Canonical deterministic verification for the SDLC Intelligence source tree.

This orchestrates native validators and deterministic tests. It does not score
Skill judgment or convert frozen behavioral cases into runtime evidence.
"""

from __future__ import annotations

import argparse
import importlib.util
import os
import re
import subprocess
import sys
from pathlib import Path

EVIDENCE_STATES = {"PASS", "FAIL", "NOT_RUN", "INCONCLUSIVE", "MISSING", "BLOCKED"}
EVIDENCE_RE = re.compile(r"^Evidence-State:\s*`?([A-Z_]+)`?\s*$", re.MULTILINE)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skill-validator", type=Path)
    parser.add_argument("--plugin-validator", type=Path)
    parser.add_argument(
        "--allow-dirty",
        action="store_true",
        help="skip the final clean-worktree gate while editing",
    )
    return parser.parse_args()


def resolve_validator(explicit: Path | None, env_name: str, candidates: list[Path], label: str) -> Path:
    values: list[Path] = []
    if explicit is not None:
        values.append(explicit)
    if os.environ.get(env_name):
        values.append(Path(os.environ[env_name]))
    values.extend(candidates)
    for value in values:
        path = value.expanduser().resolve()
        if path.is_file():
            return path
    searched = "\n  - ".join(str(path.expanduser()) for path in values)
    raise SystemExit(
        f"MISSING {label}. Pass its path explicitly or set {env_name}. Searched:\n  - {searched}"
    )


def run(label: str, command: list[str], cwd: Path) -> None:
    print(f"\n== {label} ==")
    print("$", " ".join(command))
    completed = subprocess.run(command, cwd=cwd, check=False)
    if completed.returncode != 0:
        raise SystemExit(f"FAIL {label}: exit {completed.returncode}")


def load_validator_module(path: Path, module_name: str):
    spec = importlib.util.spec_from_file_location(module_name, path)
    if spec is None or spec.loader is None:
        raise SystemExit(f"FAIL unable to load native validator module: {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def validate_eval_states(root: Path) -> int:
    eval_root = root / "evals" / "vertical-depth"
    errors: list[str] = []
    cases = sorted(path for path in eval_root.glob("*.md") if path.name != "README.md")
    if not cases:
        errors.append("no vertical-depth eval case files found")
    for path in cases:
        text = path.read_text(encoding="utf-8")
        matches = EVIDENCE_RE.findall(text)
        rel = path.relative_to(root)
        if len(matches) != 1:
            errors.append(f"{rel}: expected exactly one Evidence-State field, found {len(matches)}")
            continue
        if matches[0] not in EVIDENCE_STATES:
            errors.append(f"{rel}: unsupported Evidence-State {matches[0]!r}")
    if errors:
        print("\n== eval evidence schema ==")
        for error in errors:
            print("-", error)
        raise SystemExit("FAIL eval evidence schema")
    print(f"\n== eval evidence schema ==\nPASS {len(cases)} case files")
    return len(cases)


def assert_no_tracked_generated_files(root: Path) -> None:
    completed = subprocess.run(
        ["git", "ls-files"], cwd=root, check=True, text=True, capture_output=True
    )
    bad: list[str] = []
    for rel in completed.stdout.splitlines():
        parts = Path(rel).parts
        if "__pycache__" in parts or rel.endswith((".pyc", ".pyo")) or ".pytest_cache" in parts:
            bad.append(rel)
    if bad:
        raise SystemExit("FAIL tracked generated artifacts:\n- " + "\n- ".join(bad))
    print("\n== tracked generated artifacts ==\nPASS")


def assert_clean(root: Path) -> None:
    completed = subprocess.run(
        ["git", "status", "--porcelain"], cwd=root, check=True, text=True, capture_output=True
    )
    if completed.stdout.strip():
        raise SystemExit("FAIL clean-worktree gate:\n" + completed.stdout.rstrip())
    print("\n== clean worktree ==\nPASS")


def main() -> None:
    args = parse_args()
    root = Path(__file__).resolve().parent.parent
    home = Path.home()
    skill_validator = resolve_validator(
        args.skill_validator,
        "SKILL_CREATOR_VALIDATOR",
        [
            Path("/home/oai/skills/skill-creator/scripts/quick_validate.py"),
            home / ".codex/skills/.system/skill-creator/scripts/quick_validate.py",
            home / ".codex/skills/skill-creator/scripts/quick_validate.py",
            home / ".agents/skills/skill-creator/scripts/quick_validate.py",
        ],
        "skill-creator validator",
    )
    plugin_validator = resolve_validator(
        args.plugin_validator,
        "PLUGIN_CREATOR_VALIDATOR",
        [
            Path("/home/oai/skills/plugin-creator/scripts/validate_plugin.py"),
            home / ".codex/skills/.system/plugin-creator/scripts/validate_plugin.py",
            home / ".codex/skills/plugin-creator/scripts/validate_plugin.py",
            home / ".agents/skills/plugin-creator/scripts/validate_plugin.py",
        ],
        "plugin-creator validator",
    )

    print("\n== native Plugin validation ==")
    plugin_module = load_validator_module(plugin_validator, "sdlc_native_plugin_validator")
    if not hasattr(plugin_module, "validate_plugin"):
        raise SystemExit(f"FAIL native Plugin validator interface missing validate_plugin(): {plugin_validator}")
    plugin_errors = plugin_module.validate_plugin(root)
    if plugin_errors:
        print("Plugin validation failed:")
        for error in plugin_errors:
            print(f"- {error}")
        raise SystemExit("FAIL native Plugin validation")
    print("PASS")

    skill_roots = sorted(
        path for path in (root / "skills").iterdir() if path.is_dir() and (path / "SKILL.md").is_file()
    )
    if not skill_roots:
        raise SystemExit("FAIL no Skill roots found")
    print(f"\n== native Skill validation ({len(skill_roots)}) ==")
    skill_module = load_validator_module(skill_validator, "sdlc_native_skill_validator")
    if not hasattr(skill_module, "validate_skill"):
        raise SystemExit(f"FAIL native Skill validator interface missing validate_skill(): {skill_validator}")
    for skill_root in skill_roots:
        valid, message = skill_module.validate_skill(skill_root)
        if not valid:
            raise SystemExit(f"FAIL Skill validation: {skill_root.name}: {message}")
    print(f"PASS {len(skill_roots)}/{len(skill_roots)} Skills")

    validate_eval_states(root)
    assert_no_tracked_generated_files(root)
    run("deterministic tests", [sys.executable, "-m", "pytest", "-q"], root)
    run("diff whitespace check", ["git", "diff", "--check"], root)

    if args.allow_dirty:
        print("\n== clean worktree ==\nSKIPPED (--allow-dirty)")
    else:
        assert_clean(root)

    print("\nPASS canonical source verification")
    print("NOTE behavioral Skill qualification remains separate and must not be inferred from this PASS.")


if __name__ == "__main__":
    main()
