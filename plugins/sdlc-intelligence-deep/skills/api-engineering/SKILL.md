---
name: api-engineering
description: Implement and prove a material caller-visible API change by preserving fixed operation semantics, validation, errors, authorization surface, idempotency/retry, continuation, compatibility, and real request-response proof. Use directly when the caller-visible API/transport contract is the dominant implementation boundary or as on-demand specialist depth in broader implementation. Do not use as the primary owner for an immutable branch/PR/diff review; do not invent Product behavior, security policy, backend internals, canonical data semantics, QA, or release truth.
---

# API Engineering

Treat any already-approved API/system design as fixed project input when it is material. If that technical decision is missing or disputed, surface the gap instead of importing a sibling Skill's design file as authority.

Load [HTTP Contract Depth](references/http-contract-depth.md) when HTTP request/response, retry ambiguity, preconditions, errors, continuation or long-running operation semantics can change the caller contract; use its caller-uncertainty decision table and contrastive cases to choose the mechanism family and negative proof rather than applying API patterns by habit. Load [API Evolution and Client Proof](references/api-evolution-client-proof.md) when released/current consumers, schema evolution, versioning/deprecation or generated-client compatibility is material. These references refine an approved contract; they do not invent Product behavior or force Azure/REST conventions onto another canonical protocol.

## Entry gate

Establish the exact caller intent and end-to-end journey, current caller-visible operation/inventory, inspected consumers and real transport/runtime seam, fixed security/data/backend decisions that constrain it, source-write scope, and a falsifiable request-response proof target. Identify what the caller sends, what outcomes it can observe, and what it must do next after success, rejection, acceptance, partial/ambiguous completion, or retry when those states are material. A tracker, frontier, semantic-unit ledger, work type, or parent `/implement` invocation is not required.

Missing caller-visible semantics, compatibility obligations, security/data policy, authority, or material external decisions are gaps, not implementation freedom. Do not invent a new API contract merely to keep coding.

## API execution loop

1. **Reconstruct the caller journey, current surface and uncertainty states.** Start from the caller's intended outcome, then inspect actual clients/callers, existing operations/routes, schemas, generated/manual SDK surfaces, request/response representations, validation, error/status model, auth surface, version/compatibility, retry/lost-response ambiguity, idempotency/repeatability, conditional/precondition behavior, continuation/pagination, long-running operation state, conflict/concurrency semantics, tests and runtime evidence. Before adding a new operation, determine whether an existing caller-visible owner already expresses the capability. Classify only the contract dimensions that can change caller behavior or proof.
2. **Freeze caller-visible truth.** Bind the approved contract before touching handler internals.
   Internal persistence/service shapes may adapt to the API; the API does not silently expose
   them for convenience.
3. **Apply engineering economy.** Prefer existing routing/schema/serialization/validation/client
   generation capabilities already supported by the project when they satisfy the contract.
   Do not add a parallel validation or protocol framework because the new endpoint is local.
4. **Implement the transport boundary.** Keep parsing/validation/serialization and transport
   concerns explicit while delegating application/data/security decisions to their canonical
   seams. Avoid route handlers that become the owner of business or persistence truth.
5. **Preserve compatibility as observed by consumers.** Support old/new contract shapes only for named consumers and an intentional compatibility window. Inspect serialized shapes, error/status semantics, generated/manual client behavior and active endpoint/version inventory; source-type similarity is not compatibility proof. Do not create speculative `/v2` or dual behavior without a real obligation and removal gate.
6. **Exercise negative, ambiguous and temporal behavior.** Test malformed/invalid inputs, stable defined errors, duplicate/retried calls, lost-response ambiguity where material, stale preconditions/conflicts, continuation under mutation, long-running state transitions and auth failures. Select pagination/idempotency/version/LRO mechanisms from approved semantics, not habit. When object/property/function authorization, browser/outbound trust, sensitive-flow abuse or unsafe upstream trust is material, preserve the API surface and load `security-engineering` expertise for enforcement mechanics when useful; if policy is unresolved, stop and surface the policy gap rather than duplicating or inventing it.
7. **Inspect real request/response behavior.** Run representative traffic through the actual
   transport/router/serialization path and inspect status, headers/body/schema and logs/errors.
   Verify that each material outcome leaves the caller with enough stable information to know what happened, identify the result/current state when needed, and choose the approved next action; transport/schema validity alone is not semantic completion proof. Handler unit tests do not prove transport behavior when the transport is the claim.
8. **Rerun material consumers.** Verify generated/manual clients, sibling callers or backward
   compatibility only to the declared blast radius.
9. **Report API evidence.** Report the contract revision, changed API seam/callers, commands/responses, negative/compatibility evidence, substituted boundaries, and unresolved external decisions.

## Hard boundaries

- Authentication presence is not authorization policy; consume approved Security truth and route/combine security-owned failure classes through `security-engineering` rather than redefining them here.
- Do not make the external contract mirror an ORM/service object by convenience.
- Do not equate a transport-success/accepted response with completed business work unless the approved caller contract actually defines it that way; expose partial, accepted, or ambiguous completion truthfully when material.
- Do not invent versioning, idempotency, pagination, long-running-operation or status conventions without source truth.
- Do not claim compatibility from schema/source similarity without evidence from the supported consumer matrix.
- Do not claim live API proof from a mocked handler test.

## Completion

`READY` closes only the bounded API execution/proof unit. Missing approved contract/policy,
consumer compatibility evidence, real transport capability or required negative proof keeps the
unit `PARTIAL`/`BLOCKED`/`FAILED`. This does not establish independent QA, release, or production-operation success.
