# Brainstorm Changelog Convention

The living brainstorm artifact keeps a concise frontmatter changelog for **material semantic changes**, not every interview turn.

Example:

```yaml
changelog:
  - 2026-08-09 | /brainstorm | finalized current brainstorm; OQ-3 remains open
  - 2026-08-09 | /brainstorm | OQ-2 resolved by DEC-4; updated OAuth recovery and PRD impact handoff
  - 2026-08-08 | /brainstorm | created working brainstorm artifact
```

## Entry format

```text
- {YYYY-MM-DD} | /brainstorm | {factual note}
```

## Rules

- Use the actual runtime/conversation date in ISO `YYYY-MM-DD`.
- Keep the note factual and concise while preserving the material change.
- Mention an OQ ID when resolving it materially changes behavior; if it creates a material accepted decision, link the new `DEC-n` (for example, `OQ-2 resolved by DEC-4`).
- When a material accepted decision replaces another, record `DEC-new supersedes DEC-old`; never renumber or reuse decision IDs.
- Record `reopened for revision` / `finalized` when lifecycle state changes matter.
- `reported downstream impact` is valid; `updated PRD` is false unless the PRD owner/workflow actually changed it.
- Do not depend on repo hooks or environment variables unless the runtime proves they exist and ran.
- Chat-only mode may include the changelog in the logical Markdown artifact, but must not claim a durable file write.
- Do not turn changelog into a full history archive. The artifact body carries current truth; source-control/release history carries source history when available.
