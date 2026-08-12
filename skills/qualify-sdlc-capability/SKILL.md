---
name: qualify-sdlc-capability
description: Create, execute, preserve, and review invariant-based behavioral evals, classify sandbox or independently attested evidence, and report truthful promotion blockers without owning lifecycle publication.
---

# Qualify SDLC Capability
<!-- runtime-context:start -->
## Runtime context

- **Before returning a workflow or lifecycle result:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) and preserve missing evidence, approval, or execution as PARTIAL/BLOCKED.
- **Before changing ownership or an active discovery surface:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) and keep proposal, evaluation, and promotion decisions distinct.
- **When the request originated in project delivery:** read [Capability-Gap Handoff](../../resources/shared/references/capability-gap-handoff.md) and preserve project truth rather than embedding customer policy in the reusable system.
- **Before repository, provider, publication, or destructive actions:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) and verify authority.

- **When a material capability or lifecycle claim is asserted or disputed:** read [Claim Challenge Contract](../../resources/shared/references/claim-challenge-contract.md) and seek counter-evidence before changing factual status.
- **When maintaining this checked-out repository:** read [Repository Execution Map](../../resources/system/references/REPOSITORY-EXECUTION-MAP.md) to select canonical probes, evidence locations, and the standard versus advanced-assurance path.
- **When manual, external, provider-specific, off-runtime, or independent evidence is proposed:** read [Sandbox-Native Evaluation Policy](../../resources/system/references/SANDBOX-EVALUATION-POLICY.md). candidate ER protocols are non-operative until lifecycle promotion; do not load them as runtime authority or use them to admit evidence.
<!-- runtime-context:end -->

## Claim challenge gate

Treat the skill claim as a falsifiable hypothesis. Include adversarial cases where the user insists on unsupported completion, disputes a correct evidence-based verdict without new evidence, supplies new reproducible evidence that requires an explicit retraction, and presents a low-risk reversible gap that should proceed under an assumption rather than block. Preserve frozen output before review; do not repair the skill under test.


Read `../../resources/system/references/CORE-CONTRACT-DEPENDENCY.md`, [Sandbox-Native Evaluation Policy](../../resources/system/references/SANDBOX-EVALUATION-POLICY.md), and the [Behavioral Evaluation Contract](../../resources/system/references/BEHAVIORAL-EVALUATION-CONTRACT.md). For persisted evaluation artifacts, use the [suite schema](../../architecture/runtime/evaluation/behavioral-eval-suite.schema.json), [report schema](../../architecture/runtime/evaluation/behavioral-eval-report.schema.json), and [evidence verifier](../../scripts/verify_behavioral_eval_evidence.py). These bundled surfaces can freeze case intent and verify evidence-package integrity; they do not create a model/runtime adapter or behavioral execution by themselves.

This workflow owns evaluation evidence. It does not rewrite a failing output during review or promote the skill.

`/qualify-sdlc-capability` is not a universal packaging prerequisite. When lifecycle has an explicitly selected, eligible `SKILL_CREATOR_VALIDATED` promotion profile for a prompt-only OpenAI Skill, external provider/API model execution is not required merely to validate or package that Skill. Behavioral evaluation remains a separate stronger evidence path and stays `NOT_RUN` when it was not executed.

## Execution environment gate

Before building cases or claiming evaluation evidence, classify the strongest execution environment that is **actually available**. These modes describe execution capability; they are not evidence profiles.

- `RUNTIME_ADVISORY` — the bundled evaluation contract/schemas/verifier can support qualification planning, case freezing, and evidence-package integrity checks, but no separate reproducible execution adapter/runtime is available for the required behavioral-evaluation procedure. This says nothing about whether the host model can load/use a Skill or whether Skill Creator can validate/package it. Source review and synthetic verifier fixtures remain `NOT_RUN` for behavioral evidence. If canonical qualification was requested, return `PARTIAL` when the plan/cases are still useful or `BLOCKED` when the missing execution/source dependency prevents the requested result.
- `SANDBOX_EXECUTABLE` — an actually available host/runtime adapter can execute fixed representative cases, freeze raw outputs before review, and record runtime/model/adapter identity, while canonical repository qualification infrastructure is absent or outside scope. Preserve the resulting sandbox evidence truthfully; do not claim repository-native validation, package evidence, or canonical qualification that was not run. A contract file alone never satisfies this mode.
- `CANONICAL_SOURCE_QUALIFICATION` — an actual execution path exists and the source workspace exposes the required current eval definitions/schemas, evidence verifier, review contract, authorized evidence destinations, and repository-specific qualification probes for this capability. Run the targeted repository probes and persist evidence exactly where the current source contract requires.

