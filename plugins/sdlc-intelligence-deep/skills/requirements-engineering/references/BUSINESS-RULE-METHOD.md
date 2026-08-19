# Business Rule Branch
<!-- runtime-context:start -->
## Runtime context

- **When a durable governed rule, exact revision, supersession history, or lifecycle state is materially required:** read [Business Rule Artifact](BUSINESS-RULE-FORMAT.md).
- **When interacting conditions/results require an explicit decision model:** read [Decision Table Contract](DECISION-TABLE-CONTRACT.md) and make match/result semantics explicit before judging overlap or defaults.
<!-- runtime-context:end -->

Make business-owned decision semantics explicit, declarative, challengeable, and separate from process or implementation.

This branch owns the normative business directive. It does not own process sequence, UI behavior, database/service design, technical RBAC/claims, policy-engine implementation, QA verdicts, test implementation, Product metric authority, or durable shared-domain vocabulary.

A broad policy, regulation, goal, principle, or owner statement may **source or motivate** a Business Rule without yet being a rule. Do not manufacture a practicable directive from vague intent. The default output may be a lightweight **candidate/proposed rule**; durable IDs, revisions, approval state, and lifecycle metadata are required only when real governed persistence or an authorized target-rule claim makes them material.

## Contents

1. Rule ontology
2. Default reasoning loop
3. Truth and authority
4. Applicability, exceptions, and precedence
5. Decision-table use
6. Cross-view boundaries
7. Completion


## Rule ontology

Separate **source/motivation** from the rule itself.

Use the primary rule nature when it helps reasoning:

- **DEFINITIONAL / STRUCTURAL** — states what must be true about a business concept, classification, fact, or relationship.
- **BEHAVIOURAL / OPERATIVE** — constrains or requires business conduct or a business decision, such as an obligation, prohibition, or permission.

Practical application labels are secondary. Use them when useful without turning them into a competing ontology:

- validation or eligibility;
- permission/prohibition;
- calculation or derivation;
- transition guard;
- obligation or required follow-up.

The label never replaces a precise declarative rule statement.

## Default reasoning loop

1. **Clarify decision-material terms and facts.** Identify terms, relationships, thresholds, periods, classifications, and facts whose meaning can change the rule. Resolve small local ambiguity from available evidence. If a shared concept/fact definition itself must change or be persisted canonically, use `domain-modeling` for that concept-definition concern; after terminology is clarified, Business Rule still owns the normative directive.
2. **Isolate the directive.** Separate the intended business constraint/definition from policy motivation, process steps, UI behavior, current implementation, and technical enforcement.
3. **State the rule declaratively.** Express what is true, required, prohibited, permitted, derived, or constrained in business language. Do not write an implementation recipe or process sequence.
4. **Define applicability and result.** State relevant conditions, effective scope/time/jurisdiction/segment, and the observable business result. Preserve material exclusions explicitly.
5. **Pressure with examples.** Add positive, negative, and boundary examples/counterexamples that could falsify the interpretation. For calculations, include inputs near rounding/period/bucket boundaries when material.
6. **Expose authority and conflict truth.** Record only the source/authority context actually known. Distinguish observed current practice from authorized target semantics. If authority, precedence, terminology, or another material fact remains unresolved, keep it unresolved rather than fixing it with wording.
7. **Choose a decision model only when complexity earns it.** Use a decision table/model for interacting conditions or multiple results, not as mandatory formatting. Apply the Decision Table Contract when used.

### Contrastive SHOW

```text
Weak mixed claim: "Premium users get faster queries."
Rule concern:      define who qualifies as Premium and any entitlement/permission that follows.
Quality concern:   define the authorized response-time/conformance target separately, if such a target exists.
```

Do not invent a latency threshold to make a policy statement precise; split mixed ownership at the earliest semantic boundary.

## Truth, authority, and applicability

Classify truth only to the degree evidence supports it:

- **CURRENT_VERIFIED** — current business behavior/practice supported by inspectable current-state evidence; it does not automatically define the desired rule.
- **TARGET_AUTHORIZED** — target business semantics supported by the actual owning authority/decision. For a governed claim, bind the exact authoritative source/revision or equivalent fixed point.
- **PROPOSED_OR_ASSUMED** — stakeholder proposal, inference, convention, or working assumption that has not reached required authority/evidence.

For lightweight clarification, known source context may be described without inventing a source ID or revision. Never fabricate `BR-*`, source revisions, approval state, owner decisions, or effective dates merely to complete a format.

Keep these concepts distinct:

