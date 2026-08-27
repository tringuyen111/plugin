---
name: handoff
description: Compact verified project and conversation state into a continuation artifact when another owner, agent, session, or runtime needs durable/inline transfer that ordinary bounded results and canonical references cannot provide. Do not use for in-process supporting-Skill returns, same-session capability transitions, or a mere next-step/owner note that needs no transferred state.
---

# Handoff

Transfer only the state a different owner, agent, session, or runtime cannot safely recover from canonical sources. A handoff is a compact delta + index, not a project summary and not a replacement for specs, plans, issues, source, commits, diffs, or evidence.

If arguments are provided, treat them as the receiving context's goal and include only what can change that continuation.

## Necessity gate

Use this Skill only when at least one boundary is real:

- the user explicitly asks for a handoff/checkpoint;
- a different owner/authority must continue and needs transferred execution state;
- a new session/agent/runtime cannot safely recover current state from canonical sources;
- project policy requires a persisted continuation artifact.

Do **not** create a handoff because another Skill becomes useful. A supporting Skill returns bounded evidence/decision to the active job, and a same-session capability transition continues without a handoff artifact. A next-action or likely-owner note is also not a handoff when canonical sources already carry the state.

## Bind the transfer boundary

Before writing, establish only what is material:

1. receiving goal and real continuation boundary;
2. canonical work item/source/artifact references;
3. changes since the last recoverable point;
4. proof already executed and its limits;
5. open blockers, contradictions, risks, or authority gaps;
6. exact next executable action and required input/capability;
7. sensitive-data constraints and delivery destination when persistence is required.

Do not repair conflicting project truth inside the handoff. Name the contradiction and point to the competing canonical sources.

## Deliver safely

Choose delivery in this order when persistence matters: explicit compliant user destination -> verified project convention -> approved runtime artifact storage -> inline transfer -> explicitly approved temporary fallback.

Never assume temporary storage is durable, private, or visible to the receiver. Never claim persistence until the artifact can be reopened or otherwise verified.

Exclude credentials, tokens, private keys, session secrets, and raw authentication material. Minimize personal, customer, production, and confidential data. Prefer identifiers or access-controlled references over copied content. Do not weaken retention, residency, audience, or access policy for convenience.

If persistence was required but no safe writable destination exists, deliver inline only when that still satisfies the receiver; otherwise return `BLOCKED`. Do not invent a file write.

## Build a delta handoff

Default to this shape and omit empty/non-material sections:

```markdown
# Handoff

## Goal
<what the receiver must continue or decide>

## Changed
<only execution-relevant deltas since the recoverable baseline>

## Proved
<tests/runtime/inspection actually executed + limits>

## Open
<blockers, contradictions, risks, unknowns, unauthorized actions>

## Next
<one exact executable next loop, required inputs/authority, stop condition>

## Refs
<canonical paths/IDs/commits/artifacts to open and why>
```

Add only when material:

- **Authority** — the real human/project/policy decision or permission boundary;
- **Delivery** — persisted/inline mode, verified path/resource, access/retention limitation;
- **Upstream result** — a status/result only when a canonical producing source actually defines it.

Do not add a capability inventory, suggested-Skill catalogue, lifecycle recap, or duplicated source text merely to look complete. Mention a Skill/capability only when the receiver needs it to execute the next loop or when its absence is the blocker.

## Reference instead of duplicate

For specs, plans, ADRs, issues, diagrams, commits, diffs, test reports, logs, and generated artifacts:

- reference the canonical path/resource/commit/URL;
- state why it matters to the next loop;
- quote only the minimum needed to expose a contradiction or decision;
- state when the next runtime may lack access rather than copying restricted content as a workaround.

## Verify and close

Before completion:

1. reopen a persisted artifact when one was written;
2. check canonical references as far as the runtime permits;
3. check that sensitive values are absent;
4. verify every claim against source evidence rather than summary wording;
5. verify that `Next` is executable and names any real authority/capability requirement.

Completion states describe transfer quality only. Keep them internal unless the label itself helps the receiver or the user asks for it:

- `READY` — the declared continuation state is sufficient, truthful, safe, and delivery is verified when persistence was required.
- `PARTIAL` — useful transfer exists but a material reference, access, persistence, or continuation fact remains unresolved.
- `BLOCKED` — safe or sufficient transfer cannot occur because required evidence, authority, or destination is unavailable.
- `FAILED` — an attempted transfer/write is untrusted, contradictory, unsafe, or falsely reported.
