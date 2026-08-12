# Core Contract Dependency

The System Plane does not duplicate Delivery Plane truth. Before changing the ecosystem, resolve the canonical Shared Kernel in the installed `sdlc-intelligence` package and load these contracts when the relevant branch requires them:

```text
workflow-result-contract
role-boundary-reference
artifact-linking-reference
semantic-continuity-contract
external-side-effect-policy
project-capability-profile-reference
[Behavioral Evaluation Contract](BEHAVIORAL-EVALUATION-CONTRACT.md) and its case/report machine schemas
capability catalog and integration result manifest
```

If the installed package or a required Shared Kernel contract cannot be located, return `BLOCKED`. Do not reconstruct it from memory or write a replacement inside the System Plane.

Delivery workflows can run without loading System Plane context. The System Plane depends on the same Shared Kernel because promotion decisions must match the contracts used by promoted Delivery skills.

When a reusable-system capability, artifact class, ownership boundary, or proof obligation is being refined across audit, construction, qualification, or lifecycle handoff, load `semantic-continuity-contract.md` and apply its one-deep-ACTIVE-unit, discovery, lineage, challenge, and recursive-closure invariants to the System Plane work itself. Keep artifact-specific maturity/lifecycle semantics in their owning System contracts.
