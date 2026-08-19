#!/usr/bin/env python3
"""Inspect, verify, and apply Skill implicit-invocation state.

The human-maintained source of truth is runtime/skill-state.yaml.

Usage:
  python scripts/skill-state.py list
  python scripts/skill-state.py check
  python scripts/skill-state.py apply
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import Dict, Tuple

import yaml

TIERS = {"core", "conditional"}
IMPLICIT_LINE = re.compile(
    r"^(?P<prefix>\s*allow_implicit_invocation:\s*)(?:true|false)(?P<suffix>\s*(?:#.*)?)$",
    re.MULTILINE | re.IGNORECASE,
)


class StateError(RuntimeError):
    pass


def plugin_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_registry(root: Path) -> Dict[str, dict]:
    path = root / "runtime" / "skill-state.yaml"
    if not path.is_file():
        raise StateError(f"missing registry: {path}")
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or data.get("version") != 1:
        raise StateError("runtime/skill-state.yaml must have version: 1")
    skills = data.get("skills")
    if not isinstance(skills, dict):
        raise StateError("runtime/skill-state.yaml must contain a skills mapping")
    return skills


def discover_metadata(root: Path) -> Dict[str, Path]:
    found: Dict[str, Path] = {}
    for path in sorted((root / "skills").glob("*/agents/openai.yaml")):
        skill = path.parent.parent.name
        if skill in found:
            raise StateError(f"duplicate metadata for Skill: {skill}")
        found[skill] = path
    return found


def desired_state(skill: str, config: object) -> Tuple[str, bool]:
    if not isinstance(config, dict):
        raise StateError(f"{skill}: state must be a mapping")
    tier = config.get("tier")
    if tier not in TIERS:
        raise StateError(f"{skill}: tier must be core or conditional")
    if tier == "core":
        if "implicit" in config:
            raise StateError(f"{skill}: core Skills must not override implicit; core is always true")
        return tier, True
    implicit = config.get("implicit")
    if not isinstance(implicit, bool):
        raise StateError(f"{skill}: conditional Skills require boolean implicit")
    return tier, implicit


def actual_state(path: Path) -> bool:
    try:
        data = yaml.safe_load(path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise StateError(f"invalid YAML {path}: {exc}") from exc
    try:
        value = data["policy"]["allow_implicit_invocation"]
    except (KeyError, TypeError) as exc:
        raise StateError(f"missing policy.allow_implicit_invocation: {path}") from exc
    if not isinstance(value, bool):
        raise StateError(f"policy.allow_implicit_invocation must be boolean: {path}")
    return value


def bind(root: Path):
    registry = load_registry(root)
    metadata = discover_metadata(root)
    registered = set(registry)
    discovered = set(metadata)
    missing = sorted(discovered - registered)
    extra = sorted(registered - discovered)
    if missing or extra:
        details = []
        if missing:
            details.append("missing registry entries: " + ", ".join(missing))
        if extra:
            details.append("registry entries without Skill metadata: " + ", ".join(extra))
        raise StateError("; ".join(details))
    bound = []
    for skill in sorted(discovered):
        tier, desired = desired_state(skill, registry[skill])
        actual = actual_state(metadata[skill])
        bound.append((skill, tier, desired, actual, metadata[skill]))
    return bound


def render_list(bound) -> None:
    print(f"{'SKILL':32} {'TIER':12} {'DESIRED':7} {'ACTUAL':7} STATUS")
    for skill, tier, desired, actual, _ in bound:
        status = "OK" if desired == actual else "DRIFT"
        print(f"{skill:32} {tier:12} {str(desired).lower():7} {str(actual).lower():7} {status}")
    print(f"TOTAL {len(bound)}  DRIFT {sum(d != a for _, _, d, a, _ in bound)}")


def check(root: Path, verbose: bool = True) -> int:
    bound = bind(root)
    drift = [(skill, desired, actual) for skill, _, desired, actual, _ in bound if desired != actual]
    if drift:
        if verbose:
            for skill, desired, actual in drift:
                print(
                    f"DRIFT {skill}: desired={'true' if desired else 'false'} "
                    f"actual={'true' if actual else 'false'}",
                    file=sys.stderr,
                )
            print(f"skill-state check failed: {len(drift)} drift(s)", file=sys.stderr)
        return 1
    if verbose:
        print(f"skill-state check passed: {len(bound)} Skills synchronized")
    return 0


def replace_implicit(path: Path, desired: bool) -> bool:
    text = path.read_text(encoding="utf-8")
    matches = list(IMPLICIT_LINE.finditer(text))
    if len(matches) != 1:
        raise StateError(
            f"expected exactly one allow_implicit_invocation line in {path}, found {len(matches)}"
        )
    current = matches[0].group(0)
    desired_text = "true" if desired else "false"
    replacement = matches[0].group("prefix") + desired_text + matches[0].group("suffix")
    if current == replacement:
        return False
    updated = text[: matches[0].start()] + replacement + text[matches[0].end() :]
    path.write_text(updated, encoding="utf-8")
    return True


def apply(root: Path) -> int:
    bound = bind(root)
    changed = []
    for skill, _, desired, actual, path in bound:
        if desired == actual:
            continue
        if replace_implicit(path, desired):
            changed.append(skill)
    if check(root, verbose=False) != 0:
        raise StateError("apply completed but registry/source are still out of sync")
    if changed:
        print("updated: " + ", ".join(changed))
    else:
        print("skill-state already synchronized; no changes")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("list", "check", "apply"))
    parser.add_argument(
        "--root",
        type=Path,
        default=plugin_root(),
        help="plugin root (defaults to parent of this script directory)",
    )
    args = parser.parse_args()
    root = args.root.resolve()
    try:
        if args.command == "list":
            render_list(bind(root))
            return 0
        if args.command == "check":
            return check(root)
        return apply(root)
    except StateError as exc:
        print(f"skill-state error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
