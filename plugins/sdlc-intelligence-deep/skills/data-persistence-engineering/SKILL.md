---
name: data-persistence-engineering
description: Implement persistence, schema, migration, backfill, query, or durable-invariant changes when durable data is the dominant boundary, including compatibility, atomicity/concurrency, recovery, and representative data/runtime proof. Use as bounded persistence depth in broader implementation; not as owner of business meaning, Product policy, API/security policy, QA, or release truth.
---

# Data / Persistence Engineering

Treat any already-approved persistence/system design as fixed project input when it is material; do not import a sibling Skill's design file as authority. If a missing data meaning, compatibility, migration, operation-identity, or recovery decision can change correctness, surface that gap before choosing a mechanism.

## Core terms

- **Canonical Durable Fact** — the durable state this persistence unit treats as authoritative for a bounded fact under already-approved semantics. Storage does not create business authority merely because a value is persisted.
- **Derived Representation** — a persisted projection, copy, cache, snapshot, materialization, or historical representation produced from a Canonical Durable Fact or another approved source. It carries its own freshness/history semantics and must not silently become a second canonical owner.
- **Invariant Membership** — the exact rows/entities, lifecycle states, transitions, and writer paths that participate in a durable invariant. An invariant attached to an entity name in prose is incomplete when membership changes by state or transition.
- **Transaction Boundary** — the exact datastore mutations covered by one atomic commit/rollback mechanism. External effects, another datastore, or another transaction are outside it unless the actual runtime proves otherwise.

Keep retry-equivalence and representation-reversibility terminology behind the duplicate-handling or representation-change branch that needs it.

## Conditional depth

- **WHEN** entity/field meaning, Canonical Durable Fact versus Derived Representation, identity, Invariant Membership, representation migration, soft-delete/restore/archive behavior, or semantic legibility can change the persistence decision, **READ** [Durable Data Semantics and Lifecycle](references/durable-data-semantics.md) **BECAUSE** the durable model must be understandable enough to code against without guessing; **RETURN** the bounded semantic model: Canonical Durable Fact and Derived Representations, identity/meaning gaps, Invariant Membership, lifecycle transitions, representation-change class plus whether original information/meaning can be recovered exactly, material writers/derivers, and exact unresolved domain decisions.
- **WHEN** query/access-path performance, concurrency anomalies, duplicate durable application, locks, read-placement/freshness, connection/session pressure, continuation under mutation, or physical DDL cost is material, **READ** [Relational Runtime Reasoning](references/relational-runtime-reasoning.md) **BECAUSE** mechanism selection must follow the observed invariant/interleaving/physical cost rather than labels; **RETURN** the material workload/anomaly/interleaving, Transaction Boundary, approved same-operation identity when duplicate handling is involved, selected datastore mechanism, runtime/physical proof obligation, and any caller/backend ownership gap.
- **WHEN** inspected source/runtime proves PostgreSQL and PostgreSQL-specific planner/MVCC/maintenance/pool/DDL behavior can change the decision, **READ** [PostgreSQL Runtime Depth](references/postgres-runtime.md) **BECAUSE** provider/version behavior may change the safe mechanism or rollout; **RETURN** the exact PostgreSQL/version-sensitive mechanism, observed runtime evidence, chosen persistence action/proof, and any version/tooling fact that remains unresolved.

Provider-specific knowledge never overrides the inspected project datastore/version. Conditional depth refines this Skill's persistence job; it does not grant authority to invent Product, API, Backend, Security, or cross-system coordination semantics.

## Entry gate

Establish the exact data/persistence outcome, approved data meaning/invariants, inspected readers/writers/schema/runtime seam, environment class or evidence to classify it, actual dependencies, source/test mutation authority, and a falsifiable durable/runtime proof target. When duplicate/retry handling is material, establish from the owning caller/backend/system contract what proves repeated attempts belong to the same approved operation before choosing a durable deduplication/idempotency mechanism. A tracker, frontier, semantic-unit ledger, work type, or parent Implement wrapper/invocation is not required.

Production migration/deployment or destructive production data mutation requires its real operational authority. Do not infer business truth from the current schema. Missing data meaning, consequential design, compatibility, approved repeated-operation identity when material, environment, recovery, or authority truth blocks only the affected part.

## Data execution loop

1. **Reconstruct durable meaning, data E2E and runtime pressure.** Identify the material concept, Canonical Durable Fact, Derived Representations, lifecycle states, material readers/writers/derivers, and the relevant source -> normalize -> durable write -> derive/read -> mutate/migrate -> retire path. Inspect schema/constraints/indexes/triggers/generated behavior and representative values rather than only ORM/source shape. Then map query/access amplification, Transaction Boundaries, lock boundaries, read placement/freshness, connection/session behavior and reconciliation paths. Load only the semantic/runtime depth that can change the decision.
2. **Classify the environment.** Distinguish disposable/ephemeral, shared test, upgrade rehearsal
   and released/durable environments from evidence. A local database name does not grant reset
   rights.
