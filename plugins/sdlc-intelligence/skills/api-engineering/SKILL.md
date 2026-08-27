---
name: api-engineering
description: Implement caller-visible API or transport changes when the API contract is the dominant boundary, including compatibility, validation, retry/idempotency, errors, and real request-response proof. Use as bounded API depth in broader implementation; not as code-review, Product, security, data, QA, or release owner.
---

# API Engineering

Treat any already-approved API/system design as fixed project input when it is material. If that technical decision is missing or disputed, surface the gap instead of importing a sibling Skill's design file as authority.

## Core term

- **Caller Contract** — the stable caller-visible meaning of accepted inputs, caller intent/operation identity when material, outcomes, errors, temporal state, compatibility obligations, and approved next actions. A schema or handler shape is only one representation of the Caller Contract.

- **WHEN** retry/repeated delivery, a lost or ambiguous response, uncertain or partial effects, stale preconditions, continuation under mutation, or work that can outlive the request can change what the caller may safely conclude or do next, **READ** [HTTP Contract Depth](references/http-contract-depth.md) **BECAUSE** caller uncertainty should select mechanism/proof rather than familiar API patterns; **RETURN** the bounded caller journey, intended-operation versus concrete-attempt identity when material, evidence for established/absent/uncertain effects and known progress, accepted-versus-terminal semantics, chosen mechanism family, negative/temporal proof, and unresolved contract/owner gaps.
- **WHEN** released/current consumers, schema evolution, versioning/deprecation, generated clients, or coexistence can change compatibility, **READ** [API Evolution and Client Proof](references/api-evolution-client-proof.md) **BECAUSE** compatibility is an observed consumer property, not source-shape similarity; **RETURN** the named supported consumer/version matrix, exact Caller Contract delta and compatibility risks, coexistence/deprecation/removal obligations, representative client proof, and unresolved authority gaps.

These references refine an approved Caller Contract; they do not invent Product behavior or force Azure/REST conventions onto another canonical protocol.

## Entry gate

Establish the exact caller intent and end-to-end journey, current caller-visible operation/inventory, inspected consumers and real transport/runtime seam, fixed security/data/backend decisions that constrain it, source-write scope, and a falsifiable request-response proof target. Identify what the caller sends, the caller-visible outcome it intends, what outcomes it can observe, and what it must do next after rejection, success, non-terminal acceptance, uncertain/partial effect, or repeat/retry when those states are material. A tracker, frontier, semantic-unit ledger, work type, or parent Implement wrapper/invocation is not required.

Missing caller-visible semantics, compatibility obligations, security/data policy, authority, or material external decisions are gaps, not implementation freedom. Do not invent a new API contract merely to keep coding.

## API execution loop

1. **Reconstruct the caller journey and current surface.** Start from the caller's intended outcome, then inspect actual clients/callers, existing operations/routes, schemas, generated/manual SDK surfaces, request/response representations, validation, error/status model, auth surface, version/compatibility, retry/lost-response ambiguity, conditional/precondition behavior, continuation/pagination, long-running state, conflict/concurrency semantics, tests and runtime evidence. Before adding a new operation, determine whether an existing caller-visible owner already expresses the capability. Classify only the **Caller Contract** dimensions that can change caller behavior or proof; when repetition, ambiguity, partial effects, or non-terminal work are material, load HTTP Contract Depth before selecting retry/idempotency/continuation/LRO mechanics.
2. **Freeze caller-visible truth.** Bind the approved **Caller Contract** before touching handler internals.
   Internal persistence/service shapes may adapt to the API; the API does not silently expose
   them for convenience.
3. **Apply engineering economy.** Prefer existing routing/schema/serialization/validation/client
   generation capabilities already supported by the project when they satisfy the contract.
   Do not add a parallel validation or protocol framework because the new endpoint is local.
4. **Implement the transport boundary.** Keep parsing/validation/serialization and transport
   concerns explicit while delegating application/data/security decisions to their canonical
   seams. Avoid route handlers that become the owner of business or persistence truth.
5. **Preserve compatibility as observed by consumers.** Support old/new contract shapes only for named consumers and an intentional compatibility window. Inspect serialized shapes, error/status semantics, generated/manual client behavior and active endpoint/version inventory; source-type similarity is not compatibility proof. Do not create speculative `/v2` or dual behavior without a real obligation and removal gate.
6. **Exercise negative and temporal behavior material to the contract.** Test malformed/invalid inputs, stable defined errors, duplicate/retried requests when relevant, lost/ambiguous responses, known partial application, stale preconditions/conflicts, continuation under mutation, non-terminal/long-running transitions and auth failures only to the declared contract. Select pagination/idempotency/version/LRO mechanisms from approved semantics, not habit; use HTTP Contract Depth when caller uncertainty controls those choices. When object/property/function authorization, browser/outbound trust, sensitive-flow abuse or unsafe upstream trust is material, preserve the API surface and the bounded Security-owned enforcement question/evidence need; when host-native discovery supplies decision-changing Security depth, integrate it against the same approved policy/source truth. If policy is unresolved, stop and surface the policy gap rather than duplicating or inventing it.
7. **Inspect real request/response behavior.** Run representative traffic through the actual
   transport/router/serialization path and inspect status, headers/body/schema and logs/errors.
   Verify that each material outcome leaves the caller with enough stable information to know what definitely happened, what definitely did not, what remains uncertain, what progress is already established, whether work is merely accepted or terminal, and the approved next action. Transport/schema validity alone is not semantic completion proof. Handler unit tests do not prove transport behavior when the transport is the claim.
8. **Rerun material consumers.** Verify generated/manual clients, sibling callers or backward
   compatibility only to the declared blast radius.
9. **Report API evidence.** Report the contract revision, changed API seam/callers, commands/responses, negative/compatibility evidence, substituted boundaries, and unresolved external decisions.

## Re-entry

If new source, consumer, transport, or runtime evidence invalidates a bound **Caller Contract**, compatibility assumption, or transport fact, reopen the earliest affected caller-journey/contract/mechanism/proof decision and its material dependents. Preserve independent caller-visible truth and proof that do not depend on the invalidated premise; widen re-entry to the whole API unit only when the changed premise is shared/root truth for that unit.

## Hard boundaries

- Authentication presence is not authorization policy; consume approved Security truth and preserve/combine Security-owned failure classes at the API seam without redefining them here. Host-native discovery owns any separate Security capability selection.
- Do not make the external contract mirror an ORM/service object by convenience.
- Do not equate transport success or non-terminal acceptance with terminal completion unless the approved **Caller Contract** defines that terminal condition. Expose known partial application and unresolved effect uncertainty separately when material.
- Do not invent versioning, idempotency, pagination, long-running-operation or status conventions without source truth. When retry identity is material, do not infer that two requests are the same caller intent from equal payloads, request/trace IDs, connection identity, or transport repetition unless the approved Caller Contract makes that relation authoritative.
- Do not claim compatibility from schema/source similarity without evidence from the supported consumer matrix.
- Do not claim live API proof from a mocked handler test.

## Completion

`READY` closes only the bounded API execution/proof unit. Missing approved contract/policy,
consumer compatibility evidence, real transport capability or required negative proof keeps the
unit `PARTIAL`/`BLOCKED`/`FAILED`. This does not establish independent QA, release, or production-operation success.
