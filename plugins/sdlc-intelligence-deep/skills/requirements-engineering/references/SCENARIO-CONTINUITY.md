# Scenario Continuity

Load this reference only when interruption, UNKNOWN outcome, partial commitment, repeated intent, cancellation/compensation, multi-actor conflict, or effective-time behavior can materially change the actor goal, obligation, permission, business-visible state, or safe next action.

This reference owns **Use Case scenario continuity**, not technical recovery design. Keep the scenario business-observable and link authoritative Business Rules when policy is needed.

## 1. Classify the observable outcome before inventing a branch

For an interrupted or externally confirmed action, distinguish only states that change business interpretation:

- **NOT_STARTED / NO_CHANGE** — the requested business effect definitely did not occur;
- **COMPLETED** — the externally meaningful effect is known to have occurred;
- **PARTIAL** — one or more externally meaningful effects occurred but the goal is not fully complete;
- **UNKNOWN / PENDING** — available evidence cannot yet determine whether the business effect occurred;
- **COMPENSATED / REVERSED** — a later business action addressed an already-real effect when that distinction matters.

Do not collapse `UNKNOWN` into success or failure. An acknowledgement, timeout, lost response, or incomplete observation is evidence about certainty, not automatically the business outcome.

## 2. Define the safe actor/business next action

When the outcome is not final, state what the actor or business may safely do next and what remains prohibited or unresolved. Ask:

```text
observable outcome certainty
-> actor-visible status / obligation
-> safe next action
-> rule/authority governing retry, cancellation, compensation or escalation
-> final/reconciliation trigger
```

If no authorized rule determines a retry or compensation choice, keep that branch unresolved rather than assuming the action is safe.

## 3. Preserve business commitment boundaries

A **business-visible commitment boundary** is the point after which a meaningful obligation/effect has changed from the actor or business perspective. It is not a database transaction boundary.

For a partial scenario, identify only what is material:

- which externally meaningful effects already happened;
- which effects did not happen;
- current actor-visible/business status;
- whether cancellation remains allowed;
- any required refund/release/reversal/notification/manual review or other business obligation;
- which rule or authority owns that obligation.

Architecture/Engineering own transaction design, queues, locks, idempotency keys, retry counts, and technical rollback.

## 4. Treat repeated intent as business semantics

When the actor repeats the same intent, distinguish:

- retry the same business intent;
- create a new intent;
- query/reconcile the prior intent;
- reject/merge a duplicate according to an authoritative Business Rule.

Do not infer technical idempotency from a business duplicate guarantee, and do not infer a business duplicate guarantee from an implementation mechanism.

## 5. Handle multi-actor and effective-time conflicts explicitly

When multiple actors/channels can affect the same subject, expose the business-visible conflict and link the rule that defines authority/precedence. Do not invent last-write-wins, locking, queue ordering, or merge behavior as business policy.

When behavior changes by date/time, preserve the authoritative effective period, timezone/business calendar, or deadline only when material. Do not merge current and future rules into a timeless compromise.

## 6. Completion pressure

A continuity branch is sufficiently resolved when the Use Case can state, for the material condition:

- what is observably known vs unknown;
- which business effect/obligation exists;
- what the actor may safely do next;
- which authoritative rule governs any permission/precedence/compensation choice;
- what remains unresolved;
- without prescribing the technical mechanism.

Keep simple stateless interactions simple. Do not enumerate every theoretical timeout, retry, duplicate, compensation, or concurrent action.
