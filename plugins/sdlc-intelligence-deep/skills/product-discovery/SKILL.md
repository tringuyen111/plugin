---
name: product-discovery
description: Turn noisy product signals such as requests, complaints, behavior, workarounds, metrics, sales or market inputs into an evidence-grounded, solution-free customer opportunity and next learning or advance recommendation. Use when the problem/opportunity itself is uncertain; stop before Product capability/scope decisions or requirement semantics.
---

# Product Discovery

When signal disposition, customer-progress framing, competing opportunity interpretations, segment/granularity, or solution-shaped inputs could change the recommendation, read [Product Opportunity Modeling](OPPORTUNITY-MODELING.md).

When evidence sufficiency, assumption-test design, opportunity comparison, evidence dependency/selection, or solution contamination could change the recommendation, read [Discovery Evidence and Decision Contract](DISCOVERY-EVIDENCE-DECISION-CONTRACT.md).

Discover whether there is a product opportunity worth defining further and establish the bounded problem-space truth before Product scope is designed.

This skill owns the **customer opportunity/problem, target actor/context, desired progress/outcome, evidence boundary, and riskiest assumption**. It does not own raw idea articulation, Product capability/scope decisions, detailed behavior, acceptance criteria, visual designs, technical architecture, or implementation tickets.
It does not own deep corpus synthesis. When coding, triangulation, sample-shape analysis, or synthesis confidence is itself decision-material, consume qualified synthesis from an available capability or preserve the exact unsynthesized evidence frontier; do not imitate that separate method locally.

Read `OPPORTUNITY-FORMAT.md` only when a durable, governed, or cross-session opportunity projection is actually required. A compact inline opportunity/disposition is a first-class completion surface.

## Universal decision frontier

For noisy or ambiguous signals, reason in this order:

```text
SIGNAL
-> disposition
-> actor/context + desired progress
-> current reality / workaround / alternative
-> progress gap + consequence
-> competing opportunity frames
-> discriminating evidence
-> bounded opportunity
-> next learning / advance recommendation
```

Do not require every step when the opportunity is already directly evidenced and bounded. A signal is not automatically an opportunity, and Product Discovery stops before selecting the Product capability delta or requirement semantics.

## Standalone evidence and decision frontier

Classify the missing truth before composing another capability. A sibling Skill name is never the missing truth itself.

```text
AVAILABLE, DECISION-SUFFICIENT EVIDENCE
    -> make the bounded Discovery judgment locally

SMALL, COHERENT SUPPLIED CORPUS
    -> inspect proportionally when the evidence can be understood without a separate synthesis method

LARGE OR HETEROGENEOUS UNSYNTHESIZED CORPUS
    -> name the synthesis question and the decision it can change
    -> consume qualified synthesis when available; otherwise preserve the unsynthesized frontier

NEW EXTERNAL EVIDENCE NEEDED
    -> name the exact evidence question, source/applicability need, and decision consequence
    -> use an authorized evidence surface when actually available; otherwise keep the evidence gap explicit

HUMAN-OWNED WEIGHT OR JUDGMENT
    -> expose the sensitivity and ask only the bounded decision-changing input when appropriate
    -> optional decision-interview depth may improve that separate human decision surface

SEMANTIC AMBIGUITY
    -> qualify ordinary source/context-specific terminology locally when sufficient
    -> require separate semantic-model clarification only when concept identity, relationships, roles, lifecycle meaning, or cross-context semantics themselves are decision-material
```

Missing support changes the evidence/decision frontier, not Product Discovery identity. Return `GATHER_EVIDENCE`, `PARTIAL`, or `BLOCKED` only because required truth or analysis is genuinely unavailable for the declared scope, never merely because a named sibling is absent.

## Process

### 1. Establish the source surface

Read the current project context and any available:

- user research;
- support reports;
- usage or business metrics;
- stakeholder requests;
- prior opportunities, product goals, or out-of-scope decisions;
- relevant runtime behavior when the claim concerns an existing product.

If the user only has an idea, keep it as a hypothesis. Do not manufacture user evidence to make the idea look validated.

For a large or heterogeneous corpus where corpus-level coding, triangulation, sample shape, or synthesis confidence is itself decision-material, do not duplicate that workflow. Consume qualified synthesis when an appropriate capability/artifact is available; otherwise state which unsynthesized evidence question prevents or limits the current Discovery judgment.

