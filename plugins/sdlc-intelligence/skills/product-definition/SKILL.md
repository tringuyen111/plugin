---
name: product-definition
description: Define a product outcome, success metric, priority, and feature scope from an evidence-grounded opportunity.
---

# Product Definition
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **When source-evidence constraints, metric choice/target basis, guardrails/proxies, priority sensitivity, or scope commitment could change the Product decision:** read [Product Outcome and Decision Contract](PRODUCT-OUTCOME-DECISION-CONTRACT.md).
<!-- runtime-context:end -->

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

Resolve the accountable Product decision owner and **decision authority** before treating any
recommendation as approved Product truth. If the input is only a solution idea without a supported
problem, route back to `/product-discovery`.

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

### 2. Define outcomes

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

### 4. Define product scope

Specify:

- target segment;
- in-scope user capability at feature/epic altitude;
- explicit non-goals;
- product constraints;
- external or cross-team dependencies;
- release assumption or phasing hypothesis;
- adjacent opportunities deliberately not included.

Keep scope solution-light. A feature scope may name a capability, but it must
not prescribe framework, database, module boundaries, detailed screen layout, test cases, or
deployment design.

### 5. Prioritize

Record the basis for priority:

- expected value;
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

For **RUN_EXPERIMENT**, resolve an existing canonical project owner/capability for the specific
experiment before naming an execution route. If none exists, record a **capability gap** and the
Product owner responsible for resolving it. Do not invent a new experiment route/Skill or silently
substitute `/prototype`, `/research`, Design, or Engineering as the Product experiment owner. The
Product definition may still be complete as a recommendation; execution-dependent continuation is
`PARTIAL` or `BLOCKED` when the required owner/capability is absent.

### 7. Write the product definition

Use the project-selected product artifact location. If no canonical location
is configured, return the complete definition inline with persistence `NOT_RUN`.
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
- scope and non-goals explicit and solution-light;
- priority rationale, uncertainty/sensitivity and opportunity cost visible without invented weights;
- Recommended Product decision separated from any Authorized Product decision;
- decision authority and exact artifact revision recorded when an authorized decision exists;
- unresolved experiment capability/owner gap visible when `RUN_EXPERIMENT` cannot be handed off;
- no metrics-review, BA, Design, Engineering, Architecture, QA, or release decision silently made.
