#!/usr/bin/env python3
"""Deterministic local UI/UX evidence search for SDLC Design Intelligence."""
from __future__ import annotations
import argparse
import io
import json
import sys
from core import AVAILABLE_STACKS, CSV_CONFIG, MAX_RESULTS, UNTRUNCATED_COLS, search, search_stack
from design_system import generate_design_system

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
if sys.stderr.encoding and sys.stderr.encoding.lower() != "utf-8":
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

TRUNCATE_AT = 300

def format_output(result: dict, full: bool = False) -> str:
    if "error" in result:
        return f"Error: {result['error']}"
    out = []
    if result.get("stack"):
        out += ["## Design Intelligence Stack Evidence", f"**Stack:** {result['stack']} | **Query:** {result['query']}"]
    else:
        domain = result.get("domain", "unknown")
        if result.get("auto_detected"):
            runner = result.get("runner_up_domain")
            domain += " (auto-detected" + (f", runner-up: {runner}" if runner else "") + ")"
        out += ["## Design Intelligence Evidence", f"**Domain:** {domain} | **Query:** {result['query']}"]
    out.append(f"**Source:** {result.get('file', 'unknown')} | **Found:** {result.get('count', 0)} results\n")
    if result.get("count", 0) == 0:
        out.append("NO_MATCH: the local corpus returned no hit. Broaden once if useful; do not present model recall as corpus evidence.")
        suggestions = result.get("suggestions") or []
        if suggestions:
            out.append(f"**Closest known terms:** {', '.join(suggestions)}")
        return "\n".join(out)
    for i, row in enumerate(result.get("results", []), 1):
        out.append(f"### Result {i}")
        for key, value in row.items():
            value_str = str(value)
            if not full and key not in UNTRUNCATED_COLS and len(value_str) > TRUNCATE_AT:
                value_str = value_str[:TRUNCATE_AT] + "..."
            out.append(f"- **{key}:** {value_str}")
        out.append("")
    return "\n".join(out)

def main() -> int:
    parser = argparse.ArgumentParser(description="Search bundled UI/UX evidence without creating project truth")
    parser.add_argument("query")
    parser.add_argument("--domain", "-d", choices=list(CSV_CONFIG.keys()))
    parser.add_argument("--stack", "-s", choices=AVAILABLE_STACKS)
    parser.add_argument("--max-results", "-n", type=int, default=MAX_RESULTS)
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--full", action="store_true")
    parser.add_argument("--design-system", "-ds", action="store_true", help="Generate a non-canonical design recommendation")
    parser.add_argument("--project-name", "-p")
    parser.add_argument("--format", "-f", choices=["ascii", "markdown"], default="ascii")
    parser.add_argument("--variance", type=int, choices=range(1, 11), metavar="1-10")
    parser.add_argument("--motion", type=int, choices=range(1, 11), metavar="1-10")
    parser.add_argument("--density", type=int, choices=range(1, 11), metavar="1-10")
    args = parser.parse_args()

    if args.design_system:
        result = generate_design_system(
            args.query, args.project_name, args.format,
            variance=args.variance, motion=args.motion, density=args.density,
        )
        print(json.dumps(result["design_system"], indent=2, ensure_ascii=False) if args.json else result["text"])
        return 0
    result = search_stack(args.query, args.stack, args.max_results) if args.stack else search(args.query, args.domain, args.max_results)
    print(json.dumps(result, indent=2, ensure_ascii=False) if args.json else format_output(result, full=args.full))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
