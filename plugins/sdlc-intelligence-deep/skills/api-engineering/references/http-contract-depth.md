# HTTP / Request-Response Contract Depth

Load this reference only when the current API unit uses HTTP-like request/response semantics and retry/repeated delivery, lost-response ambiguity, concurrency preconditions, continuation under mutation, partial effects, or work that can outlive the request is material. Preserve the project's existing protocol conventions and approved operation semantics; this reference does not mandate Azure-specific shapes or REST where another protocol is canonical.

Use the parent term **Caller Contract** literally. This reference establishes specialized operation/attempt/effect/temporal distinctions only when the current caller journey needs them; do not promote them back into every API task.

## 1. Model the caller journey, current surface, and uncertainty

Start from the caller's intended outcome, not from an endpoint shape. Reconstruct the smallest end-to-end journey that lets the caller complete that outcome:

```text
caller intent
-> existing operation / request
-> transport admissibility
-> accepted/non-terminal work or executed work
-> caller-visible result/current state
-> next action, recovery, or terminal result
```

Before creating a new operation, inspect the current route/operation inventory, request/response schemas, generated/manual clients and compatibility surface. If an existing operation already owns the same caller-visible capability, extend or reuse it when the approved semantics fit instead of creating parallel contract truth. Similar internal handlers are not proof that the caller concepts are the same.

When repetition, boundary ambiguity, partial application, or non-terminal work is material, establish the distinctions at the point they control the caller decision:

- The **Logical Operation** is one approved caller intent/effect across retries or repeated delivery; a **Request Attempt** is one concrete transport exchange that tries to advance or observe it. Equal payloads, request/trace IDs, a connection, or one handler execution do not establish operation equivalence unless the Caller Contract says they do.
- The **Effect Evidence State** for each material caller-visible effect is what authoritative current evidence establishes: `ESTABLISHED`, `NOT_ESTABLISHED`, or `UNKNOWN`. **Partial Progress** is separately the subset of a multi-step Logical Operation known to be complete; uncertainty about one effect is not itself progress.
- **Acceptance** means the system has accepted responsibility/work but is not yet terminal. **Completion** is the approved terminal condition with enough stable result/state for the caller's next action. Transport success or schema validity alone proves neither distinction.

For each material input, distinguish **wire/schema admissibility** (parse/type/format/range/null/unknown-field rules owned at the transport contract) from **domain admissibility** (business state, inventory, authorization, durable invariants or other decisions owned by their canonical seams). API Engineering owns the stable caller-visible mapping of those outcomes; it does not become the owner of the underlying business/security/data decision.

For every material **Logical Operation**, state what the caller can conclude after:

- successful response;
- explicit validation/domain/conflict/authorization failure;
- timeout, dropped connection or lost response with a possibly `UNKNOWN` **Effect Evidence State**;
- duplicate/retried **Request Attempt**;
- concurrent modification;
- known **Partial Progress**;
- **Acceptance** / long-running non-terminal state;
- **Completion**.

A robust **Caller Contract** makes `UNKNOWN` outcomes recoverable without pretending they are known Partial Progress or known non-completion. “The handler ran” is an implementation fact, not a Caller Contract.

### Choose from uncertainty, not endpoint shape

Use this table to turn caller uncertainty into a mechanism family and a falsifiable proof target. The mechanism column is a selection aid, not permission to invent protocol conventions that the approved contract does not contain.

| Caller uncertainty | Contract question that controls the choice | Mechanism family | Negative/temporal proof |
|---|---|---|---|
| A read or protocol-idempotent operation loses its response | Can repeating the intended operation create a new caller-visible business effect, and does project retry policy allow automatic retry? | Existing method semantics plus the project's bounded retry/deadline policy; do **not** add duplicate-tracking state by reflex | Repeat after transport failure; prove the caller-visible effect is unchanged and retry limits remain truthful |
| An effectful operation may have completed before the response was lost | How does the caller identify the same **Logical Operation** across **Request Attempts**, what counts as equivalent intent, what does a duplicate/in-flight duplicate return, and how long is that identity meaningful? | Existing business/resource identity, caller operation identity, or an approved repeatability/idempotency mechanism | Lose the response after the effect, retry the same Logical Operation, send the same identity with materially different intent, and race concurrent duplicates |
| A write may be based on stale state | Which caller-visible version/precondition protects the invariant, and what must the caller do after conflict? | Existing validator/version/precondition semantics | Current and stale preconditions through the real transport path |
| A collection is traversed while it changes | What ordering/continuation guarantees must remain true across page boundaries? | Existing page/continuation contract with deterministic ordering and a stable tie-breaker/token when required | Insert/update/delete around the page boundary and inspect duplicates/misses according to the approved contract |
| Work can outlive the request budget | What proves **Acceptance** versus **Completion**, and how does the caller recover status/result/failure after disconnect? | Existing operation/job resource or other approved asynchronous completion contract | Disconnect after Acceptance; retry/start duplicate when material; exercise terminal success/failure and expiry |