**Complete when:** every input is identified as observation, interpretation, request, or assumption, and any material collection/selection limitation is visible.

### 2. Model the opportunity unit when the signal is not already bounded

Do not rename the incoming request/behavior/metric as an opportunity. Determine:

- actor/segment and concrete context;
- desired customer progress;
- current behavior, existing capability, workaround, or alternative;
- the progress gap;
- material consequence;
- competing problem/opportunity frames that could explain the same signal;
- the evidence/segment boundary of the current claim.

Use [Product Opportunity Modeling](OPPORTUNITY-MODELING.md) when any of those could change the recommendation. Keep plural explanations until evidence discriminates them; a singular root cause is not required by default.

If the signal is better explained by a current defect/regression, an authoritative mandate, an already-existing capability with a discoverability problem, or another established current-state truth, preserve that truth instead of manufacturing a new desirability opportunity.

**Complete when:** the candidate opportunity is solution-free, bounded enough to falsify, and distinct from the strongest material alternative frame.

### 3. Pick the discovery branch

Use the smallest branch that matches the remaining uncertainty:

- **Problem exploration** — establish or discriminate the customer opportunity/problem and its segment/context.
- **Assumption test** — list the assumptions the opportunity/idea depends on, identify the one that would kill or materially change the recommendation, and define the smallest **decision-useful** test. Bind the learning question, discriminating evidence, and decision rule before observing the result when that rule is material.
- **Opportunity comparison** — compare multiple bounded problems or segments by user consequence, strategic relevance, evidence strength, and learning cost. Do not invent numeric scores or weights to force a ranking; preserve ties, uncertainty, and the evidence or authorized weight that would change the choice.
- **Strategy exploration** — map plausible problem-space bets and second-order effects without turning directional thinking into committed Product scope.

Keep Product Discovery primary for the opportunity judgment. When a concrete human-owned Product weight or branch is the remaining discriminator, preserve the sensitivity and ask the bounded owner input when appropriate; use `decision-interview` only as optional depth when a separate decision-quality interview is useful. When external primary evidence is needed, name the exact evidence question and use an actually available authorized research/source capability rather than depending on a specific sibling. Qualify ordinary overloaded terminology from source/context locally when that resolves the opportunity; use `domain-modeling` only when the semantic model itself is unresolved and decision-material.

### 4. Build and test the evidence model

For every material claim record:

```text
Observation
Source
Observed date or period
Scope / segment
Evidence unit / dependency
Collection / selection mechanism
Confidence
Limitations or conflicting evidence
```

When sources disagree, keep the disagreement visible. Recency and authority are part of the finding, not footnotes to omit.

Do not treat observation count as independent corroboration or prevalence. A shared outage, copied request, repeated participant/session, or derived source can create many observations from one evidence cluster. Inbound or otherwise selected evidence only supports prevalence when the collection design supports that inference.

There is no universal sample count that makes discovery evidence sufficient. Judge sufficiency relative to the claim and next decision: directness, target coverage, dependency/source diversity, selection limits, counter-evidence, recency, consequence of being wrong, and reversibility of the next step.

If evidence falsifies the current opportunity frame, re-enter at the earliest wrong signal disposition, actor/context, current reality, progress gap, consequence, or competing frame. Do not keep the original opportunity and merely lower confidence.

**Complete when:** each opportunity claim can be traced to evidence or is explicitly labeled as an assumption, material dependency/selection limits cannot be mistaken for confidence, and the problem-space frame still survives the evidence.

### 5. Bound the opportunity and learning frontier

Record:

- target actor/segment and situation;
- desired customer progress/condition;
- current reality/workaround/alternative;
- progress gap and material consequence;
- bounded opportunity statement;
- evidence/transferability boundary;
- competing opportunity frames still material;
- strategic/business relevance that is supported or explicitly hypothetical;
- what happens if nothing changes;
- non-goals for this discovery pass;
- riskiest assumption;
- next learning plan when more evidence is required.

Use parent/child/sibling/segment-variant structure only when it changes understanding, comparison, or the next learning question. Do not require an Opportunity Solution Tree or other hierarchy for a single bounded opportunity.

