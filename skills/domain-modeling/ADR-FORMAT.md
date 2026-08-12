# Architecture Decision Record Format

Use this format only when the project has authorized a durable architecture-decision artifact. Resolve the canonical decision store, naming convention, identifier policy, and write authority from current project truth before persisting anything.

A repository may use `docs/adr/0001-slug.md`, another directory, a wiki, a tracker, a decision database, or an inline handoff. None of those locations is assumed by this skill.

## Minimum semantic record

Preserve these fields in whatever authorized store the project uses:

```md
# {Short title of the decision}

{Context: what constraint or problem made a decision necessary.}

{Decision: what was accepted and by whom.}

{Rationale: why this option was selected over material alternatives.}
```

The record may remain one concise paragraph when those semantics are still clear. The value is in preserving what was decided, why, its authority, and what it affects—not in filling out a template.

## Optional fields

Include only when they add decision value:

- **Status** — proposed, accepted, deprecated, or superseded, using the project's vocabulary.
- **Decision owner and date** — when authority or sequence matters.
- **Considered alternatives** — when rejected options are likely to recur.
- **Consequences** — when downstream effects are not obvious.
- **Affected artifacts and evidence** — when traceability or migration depends on them.
- **Supersession link** — when another decision replaces this one.

## Identifier and location policy

- Reuse the project's existing identifier and location convention when one exists.
- Do not invent sequential numbering merely because this reference contains an ADR example.
- Do not create a directory, wiki page, tracker item, or other persistent artifact without authority.
- If no durable store is available, return an inline decision-record draft and report persistence as `NOT_RUN` or `BLOCKED` rather than pretending it was recorded.

## When to offer a decision record

All three conditions should hold:

1. **Hard to reverse** — changing the decision later has meaningful cost.
2. **Surprising without context** — a future maintainer could reasonably question why this path was chosen.
3. **A real trade-off existed** — material alternatives were considered and one was selected for specific reasons.

Skip a durable record for routine, easily reversible, or self-evident choices.

### Typical qualifying decisions

- Architectural shape or ownership boundaries.
- Integration patterns between contexts.
- Technology choices with material lock-in.
- Scope and data-ownership decisions.
- Deliberate deviations from an obvious default.
- Constraints not visible in source.
- Rejected alternatives whose rationale would otherwise be rediscovered.