3. **Bind approved semantics, Invariant Membership and the exact Transaction Boundary.** For each changed fact/invariant, name the Canonical Durable Fact plus the states/transitions/writers that participate and any Derived Representations that must remain subordinate. When representation changes, classify it as lossless, lossy, meaning-fabricating or ambiguous; an executable rollback command does not by itself prove that the original information and meaning can be recovered. Bind consistency/ordering/continuation, compatibility, backfill/cutover and recovery behavior. For atomicity, identify exactly which datastore mutations share one Transaction Boundary and which external effects do not. Missing domain semantics or consequential data design blocks implementation.
4. **Apply engineering economy from the actual mechanism.** Prefer existing database/runtime/ORM primitives when they actually enforce the invariant/support matrix: native constraints, atomic writes/transactions, indexes, migration tooling and query features before custom frameworks. Read plans and access patterns before indexing by folklore; define the concurrency anomaly before choosing isolation/locks; inspect pool/session semantics before blaming SQL. When duplicate/retry behavior is material, consume the approved repeated-operation identity from its owner and choose only the persistence mechanism that enforces it; do not infer sameness from equal payloads or transport/delivery identity. A pre-write application check is not “simpler” if concurrent writers bypass it.
5. **Implement the minimum durable mechanism and legible model.** Change the canonical schema/repository/query/migration/backfill seam. Prefer precise names, types, keys, relations, state and constraints when they faithfully encode approved meaning; do not compensate for an ambiguous model with a large documentation layer. Keep every Derived Representation explicitly non-canonical and preserve how it is produced/refreshed.
6. **Prove semantic evolution and failure through the mechanism.** Inspect representative old/edge values before transforming them; prove that defaults/backfills do not fabricate unknown history, lifecycle transitions participate in their intended Invariant Membership, and lossy/ambiguous transforms retain any required source/recovery path. Then run the material migration/concurrency/failure proofs: empty/upgrade paths, checksums/order, conflicting writers, duplicate durable application under the approved same-operation identity, lock/deadlock handling, partial backfill resume, live read/write interaction, rollback/forward recovery, continuation and Derived Representation rebuild/reconciliation. Separate logical compatibility and recoverability of original information/meaning from engine/version-specific DDL cost.
7. **Inspect representative data and runtime evidence.** Query the actual schema/results/invariants and representative semantic edge states; when database-side triggers/generated/cascades or read placement/replica freshness can change the result, prove those actual paths rather than assuming application source is the whole system. When performance/runtime semantics matter, inspect representative plans/cardinality/query count, lock/wait/transaction evidence, pool/session behavior or maintenance state as appropriate. A migration command, ORM compile, new index definition or synthetic unit timing is not durable/runtime proof.
8. **Verify cleanup/removal.** Remove obsolete fields/indexes/tables/dual paths only after named
   consumers and compatibility obligations are cleared.
9. **Report data evidence.** Report the schema/data revision, Canonical Durable Facts and affected readers/writers, material Transaction Boundary, commands, migration/concurrency/failure evidence, representative data inspected, recovery limitations, approved repeated-operation identity when used, and unresolved external decisions.

## Re-entry

If new domain/data evidence invalidates bound meaning, Canonical Durable Fact/Derived Representation roles, Invariant Membership, environment classification, reader/writer inventory, Transaction Boundary/concurrency scope, approved repeated-operation identity, migration/recovery semantics, or runtime proof, reopen the earliest affected persistence decision/mechanism/proof and its material dependents. Preserve independent durable truth and verified evidence; widen re-entry only when the changed premise is shared/root truth for the declared data unit.

## Hard boundaries

- No destructive reset without environment classification and authority.
- No schema-as-business-truth inference; generic names, current values, `NULL` or a convenient default do not establish domain meaning.
- No default/backfill/representation transform that fabricates or discards material historical meaning without approved semantics and recovery consequences.
- No application-only writer inventory when triggers/generated/cascades or other database-side writers materially affect the same truth.
- No happy-path migration as proof of upgrade/backfill safety.
- No cache/search/projection/Derived Representation silently becoming a second source of truth.
- No concurrency invariant claim from a test that serializes the writers.
- No whole-operation atomicity claim from a local Transaction Boundary when material effects or durable state lie outside it.
- No duplicate suppression, idempotency-key semantics, or whole-operation retry derived only from equal payloads, transport/delivery IDs, database error classes, or storage convenience; consume approved operation-equivalence semantics from the owning contract when repeated-operation identity is material.
- No queue ownership, distributed coordination, saga/outbox/2PC, or external-effect recovery policy invented locally; preserve exact durable facts and return the external decision to Backend/System Design.
- No index-by-column, isolation-by-label, retry-by-default, or migration-by-schema-shape claim without evidence from the actual workload/engine mechanism.
- No PostgreSQL-specific rule unless source/runtime establishes PostgreSQL and version-sensitive semantics are verified when material.

## Completion

`READY` closes only the declared data/persistence unit with the required durable/failure proof.
Missing semantics, migration/recovery evidence, approved repeated-operation identity when material, environment authority or representative data
keeps the unit non-ready. This does not establish independent QA, release, or production migration authority.
