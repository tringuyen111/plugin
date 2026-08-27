# Frozen Behavioral Qualification Cases — Domain Identity / Semantic Context

Evidence-State: `NOT_RUN`

Baseline: SDLC Intelligence v1.0.60, HEAD `96d21f2c2c7ff746dd6cb698611d6867681a3d27`.

These cases are frozen before the candidate Domain Modeling Skill edit. They test whether the model separates semantic continuity from identifiers and meaning-validity contexts from technical decomposition. No case is behavioral evidence until executed by a real model/runtime against frozen baseline and candidate bytes.

## Rubric dimensions

- `DOMAIN_IDENTITY`: identifies what semantic continuity makes observations the same domain instance rather than equating identity with a key/string.
- `IDENTIFIER_ROLE`: treats identifiers as scoped references/re-identification evidence whose authority, uniqueness, lifetime and reuse semantics must be established.
- `ROLE_STATE_CATEGORY`: avoids turning roles/states/classifications into new concepts merely because labels differ.
- `SEMANTIC_CONTEXT`: identifies the scope in which meanings/relationships/invariants are coherent.
- `TECHNICAL_BOUNDARY_PROJECTION`: rejects automatic projection from Semantic Context to service/team/repository/module/datastore boundaries and vice versa.
- `COUNTEREXAMPLE_CORRECTION`: changes the model at the earliest falsified semantic decision instead of preserving a false definition with exceptions.

## Case DMIC1 — identifier changes, Domain Identity remains

A customer is migrated from a legacy CRM to a new platform. The old system uses customer number `C-0042`; the new platform issues UUID `9f...`. Domain-owner evidence says rights, obligations, contractual history and lifecycle continuity all remain with the same customer instance, and the migration mapping is authoritative.

Strong behavior must:
- preserve one Domain Identity when the stated semantic continuity establishes it;
- treat the legacy number and new UUID as different Identifiers for that identity under their respective scopes;
- avoid creating a new domain concept/instance merely because the primary technical key changed;
- keep persistence/schema migration mechanics outside Domain Modeling ownership.

## Case DMIC2 — identifier reused, Domain Identity changes

A username `tri` belonged to an account that was permanently closed. Policy/domain-owner evidence says a later signup may reuse the same username but creates a new account with no rights, obligations, history or lifecycle continuity from the prior account.

Strong behavior must:
- allow the same Identifier value to refer to different Domain Identities across approved lifetimes/scopes;
- reject string/key equality as sufficient proof of identity continuity;
- preserve the historical distinction even if an implementation table could reuse the same unique value;
- avoid inventing retention or database rules beyond the provided semantic evidence.

## Case DMIC3 — one Semantic Context spans several services

Billing uses one coherent meaning of `Account`, with one set of relationships/invariants, but the implementation is split across an account service, invoicing service and reporting service for technical reasons.

Strong behavior must:
- keep one Semantic Context when semantic evidence is coherent across the implementation units;
- refuse to create three domain contexts merely because three services exist;
- return technical decomposition questions to Architecture/Engineering;
- model only material translations if evidence shows a real semantic boundary.

## Case DMIC4 — one service contains several Semantic Contexts

A legacy monolith contains Authentication and Billing logic. Both use the word `Account`, but Authentication means login/security principal while Billing means party responsible for charges; their relationships/invariants differ and translation is required at their boundary.

Strong behavior must:
- permit two Semantic Contexts despite one deployment/service boundary;
- keep each meaning context-qualified rather than globally merging `Account`;
- capture only the material translation/equivalence facts supported by evidence;
- avoid demanding a microservice split as part of Domain Modeling.

## Case DMIC5 — role is not automatically a new identity

The same Person can be an `Occupant` for one Lease and a `Manager` for one Property during overlapping periods. No evidence says either role replaces the Person or creates a new person identity.

Strong behavior must:
- model Occupant/Manager as contextual roles when evidence supports that interpretation;
- preserve the underlying Person Domain Identity across role activation/deactivation;
- avoid global subtype/new-entity inflation based only on role labels;
- revise the model if counterexamples later establish independently meaningful concepts.

## Case DMIC6 — Architecture near-miss does not manufacture a handoff

Domain semantics are now clear enough to expose the exact cross-context information that a technical integration decision must preserve. The same agent/session can continue immediately into the appropriate Architecture/Engineering capability; no receiver-specific execution state needs durable transfer.

Strong behavior must:
- return the exact semantic constraints/context to the active job and continue in-session when the required technical capability is available;
- preserve Architecture/Engineering authority over the technical decision;
- not create or require a `handoff` artifact merely because capability ownership changes;
- use a real handoff only when another owner/agent/session/runtime actually needs transferred continuation state or project policy requires it.
