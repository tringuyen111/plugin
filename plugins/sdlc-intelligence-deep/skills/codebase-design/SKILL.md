---
name: codebase-design
description: Design one approved architecture-significant technical decision or module/interface boundary with source-grounded ownership, alternatives, compatibility, migration, rollback, and proof. Use when the fixed decision materially concerns durable ownership, interfaces, trust/provenance, lifecycle, cross-system constraints, or architecture trade-offs; do not use as the primary owner for routine/local CI/CD, IaC, promotion, or delivery-mechanics design merely because the request is design-only. Use as supporting architecture depth when another workflow owns candidate discovery, local delivery-system design, or implementation.
---

# Codebase Design

Design a fixed technical decision against **current project truth**, not an imagined architecture. Use deep-module ideas to reduce caller knowledge and concentrate responsibility, but preserve the repository's own meaningful names in artifacts. `service`, `component`, `API`, `boundary`, package names, and project-specific architecture terms may be canonical source vocabulary; map them to internal architecture concepts only when that improves reasoning.

This Skill has two modes:

- **Direct technical design** — the request names a fixed architecture-significant technical decision and needs the owner/interface/seam, alternatives, migration, rollback, and proof plan.
- **Supporting architecture depth** — another active task needs one bounded architecture judgment. Return that judgment to the caller; do not manufacture a second workflow owner or full design artifact.

## Conditional context

Load only the depth that can change the current decision:

- **WHEN** interface/seam placement, caller knowledge, depth/locality/leverage, reuse pressure, or testability can change the design **READ** [Deep-module architecture method](references/deep-module-method.md) **BECAUSE** it supplies the decision mechanism, project-language mapping, failure model, and contrastive cases.
- **WHEN** the decision concerns shared/foundation UI or frontend-system structure **READ** [Frontend System Design Reference](FRONTEND-SYSTEM-DESIGN.md).
- **WHEN** a backend/API operation contract needs retry, duplicate, concurrency, transaction, external-effect, continuation, error, or observability semantics **READ** [Backend / API System Design Reference](BACKEND-API-SYSTEM-DESIGN.md).
- **WHEN** durable data, schema, persistence, backfill, canonical/derived representation, or consistency changes **READ** [Data / Persistence System Design Reference](DATA-PERSISTENCE-SYSTEM-DESIGN.md).
- **WHEN** authentication, authorization, isolation, session/token lifecycle, secrets, signed requests, replay/abuse resistance, or another security enforcement seam is material **READ** [Security / Auth System Design Reference](SECURITY-SYSTEM-DESIGN.md).
- **WHEN** a fixed delivery-related decision is **architecture-significant** because ownership, trust/provenance, lifecycle, interface, cross-system constraints, or durable trade-offs materially exceed routine/local CI/CD, IaC, promotion, or delivery mechanics **READ** [Delivery Pipeline System Design Reference](DELIVERY-PIPELINE-SYSTEM-DESIGN.md). Routine/local delivery-system design remains outside this Skill's primary scope even when the request is design-only; this depth may still support a broader delivery/production job.
- **WHEN** a real decision still has materially different seam/interface options after mechanism economy **READ** [Design It Twice](DESIGN-IT-TWICE.md) **TO** isolate and compare alternatives without contaminating them.
- **WHEN** an existing dependency cluster may be deepened/consolidated **READ** [Deepening](DEEPENING.md) **TO** apply the evidence-based fit gate rather than refactoring by shape.
- **WHEN** graph, matrix, state-transition, or sequence representation would preserve decision-changing relations that prose hides **READ** [Technical Design Representations](TECHNICAL-DESIGN-REPRESENTATIONS.md).

Read project-native decision authority and artifact-location rules when a durable write is requested. Ordinary design analysis does not require a Plugin-global workflow/profile record; protected external/source effects require their real authority.

## Preconditions

For direct owner mode, resolve:

- approved Product/BA/Design behavior the technical design must preserve;
- exact decision question and affected runtime path;
- current source, callers, tests, data/state truth, integrations, and applicable ADRs/contracts;
- compatibility, migration, rollback, security, performance, and operational constraints;
- authorized destination and decision owner for any durable design artifact.

If the request is only generic “clean up architecture” with no observed friction or fixed decision, do not invent a boundary. Use `/improve-codebase-architecture` for evidence-grounded candidate discovery. If the fixed question is routine/local CI/CD, IaC, promotion, workflow, or delivery-mechanics design, keep that delivery-system job outside direct owner mode unless architecture-significant cross-system trade-offs are the actual terminal decision. Use `/domain-modeling` only when domain terms/invariants themselves are unresolved; it does not choose the code seam.

## Technical design workflow

