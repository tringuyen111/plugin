---
name: product-definition
description: Define an evidence-grounded Product commitment, user/business outcomes, capability scope, success metrics, priority, and Product decision. Use when an opportunity is mature enough to decide what Product should accomplish or contribute, what capability change is necessary/sufficient, and whether to advance, experiment, gather evidence, park, or reject without inventing downstream behavior or implementation.
---

# Product Definition

When source-evidence constraints, metric choice/target basis, guardrails/proxies, priority sensitivity, or scope commitment could change the Product decision, read [Product Outcome and Decision Contract](PRODUCT-OUTCOME-DECISION-CONTRACT.md).

When the Product decision can change based on current capability/blocker truth, business-value mechanism, scope sufficiency/necessity, feature/capability grouping, live operating shape, future option value, or commercial viability, read [Product Capability, Scope, and Value Contract](PRODUCT-CAPABILITY-SCOPE-CONTRACT.md).

Turn an opportunity into a Product definition and decision proposal that downstream BA, Design,
Engineering, and QA can use without inheriting hidden Product assumptions. When the accountable
Product authority is present, this workflow may also record that authority's explicit decision;
otherwise it returns a recommendation, not an approval.

This skill owns:

- desired user and business outcomes;
- success metrics and evaluation window;
- target segment;
- priority rationale;
- epic or feature scope;
- non-goals;
- product-level constraints and dependencies;
- the recommended Product decision to define, experiment, gather evidence, park, or reject;
- the authorized Product decision only when the named Product authority explicitly makes it for the exact artifact revision.

It does not own use cases, business rules, user stories, acceptance criteria,
visual design, architecture, implementation tasks, QA verdicts, or measured-evidence/statistical
validity owned by `metrics-review`.

Read `PRODUCT-DEFINITION-FORMAT.md` before writing the artifact.

## Preconditions

Start from an evidence-grounded opportunity with a canonical identity/location when one exists.
`OPP-*` is one valid project representation, not a required global identifier. Preserve the exact
source opportunity identity, source opportunity location, and **source opportunity revision**
supplied by the project rather than fabricating a shadow `OPP-*` ID.

Resolve the accountable Product decision owner and **decision authority** before treating any recommendation as approved Product truth. If the input is only a solution idea without a supported problem, treat it as discovery work rather than silently manufacturing a definition-ready opportunity.

## Process

### 1. Revalidate the opportunity

Read the exact current Opportunity revision and confirm:

- target user and triggering situation;
- current workaround and cost;
- evidence strength and conflicts;
- material evidence dependency, collection/selection, transferability and counter-evidence constraints;
- riskiest unresolved assumption and learning state;
- why the opportunity matters now.

Do not silently upgrade a hypothesis into a fact or strengthen evidence by dropping source
limitations. If the source Opportunity revision changed materially after definition began,
revalidate the changed truth before carrying forward scope, metric, priority or authorization.

### 2. Define the commitment and outcomes

Before claiming scope, state what this Product definition is committing to:

- **OUTCOME** — the scope claims the target condition can be achieved, subject only to explicit dependencies;
- **CONTRIBUTION** — the scope intentionally advances part of a larger outcome while remaining blockers/owners stay explicit;
- **LEARNING** — the scope primarily exists to answer a decision-critical Product assumption.

Do not let a contribution-sized scope inherit an outcome-sized claim. When the commitment type itself is uncertain, keep it explicit and use the capability/scope contract before defining scope.

Write separately:

- **User outcome** — what becomes easier, faster, safer, clearer, or possible.
- **Business outcome** — what business condition should change.

Outcomes describe changed conditions, not deliverables.

### 3. Define measurement

For each material outcome define:

- metric role — primary outcome, supporting/diagnostic, or guardrail/counter-metric when relevant;
- outcome link / expected signal and proxy limitation when applicable;
- metric name and business meaning;
- formula or event interpretation;
- population/segment;
- baseline and **baseline source** when known;
- target/threshold and **target basis** when justified;
- evaluation window;
- data source and owner;
- guardrail and quality caveats when a material dimension could worsen while the primary metric improves.

If the metric cannot currently be measured, state the instrumentation or research prerequisite.
Do not invent a baseline, target, stretch value, or convenient proxy to complete the form.

Product Definition selects what should measure the outcome and why. `metrics-review` owns
measured-evidence validity, experiment integrity, uncertainty/statistical interpretation, and
whether observed results support the Product claim.

### 4. Define product scope from current capability truth

