# Prototype Experiment Design

Read this before coding any prototype. The prototype artifact exists only to create decision-changing evidence.

## 1. State a falsifiable learning contract

Record:

```text
Decision / owner
Question
Current assumption or competing hypotheses
Observable discriminator
Decision rule: what observation would change the decision
Material confounds / context that must stay realistic or controlled
Minimum fidelity needed
Stop condition
```

If no plausible observation can change a decision or reduce a material uncertainty, do not build the prototype.

## 2. Choose fidelity from the uncertainty

Use the cheapest artifact that exposes the load-bearing mechanism:

- state transition / data shape / algorithm semantics -> logic prototype;
- auth, routing, real data density, navigation context, timing, browser interaction -> runtime UI prototype;
- static hierarchy, typography, visual direction, component styling -> Design artifact, not runtime prototype;
- provider/runtime feasibility -> include the exact provider/runtime surface only when it is the uncertainty being tested.

Do not add realism that cannot affect the answer. Do not remove realism that the decision depends on.

## 3. Control irrelevant confounds

When comparing alternatives, hold context stable unless the differing context is part of the hypothesis:

```text
same task / behavior truth
same representative data or declared data difference
same shell/auth/navigation when those are not the variable
same content/copy when copy is not the variable
same evidence-collection method
```

Alternatives may differ radically in the mechanism being tested; they should not differ accidentally in enough other dimensions that the observation becomes uninterpretable.

## 4. Design observations, not just artifacts

For each hypothesis identify what must be observed in execution:

- legal/illegal state transition;
- time/order/failure behavior;
- context loss or recovery difficulty;
- ability to distinguish states;
- interaction cost under realistic density;
- provider/runtime feasibility constraint;
- other concrete event/state/output tied to the decision rule.

Compilation, route loading, or the existence of multiple variants proves only experiment setup unless that is the declared technical question.

## 5. Interpret results against the decision rule

Classify the result:

```text
SUPPORTS
FALSIFIES
INCONCLUSIVE
EXPOSED_DIFFERENT_UNCERTAINTY
```

- `SUPPORTS` / `FALSIFIES`: record the exact observation and the decision it changes.
- `INCONCLUSIVE`: name the missing discriminator, confound, or trade-off; revise the question/fidelity rather than choosing a winner.
- `EXPOSED_DIFFERENT_UNCERTAINTY`: preserve the unexpected evidence and re-enter at the newly exposed dependency/owner question.

Do not choose a variant because it is more polished, was shown first, or produced the easiest happy path unless those factors are part of the declared decision rule.

## 6. Stop at decision sufficiency

Once the question is answered with sufficient evidence, stop expanding the prototype. Preserve:

```text
question + decision rule
observed evidence
learning / changed assumption
remaining uncertainty
prototype reference/run command
DELETE | ABSORB | KEEP_AS_EXPERIMENT
```

Any productionization, hardening, broader testing, canonical design approval, or supported source realization belongs to its owning workflow.

## Re-entry

- Observation does not discriminate -> refine discriminator or experiment fidelity.
- Two outcomes matter but no trade-off rule exists -> return to the accountable decision owner before another comparison.
- Prototype exposes a different blocker -> stop the old experiment and reframe around the new uncertainty.
- Realism introduces unrelated noise -> reduce non-load-bearing fidelity while preserving the mechanism under test.
