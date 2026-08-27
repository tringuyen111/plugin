# BA Requirements Reasoning

Use this reference when there is enough Product/domain/source grounding to reason about requirement meaning, even if some target claims remain proposed, unresolved, or awaiting authority, and the meaning is incomplete, ambiguous, conflicted, cross-stakeholder, transition-heavy, insufficiently understood by its consumers, or at risk of being reduced to a document/template exercise. Formal approval is not a prerequisite for analysis. If the problem/opportunity or Product scope itself is the material unknown, return only that decision to Product Discovery/Definition. Do not load this full surface for a direct settled branch request such as expressing one authoritative rule as a decision table or drafting one already-defined Acceptance Criterion.

The job is to **discover, stabilize, and make requirement meaning mutually usable before choosing canonical representations**. A clean sentence is not enough when material interpretations still diverge.

## Contents

1. BA analysis frame
2. Uncertainty frontier and discriminating probes
3. Requirement hierarchy
4. Cross-cutting requirement truth
5. Shared understanding and representation selection
6. Conflict diagnosis and proportional resolution
7. Completeness attack
8. Verification, validation, and re-entry
9. Document projection
10. Lightweight direct-child cases

## 1. Start from a BA analysis frame, not a document list

Use these concepts as a thinking frame, not mandatory headings:

```text
CHANGE      what must become different from current reality?
NEED        what problem/opportunity makes that change necessary?
VALUE       what benefit/risk reduction matters, to whom, and why?
STAKEHOLDER who is affected, acts, decides, pays, supports, governs, or bears risk?
CONTEXT     under what business, temporal, regulatory, channel, market, or operational conditions?
SOLUTION    what existing/proposed capability may satisfy the need, without assuming the proposal is already correct?
```

For each material uncertainty, bind the strongest available requirement source before asking a person:

- authorized Product/domain decisions;
- affected stakeholders and accountable decision owners;
- current product/runtime/process behavior when the change modifies an existing capability;
- policy, contract, regulation, standard, business procedure, or authoritative data definition;
- support/research/operational evidence when it changes the need or stakeholder interpretation;
- existing requirement/design artifacts only at their actual authority and revision.

A source is not automatically an authority. Preserve who/what supplied a statement, its scope/effective time, and whether it is observed, authorized, proposed, or conflicting.

## 2. Work an uncertainty frontier; choose the highest-leverage probe

Do not interview from a fixed questionnaire. Maintain only the material uncertainties that can change scope, behavior, obligation, acceptance, quality, transition, authority, or downstream interpretation.

For each candidate uncertainty reason with this compact packet; do not force it into the output unless useful:

```text
SEMANTIC OPTIONS   what plausible meanings/outcomes remain?
CONSEQUENCE        what material decision changes between them?
SOURCE             who/what can actually discriminate the options?
PROBE              inspect, ask, observe, workshop, model, calculate, or prototype?
RESULT BAR         how much certainty/completeness/agreement is needed for the next decision?
RE-ENTRY           what semantic owner/decision reopens if the result falsifies current meaning?
```

Prefer the probe with the highest expected decision value: it should eliminate or materially narrow competing meanings that contaminate the most downstream semantics, at proportionate cost/risk. Inspect existing evidence before asking. Stop eliciting when another answer cannot change the current decision or required confidence.

Contrastive example:

```text
"inactive users cannot submit expenses"

inactive = employment status?
inactive = login inactivity?
```

Resolving `inactive` first has higher leverage than asking about error copy, AC wording, or screen behavior because the concept changes rule applicability across every downstream view.

A generic question such as "tell me the whole refund process" is weaker than a discriminating probe such as "does refund eligibility apply to any paid invoice or only invoices still unsettled/inside the authorized window?" when that distinction changes the rule.

## 3. Derive the minimum requirement hierarchy

Use the hierarchy to relate meanings; do not manufacture every level as an artifact.

```text
BUSINESS REQUIREMENT
  why the change exists: business goal/objective/outcome
        |
        v
STAKEHOLDER REQUIREMENT
  what a stakeholder needs to satisfy the business requirement
        |
        v
SOLUTION REQUIREMENT
  what capability/quality the solution must provide
        |---------------------------|
        v                           v
FUNCTIONAL                    QUALITY / NFR
behavior + information        observable quality/conformance

TRANSITION REQUIREMENT
  temporary capability/condition needed to move current -> future
```

Use these distinctions:

| Requirement class | Decision it answers | Common failure |
|---|---|---|
| Business | Why is this change worth making / what outcome must change? | rewriting a feature deliverable as the business requirement |
| Stakeholder | What does this stakeholder need from the change? | treating every stakeholder request as authorized solution scope |
| Functional solution | What behavior/information capability must the solution provide? | prescribing UI/API/database mechanics |
| Quality solution | Under what observable quality/conformance condition must the capability hold? | calling any technology/process preference an NFR |
| Transition | What temporary capability/condition is needed only to reach the future state? | hiding migration/training/conversion/business-continuity needs inside permanent FRs |

A material requirement may be directly known at one level without explicit records at every ancestor. Preserve the strongest real upstream link instead of fabricating hierarchy IDs.

## 4. Carry cross-cutting requirement truth

For each semantic claim, carry only dimensions that can change interpretation or lifecycle:

```text
source / authority
rationale / value link
scope / applicability / effective time
assumption / dependency
conflict / precedence
priority / risk when authorized and material
current-vs-target relation
shared-understanding evidence when consumers can diverge
validation status / unresolved falsifier
traceability only when lineage/change impact is materially needed
```

Do not duplicate Product priority or risk acceptance inside BA. Link it. Do not convert traceability into an empty matrix merely because requirements exist.

## 5. Prove shared understanding with the representation that fits the uncertainty

Do not classify people as understanding or not understanding from confidence, seniority, terminology use, acknowledgement, or restatement. Classify the **evidence**:

```text
SHARED_PROVEN
  relevant stakeholder/consumer can correctly predict, apply, classify, or walk through the material behavior

SHARED_UNPROVEN
  no mismatch is known, but agreement is based only on acknowledgement, terminology, or restatement

DIVERGENT_MODEL
  a concrete prediction/application exposes materially different interpretations
```

Respond proportionally:

- `SHARED_PROVEN` -> compress communication and probe only remaining decision-changing uncertainty;
- `SHARED_UNPROVEN` -> choose the smallest concrete representation/example that can prove or falsify alignment;
- `DIVERGENT_MODEL` -> stop repeating the same abstraction, expose competing interpretations, and re-enter the earliest semantic uncertainty that caused the mismatch.

Select representation by **uncertainty shape and required fidelity**, not habit:

| Uncertainty shape | Prefer | Evidence sought |
|---|---|---|
| overloaded concept / relationship / context boundary | domain/context model or concrete examples | same classification/boundaries |
| rule / precedence / eligibility / calculation | decision table or worked example | same result under material cases |
| lifecycle / interruption / legal transition | state/transition model | same prediction of valid/invalid next states |
| actor goal + alternate/error paths | scenario or Use Case | same walkthrough of trigger, branch, result |
| process / handoff / responsibility | process/flow representation | same ownership/handoff expectation |
| visible information/actions are the ambiguity | low-fidelity elicitation sketch/mockup | same visible state and allowed-action model |
| realistic timing/interaction is the uncertainty | executable `prototype` | observed interaction discriminates the assumption |
| settled, simple authorized claim | concise prose/direct child view | no extra representation needed |

A BA-created sketch/mockup may be a **temporary elicitation representation**. It externalizes a behavioral hypothesis so stakeholders can predict/react and expose missing semantics. Preserve the discovered requirement meaning (roles, state, visibility, allowed action, branch, content obligation) and preference evidence when material.

Do **not** promote that sketch into approved wireframe, layout, hierarchy, interaction pattern, or visual Design truth. Route consequential Design choices to the Design owner. Likewise, do not delegate every comprehension problem to Design: when requirement meaning is still unresolved, BA owns selecting a representation that can discriminate it. Use `prototype` only when realistic timing/interaction must be experienced to answer the question.

Contrastive examples:

- Discount before-vs-after-tax ambiguity -> worked calculation/decision table, not a screen mockup.
- Stakeholder says subscription pause is understood -> give a material month-end scenario and ask them to predict invoice/resume behavior; a differing prediction is `DIVERGENT_MODEL`, not agreement.

## 6. Diagnose conflict before choosing resolution behavior

Do not label every disagreement a requirements conflict. First classify what the evidence actually shows:

```text
terminology / context / object / jurisdiction / effective-time mismatch
-> clarify applicability/meaning

evidence disagreement about current reality
-> obtain stronger discriminating evidence

one source supersedes or has governing authority
-> resolve authority/applicability without negotiation theater

two legitimate needs cannot coexist in the same applicable scope
-> genuine requirements conflict; negotiate/decide proportionally

equivalent semantic outcome but interpersonal/organizational opposition
-> relationship/governance issue; keep requirement truth separate
```

