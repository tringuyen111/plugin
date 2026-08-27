# Data / Persistence System Design Reference

Read this reference when the fixed technical decision changes durable data,
schema, persistence interfaces, canonical/derived representations, query/write
semantics, backfills, cutovers, or recovery behavior.

`codebase-design` remains the technical-design owner. This reference deepens
persistence reasoning; it does not prescribe a database, ORM, migration tool,
index technology, or storage topology.

## Establish data truth first

Before choosing schema or migration mechanics, inspect and state:

- canonical data owner and authoritative representation;
- derived/cache/search/projection representations and their freshness/rebuild
  relationship to canonical truth;
- material business/technical invariants and which write paths can violate them;
- current readers/writers, transaction boundaries, concurrency behavior, and
  representative queries;
- environment class and supported upgrade path;
- schema/migration history, existing durable consumers, and rollback/recovery
  constraints;
- relevant volume, retention, latency, privacy/security, and operational limits.

Do not infer that the application layer, database constraint, cache, queue, or
projection is authoritative merely because current code reads from it.

## Invariant and write discipline

For each material invariant, define the enforcement boundary that remains valid
under concurrent writes and retries. Ask which paths can mutate the same truth,
what race can violate it, and what observable conflict/recovery semantics exist.

Do not mandate a database constraint, transaction isolation level, lock,
optimistic version, or serialized worker. Choose the smallest mechanism that
preserves the invariant for the actual writers and failure modes.

A pre-write application check plus a happy-path repository test is not proof of
an invariant when concurrent writers can bypass the assumption.

## Query and ordering semantics

For material reads, define what callers may rely on:

- stable read/reference key and deterministic ordering when order matters; do not treat a storage/cursor key as Domain Identity unless authoritative domain semantics establish that relationship;
- consistency/freshness expectation;
- continuation/pagination behavior under concurrent inserts, updates, deletes,
  or backfill;
- null/default/unknown semantics;
- canonical vs derived read behavior and reconciliation when stale.

Indexes, keyset/cursor/offset pagination, snapshots, replicas, and caches are
implementation mechanisms, not the source requirement.

## Schema evolution and compatibility

Use the environment/release discipline from `codebase-design`. When durable
consumers or old/new application versions can overlap, define the material
compatibility window explicitly:

- which old and new readers/writers coexist;
- additive/transform/cutover/remove sequence;
- when a new invariant becomes enforceable;
- when old fields/indexes/tables/paths may be removed;
- rollback direction and what data written by the new version means to the old
  version.

Do not invent dual-write or expand/contract ceremony where no supported overlap
exists. Conversely, do not treat a non-empty/shared/released environment as
disposable merely because a migration applies locally.

## Backfill and data transformation

When a transformation can run longer than one atomic change or may partially
fail, define:

- selection scope and progress identity;
- whether repeated processing is safe, conditionally safe, or effect-repeating;
- detection of partial progress/failure;
- resume, retry, reconciliation, or safe restart semantics;
- interaction with live reads/writes during the transformation;
- cutover criterion and post-cutover verification;
- cleanup/removal gate for temporary compatibility paths.

Do not require a particular job framework. The design must make interrupted
execution safe enough for the declared environment and blast radius.

## Canonical and derived data

A derived projection, search index, cache, aggregate, or denormalized view MUST
not silently become a second source of truth. Name:

- canonical owner;
- derivation/update trigger;
- acceptable freshness/staleness;
- rebuild/reconciliation path;
- failure signal when derived state disagrees materially;
- whether callers may fall back, and under what truthful semantics.

## Required technical-design extension

Add the material subset of these sections to the normal `codebase-design`
artifact:

```markdown
## Canonical data ownership and derived representations
## Material invariants and enforcement boundary
## Read/query/order/continuation semantics
## Write/concurrency/transaction semantics
## Schema evolution and compatibility window
## Backfill, cutover, resume, and recovery
## Derived-data freshness/rebuild/reconciliation
## Migration rollback/removal proof
```

## Proof

Proof must exercise the mechanism that can violate the claim when material:
concurrent writes, duplicate/retried writes, old/new reader-writer overlap,
partial backfill failure/resume, continuation under mutation, reconciliation of
stale derived data, and empty-to-latest / previous-release-to-latest migration
paths appropriate to the environment.

A migration command returning success or an ORM model compiling does not prove
data invariants, upgrade compatibility, backfill safety, or recovery semantics.
