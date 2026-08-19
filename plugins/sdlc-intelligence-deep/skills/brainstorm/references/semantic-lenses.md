# Brainstorm Semantic Lenses

Load this reference when a raw idea needs deeper behavioral clarification, complexity reasoning, or a representation richer than a short conversation. It is local Brainstorm methodology; it does not require another Skill.

## Coverage state

Classify each lens from current evidence:

```text
ACTIVE        missing/partial meaning can materially change the idea or handoff
SATISFIED     current information is sufficient for this brainstorm scope
DORMANT       not currently needed, but plausible new information could activate it
NOT_MATERIAL  current evidence makes omission safe for this scope
```

Re-evaluate after each material answer, correction, observed fact, or OQ resolution. A lens is deep enough when each material uncertainty inside it is one of:

```text
OBSERVED / resolved
DECIDED within brainstorm scope
PROPOSED and awaiting judgment
UNRESOLVED / TBD / OQ
correct downstream-authority handoff
```

Do not mark a lens complete merely to shorten the interview.

## Lens 1 — Problem, value, context

Clarify only material gaps:

- what the idea lets someone accomplish;
- what problem/opportunity motivates it and who experiences it;
- why now, when timing/request/signal/process change alters the meaning.

Failure pattern: treating an attractive solution description as proof of a real user problem. Correction: keep the value/problem statement as a hypothesis unless evidence is actually available.

## Lens 2 — Users and access

Clarify actors only when they change behavior:

- affected user groups/roles;
- access/gating such as entitlement, account state, geography, verification, subscription;
- entry state when it changes the path;
- volume/usage when it changes rules, cost, or operations.

Failure pattern: inventing standard roles because similar products have them. Correction: keep unsupported actors `PROPOSED` or `UNRESOLVED`.

## Lens 3 — Core flows

For each materially distinct flow, clarify:

```text
user intent/action -> business-visible system behavior -> observable result
```

Keep distinct paths separate when merging them would hide a different condition, state, recovery, or result.

Failure pattern: a screen/button sequence that omits system behavior and result. Correction: add the behavior/result only where it changes the idea semantics.

## Lens 4 — Decisions, states, interruptions

Activate only the parts justified by complexity.

### Decision points

For a material branch capture:

```text
condition -> true path / false path -> state/result difference -> governing rule or OQ
```

Do not leave `system handles it` as a substitute for a rule.

### Governed state

When an entity has meaningful lifecycle states, capture:

- starting/current state;
- trigger and authorized actor/event;
- next state;
- reversibility when material;
- observable result;
- late/failure behavior.

### Interrupted / async / concurrent behavior

When external exchange, async work, pending state, retries, expiry, or multi-actor timing matters, check only applicable questions:

1. what state remains after close/abandon;
2. what happens after external failure/timeout;
3. old-vs-new attempt rule;
4. expiry effect and recovery;
5. concurrent actor/device conflict rule;
6. cleanup/TTL only when it changes visible/business semantics.

Unknown policy stays `PROPOSED` or `UNRESOLVED`; do not invent it.

## Lens 5 — Validation, limits, wording

Activate only when exactness changes behavior or user understanding.

Clarify as applicable:

- required input and meaningful format/min/max rules;
- quotas/retries/expiry when behavior changes at the boundary;
- business calculations/rules governing accept/reject/state change;
- exact error/success/information wording when wording itself is part of the idea.

Pressure a vague material claim once:

```text
"There is a rate limit" -> exact value/window if known or a named OQ
"Show an error" -> exact wording only when wording is material
```

Do not invent precision to fill a table.

## Lens 6 — Business-visible system context

Clarify only context that changes the idea semantics:

- business information that must be retained;
- external service and its business purpose;
- notification event/channel;
- background/scheduled behavior;
- real-time expectation.

Stay above implementation internals. Do not ask for tables/columns, queue technology, cron syntax, SDKs/endpoints, framework choice, token/session strategy, or transport unless the user explicitly moved the brainstorm into a technical idea and those choices are themselves the idea being explored.

## Lens 7 — Edge cases, risks, open questions

Cover only material edges, for example:

- connectivity/provider failure or latency;
- abandoned/pending state;
- permission change mid-flow;
- duplicate/repeated/late actions;
- concurrency;
- adoption/vendor/compliance/process/timeline/data-exposure risk.

Connect risk cause -> consequence -> possible mitigation or evidence need. A technical symptom alone is not a useful idea-level risk statement.

## Complexity triggers

Use these as semantic signals, not keyword triggers:

- external round trip affects user/business flow;
- async/background completion;
- materially different actors/access modes;
- governed state machine;
- throttling/retry/expiry rules;
- two or more material branches.

A word appearing in a quoted example/template does not activate complexity by itself.

## Representation choice

Choose the smallest faithful representation:

| Reasoning shape | Useful representation |
|---|---|
| ordered behavior | numbered steps |
| explicit branching | decision table/tree |
| actor/state combinations | scenario matrix |
| governed lifecycle | state-transition table/diagram |
| async/pending/retry/concurrency | interrupted-transaction table or typed flow |
| causal risk comparison | risk table |
| topology that prose obscures | ASCII/diagram |

Do not force a representation when prose is clearer.

## Deepening without interrogation

Question selection is value-of-information driven:

- ask when an answer can change a possibility, flow, rule, risk, or handoff;
- inspect source-answerable facts instead of asking;
- group only tightly coupled factual gaps;
- re-enter divergence when new information invalidates the initial framing or reveals a credible new alternative;
- re-enter deepening when a chosen possibility exposes a previously dormant lens;
- stop when remaining detail cannot change the intended brainstorm checkpoint.

## Counterexamples

**Bad divergence:** three alternatives that differ only in labels/colors.  
**Correction:** change a consequential behavior, boundary, actor/state model, or value assumption.

**Bad convergence:** select the first plausible option because the interview collected enough detail about it.  
**Correction:** check whether another credible possibility still survives the current constraints.

**Bad depth:** ask every quota, copy string, and edge case for a small idea.  
**Correction:** activate only material lenses and externalize truly unresolved material gaps.

**Bad authority:** treat a brainstorm-approved rule as canonical Product/Requirement truth.  
**Correction:** keep `DECIDED` scoped to Brainstorm and name the downstream authority needed when canonicalization matters.