For a genuine conflict preserve:

```text
competing claims
+ source / authority
+ stakeholder need / value / risk / obligation
+ applicability / effective time
+ consequence of each option
+ decision rights
```

Choose resolution behavior from the conflict, not from a preferred social technique:

- evidence/knowledge conflict -> seek discriminating evidence;
- interest/trade-off conflict -> explore agreement, scoped variant, or explicit compromise when authorized;
- value/policy conflict -> evidence may clarify consequences but cannot erase normative choice; obtain authorized decision/variant;
- structural/decision-rights conflict -> resolve governance/authority;
- relationship conflict -> facilitate/escalate without inventing semantic differences.

Never average incompatible requirements or manufacture a compromise to make the package look complete.

## 7. Attack completeness with plausible in-scope counterexamples

Document completeness is not requirement completeness. Before closure, ask:

> If every written requirement were implemented exactly as written, is there a plausible **in-scope** situation where the authorized stakeholder need/value still fails?

Vary only dimensions that can materially change the outcome, such as:

```text
actor / role
context / segment / jurisdiction
state / lifecycle / interruption
alternate / error / partial effect / recovery
rule / exception / precedence
negative guarantee
information / dependency
quality / scale / criticality
current -> future transition
```

If all written requirements can pass while the need/value fails, open the smallest missing semantic question and route it to the correct owner. Do not add requirements for hypothetical out-of-scope cases.

Example: bulk import is fully described for valid rows, but row 1,337 is invalid after earlier rows appear accepted. The BA question is the business-visible partial-result/recovery/next-action semantics; database transaction design remains Engineering-owned.

Keep two proofs distinct:

```text
COMPREHENSION PROOF
Do relevant consumers form the same material mental model?

COMPLETENESS PROOF
Can that shared model satisfy every written requirement while the authorized need/value still fails?
```

A mockup can prove shared understanding and still represent an incomplete requirement set. A semantically complete requirement set can still fail delivery when consumers understood it differently.

## 8. Verify, validate, and re-enter when evidence falsifies meaning

Apply both checks proportionally:

- **Verify the representation:** coherent, sufficiently precise for its intended consumer, consistent with linked authority, and falsifiable/acceptance-ready where material.
- **Validate the requirement:** satisfying it still addresses the underlying need, stakeholder outcome, and authorized Product value in the stated context.

Re-enter at the **earliest invalidated semantic/authority decision** when any discriminating probe, shared-understanding check, conflict resolution, completeness counterexample, Design/prototype observation, implementation/test/runtime evidence, or source revision falsifies earlier meaning. Do not patch only downstream wording.

A requirements conclusion is sufficiently resolved for the current decision only when:

- source/authority is adequate for the claim;
- material competing meanings have been discriminated or remain explicitly unresolved;
- genuine conflicts have an authorized disposition or explicit owner;
- shared understanding is proven where divergent interpretation would change action/decision;
- no material in-scope completeness counterexample remains hidden;
- representation is usable and requirement meaning still validates against need/value.

## 9. Treat documents as projections over canonical truth

Treat **requirement type**, **semantic representation**, and **document/container view** as different things.

A requested `PRD`, `BRD`, `SRS`, requirements document, or project-native package is normally an **audience/document projection over canonical Product/BA/technical truth**, unless project authority explicitly defines that document as canonical owner of a semantic claim.

When such a document is requested:

1. resolve the real project convention, audience, and authority;
2. compose only canonical semantics needed by that view;
3. reference exact sources/revisions rather than copying truth into a second owner when links are possible;
4. expose unresolved/conflicting semantics instead of filling sections with invention;
5. omit irrelevant sections when permitted, or mark them `N/A`/unresolved according to the real convention;
6. never treat document completion as proof that requirement meaning, shared understanding, or completeness is sufficient.

Do not create a Plugin-wide PRD/BRD/SRS format merely because the user names one.

## 10. Keep simple cases simple

Do not force this full reasoning surface when semantics are already authoritative and the user needs one bounded representation. Direct child invocation remains valid.

Examples:

- settled calculation policy -> load the **Business Rule branch** directly;
- fully defined stateless behavior needing acceptance boundaries -> load the **Acceptance Criteria branch** directly;
- authorized measurable latency obligation -> load the **Quality Requirement branch** directly.

The BA core earns its cost only when it must discover, relate, reconcile, communicate, or falsify material requirement meaning. Stop when additional analysis or representation cannot change the current decision or required evidence state.
