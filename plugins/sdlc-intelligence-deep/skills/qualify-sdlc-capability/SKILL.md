---
name: qualify-sdlc-capability
description: 'Create, execute, preserve, and review behavioral qualification evidence for an exact reusable capability or revision. Use when qualification itself is the bounded job: freeze representative cases, bind execution/provenance, evaluate explicit invariants, compare a baseline when required, and report truthful evidence strength. Do not redesign the capability or invent runtime/attestation.'
---

# Qualify SDLC Capability

Qualify a falsifiable capability claim against the strongest evidence that is actually available. Keep qualification evidence, capability design, native package validity, and lifecycle publication separate.

For detailed evidence-strength, comparison, independence, and project-integration rules, read [Qualification Method](references/qualification-method.md) when those decisions become material.

## 1. Bind the exact claim

Record before case design:

- capability under test and exact candidate revision;
- the bounded claim being qualified;
- the decision this evidence may support;
- critical invariants and realistic falsifiers;
- whether comparison is required and the exact baseline kind/revision;
- any process/trajectory claim that requires inspectable execution-path evidence;
- authority boundaries and material side effects.

Do not let the candidate assign its own assurance need or redefine the claim after seeing results.

If the request is only native Skill/Plugin validity, use the appropriate native validator/package proof. Do not require behavioral execution merely to prove a structural/package claim.

## 2. Classify the execution environment

Choose from observed facts, not filenames or prior handoffs:

- **ADVISORY_ONLY** — no reproducible runner exists for the required behavioral claim. Case design, source review, and deterministic evidence-package checks may still be useful, but behavioral axes remain `NOT_RUN`.
- **EXECUTABLE_OBSERVED** — a real runner can execute frozen candidate cases and preserve inspectable outputs plus runtime/model/adapter identity.
- **EXECUTABLE_COMPARATIVE** — candidate and required baseline can execute the same frozen cases under declared comparable conditions.
- **CANONICAL_PROJECT_QUALIFICATION** — the current project additionally exposes authorized qualification definitions, evidence destinations, schemas/verifiers, and project-specific probes required by its own policy.

A project directory name, an old execution map, a schema file by itself, or an available host model does not prove the stronger mode.

When canonical project qualification is requested, **discover the project's current qualification infrastructure from exact project source**. Use its current schemas/verifier/destinations only after confirming they exist and are authoritative for that project. Do not assume this Skill's host Plugin layout or hard-code repository-relative paths.

## 3. Build representative cases

Prefer real or observed failures, then add synthetic cases only for uncovered material boundaries. Cover as applicable:

- positive trigger and near-miss/non-trigger;
- sufficient, missing, conflicting, and stale context;
- authority/ownership and forbidden assumptions;
- provider present/absent/denied/partial/stale behavior;
- side-effect guards and ambiguous results;
- failure/recovery/re-entry paths;
- completion/evidence truth;
- regressions and costly edge conditions;
- candidate/baseline comparison when the claim requires it.

Use explicit invariants rather than exact prose for non-deterministic output. A case identifier or rubric label is not an executable prompt.

When the claim concerns *how* an agent executed, include inspectable trajectory/tool/action evidence. Do not request or require private chain-of-thought.

## 4. Freeze execution before review

For every executed variant:

1. freeze the case input and exact artifact/runtime identity;
2. execute without semantic reviewer intervention;
3. preserve raw or inspectable output before review;
4. record material tool/action side effects and postconditions;
5. only then perform semantic review.

Do not repair, rewrite, or coach the output under test during frozen review. A changed output is a new execution record.

If execution is unavailable, preserve `NOT_RUN` rather than substituting source inspection or a validator fixture for behavioral evidence.

## 5. Review evidence against invariants

Use `PASS | FAIL | NOT_RUN | INCONCLUSIVE` for each required invariant. Review the dimensions the claim actually depends on, such as:

- invocation/discovery;
- decision quality;
- context/source truth;
- authority/ownership;
- evidence/completion truth;
- side-effect safety;
- domain output;
- process/trajectory evidence when required.

A longer answer is not automatically better. One critical forbidden behavior can fail a case even when other assertions pass.

When evidence contradicts an earlier verdict, re-enter at the earliest invalidated point: claim/binding -> execution environment -> cases -> execution/raw evidence -> semantic review -> comparison -> decision support.

## 6. Compare only when the claim requires it

Use the same frozen representative cases and declared conditions for candidate and baseline. Require intended improvement without material regression in safety, authority, ownership, or truthfulness.

A procedurally separated self-comparison may support a bounded directional conclusion; it is not independent certification. An independent claim requires actual independent execution/review provenance that is authoritative for that claim.

If the required baseline cannot execute or its revision is unknown, keep the comparison non-ready. Do not compare to memory or an approximate prior version.

## 7. Keep evidence and publication authority separate

Qualification may report that evidence is sufficient for a later authorized decision. It does not publish, promote, deploy, or grant write authority.

Report at minimum:

- evaluated candidate and baseline identity when applicable;
- execution environment and actual runner/provenance state;
- cases/invariants executed versus not run;
- evidence locations or inspectable outputs when they exist;
- per-axis/case verdicts and critical failures;
- comparison result when required;
- independent-claim support or blocker;
- evidence limitations and the next fact/action needed to re-enter qualification.

Do not manufacture a workflow state, owner route, Project Capability Profile, Integration Result, or generic operation envelope merely to finish qualification.

## 8. Repository and side-effect discipline

Before any protected repository/provider/publication/destructive action, verify the exact authority and expected postcondition at that action. Tool availability is not authority.

When qualification originated from a project gap, keep customer/project facts in the project. Do not bake project-specific policy into this reusable Skill.

When the capability itself needs redesign, freeze qualification at the demonstrated failure before any mutation. Return that evidence to the active job; if redesign is also authorized, the same session may continue through the relevant engineering capability (for example `skill-plugin-engineering`) without a handoff artifact. Never mutate the candidate under test before its failure evidence is fixed.

## Completion

Complete when every required claim axis has an explicit evidence state and the strongest supported conclusion is no stronger than the observed proof.

`FAIL`, `NOT_RUN`, `INCONCLUSIVE`, missing required baseline evidence, missing required provenance, or unreviewed material side effects remain visible blockers for the affected claim. Native package validity remains valid for the structural claim it actually proves; it is not behavioral evidence.
