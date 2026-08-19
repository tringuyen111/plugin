# Semantic Merge Model

Read this when a conflict is semantic, generated, dependency/lockfile, migration/schema, rename/edit, or when two sides can interact outside the marker hunks. Skip it for a truly mechanical conflict whose meaning is already proven unchanged.

## 1. Normalize the operation before naming sides

Do not equate `ours` and `theirs` with durable business or developer identities.

Establish the active operation and inspect the actual unmerged stages / operation refs:

```text
common base / original
side 2 in this operation
side 3 in this operation
current replay/merge goal
```

For an ordinary merge, the unmerged index commonly exposes stage 1 as the common base, stage 2 as the current `HEAD` side, and stage 3 as the merged-in side. During rebase, the intuitive branch ownership of `ours` and `theirs` can reverse because commits are replayed onto the upstream series. Therefore record semantic labels such as `BASE`, `TARGET_SERIES`, `REPLAYED_CHANGE`, or exact commit IDs rather than reasoning from the words `ours` / `theirs` alone.

## 2. Derive semantic deltas from the base

For every material conflicted logical unit, reconstruct:

```text
BASE meaning / invariant / contract
DELTA_A = BASE -> SIDE_A
DELTA_B = BASE -> SIDE_B
```

Use commits, requirements, tests, callers, ADRs, migration history, or generated-source inputs to explain each delta. A side snapshot by itself does not reveal which part is intentional change versus inherited base behavior.

Record only the obligations that must survive integration:

```text
Delta
Approved intent / authority
Affected invariant or contract
Dependent surfaces
Evidence
```

## 3. Classify how the deltas compose

Choose the composition class from meaning, not marker shape:

| Class | Meaning | Resolution direction |
|---|---|---|
| `INDEPENDENT_COMMUTATIVE` | Effects do not change each other's preconditions/result | Preserve both; order is not material |
| `ADDITIVE_ORDER_SENSITIVE` | Both effects are valid but order changes behavior | Preserve both in the order required by authoritative semantics |
| `SUBSTITUTIVE_OR_SUPERSEDING` | One delta changes/replaces the contract assumed by the other | Re-express still-valid intent against the current contract; cite precedence/current authority |
| `GENERATED_DERIVATIVE` | Conflicted bytes are generated from other authoritative inputs | Resolve authoritative inputs, then regenerate with the owning mechanism |
| `DURABLE_HISTORY` | Migration/schema/history has released or persisted compatibility obligations | Apply the shared replacement/migration contract; do not rewrite history merely for a clean merge |
| `COMPETING_DECISION` | Deltas encode incompatible product/design/security/architecture decisions | Preserve recoverable state and return the decision to the canonical owner |

A textual union is not automatically `INDEPENDENT_COMMUTATIVE`. Two cleanly concatenated changes can still interact through ordering, shared state, contracts, retries, persistence, or external effects.

## 4. Build the smallest meaning-preserving result

Construct the result that satisfies every still-authoritative delta obligation and no unsupported third behavior.

Use these rules:

- preserve both approved effects when their composition is proven compatible;
- when order matters, justify order from the governing invariant or approved intent;
- when one contract supersedes another, migrate the still-valid intent to the new contract rather than retaining stale syntax;
- for generated artifacts, prefer regeneration after authoritative inputs are reconciled;
- for rename/edit or move/edit cases, follow logical artifact identity and determine whether the edited intent still applies after the rename/contract change;
- if no evidence resolves a competing semantic decision, stop rather than choosing the side with fewer lines or newer timestamp.

## 5. Scan for latent semantic conflicts

Conflict markers identify textual overlap, not the complete semantic interaction surface.

After resolving marker hunks, trace only the combined paths affected by both deltas:

```text
caller -> changed contract -> state/external effect -> verification oracle
```

Look especially for:

- retry added on one side + non-idempotent effect added on the other;
- validation/authentication order changed independently;
- schema/API rename on one side + old-contract consumer edit on the other;
- transaction boundary change + new external side effect;
- concurrency/ownership change + cleanup/cancellation change;
- test oracle from one side that encodes the contract superseded by the other.

A path that Git merged cleanly may still be the most important semantic conflict.

## 6. Verify obligations, not marker absence

Verification should prove the combined result against both sets of surviving obligations:

1. inspect the final diff against the merge/rebase goal;
2. map each authoritative `DELTA_A` / `DELTA_B` obligation to the resulting source or generated output;
3. run the narrowest checks that exercise each side's effect and their material interaction;
4. inspect any changed public contract, migration, generated artifact, or state transition whose correctness is not established by those checks;
5. only then run broader project-required checks.

If one valid intent disappeared, an unintended third behavior appeared, or the combined interaction fails, the resolution is not complete even when Git reports no unmerged paths.

## Correction / re-entry

- Wrong operation-side interpretation -> return to operation normalization.
- Missing or contradictory intent -> return to evidence/owner resolution.
- Unexpected interaction after composition -> return to delta classification and inspect the newly exposed dependency.
- Generated output disagrees with sources -> return to authoritative input reconciliation and regenerate.
- Verification exposes a product/design/security decision -> preserve the conflict and route to that owner rather than fixing it inside merge resolution.
