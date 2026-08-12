# Discovery Evidence and Decision Contract

Use this reference when Product Discovery must judge **evidence sufficiency**, design an
**assumption test**, compare opportunities with materially different uncertainty, or challenge a
claim that evidence is strong enough to advance.

## Contents

1. Ownership and composition
2. Evidence topology
3. Evidence sufficiency
4. Assumption and owner model
5. Learning-test design
6. Opportunity comparison
7. Solution-contamination guard
8. Failure and correction patterns
9. Completion semantics

## 1. Ownership and composition

Product Discovery owns the Product decision question: what problem/opportunity is supported,
what uncertainty is decision-critical, and what learning would change the next recommendation.

It **does not own corpus synthesis**. When a corpus is large or heterogeneous enough that coding,
theming, triangulation, sample-shape assessment, or synthesis confidence is itself the work, use
`research-synthesis` and consume its findings here. Do not copy its corpus workflow into Product
Discovery.

Product Discovery may record assumptions whose truth belongs elsewhere:

- usability or interaction behavior -> Design evidence;
- technical feasibility, architecture, security, performance -> Architecture/Engineering evidence;
- operability/recovery -> Operations evidence;
- experiment metric validity -> `metrics-review` evidence;
- product priority/scope -> `product-definition` decision.

Recording a cross-owner assumption does not transfer decision authority.

## 2. Evidence topology

Before treating several observations as corroboration, identify how the evidence was generated.
For each material claim, reason about these fields when they affect the decision:

- **Evidence unit** — the independently generated event, participant/session, behavioral trace,
  experiment result, incident, request, or other unit that produced the observation.
- **Dependency** — shared outage, copied request, same participant/session, same upstream report,
  repeated forwarding, derived metric, or other reason several rows are not independent evidence.
- **Collection / selection mechanism** — inbound support, recruited interviews, opt-in survey,
  random assignment, usage telemetry, sales escalation, executive request, convenience sample, or
  another mechanism that determines who/what could appear.
- **Target directness** — how directly the evidence concerns the target actor, triggering
  situation, problem, behavior, or outcome under discussion.
- **Transferability** — which segments, contexts, channels, geographies, product states, or time
  periods the evidence can reasonably inform.
- **Counter-evidence / negative cases** — credible observations that weaken, narrow, or contradict
  the claim.

**Count is not independence.** Twenty tickets caused by one outage are twenty observations but may
be one dependent evidence cluster. Ten quotes from one interview are not ten independent users.

**Count is not prevalence.** A selected or inbound source can establish that a problem exists for
the observed population without establishing how common it is among all users. Never infer overall
prevalence from a selected sample unless the collection design supports that inference.

Do not force statistical-independence terminology onto qualitative evidence. The goal is to expose
material dependency and selection, not to manufacture a statistical model that the source cannot
support.

## 3. Evidence sufficiency

Evidence is sufficient **for a decision**, not sufficient in the abstract. Judge whether the
current evidence can support the next Product recommendation at its consequence and reversibility.

Consider:

1. **Directness** — does it observe the target problem/outcome, or only opinion/proxy preference?
2. **Coverage** — are materially different target segments/situations represented or explicitly
   bounded out?
3. **Dependency/source diversity** — do several signals add information, or repeat one source/event?
4. **Selection limits** — who or what could not appear because of the collection mechanism?
5. **Consistency and counter-evidence** — are contradictions explained by segment/context or still
   unresolved?
6. **Recency/product state** — did material conditions change after the evidence was collected?
7. **Decision consequence** — how costly or irreversible is it to be wrong at this step?
8. **Next-step reversibility** — can Product advance to a reversible definition/learning step while
   preserving the uncertainty, or would advancement silently commit scope/build?

There is **no universal sample size** and no fixed sample threshold for discovery sufficiency.
A small, specific, high-information sample may be enough for a bounded learning decision; a large,
biased or indirect sample may still be weak. Do not invent saturation, confidence, or significance
from counts alone.

A useful stopping rule is qualitative and decision-relative:

- more of the same dependent evidence is unlikely to change the recommendation;
- important negative/segment cases have been sought or their absence is explicitly limited;
- the riskiest decision-critical uncertainty is either adequately bounded for the next reversible
  step or has a named learning plan;
- remaining uncertainty is visible and belongs to a later owner/decision rather than being hidden.

If additional evidence could plausibly flip the recommendation and can be obtained at reasonable
learning cost, prefer `GATHER_EVIDENCE` or `RUN_EXPERIMENT` rather than pretending sufficiency.

## 4. Assumption and owner model

Classify a material assumption only to choose the right evidence and owner. Useful classes include:

- **Problem/desirability/value** — target actor experiences the problem; consequence matters;
  desired outcome is valuable. Product Discovery is the primary decision owner.
- **Behavior/adoption** — users will take an action under relevant conditions. Product may own the
  product hypothesis; observed interaction evidence may come from Design/research/experiments.
