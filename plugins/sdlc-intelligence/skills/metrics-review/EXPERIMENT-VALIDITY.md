# Experiment Validity Reference

Read this reference **only when** the evidence under review is presented as a randomized experiment, controlled trial, quasi-experiment, or another design intended to support causal language. Ordinary metric/dashboard review should not load this context.

The purpose is to decide whether the experiment design and execution justify causal interpretation. It does not approve Product priority or replace the metric contract.

## Freeze the causal question

Record before judging results:

- treatment/intervention and comparison;
- target population and eligibility;
- primary outcome/guardrails and the causal **estimand**;
- stated hypothesis, decision threshold, minimum practical effect, and analysis window;
- **randomization** or assignment mechanism;
- **assignment unit** and **analysis unit**;
- planned sample size/power or other precision target when available;
- planned stopping rule and primary/secondary comparisons.

If these facts were chosen after seeing outcomes, record the post-hoc change; do not present it as pre-specified evidence.

## Assignment and exposure integrity

Check:

1. Assignment occurred through the declared mechanism and treatment/control eligibility rules match.
2. Assignment identifiers are stable and the assignment unit matches the causal question.
3. Exposure logging distinguishes assigned, eligible, actually exposed, and cross-exposed users/units.
4. Treatment delivery is sufficiently faithful to the assigned condition; material fallback or version drift is explicit.
5. Control is not accidentally treated through shared caches, teams, devices, households, networks, or operational processes.
6. A **sample-ratio mismatch (SRM)** check or equivalent allocation-integrity check is available when random allocation predicts proportions. Unexplained SRM blocks a clean causal claim.

## Independence, interference, and contamination

Assess whether one unit's treatment can change another unit's outcome. Consider shared accounts, teams, marketplaces, networks, geography, inventory, support behavior, and concurrent campaigns. Name **interference**, spillover, or contamination when present and determine whether clustering, cluster randomization, or another design adjustment was required.

## Attrition, missingness, and analysis population

- Compare dropout, missing outcomes, logging loss, and exclusion rates across conditions.
- Explain post-assignment exclusions and whether they can depend on treatment/outcome.
- Distinguish intention-to-treat, treatment-on-treated, per-protocol, and other analysis populations; do not switch among them silently.
- Check whether the analysis unit, denominator, deduplication, and maturity window match the assignment design and metric contract.

## Stopping, peeking, and multiplicity

- Compare actual stopping with the declared stopping rule.
- Repeated **peeking** with ordinary fixed-horizon significance thresholds weakens nominal error control unless an appropriate sequential method was planned/applied.
- Record the number of primary/secondary outcomes, segments, variants, looks, and comparisons considered.
- Address **multiplicity** with a pre-specified hierarchy, corrected procedure, or explicit exploratory classification rather than selecting the most favorable result.
- Treat post-hoc segment discovery as hypothesis generation unless independently confirmed.

## Other validity threats

Check novelty/learning and carryover, seasonality or concurrent interventions, instrumentation changes, noncompliance, treatment switching, unequal observation windows, cluster effects, and whether a quasi-experiment's identifying assumptions are actually supported. For quasi-experiments, state the design-specific assumption and falsification/placebo checks rather than using randomized-experiment language by analogy.

## Experiment validity result

Return one bounded result:

- `VALID_FOR_CAUSAL_INTERPRETATION` — assignment/design, exposure, analysis, and inference checks support the declared causal estimand within stated limitations.
- `LIMITED_FOR_CAUSAL_INTERPRETATION` — useful directional evidence exists but one or more validity limitations narrow the causal claim; state the exact scope and next evidence.
- `INVALID_FOR_CAUSAL_INTERPRETATION` — a material design/execution/inference failure such as unresolved SRM, assignment/exposure mismatch, severe contamination/interference, biased attrition, or invalid stopping/multiplicity handling prevents the claimed causal conclusion.

A statistically significant result does not override a failed validity check. A valid design also does not make a practically trivial effect important; practical significance remains part of the main Metrics Review workflow.
