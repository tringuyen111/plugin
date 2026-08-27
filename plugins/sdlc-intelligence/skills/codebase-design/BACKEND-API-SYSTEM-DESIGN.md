# Backend / API System Design Reference

Read this reference when the fixed technical decision concerns a backend command,
query, public/internal API operation, service-to-service interaction, webhook,
job boundary, or another caller-visible backend contract whose failure,
concurrency, retry, side effects, or ordering semantics are material.

`codebase-design` remains the technical-design owner. This reference deepens the
operation contract; it does not create Product behavior, authorization policy,
or an implementation framework.

## Operation semantics — use these terms literally

- **Logical Operation** — the intended business/system operation whose equivalence semantics come from approved caller/Product/domain truth; it is not defined by transport payload equality alone.
- **Request Attempt** — one transport/execution attempt to carry out a Logical Operation. One Logical Operation may have several attempts; similar attempts may also be distinct Logical Operations.
- **Effect Evidence State** — what current evidence establishes for a material effect: `ESTABLISHED | NOT_ESTABLISHED | UNKNOWN`. `UNKNOWN` is evidence uncertainty, not known partial completion.
- **Partial Progress** — known durable/external residue after only part of a multi-step operation progressed. It can coexist with established effect states and must not be used as a synonym for `UNKNOWN`.
- **Acceptance** — confirmation that a system accepted responsibility/work; it is not proof that every material effect completed.
- **Business Idempotency** — repeated Request Attempts for the same Logical Operation do not repeat the protected business effect. A technical idempotency/deduplication key may enforce established operation equivalence; it must not invent that equivalence.

## Start from the real operation

Inspect the actual caller and runtime path before designing:

- caller intent, approved Logical Operation/equivalence semantics, preconditions, and accepted upstream behavior;
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
- retryability, Request Attempt identity, and whether a repeated attempt for an established Logical Operation can repeat effects;
- timeout or lost-response Effect Evidence State: what the caller may safely conclude and what remains `UNKNOWN`;
- ordering requirements when operations can race or arrive out of order;
- concurrency/precondition behavior when simultaneous writes can violate intent;
- transaction boundary and which side effects are inside or outside it;
- Partial Progress/recovery semantics when durable state and external effects can diverge, kept distinct from effects whose state remains `UNKNOWN`;
- pagination/continuation/order consistency when a mutable collection is read;
- observability needed to distinguish success, retry, duplicate, conflict,
  partial failure, and recovery.

A dimension that is immaterial may be omitted. Do not add idempotency keys,
queues, locks, distributed transactions, or pagination machinery merely because
they are common backend techniques.

## Retry and duplicate discipline

When a caller, worker, gateway, webhook sender, or operator may retry, first establish whether the new request is another **Request Attempt** for the same **Logical Operation**. Equal payloads, delivery IDs, request IDs, or convenient storage keys do not establish operation equivalence unless approved upstream semantics say they do. Keep the design `PARTIAL` rather than silently defining business equivalence inside the technical seam.

Then state whether another Request Attempt is safe, conditionally safe, or effect-repeating, and which technical key/precondition encodes the already-established equivalence when Business Idempotency is required. Make duplicate/retry handling observable enough to verify.

A successful happy-path response does not prove retry safety. A timeout or lost response does not prove the operation failed; it can leave one or more material effects in Effect Evidence State `UNKNOWN`. Known Partial Progress is a separate condition and needs explicit recovery ownership. If the caller cannot distinguish these states, the contract must say what reconciliation or recovery path exists.

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
| Caller/operation semantics | What may the caller conclude about Acceptance, material Effect Evidence State, and known Partial Progress? | treating `accepted`, `partial`, and `UNKNOWN` as one outcome axis or assuming one Request Attempt implies one transaction |
| Local durable transaction | Which mutations can truly commit/roll back together in the selected datastore/runtime? | proof that concurrent interleavings preserve every invariant |
| Cross-system effect coordination | What happens when a provider/queue/other datastore effect cannot share that local commit boundary? | claiming ACID atomicity without an actual supported distributed transaction mechanism |

A batch envelope can contain independent operations; multiple components can participate without requiring global atomicity. Conversely, an approved all-or-nothing invariant may require a stronger boundary or coordination mechanism than the current implementation provides. Choose from the required invariant, completion semantics, actual transaction capabilities, failure residue and operational constraints before selecting a mechanism.

If no single mechanism can make every effect atomic, design known Partial Progress and any `UNKNOWN` effect states separately, with explicit recovery/reconciliation ownership. Do not relabel eventual reconciliation or compensation as atomicity.

## Durable state and external side effects

When an operation spans persistence plus email, payment, storage, queue, webhook,
or another external effect, name the atomicity boundary explicitly. Define what
can be durably committed before/after the external action, how known Partial Progress is detected, when an external effect can remain `UNKNOWN`, and how retry/reconciliation/compensation preserves the approved outcome.

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
## Acceptance, success/error/conflict, effect-evidence, and Partial Progress contract
## Logical Operation / Request Attempt / retry / Business Idempotency semantics
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
Request Attempts, injected timeout/lost response/Partial Progress, concurrent writers, reordered events,
continuation under mutation, compatibility callers, or runtime telemetry when
material. A mocked 2xx response or unit test that bypasses the relevant boundary
cannot prove the wider operation claim.
