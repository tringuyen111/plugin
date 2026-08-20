---
name: backend-engineering
description: Implement backend application or service changes when backend runtime behavior is the dominant boundary, including transactions, failure, concurrency, background work, and representative runtime proof. Use as bounded backend depth in broader implementation; not as code-review or owner of API, Product, data/security policy, QA, or release truth.
---

# Backend Engineering

Treat any already-approved backend/system design as fixed project input when it is material; do not import a sibling Skill's design file as authority. Treat caller-visible API contract work as a separate API unit when that is the primary proof boundary.

## Entry gate

Establish the exact backend outcome, inspected production/runtime seam, fixed behavior/API/data/security/operations semantics that constrain the change, actual dependencies, source-write scope, and a falsifiable runtime proof target. A tracker, frontier, semantic-unit ledger, work type, or parent `/implement` invocation is not required.

If a missing design, caller-visible contract, data meaning, security policy, operational policy, authority, or runtime fact can materially change correctness, stop that affected part and name the unresolved decision/fact instead of coding a convenient assumption.

## Backend execution loop

1. **Bind responsibility before invention.** For the fixed operation, inspect what the frontend/caller, API/backend seam, database, queue/runtime, caches and external providers already store, derive, enforce, repeat or own. Separate the canonical semantic owner from advisory/projection behavior and durable/atomic enforcement. Do not move presentation-only state into backend or duplicate a database/provider fact merely to create a local source of truth.
2. **Trace data, state and effects end to end.** Follow input origin and trust through validation/authorization, canonical decision, durable state, external effects, outputs and consumers. Ask whether the same logical intent can arrive again through client retry, server retry, redelivery, replay or concurrency, and what identifies the same intent versus a new one. When the path crosses layers/systems, can repeat, has partial progress, or makes externally visible effects, read [Operation Responsibility and Effect Topology](references/operation-responsibility-effect-topology.md) before selecting the mechanism.
3. **Reconstruct the real execution graph.** Trace request/job/event entrypoints through the application/use-case layer, domain/service modules, persistence/adapters, queues/schedulers, external providers, transactions, retries, errors and observability. Identify which seam owns the business application decision and which pieces are adapters.
4. **Bind contracts to the canonical owner.** Map approved behavior and technical invariants to the module that can enforce them across all relevant callers. Keep controllers, repositories, caches, queue consumers and provider adapters subordinate to that canonical truth. Multiple layers may enforce compatible aspects of one meaning; treat them as competing truth only when they independently define semantics that can drift.
5. **Apply engineering economy.** Prefer the established application seam and supported runtime/framework/dependencies. A 15-line controller shortcut is not smaller if it duplicates a canonical use case or couples transport, storage and side effects. Treat code similarity only as a reuse search signal: share higher-level behavior only when responsibility, invariant, lifecycle and failure/recovery semantics align; a small stateless primitive can be shared while policy owners remain separate.
6. **Implement the smallest coherent execution shape.** Verify only actual prerequisites that can affect correctness, then change the established backend seam. Keep one canonical path and remove superseded behavior only after parity and caller cutover.
7. **Make failure semantics executable.** For every material handoff or side effect, distinguish success, definite failure and ambiguous/partial outcome. Name what is durably established, what may have happened, what remains unknown, and who owns the next action. Implement transaction scope, retry/duplicate handling, concurrency/conflict behavior, cancellation/timeouts, compensation or reconciliation, and external-side-effect ordering according to approved design. Do not leave a partial/unknown operation state with no recovery owner, and do not convert failure into a logged success path.
8. **Bind the boundary lifecycle.** For request-serving service/process paths or outbound service clients where startup/readiness, shared resource lifetime, deadline/cancellation, remaining deadline budget, request admission, in-flight concurrency, serving queue pressure, overload, retry-layer interaction, remote-result ambiguity, drain or cleanup can change correctness or proof, read [Service Runtime Discipline](references/service-runtime-discipline.md). Bind approved semantics and actual framework/client/runtime facts through acquire/configure -> usable/ready -> admit/execute -> classify outcome -> release/drain/cleanup; use its contrastive runtime cases to distinguish hidden client/platform behavior from portable defaults. Complete this branch only when every material dimension is implemented and proof-bound or reported as an exact unresolved design/runtime-fact gap. Use the background branch instead for delivery/attempt ownership semantics.
9. **Bind the attempt lifecycle.** For queue/job/scheduler or similar background paths where redelivery/replay, temporary ownership, partial progress, retry exhaustion, shutdown/drain or overload can change correctness or proof, read [Background Execution Discipline](references/background-execution-discipline.md). Bind approved logical-work semantics and actual runtime facts to the dispatch/delivery identity when one exists, execution-attempt ownership, durable progress, external effects and terminal/handback behavior; use its contrastive ownership cases to separate delivery mechanics from logical-work guarantees. Complete this branch only when every material dimension is implemented and proof-bound or reported as an exact unresolved design/runtime-fact gap.
10. **Prove the mechanism.** Run targeted tests through public seams and the affected integration/runtime path. Exercise duplicate, failure, rollback/recovery, ambiguous handoff or concurrency behavior when the domain claim depends on it. A mocked provider/queue/database narrows proof; state the gap.
11. **Inspect observability/output.** Confirm errors/status/logs/traces reflect the actual operation outcome and do not become a second business truth source.
12. **Report backend evidence.** Report the changed canonical seam/callers, responsibility/enforcement split when material, commands/results, failure-path evidence, real/substituted boundaries, observability inspected, and unresolved design/runtime facts.

## Hard boundaries

- Preserve the approved caller-visible API contract. A material contract change remains an explicit authority gap until approved; if the same session can obtain/consume that decision, continue there without a handoff artifact.
- Consume canonical data semantics and security policy from their owners; unresolved truth remains an explicit gap.
- Inspect existing database constraints/state, runtime delivery semantics and provider facts before adding a parallel application-level tracker or enforcer.
- Bind retry/transaction/concurrency proof to the real mechanism; a bypassing test narrows the claim.
- Do not infer one semantic owner merely because the same validation/check appears in multiple layers; distinguish advisory UX, trusted business decisions, durable/atomic guards, runtime delivery mechanics and provider-side facts.
- Introduce a generic service/framework abstraction only when observed ownership pressure justifies it.

## Completion

`READY` closes only this backend execution unit after required integration/failure proof and material owner/runtime-fact gaps are closed or returned explicitly. This does not establish independent code review, QA, UAT, release, or production-operation success.
