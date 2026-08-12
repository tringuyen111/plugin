---
name: data-persistence-engineering
description: Execute one approved persistence, schema, migration, backfill, query, or durable-invariant implementation unit under the SDLC implementation owner, including environment classification, concurrent enforcement, compatibility, failure-resume, recovery/reconciliation, representative data proof, and truthful domain closure. Use as an explicit-or-orchestrated supporting capability for materially durable data work; do not own business/domain semantics, Product retention policy, API behavior, security policy, QA, or overall work-item completion.
---

# Data / Persistence Engineering

Read [Domain Execution Kernel](../../resources/shared/references/domain-execution-kernel.md) first. Read the
approved [Data / Persistence System Design Reference](../codebase-design/DATA-PERSISTENCE-SYSTEM-DESIGN.md)
for the material invariant, query, compatibility, migration and recovery semantics.

## Entry gate

Use implementation source and developer/test data only inside the caller's authorized scope. Production migration/deploy or destructive production data mutation is outside this supporting Skill and routes to the canonical operational owner.

Require approved canonical data meaning/invariants, current readers/writers/schema/migrations,
environment class or evidence to classify it, fixed technical data decision, blockers, proof
target and exact mutation authority. Do not infer business truth from the current schema.

## Data execution loop

1. **Reconstruct durable truth.** Map canonical vs derived representations, all material readers/
   writers, invariants, identity/null/default/order semantics, queries/access patterns, current
   schema/indexes/migrations/backfills, transaction boundaries and reconciliation paths.
2. **Classify the environment.** Distinguish disposable/ephemeral, shared test, upgrade rehearsal
   and released/durable environments from evidence. A local database name does not grant reset
   rights.
3. **Bind approved semantics.** Name which mechanism must preserve each material invariant,
   consistency/ordering/continuation rule, compatibility window, backfill/cutover and recovery
   behavior. Missing domain semantics or consequential data design blocks implementation.
4. **Apply engineering economy.** Prefer existing database/runtime/ORM primitives when they
   actually enforce the invariant/support matrix: native constraints, transactions, indexes,
   migration tooling and query features before custom frameworks. A pre-write application check
   is not “simpler” if concurrent writers bypass it.
5. **Implement the minimum durable mechanism.** Apply schema/repository/query/migration/backfill
   change at the canonical seam. Do not create a generic persistence abstraction without current
   ownership/change pressure. Keep derived data explicitly derived.
6. **Prove evolution and failure.** As material to the environment, run empty-to-latest,
   supported previous-release-to-latest, checksums/order, concurrent writes, duplicate/retry,
   partial backfill failure/resume, live-read/write interaction, rollback/forward recovery,
   continuation under mutation and derived-data rebuild/reconciliation.
7. **Inspect representative data.** Query the actual schema/results/invariants and query plans
   when performance semantics matter. A migration command or ORM compile is not durable proof.
8. **Verify cleanup/removal.** Remove obsolete fields/indexes/tables/dual paths only after named
   consumers and compatibility obligations are cleared.
9. **Return closure evidence.** Return schema/data revision, writers/readers affected, commands,
   migration/concurrency/failure evidence, data inspected, recovery limitations, discoveries and
   truthful domain state to `/implement`.

## Hard boundaries

- No destructive reset without environment classification and authority.
- No schema-as-business-truth inference.
- No happy-path migration as proof of upgrade/backfill safety.
- No cache/search/projection silently becoming a second source of truth.
- No concurrency invariant claim from a test that serializes the writers.

## Completion

`READY` closes only the declared data/persistence unit with the required durable/failure proof.
Missing semantics, migration/recovery evidence, environment authority or representative data
keeps the unit non-ready. QA/release migration gates remain separate.
