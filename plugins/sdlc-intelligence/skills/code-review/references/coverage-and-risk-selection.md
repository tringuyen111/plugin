# Coverage and Risk Selection

Load this reference for every non-trivial review after the behavioral/ownership reconstruction has identified material risk seams. The goal is explicit coverage truth and selective depth, not a ritual checklist or the primary mechanism for deciding where attention belongs.

## Build the coverage ledger

Split the frozen surface **and the concrete semantic edges discovered during reconstruction** into the smallest material units that can fail independently. A unit may be a changed function/block, public contract, state transition, migration step, configuration/runtime edge, test behavior, or generated artifact whose correctness matters to the change.

Also record cross-cutting edges that may not live in one hunk:

- caller -> changed callee or API contract;
- transaction -> external side effect;
- producer -> queue/job -> consumer;
- old schema/code -> migration/backfill -> new schema/code;
- source/input -> validation/authorization -> sink;
- server render -> client takeover;
- changed behavior -> test oracle;
- repeated work -> I/O/resource/lock amplification;
- changed responsibility/invariant -> existing owner/sibling implementation/fallback/default;
- semantic policy/default -> alternate enforcer or bypass path.

Give every material unit/edge exactly one status:

```text
REVIEWED
NOT_MATERIAL(reason)
UNRESOLVED(reason)
```

Never silently omit a material unit. `NOT_MATERIAL` requires a concrete reason such as generated data whose producer is unchanged, a mechanical rename with verified semantics, or an explicitly out-of-scope file. A material `UNRESOLVED` item is a review limitation and prevents a full-coverage claim.

## Scale large changes truthfully

For a large change, chunk by coherent execution/contract boundaries rather than arbitrary line counts. Review each chunk and reconcile cross-chunk edges before completion.

If available context or time only supports sampling/high-risk hotspots, say so and keep the result bounded. Sampling does not become full review because the sampled areas were deep.

## Select lenses from reconstructed mechanisms and risky seams

Activate only lenses supported by the frozen change/context:

| Signal in the changed mechanism | Load |
|---|---|
| external/caller-visible request contract, retry, continuation, version/compatibility | `api-review.md` |
| transaction orchestration, queue/job, redelivery, async/cancel/timeout | `backend-async-review.md` |
| persistence invariant, concurrent writers, schema/migration/backfill | `data-migration-review.md` |
| trust boundary, authn/authz, tenant/resource scope, untrusted input, secrets/replay | `security-review.md` |
| browser/UI state, focus/keyboard, SSR/client takeover, network/error state | `frontend-review.md` |
| changed/missing tests or evidence claim relying on tests | `test-quality-review.md` |
| fan-out, repeated I/O, resource lifetime, contention, scale-sensitive work | `performance-resource-review.md` |

Multiple lenses may apply to the same unit. Do not activate a framework/provider-specific branch from a filename or technology stereotype; require inspected repository/runtime evidence.

## Review qualification boundary

A reviewer may understand the code yet still lack the context needed for a material security, concurrency, accessibility, protocol, data, or runtime judgment. In that case:

1. identify the exact unit/lens;
2. state the missing authority/context/evidence;
3. mark it `UNRESOLVED`;
4. route the missing decision/proof to the canonical owner when one exists;
5. do not convert the rest of the clean review into a claim that this unit was qualified.

## Close coverage

Before final aggregation, verify:

- every material changed unit has a ledger status;
- every material cross-cutting edge has a ledger status;
- every activated lens was actually applied or explicitly unresolved;
- findings are still change-bound and source/evidence-grounded;
- the final coverage statement matches what was inspected.
