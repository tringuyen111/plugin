#!/usr/bin/env python3
"""Validate an exact Project Capability Profile candidate against the bundled schema."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:  # pragma: no cover - dependency failure is a CLI boundary
    yaml = None

try:
    from jsonschema import Draft202012Validator
except ImportError:  # pragma: no cover - dependency failure is a CLI boundary
    Draft202012Validator = None


SCHEMA_RELATIVE_TO_SKILL_ROOT = Path("references/project-capability-profile-v4.schema.json")


def skill_root() -> Path:
    # <skill>/scripts/validate_profile.py
    return Path(__file__).resolve().parents[1]


def schema_path() -> Path:
    return skill_root() / SCHEMA_RELATIVE_TO_SKILL_ROOT


def load_candidate(path: Path) -> Any:
    text = path.read_text(encoding="utf-8")
    suffix = path.suffix.lower()
    if suffix == ".json":
        return json.loads(text)
    if suffix in {".yaml", ".yml"}:
        if yaml is None:
            raise RuntimeError("PyYAML is required to validate YAML profiles")
        return yaml.safe_load(text)

    try:
        return json.loads(text)
    except json.JSONDecodeError as json_error:
        if yaml is None:
            raise RuntimeError(
                f"candidate is not valid JSON and PyYAML is unavailable: {json_error}"
            ) from json_error
        try:
            return yaml.safe_load(text)
        except yaml.YAMLError as yaml_error:
            raise RuntimeError(
                f"candidate is neither valid JSON nor valid YAML: JSON={json_error}; YAML={yaml_error}"
            ) from yaml_error


def format_path(parts: list[Any]) -> str:
    if not parts:
        return "/"
    return "/" + "/".join(str(part).replace("~", "~0").replace("/", "~1") for part in parts)


def validate(profile: Any) -> list[str]:
    if Draft202012Validator is None:
        return ["DEPENDENCY: jsonschema is required to validate Project Capability Profile v4"]

    schema_file = schema_path()
    if not schema_file.is_file():
        return [f"SCHEMA: bundled schema is missing: {schema_file}"]

    try:
        schema = json.loads(schema_file.read_text(encoding="utf-8"))
        Draft202012Validator.check_schema(schema)
    except (OSError, json.JSONDecodeError, Exception) as exc:
        return [f"SCHEMA: bundled schema cannot be used: {exc}"]

    validator = Draft202012Validator(schema)
    errors = sorted(
        validator.iter_errors(profile),
        key=lambda error: (list(error.absolute_path), error.message),
    )
    return [f"{format_path(list(error.absolute_path))}: {error.message}" for error in errors]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Validate a Project Capability Profile candidate against bundled schema v4."
    )
    parser.add_argument("profile", help="Path to a JSON/YAML Project Capability Profile candidate")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    candidate_path = Path(args.profile).expanduser().resolve()
    if not candidate_path.is_file():
        print(f"Profile validation failed: candidate file not found: {candidate_path}", file=sys.stderr)
        return 2

    try:
        profile = load_candidate(candidate_path)
    except (OSError, json.JSONDecodeError, RuntimeError) as exc:
        print(f"Profile validation failed: PARSE: {exc}", file=sys.stderr)
        return 2
    except Exception as exc:
        if yaml is not None and isinstance(exc, yaml.YAMLError):
            print(f"Profile validation failed: PARSE: {exc}", file=sys.stderr)
            return 2
        raise

    errors = validate(profile)
    if errors:
        print(f"Profile validation failed: {candidate_path}", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(f"Profile validation passed: {candidate_path}")
    print(f"Schema: {schema_path()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
