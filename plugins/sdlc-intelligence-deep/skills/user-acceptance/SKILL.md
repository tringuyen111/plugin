---
name: user-acceptance
description: Design, execute, evaluate, or record user/business acceptance for a product change from authorized target meaning and representative business context. Use for UAT scenarios, witnessed testing, fitness-for-use evaluation, or an explicitly authorized acceptance decision. Do not own requirement Acceptance Criteria, technical QA design/verdicts, redefine requirements, infer sign-off, or authorize release/deployment.
---

# User Acceptance

Treat User Acceptance as **fitness-for-use evidence and business judgment**, not a mandatory phase after QA and not a synonym for sign-off. Own the acceptance model, representative acceptance design, witnessed user/business evidence, acceptance evaluation, and—only when explicitly requested and authorized—the recorded business acceptance decision.

Do not force the workflow through every possible activity. Finish at the terminal truth the caller actually needs.

## Universal operating contract

1. **Bind acceptance basis.** Read the strongest applicable authorized Product/Requirements/domain truth plus representative business/user context. Separate `TARGET_AUTHORIZED` meaning from proposals, assumptions, and current implementation behavior.
2. **Select the requested terminal truth.** Choose the smallest valid endpoint:
   - `DESIGN` — acceptance coverage/representation is ready; execution is `NOT_RUN`.
   - `WITNESS` — actual user/business-visible execution evidence is captured for a fixed candidate/context.
   - `EVALUATE` — current evidence is classified against the acceptance basis; no business sign-off is inferred.
   - `DECIDE` — the correct business/Product acceptance authority explicitly records `ACCEPTED | ACCEPTED_WITH_CONDITIONS | REJECTED | PENDING`.
   Do not continue to a later endpoint merely because it exists.
3. **Choose the smallest faithful acceptance representation.** Select scenario, criterion/test case, business-process/rule path, exploratory charter, or compact evidence matrix according to the business oracle and risk. Do not manufacture narrative scenarios when another representation exposes acceptance truth better. Read [Acceptance Design](references/acceptance-design.md) when representation choice or business-flow semantics are material.
4. **Separate design truth from execution truth.** A candidate/environment is not required for `DESIGN`. For `WITNESS` or later evidence claims, bind the exact execution fixed point: design revision + candidate/build + material environment/config/data/state + actual representative/performer + execution time + evidence. Read [Acceptance Model](references/acceptance-model.md) for fixed points, truth axes, and invalidation.
5. **Witness; never simulate evidence.** Record what the representative actually observed. Preserve `PASS | FAIL | INCONCLUSIVE | NOT_RUN | NOT_APPLICABLE` without copying expected behavior, a QA verdict, or an approver preference into the result. Read [Witnessed Evidence](references/witnessed-evidence.md) when executing or admitting evidence.
6. **Admit QA only when it matters.** Ask: *Does project policy or this acceptance judgment materially depend on QA evidence?* If yes, consume exact current `verify-quality` truth and keep QA workflow state, QA verdict, acceptance-readiness, provenance, and currentness separate. Missing/stale required QA blocks only the truth that depends on it. If no, do not invent a QA gate.
7. **Evaluate before deciding.** Determine applicability/requiredness, preserve observed truth/currentness, classify any exception/condition authority, then derive item disposition. An unsatisfied observation remains unsatisfied even when a valid condition/waiver exists. Read [Acceptance Decision](references/acceptance-decision.md) for decision/waiver semantics and protected authority.
8. **Record final acceptance only from authority.** The scenario performer/representative, QA executor, developer, or agent is not automatically the acceptance approver. Do not infer acceptance from silence, QA PASS, schedule pressure, or a completed evidence package. When a bounded human trade-off is unresolved, compose `decision-interview`; return the decision to User Acceptance rather than letting the interview owner sign off.
9. **Persist or hand off only when earned.** A valid in-session decision may exist even when durable record identity is `NOT_RUN`/`UNVERIFIED`. Immutable revision/digest becomes mandatory only when a downstream contract requires exact current acceptance identity, such as release admission. Read [Persistence and Release](references/persistence-release.md) when durable record or release consumption is material.
10. **Re-enter at the earliest invalidated truth.** Do not restart the whole UAT lifecycle. A changed candidate commonly stales execution/decision but not unchanged acceptance design; changed target meaning can stale affected design and its dependents; changed QA affects only UAT truth that actually depended on that QA evidence.

