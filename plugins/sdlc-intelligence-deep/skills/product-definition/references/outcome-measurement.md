# Outcome Measurement

Use this module only when **measurement semantics can change the Product decision**. It does not judge observed experiment/data validity; that belongs to `metrics-review`.

## Outcome-to-measurement chain

Keep the causal meaning visible:

```text
Product capability / changed condition
        -> user outcome
        -> plausible business effect
        -> metric / evidence source
```

A metric is evidence about an outcome, not the outcome itself. Prefer a measure whose business meaning and population directly represent the intended changed condition. If a metric is a proxy, state the expected relationship and how the proxy could move without the outcome.

## Roles and guardrails

Use only roles that help the decision:

- `PRIMARY_OUTCOME` — best available measure of the intended Product outcome/decision criterion.
- `SUPPORTING_DIAGNOSTIC` — helps explain mechanism or failure but is not sufficient alone for Product success.
- `GUARDRAIL / COUNTER_METRIC` — protects a material condition that could worsen while the primary outcome improves.

A plausible optimization path that raises the primary metric while harming trust, safety, quality, support burden, cost, or another declared outcome earns a guardrail. Do not call the definition successful from a primary metric alone when a declared guardrail materially regresses.

## Baseline and target basis

For each decision-useful metric preserve:

```text
role
outcome link / expected signal
meaning / formula or event interpretation
population / segment
baseline + source, or UNKNOWN
target / threshold + basis, or TBD / ASSUMPTION
evaluation window
data source / owner
proxy / guardrail / caveat
```

Do not invent a baseline, target, stretch value, effect size, benchmark, or market number to complete a form. A target may be grounded in an explicit Product commitment, historical baseline plus justified change, customer/contract threshold, policy/SLO, validated benchmark, or pre-bound experiment decision rule. A stakeholder-proposed number without evidence may remain a **proposed target assumption**.

If the intended metric is not observable, state the instrumentation/data-quality/research prerequisite rather than substituting a convenient proxy without naming the assumption.

## Failure / correction

| Failure | Correction |
|---|---|
| engagement/convenience metric selected because it already exists | re-enter at outcome link and choose/qualify a measure that represents the changed condition |
| proxy treated as direct outcome | state proxy mechanism + failure mode and add/adjust direct/guardrail evidence when material |
| target/baseline invented | replace with `UNKNOWN/TBD/ASSUMPTION` and name the evidence/owner needed |
| measured result interpreted as proof by Product Definition | return the intended measurement semantics; route observed-evidence validity to `metrics-review` |
| metric semantics change the commitment/scope claim | return the inconsistency to the resident workflow and reopen dependent Product decisions |

## Return contract

Return only:

```text
decision-useful metric set + role
outcome link / expected signal
baseline + source or explicit unknown
target / threshold + basis or explicit assumption/unknown
population + window + data source/owner
proxy / guardrail / caveat
measurement prerequisite or metrics-review dependency when material
```
