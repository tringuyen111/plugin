---
name: backend-engineering
description: Implement backend application or service changes when backend runtime behavior is the dominant boundary, including transactions, failure, concurrency, background work, and representative runtime proof. Use as bounded backend depth in broader implementation; not as code-review or owner of API, Product, data/security policy, QA, or release truth.
---

# Backend Engineering

Treat any already-approved backend/system design as fixed project input when it is material; do not import a sibling Skill's design file as authority. Treat caller-visible API contract work as a separate API unit when that is the primary proof boundary.

## Core terms

- **Semantic Authority** — the layer/module that defines the canonical application meaning or policy for the active operation. It is not automatically the database, strongest guard, transport boundary, or place with the most code.
- **Enforcement Site** — a layer/mechanism that makes an aspect of a canonical meaning hold, such as trusted backend validation or an atomic database constraint. Several Enforcement Sites may implement one Semantic Authority without becoming competing policy owners.

Keep repetition, attempt identity, uncertain effects, and partial-progress terminology behind the execution branch that needs it; ordinary backend work should not carry distributed-operation vocabulary by default.

## Entry gate

Establish the exact backend outcome, inspected production/runtime seam, fixed behavior/API/data/security/operations semantics that constrain the change, actual dependencies, source-write scope, and a falsifiable runtime proof target. A tracker, frontier, semantic-unit ledger, work type, or parent Implement wrapper/invocation is not required.

If a missing design, caller-visible contract, data meaning, security policy, operational policy, authority, or runtime fact can materially change correctness, stop that affected part and name the unresolved decision/fact instead of coding a convenient assumption.

## Backend execution loop