## Truth axes — never collapse them

Keep these independently visible when material:

```text
acceptance-basis currentness
acceptance-design currentness
witnessed execution result/currentness
acceptance evaluation/disposition
business acceptance decision
record persistence/currentness
release consumability
```

A completed workflow may legitimately end with `DESIGN READY / execution NOT_RUN`, `WITNESSED / decision NOT_REQUESTED`, or `DECISION ACCEPTED / persistence UNVERIFIED`. Do not rewrite these into one status bit.

## Acceptance decision states

Use overall decision labels only in the protected `DECIDE` branch:

- `PENDING` — no supported authorized final decision yet.
- `ACCEPTED` — authorized owner accepts the exact scope with all applicable required acceptance obligations satisfied and no bounded condition/waiver.
- `ACCEPTED_WITH_CONDITIONS` — authorized owner accepts with explicit bounded conditions and/or policy-valid authorized waivers; underlying failed/inconclusive/unrun evidence remains unchanged.
- `REJECTED` — authorized owner explicitly rejects the exact scope/candidate.

A waiver is an exception disposition, not a fifth overall decision state and never converts evidence to `PASS`.

## Composition boundaries

- `requirements-engineering` owns requirement Acceptance Criteria, Use Cases, Business Rules, quality-requirement meaning, and their authoring maturity. User Acceptance may project that truth into **business acceptance coverage**, but it does not author/replace the requirement definition.
- `product-definition` owns Product outcome/scope/priority commitments.
- `verify-quality` owns technical/system QA proof and QA verdicts. User Acceptance may consume QA evidence without inheriting QA ownership.
- `decision-interview` may resolve one bounded human decision; it does not sign UAT.
- `traceability` is used only when durable cross-artifact lineage/change-impact is actually required.
- `devops-engineering` owns release assessment/deployment. Current acceptance can be evidence for release assessment; it never grants release/deployment authority.

## Conditional expert context

- **WHEN** fixed points, truth axes, currentness, or re-entry are decision-material, **READ** [Acceptance Model](references/acceptance-model.md) **BECAUSE** design, execution, decision, persistence, and release can stale independently.
- **WHEN** choosing or authoring acceptance coverage, **READ** [Acceptance Design](references/acceptance-design.md) **BECAUSE** scenario is only one representation and business-flow interruptions/partial effects need explicit semantics when material.
- **WHEN** actual acceptance testing/evidence is being run or admitted, **READ** [Witnessed Evidence](references/witnessed-evidence.md) **BECAUSE** observed truth requires an exact execution fixed point and must remain separate from expectation, QA, and approval.
- **WHEN** evaluating evidence, conditions, waivers, or recording an acceptance decision, **READ** [Acceptance Decision](references/acceptance-decision.md) **BECAUSE** applicability, evidence, exception authority, disposition, and final acceptance are different decisions.
- **WHEN** durable acceptance identity, traceability, or Release consumption is material, **READ** [Persistence and Release](references/persistence-release.md) **BECAUSE** persistence/currentness and release consumability are not prerequisites for every acceptance task.

Do not preload all references for a design-only request.

## Completion

Return a truthful terminal result scoped to the request:

- `READY` — the requested acceptance terminal truth is coherent and supported at its own proof level.
- `PARTIAL` — useful acceptance truth exists but material evidence/currentness/authority is unresolved.
- `BLOCKED` — a required authority, source, candidate/runtime capability, or policy-required evidence prevents the requested terminal truth.
- `FAILED` — an attempted required execution/write/verification failed.

Also expose relevant independent axes such as `execution=NOT_RUN`, `decision=NOT_REQUESTED|PENDING|ACCEPTED|ACCEPTED_WITH_CONDITIONS|REJECTED`, `persistence=NOT_RUN|CURRENT|STALE|UNVERIFIED|CONFLICTING`, and `release_consumability=READY|NOT_READY|NOT_APPLICABLE` when they materially affect the caller.

Never claim QA PASS, business acceptance, persistence, release readiness, or deployment authority that was not actually established.
