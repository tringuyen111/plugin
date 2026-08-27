# Frozen Qualification — Metrics Review Measurement and Causal Boundary

Evidence-State: `NOT_RUN`

These cases freeze Metrics Review behavior before discovery-metadata correction. They remain specification until executed by an observable model/runtime against exact Skill bytes.

## M1 — Ordinary metric movement is descriptive first
Input: weekly activation rose from 42% to 47% after a release, with no controlled design and incomplete cohort-composition evidence.
Target: resolve metric identity/comparability, report the observed change as descriptive, preserve competing explanations, and do not claim the release caused the increase.

## M2 — Randomized experiment with valid causal design
Input: a pre-specified randomized experiment has stable assignment, clean exposure, no unresolved SRM/contamination/attrition issue, appropriate uncertainty analysis, and the declared estimand is supported.
Target: load experiment-validity depth, permit a bounded `VALID_FOR_CAUSAL_INTERPRETATION` result when evidence supports it, then separately judge whether the effect supports the Product outcome.

## M3 — Unresolved SRM blocks clean causal claim
Input: treatment/control allocation materially differs from the planned randomization ratio and the cause is unresolved.
Target: return causal validity as limited/invalid according to evidence and refuse a clean treatment-caused-outcome claim even if the observed uplift is favorable.

## M4 — Quasi-experiment needs design-specific assumptions
Input: an interrupted time series or difference-in-differences analysis claims causality but does not establish its identifying assumptions or falsification/placebo checks.
Target: make the design-specific causal assumptions explicit and keep causal validity limited/invalid until supported. Do not borrow randomized-experiment language by analogy.

## M5 — Metric identity unresolved
Input: a dashboard says “conversion +12%” but numerator, denominator, eligibility, deduplication, definition history, and attribution are unclear.
Target: return `PARTIAL` or `BLOCKED` for the affected interpretation; do not estimate or compare silently from the chart label.

## M6 — Measurement change versus Product change
Input: conversion appears to jump on the same day instrumentation and event deduplication changed.
Target: separate measurement-system change from Product behavior and require discriminating evidence before interpreting the trend as Product movement.

## M7 — Failed statistical assumptions require method re-entry
Input: the chosen mean/normal interval is load-bearing, but the metric is heavily skewed with repeated clustered units and a small unstable denominator.
Target: invalidate the selected interpretation method, re-enter estimand/technique selection, and use an appropriate inspectable method or return bounded uncertainty. Do not keep the invalid interval with a caveat.

## M8 — Statistical significance is not practical significance
Input: a very large sample produces a narrow interval around a tiny effect below the pre-declared minimum practical effect.
Target: keep statistical uncertainty and practical significance separate; a causally valid but trivial effect need not `SUPPORT` the Product outcome.

## M9 — Product authority remains separate
Input: metric evidence strongly supports the declared outcome threshold.
Target: return the evidence verdict and next learning/action boundary, but do not reprioritize the roadmap, approve release, or declare the feature a Product success by Metrics authority alone.

## M10 — Existing heterogeneous corpus is not Metrics Review by default
Input: the main job is to reconcile interviews, support tickets, survey responses, and several already-qualified metric summaries into themes/findings.
Target: keep Research Synthesis primary for corpus integration. Metrics Review may qualify measurement/experiment claims but must not absorb general synthesis ownership.

## M11 — Missing valid computation/tool evidence
Input: a numeric inference requires a dependence-aware or sparse-event method, but no inspectable computation/tool output or source-owned analysis is available.
Target: return bounded qualitative interpretation or `CANNOT_EVALUATE`; do not fabricate numeric precision from memory.

## M12 — Discovery should include causal-validity requests
Input: the user asks, “Does this A/B test actually establish that treatment caused the conversion uplift?”
Target: Metrics Review is a positive discovery match because experiment causal validity is an owned capability. It should not be excluded by discovery wording that frames the Skill as non-causal only.

## Falsifiers
- A favorable uncontrolled trend is described as caused by the release.
- Unresolved SRM/assignment/exposure failure is bypassed because the metric moved positively.
- A quasi-experiment receives causal language without its identifying assumptions.
- Undefined metric identity is silently guessed from a dashboard label.
- A failed estimator/interval assumption is retained with a caveat instead of technique re-entry.
- Statistical significance is equated with meaningful Product success.
- Metrics Review takes roadmap/UAT/release authority.
- The discovery surface excludes a direct experiment causal-validity request even though the body owns it.
