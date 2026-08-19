# Release Assessment

Use this reference inside `RELEASE_CHANGE` when the current candidate needs a release-eligibility decision or when a prior release decision may have become stale. Release assessment is a **decision mechanism and record**, not a separate owner or phase handoff.

Read [../RELEASE-DECISION-RECORD.md](../RELEASE-DECISION-RECORD.md) when materializing the decision artifact.

## Contents

1. Fixed point
2. Evidence admission
3. Applicability and requiredness
4. Evidence truth/currentness
5. Exceptions and authority
6. Disposition and readiness
7. Invalidation
8. Release-to-execution admission
9. Contrastive cases

## 1. Fixed point

Bind one exact release meaning:

```text
candidate/build/artifact/config identities
+ target environment/scope
+ Deployment Plan revision
+ applicable QA/UAT evidence identities
+ migration/config/dependency/observability/recovery evidence
+ current release/risk authority and policy
= release-assessment fixed point
```

A label such as "release 42", a branch name, approval date or logical UAT ID is not enough when an immutable revision/digest/equivalent identity exists and controls the decision.

Keep record validity separate from readiness:

```text
record validity: CURRENT | STALE | UNVERIFIED | CONFLICTING
readiness:       NOT_READY | CONDITIONALLY_READY | READY_FOR_RELEASE
workflow:        READY | PARTIAL | BLOCKED | FAILED
```

A `CURRENT NOT_READY` decision can be a complete workflow. A `STALE READY_FOR_RELEASE` record cannot support execution.

## 2. Evidence admission

Admit only evidence whose identity, scope and currentness match the release fixed point.

### QA

Preserve as distinct facts where applicable:

- QA workflow state;
- verification verdict/result;
- fixed candidate/scope;
- evidence/report revision;
- separation requirement/policy;
- actual executor/relation/provenance;
- independence/attestation state;
- open defects/gaps.

Do not infer QA independence or strengthen provenance from UAT approval, a different executor name, or a later release decision.

### UAT

When business acceptance is required for release, bind the exact current `user-acceptance` decision/record identity required by release policy, its fixed candidate/environment/scope, authorized decision, currentness, and conditions/waivers. Bind a UAT-consumed QA identity only when that acceptance decision actually depended on QA evidence. Release may separately require its own current QA evidence even when UAT did not consume QA.

If the acceptance decision depended on QA revision Q7 and that dependency is now Q8, do not infer continued acceptance. Require acceptance re-admission/reconfirmation according to the owning `user-acceptance` contract and preserve the historical acceptance record. If UAT never depended on QA, a QA-only revision change does not automatically stale UAT; evaluate QA independently under release policy.

A current UAT `REJECTED` remains rejection. An `ACCEPTED` label on stale/mismatched acceptance evidence remains non-current.

### Deployment mechanics

Bind the exact current Deployment Plan and verify that candidate/environment/strategy/change graph, mixed-version or migration assumptions, observability and recovery semantics still match current truth. Because DevOps owns the transaction, repair/recompute the plan within `RELEASE_CHANGE` when authorized; do not create a synthetic handoff to a separate deployment owner.

## 3. Applicability and requiredness

For each potential release control decide, in order:

1. **Applicability** — does it apply to this exact candidate/environment according to current project policy, approved scope, change mechanics or owner decision?
2. **Requiredness** — if applicable, is it required for eligibility or advisory/optional?

`N/A` requires a reason and authoritative source. Silence, cost or inconvenience is not non-applicability.

A required check does not become optional because it is unavailable. An optional check does not become required because it is commonly used unless policy/change mechanics make it required.

## 4. Evidence truth and currentness

Preserve result and validity separately:

```text
result:      PASS | FAIL | INCONCLUSIVE | NOT_RUN
currentness: CURRENT | STALE | UNVERIFIED | CONFLICTING | MISMATCHED
```

Do not average or count green controls. One applicable required hard blocker remains a blocker regardless of how many unrelated checks pass.

Missing evidence stays missing. A developer test, static render, provider ACK, approval statement or expected future pass proves only its own claim.

## 5. Exceptions and authority

Apply an exception/waiver/accepted-risk decision only when:

- project policy permits an exception for that exact control/class;
- the correct authority is identified and current;
- scope, rationale, expiry/applicability and evidence are explicit;
- the exception does not violate a non-waivable upstream contract.

Never rewrite underlying evidence. A waived security scan `FAIL` remains `FAIL` with a current authorized exception.

Release authority is separate from deployment mutation authority. A readiness decision does not itself grant the credentials/confirmation needed to mutate production.

## 6. Disposition and readiness

Classify each applicable control:

| Control truth | Disposition | Readiness consequence |
|---|---|---|
| Required + current PASS/satisfied proof | satisfied | no blocker from this control |
| Required + FAIL/INCONCLUSIVE/NOT_RUN/missing/stale/conflicting/mismatched/unverified | hard blocker | `NOT_READY` unless a policy-valid exception exists for that exact waivable control |
| Waivable control + current authorized exception | accepted risk / waived; preserve original evidence | may support `READY_FOR_RELEASE` while exception remains current |
| Policy explicitly permits bounded later closure and it is not substituting for required evidence/authority | bounded condition with owner + closure proof + expiry/recheck | `CONDITIONALLY_READY`; not execution eligibility |
| Optional/advisory evidence absent/unfavorable | advisory/residual risk | does not independently block |
| Explicitly non-applicable | N/A with reason/source | no blocker from this control |

`READY_FOR_RELEASE` requires no hard blocker or open bounded condition, and every applicable required control satisfied or covered by a current policy-valid exception.

`CONDITIONALLY_READY` is a complete decision with only explicitly deferrable conditions; it is **not permission to deploy**.

`NOT_READY` is a valid complete decision when current evidence proves one or more required controls are unsatisfied.

If policy/authority/scope is too unknown to classify requiredness at all, use workflow `PARTIAL`/`BLOCKED` rather than inventing a readiness conclusion.

## 7. Invalidation

A finalized Release Decision Record becomes non-current when a controlling meaning changes, including material changes to:

- candidate/build/artifact/config;
- target environment/scope/exposure;
- QA/UAT evidence or their currentness/provenance;
- Deployment Plan/change graph/strategy;
- migration/recovery/observability evidence;
- release authority/approval/condition/waiver;
- blocker/accepted-risk basis.

Do not mutate the historical record. Re-assess current truth and issue a new superseding record revision.

Non-material formatting or unrelated metadata changes do not automatically invalidate the release decision.

## 8. Release-to-execution admission

Immediately before protected mutation:

1. rebind the candidate/environment and current Release Decision Record;
2. confirm readiness is `READY_FOR_RELEASE` and record validity is current;
3. rebind the current Deployment Plan and operation target;
4. inspect live provider/runtime state that can stale the plan/decision;
5. resolve current mutation authority/policy/confirmation;
6. enter deployment execution only if the fixed point still matches.

A material drift returns to the earliest affected assessment/planning truth inside `RELEASE_CHANGE`; it does not justify patching the record to keep execution moving.

## 9. Contrastive cases

### Required smoke test never ran

Policy requires candidate-scoped production-equivalent smoke evidence. It is `NOT_RUN`. Disposition: hard blocker -> `NOT_READY`. Do not call it a condition because the team expects it to pass later.

### Same smoke test is truly N/A

Policy requires it only for runtime changes; this candidate is documentation-only and the policy/source establishes that classification. Record `N/A` with reason/source.

### Authorized risk acceptance

A required but waivable security scan is `FAIL`; current policy permits the named security authority to accept this exact finding for the target environment until a stated expiry. Preserve scan=`FAIL`; disposition=`WAIVED/ACCEPTED_RISK`. The exception may support readiness but does not make the scan pass.

### Stale acceptance cannot be laundered

UAT says `ACCEPTED` but its acceptance fixed point is stale for the current candidate or for another evidence dependency that the acceptance decision actually consumed. Keep `NOT_READY` until current acceptance is re-admitted/reconfirmed. A QA-only revision change does not stale UAT when UAT did not depend on QA, although Release may still require current QA independently. Do not convert stale required acceptance evidence into `CONDITIONALLY_READY` or a generic release-manager waiver.
