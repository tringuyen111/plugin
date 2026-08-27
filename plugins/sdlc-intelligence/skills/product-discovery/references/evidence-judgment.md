# Evidence Judgment

Use this module when Product Discovery must decide what the evidence actually supports: dependency, selection, transferability, counter-evidence, sufficiency, or solution contamination. Return an evidence boundary, material limitations, sufficiency disposition, and the exact evidence gap/counter-signal that can change the recommendation.

## Evidence topology

Before treating several observations as corroboration, identify how they were generated. For each material claim consider only the fields that can change the decision:

- **Evidence unit** — independently generated participant/session/event/trace/result/request or other observation unit.
- **Dependency** — shared outage, copied request, same participant/session, repeated forwarding, derived metric, or another reason observations are not independent evidence.
- **Collection / selection mechanism** — inbound support, recruited interviews, opt-in survey, random assignment, telemetry, sales escalation, executive request, convenience sample, etc.
- **Target directness** — how directly evidence concerns the target actor/context/problem/outcome.
- **Transferability** — which segments, contexts, channels, geographies, product states, or time periods the evidence can inform.
- **Counter-evidence / negative cases** — credible observations that weaken, narrow, or contradict the claim.

**Count is not independence.** Twenty tickets caused by one outage may be one dependent evidence cluster. Ten quotes from one interview are not ten independent users.

**Count is not prevalence.** Selected/inbound evidence can establish a problem in the observed population without proving how common it is overall unless the collection design supports that inference.

Do not force statistical-independence language onto qualitative evidence; expose material dependency/selection without inventing a statistical model.

## Decision-relative sufficiency

Evidence is sufficient **for a decision**, not in the abstract. Judge:

| Dimension | Question |
|---|---|
| Directness | does it observe the target problem/outcome or only an opinion/proxy? |
| Coverage | are materially different target situations represented or explicitly bounded out? |
| Dependency/source diversity | do signals add information or repeat one source/event? |
| Selection limits | who/what could not appear because of the collection mechanism? |
| Counter-evidence | are contradictions explained by segment/context or unresolved? |
| Recency/product state | did relevant conditions change after collection? |
| Consequence | how costly/irreversible is it to be wrong at this step? |
| Reversibility | can Product advance to a reversible definition/learning step while keeping uncertainty explicit? |

There is no universal sample threshold. A small high-information sample may support a bounded reversible decision; a large biased/indirect sample may remain weak.

Prefer `GATHER_EVIDENCE` / `RUN_EXPERIMENT` when decision-changing evidence is plausibly obtainable and the current recommendation would otherwise rely on hidden uncertainty.

## Assumption ownership

Classify a material assumption only to choose evidence and preserve authority:

- problem/desirability/value -> Product Discovery owns the bounded Product judgment;
- behavior/adoption -> Product may own the hypothesis; observed interaction evidence can come from appropriate research/design/experiment surfaces;
- business/viability/strategy -> preserve actual authority and evidence;
- usability -> detailed truth belongs to Design evidence;
- feasibility/architecture/security/performance -> technical owners establish technical truth;
- operability/recovery -> Operations evidence;
- metric validity -> qualified metric evidence.

Recording a cross-owner assumption never grants Product Discovery authority to resolve it.

## Solution-contamination test

Keep separate:

```text
Problem/outcome evidence
Solution hypothesis
Solution-specific evidence
Authorized Product decision
```

A proposed solution, executive request, prototype preference, or technology enthusiasm may supply assumptions/constraints but is not evidence that the target problem exists or matters. Positive prototype reaction does not silently prove problem frequency/consequence/need.

If the organization has already committed to build, preserve the commitment as authority/constraint; do not rewrite Discovery evidence to make it appear validated.

## Failure / correction

| Failure | Correction |
|---|---|
| duplicate signals interpreted as independent demand | cluster by evidence unit/dependency and restate the bounded claim |
| inbound/support ratio treated as total-user prevalence | preserve selection mechanism/population; seek representative evidence only if prevalence matters |
| more interviews requested only to hit an arbitrary count | name the evidence that could still change the recommendation |
| technical feasibility asserted by Product | keep it as dependency and obtain technical truth only if needed for current scope |
| favorable solution evidence replaces problem evidence | separate solution-specific evidence and re-evaluate the problem claim |

## Return contract

Return only the decision-relevant update:

```text
evidence boundary + target population/context
material dependency / selection / transferability limits
counter-evidence or negative-case status
sufficiency disposition for the next decision
exact missing evidence or assumption, if any
```

This module does not design the learning test, rank opportunities, or authorize Product scope.
