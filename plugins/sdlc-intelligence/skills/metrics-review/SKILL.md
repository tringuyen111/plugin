---
name: metrics-review
description: Review product metrics and experiments with explicit definitions, populations, trends, data-quality caveats, and non-causal interpretations. Use when another workflow needs to compare product performance with targets, investigate a change, or turn released-product data into learning.
---

# Metrics Review
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
<!-- runtime-context:end -->

Turn product data into a defensible learning decision. Own measurement interpretation and evidence limits; do not own roadmap priority, implementation correctness, QA, UAT, or release authority.

Read `METRIC-CONTRACT.md` whenever identity, population, event semantics, or comparison rules are missing or disputed. Read `EXPERIMENT-VALIDITY.md` **only when** the evidence is an experiment/quasi-experiment or the requested interpretation depends on causal validity; ordinary metric review does not load experiment-only context.

## Decision model

1. **Resolve metric identity.** Fix business meaning, unit, numerator, denominator, eligible population, event semantics, deduplication, attribution, time zone/window, segments, and definition history. A label or chart is not a metric.
2. **Validate measurement integrity.** Check instrumentation/version changes, late or duplicate events, missingness, backfill, bot/test traffic, exclusions, exposure logging, and source latency. If the data-generating process changed, separate measurement change from product change.
3. **Choose a valid comparison.** Name target, baseline, control, or prior cohort. Align exposure, eligibility, calendar effects, maturity windows, release timing, and cohort composition. Check novelty, regression to the mean, survivorship, and Simpson's paradox before aggregating.
4. **Quantify effect and uncertainty.** Report absolute and relative change, sample size/coverage, uncertainty interval or justified range, segment consistency, and practical significance. Do not convert a noisy percentage into a product verdict.
5. **Use a causal ladder.** Classify the statement as descriptive observation, diagnostic hypothesis, or causal conclusion. For experiment/quasi-experiment evidence, load `EXPERIMENT-VALIDITY.md` and classify validity as `VALID_FOR_CAUSAL_INTERPRETATION`, `LIMITED_FOR_CAUSAL_INTERPRETATION`, or `INVALID_FOR_CAUSAL_INTERPRETATION` before causal language. Unresolved assignment/exposure integrity, SRM, interference/contamination, attrition, stopping/peeking, multiplicity, or design-specific identifying assumptions cannot be bypassed by a favorable metric result. Without a causally valid design, list competing explanations and discriminating evidence instead.
6. **Assess the outcome.** Return exactly one evidence verdict: `SUPPORTS`, `WEAKENS`, or `CANNOT_EVALUATE`. Tie it to the product outcome, guardrails, caveats, and decision threshold—not to dashboard movement alone. Experiment validity and Product outcome verdict are separate axes: a causally valid trivial effect need not `SUPPORT` the outcome, and an invalid experiment cannot prove a causal effect.
7. **Route learning.** Link findings to the existing opportunity or propose the smallest next measurement, experiment, or Product decision. This skill must not reprioritize the roadmap or declare feature success by itself.

## Output

For each material conclusion report:

`metric contract → integrity/comparability verdict → experiment-validity result when applicable → observation → interpretation level → alternatives → outcome verdict → next evidence/owner`

## Completion

`READY` requires resolved metric identity, adequate integrity/comparability, visible uncertainty and practical significance, separated observation/inference/causality, an explicit outcome verdict, and a named next owner. Missing denominator, eligibility, exposure, definition history, or comparison validity is `PARTIAL` or `BLOCKED`, not an invitation to estimate silently.
