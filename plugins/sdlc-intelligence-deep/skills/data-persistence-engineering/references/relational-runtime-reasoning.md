# Relational Runtime Reasoning

Load this reference when the material persistence unit involves query/access-path performance, relational concurrency/anomalies, lock contention, pagination under mutation, connection/session pressure, or the physical cost of schema evolution. Apply the reasoning model only to mechanisms actually present in the inspected datastore; do not force relational assumptions onto a non-relational store.

## 1. Query performance: explain the work before changing the schema

For a slow query, reconstruct the actual access path:

- predicates and their joint selectivity/distribution;
- ordering/grouping/join requirements;
- estimated versus actual row counts when the engine exposes both;
- scan/join/sort/aggregate operations doing most work;
- rows discarded after an expensive step;
- repeated executions/round trips and parameter shapes;
- cache/warm-state and representative data shape;
- write frequency and maintenance cost of any proposed index.

A scan is not automatically bad and an index is not automatically good. The question is whether a different access path reduces the material work for the real workload without unacceptable write/storage/maintenance cost.

### Index decision

An index candidate should earn its cost by matching the query contract: leading equality/range predicates, required order, join keys, covering needs or a proven selective subset. Challenge low-selectivity single-column indexes and redundant overlapping indexes. Prefer one evidence-backed index to a speculative family.

After mutation, compare the same representative plan/runtime conditions. A syntactically different plan is not itself an improvement.

## 2. Access-pattern amplification

Before tuning an individual query, count how often it runs for one user/job operation. Material classes include:

- N+1 per-row lookups;
- repeated identical reads that can safely share one result;
- chatty small writes that should be batched without violating failure semantics;
- pagination patterns that repeatedly rescan/discard large prefixes;
- loading broad rows/relations when the caller needs a narrow projection.

Fix the amplification mechanism before optimizing a query that is only expensive because it runs hundreds of times.

## 3. Concurrency: start from the anomaly/invariant

State the invariant and the conflicting interleaving that can break it. Useful classes include:

- **lost update / read-modify-write race** — two writers derive a new value from the same stale read;
- **check-then-act race** — precondition is true when checked but false by mutation time;
- **write skew / cross-row invariant** — independent writes each appear valid but jointly violate a constraint;
- **duplicate effect** — retry/parallel delivery performs a supposedly-once business effect more than once;
- **non-repeatable/phantom decision** — a multi-step decision observes a moving set/value that changes its meaning.

Choose atomic operations, constraints, compare-and-swap/version checks, locking, serialization/isolation, idempotency or queue ownership based on the exact anomaly and writers. A transaction label alone is not proof; exercise the interleaving that could violate the invariant.

### Contrastive interleaving: transaction wrapper is not the mechanism

For a read-modify-write invariant, make the conflicting transition visible before choosing isolation or locking:

| Step | Writer A | Writer B | Durable consequence |
| --- | --- | --- | --- |
| 1 | read value `10` |  | A derives from version/value `10` |
| 2 |  | read value `10` | B derives from the same stale state |
| 3 | write `11` |  | one increment is represented |
| 4 |  | write `11` | both operations can appear successful while one increment is lost unless the actual mechanism prevents or surfaces the conflict |

Do not fix this table by slogan. An atomic mutation can remove the stale read for some operations; compare-and-swap/version checks can surface conflict; row locking can serialize a bounded critical section; stronger isolation can surface an anomaly that the whole operation must then handle safely. Choose from the invariant, writer set, datastore semantics and caller-visible conflict/retry contract. The near-miss is to place the unchanged read-then-write sequence inside a transaction and assume the label itself proves concurrent safety.

## 4. Transaction atomicity is scoped

Treat transaction atomicity as a precise datastore guarantee, not as a synonym for whole-operation correctness. A local transaction can make the participating durable mutations commit or roll back together, but it does not by itself include an external payment, queue publish, email, filesystem write, cache/provider mutation, or another datastore that is outside the actual transaction mechanism.

Keep three questions separate:

1. **Atomic commit:** which writes are inside one transaction and therefore all-or-nothing at commit/rollback?
2. **Concurrent correctness:** can another transaction interleave in a way that still violates the invariant, requiring a constraint, atomic statement, version/precondition, lock or suitable isolation/serialization behavior?
3. **Whole-operation effects:** what work is outside the transaction and therefore needs an approved Backend/System Design recovery or coordination contract rather than a stronger claim about this database transaction?