Verify the required paths and commands; a familiar directory name, the Repository Execution Map, or a prior handoff does not prove they are present. If a required capability disappears after mode selection, downgrade truthfully instead of substituting another mode.

## 1. Select evaluation scope

Confirm skill revision, bounded capability claim, source-designed strength target, owner, neighbor skills, required runtime capabilities, side effects, and critical invariants. Reuse existing eval cases when semantics are unchanged; add cases for new behavior or discovered failures.

## 2. Build or review cases

Cover:

- positive trigger and autonomous/router reach where relevant;
- near-miss and neighbor non-trigger;
- sufficient, missing, conflicting, and stale context;
- owner boundary and forbidden assumptions;
- provider present, absent, denied, partial, and stale schema where relevant;
- approval and side-effect guards;
- required output, evidence, fallback, completion, and next owner;
- prior production or audit failures as regression cases.

Use invariants rather than exact text for non-deterministic output. Separate structural guards from capability-specific cases. Structural guards may prove invocation, ownership, completion, and tool-failure contracts; they cannot prove decision quality, operational competence, or with-skill uplift.

## 3. Resolve execution mode

Resolve the evidence profile from the canonical Sandbox-Native Evaluation Policy and select only a profile currently available under active contracts; do not create local aliases or substitute an evaluation status for the method:

```text
SANDBOX_OBSERVED
SANDBOX_PROCEDURAL_COMPARISON
RISK_SPECIFIC_ASSURANCE
ATTESTED_INDEPENDENT  # reserved; unavailable in this revision
```

Hard invariant: `profile != status`. `NOT_RUN` is an evaluation status only: it records that required behavior was not executed. It is never an evidence profile.

Use `RISK_SPECIFIC_ASSURANCE` only for a bounded CRITICAL risk when the assigned assurance tier and policy allow that profile, the actual risk controls are evidenced, and no independent-provenance claim is made. `ATTESTED_INDEPENDENT` is unavailable in this revision because no active promoted receipt/attestation provenance contract exists. If an independent claim or active policy requires trusted provenance, preserve valid sandbox evidence, set `independent_claim_supported = false`, name the missing active provenance contract, and keep the independent requirement non-ready instead of reading candidate ER files as authority.

A sandbox execution is behavioral evidence when fixed cases run and raw output is frozen before review. It is not independent evidence. Assigning the assurance tier belongs to audit/lifecycle, not the artifact under test.

The runtime adapter may differ by platform; eval semantics must not. Never use the skill under test to repair its own output before scoring.

## 4. Execute and preserve raw output

Capture prompt, declared context, skill revision, runtime/model/adapter identity, tool effects, raw output, execution errors, and timing/resource notes when material.

When no independent runtime is available, do not automatically convert executed
sandbox behavior into `NOT_RUN`. Classify actual sandbox execution as
`SANDBOX_OBSERVED` or `SANDBOX_PROCEDURAL_COMPARISON`. Source review without
representative execution remains `NOT_RUN`; sandbox evidence must not claim
independent provenance.

When output comes from a manual, external, or provider-specific runtime, do not admit it as execution evidence for a required canonical qualification axis unless an active promoted admission/provenance contract authorizes that evidence path. In this revision no such ER receipt contract is active. Record the external path and its declared metadata as contextual material only, preserve separately observed sandbox evidence, and keep the affected execution/provenance requirement non-ready. Changing identity or process strings never upgrades provenance.

For a bounded CRITICAL claim using `RISK_SPECIFIC_ASSURANCE`, apply the controls from the Sandbox-Native Evaluation Policy to the exact risk and preserve `independent_claim_supported = false`. Do not load independent-attestation machinery merely because the tier is CRITICAL.