If no row's contract question is material, do not add its mechanism merely because it is common API infrastructure.

## 2. Method semantics and repeatability

Use the protocol's method semantics as a starting constraint, then define application repeatability explicitly.

For effectful **Logical Operations** that can be retried after an `UNKNOWN` result, identify the operation identity/precondition needed to prevent or detect duplicate effects. The mechanism may be a caller-chosen resource identity, idempotency/repeatability key, version precondition or existing business identity; do not add a new key when the operation is already naturally repeatable.

Record what another **Request Attempt** for the same Logical Operation returns and for how long duplicate identity must remain meaningful. Define the equivalence rule for that identity: equal payloads do not necessarily mean the same Logical Operation, and transport metadata may change across attempts without creating new intent. Also define how the Caller Contract detects reuse of one operation identity for materially different intent and what an in-flight duplicate observes. A successful first response does not prove retry safety; a timeout does not prove the effect did not happen.

### Contrastive example: `UNKNOWN` charge effect after lost response

Suppose the approved charge contract already includes a caller-generated `charge_operation_id`. A sound contract can define the same ID plus equivalent charge intent as the same operation, return the approved prior/in-progress outcome on a duplicate, reject the same ID with materially different intent, state the retention window, and require concurrent duplicates not to create a second charge. Backend/Data owns the atomic persistence mechanism; API Engineering owns these caller-visible semantics and their transport proof.

The near-miss is to say “POST timed out, retry the same JSON” or to add a generic idempotency header without server-side identity, equivalence, retention, duplicate-result, and concurrent-duplicate semantics. Force a lost response after the effect and retry through the real transport seam to prove the contract.

## 3. Optimistic concurrency / conditional requests

When the approved contract requires conflict detection rather than silent last-write-wins, expose a caller-visible version/precondition. For HTTP this may map to entity tags or another existing version token; the storage mechanism remains Data/Backend truth.

Define:

- token/version scope and what change invalidates it;
- create/update/delete precondition behavior;
- conflict/precondition failure semantics;
- whether a retry must refetch/rebase or can be repeated safely.

Prove both current and stale preconditions through the real transport path.

## 4. Errors are part of the contract

Separate at least the material classes the caller handles differently: malformed/invalid request, missing resource, denied access, domain/precondition conflict, rate/resource limitation when authorized, upstream dependency failure, and unexpected server failure.

Provide stable machine-consumed identity/details according to the approved project convention. Human messages may evolve and must not become the only parsing surface. Do not expose stack traces, secrets or internal implementation details.

When retryability matters, distinguish failures that may succeed unchanged later from bugs/permanent invalid requests and from an `UNKNOWN` **Effect Evidence State** where the original effect cannot yet be established or refuted.

### Contrastive example: machine identity versus human detail

If the approved project convention is RFC 9457 Problem Details, treat `type` as the primary machine-consumed problem identity and use approved extension members for additional machine data; `detail` is human-readable occurrence text and must not become a parsing contract. If the project already has another canonical error model, preserve that model instead of introducing Problem Details solely because it is standardized.

## 5. Completion, output, and atomicity as caller semantics

A response contract is not complete merely because its body validates against a schema. For each material outcome, define the minimum stable information the caller needs to continue correctly: status/outcome identity, created or affected resource/operation identity when material, current versus terminal state, machine-consumed error/conflict detail, and the approved next action such as retry, refetch, poll/status lookup, correct input, reconcile, or stop.

Separate these questions:

| Question | API responsibility | Mechanism owned elsewhere |
|---|---|---|
| Is this input representable/admissible on the wire? | request schema/representation and stable validation outcome | domain/security/data truth behind a schema-valid request |
| Does a successful response mean **Acceptance**, known **Partial Progress**, or **Completion**? | caller-visible temporal/completion semantics | backend/runtime execution and persistence mechanism |
| Must the approved operation appear all-or-nothing to the caller? | expose that semantic guarantee or an explicit Partial Progress / `UNKNOWN` model | transaction/coordination mechanism in Backend/Data/System Design |
| What does known **Partial Progress** mean? | stable established progress plus the approved caller next action | reconciliation/compensation/resume/durable progress mechanism |
| What does an `UNKNOWN` **Effect Evidence State** mean? | expose uncertainty/current observable state and the approved observation/recovery path without asserting completion or non-completion | authoritative observation/reconciliation mechanism |

Do not infer all-or-nothing behavior from one HTTP request, one endpoint, or one batch envelope. Independent items in one request may legitimately have per-item outcomes when the approved contract allows it; conversely, an approved all-or-nothing operation requires a real mechanism capable of upholding that guarantee. API Engineering states and proves the caller-visible semantics, not a fictitious database/distributed transaction.

For HTTP, `202 Accepted` is **Acceptance**, not **Completion**; when the caller must eventually know the result, the approved Caller Contract needs a status/result/recovery path rather than treating Acceptance as terminal success. Preserve the project's existing status and representation conventions rather than introducing a shape by habit.

### Contrastive example: valid JSON, unusable contract

An export start call returns `202` with `{"status":"accepted"}` but no operation identity, status location, terminal result path, expiry, or recovery semantics. The response can be perfectly valid JSON and still fail the caller journey: after disconnect, the caller cannot discover whether the export completed or where to retrieve it. The correction is to bind the approved asynchronous completion contract, not merely add fields until the schema looks richer.

## 6. Collections and continuation

Define the caller-visible collection contract before selecting a mechanism:

- deterministic ordering and unique tie-breaker when needed;
- filter/sort semantics;
- page/continuation size limits if they are part of approved behavior;
- what concurrent inserts/updates/deletes can do to a traversal;
- token/continuation opacity, integrity and lifetime when exposed;
- whether snapshot-like consistency is required or eventual movement is acceptable.

Offset/page-number, cursor and keyset are mechanisms with different costs. Choose from the contract and workload, not fashion.

## 7. Long-running operations

When work outlives a normal request budget, separate **Acceptance/start** from **Completion**. Define the project's protocol for:

- operation/job identity;
- current state/progress when observable;
- terminal result/resource location;
- terminal failure and retry/recovery;
- duplicate start requests;
- cancellation only if approved behavior supports it;
- retention/expiry of operation status.

Do not hold a request open merely because the implementation is currently synchronous. Conversely, do not introduce asynchronous job machinery for work that reliably completes inside the existing contract.

## 8. Validation and serialization

Validate external values at the transport boundary according to the approved schema, including type/format/range/unknown-field/null semantics when material. A schema-valid request can still be rejected by approved domain, security, concurrency or data rules; keep that distinction visible so transport validation does not duplicate or redefine semantic truth. Keep protocol representation separate from internal ORM/service objects so internal refactors do not silently become contract changes.

Inspect both request parsing and actual response serialization. Verify required/optional/null/default/unknown-field behavior and representative success/error/**Acceptance**/**Partial Progress**/`UNKNOWN`/**Completion** shapes through the real path; a handler unit test can miss status/header/content-type/encoding/schema behavior and cannot prove that the response gives the caller enough information to continue.

## 9. Contract proof

Close the API claim with representative raw requests/responses through the real router/transport/serialization path, plus the smallest material negative/temporal probes: duplicate retry, lost-response simulation where practical, stale precondition, page-boundary mutation, invalid input, old-client call or LRO state transition. State any substituted network/gateway boundary.

## Provenance

This reference remains a paraphrased/derived API-contract reasoning aid. Its current protocol/error semantics were cross-checked against IETF RFC 9110 (HTTP Semantics), RFC 9457 (Problem Details for HTTP APIs), and OpenAPI Specification 3.2.0 for request/response contract surfaces. Pagination/LRO/repeatability trade-offs were also checked against Google AIP-158, AIP-151 and AIP-155 as **provider-specific examples**, not universal field/shape mandates. The IETF `Idempotency-Key` work was checked only as a caution: `draft-ietf-httpapi-idempotency-key-header-07` expired on 2026-04-18, so this Skill does not treat that header as a current HTTP standard.

Earlier depth was informed by Microsoft Azure REST API Guidelines and Service Design Considerations at revision `a7022a299442a8352431874e63ec4dff548a1b81` (CC BY 4.0). Azure/Google organization policy is not imported; preserve the project's canonical protocol and approved operation semantics.
