# Domain Persistence

Load this reference **only** when the user explicitly wants durable capture and the resolved decision may materially change domain semantics. Ordinary Decision Interview sessions do not need this context.

## Ownership rule

Decision Interview never owns generic project writes. `domain-modeling` remains the owner of semantic interpretation/admission and any authorized semantic persistence.

## Projection gate

A resolved decision may be projected to Domain Modeling when it materially changes one of:

- concept identity or vocabulary;
- relationship / role meaning;
- domain-significant invariant whose authority is already established;
- lifecycle / time semantics;
- semantic context boundary or context translation.

Then:

1. preserve the interview decision/evidence in the session register;
2. load the actual `domain-modeling` capability when available;
3. pass a bounded semantic Decision Packet;
4. let Domain Modeling decide whether the semantic model changed, whether durable capture is justified, and which project-authorized artifact/convention owns it;
5. verify any write through Domain Modeling's own contract; if unavailable/denied, keep the result inline and report `PARTIAL` for persistence.

## Never tunnel owner-specific truth through Domain Modeling

Do **not** use this branch to persist:

- architecture/technology/integration/interface/construction choices;
- service/module/data technical ownership;
- Product scope/priority/policy;
- Requirements/Business Rules that belong to Requirements Engineering;
- implementation design/code state;
- QA/UAT verdicts;
- DevOps/Operations/Release state or decisions;
- legal/security/financial acceptance owned by another protected authority.

Return those decisions to their canonical owner instead.

## Contrast

- `Billing Account` and `Authentication Account` are confirmed as distinct context-qualified concepts -> Domain Modeling may update authorized semantic truth.
- Kafka vs REST between those contexts -> stays with Architecture/Engineering; do not persist it as domain semantics.
- A release owner accepts a rollback risk -> stays with the release/DevOps authority; do not persist it through Domain Modeling.

## Context economy

Do not load this file merely because a decision was resolved. Load it only when **both** explicit durable capture is requested and a material domain-semantic effect is plausible.
