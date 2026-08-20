---
name: data-persistence-engineering
description: Implement persistence, schema, migration, backfill, query, or durable-invariant changes when durable data is the dominant boundary, including compatibility, atomicity/concurrency, recovery, and representative data/runtime proof. Use as bounded persistence depth in broader implementation; not as owner of business meaning, Product policy, API/security policy, QA, or release truth.
---

# Data / Persistence Engineering

Treat any already-approved persistence/system design as fixed project input when it is material; do not import a sibling Skill's design file as authority. If a missing data meaning, compatibility, migration, or recovery decision can change correctness, surface that gap before choosing a mechanism.

Load [Durable Data Semantics and Lifecycle](references/durable-data-semantics.md) when entity/field meaning, canonical-versus-derived truth, identity, lifecycle membership, representation migration, soft-delete/restore/archive behavior, or semantic legibility can change the persistence decision; use it to make the durable model understandable enough to code against without guessing, not to invent domain meaning or create a documentation project. Load [Relational Runtime Reasoning](references/relational-runtime-reasoning.md) when query/access-path performance, concurrency anomalies, locks, read-placement/freshness, connection/session pressure, continuation under mutation or physical DDL cost is material; use its interleaving/physical-cost contrasts to select from the observed mechanism rather than from labels. Load [PostgreSQL Runtime Depth](references/postgres-runtime.md) only after inspected source/runtime proves PostgreSQL and PostgreSQL-specific planner/MVCC/maintenance/pool/DDL behavior can change the decision; use its version-bound contrasts as examples, not migration recipes. Provider-specific knowledge never overrides the project datastore/version.

## Entry gate

Establish the exact data/persistence outcome, canonical data meaning/invariants, inspected readers/writers/schema/runtime seam, environment class or evidence to classify it, actual dependencies, source/test mutation authority, and a falsifiable durable/runtime proof target. A tracker, frontier, semantic-unit ledger, work type, or parent `/implement` invocation is not required.

Production migration/deployment or destructive production data mutation requires its real operational authority. Do not infer business truth from the current schema. Missing data meaning, consequential design, compatibility, environment, recovery, or authority truth blocks only the affected part.

## Data execution loop

1. **Reconstruct durable meaning, data E2E and runtime pressure.** Identify the material concept, canonical versus derived/snapshot/copy representations, lifecycle states, material readers/writers/derivers, and the relevant source -> normalize -> durable write -> derive/read -> mutate/migrate -> retire path. Inspect schema/constraints/indexes/triggers/generated behavior and representative values rather than only ORM/source shape. Then map query/access amplification, transaction/lock boundaries, read placement/freshness, connection/session behavior and reconciliation paths. Load only the semantic/runtime depth that can change the decision.
2. **Classify the environment.** Distinguish disposable/ephemeral, shared test, upgrade rehearsal
   and released/durable environments from evidence. A local database name does not grant reset
   rights.
3. **Bind approved semantics, lifecycle membership and the exact atomicity scope.** For each changed fact/invariant, name the canonical representation plus the states/transitions that participate. When representation changes, classify it as lossless, lossy, meaning-fabricating or ambiguous; executable rollback is not semantic reversibility. Bind consistency/ordering/continuation, compatibility, backfill/cutover and recovery behavior. For atomicity, identify exactly which datastore mutations share one transaction and which external effects do not. Missing domain semantics or consequential data design blocks implementation.
4. **Apply engineering economy from the actual mechanism.** Prefer existing database/runtime/ORM primitives when they actually enforce the invariant/support matrix: native constraints, atomic writes/transactions, indexes, migration tooling and query features before custom frameworks. Read plans and access patterns before indexing by folklore; define the concurrency anomaly before choosing isolation/locks; inspect pool/session semantics before blaming SQL. A pre-write application check is not “simpler” if concurrent writers bypass it.
5. **Implement the minimum durable mechanism and legible model.** Change the canonical schema/repository/query/migration/backfill seam. Prefer precise names, types, keys, relations, state and constraints when they faithfully encode approved meaning; do not compensate for an ambiguous model with a large documentation layer. Keep derived/snapshot/copied data explicitly non-canonical and preserve how it is produced/refreshed.
6. **Prove semantic evolution and failure through the mechanism.** Inspect representative old/edge values before transforming them; prove that defaults/backfills do not fabricate unknown history, lifecycle transitions participate in their intended invariants, and lossy/ambiguous transforms retain any required source/recovery path. Then run the material migration/concurrency/failure proofs: empty/upgrade paths, checksums/order, conflicting writers, duplicate/retry, lock/deadlock handling, partial backfill resume, live read/write interaction, rollback/forward recovery, continuation and derived-data rebuild/reconciliation. Separate logical compatibility from engine/version-specific DDL cost.
7. **Inspect representative data and runtime evidence.** Query the actual schema/results/invariants and representative semantic edge states; when database-side triggers/generated/cascades or read placement/replica freshness can change the result, prove those actual paths rather than assuming application source is the whole system. When performance/runtime semantics matter, inspect representative plans/cardinality/query count, lock/wait/transaction evidence, pool/session behavior or maintenance state as appropriate. A migration command, ORM compile, new index definition or synthetic unit timing is not durable/runtime proof.
8. **Verify cleanup/removal.** Remove obsolete fields/indexes/tables/dual paths only after named
   consumers and compatibility obligations are cleared.
9. **Report data evidence.** Report the schema/data revision, writers/readers affected, commands, migration/concurrency/failure evidence, representative data inspected, recovery limitations, and unresolved external decisions.

## Hard boundaries

- No destructive reset without environment classification and authority.
- No schema-as-business-truth inference; generic names, current values, `NULL` or a convenient default do not establish domain meaning.
- No default/backfill/representation transform that fabricates or discards material historical meaning without approved semantics and recovery consequences.
- No application-only writer inventory when triggers/generated/cascades or other database-side writers materially affect the same truth.
- No happy-path migration as proof of upgrade/backfill safety.
- No cache/search/projection silently becoming a second source of truth.
- No concurrency invariant claim from a test that serializes the writers.
- No whole-operation atomicity claim from a local datastore transaction when material effects or durable state lie outside that transaction boundary.
- No index-by-column, isolation-by-label, retry-by-default, or migration-by-schema-shape claim without evidence from the actual workload/engine mechanism.
- No PostgreSQL-specific rule unless source/runtime establishes PostgreSQL and version-sensitive semantics are verified when material.

## Completion

`READY` closes only the declared data/persistence unit with the required durable/failure proof.
Missing semantics, migration/recovery evidence, environment authority or representative data
keeps the unit non-ready. This does not establish independent QA, release, or production migration authority.
