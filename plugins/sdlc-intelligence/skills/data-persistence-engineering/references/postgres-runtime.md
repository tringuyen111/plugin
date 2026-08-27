# PostgreSQL Runtime Depth

Load this reference only after repository/runtime evidence establishes PostgreSQL and the current question materially depends on PostgreSQL planner, MVCC/isolation, locking, connection/session, maintenance or DDL behavior. Verify version-sensitive details from the installed/current PostgreSQL documentation before making an irreversible design or production claim.

## 1. Plans, estimates and statistics

Use `EXPLAIN`/representative plan evidence to distinguish:

- planner estimate error from intrinsically expensive work;
- sequential/index/bitmap access chosen for the observed selectivity/data shape;
- join order/method pressure;
- explicit or hidden sort/materialization work;
- rows processed versus rows returned;
- repeated loops multiplying an otherwise small node.

Use execution-timing/actual-row evidence only where running the statement is safe for the environment. A write statement under `EXPLAIN ANALYZE` can have real effects; preserve mutation authority and use a safe transaction/fixture strategy where appropriate.

If estimates are badly wrong, inspect statistics/data distribution and query shape before piling on indexes. If estimates are reasonable but work is still large, attack the actual access path or workload.

## 2. Index fit and trade-offs

Evaluate a PostgreSQL index against the actual predicates, order, joins and data distribution. Material choices can include multicolumn ordering, partial indexes for a stable selective subset, expression indexes for the real expression, and covering behavior where supported/useful.

Every index adds write/WAL/storage/maintenance cost. Avoid redundant indexes and index-every-column cargo cult. Confirm the planner can and does use the intended path under representative parameters/data, while recognizing that a sequential scan can correctly win for low-selectivity or small-table workloads.

## 3. MVCC and transaction age

PostgreSQL readers/writers operate through MVCC snapshots. Long-running transactions/snapshots can retain old row versions and interfere with cleanup/freeze/maintenance progress even when the application is “only reading.” When table/index growth, vacuum lag or plan quality is involved, inspect transaction age and maintenance evidence instead of tuning autovacuum blindly.

Do not infer anomaly protection solely from the isolation-level name. Define the invariant, identify the concurrent interleaving and prove whether the selected PostgreSQL mechanism prevents or surfaces the conflict. Serializable/SSI can abort transactions; retry only the scope proven replay-safe. A PostgreSQL abort does not supply Operation Identity Input or prove that effects outside the Transaction Boundary / whole application operation are safe to replay.

## 4. Locking and blocking

Use PostgreSQL lock/wait/deadlock evidence to identify who blocks whom, which statements/transactions hold the conflicting locks and how long. Shorten transactions and stabilize lock acquisition order when compatible with semantics. Distinguish row-level contention from table/DDL locks and from CPU/IO saturation that merely looks like blocking.

## 5. Vacuum, analyze and bloat pressure

When dead tuples/table growth/statistics are material, inspect the workload and maintenance system together:

- long-running/open transactions and snapshot age;
- write/delete/update rate;
- autovacuum/analyze activity and thresholds/current progress;
- table and index size/dead-row evidence;
- whether stale statistics are distorting plans;
- whether an index/table rebuild is actually required or merely treating the symptom.

Recovery actions can be intrusive. Do not recommend blocking/rewrite-heavy maintenance on a durable environment without environment classification, authority, resource/blast-radius evidence and a recovery plan.

## 6. Pooling and prepared/session state

PostgreSQL client behavior depends on both the driver and pool mode. Transaction pooling can improve connection scalability while changing assumptions about session affinity. Inspect provider/driver documentation for the exact deployed versions before relying on session-local settings, temporary state or prepared-statement behavior across transactions/connections.

Measure pool wait, active/idle connection counts, transaction duration and timeout/cancellation behavior before blaming query plans for connection exhaustion.

## 7. PostgreSQL schema-evolution proof

For large/released tables, inspect the exact PostgreSQL version semantics of the planned DDL/index/constraint operation: lock mode, scan/rewrite/validation behavior, concurrent/online alternatives, failure recovery, replication impact and disk/WAL budget. Version-specific improvements can change the safest sequence; do not carry an old migration folklore rule forward without checking.

### Contrastive examples: logical compatibility versus physical rollout

Use current-version PostgreSQL behavior to change the sequence only after the actual operation and migration tool are known:

| Intended change | PostgreSQL behavior that can matter | Decision / proof consequence |
| --- | --- | --- |
| Add a supported foreign-key/check/not-null constraint to a large existing table | When the inspected version/constraint form supports `NOT VALID`, initial validation of old rows can be deferred while new inserts/updates are still checked; later `VALIDATE CONSTRAINT` scans existing rows under its own lock semantics | Separate enforcement from validation only when the compatibility window and dirty-existing-data plan justify it; prove both new-write enforcement and eventual validation rather than treating `NOT VALID` as “disabled” |
| Build an index while writes must continue | `CREATE INDEX CONCURRENTLY` uses a multi-phase build, cannot run inside a transaction block, and a failed build can leave an invalid index that still needs recovery/cleanup | Check whether the migration runner forces one transaction, model the failure residue, and prove cleanup/retry before calling the operation online-safe |

These are PostgreSQL contrasts, not portable recipes. A different PostgreSQL version, constraint kind, partitioning shape, migration runner, or datastore can change the valid sequence. If those facts are missing, return the runtime/tooling gap instead of guessing.

## Provenance

This reference is a compact derived expert aid from PostgreSQL core documentation fixed at revision `bdaad789c843f57b1fc66c5ede7abaff8a915c3b` (PostgreSQL License) and Supabase Postgres Best Practices fixed at `8331f910845103c08d51f6ca1d86ebb7d1f745e3` (MIT). It intentionally avoids copying the upstream rule corpus wholesale. Exact source paths/categories are in the frozen Depth Program source pack. The schema-evolution contrasts above were re-verified against the PostgreSQL 18 current `ALTER TABLE` and `CREATE INDEX` documentation on 2026-08-15; re-check the deployed version whenever version-sensitive behavior is material.
