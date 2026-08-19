# Frozen Behavioral Qualification Cases — data-persistence-engineering

These cases are maintenance-only qualification prompts frozen before the semantic-depth candidate edit. They test whether Data/Persistence Engineering improves durable-model decisions rather than merely adding database vocabulary. Runtime execution is `NOT_RUN` until a real model/Skill runner compares baseline and candidate behavior.

## Rubric dimensions

- `SEMANTIC_LEGIBILITY`: can state what an entity/field/value means without guessing from a vague name or storage shape.
- `CONCEPTUAL_COHERENCE`: identifies canonical versus derived/duplicated truth and avoids several unrelated representations silently owning the same business fact.
- `DATA_E2E`: traces material source, normalization, canonical storage, copies/derivations, readers/writers and lifecycle transitions.
- `LIFECYCLE_INVARIANT`: defines which entity states participate in an invariant and treats restore/reactivate/archive/delete paths as writers when applicable.
- `REPRESENTATION_SAFETY`: distinguishes lossless, lossy and meaning-fabricating migrations; executable rollback is not automatically semantic reversibility.
- `HIDDEN_WRITERS`: inspects trigger/generated/cascade/database-side behavior when it can mutate or derive the same truth.
- `READ_FRESHNESS`: separates successful durable writes from stale/lagged read placement when the read contract requires fresher state.
- `ATOMIC_SCOPE`: names exactly which durable mutations participate in one transaction.
- `ATOMIC_VS_ISOLATION`: does not treat atomic commit/rollback as proof of concurrent invariant safety.
- `BOUNDARY_DISCIPLINE`: does not invent Product/domain meaning, API completion semantics, or Backend cross-system coordination locally.

## Case P1 — opaque but technically valid schema

A table contains `type`, `status`, `value`, `data`, and `flag`. Existing code interprets these fields differently across several call sites. A new feature proposes another status value and another JSON key in `data`.

Strong behavior must:
- refuse to treat syntactic validity or existing usage as proof that the durable model is semantically clear;
- reconstruct the entity/field meanings and canonical owner from readers/writers, constraints, representative data and approved domain truth;
- identify overloaded/generic fields or multiple interpretations that make safe coding depend on guessing;
- improve structural expression (naming/type/constraint/relation/state) where it can encode the meaning, and add prose only for material semantics structure cannot safely express.

## Case P2 — canonical customer identity is fragmented

Orders store `customer_email`, payments store `customer_id`, support tickets store `user_uuid`, and invoices store `billing_email`. A feature asks for "all activity for one customer".

Strong behavior must:
- identify that local table correctness does not prove one coherent customer identity model;
- trace which field is canonical identity versus historical snapshot, external reference, projection or convenience copy;
- inspect synchronization/derivation rules and all material readers/writers before joining fields by superficial similarity;
- surface missing domain identity semantics instead of inventing an equivalence relation from storage shape.

## Case P3 — default fabricates historical truth

Existing rows never recorded verification status. A migration adds `is_verified BOOLEAN NOT NULL DEFAULT false` and backfills every historical row to `false`.

Strong behavior must:
- distinguish unknown/not-recorded from explicit false before choosing null/default/backfill semantics;
- reject a convenient default when it fabricates historical business meaning;
- inspect representative old rows and approved semantics before enforcement/cutover;
- keep the migration blocked or preserve an explicit unknown state when the semantic distinction is material and unresolved.

## Case P4 — uniqueness only while active, including restore

Email must be unique among active users. Soft-deleted users may later be restored; a deleted email can be reused by a new active account.

Strong behavior must:
- define which lifecycle states participate in the uniqueness invariant;
- treat restore/reactivation as a writer that can collide, not only create/update;
- choose durable enforcement from the actual datastore only after semantics are fixed;
- exercise concurrent create/restore behavior rather than proving only serial happy paths.

## Case P5 — lossy representation migration

`full_name` becomes `first_name` + `last_name`. Existing data contains mononyms, titles and ambiguous multi-part names. A rollback simply concatenates the new fields.

Strong behavior must:
- classify the transform as potentially lossy/non-invertible rather than assuming structural decomposition preserves meaning;
- distinguish executable rollback from semantic reversibility;
- inspect representative edge/dirty data before backfill and cutover;
- preserve source representation or another approved recovery path when required, rather than fabricating a reversible claim.

## Case P6 — hidden database-side writer

Application code starts maintaining a derived column, but the current database also has a trigger or generated expression that mutates/derives the same value.

Strong behavior must:
- include database-side trigger/generated/cascade behavior in the writer/derivation inventory when present;
- identify competing ownership or duplicate derivation rather than treating ORM code as the whole write path;
- decide which representation is canonical and which is derived from approved semantics;
- prove behavior through the actual datastore/runtime mechanism, not source inspection alone.

## Case P7 — write succeeds, immediate read is stale

A write commits on the primary. The next request is routed to an asynchronous replica and returns the old state, so application code retries the write as if commit failed.

Strong behavior must:
- separate durable write success from read-placement/freshness semantics;
- identify the required read-your-write/freshness contract for the affected path before changing transaction/index/retry logic;
- inspect actual routing/replica/runtime evidence when material;
- avoid duplicating a successful mutation because a stale read was misclassified as write failure.

## Case P8 — local commit plus external effect

Order state commits locally; a payment or queue effect is outside that datastore transaction and may have succeeded before a later failure.

Strong behavior must:
- state that the external effect is outside the local database transaction;
- preserve the exact local durable truth and any unknown external outcome;
- avoid claiming rollback reversed the external effect;
- return cross-system coordination/recovery decisions to Backend/System Design instead of inventing saga/outbox/2PC locally.

## Case P9 — cross-record invariant under concurrency

Two transactions each pass a pre-check and commit independently, but together violate `one active subscription per user`.

Strong behavior must:
- identify the exact check-then-act/write-skew style anomaly and writer set;
- reject a transaction wrapper as sufficient proof by itself;
- choose a durable enforcement mechanism from actual datastore semantics and caller conflict/retry requirements;
- exercise the conflicting interleaving.

## Case P10 — batch request with independent records

One API request contains 100 independent writes and approved caller semantics allow per-item success/failure.

Strong behavior must:
- reject the inference that one request implies one database transaction;
- preserve per-item durable invariants with the smallest appropriate transaction scope;
- avoid manufacturing all-or-nothing persistence that changes approved caller semantics.
