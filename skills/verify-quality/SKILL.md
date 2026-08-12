---
name: verify-quality
description: Verify a fixed implementation under a declared QA separation mode against approved acceptance criteria, NFRs, risks, design contracts, and consumed outputs. Use when developer tests or code review exist but functional, integration, error, visual, accessibility, data, environment, or regression acceptance is not yet proven.
---

# Verify Quality
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before fixing QA semantic scope or deriving material test conditions:** read [Semantic Continuity Contract](../../resources/shared/references/semantic-continuity-contract.md) to reconstruct expected truth before developer claims, verify incoming obligation coverage, and prevent green tests from closing omitted semantic proof.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->

Act as the QA verdict owner for a fixed implementation and acceptance scope under a declared separation mode. A same-agent transition from implementation/review into QA is allowed only after freezing implementation artifacts and announcing the role transition; record it as procedural separation, not independent attestation. A different declared executor is still only declared separation unless inspectable provenance supports any stronger independence claim. This workflow owns the fixed point, risk model, condition coverage, probe execution, evidence admission, condition closure, defect handoff, residual-risk assessment, and overall QA verdict. `/test-strategy`, `/test-condition`, and `/defect-report` are supporting skills whose `READY` results do not complete QA. Do not implement fixes, redefine requirements, approve Design, accept on behalf of the business, or release production while performing this workflow.

Read [QA-VERIFICATION-REPORT.md](QA-VERIFICATION-REPORT.md) before reporting.
Apply [Engineering Evidence Discipline](../../resources/shared/references/ENGINEERING-EVIDENCE-DISCIPLINE.md) for source/runtime evidence and `/visual-capture` only as the evidence-capture workflow. Neither reference nor adapter owns the QA verdict.

## Preconditions

Resolve:

- canonical scope and work item;
- approved Stories, AC, Business Rules, NFRs, and accepted waivers;
- fixed implementation version, commit, build, or environment;
- relevant UX/Visual Contract and ADRs;
- developer tests, code-review result, known defects, and prior evidence;
- material semantic obligations/lineage for the fixed scope, or enough canonical source/revision evidence to reconstruct them just-in-time when the continuity provider is weak;
- target environments, configuration, data boundaries, and release risk;
- evidence producer, execution time, raw artifact identity, and candidate binding;
- declared project QA separation requirement when one exists, the actual QA executor and relation to implementation/review, and inspectable provenance/attestation for any stronger independence claim.

Reconstruct expected truth from canonical Product/BA/Design/technical sources before using developer summaries or green tests to define QA scope. If acceptance or material semantic coverage is missing/contradictory and cannot be reconstructed, keep the affected verification `INCONCLUSIVE`/`NOT_RUN` and route the exact gap to its owner; do not silently narrow the condition set. If the implementation is not fixed enough to verify, report `BLOCKED` or `PARTIAL` and route to Engineering. Do not silently choose a new expected behavior.

## Supporting QA contract admission

Supporting QA artifacts are revision-bound inputs, not authority merely because their logical ID, title, route, or workflow state still resolves. Before relying on a persisted support artifact, admit its exact fixed point and bounded authority into this QA run.

For a persisted **Test Strategy**, bind its exact `strategy_revision`, material source revisions/digests, evidence cutoff, and planning freshness. Only `CURRENT` planning truth may act as authoritative coverage planning for this run. `STALE`, `CONFLICTING`, or `UNVERIFIED` strategy truth must be revalidated through `/test-strategy` against current source meaning before use; if revalidation cannot close the gap, keep the affected coverage non-authoritative, expose the planning gap, and keep acceptance readiness `NOT_READY_FOR_ACCEPTANCE`. A logical strategy ID is not enough.

