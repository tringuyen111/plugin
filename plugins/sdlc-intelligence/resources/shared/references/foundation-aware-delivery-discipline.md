# Foundation-Aware Delivery Discipline

Use this reference across Architecture, technical delivery specification, planning, and
implementation when approved behavior may require shared/system-level technical capability.
It does not create Product scope, Design intent, Architecture decisions, or a second backlog.

## Purpose

Use **architecture runway + walking skeleton + vertical slices** together:

```text
approved behavior / design / domain truth
-> classify technical impact
-> resolve required shared/foundation decisions
-> build the minimum required foundation
-> prove it through one representative walking skeleton
-> compose remaining vertical slices
-> harden and verify to the declared risk/AC/NFR scope
```

Vertical slicing without a runway can create repeated local patches. Foundation-first without
a walking skeleton can create speculative frameworks. The discipline requires both only when
current evidence proves the dependency.

## Impact classification

Classify each material domain seam from current approved artifacts and source evidence:

- `NONE` — consume existing technical contracts unchanged.
- `CONTAINED` — new behavior stays inside one owned module/feature and establishes no shared
  technical truth.
- `SHARED` — multiple current consumers or one shared contract require a canonical seam.
- `FOUNDATION` — correctness of multiple dependent work items requires a new/changed system
  primitive, contract, migration, enforcement seam, or runtime/test harness first.

Hypothetical future reuse never upgrades `CONTAINED` to `SHARED`/`FOUNDATION`.

## Minimum runway rule

For `SHARED` or `FOUNDATION`, name:

- current consumers/invariants that prove the shared need;
- fixed technical decision/owner or the unresolved decision that blocks planning;
- the minimum foundation scope needed by current approved behavior;
- dependent work items;
- falsifiable implementation/runtime proof;
- one representative walking-skeleton path.

Do not prebuild an entire design system, service framework, data abstraction, security
platform, or generalized infrastructure “for later.” Expand the foundation only when current
approved consumers/invariants or walking-skeleton evidence require it.

## Planning node vocabulary

Use these node types when they help make dependencies explicit:

```text
ARCHITECTURE_DECISION
FOUNDATION
WALKING_SKELETON
VERTICAL_SLICE
MIGRATION
HARDENING
VERIFICATION
```

They are work types, not new lifecycle owners. Every node still needs one canonical owner,
traceability, blockers, non-goals, proof target, and truthful status.

- `ARCHITECTURE_DECISION` resolves a fixed consequential technical uncertainty before build.
- `FOUNDATION` creates the minimum shared/system seam proved necessary by current work.
- `WALKING_SKELETON` exercises one thin representative path through the real foundation and
  production boundaries so architecture is corrected from evidence before scale-out.
- `VERTICAL_SLICE` delivers approved user/system behavior through already-ready prerequisites.
- `MIGRATION`, `HARDENING`, and `VERIFICATION` stay explicit when their proof/failure models do
  not fit safely inside a feature slice.

## Frontier rule

A dependent work item is not implementation-ready while a required foundation decision,
foundation node, migration, or walking-skeleton predecessor remains incomplete. Conversely,
do not block a contained slice on unrelated “platform work.”

## Prototype boundary

Prototype learning may justify or refine a foundation decision. Prototype bytes do not satisfy
a production `FOUNDATION` or `WALKING_SKELETON` node until the normal implementation, review,
runtime/output proof, and cleanup/replacement gates have run.
