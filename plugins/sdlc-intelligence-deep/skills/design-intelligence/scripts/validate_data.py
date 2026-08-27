#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Data integrity guardrail for ui-ux-pro-max. Stdlib-only, no pytest dependency,
so it can run as a standalone pre-publish/CI check:

    python validate_data.py

Checks, per configured domain/stack CSV:
  - file exists
  - header row contains every column referenced in search_cols/output_cols
  - no duplicate primary-key values (first column) within a file
  - any "Decision_Rules"-style JSON column parses as JSON

Exits 0 with no output on success; exits 1 and prints every problem found
on failure (fail-fast is the wrong call here -- a data change can break
several files at once, so we want the full list in one run).
"""

import csv
import json
import sys
from pathlib import Path

from core import CSV_CONFIG, STACK_CONFIG, _STACK_COLS, DATA_DIR, SOURCE_MANIFEST_FILE

JSON_COLUMNS = {"Decision_Rules"}


class DuplicateJsonKeyError(ValueError):
    pass


def _reject_duplicate_pairs(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise DuplicateJsonKeyError(f"duplicate JSON object name '{key}'")
        result[key] = value
    return result


def parse_json_object_strict(raw):
    """Parse a JSON object while rejecting duplicate object names."""
    value = json.loads(raw, object_pairs_hook=_reject_duplicate_pairs)
    if not isinstance(value, dict):
        raise ValueError("expected JSON object")
    return value


def _read_rows(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return reader.fieldnames or [], list(reader)


def _check_file(label, filepath, search_cols, output_cols, problems):
    if not filepath.exists():
        problems.append(f"[{label}] missing file: {filepath}")
        return

    try:
        headers, rows = _read_rows(filepath)
    except (csv.Error, UnicodeDecodeError, OSError) as e:
        problems.append(f"[{label}] failed to parse {filepath.name}: {e}")
        return

    header_set = set(headers)
    for col in set(search_cols) | set(output_cols):
        if col not in header_set:
            problems.append(f"[{label}] {filepath.name}: expected column '{col}' not found in header")

    # Only check for duplicates against an actual identifier column ("No" is
    # the sequential-index convention used across this dataset). The first
    # CSV column is not reliably a unique key -- e.g. stack files use
    # "Category", which legitimately repeats across many guideline rows.
    if "No" in header_set:
        seen = {}
        for i, row in enumerate(rows, start=2):  # +1 header, +1 to be 1-indexed
            key = row.get("No", "")
            if key in seen:
                problems.append(
                    f"[{label}] {filepath.name}: duplicate 'No' value '{key}' on rows {seen[key]} and {i}"
                )
            else:
                seen[key] = i
    elif label.startswith("stack:"):
        problems.append(
            f"[{label}] {filepath.name}: missing 'No' index column present in other stack files "
            "(schema drift -- harmless for search, but inconsistent with the rest of data/stacks/)"
        )

    for row_idx, row in enumerate(rows, start=2):
        for col in JSON_COLUMNS:
            if col in row and row[col]:
                try:
                    parsed = parse_json_object_strict(row[col])
                    if col == "Decision_Rules" and "must_have" in parsed:
                        must_have = parsed["must_have"]
                        if (
                            not isinstance(must_have, list)
                            or not must_have
                            or any(not isinstance(item, str) or not item.strip() for item in must_have)
                        ):
                            raise ValueError("'must_have' must be a non-empty array of non-empty strings")
                except (json.JSONDecodeError, DuplicateJsonKeyError, ValueError) as e:
                    problems.append(
                        f"[{label}] {filepath.name} row {row_idx}: column '{col}' is not valid JSON: {e}"
                    )


def main():
    problems = []

    for domain, config in CSV_CONFIG.items():
        _check_file(f"domain:{domain}", DATA_DIR / config["file"],
                    config["search_cols"], config["output_cols"], problems)

    for stack, config in STACK_CONFIG.items():
        _check_file(f"stack:{stack}", DATA_DIR / config["file"],
                    _STACK_COLS["search_cols"], _STACK_COLS["output_cols"], problems)

    if not SOURCE_MANIFEST_FILE.exists():
        problems.append(f"[provenance] missing file: {SOURCE_MANIFEST_FILE}")
    else:
        try:
            manifest = json.loads(SOURCE_MANIFEST_FILE.read_text(encoding="utf-8"))
            for path in (
                ("authority", "class"),
                ("source_snapshot", "archive"),
                ("source_snapshot", "sha256"),
                ("freshness", "mode"),
                ("freshness", "technical_guidance_status"),
            ):
                cur = manifest
                for key in path:
                    if not isinstance(cur, dict) or key not in cur:
                        problems.append(f"[provenance] source-manifest.json missing {'.'.join(path)}")
                        break
                    cur = cur[key]
            sha = (manifest.get("source_snapshot") or {}).get("sha256", "")
            if not isinstance(sha, str) or len(sha) != 64 or any(c not in "0123456789abcdef" for c in sha):
                problems.append("[provenance] source-manifest.json source_snapshot.sha256 must be lowercase SHA-256")
        except (json.JSONDecodeError, OSError) as e:
            problems.append(f"[provenance] source-manifest.json is invalid: {e}")

    if problems:
        print(f"FAILED: {len(problems)} data integrity issue(s) found:\n")
        for p in problems:
            print(f"  - {p}")
        sys.exit(1)

    print(
        f"OK: validated {len(CSV_CONFIG)} domain files, {len(STACK_CONFIG)} stack files, "
        "and source-manifest.json"
    )
    sys.exit(0)


if __name__ == "__main__":
    main()
