#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Logo Design Search - deterministic retrieval over bundled advisory evidence.
"""

import argparse
import json
from core import CSV_CONFIG, MAX_RESULTS, search, search_all


def format_output(result):
    """Format retrieved rows without selecting a creative direction."""
    if "error" in result:
        return f"Error: {result['error']}"

    output = [
        "## Logo Design Search Results",
        f"**Domain:** {result['domain']} | **Query:** {result['query']}",
        f"**Source:** {result['file']} | **Found:** {result['count']} results\n",
    ]
    for i, row in enumerate(result['results'], 1):
        output.append(f"### Result {i}")
        for key, value in row.items():
            value_str = str(value)
            if len(value_str) > 300:
                value_str = value_str[:300] + "..."
            output.append(f"- **{key}:** {value_str}")
        output.append("")
    return "\n".join(output)


def main():
    parser = argparse.ArgumentParser(description="Search bundled logo advisory evidence")
    parser.add_argument("query", help="Search query")
    parser.add_argument("--domain", "-d", choices=list(CSV_CONFIG.keys()), help="Search domain")
    parser.add_argument("--max-results", "-n", type=int, default=MAX_RESULTS, help="Max results (default: 3)")
    parser.add_argument("--all", action="store_true", help="Search all domains")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    if args.all:
        results = search_all(args.query, args.max_results)
        if args.json:
            print(json.dumps(results, indent=2, ensure_ascii=False))
        elif not results:
            print(f"No results found for: {args.query}")
        else:
            for domain, rows in results.items():
                print(f"\n## {domain.upper()}")
                for i, row in enumerate(rows, 1):
                    print(f"### Result {i}")
                    for key, value in row.items():
                        if value:
                            print(f"- {key}: {value}")
        return

    result = search(args.query, args.domain, args.max_results)
    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(format_output(result))


if __name__ == "__main__":
    main()
