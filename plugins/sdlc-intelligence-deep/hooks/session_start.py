#!/usr/bin/env python3
"""Emit the thin SDLC Intelligence operating kernel for Codex SessionStart."""

from __future__ import annotations

import json
import sys

KERNEL = """SDLC Intelligence session operating kernel (plugin-level; never a replacement for a Skill):

- One user outcome owns the active session. Skill activation is bounded expertise, not a handoff; supporting results return to the active job.
- Continue in the same capable, authorized agent/session/runtime while that outcome remains active. Handoff only on explicit request or a real agent/session/runtime/authority boundary that needs transferred state.
- Reality before claims: bind the actual target and strongest available evidence before trusting docs, memory, summaries, or prior handoffs. Preserve contradictions and missing context.
- Plan enough for non-trivial mutation: goal, affected surfaces, material unknowns, steps, proof. Persist planning only when continuity, coordination, or project rules require it.
- Read -> note -> decide/act -> load more. Inspect the smallest decision-relevant slice and record decision-changing facts as discovered; do not preload everything and summarize later.
- Match representation to the problem shape; prefer the smallest faithful prose/process/table/tree/state/matrix/graph/diagram/script/tool form.
- Prove the touched behavior first; widen only for dependency, blast radius, risk, policy, or release needs. Never claim unexecuted proof.
- Keep evidence rich internally and communication decision-dense externally: outcome/decision -> evidence -> blocker/next action. Do not narrate routing, Skill transitions, local status labels, or internal checklists unless material or requested.
- Reuse before adding, prefer the simplest sufficient mechanism, and do not widen scope merely to clean unrelated surfaces.
"""


def main() -> int:
    # SessionStart sends JSON on stdin. The kernel is intentionally invariant across
    # startup/resume/clear/compact, so input is consumed only to keep the command
    # well-behaved and future-compatible; no session/user data is persisted.
    try:
        raw = sys.stdin.read()
        if raw.strip():
            json.loads(raw)
    except (OSError, json.JSONDecodeError):
        # Context injection is safe without inspecting event fields. Do not block a
        # session because a host version changes nonessential input details.
        pass

    payload = {
        "continue": True,
        "suppressOutput": True,
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": KERNEL.strip(),
        },
    }
    json.dump(payload, sys.stdout, ensure_ascii=False, separators=(",", ":"))
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
