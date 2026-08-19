# Data and Migration Review Lens

Load when the change modifies persistence invariants, read/write ordering, transaction/isolation behavior, schema/index/constraint shape, migration/backfill, or old/new data coexistence.

## Durable invariants under concurrency

For each material invariant, ask where it is enforced and what two concurrent actors can do. Review suspicious patterns such as:

- read/check then write with no durable constraint/locking/isolation that makes the check atomic;
- application-only uniqueness or balance/capacity enforcement;
- lost-update/read-modify-write behavior;
- authorization or tenant scope inferred from stale persisted state;
- retry after serialization/deadlock/constraint failure that repeats only part of the logical transaction.

Do not assume a transaction alone prevents every anomaly. The isolation/constraint/locking mechanism must match the claimed invariant.

## Migration and old/new coexistence

Trace deployment/migration phases that can coexist:

1. old code with old/new schema;
2. new code before/after migration;
3. backfill while reads/writes continue;
4. partial migration/backfill failure;
5. restart/resume/retry;
6. rollback/repair after partial progress.

Look for incompatible reads/writes, non-idempotent backfills, irreversible transformations without an approved recovery path, missing constraint timing, or a window where neither old nor new code preserves the invariant.

## Query/index/constraint changes

Tie a finding to an actual query path or invariant. Do not demand an index/constraint from a generic checklist. Conversely, do not treat application validation as equivalent to durable enforcement when concurrent writers can bypass the assumption.

## Evidence boundary

Source/schema evidence can support a clear concurrency or migration gap. Claims about exact lock behavior, isolation, query plan, production volume, replication, or restore/recovery require the actual datastore/version/runtime evidence. Route new canonical data-model/migration decisions to the owning design/data workflow.
