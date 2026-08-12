---
name: product-discovery
description: Turn an idea or signal into an evidence-grounded product opportunity and next learning decision.
---

# Product Discovery
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **When evidence sufficiency, assumption-test design, opportunity comparison, evidence dependency/selection, or solution contamination could change the recommendation:** read [Discovery Evidence and Decision Contract](DISCOVERY-EVIDENCE-DECISION-CONTRACT.md).
<!-- runtime-context:end -->

Discover whether there is a product opportunity worth defining further.

This skill owns the **problem, target user, desired outcome, evidence, and
riskiest assumption**. It does not write detailed behavior, acceptance
criteria, visual designs, technical architecture, or implementation tickets.
It does not own corpus synthesis; use `research-synthesis` when a complex evidence
corpus needs coding, triangulation, sample-shape analysis, or finding confidence
before Product can judge the opportunity.

Read `OPPORTUNITY-FORMAT.md` before writing the artifact.

## Process

### 1. Establish the source surface

Read the current project context and any available:

- user research;
- support reports;
- usage or business metrics;
- stakeholder requests;
- prior opportunities, product goals, or out-of-scope decisions;
- relevant runtime behavior when the claim concerns an existing product.

If the user only has an idea, keep it as a hypothesis. Do not manufacture user
evidence to make the idea look validated.

For a large or heterogeneous corpus, use `research-synthesis` for corpus-level
source inventory, coding, triangulation, sample shape, and synthesis confidence.
Product Discovery consumes those findings for opportunity judgment rather than
duplicating the synthesis workflow.

**Complete when:** every input is identified as observation, interpretation,
request, or assumption, and any material collection/selection limitation is
visible.

### 2. Pick the discovery branch

Use the smallest branch that matches the uncertainty:

- **Problem exploration** — who experiences the problem, when, current
  workaround, frequency, consequence, and variation by segment.
- **Assumption test** — list the assumptions the idea depends on, identify the
  one that would kill the idea, and define the smallest **decision-useful** test.
  Bind the learning question, discriminating evidence, and decision rule before
  observing the result when that rule is material.
- **Opportunity comparison** — compare multiple problems or segments by user
  pain, strategic relevance, evidence strength, and learning cost. Do not invent
  numeric scores or weights to force a ranking; preserve ties, uncertainty, and
  the evidence or weight that would change the choice.
- **Strategy exploration** — map plausible bets and second-order effects
  without turning directional thinking into committed scope.

Invoke `/grilling` when important branches remain implicit. Invoke `/research`
when a decision needs external primary-source evidence. Use `/domain-modeling`
when product language is overloaded or inconsistent.

### 3. Build the evidence table

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

When sources disagree, keep the disagreement visible. Recency and authority are
part of the finding, not footnotes to omit.

Do not treat observation count as independent corroboration or prevalence. A
shared outage, copied request, repeated participant/session, or derived source
can create many observations from one evidence cluster. Inbound or otherwise
selected evidence only supports prevalence when the collection design supports
that inference.

There is no universal sample count that makes discovery evidence sufficient.
Judge sufficiency relative to the claim and next decision: directness, target
coverage, dependency/source diversity, selection limits, counter-evidence,
recency, consequence of being wrong, and reversibility of the next step.

**Complete when:** each opportunity claim can be traced to evidence or is
explicitly labeled as an assumption, and material evidence dependency/selection
limits cannot be mistaken for confidence.

### 4. Frame the opportunity

Define:

- target user or actor;
- triggering situation;
- current workaround;
- user cost and business consequence;
- desired change in condition;
- strategic relevance;
- what happens if nothing changes;
- non-goals for this discovery pass;
- riskiest assumption;
- next learning plan when more evidence is required.

Prefer an outcome statement over a solution statement.

Bad:

```text
Build an AI search page.
```

Better:

```text
Help support agents find the current resolution procedure in under two minutes
without asking an escalation channel.
```

A solution request, prototype preference, or executive commitment may create a
hypothesis or constraint; it is not evidence that the target-user problem is
validated. Keep problem/outcome evidence separate from solution-specific evidence.

### 5. Recommend the next Product route

Produce one **Discovery recommendation**:

- **ADVANCE_TO_PRODUCT_DEFINITION** — evidence and strategic value justify
  defining a product outcome and feature scope.
- **RUN_EXPERIMENT** — a critical assumption should be tested before scoping.
- **GATHER_EVIDENCE** — the problem may exist, but current evidence is too weak.
- **REJECT_OR_PARK** — current evidence or priority does not justify more work.
- **BLOCKED** — an owner, source, or decision required for discovery is missing.

A Discovery recommendation is Product judgment from this workflow; it is not an
**Authorized Product decision**. The recommendation does not authorize scope,
priority, rejection, or downstream execution. Record the accountable Product
owner's decision separately when that owner actually reviews the artifact.

For `RUN_EXPERIMENT` or `GATHER_EVIDENCE`, the learning plan must identify the
material assumption, learning question, method/evidence source, discriminating
evidence, and the decision rule that would change or preserve the recommendation.
Cheapness never upgrades weak evidence into decision-useful evidence.

For **RUN_EXPERIMENT**, resolve an existing canonical project owner/capability
for the specific experiment before naming an execution handoff. If none exists,
record the experiment-execution **capability gap** and the Product owner who must
resolve it. Do not invent a route, Skill, `/prototype`, `/research`, or
Engineering substitute merely to keep the lifecycle moving. Discovery itself
may be `READY` when its declared scope ends at a truthful recommendation; if the
current requested scope requires executing the experiment and no canonical
owner/capability exists, return `PARTIAL` or `BLOCKED` with the gap explicit.

Technical feasibility, operability, security, usability, or metric-validity
uncertainty may be recorded as assumptions/dependencies, but Product Discovery
does not decide another owner's technical or domain truth.

Do not route directly to Build from an unvalidated idea.

### 6. Write the opportunity artifact

Use the project-selected product artifact location and preserve the canonical
artifact identity / project truth location when one exists. If no canonical
location is configured, return the complete opportunity inline with persistence
`NOT_RUN`. Use `PARTIAL` when the current session can consume the inline artifact,
and `BLOCKED` when durable or cross-session discovery is required. Do not create
a repository path by default.

Preserve unresolved or conflicting Product questions instead of smoothing them
into the recommendation. The artifact is `DRAFT` until the accountable Product
owner reviews it. An authorized Product decision records its decision owner and
provenance separately from the workflow's Discovery recommendation.

## Completion

Report `READY`, `PARTIAL`, `BLOCKED`, or `FAILED`.

`READY` requires:

- evidence and assumptions separated;
- target user and current problem stated;
- desired outcome stated without prescribing implementation;
- material evidence dependency, selection, transferability, and counter-evidence
  limitations preserved when they affect the recommendation;
- riskiest assumption identified;
- when more learning is recommended, the next learning plan includes
  discriminating evidence and a decision rule rather than only an activity;
- Discovery recommendation recorded separately from any Authorized Product decision;
- opportunity comparison, when used, does not rely on invented weights or false precision;
- unresolved next-owner/capability gap visible when `RUN_EXPERIMENT` has no canonical execution owner;
- no fixed sample-size rule, market size, BA, Design, Engineering, or QA decision silently invented.
