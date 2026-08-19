# Durable Work Graph

## Contents

- Canonical work source
- Stable planning identity
- Reconciliation process
- Changeset and mutation truth
- Frontier derivation
- REPLAN
- SHOW

Use this reference only when planning state must persist across sessions/agents, coordinate parallel work, reconcile existing canonical work, or support a shared executable frontier. Do not materialize tracker work for a single bounded execution loop.

## Canonical work source

Reuse the project's actual canonical work-status source and conventions. If several eligible providers differ materially, resolve the live capability or keep the ambiguity explicit. If no acceptable canonical owner exists, do not create a shadow local ledger by default.

Before writes, inspect how the provider represents stable identity, parent/child relationships, dependencies, claims/concurrency, comments/resolution records, state transitions, and completion. Provider fields are representations; Planning semantics remain provider-neutral.

## Stable planning identity

Match existing work with the strongest available identity:

```text
canonical parent/scope
+ source artifact identity and revision
+ stable planning node key
+ canonical provider identity when already published
```

Never update by title similarity alone.

For existing work derive one of:

```text
SKIP_ALREADY_CURRENT
CREATE
UPDATE
CHANGE_STATE
LINK_DEPENDENCY
REQUIRES_OWNER_DECISION
```

A newer source revision alone does not justify reopening everything. Use change-impact evidence and the actual invalidated planning claim.

## Reconciliation process

1. Read the canonical parent/work graph shallowly; zoom into material nodes only.
2. Bind current source revisions, decisions, dependencies, proof targets, and planning identities.
3. Build/reconcile the semantic graph using [Decomposition and Proof](decomposition-and-proof.md).
4. Preserve protected gaps as blockers rather than assumptions.
5. Present or inspect the proposed graph and planning-owned changes. Ask for an owner decision only when a mutation would change protected intent or another non-Planning truth.
6. Build a provider-neutral changeset before mutation.
7. Execute the smallest authorized mutations and verify canonical postconditions after each material write.
8. Re-query the graph and derive the current frontier from consumed state.

## Changeset

```yaml
operation_id:
action: CREATE | UPDATE | CHANGE_STATE | LINK_DEPENDENCY
canonical_target:
expected_current_state:
desired_semantic_change:
authority_required:
live_provider_primitive:
postcondition:
rollback_or_compensation_if_needed:
```

Default to no dependent partial execution when later operations require earlier writes. If safe independent partial progress is intentional, make that property explicit before execution.

## Mutation truth

Per operation preserve one exact result:

```text
APPLIED
SKIPPED_ALREADY_CURRENT
REQUIRES_APPROVAL
BLOCKED_AUTHORITY
BLOCKED_PRECONDITION
UNSUPPORTED_PROVIDER
FAILED
COMPENSATED
```

A tool/API success without verified consumed canonical state is not `APPLIED`. Compensation may restore state but does not turn the attempted workflow into success.

## Frontier derivation

A node is frontier-ready only when:

- its source revision and stable planning identity are current;
- every real blocker is complete in canonical truth;
- unresolved protected decisions remain explicit blockers;
- material obligations are accounted for;
- runtime/artifact entrypoint and proof target are named;
- it is not stale, superseded, duplicate, or awaiting required authority.

Return the smallest useful ready frontier. Do not hand a convenient draft to execution when dependency/proof truth is unresolved.

## REPLAN

When current evidence invalidates a plan:

```text
changed truth --INVALIDATES--> planning claim/node/edge
planning impact --RECONCILES--> affected canonical work
reconciled graph --DERIVES--> new frontier
```

Preserve unaffected nodes and stable identities. Reopen/supersede/update/relink only where the changed truth materially changes validity, dependency, sequencing, or proof.

## SHOW

**Good:** an ADR changes the compatibility window for one migration. Reconcile the migration node, affected dependent edge, source revision, and proof target. Leave unrelated ready slices current.

**Bad:** mark every ticket stale and regenerate the entire backlog because a new ADR exists.
