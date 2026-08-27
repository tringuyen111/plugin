#!/usr/bin/env python3
"""Emit small stateless SDLC resident guidance at SessionStart."""

from __future__ import annotations

import json
import sys

RESIDENT_GUIDANCE = """SDLC Intelligence resident guidance (Plugin context; not a Skill or agent harness):

- Control vocabulary: Outcome = the user-visible terminal truth requested; Frontier = the smallest unresolved decision/action that materially advances it now; Open obligations = only unresolved facts, authority, dependencies, or proof that can change/block that Frontier. Keep one live Outcome and Frontier; integrate material results, invalidate dependents only, and recompute the Frontier.
- The host/Agent owns reasoning, execution loop, session continuity, and native Skill discovery/invocation. Skills add bounded procedural depth; do not create a Plugin-side Skill ranker, route table, active-Skill state, next-Skill scheduler, continuity store, or pretend handoff.
- Reality before claims: bind the actual target and strongest inspectable source/runtime/evidence before docs, summaries, memory, or handoffs. Preserve contradiction and missing context instead of guessing.
- Read -> note -> decide/act -> load more. Inspect only slices that can change the current decision, authority, mechanism, or proof; record decision-changing facts as discovered.
- Plan enough for non-trivial mutation: goal, affected surfaces, material unknowns, steps, and proof. Persist planning only when continuity, coordination, or project rules require it.
- Scale rigor by semantic uncertainty x consequence; authority remains a separate gate. Stop only the affected mutation when consequential uncertainty or missing authority blocks it.
- Prove touched behavior first and widen only for dependency, blast radius, policy, risk, or release. Never upgrade `FAIL`, `MISSING`, or `NOT_RUN` through wording or approval.
- Reuse before adding. Match representation to the reasoning shape. Keep internal evidence rich and user communication decision-dense. Stop when the requested outcome and its material correctness/authority/evidence obligations are satisfied.
"""


def main() -> int:
    payload = {
        "continue": True,
        "suppressOutput": True,
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": RESIDENT_GUIDANCE.strip(),
        },
    }
    json.dump(payload, sys.stdout, ensure_ascii=False, separators=(",", ":"))
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