- **Business/viability/strategy** — business consequence, channel, policy, economics, or strategic
  premise. Product owns the product implication only within its authority and evidence.
- **Usability** — people can understand/use a proposed interaction. Design owns detailed evidence.
- **Technical feasibility / operability / security** — the system can be built and operated under
  constraints. Architecture/Engineering/Operations own the technical truth.

Do not force every opportunity to populate every class. The model exists to prevent a Product
workflow from silently deciding another owner's truth.

## 5. Learning-test design

The next learning action must be **decision-useful**, not merely cheap.

Bind the plan before execution:

```text
Material assumption
-> Learning question
-> Method / evidence source
-> Relevant participant / population / system state
-> Discriminating evidence
-> Decision rule defined before observing the result
-> Known limitations / transferability
-> Canonical execution owner/capability
```

### Discriminating evidence

Ask what result would meaningfully distinguish competing explanations or change the Product
recommendation. A test that only collects more preference statements may be weak when the critical
uncertainty is actual behavior, frequency, switching cost, willingness to adopt, or observed task
failure.

Cheapness is a constraint, not the objective. Prefer the **smallest decision-useful test**: the
lowest-cost/reversible action that can produce evidence strong enough for the decision being made.
If a cheaper test cannot discriminate the critical assumption, call it exploratory/weak evidence
instead of treating it as validation.

### Decision rule timing

Define the decision rule **before observing** the test result whenever the rule is material. Record
what evidence would:

- strengthen the opportunity enough to advance;
- weaken it enough to park/reject;
- leave it unresolved and require another learning step.

A rule invented or relaxed after seeing favorable evidence is not equivalent to a predeclared rule.
Preserve the post-hoc change as a limitation and downgrade confidence accordingly.

Product Discovery defines the learning need and evidence semantics. It does not invent an execution
route when the project lacks a canonical owner/capability.

## 6. Opportunity comparison

Compare opportunities only on evidence-backed dimensions relevant to the current Product decision,
such as:

- user/problem consequence;
- affected segment/situation;
- strategic relevance;
- evidence strength and transferability;
- riskiest unresolved assumption;
- cost/time to obtain decision-changing evidence;
- time sensitivity or reversibility when actually known.

Do **not invent weights**, numeric scores, market sizes, or composite precision to force a ranking.
If authorized weights and defensible inputs exist, a scoring framework may support judgment; it does
not replace the underlying evidence or uncertainty.

Prefer:

- **dominance** when one option is no worse on the material known dimensions and clearly stronger on
  at least one;
- **qualitative trade-off** when dimensions conflict;
- **tie / unresolved** when the difference depends on unknown or unauthorized weights;
- **sensitivity statement** naming which evidence/weight would change the ordering.

Learning cost is separate from opportunity value. A cheap-to-study problem is not automatically a
better opportunity.

## 7. Solution-contamination guard

A proposed solution, executive request, prototype preference, or technology enthusiasm may be useful
as a source of assumptions. It is not evidence that the target problem exists or matters.

Keep separate:

```text
Problem/outcome evidence
Solution hypothesis
Solution-specific evidence
Authorized Product decision
```

A prototype can test a problem/value assumption only when the observed behavior genuinely bears on
that assumption. Positive reaction to a UI or concept must not silently replace evidence about
problem frequency, consequence, or target-user need.

If the organization has already committed to build, Product Discovery may document that constraint;
it must not rewrite discovery evidence to make the commitment appear validated.

## 8. Failure and correction patterns

| Failure | Correction |
|---|---|
| Many duplicate signals interpreted as independent demand | Cluster by evidence unit/dependency; restate the bounded claim. |
| Inbound support ratio interpreted as total-user prevalence | Name the selection mechanism/population; seek representative evidence only if prevalence is decision-critical. |
| Cheap survey chosen for a behavioral uncertainty | Reframe the learning question and choose evidence capable of discrimination. |
| Decision threshold chosen after results | Mark post-hoc rule; downgrade confidence; rerun/predeclare when material. |
| One strong segment averaged away | Preserve segment-specific opportunity/transferability. |
| Numeric opportunity score uses guessed weights | Remove fake precision; show trade-off/sensitivity. |
| Technical feasibility asserted by Product | Record assumption and route evidence to the technical owner. |
| More interviews requested only to reach an arbitrary count | Use decision-relative sufficiency; explain what missing evidence could still change the recommendation. |

## 9. Completion semantics

A Product Discovery recommendation is evidence-ready only when:

- material claims trace to evidence or explicit assumptions;
- dependency/selection limits that affect the claim are visible;
- counter-evidence and segment variation are not smoothed away;
- the riskiest decision-critical assumption is named;
- when more learning is recommended, the learning plan names discriminating evidence and a decision
  rule rather than only an activity;
- opportunity comparison avoids invented precision;
- uncertainty belonging to another owner remains an assumption/dependency, not a Product-created fact;
- the recommendation remains separate from an authorized Product decision.
