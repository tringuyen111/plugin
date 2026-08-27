# Behavior Semantics Contract

Use this reference when selected requirement semantics are stateful, interruptible, repeated, multi-actor, time-dependent, rule-heavy, or when current behavior conflicts with authorized target behavior. Do not load it merely to make a simple stateless requirement look more formal.

This contract deepens **business-visible behavior semantics** across whichever canonical requirement views are material. It does not require a fixed artifact package.

## Contents

1. Truth altitude
2. Product constraint carry-forward
3. State and transition semantics
4. Interrupted and repeated operations
5. Partial effects, recovery, and compensation
6. Multi-actor and time-dependent behavior
7. Rule authority and precedence
8. Requirement-view ownership and downstream boundary
9. Composition completion and failure semantics

## 1. Truth altitude

Keep three kinds of behavior truth distinct:

- **CURRENT_VERIFIED** — behavior supported by inspectable current runtime/source or another authoritative current-state source. It describes what happens now; it is not automatically the desired requirement.
- **TARGET_AUTHORIZED** — behavior authorized by the exact Product/domain/requirement decision revision for the target capability. This is target BA truth that may be expressed through one or more canonical requirement views.
- **PROPOSED_OR_ASSUMED** — stakeholder proposal, inference, unresolved branch, or working assumption that lacks the authority/evidence needed to become target truth.

A mismatch is information, not permission to choose silently. Preserve both sides, name the canonical decision owner, and mark only affected views/consumers stale or blocked through their canonical mechanism when authorized. Do not convert a legacy runtime quirk into a Business Rule merely because it exists. Do not convert a stakeholder idea into target behavior merely because it sounds plausible.

## 2. Product constraint carry-forward

Bind the strongest applicable Product/domain source identity and exact revision when one exists. Carry only decision-relevant constraints that can change BA behavior, such as:

- target actor/segment and scope/non-goals;
- evidence dependency, selection, transferability, or counter-evidence that limits a behavior claim;
- unresolved Product assumption or risk that constrains a branch;
- user/business outcome constraints material to behavior;
- metric proxy or guardrail caveats when they limit the intended behavior or harm boundary.

Link the canonical Product artifact instead of copying its full discovery/evidence corpus. A Product metric or target does **not** automatically become Acceptance Criteria, a Business Rule, or a validation threshold. If Product intent changes materially, rebind and re-evaluate only the affected requirement views before calling their meaning current.

## 3. State and transition semantics

Use a business state only when it changes what an actor/business can observe, do, owe, or expect. Do not treat every screen state as a canonical business state.

For a material business state, resolve or link:

```text
business state
-> business event / trigger that can enter it
-> transition guard / authority
-> actor-visible meaning or obligation
-> valid exits
-> invalid transitions and no-change guarantee
-> selected canonical requirement view(s)
```

Preserve **invariant** separately from workflow step. An invariant must remain true across relevant transitions; it is not merely another numbered action.

When an operation has an externally meaningful point after which the business obligation/result has changed, name a **business-visible commitment boundary**. This is not a database transaction boundary and does not prescribe storage or implementation.

## 4. Interrupted and repeated operations

For an operation that can be interrupted, time out, be retried, or receive a duplicate request, keep **operation identity**, **attempt identity**, **effect evidence**, and **progress** separate:

1. **Bind the Logical Operation** — the single business-visible intent/effect obligation being reasoned about. Do not infer operation equivalence from equal payload, request/delivery ID, timeout, acknowledgement, or transport retry alone. If authoritative Product/domain/Business Rule truth cannot establish whether two submissions are the same intent or new intents, keep that relation unresolved.
2. **Name material Request Attempts** — the concrete submissions/deliveries that tried to advance or observe that Logical Operation. Attempt identity is evidence about execution, not business-operation authority.
3. **Classify each material effect independently.** `Effect Evidence State = ESTABLISHED | NOT_ESTABLISHED | UNKNOWN` states what authoritative current evidence establishes for each business-visible effect. A lost response can leave an effect `UNKNOWN`; it does not prove the effect did not happen.
4. **Record Partial Progress separately** — the subset of a multi-step Logical Operation already known complete/real. Partial Progress can coexist with an `UNKNOWN` effect elsewhere in the same operation.
5. **Derive the actor-safe business behavior.** What may the actor safely do while an effect is `UNKNOWN` or progress is incomplete? Does a further attempt mean observe/reconcile the same Logical Operation, try to advance it, create a new Logical Operation, or require an authorized decision?
6. **Preserve the business guarantee.** What must happen when the same Logical Operation is attempted more than once, and which duplicate/no-extra-effect outcome is allowed, rejected, merged, compensated, or escalated?