A transaction wrapper can provide atomic commit while still being insufficient for a cross-row concurrency invariant under the chosen isolation level. Conversely, an API or job containing several independent items does not require one database transaction unless the approved invariant/completion semantics require all-or-nothing persistence.

When a persistence change reveals a cross-system atomicity requirement, preserve the exact durable facts this Skill owns and surface the external coordination/recovery decision instead of inventing a distributed transaction, outbox, saga, or compensation workflow locally.

## 5. Locks and deadlocks

When contention/deadlock is material, map:

```text
transaction path
-> resources/rows/objects touched
-> acquisition order
-> hold duration
-> competing path/order
-> blocking/deadlock/failure semantics
```

Prefer consistent acquisition order, smaller transactions/lock scope and shorter work inside critical sections where semantics allow. Preserve a bounded retry policy for database-reported serialization/deadlock failures when the operation is actually retry-safe. Do not use sleeps or unbounded retries to hide an unstable lock graph.

## 6. Continuation and pagination under mutation

The contract is not “use cursor pagination”; it is stable continuation semantics for the caller. Define:

- deterministic total order (include a unique tiebreaker when needed);
- whether inserts/updates/deletes during traversal may appear, disappear or move;
- snapshot/freshness expectation;
- continuation token/key meaning and tamper/expiry behavior if exposed externally;
- acceptable cost for deep traversal.

OFFSET can be acceptable for small/stable sets. Keyset/cursor techniques are useful when the stable ordering contract and workload justify them. Test boundary mutations rather than choosing by slogan.

## 7. Read placement and freshness

A committed write and a subsequent read are separate runtime events. When replicas/read pools/lagged read paths are present, establish the required read semantics before treating an old read as evidence that the write failed:

- which node/path serves the write and the follow-up read;
- whether the path requires read-your-write, monotonic, bounded-staleness or merely eventual visibility;
- replica/apply lag or routing evidence under representative load;
- whether a stale read can trigger a duplicate mutation, false conflict or incorrect user-visible state;
- what existing routing/session/token/version mechanism, if any, preserves the approved freshness contract.

Do not strengthen consistency by habit. If eventual visibility is acceptable, lag may be correct behavior. If the caller/workflow requires fresher state, prove the actual routing/replica mechanism and fix read placement/freshness rather than retrying an already-committed mutation or blaming the transaction/index.

## 8. Connection/session runtime pressure

Separate database work from connection-management failure. Inspect:

- pool mode and connection/session lifetime;
- max application concurrency versus database connection budget;
- idle and long-held transactions;
- session-scoped state, temporary objects, advisory locks or prepared-statement assumptions;
- driver retry/cancellation/timeout behavior;
- transaction affinity requirements.

A pool can reduce connection pressure while breaking session-affine assumptions. Verify through the actual driver/pool/runtime path and current provider documentation when semantics are version/provider specific.

## 9. Physical schema-evolution cost

Logical backward compatibility does not prove a migration is operationally safe. For a material DDL/index/constraint change, inspect the actual engine/version behavior:

- metadata-only versus table/index scan or rewrite;
- lock level/duration and interaction with reads/writes;
- temporary disk/WAL/log/resource pressure;
- validation timing and whether it can be separated from enforcement;
- online/concurrent mechanisms and their failure/retry semantics;
- replication/CDC/downstream compatibility;
- overlapping old/new reader-writer behavior.

Choose the smallest migration sequence that satisfies the real compatibility window. Do not add expand/contract phases when no overlap exists, and do not skip them when released consumers require coexistence.

## 10. Runtime closure

A database performance or concurrency claim closes only with evidence through the mechanism that mattered: representative plan/timing/query-count, concurrent-writer trial, lock/deadlock evidence, read-placement/freshness evidence, actual driver/pool behavior, DDL/validation evidence or pagination-under-mutation trial as applicable. State substituted boundaries and data-shape limitations.

## Provenance

This reference is a paraphrased/derived reasoning aid informed by Supabase Postgres Best Practices at revision `8331f910845103c08d51f6ca1d86ebb7d1f745e3` (MIT) and PostgreSQL core documentation at revision `bdaad789c843f57b1fc66c5ede7abaff8a915c3b` (PostgreSQL License). Exact source inventory and license evidence are preserved in the frozen Depth Program source pack. Engine/provider-specific semantics must be re-verified against the inspected project version before becoming project truth.