1. **Bind responsibility before invention.** For the fixed operation, inspect what the frontend/caller, API/backend seam, database, queue/runtime, caches and external providers already store, derive, enforce, repeat or own. Separate **Semantic Authority** from advisory/projection behavior and each **Enforcement Site**. Do not move presentation-only state into backend or duplicate a database/provider fact merely to create a local source of truth.
2. **Trace data, state and effects end to end.** Follow input origin and trust through validation/authorization, canonical decision, durable state, external effects, outputs and consumers. Ask whether the same approved intent can arrive again through client/server retry, redelivery, replay or concurrency and what evidence distinguishes repeated processing from genuinely new intent. **WHEN** the path crosses layers/systems, can repeat, can stop after only some effects, or makes externally visible effects, **READ** [Operation Responsibility and Effect Topology](references/operation-responsibility-effect-topology.md) **BECAUSE** responsibility and recovery must be bound before transaction/retry/reconciliation mechanics; **RETURN** the bounded operation map: Semantic Authority plus Enforcement Sites, intended-operation versus concrete-attempt identity when material, evidence for established/absent/uncertain effects and known progress at each material seam, and the owner or exact gap for the next action.
3. **Reconstruct the real execution graph.** Trace request/job/event entrypoints through the application/use-case layer, domain/service modules, persistence/adapters, queues/schedulers, external providers, transactions, retries, errors and observability. Identify which seam owns the business application decision and which pieces are adapters.
4. **Bind contracts to Semantic Authority.** Map approved behavior and technical invariants to the Semantic Authority and the Enforcement Sites needed across relevant callers. Keep controllers, repositories, caches, queue consumers and provider adapters subordinate to that canonical meaning. Multiple layers may enforce compatible aspects of one meaning; treat them as competing truth only when they independently define semantics that can drift.
5. **Apply engineering economy.** Prefer the established application seam and supported runtime/framework/dependencies. A 15-line controller shortcut is not smaller if it duplicates a canonical use case or couples transport, storage and side effects. Treat code similarity only as a reuse search signal: share higher-level behavior only when responsibility, invariant, lifecycle and failure/recovery semantics align; a small stateless primitive can be shared while policy owners remain separate.
6. **Implement the smallest coherent execution shape.** Verify only actual prerequisites that can affect correctness, then change the established backend seam. Keep one canonical path and remove superseded behavior only after parity and caller cutover.
7. **Make failure semantics executable.** For every material handoff or side effect, state what authoritative evidence proves definitely happened, definitely did not, or remains uncertain; separately state which subset of a multi-step operation is already known complete. Then bind who owns the next action. Implement transaction scope, retry/duplicate handling, concurrency/conflict behavior, cancellation/timeouts, compensation or reconciliation, and external-side-effect ordering according to approved design. Do not choose retry/compensation merely from an error label: a lost provider response after dispatch may leave the remote effect unresolved, while a committed DB update followed by a definite publish rejection is known partial completion with different evidence. Use Operation Responsibility and Effect Topology when these distinctions control recovery. Do not leave an unresolved effect or incomplete operation with no recovery owner, and do not convert failure into a logged success path.
8. **Bind the boundary lifecycle.** **WHEN** a request-serving service/process path or outbound service client makes startup/readiness, shared resource lifetime, deadline/cancellation, remaining deadline budget, request admission, in-flight concurrency, serving queue pressure, overload, retry-layer interaction, remote-result ambiguity, drain or cleanup material, **READ** [Service Runtime Discipline](references/service-runtime-discipline.md) **BECAUSE** generic framework/client assumptions cannot prove the real boundary lifecycle; **RETURN** the material lifecycle dimensions, approved semantics plus observed runtime/client facts that govern them, what current evidence establishes about remote outcomes when relevant, exact implementation/proof obligations, and unresolved owner/runtime-fact gaps. Bind the path through acquire/configure -> usable/ready -> admit/execute -> classify outcome -> release/drain/cleanup. Complete this branch only when every material dimension is implemented and proof-bound or returned as an exact unresolved gap. Use the background branch instead for delivery/attempt ownership semantics.
9. **Bind the attempt lifecycle.** **WHEN** a queue/job/scheduler or similar background path makes redelivery/replay, temporary ownership, known partial work, retry exhaustion, shutdown/drain or overload material, **READ** [Background Execution Discipline](references/background-execution-discipline.md) **BECAUSE** delivery identity and temporary runtime ownership do not define business/application intent; **RETURN** the approved-work/dispatch/concrete-processing identity map, temporary ownership facts, established progress and unresolved external effects, terminal/handback behavior, proof obligations, and exact owner/runtime-fact gaps. Complete this branch only when every material dimension is implemented and proof-bound or returned as an exact unresolved gap.
10. **Prove the mechanism.** Run targeted tests through public seams and the affected integration/runtime path. Exercise duplicate, failure, rollback/recovery, ambiguous handoff or concurrency behavior when the domain claim depends on it. A mocked provider/queue/database narrows proof; state the gap.
11. **Inspect observability/output.** Confirm errors/status/logs/traces reflect the actual operation outcome and do not become a second business truth source.
12. **Report backend evidence.** Report the changed canonical seam/callers, responsibility/enforcement split when material, commands/results, failure-path evidence, real/substituted boundaries, observability inspected, and unresolved design/runtime facts.

## Re-entry

If new source/runtime evidence invalidates a bound responsibility, invariant, execution-graph assumption, delivery/runtime fact, or proof premise, reopen the earliest affected backend decision/mechanism/proof and its material dependents. Preserve independent established truth and evidence; widen re-entry to the whole backend unit only when a shared/root contract or runtime premise changed.

## Hard boundaries

- Preserve the approved caller-visible API contract. A material contract change remains an explicit authority gap until approved; if the same session can obtain/consume that decision, continue there without a handoff artifact.
- Consume canonical data semantics and security policy from their owners; unresolved truth remains an explicit gap.
- Inspect existing database constraints/state, runtime delivery semantics and provider facts before adding a parallel application-level tracker or enforcer.
- Bind retry/transaction/concurrency proof to the real mechanism; a bypassing test narrows the claim.
- Do not infer Semantic Authority merely because the same validation/check appears in multiple layers or one Enforcement Site is stronger; distinguish advisory UX, trusted business decisions, durable/atomic guards, runtime delivery mechanics and provider-side facts.
- Introduce a generic service/framework abstraction only when observed ownership pressure justifies it.

## Completion

`READY` closes only this backend execution unit after required integration/failure proof and material owner/runtime-fact gaps are closed or returned explicitly. This does not establish independent code review, QA, UAT, release, or production-operation success.
