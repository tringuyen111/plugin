# Use Case Artifact

```markdown
# UC-<id> — <actor goal>

**Status:** DRAFT | REVIEWED | APPROVED | SUPERSEDED
**Behavior package / source identity:** <canonical Behavior Package or Product/domain source>
**Source location:**
**Source revision:**
**Behavior truth basis:** CURRENT_VERIFIED | TARGET_AUTHORIZED | PROPOSED_OR_ASSUMED
**Product scope:** EPC-<id> or canonical Product scope reference
**Primary actor:** ACT-<id>
**Supporting actors:**

## Goal

## Current / target / assumption conflict

Use only when more than one truth basis matters. Preserve current behavior, authorized target, and unresolved proposal separately instead of merging them.

## Trigger

## Preconditions

## Business-visible commitment boundary

Optional. State the business-observable point after which an obligation/effect already exists and later cancellation/failure requires recovery or compensation. Do not specify a database transaction boundary.

## Main flow

1. ...

## Alternate flows

### A1 — <name>

## Error and recovery flows

### E1 — <name>

## Interruption / unknown / partial outcome flows

### I1 — <name>

Record UNKNOWN/pending/reconciliation behavior, already-real partial business effects, delayed confirmation, cancellation/compensation, or other interruption semantics only when material.

## Retry / duplicate semantics

State the business meaning/guarantee for repeated actor intent or link the controlling `BR-*`. Do not prescribe idempotency keys, locks, queues, retry counts, or other technical mechanisms.

## Multi-actor / time-dependent conditions

Link authoritative Business Rules for actor authority, conflict/precedence, effective periods, deadlines or business calendars. Keep unresolved policy explicit.

## Postconditions

### Success

### Failure / no-change guarantees

### Partial / pending / reconciliation-required

Use only when the operation can have a materially partial or unknown business outcome.

## Business rules

- BR-...

## Business concepts and state transitions

## Non-goals

## Open behavior questions

| Question | Owner | Blocking | Source/conflict |
|---|---|---|---|
```