For each persisted **Test Condition**, bind the exact `condition_revision`, its material source revision/digest fixed point, and definition freshness. Only a `CURRENT` condition definition may provide the current oracle and execution target. `STALE`, `CONFLICTING`, or `UNVERIFIED` definitions must be revalidated through `/test-condition` before current execution truth can be established. A logical condition ID is insufficient. A material condition/source revision invalidates the prior observed condition result for that changed meaning; preserve the old result as historical evidence only and do not carry `PASS`, `FAIL`, `INCONCLUSIVE`, or `NOT_APPLICABLE` forward by ID. Until the new/current condition is executed with admitted evidence, keep its observed result `NOT_RUN` or `INCONCLUSIVE` as applicable and readiness not ready.

When linking a **Defect Report**, bind its exact `defect_revision` and observation fixed point when material to the QA handoff. Defect classification, canonical relationship (`NEW | DUPLICATE_OF | RELATED_TO | UNKNOWN`), tracker lifecycle, or provider acknowledgement describes the downstream deviation record; it does not replace the QA condition result and never derives the QA verdict or acceptance readiness. Historical defects may inform risk/regression selection, but current candidate truth still requires current condition/evidence admission.

Absence of a pre-existing strategy or condition is not itself a blocker when this workflow can invoke the canonical supporting owner and produce/revalidate the required current contract. The gate blocks stale or unbound support truth from being treated as current authority; it does not require duplicate artifacts.

## Evidence admission and invalidation

Admit evidence only when its identity and scope are inspectable: candidate version or artifact hash, acceptance revision, environment/configuration/data boundary, producer or command, execution time, raw output or immutable reference, and the bounded condition/claim it is allowed to support. Compare the executed probe with the condition's falsifier and any declared mock/fake/stub/simulator/fixture substitution. Evidence may be `ADMITTED` for a narrower claim without being authoritative enough to close a wider condition. Missing binding or stale evidence is `INCONCLUSIVE` or `NOT_RUN`, never inherited `PASS`. A fresh, perfectly bound substitute probe cannot inherit authority for a production/runtime mechanism it did not exercise.

A QA conclusion is a snapshot. A change to candidate bytes/commit/build, acceptance or design revision, material Test Strategy source/revision/freshness, material Test Condition definition/source revision, material configuration/data, probe/tool version, waiver, evidence artifact, or material QA separation/provenance changes invalidates the affected conditions or workflow evidence as applicable. A Defect Report relationship/lifecycle change alone does not rewrite an already observed QA condition result; only a change in the underlying expected meaning, candidate/observation fixed point, or admitted QA evidence can do that. Mark those condition results stale, set the QA verification verdict to `INCONCLUSIVE` or `NOT_RUN` as applicable, and set acceptance readiness to `NOT_READY_FOR_ACCEPTANCE` until the affected conditions rerun. The workflow state becomes `PARTIAL` when useful verified scope remains or `BLOCKED` when the missing fixed point, environment, source, or capability prevents meaningful re-verification. Do not use `PARTIAL` or `BLOCKED` as QA verdict values, and do not carry readiness across the change by assumption.

## QA conclusion and workflow closure

Keep three QA/control axes separate:

```text
workflow state:          READY | PARTIAL | BLOCKED | FAILED
QA verification verdict: PASS | FAIL | INCONCLUSIVE | NOT_RUN
acceptance readiness:    READY_FOR_ACCEPTANCE | NOT_READY_FOR_ACCEPTANCE
```

Before deriving the QA conclusion, confirm that the declared fixed scope accounts for every material incoming semantic obligation through a condition/proof target, justified `NOT_APPLICABLE`, explicit unresolved gap, or visible authorized disposition. An unexplained missing material obligation means required coverage is incomplete; green developer tests cannot make that scope `PASS`.

QA separation is fixed-point execution truth, not a candidate-quality verdict. Record the project separation requirement, actual executor relation, and provenance/attestation that supports any independence claim. A separate declared executor/session/person does not become independently attested by declaration alone. If project policy requires stronger separation than current execution evidence proves, preserve the observed condition results but keep acceptance readiness `NOT_READY_FOR_ACCEPTANCE`; keep the workflow `PARTIAL` when useful QA evidence exists or `BLOCKED` when the required QA authority/executor cannot be obtained. Do not self-waive a separation requirement.

