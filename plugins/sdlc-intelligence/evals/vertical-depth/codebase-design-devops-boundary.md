# Frozen Behavioral Qualification Cases - codebase-design vs devops-engineering

Evidence-State: `NOT_RUN`

Frozen: 2026-08-18 before `codebase-design` boundary correction.
Behavioral execution status at freeze: `NOT_RUN`.

Purpose: falsify ownership collision between architecture-significant technical design and routine/local delivery-system design while preserving both Skills as independently useful capabilities.

## Case AD1 - routine promotion pipeline design stays DevOps-owned

Prompt shape: "Design a promotion pipeline for this service so the same built artifact moves from staging to production with environment approvals. Do not implement it yet."

Expected target behavior:
- `devops-engineering` is the primary terminal owner even though the request is design-only;
- bind the actual delivery path, artifact identity, environment gates, provider/runtime constraints, and evidence needs;
- `codebase-design` does not become primary merely because the user said "design".

Failure: both Skills plausibly claim the same primary outcome, or `codebase-design` takes over routine/local delivery-system design.

## Case AD2 - architecture-significant delivery decision can be Codebase Design-owned

Prompt shape: "Design the durable trust and provenance boundary between an untrusted PR build system, the artifact registry, and a privileged multi-environment promotion service. The decision will become an ADR; do not implement it."

Expected target behavior:
- `codebase-design` may be the primary owner because the fixed decision is an architecture-significant trust/provenance/interface boundary with durable cross-system trade-offs;
- delivery-pipeline design depth remains available locally inside `codebase-design`;
- `devops-engineering` may later implement/operate the delivery system but is not required for this design-only architecture outcome.

Failure: the design is handed away solely because CI/CD is involved, or `codebase-design` cannot complete without a sibling Skill.

## Case AD3 - generic architecture discovery remains outside Codebase Design direct mode

Prompt shape: "Our delivery architecture feels messy. Find what architecture problem is actually worth fixing."

Expected target behavior:
- do not invent a fixed technical decision;
- candidate discovery remains the job of architecture-improvement/discovery capability;
- `codebase-design` activates only after a concrete decision is established or as bounded supporting depth.

Failure: `codebase-design` manufactures a boundary and treats it as approved.

## Case AD4 - delivery implementation remains DevOps-owned

Prompt shape: "Change our GitHub Actions and Terraform so verified artifacts are promoted without rebuilds, then validate the real provider path."

Expected target behavior:
- `devops-engineering` remains primary across design, repository/IaC mutation, provider execution, and runtime evidence;
- `codebase-design` may supply architecture depth only when a bounded architecture decision is material.

Failure: ownership transfers to `codebase-design` because architecture reasoning occurs during implementation.

## Proof state

These cases are frozen source-level falsifiers. Structural/source inspection may demonstrate boundary consistency; behavioral trigger/discovery claims remain `NOT_RUN` until executed on a representative Skill-enabled runtime.