For an existing product/workflow, inspect the strongest available current capability/workaround truth and identify the material blocker before adding scope. Do not rebuild or re-scope an existing capability merely because it belongs to the same journey.

Specify:

- target segment;
- in-scope user capability at feature/epic altitude;
- explicit non-goals;
- product constraints;
- external or cross-team dependencies;
- release assumption or phasing hypothesis;
- adjacent opportunities deliberately not included.

When scope quality depends on the relation between current capability, blocker, business value, Product topology, live operating shape, future option value, or commercial viability, apply `PRODUCT-CAPABILITY-SCOPE-CONTRACT.md`. Test the smallest capability envelope for necessity and sufficiency relative to the declared `OUTCOME | CONTRIBUTION | LEARNING` commitment. Usage frequency alone is not Product value, technical adjacency is not Product grouping, and a plausible future is not automatic current scope.

Keep scope solution-light. A feature scope may name a capability, but it must
not prescribe framework, database, module boundaries, detailed screen layout, test cases, or
deployment design.

### 5. Prioritize

Record the basis for priority:

- expected value and the evidence-backed mechanism by which the capability changes a user/business condition;
- evidence confidence and transferability;
- urgency or timing;
- strategic alignment;
- estimated learning or delivery cost if available;
- risk/reversibility when material;
- opportunity cost — what moves or remains uncommitted.

Frameworks such as RICE, ICE, MoSCoW, or value/effort may support a decision.
They do not replace judgment. Do not use **invented weights** or guessed inputs as scoring authority,
and uncertain inputs must stay uncertain. Record **sensitivity** when plausible input/weight changes
would change the priority ordering.

### 6. Recommend or record the Product decision

Produce one **Recommended Product decision**:

- **ADVANCE_TO_DEFINE_BEHAVIOR** — Product intent appears ready for BA definition.
- **RUN_EXPERIMENT** — Product value or metric assumptions need evidence first.
- **GATHER_EVIDENCE** — source quality is insufficient.
- **PARK_OR_REJECT** — not justified relative to alternatives.
- **BLOCKED** — decision owner, source, or dependency is unavailable.

A recommendation is not authorization. Record an **Authorized Product decision** only when the
named Product decision owner has authority for this scope and explicitly approves that decision
against the **exact artifact revision**. Preserve who decided, the authority/source, and the decision
revision/date. Workflow `READY` does not imply Product approval.

For **RUN_EXPERIMENT**, identify an existing canonical project execution capability/accountable owner only when project truth actually provides one. If none exists, record a **capability gap** and the Product owner responsible for resolving it. Do not invent a new experiment Skill, provider, team assignment, or execution path, and do not silently substitute Prototype, Research, Design, or Engineering as the Product experiment owner. The
Product definition may still be complete as a recommendation; execution-dependent continuation is
`PARTIAL` or `BLOCKED` when the required owner/capability is absent.

### 7. Write the product definition

Use the project-selected product artifact location. Persist only when the exact destination and write authority are known; provider/tool availability alone is not authority. If no canonical writable location is configured, return the complete definition inline with persistence `NOT_RUN`.
Use `PARTIAL` when the current session can consume it and `BLOCKED` when durable
or cross-session truth is required. Do not create a repository path by default.

The artifact remains `DRAFT` until the accountable Product/PO owner reviews it. Approval or a
protected Product decision is recorded as a separate authority-bearing field; DRAFT content never
becomes authorized simply because this workflow completed.

## Completion

`READY` requires:

- exact source opportunity revision linked and material evidence constraints preserved;
- user and business outcomes separated;
- metrics connected to outcomes/signals with role, population, window, source/owner and proxy/guardrail caveats when material;
- baselines/targets carry source/basis or remain explicitly unknown/TBD;
- declared `OUTCOME | CONTRIBUTION | LEARNING` commitment is consistent with the scope claim;
- scope and non-goals explicit and solution-light;
- when material, current capability/workaround, blocker, capability delta, operating/future/commercial constraints, and scope necessity/sufficiency are resolved or explicitly bounded without fabricated downstream/commercial truth;
- priority rationale, uncertainty/sensitivity and opportunity cost visible without invented weights;
- Recommended Product decision separated from any Authorized Product decision;
- decision authority and exact artifact revision recorded when an authorized decision exists;
- unresolved experiment capability/owner gap visible when `RUN_EXPERIMENT` cannot be executed by a canonical capability/owner;
- no metrics-review, BA, Design, Engineering, Architecture, QA, or release decision silently made.
