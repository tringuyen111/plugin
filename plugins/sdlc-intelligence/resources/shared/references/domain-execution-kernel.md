# Domain Execution Kernel

This reference is shared by the Engineering Execution Pack components. `/implement` remains
the primary work-item owner; a domain Skill owns only one deep ACTIVE execution unit.

Use these shared contracts only when their branch is material:
- [Engineering Evidence Discipline](ENGINEERING-EVIDENCE-DISCIPLINE.md) for source/runtime baseline and proof boundaries;
- [Engineering Economy Discipline](engineering-economy-discipline.md) before new dependency/custom code;
- [Foundation-Aware Delivery Discipline](foundation-aware-delivery-discipline.md) for shared/foundation predecessors;
- [External Side-Effect Policy](external-side-effect-policy.md) before mutation outside the caller's already-authorized scope;
- [Single Active Truth and Replacement Discipline](single-active-truth-contract.md) when replacing/removing an active path.

## Entry contract

Require from the caller:
- canonical work item/revision and ACTIVE semantic unit;
- approved behavior/AC/NFR and domain technical decision(s) relevant to the unit;
- work type and completed blockers, including required foundation/migration/walking skeleton;
- current source/runtime baseline and proof target;
- exact source-write/side-effect authority and project capability profile.

Missing material upstream truth is not filled inside the domain Skill. Return a discovery/
design blocker to `/implement` and the canonical owner.

## Execution invariant

```text
reconstruct domain truth + real source path
-> bind approved design/invariants to the production seam
-> apply Engineering Economy before new mechanism/dependency
-> verify foundation predecessors and work type
-> establish red-capable/proof-capable seam
-> implement the smallest coherent domain change
-> rerun targeted + affected integration/runtime paths
-> inspect the real consumed output/mechanism
-> challenge sibling/bypass/failure paths
-> return domain closure evidence to /implement
```

Do not create a second tracker/status ledger. Do not claim code review, QA, UAT, or release. Domain Skills may mutate implementation source and project-authorized developer/test state only inside the caller's exact scope; production deployment, destructive production data mutation, or an external operational action routes to the canonical Operations/Release/Data authority and its assurance gate.

## Proof boundary

A mock/fake/static render/in-memory adapter proves only the seam it executes. If it bypasses
the production mechanism material to the domain claim, carry the limitation and require the
real mechanism before domain `READY` when that proof is part of the declared unit.

## Economy and simplification

Read the linked Engineering Economy Discipline before adding custom code or a new
dependency. A deliberate bounded simplification records its ceiling, observable upgrade
trigger, and upgrade path through the project-authorized mechanism; do not build the upgrade
now.

## Completion return

Return to `/implement`:
- ACTIVE domain unit + source revision;
- changed canonical seam and affected callers;
- commands/probes and observed outputs;
- domain invariants/failure paths exercised;
- substituted boundaries and proof limitations;
- material discoveries/gaps;
- `READY | PARTIAL | BLOCKED | FAILED` for the bounded domain unit.
