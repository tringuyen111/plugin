# Scenario Continuity

Load this reference only when interruption, UNKNOWN outcome, partial commitment, repeated intent, cancellation/compensation, multi-actor conflict, or effective-time behavior can materially change the actor goal, obligation, permission, business-visible state, or safe next action.

This reference owns **Use Case scenario continuity**, not technical recovery design. Keep the scenario business-observable and link authoritative Business Rules when policy is needed.

## 1. Separate effect evidence from progress before inventing a branch

For an interrupted or externally confirmed action, preserve only dimensions that change business interpretation:

- **Effect Evidence State** — for each material business-visible effect, state `ESTABLISHED`, `NOT_ESTABLISHED`, or `UNKNOWN`;
- **Partial Progress** — separately identify the established subset already real when the actor goal is not fully complete;
- **actor-visible status / obligation** — no-change/rejected, pending/reconciliation-required, completed, compensated/reversed, or another authoritative business status when that changes the scenario;
- **final/reconciliation condition** — what observation/event can legitimately close the scenario.

These dimensions may coexist. A scenario can have established Partial Progress while another effect remains `UNKNOWN`. Do not collapse `UNKNOWN` into success or failure, and do not let an acknowledgement, timeout, lost response, or incomplete observation stand in for the business effect itself.

## 2. Define the safe actor/business next action

When the outcome is not final, state what the actor or business may safely do next and what remains prohibited or unresolved. Ask:

```text
business operation + concrete submission/attempt relation when repetition is material
-> per-effect Effect Evidence State
-> established Partial Progress
-> actor-visible status / obligation
-> safe next action
-> rule/authority governing retry, cancellation, compensation or escalation
-> final/reconciliation trigger
```

If no authorized rule determines a retry or compensation choice, keep that branch unresolved rather than assuming the action is safe.

## 3. Preserve business commitment boundaries

A **business-visible commitment boundary** is the point after which a meaningful obligation/effect has changed from the actor or business perspective. It is not a database transaction boundary.

When Partial Progress is material, identify only what matters:

- which externally meaningful effects are `ESTABLISHED`;
- which are `NOT_ESTABLISHED`;
- which remain `UNKNOWN`;
- which established subset constitutes Partial Progress;
- current actor-visible/business status;
- whether cancellation remains allowed;
- any required refund/release/reversal/notification/manual review or other business obligation;
- which rule or authority owns that obligation.

Architecture/Engineering own transaction design, queues, locks, idempotency keys, retry counts, and technical rollback.

## 4. Treat repeated submissions as business semantics

When an actor submits again, treat each concrete submission/delivery as a **Request Attempt** and first determine whether those attempts belong to the same **Logical Operation** (one business-visible intent/effect obligation), represent new Logical Operations, or only query/reconcile a prior operation. Equal payloads, request/delivery IDs, retry labels, or transport behavior do not decide that relation.

Then preserve only the authoritative business behavior: advance/retry the same Logical Operation, create a new operation, query/reconcile the prior operation, or reject/merge a duplicate according to an authoritative Business Rule.

Do not infer technical idempotency from a business duplicate guarantee, and do not infer a business duplicate guarantee or Logical Operation identity from an implementation mechanism.

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