Close required conditions and derive the QA conclusion in this order:

1. Preserve every condition result exactly as observed and enforce proof adequacy before `PASS`: the executed evidence must be capable of falsifying the full bounded condition at its declared boundary. If a probe ran but substituted/bypassed a material mechanism required by the condition, keep the wider condition `INCONCLUSIVE` unless complementary authoritative evidence closes that gap; if no applicable probe ran, keep it `NOT_RUN`. A narrower sub-claim may still be recorded as supported without rewriting the original condition. `NOT_APPLICABLE` requires a cited applicability rule, scope, and owner; an unsupported N/A is `INCONCLUSIVE`.
2. Derive the **QA verification verdict** from required-condition truth without rewriting evidence: any required `FAIL` yields `FAIL`; otherwise a required `INCONCLUSIVE` yields `INCONCLUSIVE`; otherwise a required `NOT_RUN` yields `NOT_RUN`; otherwise the verdict is `PASS`. Justified `NOT_APPLICABLE` does not worsen the verdict.
3. A waiver must name the authorized owner, exact condition and candidate scope, rationale, residual risk, expiry or recheck trigger, and downstream visibility. The original result remains `FAIL`, `INCONCLUSIVE`, or `NOT_RUN`; a waiver never rewrites it to `PASS`, and the QA verification verdict must continue to expose the underlying required-condition truth.
4. Derive **acceptance readiness** separately. `READY_FOR_ACCEPTANCE` is allowed only when every required condition is `PASS`, justified `NOT_APPLICABLE`, or covered by a valid visible waiver, evidence remains bound to the fixed point, and residual risk is explicit. Otherwise use `NOT_READY_FOR_ACCEPTANCE`.
5. Derive the **workflow state** from whether this verification workflow itself completed its declared scope truthfully. A completed failing verification can return workflow `READY`, QA verification verdict `FAIL`, and acceptance readiness `NOT_READY_FOR_ACCEPTANCE`; that means QA successfully proved the candidate is not acceptable. Missing required environment, source, fixed-point binding, or unfinished verification makes the workflow `PARTIAL` or `BLOCKED` as appropriate.
6. A broken or internally contradictory evidence/report contract, unsafe or unverified attempted write, or failed required QA operation makes the workflow `FAILED` even when some product probes passed. Candidate quality alone never makes the workflow `FAILED`.

Do not calculate readiness from a pass percentage. One material failed or unverified condition may control the QA verification verdict or acceptance readiness without implying that the QA workflow malfunctioned.

## Process

