# Backend / API System Design Reference

Read this reference when the fixed technical decision concerns a backend command,
query, public/internal API operation, service-to-service interaction, webhook,
job boundary, or another caller-visible backend contract whose failure,
concurrency, retry, side effects, or ordering semantics are material.

`codebase-design` remains the technical-design owner. This reference deepens the
operation contract; it does not create Product behavior, authorization policy,
or an implementation framework.

## Start from the real operation

Inspect the actual caller and runtime path before designing:

- caller intent, preconditions, and accepted upstream behavior;
- request/input boundary and validation already owned by Product/BA/Design;
- current module/interface, persistence, external integrations, queues/jobs, and
  transaction boundaries;
- existing error model, retries/timeouts, deduplication, ordering, observability,
  and representative tests/runtime evidence;
- compatibility and current consumers when a public/internal contract changes.

Do not infer a REST/RPC/event style, framework, broker, database, or resilience
pattern from preference.

## Operation contract

For each material operation, define only the dimensions that can change caller
behavior, system correctness, or proof:

- accepted input and preconditions;
- success result and externally observable postcondition;
- stable error/conflict/not-found/denied semantics as applicable;
- retryability and whether a repeated request can repeat effects;
- timeout or lost-response ambiguity: what the caller may safely conclude;
- ordering requirements when operations can race or arrive out of order;
- concurrency/precondition behavior when simultaneous writes can violate intent;
- transaction boundary and which side effects are inside or outside it;
- partial-failure/recovery semantics when durable state and external effects can
  diverge;
- pagination/continuation/order consistency when a mutable collection is read;
- observability needed to distinguish success, retry, duplicate, conflict,
  partial failure, and recovery.

A dimension that is immaterial may be omitted. Do not add idempotency keys,
queues, locks, distributed transactions, or pagination machinery merely because
they are common backend techniques.

## Retry and duplicate discipline

When a caller, worker, gateway, webhook sender, or operator may retry after an
ambiguous result, the design MUST state whether repeating the operation is safe,
conditionally safe, or effect-repeating. Define the identity/precondition basis
only when needed and make duplicate handling observable enough to verify.

A successful happy-path response does not prove retry safety. A timeout does not
prove the operation failed. If the caller cannot distinguish these states, the
contract must say what recovery or reconciliation path exists.

## Concurrency and consistency discipline

When concurrent actions can change a material invariant, define the conflict or
serialization semantics the interface exposes. Examples of evidence questions:

- Can two accepted commands both be valid independently but invalid together?
- Does a caller need a version/precondition or explicit conflict result?
- Is ordering material, or is commutative processing acceptable?
- What state is authoritative after a race or retry?

Do not choose last-write-wins, locking, optimistic concurrency, or another
mechanism without source-backed need. The technical design owns the mechanism;
the approved business invariant remains upstream truth.

## Atomicity is a scoped design claim

Do not use “atomic” as one undifferentiated property. Bind the scope that the fixed semantics actually require:

| Scope | Design question | Do not confuse it with |
|---|---|---|
| Caller/operation semantics | Must the caller observe all-or-nothing completion, or are accepted/partial/unknown outcomes valid? | one request/command automatically implying one transaction |
| Local durable transaction | Which mutations can truly commit/roll back together in the selected datastore/runtime? | proof that concurrent interleavings preserve every invariant |
| Cross-system effect coordination | What happens when a provider/queue/other datastore effect cannot share that local commit boundary? | claiming ACID atomicity without an actual supported distributed transaction mechanism |

A batch envelope can contain independent operations; multiple components can participate without requiring global atomicity. Conversely, an approved all-or-nothing invariant may require a stronger boundary or coordination mechanism than the current implementation provides. Choose from the required invariant, completion semantics, actual transaction capabilities, failure residue and operational constraints before selecting a mechanism.

If no single mechanism can make every effect atomic, design the partial/ambiguous states and recovery ownership explicitly. Do not relabel eventual reconciliation or compensation as atomicity.

## Durable state and external side effects

When an operation spans persistence plus email, payment, storage, queue, webhook,
or another external effect, name the atomicity boundary explicitly. Define what
can be durably committed before/after the external action, how partial progress
is detected, and how retry/reconciliation/compensation preserves the approved
outcome.

Do not mandate an outbox, saga, two-phase commit, or compensating transaction.
Choose the smallest mechanism that satisfies the declared semantics, failure
modes, operational constraints, and proof boundary.

## Mutable collection reads

When pagination/continuation is material, define the caller-visible ordering and
stability guarantees independently from UX presentation. Cursor, offset, page
number, snapshot, or keyset are technical mechanisms; choose them only after the
required continuation/consistency semantics are known.

## Security boundary

Backend/API design may define where authentication context, authorization result,
tenant/resource scope, and denial signals enter the operation. It MUST NOT invent
who is allowed, which tenant may access which resource, or another missing policy.
Route missing policy to the canonical Product/Security owner and keep the design
`PARTIAL` when that truth changes the interface or enforcement semantics.

## Required technical-design extension

Add the material subset of these sections to the normal `codebase-design`
artifact:

```markdown
## Operation intent, callers, and preconditions
## Success, error, conflict, and ambiguous-result contract
## Retry / duplicate / idempotency semantics
## Concurrency, ordering, and consistency semantics
## Transaction and external-side-effect boundary
## Partial failure, recovery, and reconciliation
## Mutable-collection continuation semantics
## Observability and operational signals
## Compatibility, migration, rollback, and proof
```

## Proof

Proof must target the failure mechanism, not only the happy-path handler. Use the
smallest representative evidence that can falsify the declared contract: repeat
requests, injected timeout/partial failure, concurrent writers, reordered events,
continuation under mutation, compatibility callers, or runtime telemetry when
material. A mocked 2xx response or unit test that bypasses the relevant boundary
cannot prove the wider operation claim.
