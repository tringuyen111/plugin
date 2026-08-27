# API Review Lens

Load when the frozen change modifies a caller-visible request/response/RPC/message contract, retry semantics, pagination/continuation, concurrency preconditions, versioning, or compatibility.

## Contract surface

Trace the actual consumer-visible change, not only handler syntax:

- operation/resource identity and inputs;
- success and material error classes callers branch on;
- response/serialization shape and field meaning;
- ordering, pagination/continuation/token semantics;
- authentication/authorization interaction when caller-visible;
- timeout/retry/ambiguous-result behavior;
- current/released consumers when compatibility is material.

## Retry and ambiguous completion

For an effectful operation that may be repeated after timeout, disconnect, redelivery, or lost response, ask:

1. Is the operation semantically repeatable, or can a duplicate create another effect?
2. What stable operation/resource/precondition identity prevents or detects duplicate effects?
3. Does a timeout mean "not applied", or is completion ambiguous?
4. What does a repeated call return after the first attempt succeeded but its response was lost?

Do not infer idempotency from method/function names or request equality. A configured retry policy is not proof that repeat execution is safe.

## Pagination and concurrent mutation

When traversal/list semantics change, inspect:

- stable ordering and tie-breaking;
- continuation token/cursor meaning;
- inserts/updates/deletes between pages;
- duplicate/omitted item risk;
- token/version compatibility for current consumers.

## Compatibility

Treat compatibility as a consumer property. Look for changed status/error meaning, field presence/type, enum exhaustiveness, generated-client shape, resource identity, retry semantics, pagination tokens, or version/deprecation behavior that an existing consumer can observe.

A new version is not automatically required. If resolving compatibility needs a product/API architecture decision, report the concrete break and return the design choice to its owner.

## Evidence boundary

Prefer source-level contract/caller evidence. Use targeted transport/client probes only to test a concrete finding. Do not call serialization/runtime/network behavior reproduced unless that path actually ran. Security policy depth remains Security-owned; runtime acceptance remains QA/verification-owned.