Do not invent technical idempotency, idempotency keys, locks, queues, endpoint retry policy, request identity, or database transactions. Architecture/Engineering owns the mechanism that satisfies the business guarantee; Requirements owns only the business-visible obligation and the authoritative semantics that discriminate one Logical Operation from another.

If duplicate/retry semantics are business-critical and no authorized rule can establish operation equivalence or the required business outcome, keep only that branch open/blocked instead of assuming retry is safe.

## 5. Partial effects, recovery, and compensation

A multi-step Logical Operation may create **Partial Progress** before final completion. When material, identify:

- which externally meaningful effects are `ESTABLISHED`;
- which effects are `NOT_ESTABLISHED`;
- which material effects remain `UNKNOWN`;
- which established subset constitutes Partial Progress;
- current observable business status, such as pending or reconciliation-required rather than fake success/failure;
- whether cancellation is still allowed;
- required recovery, release, refund, reversal, notification, manual review, or other business obligation;
- the canonical owner/rule for any compensation decision.

**Compensation** means a business action that addresses an already-real effect. It is not proof that implementation rollback is technically possible or safe. Architecture/Engineering/Operations own technical rollback/recovery mechanisms.

For delayed external confirmation, preserve per-effect `Effect Evidence State`, established Partial Progress, actor-visible pending/reconciliation state, and the business trigger for finalization rather than declaring completion from an acknowledgement alone.

## 6. Multi-actor and time-dependent behavior

When several actors or channels can act on the same business subject, identify the business-visible conflict:

- who may act;
- which decision/obligation is being changed;
- what happens if actions overlap or arrive out of order;
- whether authority or sequence is defined by an existing rule;
- what remains unresolved when no policy exists.

Do not invent last-write-wins, locks, optimistic concurrency, merge algorithms, or queue order as business policy. Those are technical choices unless the domain explicitly makes the outcome/order a business rule.

For time-dependent behavior preserve the rule's **effective period**, deadline/window, timezone, or business calendar only when authoritative and material. Do not merge current and future rules into a timeless compromise. Link the Business Rule that owns the effective-time semantics.

## 7. Rule authority and precedence

The **Business Rule branch** owns each rule's statement, source, business owner, effective scope, exceptions, override authority, and conflict status.

When two canonical rules affect the same selected requirement branch:

1. link both rule identities/revisions;
2. preserve each source/authority/effective scope;
3. apply **precedence** only when an authoritative rule/policy explicitly defines it;
4. otherwise record the conflict and decision owner;
5. expose dependent Use Cases/AC/Stories or other views as affected; invoke traceability only when persisted lineage/change-impact is materially needed.

A requirements composition is not ready merely because every conflicting rule has text.

## 8. Requirement-view ownership and downstream boundary

`requirements-engineering` selects and cross-checks views; the selected **semantic branch** owns its detail inside the same Requirements evidence chain:

- `domain-modeling` — concept identity/relationships/context semantics;
- **Use Case branch** — actor goal plus main/alternate/error sequence and postconditions;
- **Business Rule branch** — policy/permission/validation/calculation/transition/obligation semantics;
- **Acceptance Criteria branch** — observable acceptance/negative guarantees;
- **Quality Requirement branch** — current measurable quality/conformance requirement semantics;
- **User Story branch** — delivery-facing actor value.

Do not copy complete child bodies into a composition index. Link them and expose only shared meaning, gaps, conflicts, and downstream consequences.

When a resolved authorized requirement revision has downstream artifacts/evidence and continuity or stale-impact analysis becomes material, hand the exact changed revision and affected semantic boundary to `traceability`. That is a cross-lifecycle continuation, not another requirement-model primitive.

Product metrics and guardrails remain Product outcome context unless a separately authorized business rule/acceptance condition makes a threshold part of behavior. Statistical/measurement validity remains `metrics-review` ownership.

Design owns interaction/presentation decisions. Architecture/Engineering own API shape, persistence, technical transaction boundaries, retries, idempotency, locking/concurrency, queues and algorithms. QA/UAT own verification/acceptance evidence, not BA authoring.

## 9. Composition completion and failure semantics

Downgrade only the affected composition scope when a material branch has one of these unresolved conditions:

- stale/unknown Product/domain source where exact scope matters;
- Product/stakeholder assumption presented as authorized behavior;
- current-vs-target conflict hidden instead of resolved/owned;
- state transition or invalid-transition semantics needed but missing;
- interruption/retry/duplicate/partial-effect behavior could change actor/business outcome and has no rule/owner;
- multi-actor/time conflict lacks an authorized policy;
- conflicting rule precedence is invented or unresolved;
- composition summary duplicates child truth or leaks Product, UI, technical, QA/UAT, or release decisions.

A simple flow need not model all lenses or create all requirement views. Apply only branches whose absence could change a business-visible outcome, obligation, permission, acceptance meaning, quality boundary, downstream interpretation, or change-impact decision.
