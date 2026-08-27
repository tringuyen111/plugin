---
name: product-definition
description: Define an evidence-grounded Product commitment, user/business outcomes, capability scope, success metrics, priority, and Product decision. Use when an opportunity is mature enough to decide what Product should accomplish or contribute, what capability change is necessary/sufficient, and whether to advance, experiment, gather evidence, park, or reject without inventing downstream behavior or implementation.
---

# Product Definition

Turn an evidence-grounded opportunity into a bounded Product commitment and decision proposal that downstream BA, Design, Engineering, and QA can consume without inheriting hidden Product assumptions.

This Skill owns **Product commitment, user/business outcomes, success-measurement intent, target segment, capability scope/non-goals, Product-level dependencies/constraints, priority rationale, and Product recommendation**. It may record an Authorized Product decision only when the named authority explicitly decides against the exact artifact revision.

It does not own use cases, business rules, user stories, acceptance criteria, visual design, architecture, implementation tasks, QA verdicts, measured-evidence/statistical validity owned by `metrics-review`, exact pricing/billing mechanics, or another owner's authority. A loaded knowledge module inherits this boundary and may return only Product-level decision/state/evidence updates.

## Control model

```text
BIND CURRENT OPPORTUNITY + AUTHORITY
              |
              v
DECLARE COMMITMENT + OUTCOMES
              |
              v
SELECT CURRENT PRODUCT DECISION FRONTIER
   |        |         |        |        |        |
   |        |         |        |        |        +--> PRIORITY
   |        |         |        |        +-----------> COMMERCIAL VIABILITY
   |        |         |        +--------------------> OPTION HORIZON
   |        |         +-----------------------------> OPERATING SHAPE
   |        +---------------------------------------> CAPABILITY / SCOPE
   +------------------------------------------------> MEASUREMENT
              |
              v
INTEGRATE RESULT / RE-ENTER EARLIEST INVALIDATED PREMISE
              |
              v
RECOMMEND OR RECORD AUTHORIZED PRODUCT DECISION
              |
              +--> inline return
              `--> durable projection only when required
