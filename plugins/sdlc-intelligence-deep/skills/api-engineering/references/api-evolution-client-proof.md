# API Evolution and Client Proof

Load this reference when a caller-visible API change affects released/current consumers, schema evolution, versioning, deprecation, generated clients, endpoint inventory or compatibility migration. The goal is one current supported contract plus explicit coexistence only where real consumers require it.

## 1. Compatibility is a consumer property

Freeze the current contract and named consumers before judging a change. Inspect actual serialized requests/responses and client behavior, not source-type similarity.

Potential break surfaces include:

- removing/renaming fields, operations or enum values;
- changing type/shape/null/default/requiredness;
- making validation stricter for values current clients send;
- changing status/error meaning clients branch on;
- changing ordering/pagination/token semantics;
- changing authentication/authorization interaction or denial visibility;
- changing retry/idempotency/timeout behavior;
- changing URL/resource identity or generated-client naming in a way current consumers compile/deserialize differently.

An additive change can still break strict clients; a semantic-equivalent replacement can still break generated clients. Prove against the supported client matrix.

## 2. Prefer stable abstractions over handler-shaped contracts

The API should express caller concepts, not leak database/service implementation structures. When a proposed change exists only because an internal model changed, adapt internally unless the approved external contract itself must change.

For new operations, validate the existing approved scenario/abstraction and current naming conventions. Do not add speculative operations or generic “execute/action/data” wrappers merely to avoid modeling the caller-visible concept.

## 3. Version only for a real compatibility boundary

A new version is justified by an actual incompatible contract/lifetime requirement, not by fear of future change. Record:

- current consumers and versions;
- why one contract cannot serve them compatibly;
- routing/version selection mechanism;
- support/deprecation lifetime;
- migration guidance/evidence;
- removal owner/gate.

Before an external compatibility obligation exists, keep one canonical API truth instead of parallel `v2` sediment.

## 4. Deprecation and inventory

When old operations/versions are supported temporarily, ensure the active inventory/docs/route configuration agree on what exists. Deprecation should be observable to the consumer through the project's approved communication/metadata channel and linked to a removal condition; “deprecated forever” is not a migration plan.

Include shadow/debug/legacy endpoints in inventory review when they can remain reachable outside the intended contract. Security owns policy/exposure risk; API Engineering owns truthful caller-visible inventory within its implementation boundary.

## 5. Generated and hand-written clients

When SDK/generated clients are material, regenerate/compile/run representative old and new clients against the candidate contract. Test serialization/deserialization and the actual call shape. Schema validation alone does not prove generated-language compatibility.

For hand-written consumers, identify parsing/branching behavior that relies on status codes, field presence, enum exhaustiveness, pagination tokens or error identities.

## 6. Security-owned API boundaries

API Engineering should recognize when a contract touches object/property/function authorization, authentication/session semantics, sensitive business-flow abuse, SSRF/outbound URL trust or unsafe upstream API consumption. It may preserve the approved caller-visible response shape, but it must compose/return the canonical Security owner for policy/enforcement depth rather than duplicating or inventing security policy.

## 7. Compatibility closure

Before claiming compatibility:

1. name the supported consumers/versions;
2. state the exact old/new contract delta;
3. identify potential parse/compile/behavior changes;
4. run representative old/new client proof at the real transport boundary where feasible;
5. record coexistence/deprecation/removal if more than one contract remains active.

## Provenance

This reference is paraphrased/derived from Microsoft API Guidelines at revision `a7022a299442a8352431874e63ec4dff548a1b81` (CC BY 4.0), with API security boundary classes informed by OWASP API Security Top 10 2023 content blob `230cc8c72fe8035474c7edbbb27374183e91f8ab` (CC BY-SA 4.0). Security policy/enforcement details remain owned by `security-engineering` and current project truth.
