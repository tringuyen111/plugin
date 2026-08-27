# Frozen Behavioral Qualification Cases — codebase-design semantic projection consistency

Evidence-State: `NOT_RUN`

These cases are frozen before the candidate Codebase Design edit. They test whether architecture projection preserves upstream semantic distinctions rather than manufacturing new business/domain/security truth. Runtime execution remains `NOT_RUN` until an actual Skill-enabled model runner executes them.

## Rubric dimensions

- `OPERATION_ATTEMPT_DISCRIMINATION`: distinguishes a Logical Operation from one or more Request Attempts and does not derive business equivalence from transport sameness alone.
- `EFFECT_PROGRESS_DISCRIMINATION`: keeps Effect Evidence State (`ESTABLISHED | NOT_ESTABLISHED | UNKNOWN`) separate from known Partial Progress.
- `REPLAY_IDEMPOTENCY_BOUNDARY`: keeps Replay Freshness/security admission separate from Business Idempotency and operation-equivalence semantics.
- `SEMANTIC_CONTEXT_PROJECTION`: treats Semantic Context as meaning-validity truth, not automatic service/module/team/datastore decomposition.
- `BOUNDED_REFERENCE_RETURN`: conditional depth returns only the technical-design decision/evidence needed by Codebase Design.

## Case CDP1 — lost response does not equal partial progress

A caller sends a command, the connection drops, and current evidence cannot establish whether the durable mutation or remote effect happened.

Strong behavior must classify effect evidence as `UNKNOWN`, not call the situation known Partial Progress merely because the response was lost. Recovery/reconciliation must follow the unknown-effect contract.

## Case CDP2 — known residue is not ambiguity

A local durable commit is established and a following remote publication is established as failed.

Strong behavior must represent known Partial Progress and its recovery ownership. It must not collapse this into an `UNKNOWN` outcome.

## Case CDP3 — retry request is not automatically the same Logical Operation

Two requests carry equal payloads but current Product/API semantics do not establish whether they represent one intended operation or two legitimate repetitions.

Strong behavior must not infer one Logical Operation from payload equality or invent an idempotency key that silently decides business equivalence. It must keep the design partial until operation-equivalence truth is supplied or explicitly scoped.

## Case CDP4 — replay defense is not business idempotency

A signed webhook has valid authenticity, timestamp, nonce, and replay-window checks. The same provider event may still map to business processing whose operation-equivalence/idempotency semantics live elsewhere.

Strong behavior must allow Security design to enforce Replay Freshness while keeping Business Idempotency/duplicate business-effect semantics with the operation/domain owner. A nonce/replay cache is not proof that the business effect is exactly-once.

## Case CDP5 — one Semantic Context may span several services

Domain truth establishes one coherent Semantic Context, while current architecture has two independently deployed services for operational reasons.

Strong behavior must not merge the services solely because the semantic context is one. Technical seam choice still depends on caller knowledge, failure/deployment/trust/lifecycle boundaries and current evidence.

## Case CDP6 — one service may contain several Semantic Contexts

A monolith currently implements two meanings for the same business term under different Domain Semantic Contexts.

Strong behavior must preserve the context-specific meanings without asserting that the monolith must split into two services merely from the semantic distinction.

## Case CDP7 — conditional depth returns, it does not take over

A fixed architecture decision needs only Security depth to place an enforcement seam; the security policy itself is already authoritative.

Strong behavior must load only the relevant Security design depth, return the enforcement/trust/proof decision to Codebase Design, and not expand the task into a separate Security workflow or unrelated Backend/Data references.

## Reopen / falsify the candidate

Reopen the candidate if runtime evidence shows it:
- equates transport request sameness with Logical Operation identity;
- narrates lost-response uncertainty as known Partial Progress;
- treats replay freshness controls as Business Idempotency proof;
- projects Semantic Context directly into service/module/team/datastore boundaries;
- or loads deep references without a bounded return into the parent technical-design decision.
