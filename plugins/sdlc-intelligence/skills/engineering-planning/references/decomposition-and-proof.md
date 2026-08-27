# Decomposition and Proof

Use this reference for non-trivial engineering decomposition. The goal is not to create more tasks; it is to find independently meaningful execution/proof boundaries and the minimum dependency graph that preserves correctness.

## Variables that earn a node boundary

Evaluate these together:

- **semantic ownership:** one node should own a coherent observable behavior or invariant;
- **dependency direction:** a predecessor is real only when successor correctness/proof is impossible or unsafe without it;
- **integration seam:** a shared contract/primitive may need an explicit foundation boundary;
- **change coupling:** tightly coupled changes with one proof outcome often belong together;
- **failure/recovery:** independent restart, rollback, compensation, or partial-failure semantics can earn a node;
- **proof boundary:** independently falsifiable outcomes can earn separate nodes;
- **parallelizability:** no truth/write-conflict dependency means work should remain parallel;
- **cutover order:** migrations/exposure/removal can impose real temporal edges;
- **risk:** isolation is justified when the risk/recovery model is materially independent.

Team boundaries, code layers, filenames, convenient work order, or hypothetical future reuse do not earn a dependency by themselves.

## Work types, only when semantics justify them

```text
ARCHITECTURE_DECISION | FOUNDATION | WALKING_SKELETON | VERTICAL_SLICE | MIGRATION | HARDENING | VERIFICATION
```

Do not force every plan to use these labels.

## Boundary decision table

| Current evidence | Preferred decomposition | Proof/dependency consequence |
|---|---|---|
| one approved behavior crosses layers; prerequisites are ready; layers have no independent cutover/failure/proof meaning | one `VERTICAL_SLICE` | prove the observable behavior end-to-end; no `DB -> API -> UI` chain |
| several current consumers require one canonical primitive/invariant before any can be correct | minimum `FOUNDATION`; add one `WALKING_SKELETON` when real-boundary proof is needed | `FOUNDATION --BLOCKS[truth]--> SKELETON`; fan out only after the prerequisite is proved |
| data/schema/provider cutover has independent ordering, restart/rollback, compatibility, or retirement semantics | separate `MIGRATION` | block only successors that are unsafe/invalid before migrated state exists |
| hardening or verification can fail independently after behavior exists and uses a distinct evidence mechanism | separate `HARDENING` or `VERIFICATION` | ordinary developer proof stays inside its slice; do not create a testing ticket ceremonially |
| protected Product/Design/Architecture/security-policy decision is unresolved | explicit decision gap, not executable work | affected frontier remains blocked/partial |

## Typed edges

Use typed relations because edge meaning changes execution:

```text
[Decision] --AUTHORIZES--> [Plan node]
[Foundation] --BLOCKS[truth]--> [Dependent slice]
[Migration] --BLOCKS[cutover]--> [New writer]
[Slice A] --CONFLICTS_WRITE_WITH--> [Slice B]
[Node] --PROVED_BY--> [Runtime/evidence target]
[Changed source] --INVALIDATES--> [Planning claim]
```

`BLOCKS[truth]` means an unfinished prerequisite contract/state makes the successor invalid or unsafe. `BLOCKS[write-conflict]` is justified only when concurrent mutation of the same protected seam cannot be made safe. Otherwise keep nodes parallel.

## Semantic coverage handshake

Before a node becomes frontier-ready, every material incoming obligation must be accounted for by one or more nodes, a valid lineage relation (`REFINE | SPLIT | DERIVE | SUPERSEDE`), a proved not-applicable disposition, or an explicit unresolved gap. A tidy graph that silently drops an obligation is not ready.

Each executable node should state:

```text
Parent / scope
Stable planning identity and source revision
Observable outcome / what changes
Material obligations consumed and traceability / lineage
Non-goals
Real blockers and blocker reasons
Runtime or artifact entrypoint
Proof boundary / evidence target
Recovery/cutover concern when independently material
```

Avoid speculative file lists and brittle implementation snippets unless they encode an already accepted invariant more precisely than prose.

## Parallelism test

Two nodes may run in parallel when:

1. both consume ready truth;
2. neither requires the other's output/invariant;
3. protected write seams do not conflict, or the conflict is safely isolated;
4. independent failure of one does not invalidate the other's proof model.

Parallelizability is a property of dependency truth, not of how many agents are available.

## SHOW

**Vertical outcome:** "remember dismissed banner" already has a canonical settings API and store. One slice may change UI -> API -> persistence and prove the user-visible persistence outcome. Three layer tickets would create no independently useful DONE state.

**Foundation then fan-out:** API writes, jobs, and reporting all need one new canonical status invariant. Create the minimum foundation, prove one representative skeleton through real boundaries, then keep API/job/report slices parallel unless another dependency appears.

**Migration earns independence:** a released table needs backfill plus constraint cutover with restart/rollback checks. The migration has its own failure/recovery truth, so it earns a node even when the same product change also modifies API/UI behavior.

**False dependency:** "CSV export before email receipt because backend starts first" is not a blocker when both consume ready contracts and touch no conflicting protected seam.

## Replan impact

When evidence changes, identify which node claims, edges, proof targets, or source revisions are invalidated. Preserve unaffected nodes. Rebuild only the impacted topology and derive the frontier again.