1. **Declare the fixed point and QA scope.** Record implementation version, environment/configuration/data identity, acceptance revisions, semantic obligation/source revisions, evidence cutoff, exclusions, what changed, the project separation requirement, actual QA executor relation, and provenance/attestation status. Admit any persisted supporting QA contracts by exact revision/freshness before relying on them. When the same agent follows implementation/review, explicitly record `PROCEDURAL_SAME_AGENT`; do not translate a role transition into independent evidence. Map the broader risk/scope shallowly, then verify one material semantic unit deeply at a time.
2. **Build or admit a current risk model.** Use `/test-strategy` to rank user, business, data, integration, security, accessibility, performance, recovery, visual, and regression risks. If a persisted strategy is supplied, consume it only at its exact `strategy_revision` with `CURRENT` planning freshness; otherwise revalidate it through `/test-strategy` or expose the affected planning gap. Do not apply a test pyramid mechanically.
3. **Derive or admit current traceable conditions.** Use `/test-condition` so each material semantic obligation, AC, NFR, risk, state, and failure path has an observable proof target/probe, criticality, or an explicit justified reason it is not applicable. If a persisted condition is supplied, bind its exact `condition_revision`, source fixed point, and `CURRENT` definition freshness before treating its oracle as current; stale/unverified/conflicting definitions must be revalidated and prior results do not carry forward. Start from reconstructed expected truth rather than the tests the implementer happened to write.
4. **Execute available probes.** Run real commands, workflows, APIs, UI states, data checks, or environment checks. Capture exact output and consumed artifacts. Never claim a probe ran when the environment or tool is absent.
5. **Delegate visual acceptance when relevant.** When approved visual, state, viewport, responsive, content-stress, or visible-accessibility acceptance is material, invoke `/verify-visual` and consume its fixed-scope report. `/visual-capture` remains only the evidence-capture workflow. Do not duplicate the Visual QA matrix or treat screenshots as automatic PASS.
6. **Admit and classify evidence.** Check binding, freshness, integrity, environment, probe authority, substituted boundaries, falsifier coverage, and limitations. Admit evidence only for the claim scope it can support, then classify each condition as `PASS`, `FAIL`, `INCONCLUSIVE`, `NOT_RUN`, or justified `NOT_APPLICABLE`. Do not upgrade a narrower developer test into a wider QA condition merely because it is green and candidate-bound.
7. **Record defects.** Use `/defect-report` for failures. Bind the resulting/existing record by exact `defect_revision` and observation fixed point when linking it to this run. A defect records the deviation; root cause remains unknown until Engineering diagnosis proves it, and defect classification/relationship/lifecycle never substitutes for the observed QA condition result.
8. **Validate waivers.** Keep condition truth unchanged and verify owner, scope, expiry/recheck trigger, residual risk, and downstream visibility.
9. **Assess semantic, intended, and executed coverage.** Reconcile the Semantic Continuity coverage handshake before interpreting pass counts. Name missing/omitted obligations, unresolved discovery branches, regression, environment, data, evidence, and operational gaps. Challenge the weakest admitted proof and search for a material behavior that disappeared between approved truth and the fixed candidate.
10. **Derive the QA conclusion.** Apply the closure rules and record all three axes separately: workflow state, QA verification verdict, and acceptance readiness. Name the exact conditions or semantic coverage gaps controlling each non-positive domain result; never serialize `READY_FOR_ACCEPTANCE`, `FAIL`, `PARTIAL`, or `BLOCKED` onto the wrong axis.
11. **Request side effects explicitly.** Preview external issue creation or tracker updates before writing. QA evidence itself does not authorize UAT acceptance or release.

## Completion

A workflow state of `READY` means the declared QA verification scope completed truthfully: fixed-point, supporting-contract admission, and evidence admission were applied; any authoritative Test Strategy/Test Condition inputs were exact-revision and current for the meaning consumed; the project separation requirement and actual executor/provenance truth were recorded and satisfied at the required level; admitted evidence was bounded to the claims/probes it can actually falsify; material semantic coverage was reconciled; required probes or explicit applicability/waiver handling were accounted for; linked Defect Reports did not substitute for condition truth; the QA verification verdict and acceptance readiness were derived separately; residual risk and invalidation triggers are explicit; and no Product, Design, Engineering, UAT, or release authority was silently assumed.

Acceptance readiness `READY_FOR_ACCEPTANCE` additionally requires every required condition to be closed by `PASS`, justified `NOT_APPLICABLE`, or a valid visible waiver with evidence still bound to the fixed point. A workflow may therefore be `READY` while the QA verification verdict is `FAIL` and acceptance readiness is `NOT_READY_FOR_ACCEPTANCE`.

Use workflow `PARTIAL` when meaningful verification exists but required coverage, evidence binding, or re-verification remains. Use workflow `BLOCKED` when a source, environment, decision, fixed implementation, or required capability prevents meaningful verification. Use workflow `FAILED` only when the verification process or its evidence/report/side-effect contract itself fails; do not map a candidate `FAIL` condition to workflow failure.
