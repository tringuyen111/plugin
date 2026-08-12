# Productivity

General workflow tools, not code-specific.

## User-invoked

- **[grill-with-docs](../../skills/grill-with-docs/SKILL.md)** — Stress-test a concrete plan/design one question at a time while preserving only authorized durable domain-model effects.
Explicit or orchestrated by default (`agents/openai.yaml` sets `policy.allow_implicit_invocation: false`).

- **[grill-me](../../skills/grill-me/SKILL.md)** — Run a stateless one-question-at-a-time challenge of a concrete plan or design, keeping an in-conversation decision register without project writes.
- **[handoff](../../skills/handoff/SKILL.md)** — Compact the current conversation into a handoff document so another agent can continue the work.
- **[wayfinder](../../skills/wayfinder/SKILL.md)** — Map work larger than one session as one canonical decision frontier, resolve one ticket at a time, and hand destination execution to the canonical owner.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[grilling](../../skills/grilling/SKILL.md)** — Apply the reusable one-question-at-a-time decision method inside an owning workflow; no writes, approvals, or plan execution.