```

Do not run every branch. A small reversible Product decision with clear commitment, scope, measurement intent, and priority may complete from the resident surface without topology, commercial, option-horizon, or operating-shape depth.

## Commitment semantics — use these terms literally

- **Outcome Claim** — how strongly Product claims the target changed condition from this scope: `OUTCOME` when Product claims the bounded outcome can be achieved subject only to explicit dependencies, `CONTRIBUTION` when Product intentionally advances only part of a larger outcome, or `NO_OUTCOME_CLAIM` when the current scope exists only to learn and makes no present outcome-improvement claim.
- **Learning Commitment** — whether the current scope must discriminate a named decision-critical assumption: `LEARNING` when that evidence obligation is material, otherwise `NO_LEARNING_COMMITMENT`. Learning is not a weaker Outcome Claim and may coexist with either `OUTCOME` or `CONTRIBUTION`.

Keep these dimensions independent. A Product slice can be `CONTRIBUTION + LEARNING` or `OUTCOME + LEARNING`; do not erase one truth to fit a single commitment label.

## Resident invariants

- **Bind exact opportunity truth.** Preserve source opportunity identity/location/revision and decision-relevant evidence constraints. Never upgrade a hypothesis to fact by dropping dependency, selection, transferability, counter-evidence, or learning-state limitations.
- **Commitment precedes scope.** Declare both Outcome Claim and Learning Commitment. A contribution-sized scope cannot inherit an outcome-sized claim; a material Learning Commitment adds an evidence obligation without replacing an established Outcome Claim. Pure learning may use `NO_OUTCOME_CLAIM + LEARNING`.
- **Outcomes are changed conditions, not deliverables.** Keep user outcome and business outcome distinct.
- **Current capability truth precedes new scope.** Existing behavior/workaround may already satisfy part of the need or reveal the actual blocker; do not duplicate capability merely because it belongs to the same journey.
- **Product scope stays solution-light.** Product may name the capability/change at feature or epic altitude, not framework, DB/module boundaries, screen layout, API/job design, tests, or deployment mechanics.
- **Unknown numbers stay unknown.** Do not invent baselines, targets, effect sizes, market sizes, weights, reach, confidence, effort, or scores to complete a template.
- **Measurement intent is not evidence verdict.** Product Definition chooses what should measure the outcome and why; `metrics-review` owns observed-data validity, uncertainty/statistical interpretation, experiment integrity, and whether evidence supports the Product claim.
- **Recommendation is not authorization.** `READY` means definition-ready truth, not Product approval. Authorization requires named authority, exact artifact revision, and explicit decision.
- **Do not invent continuation ownership.** For `RUN_EXPERIMENT`, use an existing canonical execution capability/owner only when project truth provides one; otherwise record the capability gap.
- **Knowledge cannot widen the job.** Commercial depth may expose viability hypotheses but not price/billing/legal decisions; operating depth may return Product capability/constraints but not UI/API/batch mechanics; capability depth may not absorb BA/Design/Architecture/Engineering decisions.

## 1. BIND — establish source truth and authority

Read the exact current Opportunity revision. Confirm target actor/context, current reality/workaround, evidence strength/conflicts, decision-relevant evidence limitations, riskiest unresolved assumption/learning state, and why the opportunity matters now.

Resolve the accountable Product decision owner and decision authority before treating any recommendation as approved Product truth. If the input is still only a solution idea without supported problem-space truth, return to Discovery rather than manufacturing a definition-ready opportunity.

**BIND complete when:** the source revision and material evidence constraints are visible, and recommendation authority is distinguished from approval authority.

## 2. COMMIT — declare what Product is trying to make true and learn

Declare two independent dimensions. Do not infer one from the other.

### Outcome Claim

| Outcome Claim | Meaning | Scope consequence |
|---|---|---|
| `OUTCOME` | Product claims the bounded target condition can be achieved subject only to explicit dependencies | every material blocker inside Product responsibility must be covered or the claim narrowed |
| `CONTRIBUTION` | Product intentionally advances part of a larger outcome | remaining blockers/owners stay explicit; do not claim whole-outcome completion |
| `NO_OUTCOME_CLAIM` | the current slice makes no present claim that it improves the target outcome | do not fabricate value completion merely because Product is running a learning activity |

### Learning Commitment

| Learning Commitment | Meaning | Scope consequence |
|---|---|---|
| `LEARNING` | the current scope must discriminate a named decision-critical assumption | scope/evidence path must answer the learning question; production completeness is unnecessary unless required by the evidence mechanism or an independent Outcome Claim |
| `NO_LEARNING_COMMITMENT` | no decision-critical learning obligation is part of the current Product commitment | do not invent an experiment or evidence burden merely to make the definition look rigorous |

State the **user outcome** and **business outcome** separately even when the current Outcome Claim is `NO_OUTCOME_CLAIM`; they remain the opportunity context, not a fabricated claim by the current slice.

If Outcome Claim changes, reopen only the dependent outcome/scope/measurement/priority/recommendation truth. If Learning Commitment or its question changes, reopen the learning evidence path and dependent measurement/experiment/recommendation truth while preserving an independent established Outcome Claim and scope unless the changed learning premise actually affects them.

## 3. SELECT DEPTH — load only the module that can change the current decision

| Frontier | WHEN | WHY | TARGET | RETURN |
|---|---|---|---|---|
| Measurement | metric choice/role, outcome link, proxy, guardrail, baseline, target basis, window, observability, or measurement ownership can change the Product decision | measurement must represent the intended outcome without fabricated certainty | [Outcome Measurement](references/outcome-measurement.md) | decision-useful metric set + roles/outcome links + baseline/target basis or explicit unknown + proxy/guardrail caveats + measurement prerequisite/owner |
| Capability / scope | current capability/blocker, value mechanism, capability delta, necessity/sufficiency, coherence, or Product topology can change inclusion | scope must be the smallest Product capability envelope justified by current truth and commitment | [Capability Scope](references/capability-scope.md) | current truth + value mechanism + `REUSE/EXTEND/NEW` delta + smallest justified scope/non-goals/dependencies + topology only when decision-useful |
| Operating shape | actor, cadence, criticality, scale, or recovery/support expectation can invalidate an otherwise plausible scope | demo-level usefulness may fail under real Product operation | [Operating Shape](references/operating-shape.md) | Product-level capability/constraint/guardrail required by live operation + unresolved owner/evidence; no implementation mechanics |
| Option horizon | an evidence-backed adjacent future can change what must be preserved now | future relevance should constrain Product intent without speculative scope or technical runway | [Option Horizon](references/option-horizon.md) | `BUILD_NOW / PRESERVE_OPTION / DEFER_SPECULATIVE` + evidence basis + current trade-off/constraint if any |
| Commercial viability | segment/core-vs-expansion, cost-to-serve, entitlement/package treatment, fairness/churn/support risk can change scope or priority | Product may need a viability hypothesis without fabricating commercial truth | [Commercial Viability](references/commercial-viability.md) | Product-level viability risk/hypothesis + affected scope/priority + unresolved evidence/owner; no exact price, billing, legal, or approval truth |
| Priority | evidence-backed value, confidence, urgency, strategic fit, cost, reversibility, opportunity cost, or uncertain weights can change ordering/decision | prioritization must expose sensitivity rather than hide guessed precision | [Priority Decision](references/priority-decision.md) | priority rationale/disposition + uncertainty/sensitivity + opportunity cost + exact evidence or authorized input that would change it |
| Durable projection | governed/cross-session Product artifact is actually required | persistence is representation/continuity, not additional Product reasoning | [Product Definition Format](references/product-definition-format.md) | faithful serialization of already-established Product truth; no invented identity, metric, target, scope, priority, or approval |

If a module cannot produce the named `RETURN`, skip it. Do not directory-browse for generic context and do not preload future/commercial/topology/operational depth merely because those modules exist.

## 4. INTEGRATE — update Product state and re-enter only dependents

Integrate each module return into the resident Product definition. Preserve independent established truth when a premise changes.

| New evidence invalidates... | Re-enter at... |
|---|---|
| source opportunity/evidence boundary | `BIND`, then every dependent commitment/outcome/scope/priority/decision |
| Outcome Claim or user/business outcome | `COMMIT`, then dependent outcome measurement/scope/priority/recommendation |
| Learning Commitment or learning question | `COMMIT`, then the learning evidence path and dependent measurement/experiment/recommendation; preserve independent Outcome Claim/scope unless actually affected |
| measurement meaning/target/proxy assumption | measurement and any recommendation/experiment gate that depends on it; preserve independent scope when unaffected |
| current capability/blocker/value mechanism | capability/scope and dependent priority/recommendation |
| operating/future/commercial constraint | only affected scope/priority/recommendation dimensions |
| priority input/authorized weight | priority + recommendation, not unrelated Product truth |
| authorization source/revision | authorization only unless the underlying Product decision truth also changed |

Do not keep obsolete scope for document stability and do not restart the whole definition when only one independent dimension changed.

## 5. RECOMMEND — make the Product disposition explicit

Return one Recommended Product decision:

- `ADVANCE_TO_DEFINE_BEHAVIOR` — Product intent is coherent enough for BA/behavior definition.
- `RUN_EXPERIMENT` — a Product value/metric assumption needs discriminating evidence first.
- `GATHER_EVIDENCE` — source quality or decision-critical truth is insufficient.
- `PARK_OR_REJECT` — not justified relative to supported alternatives/opportunity cost.
- `BLOCKED` — a load-bearing source, authority, or dependency is unavailable.

A recommendation remains distinct from an Authorized Product decision. Record authorization only when the named Product decision owner has authority and explicitly decides against the exact artifact revision; preserve decision owner, authority/source, revision/date.

For `RUN_EXPERIMENT`, name an existing canonical execution capability/accountable owner only when project truth provides one. Otherwise record the unresolved capability gap and Product owner responsible for resolving it; do not invent a Skill/provider/team/execution path.

## 6. RETURN / PERSIST

Return the smallest complete Product truth needed by the caller. Load the durable format only when a canonical writable destination or cross-session/governance requirement exists. Provider/tool availability is not write authority; if no canonical destination is known, return inline and mark persistence `NOT_RUN`/`PARTIAL`/`BLOCKED` according to the real continuity need.

The artifact remains `DRAFT` until the accountable Product owner reviews it. Approval is a separate authority-bearing field, never an implication of workflow completion.

## Completion

`READY` requires:

- exact source opportunity revision linked and material evidence constraints preserved;
- Outcome Claim, Learning Commitment, and separate user/business outcomes are coherent without collapsing the two commitment dimensions;
- measurement intent is sufficient for the decision, with unknown baselines/targets/proxies/guardrails left explicit when unresolved;
- current capability truth and the smallest justified scope/non-goals/dependencies are clear;
- any material operating/future/commercial/priority condition that can change the decision is resolved or explicitly open;
- recommendation is explicit and authorization is separate;
- no BA/Design/Architecture/Engineering/QA, metrics evidence verdict, exact pricing/billing/legal mechanics, release-readiness verdict, or invented execution ownership leaked into Product truth.

Use `PARTIAL` when useful Product truth exists but one non-load-bearing continuation/persistence obligation remains. Use `BLOCKED` only when a load-bearing source, authority, dependency, or decision truth prevents the requested Product disposition.
