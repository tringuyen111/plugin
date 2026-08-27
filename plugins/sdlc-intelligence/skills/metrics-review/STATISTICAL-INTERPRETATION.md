# Statistical Interpretation Selection

Use this reference to choose a defensible **interpretation family**, not to perform statistical computation from memory. The Skill still requires inspectable data/tool evidence for any numeric result.

## Start from the estimand

Before choosing a summary or interval, name what is being estimated and at what analysis unit:

- count or event rate over exposure;
- proportion/probability among eligible units;
- ratio whose numerator and denominator both carry meaning;
- continuous location such as a mean;
- median/quantile/tail behavior;
- difference, relative change, or another explicitly defined contrast.

Then inspect the data-generating structure: distribution shape/tails, sparsity, repeated or clustered units, temporal dependence, censoring/missingness, denominator movement, and design-based dependence. Raw row count is not automatically independent sample size.

## Select the smallest adequate interpretation family

| Evidence shape | Prefer reasoning such as | Pressure-test |
|---|---|---|
| roughly symmetric continuous values with independent units | mean/difference with a standard mean-uncertainty family | heavy tails, multimodality, dependence |
| proportion / binary outcome | proportion-specific/binomial interval family | small counts, boundary probabilities, clustered assignment |
| counts or rates over exposure | count/rate model or justified range tied to exposure | overdispersion, zero inflation, changing exposure |
| ratio metric | inspect numerator + denominator and their joint population semantics; use ratio-aware or resampling uncertainty when available | denominator drift, composition change, unstable small denominator |
| skewed/heavy-tail outcome | median/quantile/tail summary, robust/transform/resampling family according to the decision | whether the tail itself is the product risk |
| sparse/rare events | exact/sparse-event appropriate interval or explicit low-precision range | severity can be high even when directional precision is low |
| repeated/clustered units | aggregate at the decision unit or use a cluster/repeated-measure aware method | pseudo-replication from event rows |
| time-dependent series | matched windows/time-aware model or block-aware uncertainty when available | seasonality, autocorrelation, release/calendar effects |

These are technique families, not automatic formulas. Use available statistical tooling or source-owned analysis when numeric inference is required. If the environment cannot support a valid method, return a bounded qualitative interpretation or `CANNOT_EVALUATE` rather than fabricating precision.

## Assumption ledger

For a material inference, make the load-bearing assumptions visible:

`estimand -> analysis unit -> distribution/tail assumption -> independence/dependence assumption -> missingness/exposure assumption -> chosen method -> practical threshold`

Do not list every textbook assumption. Record only assumptions that could materially change the interpretation.

## Re-entry on failure

A failed assumption changes the method; it is not merely a caveat.

- Normal/mean method + heavy tails or multimodality -> reconsider summary and uncertainty family.
- Row-level interval + clustered/repeated units -> move to the correct analysis unit or dependence-aware method.
- Stable denominator assumed + material denominator/composition change -> re-evaluate the ratio/proportion meaning.
- IID time comparison + autocorrelation/seasonality -> use a time-aware comparison or bound the claim.
- Sparse event data + unstable approximation -> use a sparse-event/exact family or state insufficient precision.

Re-enter at **technique selection**, recompute/reinterpret with the valid method if tooling/evidence exists, and update the downstream verdict. Do not preserve an invalid interval because later steps already used it.

## Quality discrimination

A strong metric interpretation explains **why this estimand and method fit this decision**, what evidence could invalidate them, and how statistical uncertainty differs from practical significance. A more complicated method is not automatically better; use the simplest method whose assumptions are adequate for the actual data and claim.
