---
name: product-discovery
description: Turn noisy product signals such as requests, complaints, behavior, workarounds, metrics, sales or market inputs into an evidence-grounded, solution-free customer opportunity and next learning or advance recommendation. Use when the problem/opportunity itself is uncertain; stop before Product capability/scope decisions or requirement semantics.
---

# Product Discovery

Discover whether there is a product opportunity worth defining further and establish the bounded problem-space truth before Product scope is designed.

This Skill owns the **customer opportunity/problem, target actor/context, desired progress/outcome, evidence boundary, riskiest assumption, and Discovery recommendation**. It does not own raw idea articulation, Product capability/scope decisions, detailed behavior, acceptance criteria, visual design, technical architecture, implementation, deep corpus synthesis, or another owner's domain truth.

A missing sibling Skill is never the missing truth itself. Name the evidence, analysis, semantic clarification, authority, or owner decision actually required. Conditionally loaded knowledge inherits this Product Discovery boundary and cannot authorize Product Definition or another capability's decision.

## Control model

```text
BIND SIGNAL / SOURCE
        |
        v
FRAME PROBLEM-SPACE TRUTH
        |
        v
SELECT CURRENT DECISION FRONTIER
   |         |          |          |
   |         |          |          +--> COMPARE opportunities
   |         |          +-------------> DESIGN learning test
   |         +------------------------> JUDGE evidence
   +----------------------------------> REFINE frame
        |
        v
INTEGRATE RESULT / RE-ENTER EARLIEST INVALIDATED PREMISE
        |
        v
DISCOVERY RECOMMENDATION
        |
        +--> inline return
        `--> durable projection only when required
