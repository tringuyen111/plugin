---
name: backend-engineering
description: Execute one approved backend application/service implementation unit under the SDLC implementation owner, including canonical module/use-case ownership, transaction and external-side-effect boundaries, concurrency/retry/failure behavior, background execution, observability, integration/runtime proof, and truthful domain closure. Use as an explicit-or-orchestrated supporting capability for materially backend work; do not own Product behavior, public API contract design, canonical data semantics, security policy, QA, or overall work-item completion.
---

# Backend Engineering

Read [Domain Execution Kernel](../../resources/shared/references/domain-execution-kernel.md) first. Read the
approved [Backend / API System Design Reference](../codebase-design/BACKEND-API-SYSTEM-DESIGN.md)
for material backend semantics; treat caller-visible API contract work as a separate API unit
when that is the primary proof boundary.

## Entry gate

Require one approved ACTIVE unit, current source/runtime path, applicable application/API/data/
security technical decisions, completed blockers, proof target and source-write authority.
Return a design/policy gap instead of inventing transaction, retry, concurrency, or side-effect
semantics while coding.

## Backend execution loop

1. **Reconstruct the real execution graph.** Trace request/job/event entrypoints through the
   application/use-case layer, domain/service modules, persistence/adapters, queues/schedulers,
   external providers, transactions, retries, errors and observability. Identify which seam owns
   the business application decision and which pieces are adapters.
2. **Bind contracts to the canonical owner.** Map approved behavior and technical invariants to
   the module that can enforce them across all relevant callers. Do not choose a controller,
   repository, cache, queue consumer, or provider adapter as truth owner merely because it is
   convenient to edit.
3. **Apply engineering economy.** Prefer the established application seam and supported runtime/
   framework/dependencies. A 15-line controller shortcut is not smaller if it duplicates a
   canonical use case or couples transport, storage and side effects.
4. **Implement the declared work type.** Build the minimum foundation/application primitive,
   walking skeleton, migration-support seam, or vertical behavior required by the frontier.
   Keep one canonical path and remove superseded behavior only after parity/caller cutover.
5. **Make failure semantics executable.** When material, implement explicit transaction scope,
   retry/duplicate handling, concurrency/conflict behavior, cancellation/timeouts, compensation
   or reconciliation, and external-side-effect ordering according to approved design. Avoid
   “catch and log success” paths.
6. **Keep background work honest.** For queue/job/scheduler paths, bind message/job identity,
   retry semantics, partial progress and observable terminal failure. Do not infer delivery
   guarantees from the client library name.
7. **Prove the mechanism.** Run targeted tests through public seams and the affected integration/
   runtime path. Exercise duplicate, failure, rollback/recovery or concurrency behavior when the
   domain claim depends on it. A mocked provider/queue/database narrows proof; state the gap.
8. **Inspect observability/output.** Confirm errors/status/logs/traces reflect the actual
   operation outcome and do not become a second business truth source.
9. **Return closure evidence.** Return changed canonical seam/callers, commands/results,
   failure-path evidence, real/substituted boundaries, observability inspected, discoveries and
   truthful domain state to `/implement`.

## Hard boundaries

- Do not redesign caller-visible API contracts to fit internal code.
- Do not infer canonical data semantics from a repository/schema convenience.
- Do not invent authorization/security policy.
- Do not call a retry/transaction/concurrency claim proven when the test bypasses that mechanism.
- Do not introduce a generic service/framework abstraction without observed ownership pressure.

## Completion

`READY` closes only this backend execution unit. Required integration/failure proof, authority,
or upstream design gaps keep the unit non-ready. Overall code review, QA, UAT and release remain
owned elsewhere.