- **Business owner** — accountable domain owner for the rule artifact.
- **Owning authority/source** — decision/source that grants the rule business force.
- **Effective period / scope / jurisdiction / segment** — where and when the rule applies.
- **Precedence / supersession** — which authoritative rule controls when authoritative rules conflict or replace one another, and from what effective point.
- **Exception / override authority** — who may authorize a bounded departure from an otherwise applicable rule.

Precedence/supersession, decision-table priority/order, and multi-result aggregation are different semantics. Do not use one to stand in for another.

Observed runtime practice, a disabled UI control, or an implementation guard may be evidence of current behavior but is not sufficient authority for `TARGET_AUTHORIZED`. If authoritative sources conflict and no authoritative resolution exists, preserve `CONFLICTED`, `PARTIAL`, or `BLOCKED` truthfully rather than manufacturing precedence or compromise.

## Exceptions

Keep a simple scope exclusion inline when it only narrows the parent rule and has no independent authority or lifecycle.

When an exception/override directive has distinct conditions, authority, effective scope/time, result, examples, or lifecycle, model it as a **separate linked Business Rule**. Keep its override authority distinct from precedence/supersession and from decision-table hit/result semantics.

## Decision-table invariant

A table is a business decision model, not a formatting shortcut. When multiple rows can match, state the intended match/result resolution semantics before judging overlap. Never let physical row order become a hidden Business Rule. A business-authorized priority or ordered evaluation is valid only when its normative basis is explicit. If multiple results all apply, define collect/aggregation semantics explicitly. Keep uncovered combinations/defaults and domain-significant `UNKNOWN`/`NOT_APPLICABLE` visible.

Read `DECISION-TABLE-CONTRACT.md` for the full method whenever a table/model is used.

## Calculation and derivation semantics

When a numeric or derived result is material, preserve the authoritative:

- inputs and formula/derivation;
- unit/currency;
- rounding/precision;
- period/time basis;
- boundary/bucket behavior;
- multi-result aggregation semantics when relevant.

If any value that can change the business result is absent from authority, keep it unresolved rather than inventing a convenient convention.

## Traceability and change impact

A lightweight proposed rule or conversational refinement does **not** automatically trigger change-impact work.

When an **authorized/governed material rule revision** changes canonical downstream meaning in Use Cases, Acceptance Criteria, states, metrics, user guides, operations, or evidence, use `traceability` for persisted lineage/change-impact analysis. Business Rule identifies the semantic impact but does not silently rewrite downstream canonical truth.

## Ownership boundaries

- A business **permission** rule names business actors, business conditions, and the business result. Architecture/Engineering own technical RBAC roles, claims, policy engines, storage, and enforcement mechanisms.
- A **transition guard** defines business states/conditions/result; it does not design a database state machine, lock, queue, or transaction mechanism.
- Current UI behavior is interface evidence, not rule authority. A disabled button alone does not prove a target permission rule.
- A Product metric, target, or guardrail is not automatically a Business Rule. Treat it as normative only when an authorized domain source makes it so.
- `domain-modeling` may own durable vocabulary/concept coherence; it does not acquire authority over the normative Business Rule.
- Acceptance Criteria consume rule semantics for one item; they do not own the rule's policy/formula/eligibility authority.
- QA verdicts, test implementation, waivers, and verification authority remain with their canonical owners.

## Quality checks

A strong rule or candidate is:

- specific enough to challenge with examples;
- declarative and business-readable;
- explicit about decision-material terms/facts;
- clear about applicability, result, and material exclusions;
- honest about source/authority/truth state;
- stable independently of current UI or technical enforcement;
- clear about precedence/supersession versus priority/order versus aggregation;
- calculation-complete when formula/unit/rounding/period/boundary semantics determine the result;
- explicit about conflicts, missing coverage, and unresolved authority rather than hiding them behind defaults.

## Completion

For a **lightweight candidate**, `READY` means the rule semantics are specific enough to review and falsify, applicability/result and material examples are clear, and unresolved authority/terminology/coverage questions are explicit. `READY` does not mean approved or target-authorized.

For a **governed or `TARGET_AUTHORIZED` rule**, `READY` additionally requires the real source/authority fixed point, lifecycle/effective truth, supersession/precedence when material, governed decision-model semantics when used, and traceability/change-impact coverage when a material revision changes canonical downstream meaning.

A vague policy, stale or missing authority, unresolved conflicting rule, hidden decision-table order, ambiguous multi-hit semantics, material uncovered combination without an authoritative default, or incomplete calculation semantics remains `PARTIAL` or `BLOCKED` as appropriate.
