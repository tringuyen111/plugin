# Domain Semantic / Context Decision Record Projection

Use this projection only when an authorized domain owner has already accepted a **semantic/context decision** and durable rationale is valuable. Resolve the project decision-record store, naming convention, identifier policy, and write authority from current project truth before persisting anything.

A project may store these decisions in a domain-model repository, wiki, tracker, decision database, or an ADR-named directory. An ADR label is a storage convention only when that project explicitly permits non-architecture semantic/context decisions there; it never gives Domain Modeling authority to choose software architecture, technology, integration patterns, interfaces, construction techniques, code/data seams, or implementation mechanisms.

## Admission boundary

All of the following must hold before Domain Modeling captures a durable semantic/context decision record:

1. **Accepted semantic/context decision** — the relevant domain authority has already resolved the meaning, relationship, invariant, lifecycle/context boundary, or translation decision.
2. **Hard to reverse** — changing that accepted semantic decision later has meaningful downstream cost.
3. **Surprising without context** — a future reader could reasonably ask why this semantic choice exists.
4. **Real trade-off** — material semantic alternatives existed and the authorized owner selected one for specific reasons.
5. **Authorized durable store** — current project truth permits this class of domain decision in the selected store.

If authority is unresolved, keep the proposal inline as `PARTIAL`; do not create an accepted decision record. If the actual decision is architectural, technical, Product, or Business Rule policy, return that decision to the accountable owner and only link the resulting canonical decision back into the domain model when useful.

## Minimum semantic record

Preserve these fields in whatever authorized store the project uses:

```md
# {Short title of the semantic/context decision}

{Context: what domain ambiguity, contradiction, or downstream risk made a decision necessary.}

{Decision: the accepted semantic/context choice and the domain authority that accepted it.}

{Rationale: why this semantic option was selected over the material alternatives.}

{Affected semantic scope: concepts, relationships, invariants, lifecycle/context meanings, translations, and known downstream consumers affected by the decision.}
```

The record may remain one concise paragraph when those semantics are still clear. Its value is preserving **what semantic meaning was accepted, why, by whom, and where it applies**—not filling a template.

## Optional fields

Include only when they add decision value:

- **Status** — accepted, deprecated, or superseded, using the project's vocabulary. Unresolved proposals stay inline as `PARTIAL`; they are not durable accepted records.
- **Decision owner and date** — when authority or sequence matters.
- **Considered semantic alternatives** — when rejected meanings/context boundaries are likely to recur.
- **Examples/counterexamples** — when they explain why one concept boundary or relationship meaning survived pressure.
- **Context translation consequences** — when another coherent model uses different meaning and consumers must translate.
- **Affected artifacts and evidence** — when traceability or change impact depends on them.
- **Supersession link** — when a later semantic decision replaces this one.

## Decision-type guardrail

| Decision actually being made | Domain Modeling action |
|---|---|
| concept identity, vocabulary, role/relationship meaning, invariant authority already established, lifecycle identity, semantic context boundary, or context translation | may capture the accepted semantic/context rationale when the admission boundary above is satisfied |
| eligibility, permission, threshold, calculation, precedence, obligation, exception, or other normative policy | return the directive to the `requirements-engineering` Business Rule branch or Product/domain policy authority; do not record it as a Domain Modeling decision |
| architecture shape, service/module/data ownership, API/interface design, event vs request/response integration, database choice, framework/library/tool, deployment/construction technique, or implementation mechanism | return the semantic constraints to the Architecture/Engineering owner; do not author or approve an architectural ADR here |
| unresolved proposal, stakeholder preference, or inferred meaning without required authority | keep it proposed/`PARTIAL`; do not create an accepted durable decision record |

## Identifier and location policy

- Reuse the project's existing identifier and location convention when one exists.
- Do not invent sequential numbering merely because the selected store is named `adr` or uses numbered records.
- Do not create a directory, wiki page, tracker item, or other persistent artifact without authority.
- If no durable store is available, return an inline decision-record draft and report persistence as `NOT_RUN` or `BLOCKED` rather than pretending it was recorded.

## Contrastive examples

**Domain-semantic decision:** Billing uses `Account` for a financial ledger while Authentication uses `Account` for a login identity. The domain owners accept two context-qualified concepts plus an explicit translation boundary after rejecting forced global unification. If this trade-off is consequential and the project permits domain decisions in its decision log, Domain Modeling may capture that rationale.

**Architecture near-miss:** The same contexts need to exchange customer status. Choosing Kafka, REST, shared storage, or a service ownership boundary is not Domain Modeling. Preserve the semantic facts that must cross the boundary, then return the technical decision to the Architecture owner.

**Policy near-miss:** Deciding that Gold customers receive a 15% refund is a normative Business Rule/Product decision, not a semantic/context decision, even if the project stores all decisions in one folder.
