#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Slide Search CLI - deterministic retrieval over bundled advisory evidence.
"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from slide_search_core import AVAILABLE_DOMAINS, search, search_all


def format_result(result, domain):
    """Format one retrieved row without converting it into a creative decision."""
    output = []
    if domain == "strategy":
        output.append(f"**{result.get('strategy_name', 'N/A')}**")
        output.append(f"  Goal: {result.get('goal', 'N/A')}")
        output.append(f"  Audience: {result.get('audience', 'N/A')}")
        output.append(f"  Structure: {result.get('structure', 'N/A')}")
        output.append(f"  Narrative: {result.get('narrative_arc', 'N/A')}")
        output.append(f"  Source: {result.get('sources', 'N/A')}")
    elif domain == "layout":
        output.append(f"**{result.get('layout_name', 'N/A')}**")
        output.append(f"  Use case: {result.get('use_case', 'N/A')}")
        output.append(f"  Zones: {result.get('content_zones', 'N/A')}")
        output.append(f"  Visual weight: {result.get('visual_weight', 'N/A')}")
        output.append(f"  Recommended: {result.get('recommended_for', 'N/A')}")
        output.append(f"  Avoid: {result.get('avoid_for', 'N/A')}")
    elif domain == "copy":
        output.append(f"**{result.get('formula_name', 'N/A')}**")
        output.append(f"  Components: {result.get('components', 'N/A')}")
        output.append(f"  Use case: {result.get('use_case', 'N/A')}")
        output.append(f"  Template: {result.get('example_template', 'N/A')}")
        output.append(f"  Source: {result.get('source', 'N/A')}")
    elif domain == "chart":
        output.append(f"**{result.get('chart_type', 'N/A')}**")
        output.append(f"  Best for: {result.get('best_for', 'N/A')}")
        output.append(f"  When to use: {result.get('when_to_use', 'N/A')}")
        output.append(f"  When to avoid: {result.get('when_to_avoid', 'N/A')}")
        output.append(f"  Accessibility: {result.get('accessibility_notes', 'N/A')}")
    else:
        for key, value in result.items():
            if value:
                output.append(f"{key}: {value}")
    return "\n".join(output)


def main():
    parser = argparse.ArgumentParser(
        description="Search bundled slide advisory evidence",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  search-slides.py "investor pitch" -d strategy
  search-slides.py "funnel conversion" -d chart
  search-slides.py "headline hook" -d copy
  search-slides.py "two column" -d layout
  search-slides.py "hero statement" -d typography
  search-slides.py "clarity light surface" -d color-logic
  search-slides.py "startup funding" --all
  search-slides.py "metrics dashboard" --json
        """
    )
    parser.add_argument("query", help="Search query")
    parser.add_argument("-d", "--domain", choices=AVAILABLE_DOMAINS,
                        help="Specific domain to search (auto-detected if not specified)")
    parser.add_argument("-n", "--max-results", type=int, default=3,
                        help="Maximum results to return (default: 3)")
    parser.add_argument("--all", action="store_true", help="Search across all domains")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    if args.all:
        results = search_all(args.query, args.max_results)
        if args.json:
            print(json.dumps(results, indent=2))
        elif not results:
            print(f"No results found for: {args.query}")
        else:
            for domain, data in results.items():
                print(f"\n=== {domain.upper()} ===")
                print(f"File: {data['file']}")
                print(f"Results: {data['count']}")
                for item in data['results']:
                    print(format_result(item, domain))
                    print()
        return

    result = search(args.query, args.domain, args.max_results)
    if args.json:
        print(json.dumps(result, indent=2))
        return
    if result.get("error"):
        print(f"Error: {result['error']}")
        return

    print(f"Domain: {result['domain']}")
    print(f"Query: {result['query']}")
    print(f"File: {result['file']}")
    print(f"Results: {result['count']}")
    if result['count'] == 0:
        print("No matching results found.")
        return
    for i, item in enumerate(result['results'], 1):
        print(f"--- Result {i} ---")
        print(format_result(item, result['domain']))
        print()


if __name__ == "__main__":
    main()
