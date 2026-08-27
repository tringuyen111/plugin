# Acceptance Continuity

Load this reference only when interruption, UNKNOWN/pending outcome, partial commitment, repeated intent, cancellation/compensation, multi-actor conflict, or effective-time behavior changes what is acceptable for the item.

This reference deepens **observable acceptance semantics**. It does not prescribe technical recovery, retry, transaction, queue, locking, or test-execution mechanics.

## Independent acceptance dimensions

Do not force continuity into one mutually exclusive outcome enum. Preserve only the dimensions that change acceptance meaning:

- **Effect Evidence State** — for each material business-visible effect, state `ESTABLISHED`, `NOT_ESTABLISHED`, or `UNKNOWN`;
- **Partial Progress** — separately state which established subset of the business operation is already real when the full required result is incomplete;
- **actor-visible status / obligation** — rejected/no-change, accepted/pending/reconciliation-required, completed, compensated/reversed, or another authorized business status only when that status changes the criterion;
- **final postcondition** — what observable condition eventually closes the accepted/rejected/reconciled path.

These dimensions can coexist. Known Partial Progress may exist while another material effect remains `UNKNOWN`; an actor-visible pending state may coexist with established effects. Do not turn timeout, acknowledgement, missing response, or one transport result into automatic whole-operation success/failure.

## Continuity map

When material, pressure the criterion with:

```text
trigger / condition
-> business operation + concrete submission/attempt relation when repetition is material
-> per-effect Effect Evidence State
-> established Partial Progress
-> actor-visible status or obligation
-> safe repeat/cancel/reconcile behavior
-> controlling Business Rule / authority
-> final observable postcondition
```

If a retry, duplicate, compensation, precedence, or effective-time choice lacks authoritative rule truth, keep the affected criterion/question unresolved instead of inventing behavior.

## Partial commitment

For a partially completed business operation, preserve only material observable facts:

- effects already real;
- effects not completed;
- pending/reconciliation-required status;
- no-duplicate/no-extra-effect guarantees when authorized;
- required refund/release/reversal/notification/manual review obligation when authoritative;
- final accepted postcondition.

A business compensation obligation does not prescribe technical rollback.

## Repeated intent and multiple actors

Repeated actor submissions may be **Request Attempts** (concrete submissions/deliveries) for the same **Logical Operation** (one business-visible intent/effect obligation), new Logical Operations, or attempts only to query/reconcile a prior operation. Bind that relation from authoritative behavior/rule truth; equal payloads, request/delivery IDs, or retry labels do not decide it. Acceptance Criteria may state the observable duplicate/no-extra-effect guarantee only when that business meaning is grounded.

For multi-actor/time conflicts, state the accepted observable outcome and link authoritative precedence/effective-time semantics. Do not invent last-write-wins, queue order, locking, or merge policy.

## Stop rule

Do not enumerate continuity branches that cannot change acceptance. A simple stateless criterion remains simple. Load this reference only when the absence of continuity semantics could change accepted/rejected/pending meaning, negative guarantees, or the final postcondition.
