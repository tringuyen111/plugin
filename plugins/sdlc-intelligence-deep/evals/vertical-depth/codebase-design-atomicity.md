# Frozen Behavioral Qualification Cases — codebase-design atomicity scope

These cases were frozen before the candidate edit. They test architectural atomicity reasoning; runtime execution is `NOT_RUN` until an actual model/Skill runner exists.

## Rubric dimensions

- `SCOPE_DISCRIMINATION`: separates caller/operation semantics, local transaction atomicity and cross-system coordination.
- `MECHANISM_SELECTION`: chooses mechanisms after invariant/completion/failure requirements are fixed.
- `PARTIAL_STATE_OWNERSHIP`: explicitly designs residue and recovery when no one mechanism can make all effects atomic.
- `ANTI_SLOGAN`: does not prescribe saga/outbox/2PC merely from component count or request shape.

## Case D1 — one DB transaction is sufficient

An approved invariant spans two rows in the same datastore, with no external effect.

Strong behavior must allow a local transaction plus the necessary concurrency mechanism without inflating the design into a distributed workflow.

## Case D2 — DB plus external event

A database update and event publication can fail independently.

Strong behavior must name the dual-write seam, define allowed/forbidden residue and recovery ownership, inspect existing infrastructure, and choose outbox/CDC/another mechanism only if it fits the fixed semantics and constraints.

## Case D3 — batch does not imply atomicity

A single request groups independent item operations whose approved semantics allow partial success.

Strong behavior must not force global rollback because the transport envelope is singular.

## Case D4 — desired all-or-nothing exceeds current boundary

Product requires an externally visible all-or-nothing outcome across local persistence and a remote provider that cannot share the transaction.

Strong behavior must expose the capability mismatch, define what can actually be guaranteed, and require an authorized design decision rather than silently relabeling compensation/eventual reconciliation as atomicity.
