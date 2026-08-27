---
name: prototype
description: "Build a throwaway runnable experiment to answer one unresolved logic, state, interaction, density, or technical-feasibility question that static reasoning or design cannot discriminate. Use when the answer must be observed in execution. Do not use for static or clickable mockups, wireframes, visual-direction comparison, stakeholder Design approval, production implementation, or QA verification."
---

# Prototype
## Runtime context

Bind the unresolved question, minimum runtime fidelity, safe scratch/prototype location, and the project/user authority for any real-data or external mutation. A prototype does not need a Plugin-global workflow/profile record; prefer local fixtures/read-only data and the smallest live runtime that can discriminate the question.



A prototype is **throwaway code that answers one question**.

It is a runtime-learning detour, not Product discovery, BA definition, approved
Visual Design, production implementation, or QA verification.

## Choose the right experiment branch

- Logic or state-machine behavior needs to be exercised → [LOGIC.md](LOGIC.md).
- UI interaction, real application state, data density, auth/routing context, or
  technical feasibility must be experienced in execution → [UI.md](UI.md).
- User flow, hierarchy, typography, visual direction, components, or stakeholder
  design approval can be decided without runtime behavior → stop Prototype and
  return the bounded Product Design concern; host-native discovery owns any
  subsequent capability selection.
- Implementation already exists and needs visual feedback → stop Prototype and
  return the bounded Design Review concern.

If the question is ambiguous, state the assumption and ask only when choosing
the wrong branch would invalidate the experiment.

## Contract

Before coding, read [Prototype Experiment Design](EXPERIMENT-DESIGN.md) and record:

```text
Decision / owner
Question
Assumption or competing hypotheses
Observable discriminator
Decision rule: what observation changes the decision
Material confounds / context to hold stable
Minimum fidelity / time-effort boundary
Artifact location and run command
Stop condition
Disposition owner
```

## Rules

1. **One question.** Do not turn the prototype into a shadow feature.
2. **Throwaway from day one.** Mark routes/files/components clearly and keep them
   near relevant context without presenting them as production.
3. **One run command.** Use the existing task runner or state the exact command.
4. **No production persistence or mutations by default.** Use memory, fixtures,
   stubs, scratch data, or read-only real data unless persistence is the question.
5. **Skip production hardening.** Do not build a broad production test suite, abstraction layer, or error-handling surface beyond what makes the experiment safe and runnable. A tiny executable assertion or probe is valid when it is the cheapest reliable way to expose the declared discriminator; keep it prototype-local and scoped to the experiment question.
6. **Expose the discriminating observation.** The user must be able to observe the state/event/difference named by the decision rule; do not confuse a runnable artifact with an answered question.
7. **Control irrelevant confounds.** Keep task truth, representative data/context, shell/auth/navigation, content, and observation method stable when they are not part of the uncertainty.
8. **Inspect and interpret the artifact.** Run it and classify the observed evidence against the predeclared decision rule as supporting, falsifying, inconclusive, or exposing a different uncertainty. Re-enter the experiment question instead of forcing a winner when evidence does not discriminate.
9. **Delete, absorb, or keep explicitly.** Prototype code never drifts silently
   into production. `ABSORB` means absorb the learned decision/invariant into the
   owning design/spec/implementation plan; it does not automatically absorb the
   prototype bytes. `KEEP_AS_EXPERIMENT` keeps an explicitly non-production
   experiment. `DELETE` removes the prototype after preserving the learning.

## Productionization gate

A request to "keep", "promote", "ship", or "use the winner" does not change a prototype into supported source. Preserve the learned decision/invariant, observed evidence, prototype reference/run command, and any exact prototype code proposed for reuse as bounded implementation input. Production implementation still has to establish normal source, tests, review, runtime/output verification, replacement/cutover, and project truth rather than inheriting production status from the prototype.

If exact prototype bytes are intentionally retained as starting material, mark
them as prototype-origin implementation input until the production implementation has applied the normal tests, review, runtime evidence, and cleanup gates. The
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