A solution request, prototype preference, or executive commitment may create a hypothesis or constraint; it is not evidence that the target-user problem is validated. Keep problem/outcome evidence separate from solution-specific evidence.

**STOP:** do not select the capability delta, feature cluster, Product scope/priority, packaging, business rules, states, AC, NFRs, or implementation. Those belong to Product Definition / Define Behavior and their child owners.

### 6. Recommend the next Product decision

Produce one **Discovery recommendation**:

- **ADVANCE_TO_PRODUCT_DEFINITION** — evidence and strategic value justify defining a Product outcome and capability scope.
- **RUN_EXPERIMENT** — a critical assumption should be tested before scoping.
- **GATHER_EVIDENCE** — the opportunity may exist, but current evidence is too weak or the competing frame remains unresolved.
- **REJECT_OR_PARK** — current problem-space evidence or consequence does not justify more Discovery work; do not make portfolio-priority judgments here.
- **BLOCKED** — required source, authority, or decision-critical analysis prevents a truthful Discovery judgment for the declared scope. Missing sibling availability alone is never the blocker.

A Discovery recommendation is Product judgment from this workflow; it is not an **Authorized Product decision**. The recommendation does not authorize scope, priority, rejection, or downstream execution. Record the accountable Product owner's decision separately when that owner actually reviews the artifact.

For `RUN_EXPERIMENT` or `GATHER_EVIDENCE`, the learning plan must identify the material assumption, learning question, method/evidence source, discriminating evidence, and the decision rule that would change or preserve the recommendation. Cheapness never upgrades weak evidence into decision-useful evidence.

For **RUN_EXPERIMENT**, identify an existing canonical project capability or accountable owner for the specific experiment only when project truth actually provides one. If none exists, record the experiment-execution **capability gap** and the Product owner who must resolve it. Do not invent a Skill, provider, team assignment, or execution path merely to keep the lifecycle moving. Discovery itself may be `READY` when its declared scope ends at a truthful recommendation; if the current requested scope requires executing the experiment and no canonical owner/capability exists, return `PARTIAL` or `BLOCKED` with the gap explicit.

Technical feasibility, operability, security, usability, or metric-validity uncertainty may be recorded as assumptions/dependencies, but Product Discovery does not decide another owner's technical or domain truth.

Do not treat an unvalidated idea as Build-ready.

### 7. Return or persist the Discovery truth

For a session-bound or simple request, return the smallest complete inline opportunity/disposition needed by the current consumer. Do not manufacture an OPP identifier, approval table, persistent path, or full artifact schema merely because a template exists.

When durable, governed, or cross-session Product Discovery state is required, read `OPPORTUNITY-FORMAT.md`, use the project-selected product artifact identity/location, and persist only when the exact destination and write authority are known. Tool/provider availability alone is not authority. If durable persistence is required but unavailable, return the usable inline truth with persistence `NOT_RUN` and mark `PARTIAL` or `BLOCKED` only according to whether the declared scope can still complete truthfully. Do not create a repository path by default.

Preserve unresolved or conflicting Product questions instead of smoothing them into the recommendation. A governed artifact remains `DRAFT` until the accountable Product owner reviews it. An authorized Product decision records its decision owner and provenance separately from the workflow's Discovery recommendation.

## Completion

Report `READY`, `PARTIAL`, `BLOCKED`, or `FAILED`.

`READY` requires:

- evidence and assumptions separated;
- opportunity framed as actor/context + desired progress + current reality + progress gap/consequence, not a disguised solution;
- evidence/segment boundary and material competing opportunity frames preserved;
- material evidence dependency, selection, transferability, and counter-evidence limitations preserved when they affect the recommendation;
- riskiest assumption identified;
- when more learning is recommended, the next learning plan includes discriminating evidence and a decision rule rather than only an activity;
- Discovery recommendation recorded separately from any Authorized Product decision;
- opportunity comparison, when used, does not rely on invented weights or false precision;
- missing sibling capability names are never treated as missing truth; any required evidence/analysis/authority gap is named directly;
- compact inline Discovery truth is sufficient when durable/governed persistence is not part of the requested scope;
- unresolved execution-capability gap visible when `RUN_EXPERIMENT` lacks a canonical execution capability/owner;
- no mandatory opportunity hierarchy, fixed sample-size rule, market size, Product Definition, BA, Design, Engineering, or QA decision silently invented.