```

Do not run every branch. If the opportunity is already directly evidenced, bounded, and decision-sufficient, skip unnecessary depth and return the smallest complete Discovery truth.

## Resident invariants

- **Signal is not opportunity.** A request, workaround, metric shift, competitor launch, mandate, or executive direction is evidence/input requiring disposition, not automatic customer validation.
- **Keep problem and solution evidence separate.** Preserve solution requests/prototypes as hypotheses or constraints; do not let favorable solution reaction silently prove problem frequency, consequence, or target-user need.
- **Current-state truth comes first.** A defect/regression, authoritative mandate, or already-existing capability may explain the signal; do not manufacture a new desirability opportunity around it.
- **Evidence and assumption stay distinct.** Counts are not automatically independent corroboration or prevalence; segment, dependency, selection, transferability, recency, and counter-evidence remain visible when material.
- **Cross-owner assumptions do not transfer authority.** Product Discovery may record usability, feasibility, security, operability, metric-validity, or strategic dependencies but must not decide another owner's truth.
- **Discovery recommendation is not an Authorized Product decision.** Product scope/priority/commitment belongs downstream to the accountable Product owner/capability.
- **Stop before solution scope.** Do not select capability delta, feature cluster, packaging, business rules, states, AC, NFRs, implementation, or visual/technical design.

## 1. BIND — establish the source and missing-truth frontier

Read the current project context and only the source/evidence surfaces that can change the Discovery judgment: user research, support signals, behavior/usage, business metrics, stakeholder requests, prior Product decisions/non-goals, and runtime truth when the claim concerns an existing product.

If the user only has an idea, keep it as a hypothesis. Do not manufacture user evidence.

Classify the current evidence situation:

| Situation | Discovery action |
|---|---|
| Available, decision-sufficient evidence | make the bounded Discovery judgment locally |
| Small coherent supplied corpus | inspect proportionally when separate synthesis methodology is unnecessary |
| Large/heterogeneous unsynthesized corpus | name the exact synthesis question and decision consequence; consume qualified synthesis if available, otherwise preserve the unsynthesized frontier |
| New external evidence needed | name the evidence question, applicability/source need, and decision consequence; use an authorized source surface if available |
| Human-owned weighting/judgment | expose sensitivity and ask only the bounded decision-changing owner input when appropriate |
| Semantic ambiguity | qualify local terminology when sufficient; require deeper semantic clarification only when concept identity/relations themselves change the opportunity |

**BIND complete when:** every material input is identifiable as observation, interpretation, request, constraint, or assumption, and any collection/selection/synthesis limitation capable of changing the recommendation is visible.

## 2. FRAME — establish the opportunity unit

Use the smallest frame that can be falsified:

```text
ACTOR / SEGMENT
+ CONTEXT
+ DESIRED PROGRESS
+ CURRENT REALITY / WORKAROUND / ALTERNATIVE
+ PROGRESS GAP
+ MATERIAL CONSEQUENCE
+ EVIDENCE BOUNDARY
+ STRONGEST COMPETING FRAME
```

Keep plural explanations when evidence does not discriminate them. Do not require a singular root cause or an opportunity hierarchy by default.

For a simple bounded signal, frame locally. When signal disposition, segment/granularity, competing interpretations, or solution-shaped input can change the opportunity identity, use the framing module below rather than loading unrelated evidence/test/comparison depth.

## 3. SELECT DEPTH — load only the module that can change the current decision

| Frontier | WHEN | WHY | TARGET | RETURN |
|---|---|---|---|---|
| Opportunity framing | signal disposition, actor/context, progress gap, segment/granularity, competing frames, or opportunity structure is materially unclear | wrong opportunity identity invalidates all downstream evidence/recommendation work | [Opportunity Framing](references/opportunity-framing.md) | bounded solution-free frame + strongest alternatives + exact discriminating evidence question |
| Evidence judgment | evidence dependency, selection, sufficiency, transferability, counter-evidence, or solution contamination can change whether the frame may advance | recommendation strength must match what the evidence actually supports | [Evidence Judgment](references/evidence-judgment.md) | evidence boundary + dependency/selection limits + sufficiency disposition + material evidence gap/counter-signal |
| Learning test | one unresolved assumption can kill/materially change the recommendation and more learning is justified | activity is useful only if the result can discriminate and change a decision | [Learning Test](references/learning-test.md) | material assumption + learning question + evidence source/method + discriminating evidence + pre-bound decision rule + limitations/execution need |
| Opportunity comparison | two or more bounded opportunities/segments remain plausible and their relative disposition matters | comparison must expose trade-off/sensitivity without invented precision | [Opportunity Comparison](references/opportunity-comparison.md) | dominance/trade-off/tie + sensitivity + exact evidence or authorized weight that would change the ordering |
| Durable projection | governed/cross-session Discovery state is actually required | persistence is a representation/continuity need, not additional Discovery reasoning | [Opportunity Format](references/opportunity-format.md) | faithful projection of already-established Discovery truth; no new decision truth |

If a reference can be loaded without producing the named `RETURN`, skip it. Do not directory-browse for generic context.

### Strategy exploration

When the remaining uncertainty is directional strategy rather than one of the four depth modules, map plausible **problem-space bets**, assumptions, and second-order effects locally. Keep them solution-free and stop before committed Product scope. If strategy depends on an unauthorized weight, external fact, or another owner's truth, expose that dependency rather than inventing it.

## 4. INTEGRATE — update evidence and re-enter only what changed

For every material opportunity claim retain enough provenance to avoid false confidence:

```text
Observation
Source + observed date/period
Scope / segment
Evidence unit + dependency
Collection / selection mechanism
Confidence / limitation
Counter-evidence or conflicting frame
```

There is no universal sample count that makes Discovery evidence sufficient. Sufficiency is relative to the claim, consequence of being wrong, and reversibility of the next step.

When new evidence invalidates the current model, re-enter at the earliest affected premise:

| Failure | Re-enter at |
|---|---|
| feature/solution promoted directly to opportunity | signal disposition + customer progress |
| current defect/mandate/existing capability explains the signal | current-state truth + remaining gap |
| one generic frame averages materially different segments | actor/context + segment boundary |
| metric symptom lacks a problem mechanism | current reality + competing frames |
| evidence dependency/selection invalidates confidence | evidence judgment |
| learning result falsifies a material assumption | affected frame/assumption + dependent comparison/recommendation |
| comparison depends on unknown/unauthorized weight | comparison sensitivity / owner input |
| new capability/scope/rules/states are being selected | stop at Product Discovery boundary |

Preserve independent valid evidence and decisions. Do not restart Discovery from zero unless the invalidated premise is shared/root truth for the whole opportunity.

## 5. RECOMMEND — choose the next Product disposition

Return exactly one Discovery recommendation:

- **ADVANCE_TO_PRODUCT_DEFINITION** — evidence and strategic relevance justify defining Product outcome/capability scope while preserving remaining uncertainty.
- **RUN_EXPERIMENT** — a critical assumption needs a decision-useful test before scoping.
- **GATHER_EVIDENCE** — the opportunity may exist, but current evidence or competing frame is insufficient for the declared next decision.
- **REJECT_OR_PARK** — current problem-space evidence/consequence does not justify more Discovery work; do not invent portfolio-priority authority.
- **BLOCKED** — required source, authority, or decision-critical analysis prevents a truthful Discovery judgment for the declared scope.

For `RUN_EXPERIMENT` / `GATHER_EVIDENCE`, the learning plan must name the material assumption, learning question, evidence source/method, discriminating evidence, and decision rule. Cheapness never upgrades weak evidence into decision-useful evidence.

If experiment execution is in scope, use an existing canonical owner/capability only when project truth supplies one. Otherwise expose the execution-capability gap. Product Discovery may still be `READY` when its requested scope ends at a truthful recommendation.

## 6. RETURN / PERSIST — project only what the consumer needs

For a session-bound or simple request, return the smallest complete inline opportunity/disposition. Do not manufacture an OPP identifier, approval table, repository path, or full artifact schema merely because a format exists.

Use [Opportunity Format](references/opportunity-format.md) only when durable, governed, or cross-session state is required and the exact destination/write authority is known. Tool/provider availability is not write authority. If persistence is required but unavailable, keep persistence `NOT_RUN` and set the overall disposition according to whether the declared Discovery scope can still complete truthfully.

Preserve unresolved/conflicting Product questions. A governed artifact remains `DRAFT` until the accountable Product owner reviews it; an Authorized Product decision records owner/provenance separately from the Discovery recommendation.

## Completion

Report `READY`, `PARTIAL`, `BLOCKED`, or `FAILED`.

`READY` requires:

- evidence and assumptions separated;
- solution-free opportunity framed as actor/context + desired progress + current reality + gap/consequence;
- evidence/segment boundary and material competing frame preserved;
- material dependency/selection/transferability/counter-evidence limitations preserved when they affect the recommendation;
- riskiest assumption identified;
- additional learning, when recommended, contains discriminating evidence and a decision rule;
- comparison, when used, avoids invented weights/false precision;
- Discovery recommendation remains separate from Authorized Product decision;
- missing sibling names are never treated as missing truth;
- no Product Definition, behavior/AC/NFR, visual design, architecture, implementation, or other-owner truth is silently invented;
- compact inline truth is sufficient when durable persistence is not part of the requested scope.
