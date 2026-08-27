# Durable Data Semantics and Lifecycle

Load this reference when a persistence change alters or depends on entity/field meaning, Canonical Durable Fact versus Derived Representation, lifecycle states, identity/equivalence, representation migration, soft-delete/restore/archive behavior, or when the current model is hard to understand safely from structure and evidence. Use the parent Skill terms Canonical Durable Fact, Derived Representation and Invariant Membership literally. Establish representation-change terminology locally when that branch becomes material. This method does not invent business meaning; unresolved domain semantics remain a gap.

## Contents

1. Bind the durable substrate
2. Make concepts semantically legible
3. Check conceptual coherence
4. Trace data end to end
5. Bind invariants to lifecycle membership
6. Classify representation changes
7. Include hidden writers
8. Proof and stop condition

## 1. Bind the durable substrate before interpreting it

Inspect the real persistence surface that can carry meaning or mutate it:

- tables/collections, columns/fields, types, constraints, keys and relations;
- indexes that enforce a subset or ordering assumption;
- triggers, generated/computed values, cascades and database-side defaults;
- representative existing values, null/default distribution and dirty/legacy shapes;
- application jobs, migrations, imports and other material readers/writers;
- approved domain/spec truth that explains semantics the schema cannot establish itself.

Do not treat ORM models, one repository, or a schema snapshot as the whole data system when another writer/deriver can change the same truth.

## 2. Make each material concept semantically legible

For the entity/fields touched, be able to state without guessing:

```text
concept / field
-> business meaning
-> identity or unit/representation
-> absent / unknown / explicit / default-derived meaning
-> Canonical Durable Fact / Derived Representation / historical-snapshot role
-> valid lifecycle states
-> invariant or relation that gives it meaning
```

Prefer structural expression when it carries the truth faithfully: precise names, constrained types, keys, relations, state values and durable constraints. Add prose only for material semantics that structure cannot safely encode. A large data dictionary is not a substitute for a model whose structure remains ambiguous.

Generic fields such as `type`, `status`, `value`, `data`, or `flag` are not automatically wrong, but they are a warning when different readers assign different meanings or safe coding requires tribal knowledge.

## 3. Check conceptual coherence, not only table correctness

Build a small semantic ownership map for the changed concept:

```text
CANONICAL DURABLE FACT
  -> Derived Representation: computed value
  -> Derived Representation: historical snapshot
  -> Derived Representation: projection/read model
  -> external identifier/copy
```

For each representation, name how it is produced, refreshed and invalidated. Multiple representations are legitimate when their roles differ; they are dangerous when several independently claim to be the current source of the same fact.

Do not equate fields merely because values look similar. `customer_id`, `billing_email`, a provider reference and an order-time email snapshot can all refer to a customer while carrying different identity/freshness semantics.

## 4. Trace the data end to end

For material data, trace the smallest complete lifecycle that can change correctness:

```text
source / ingest
-> validate / normalize
-> canonical durable write
-> derive / copy / replicate
-> read / consume
-> update / reconcile
-> migrate / backfill
-> archive / delete / restore / retention boundary
```

At each transition ask:

- Does meaning change, or only representation?
- Which representation is authoritative here?
- What can be stale or historical by design?
- Which writers can move the entity into or out of an invariant?
- Can a later transition restore the prior meaning, or only produce a plausible replacement?

This is a semantic lineage, not a requirement to diagram every column in the database.

## 5. Bind invariants to Invariant Membership

Invariant Membership is the defined set of states/rows/transitions/writers to which an invariant applies, not an entity name in the abstract. State it explicitly when lifecycle matters.

Example: “email is unique among active accounts” requires create, reactivation/restore and any transition into `active` to participate in the same durable enforcement. A soft-deleted row may be outside that invariant while still retaining historical identity.

Likewise, choose delete/cascade/set-null/restrict behavior from ownership and historical meaning, not foreign-key shape alone. A dependent component and an independently meaningful historical record have different deletion semantics even if both reference the same parent.

## 6. Classify representation changes before migrating

Before backfill/cutover, classify the transform:

- **lossless/invertible** — original meaning can be reconstructed exactly;
- **lossy** — information is discarded or collapsed;
- **meaning-fabricating** — a default/backfill assigns a business fact that was never recorded;
- **ambiguous** — old values cannot be mapped without an unresolved domain decision.

Call the ability to recover the original information and meaning after a representation change **Semantic Reversibility**. An executable reverse migration or rollback command does not by itself prove it. Splitting `full_name` into components and later concatenating them may run successfully while failing to reconstruct the original value or meaning. Preserve source data or an approved recovery path when reversibility matters.

Treat `unknown/not recorded`, explicit `false`, and a database default as distinct until approved semantics prove them equivalent.

## 7. Include hidden writers and derivation mechanisms

When triggers, generated columns, cascades, CDC/materialization jobs, imports or repair scripts exist, include them in the writer/deriver graph. Do not add application maintenance of a value until you know whether the database/runtime already derives or enforces it.

If two mechanisms produce the same fact, decide whether one is canonical and the other derived, or whether there is competing active truth. Prove the actual datastore behavior when database-side logic is material.

## 8. Proof and stop condition

The semantic model is deep enough when the changed concept can be explained as:

```text
meaning + Canonical Durable Fact + Derived Representations + Invariant Membership
+ readers/writers/derivers + transition semantics + invariant/enforcement
```

and representative existing/edge data does not falsify that explanation.

Then use the runtime/concurrency/migration mechanisms needed for the actual datastore. If a required meaning, identity, lifecycle or retention decision is unresolved, surface that gap rather than encoding a convenient assumption in a default, constraint, migration or backfill.
