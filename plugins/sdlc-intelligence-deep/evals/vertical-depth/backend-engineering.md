# Frozen Behavioral Qualification Cases — backend-engineering

These cases were derived and pressure-tested before the backend-engineering candidate edit. They test whether the Skill changes implementation decisions rather than merely adding backend terminology. Runtime execution is `NOT_RUN` until a real model/Skill runner compares baseline and candidate behavior.

## Rubric dimensions

- `RESPONSIBILITY_SUBSTRATE`: inventories what caller/frontend, backend, DB, runtime/cache and provider already own before inventing a new mechanism.
- `DATA_EFFECT_LINEAGE`: traces untrusted/derived data, durable state, external effects, outputs and consumers rather than only function calls.
- `SEMANTIC_AUTHORITY`: separates canonical business meaning from advisory/projection and durable/atomic enforcement.
- `OPERATION_IDENTITY`: distinguishes another execution from the same logical intent and avoids once-only assumptions.
- `CRASH_RESIDUE`: names durable, absent and possible/unknown state/effects at interruption points.
- `COMPOSITION_OWNERSHIP`: identifies partial/ambiguous handoff states and requires an owner for the next action without prescribing one universal pattern.
- `REUSE_DISCRIMINATION`: reuses/consolidates by meaning, invariant, lifecycle and failure semantics rather than syntax.
- `BOUNDARY_DISCIPLINE`: returns API/data/security/operations/design truth gaps instead of absorbing sibling ownership.

## Case B1 — signup validation across frontend, backend and database

Frontend validates email format and availability; backend handles signup; the database already has a unique index on normalized email. Two concurrent signups race for the same address.

Strong behavior must:
- treat browser input as untrusted despite frontend validation;
- inspect existing normalization, unique constraint/index and conflict/error mapping before adding another uniqueness owner;
- separate frontend UX check, backend canonical validation/business outcome and DB atomic uniqueness enforcement;
- avoid claiming an application `exists()` pre-check proves uniqueness under concurrency;
- route any unresolved canonical email/identity meaning to its data/domain owner rather than redefining it locally.

## Case B2 — checkout timeout and duplicate execution

Frontend disables the Buy button, backend creates an order and calls a payment provider, but the response is lost. The client retries; provider supports an operation/idempotency identity.

Strong behavior must:
- reject frontend button state as proof of once-only execution;
- distinguish a repeated execution from whether it is the same logical purchase intent;
- inspect current order/operation identity plus provider identity before inventing a new dedupe scheme;
- classify provider outcome as success/failure/unknown from actual evidence rather than transport status alone;
- bind retry/observe/reconcile behavior to approved semantics and the same logical identity when applicable.

## Case B3 — DB commit succeeds, event publication fails

A service commits an order state, then publishes `OrderConfirmed`; the broker is unavailable after the DB commit. Downstream fulfillment depends on the event.

Strong behavior must:
- identify the DB/event handoff as a dual-write/composition seam;
- state the committed-but-unpublished residue and its impact on operation completion;
- inspect existing event/outbox/change-capture/reconciliation infrastructure before introducing a new pattern;
- require a recovery owner for definite/ambiguous publication failure;
- avoid prescribing transactional outbox/saga universally when the fixed consistency/operations contract is unknown.

## Case B4 — provider effect succeeds, local finalize fails

A refund provider reports success, but local transaction/update fails; in another branch the provider response is lost after dispatch.

Strong behavior must:
- separate provider-side fact from application business completion;
- distinguish durable provider success from ambiguous remote effect and failed local finalize;
- reject the inference that local rollback reversed the provider effect;
- choose only an approved resume/observe/reconcile/compensate/retry/terminal path from available evidence;
- surface a missing recovery/consistency policy rather than inventing compensation.

## Case B5 — inventory preview versus durable reservation

Frontend displays `1 left`; backend uses `read stock -> if > 0 -> write stock-1`; the DB has no mechanism that prevents two concurrent reservations from both succeeding.

Strong behavior must:
- treat frontend availability as a stale-able projection, not reservation authority;
- identify backend as operation owner only if that matches the fixed architecture;
- recognize that service-layer structure alone does not prove the durable stock invariant under concurrency;
- inspect actual DB transaction/constraint/locking mechanism and route storage-specific correction to data-persistence depth when needed;
- avoid moving the whole reservation lifecycle into a DB trigger merely because atomic enforcement belongs near storage.

## Case B6 — presentation-only state must not be forced into backend

A UI table has local expanded-row state and temporary sort direction with no cross-session, shared or business meaning. A change proposes a new backend API and DB table so backend can be the “source of truth.”

Strong behavior must:
- ask whether the state has durable/shared/business semantics at all;
- keep presentation-local state on the frontend when no material contract requires persistence;
- reject backend/database ownership created only for architectural symmetry;
- avoid treating “source of truth” as a reason to centralize every state.

## Case B7 — similar retry loops, different owners

HTTP request retry and durable worker redelivery both use exponential backoff. A refactor proposes one `RetryManager` owning counts, deadlines and terminal semantics for both.

Strong behavior must:
- distinguish request deadline/cancellation/remote ambiguity from durable progress/redelivery/terminal worker semantics;
- reject one policy owner based only on loop shape;
- allow sharing a small stateless backoff/jitter primitive when its semantics truly align;
- preserve service-runtime versus background-attempt ownership boundaries.

## Case B8 — object storage succeeds, metadata DB write fails

An upload path validates on frontend and backend, writes bytes to object storage, then persists ownership/metadata in the DB. The process dies after the object write but before DB commit; retry may generate another object key.

Strong behavior must:
- inspect existing object identity, DB schema/constraints/status and cleanup/reconciliation paths before adding a tracker;
- trace bytes/metadata from input through storage and durable ownership state;
- identify the orphan-object crash residue and repeated-execution risk;
- distinguish object existence truth from application ownership truth;
- choose only an approved delete/compensate/adopt/reconcile/deterministic-identity mechanism or return the missing policy/owner gap.
