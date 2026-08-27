#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CIP Design Search CLI - deterministic retrieval over bundled advisory evidence.
"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from core import CSV_CONFIG, search, search_all


def format_results(results, domain):
    """Format retrieved rows without selecting a creative direction."""
    if not results:
        return "No results found."

    output = []
    for i, item in enumerate(results, 1):
        output.append(f"\n{'='*60}")
        output.append(f"Result {i}:")
        for key, value in item.items():
            if value:
                output.append(f"  {key}: {value}")
    return "\n".join(output)


def main():
    parser = argparse.ArgumentParser(
        description="Search bundled CIP advisory evidence",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python search.py "business card"
  python search.py "luxury elegant" --domain style
  python search.py "corporate professional" --all
  python search.py "vehicle branding" --json
        """
    )
    parser.add_argument("query", help="Search query")
    parser.add_argument("--domain", "-d", choices=list(CSV_CONFIG.keys()),
                        help="Search domain (auto-detected if not specified)")
    parser.add_argument("--max", "-m", type=int, default=3, help="Max results (default: 3)")
    parser.add_argument("--all", "-a", action="store_true", help="Search all domains")
    parser.add_argument("--json", "-j", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    if args.all:
        results = search_all(args.query, args.max)
        if args.json:
            print(json.dumps(results, indent=2))
        elif not results:
            print(f"No results found for: {args.query}")
        else:
            for domain, items in results.items():
                print(f"\n{'#'*60}")
                print(f"# {domain.upper()}")
                print(format_results(items, domain))
        return

    result = search(args.query, args.domain, args.max)
    if args.json:
        print(json.dumps(result, indent=2))
        return

    print(f"\nDomain: {result['domain']}")
    print(f"Query: {result['query']}")
    print(f"Results: {result['count']}")
    print(format_results(result.get("results", []), result["domain"]))


if __name__ == "__main__":
    main()
