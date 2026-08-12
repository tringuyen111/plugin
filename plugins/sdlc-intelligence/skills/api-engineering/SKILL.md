---
name: api-engineering
description: Execute one approved caller-visible API implementation unit under the SDLC implementation owner, preserving operation semantics, validation, errors, authorization surface, idempotency/retry, continuation/pagination, conflict/compatibility behavior, real request-response proof, and truthful domain closure independently from backend internals. Use as an explicit-or-orchestrated supporting capability for materially API-facing work; do not own Product behavior, security policy, backend internal architecture, canonical data semantics, QA, or overall work-item completion.
---

# API Engineering

Read [Domain Execution Kernel](../../resources/shared/references/domain-execution-kernel.md) first. Read the
approved [Backend / API System Design Reference](../codebase-design/BACKEND-API-SYSTEM-DESIGN.md)
for the fixed caller-visible operation semantics.

## Entry gate

Require the exact approved API operation/contract, current consumers and runtime seam, applicable
security/data/backend decisions, work type/blockers, evidence target and write authority. Missing
caller-visible semantics or policy are upstream gaps, not implementation freedoms.

## API execution loop

1. **Reconstruct the consumer contract.** Inspect actual clients/callers, route/transport,
   request/response schemas, validation, error/status model, auth surface, version/compatibility,
   idempotency/retry, continuation/pagination, conflict/concurrency semantics, tests and runtime
   evidence.
2. **Freeze caller-visible truth.** Bind the approved contract before touching handler internals.
   Internal persistence/service shapes may adapt to the API; the API does not silently expose
   them for convenience.
3. **Apply engineering economy.** Prefer existing routing/schema/serialization/validation/client
   generation capabilities already supported by the project when they satisfy the contract.
   Do not add a parallel validation or protocol framework because the new endpoint is local.
4. **Implement the transport boundary.** Keep parsing/validation/serialization and transport
   concerns explicit while delegating application/data/security decisions to their canonical
   seams. Avoid route handlers that become the owner of business or persistence truth.
5. **Preserve compatibility deliberately.** Support old/new contract shapes only for named
   consumers and an intentional compatibility window. Do not create speculative `/v2` or dual
   behavior without a real obligation and removal gate.
6. **Exercise negative and temporal behavior.** Test malformed/invalid inputs, defined errors,
   duplicate/retried calls, conflict, continuation under mutation, and auth failures as material.
   Select pagination/idempotency mechanisms from approved semantics, not habit.
7. **Inspect real request/response behavior.** Run representative traffic through the actual
   transport/router/serialization path and inspect status, headers/body/schema and logs/errors.
   Handler unit tests do not prove transport behavior when the transport is the claim.
8. **Rerun material consumers.** Verify generated/manual clients, sibling callers or backward
   compatibility only to the declared blast radius.
9. **Return closure evidence.** Return contract revision, changed API seam/callers, commands/
   responses, negative/compatibility evidence, substituted boundaries, discoveries and truthful
   domain state to `/implement`.

## Hard boundaries

- Authentication presence is not authorization policy; consume approved Security truth.
- Do not make the external contract mirror an ORM/service object by convenience.
- Do not invent versioning, idempotency, pagination or status conventions without source truth.
- Do not claim live API proof from a mocked handler test.

## Completion

`READY` closes only the bounded API execution/proof unit. Missing approved contract/policy,
consumer compatibility evidence, real transport capability or required negative proof keeps the
unit `PARTIAL`/`BLOCKED`/`FAILED`. QA and release remain separate.
