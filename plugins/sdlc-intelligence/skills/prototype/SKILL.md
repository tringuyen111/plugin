---
name: prototype
description: Build a throwaway runnable artifact to answer one unresolved logic, state, interaction, density, or technical-feasibility question. Use when conversation or static design cannot provide the answer and the result must be observed in execution.
---

# Prototype
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


A prototype is **throwaway code that answers one question**.

It is a runtime-learning detour, not Product discovery, BA definition, approved
Visual Design, production implementation, or QA verification.

## Choose the right owner first

- Logic or state-machine behavior needs to be exercised → [LOGIC.md](LOGIC.md).
- UI interaction, real application state, data density, auth/routing context, or
  technical feasibility must be experienced in execution → [UI.md](UI.md).
- User flow, hierarchy, typography, visual direction, components, or stakeholder
  design approval can be decided without runtime behavior → route to
  `/design-experience` or `/design-visual`, not this skill.
- Implementation already exists and needs visual feedback → `/review-visual`.

If the question is ambiguous, state the assumption and ask only when choosing
the wrong branch would invalidate the experiment.

## Contract

Before coding, record:

```text
Question
Assumption being tested
Observable answer
Time/effort boundary
Artifact location and run command
Disposition owner
```

## Rules

1. **One question.** Do not turn the prototype into a shadow feature.
2. **Throwaway from day one.** Mark routes/files/components clearly and keep them
   near relevant context without presenting them as production.
3. **One run command.** Use the existing task runner or state the exact command.
4. **No production persistence or mutations by default.** Use memory, fixtures,
   stubs, scratch data, or read-only real data unless persistence is the question.
5. **Skip production hardening.** No broad tests, abstractions, or error handling
   beyond making the experiment safe and runnable.
6. **Expose relevant state and differences.** The user must be able to observe
   what the experiment changes.
7. **Inspect the artifact.** Run it and observe the result; code existence does
   not answer the question.
8. **Delete, absorb, or keep explicitly.** Prototype code never drifts silently
   into production. `ABSORB` means absorb the learned decision/invariant into the
   owning design/spec/implementation plan; it does not automatically absorb the
   prototype bytes. `KEEP_AS_EXPERIMENT` keeps an explicitly non-production
   experiment. `DELETE` removes the prototype after preserving the learning.

## Productionization gate

A request to "keep", "promote", "ship", or "use the winner" does not change a
prototype into supported source. Hand the learned decision/invariant, observed
evidence, prototype reference/run command, and any exact prototype code proposed
for reuse to `/implement` (or the canonical implementation owner). That workflow
owns production source, tests, code review, runtime/output verification,
replacement/cutover discipline, and canonical work truth.

If exact prototype bytes are intentionally retained as starting material, mark
them as prototype-origin implementation input until `/implement` has applied the
normal production tests, review, runtime evidence, and cleanup gates. The
prototype workflow never reports production implementation complete.

## Completion

Record:

```text
Question answered
Artifact/run command
Observed evidence
What was learned
Decision
Remaining uncertainty
Disposition: DELETE | ABSORB | KEEP_AS_EXPERIMENT
```

`READY` means the question was answered and disposition is explicit. It does
not mean the artifact is production-ready.