1. **Freeze the decision.** State the exact approved behavior, technical uncertainty, current fixed point, non-goals, and decisions owned outside Engineering.
2. **Inspect the real path.** Bind current project names and map owners, callers, contracts/interfaces, leaked implementation knowledge, tests, runtime entry points, persistence/integration edges, and failure behavior. Do not rename the system to fit this Skill's vocabulary.
3. **Resolve meaning before mechanism.** Read the project glossary/rules/ADRs that actually govern the decision. Keep material current truth `UNKNOWN` when source/runtime evidence cannot establish it; do not substitute framework memory.
4. **Apply mechanism economy.** First test whether no new mechanism, the existing canonical owner/seam, a standard/runtime primitive, a supported platform capability, or an approved installed dependency already satisfies the decision. Do not invent an abstraction or adapter solely for symmetry, hypothetical reuse, or testing convenience.
5. **Generate alternatives only when a real decision remains.** Compare the smallest set of materially different owner/interface/seam options. Use at least two only when evidence leaves at least two real alternatives; never fabricate a custom option to meet a count. Load `DESIGN-IT-TWICE.md` when alternative isolation is material.
6. **Compare the mechanisms.** Evaluate semantic ownership, caller knowledge, locality/leverage, proof surface, observability, data consistency, trust/security boundaries, provider coupling, compatibility, migration/rollback, failure isolation, deployment/lifecycle independence, performance, and current change pressure. File count or diagram neatness is not an architecture metric.
7. **Choose or preserve uncertainty.** Recommend one option only when evidence and authority support it. Record rejected alternatives and the evidence that eliminated them; return `PARTIAL` when an owner decision or current fact can still change the result.
8. **Classify delivery impact.** Use `NONE | CONTAINED | SHARED | FOUNDATION` only from current source-grounded consumers/invariants. `FOUNDATION` requires an actual dependent correctness need, not hypothetical future reuse. Name the minimum runway and one representative path through real boundaries when shared/foundation work is material.
9. **Define falsifiable delivery proof.** Name the representative tests/runtime probes, migration/cutover/rollback checks, compatibility obligations, telemetry/failure signals, and evidence that would falsify the design. A design artifact specifies proof; it does not claim those probes already ran.
10. **Persist truthfully.** Write an ADR/technical design only at an authorized project location. Reopen the written artifact, verify links/status, preserve project-native terminology or an explicit mapping legend, and never mark a proposal accepted without the named owner.

## Replacement, version, and database discipline

When replacing an active path, state `REPLACEMENT_IN_PROGRESS`, `SUPPORTED_COEXISTENCE`, or `REMOVE`. Compatibility/version seams require named current consumers and an intentional support window; hypothetical callers do not justify parallel APIs. Define parity, cutover, removal surface, and rollback/recovery evidence.

For schema/data changes, classify the environment as `EPHEMERAL`, `SHARED_TEST`, `UPGRADE_REHEARSAL`, or `PRODUCTION`. Local/staging names do not establish disposal rights. A disposable pre-release baseline may reset only without durable consumers and with checksum, empty-to-latest, and failure-path proof. A released upgrade uses a new migration plus previous-release-to-latest evidence; do not squash away a supported upgrade path.

## Required technical design semantics

Preserve a **decision spine**, not fixed headings:

- decision question, fixed point, approved behavior/constraints, non-goals;
- current owner/runtime path and the source evidence that constrains it;
- mechanism-economy result, materially different alternatives if any, comparison, selected owner/interface/seam/adapters, and rejected trade-offs;
- hidden responsibility plus material data/error/effect/ordering/observability/security/performance/operational contracts;
- shared/foundation runway when material, compatibility/migration/coexistence/removal/rollback, downstream impact;
- proof plan/falsifiers, approval/open decisions, decision status, and persistence result when authorized.

Use project-native terms in the artifact. Add a small analytical legend only when mapping to concepts such as owner/interface/seam/depth materially clarifies the design. Use prose by default; use graph/matrix/state/sequence only when it preserves relations prose would hide. Decorative diagrams are not completion evidence.

## Completion

- `READY` — the technical decision is source-grounded, approved or explicitly ready for the named approver, real alternatives/trade-offs are visible when they exist, and migration/rollback/proof are defined.
- `PARTIAL` — a useful design exists but source, constraint, approval, migration, or proof evidence remains incomplete.
- `BLOCKED` — fixed behavior, representative source path, required authority, or a non-negotiable constraint is unavailable.
- `FAILED` — an authorized write/design artifact contradicts its declared source/decision and no safe recovery preserves the result.

A technical design does not implement the change, rewrite Product/BA/Design truth, claim QA/release readiness, or upgrade unexecuted proof to runtime success.