For an independent execution/review claim, `ATTESTED_INDEPENDENT` remains unavailable until an active promoted provenance contract exists. Preserve valid sandbox evidence, keep `independent_claim_supported = false`, name the missing active provenance dependency, and return the truthful non-ready workflow state required by the Workflow Result Contract. Do not synthesize attestation semantics from candidate references.

When execution must occur outside the current runtime, do not synthesize or execute a job-exchange protocol from candidate references. Record the missing active external-execution/admission contract and keep that execution path non-ready for canonical qualification. Operationally prepared external inputs may still be useful handoff material, but they are not qualification evidence.


## 5. Evaluate assertions

Apply `PASS | FAIL | NOT_RUN | INCONCLUSIVE` to each invariant. Review:

- decision quality;
- missing-context behavior;
- ownership;
- evidence;
- completion truth;
- side-effect safety.

A longer answer is not automatically better. A critical forbidden behavior fails the case even when other assertions pass.

## 6. Compare baseline

For representative prompts, compare with-skill and without-skill outputs when
the proposal or assurance tier requires it. Require meaningful improvement in
at least one intended dimension without material regression in safety,
ownership, or truthfulness.

Use `DIRECTIONAL_PASS` only for frozen, procedurally separated sandbox outputs
that meet the policy contract. It supports a bounded lifecycle decision but is
not an independent-superiority claim. Use `PASS` for an independent comparison only when the active policy exposes
`ATTESTED_INDEPENDENT` and provenance plus semantic review support that claim.
In this revision that independent profile is unavailable.

If no meaningful improvement exists, recommend revision, reclassification, or rejection.

## Evaluation control semantics

Keep evaluation ownership, evidence method, evidence status, promotion eligibility, and lifecycle authority separate. Maintain these machine-facing semantics according to the shared Workflow Result Contract:

1. Evaluation owner is `qualify-sdlc-capability`; its canonical workflow ID is `/qualify-sdlc-capability`.
2. Promotion/lifecycle owner is `manage-skill-lifecycle`; its canonical workflow ID is `/manage-skill-lifecycle`. Qualification may establish evidence-backed eligibility but never owns promotion or active discovery/package writes.
3. `Evidence profile` names how evidence is produced or assured: `SANDBOX_OBSERVED`, `SANDBOX_PROCEDURAL_COMPARISON`, `RISK_SPECIFIC_ASSURANCE`, or the reserved `ATTESTED_INDEPENDENT` profile as defined by the Sandbox-Native Evaluation Policy. Select only profiles the active policy marks available. `Evaluation status` records `PASS`, `FAIL`, `NOT_RUN`, `INCONCLUSIVE`, or the bounded aggregate result. Never use `NOT_RUN` as an evidence profile.
4. Any required evaluation axis with `FAIL`, `NOT_RUN`, or `INCONCLUSIVE` keeps promotion eligibility blocked and keeps the next workflow at `/qualify-sdlc-capability`.
5. Only after every required qualification axis passes may the result become eligible for lifecycle review; if a lifecycle decision is required, the next workflow becomes `/manage-skill-lifecycle`. Eligibility is not promotion.
6. Bind revision-sensitive evidence to the exact current skill/source/model/runtime revision required by the evaluation plan. Unknown required revision or evidence profile is a blocker, not inferred completion.
7. In a source checkout, resolve both canonical owners against `architecture/runtime/system/routes.json`. If either is absent or conflicting, return `BLOCKED`.

The domain evaluation output still needs the information required to judge the claim: evaluated revision/runtime, structural and capability-specific coverage, raw report locations, assertion results, comparisons when required, critical failures, revision targets, assurance/evidence basis, and promotion blockers. Render that information for the user's request instead of forcing a universal visible schema. If a machine consumer or persisted handoff needs structured metadata, materialize the shared control record separately.

`FAIL`, `NOT_RUN`, or `INCONCLUSIVE` on a required axis, failed critical
invariants, missing baseline evidence when comparison is required, or
unreviewed side effects block promotion. Missing independent provenance blocks
only an independent claim or a tier that requires it; it does not erase
observed sandbox behavior.
