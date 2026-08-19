# Intake Brief

Use an Intake Brief when grounded issue/PR intake truth must survive a context boundary, be posted durably to the canonical item, or be handed to the next accountable owner. It is **not** an execution plan, requirements artifact, architecture decision, or substitute for the original item.

## Core rule

Project existing authoritative truth; do not invent missing truth to make an item look actionable.

A useful brief answers only what the next owner needs:

```text
Canonical item
Origin / provenance
Observed or requested claim
Claim evidence + conditions
Accepted target/outcome, if authoritative
Known constraints / linked authoritative decisions
Unresolved facts or owner decisions
Actionability frontier
Disposition + reason
Next accountable continuation
Evidence/provenance pointers
```

Omit fields that add no decision value.

## Projection discipline

- Preserve exact Product/Requirements/Design/Architecture/Engineering/QA/release truth only when it already exists at an authoritative source; cite/link its identity or revision when available.
- Do not create acceptance criteria, interfaces, technical seams, sequencing, rollout strategy, or proof obligations inside the brief merely because the next owner would benefit from them. If they are missing and material, record the appropriate frontier.
- Current source/runtime behavior is evidence, not automatic authorization for desired target behavior.
- Avoid brittle file paths/line numbers unless the next continuation genuinely depends on an exact current evidence pointer; distinguish evidence location from durable semantic truth.
- Do not duplicate the entire issue thread. Consolidate current meaning and preserve only decision-changing provenance.

## Compact template

```markdown
## Intake Brief

**Canonical item:** <provider/id/link when available>
**Origin:** <external report / external PR / ad-hoc request / explicit re-triage / other grounded origin>

**Claim / requested outcome:**
<what the item actually asserts or asks for>

**Evidence:**
- <CONFIRMED / CONTRADICTED / INSUFFICIENT / NOT_APPLICABLE + material conditions>
- <key source/runtime/tracker evidence>

**Authoritative truth already available:**
- <accepted requirement/design/interface/etc. + source identity, only when it exists>

**Unresolved frontier:**
- <missing external fact or protected owner decision; omit when none>

**Disposition:** <ACTIVE / DUPLICATE / ALREADY_SATISFIED / REJECTED / OBSOLETE_OR_CONTRADICTED or project-native equivalent>

**Next continuation:**
<next accountable outcome/owner and why>
```

## Contrast

Good:

> The crash is confirmed on supported build 8.4 with the reporter's malformed import sample. The existing requirement already states imports must reject malformed rows without process termination. No sequencing or architecture decision is open. Disposition: ACTIVE. Next continuation: bounded implementation and regression proof.

Bad:

> Add a new parser service, modify `src/import.ts`, and accept if three new tests pass.

The bad version invents implementation shape and proof/acceptance decisions that Issue Triage does not own.
