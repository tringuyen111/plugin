---
name: domain-modeling
description: Build, challenge, and optionally persist a project's domain semantic model when shared business meaning is ambiguous, conflicting, or changing. Use it to clarify Domain Identity versus identifiers, concept vocabulary, meaningful relationships and roles, domain-significant invariants, lifecycle/time semantics, and context-specific meanings. Do not use it to approve business policy, choose code/database/module seams, select architecture, or turn implementation artifacts into domain authority.
---

# Domain Modeling


Use this Skill when the **domain model itself must change or be clarified**. Reading an existing glossary, renaming a code symbol, designing a database schema, or documenting an already-settled business rule is not enough.

The accountable outcome is a coherent, context-valid semantic model that downstream Product, BA, Design, Architecture, Planning, QA, and Engineering work can interpret consistently. The model may be lightweight and conversational or durably captured when the project has an authorized store.

Domain Modeling owns **semantic coherence**. It does not own Product intent, Business Rule approval, Use Case behavior, architecture selection, code/data seams, UI structure, or implementation.

## Glossary — use these terms literally

- **Domain Concept** — a coherent business/domain meaning inside one Semantic Context. A label, class, table, endpoint, field, UI control, or identifier is not automatically a Domain Concept.
- **Domain Identity** — the semantic continuity that makes observations refer to the same domain instance through time/change. Domain Identity is not a UUID, primary key, username, customer number, provider ID, or other Identifier merely because that value is unique in one system.
- **Identifier** — a scoped value or reference used to name, locate, correlate, or re-identify a Domain Identity under an approved convention. An Identifier can change while Domain Identity remains, and the same Identifier value can later denote a different Domain Identity when lifetime/scope semantics permit reuse.
- **Role** — context/relationship-specific participation of a Domain Concept. A Role does not automatically create a new Domain Concept, subtype, or Domain Identity.
- **Semantic Context** — the scope in which a set of meanings, relationships, roles, and invariants is coherent for a business purpose. A Semantic Context is not automatically a service, module, repository, team, deployment unit, or datastore boundary.

Use these distinctions only where they change the model. Do not inflate ordinary nouns into glossary terms or force tactical DDD categories that the modeling decision does not need.

## Universal reasoning kernel

Use the smallest depth that can change the semantic decision:

`purpose/context -> evidence -> concept identity -> relationships/roles -> invariants -> lifecycle/time -> examples/counterexamples -> context boundary -> contradiction pressure -> accepted model or unresolved authority -> optional capture`

For a simple term clarification, stop after the first dimensions that settle meaning. **WHEN** Domain Identity/Identifier semantics, non-trivial relationships, invariants, lifecycle/time, multiple Semantic Contexts, or contradictory evidence can change downstream interpretation, **READ** [Domain Model Method Contract](DOMAIN-MODEL-METHOD-CONTRACT.md) **BECAUSE** the model needs more than a label definition; **RETURN** the smallest decision-material semantic packet: Domain Concepts plus Domain Identity/Identifier relations, relationships/Roles, authority-qualified invariants, lifecycle/time distinctions, Semantic Context boundaries/translations, counterexamples, and exact unresolved authority gaps.

### 1. Establish modeling purpose and Semantic Context

State what downstream misunderstanding or decision the model must resolve. Identify the relevant **Semantic Context** before attempting a project-wide vocabulary. A Semantic Context is established by coherent meaning/relationships/invariants for the business purpose, not by current repository, service, team, module, deployment, or datastore topology.

Use source authority proportionally:

- accepted domain/product/BA artifacts and domain-owner decisions are semantic authority when they actually own the meaning;
- runtime/code/database/UI artifacts are evidence about current implementation, not automatic authority for target domain meaning;
- examples from stakeholders are evidence whose scope and context must be tested;
- proposals remain proposals until the appropriate owner accepts them.

Do not invent a global domain boundary from repository folders, service names, tables, APIs, or team structure.

### 2. Identify concepts by meaning, not labels

For each decision-material term, ask what **Domain Concept** it denotes **in this Semantic Context**. When instance continuity matters, separate two questions before choosing names or keys:

1. **Domain Identity:** what semantic continuity makes two observations the same domain instance through state, time, migration, or representation change?
2. **Identifier:** which scoped value/reference is used to refer to or correlate that identity, under what authority/lifetime/reuse rules?

