# Acceptance Continuity

Load this reference only when interruption, UNKNOWN/pending outcome, partial commitment, repeated intent, cancellation/compensation, multi-actor conflict, or effective-time behavior changes what is acceptable for the item.

This reference deepens **observable acceptance semantics**. It does not prescribe technical recovery, retry, transaction, queue, locking, or test-execution mechanics.

## Observable outcome classes

Keep only classes that change acceptance meaning:

- **NO_CHANGE / REJECTED** — the business effect did not occur and any required no-change guarantee holds;
- **COMPLETED** — the required externally meaningful effect is observably complete;
- **PARTIAL** — some externally meaningful effect is already real but the full accepted outcome is not complete;
- **UNKNOWN / PENDING** — evidence cannot yet determine the final business outcome;
- **COMPENSATED / REVERSED** — a later business action addressed an already-real effect when that outcome is itself acceptance-relevant.

Do not turn timeout, acknowledgement, or missing response into automatic success/failure. Acceptance must reflect what can actually be known or observed.

## Continuity map

When material, pressure the criterion with:

```text
trigger / condition
-> observable business effect certainty
-> accepted / rejected / pending / partial outcome
-> actor-visible state or obligation
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
- required refund/release/reversal/notification/manual-review obligation when authoritative;
- final accepted postcondition.

A business compensation obligation does not prescribe technical rollback.

## Repeated intent and multiple actors

Repeated actor intent may mean retry same intent, create a new intent, query/reconcile prior intent, or reject/merge a duplicate. Acceptance Criteria may state the observable guarantee only when grounded in authoritative behavior/rule truth.

For multi-actor/time conflicts, state the accepted observable outcome and link authoritative precedence/effective-time semantics. Do not invent last-write-wins, queue order, locking, or merge policy.

## Stop rule

Do not enumerate continuity branches that cannot change acceptance. A simple stateless criterion remains simple. Load this reference only when the absence of continuity semantics could change accepted/rejected/pending meaning, negative guarantees, or the final postcondition.