Identifier equality does not prove Domain Identity, and Identifier replacement does not prove a new Domain Identity. Use rights/obligations, lifecycle continuity, business meaning, authoritative mappings, and counterexamples to establish identity; then bind Identifiers as representations of that decision.

Distinguish:

- one concept with multiple names or aliases;
- one overloaded term denoting different concepts;
- a **Role** a Domain Concept can play versus a distinct Domain Concept;
- a state/lifecycle phase versus a new concept;
- a business concept versus an implementation artifact, UI control, message shape, table, class, or endpoint.

A canonical term is useful only after the concept meaning is coherent. Do not create two concepts merely because labels differ, and do not merge concepts merely because labels match.

### 3. Model meaningful relationships and roles

Capture relationships as business/domain statements with meaningful roles, not generic arrows such as `has`, `contains`, or `belongs to` when those words hide the distinction that matters.

For a material relationship, establish only what evidence supports:

- what each participant means in the relationship;
- role names when the same concept can participate differently;
- direction or symmetry when semantically relevant;
- optionality/cardinality only when authoritative evidence makes it material;
- qualifiers, time bounds, or state dependence when they change whether the relationship exists or what it means.

Never invent multiplicity, ownership, aggregation, composition, or lifecycle constraints for diagram neatness.

### 4. Separate semantic invariants from unowned policy

An invariant is domain-significant only when violating it would make the modeled state/relationship semantically invalid **and** the claim has suitable authority.

When a proposed invariant is actually a permission, eligibility rule, threshold, calculation, precedence, policy, or other normative directive, preserve the semantic consequence but return the directive to the `requirements-engineering` Business Rule branch or the appropriate authority. Domain Modeling cannot make an unapproved rule true by placing it in a model.

Do not convert technical constraints, database constraints, validation code, or current UI restrictions into target domain invariants without domain authority.

### 5. Model lifecycle and time when identity depends on them

When meaning changes over time, determine whether **Domain Identity** is preserved and whether the case is:

- the same concept in a different state;
- a role becoming active/inactive;
- a relationship becoming effective/expired;
- a historical version of the same concept;
- or a genuinely new concept linked to the prior one.

Use Domain Identity continuity, rights/obligations, business meaning, authoritative Identifier mappings when relevant, and examples/counterexamples to discriminate these possibilities. Do not let a changed key create a new instance by itself, and do not let a reused key merge distinct lifecycle histories by itself. Do not infer persistence schemas, event-sourcing strategies, temporal tables, state-machine implementation, or transaction design.

### 6. Pressure-test with examples and counterexamples

A definition that survives only happy-path examples is not settled.

Use concrete positive examples, boundary examples, and counterexamples to test:

- what belongs inside/outside a concept;
- whether two terms are synonyms or distinct roles/types;
- whether a relationship statement is too broad or too narrow;
- whether an invariant is actually universal;
- whether a lifecycle/state distinction preserves identity;
- whether a meaning holds only in one context.

When a counterexample falsifies the current model, **change the model**: narrow, split, merge, rename, qualify, or retract the affected claim. Do not preserve a false definition by labeling the contradiction an exception.

### 7. Preserve Semantic Context integrity

Different **Semantic Contexts** may legitimately use the same word differently or different words for related Domain Concepts. A single Semantic Context may span several technical units, and one technical unit may contain several Semantic Contexts; neither direction establishes an architecture boundary.

When both models are internally coherent:

- keep the meaning qualified by context;
- state the relationship or translation needed at the boundary;
- identify shared identifiers/value concepts only when real;
- expose semantic mismatch that downstream consumers must translate.

Do not force global vocabulary unification and do not infer software service/module boundaries from Semantic Context boundaries. Architecture owns technical decomposition.

### 8. Resolve contradictions and re-enter at the earliest falsified decision

When evidence conflicts, do not patch the glossary sentence downstream.

Re-enter where the model first became invalid:

- wrong Semantic Context -> re-establish the meaning-validity scope;
- ambiguous/overloaded label -> re-test concept identity;
- counterexample breaks membership -> narrow/split/merge the concept;
- relationship role is wrong -> revise the relationship before derived invariants;
- invariant lacks authority -> preserve the authority gap; if the same session can obtain the rule/domain decision, consume it and re-enter here without a handoff artifact;
- lifecycle/Identifier example breaks Domain Identity -> revisit same-instance versus new-concept choice;
- code differs from accepted model -> determine whether code is stale or the accepted semantic truth must be reopened.

Preserve unresolved authority conflicts explicitly. Do not select a side because one artifact is easier to edit.

## Choose the smallest useful representation

Do not force UML, ERD, class diagrams, DDD tactical patterns, or a particular notation.

Use only what improves the current semantic decision:

- concise definitions/aliases for isolated terminology;
- a concept-and-relationship table or small diagram for structural ambiguity;
- lifecycle/state notes when identity or validity changes over time;
- a context map when distinct coherent Semantic Contexts must coexist and interact;
- examples/counterexamples when boundaries are disputed.

The representation is a reasoning aid, not the source of authority.

## Resolve canonical artifact locations only when persistence is material

Inspect current project conventions and the exact approved canonical destination before assuming a path. A project may use a root glossary, bounded-context glossaries, a knowledge platform, tracker documents, a model repository, or another approved store. Do not require a Project Capability Profile when the canonical store and write authority are already known.

- If an authorized glossary/domain-model location exists, update that canonical artifact only after the semantic claim is resolved.
- If no durable location exists but the user authorizes creating one, choose the smallest project-consistent location and record the convention.
- If write authority or canonical location is unresolved, return the proposed model inline as `PARTIAL`; do not create repository files by assumption.
- Use [CONTEXT-FORMAT.md](CONTEXT-FORMAT.md) only when a durable glossary/context projection is actually warranted. The project may use another representation with equivalent semantics.

A durable glossary/domain model must remain free of implementation design. It is not a class catalog, database schema, API schema, architecture approval surface, scratchpad, or Business Rule repository.

### Capture semantic decision rationale without taking Architecture authority

Domain Modeling may **capture** an already accepted semantic/context decision when durable rationale is valuable. A decision-record store is only a persistence convention; calling that store an ADR does **not** grant this Skill authority to make architecture, technology, Product, or Business Rule decisions.

Use this branch only after the semantic claim itself is resolved:

| Situation | Durable action | Boundary |
|---|---|---|
| resolved meaning/relationship with no consequential rationale to preserve | update the authorized glossary/context model only when persistence is requested | do not create a decision record for routine cleanup |
| accepted semantic/context trade-off that is hard to reverse, surprising without context, and selected from material alternatives | capture a semantic/context decision record when the project has an authorized decision-record convention for this kind of decision | preserve domain authority, rationale, alternatives, affected semantic scope, and source truth |
| semantic proposal or authority remains unresolved | return the proposal inline as `PARTIAL`; no accepted durable decision record | do not make persistence imply acceptance |
| architecture/technology/integration/construction choice is the decision | return the exact semantic constraints/context to the active job; keep the decision with Architecture authority and continue there in-session when available | do not author or approve the architectural ADR inside Domain Modeling |

Read the [semantic/context decision-record projection](ADR-FORMAT.md) only for the second row. An ADR-named project store is compatible only when current project convention explicitly permits domain semantic/context decisions there.

**Contrast:** preserving why Billing `Account` and Authentication `Account` remain distinct context-qualified concepts can be a Domain Modeling decision record after domain authority accepts that semantic trade-off. Choosing event-driven messaging, REST, database ownership, or a service boundary between those contexts is an Architecture decision. Keep that decision with Architecture authority; continue there in-session when available, and use a real handoff only when transferable continuation state must cross an owner/agent/session/runtime boundary or project policy requires one.

## Completion

`READY` requires the decision-material concepts/relationships/invariants/context semantics to be coherent enough for the stated modeling purpose, source/authority truth to be explicit, material contradictions to be resolved or deliberately returned to the correct owner, and every authorized persistence write to be reopened and verified.

Use:

- `PARTIAL` when the model improved but material semantic or authority questions remain, or durable capture was requested but location/authority is unresolved;
- `BLOCKED` when a required semantic/domain owner or source cannot be obtained;
- `FAILED` when an attempted write or required validation fails.

A useful inline semantic model can be `READY` when persistence was not requested. A conversation-only proposal must never be reported as a durable update.
