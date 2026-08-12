---
name: implement
description: Implement an approved work item through source-grounded baseline, test-first vertical slices, runtime/output verification, code review, and truthful handoff.
---

# Implement
<!-- runtime-context:start -->

## Runtime context

- **Final result / owner transition:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) before reporting completion or continuing across an owner boundary.
- **Owner, approval, or artifact conflict:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) before deciding.
- **Deep implementation:** read [Semantic Continuity Contract](../../resources/shared/references/semantic-continuity-contract.md) before activating the approved frontier unit.
- **Write / source control / deploy / destructive / communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) before acting.
- **Tracker / repository / storage / browser / connector / provider / tool choice or fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) before choosing.
- **Replacement / removal / versioning / schema-data history:** read [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md) before changing the supported path.

<!-- runtime-context:end -->


Implement one approved work item without taking Product, BA, Design, or QA
decisions.

## Preconditions

Resolve the canonical work item and its current approved artifacts:

- Product scope or explicit technical mandate;
- Behavior Package and AC/NFR when user behavior changes;
- approved UX/Visual Contract when the UI changes;
- ADR, approved technical constraints, and any material domain technical-design extension when relevant;
- evidence target and selected project task-status owner;
- proof that the item belongs to the current approved frontier: approved revision binding, current canonical state, completed blockers, and accounted material semantic obligations for this item.

If material semantic coverage is missing, return to Planning rather than silently shrinking the work item. If a required decision is unresolved, externalize a `DISCOVERY_GAP` and route to its owner instead of inventing it inside implementation.

## Process

1. **Read project authority.** Read workspace/repository rules, the canonical work
   item, project-authorized domain context and accepted decisions, and current
   source. Treat `CONTEXT.md` or an ADR directory as authority only when the
   project capability/profile selects that convention. Do not trust a prior
   summary when source or runtime can be inspected. Map the wider item shallowly
   for dependencies, then deep-activate exactly one material semantic unit; do
   not deep-load all future slices merely because they share the work item.
2. **Apply [Engineering Evidence Discipline](../../resources/shared/references/ENGINEERING-EVIDENCE-DISCIPLINE.md).** Reconstruct
   the ACTIVE unit's expected truth and proof boundary from canonical sources
   before relying on existing tests or implementation claims, then map related
   source/runtime entrypoints and establish the current baseline. Record
   unrelated baseline failures separately.
3. **Select the smallest sufficient implementation mechanism.** Apply [Engineering Economy Discipline](../../resources/shared/references/engineering-economy-discipline.md) after the baseline and before the first mutation. Reuse or extend the first canonical mechanism that passes the fit gate; introduce a new dependency or custom mechanism only when cheaper rungs are insufficient for approved semantics/proof. If a bug is being remediated, consume `/diagnosing-bugs` root-cause evidence rather than treating the reported symptom as the faulty seam, then map affected sibling callers before mutation.
4. **Bind material domain ownership and design truth.** Classify only the technical domains whose approved semantics can change implementation correctness. Use the `BUILD` route's allowed `supporting_skills` plus the path-only child resolver; do not load the complete runtime-context map or every specialist prompt merely to discover options. `/implement` remains the primary work-item owner. Compose only the material specialist(s), which load their own deep domain references and return bounded closure evidence:

   - shared/foundation UI-system, component/token, state, responsive, accessibility, or large-data behavior -> `/frontend-engineering`;
   - backend use-case, transaction, side-effect, concurrency, recovery, or operational behavior -> `/backend-engineering`;
   - caller-visible API operation/request/response, compatibility, validation, continuation, retry/idempotency, or error semantics -> `/api-engineering`;
   - durable schema/persistence, migration/backfill, query/write consistency, invariant, derived-data, or recovery behavior -> `/data-persistence-engineering`;
   - authentication, authorization, tenant/resource isolation, session/token lifecycle, signed-request/replay, secrets, or another security enforcement seam -> `/security-engineering`.

   If a required specialist is unavailable, keep `/implement` as owner, load only the matching fallback reference, and state that specialist behavioral evidence is unavailable: [Frontend](../codebase-design/FRONTEND-SYSTEM-DESIGN.md), [Backend/API](../codebase-design/BACKEND-API-SYSTEM-DESIGN.md), [Data/Persistence](../codebase-design/DATA-PERSISTENCE-SYSTEM-DESIGN.md), or [Security/Auth](../codebase-design/SECURITY-SYSTEM-DESIGN.md). For material CI/CD workflow/configuration, build/test orchestration, artifact publication/promotion, runner/cache/permission semantics, or environment delivery gates, keep ownership local to `/implement` and load [Delivery Pipeline System Design Reference](../codebase-design/DELIVERY-PIPELINE-SYSTEM-DESIGN.md). Repository evidence and provider-side execution/policy state remain separate proof surfaces; missing representative provider evidence stays visible rather than being upgraded from local validation.

   Load no unrelated domain depth. If one ACTIVE unit genuinely spans inseparable material domains, compose those domains only; otherwise split the proof boundaries. Approved technical references constrain conformance but do not transfer technical-design or policy ownership. Bind each activated domain invariant to its real source/runtime seam and falsifiable proof boundary. If that exposes missing, contradictory, or technically impossible upstream truth, externalize a `DISCOVERY_GAP`, checkpoint/suspend the ACTIVE unit, and route its owner instead of inventing behavior while coding.
5. **Resolve test seams.** Invoke `/tdd` where behavior can be built through a
   stable public seam. Use approved contracts and existing tests before asking
   the user; ask only when multiple materially different public seams remain.
6. **Implement the approved work type.** Apply [Foundation-Aware Delivery Discipline](../../resources/shared/references/foundation-aware-delivery-discipline.md) and verify any `FOUNDATION`, `MIGRATION`, or `WALKING_SKELETON` predecessors required by the active frontier before composing a dependent `VERTICAL_SLICE`. For the current work item, use one red test/probe, one smallest coherent change, one green result. Keep the system runnable between slices. Do not
   add speculative hooks or unrelated refactors. A material discovery is
   externalized before execution continues: use REFINE/DERIVE/SPLIT when the
   consequence is justified within authority, or create a `DISCOVERY_GAP`,
   checkpoint/suspend the ACTIVE unit, and route the unresolved truth owner. Do
   not keep a material discovery as an in-memory TODO or choose a convenient
   product/Design behavior to stay green.
   When a slice replaces an existing path, parity must be explicit. Before parity, keep one path canonical and do not call the replacement complete. After parity, migrate callers and remove the old or superseded implementation, tests, fixtures, docs, configuration, routes, telemetry, and fallback in the same coherent change. Git—not `legacy`, `backup`, or `v2` files—keeps history.
7. **Rerun affected paths.** Run targeted tests regularly, type/static checks as
   relevant, and the affected integration/runtime workflow after meaningful
   changes. Run broader regression appropriate to the blast radius at the end.
   Preserve the proof boundary of every developer probe: when a mock, fake,
   in-memory adapter, static render, or other substitute bypasses the material
   production mechanism, carry forward what that green result proves and what it
   does not prove. Do not upgrade narrow developer evidence into API retry,
   database concurrency/migration, security enforcement, browser interaction, or
   other integration proof merely because the local test is green.
8. **Inspect real output and challenge the ACTIVE unit.** Open UI/screenshots,
   inspect API responses/errors, query data invariants, review logs/manifests,
   or inspect generated artifacts according to what users and systems consume.
   Before closure, look for contradiction, missing sibling/material behavior,
   weak evidence binding, and value lost if the claim is false. New evidence may
   reopen, contradict, or expand the semantic obligation instead of merely
   confirming the implementation.
9. **Invoke `/code-review` and close the remediation loop.** Review one frozen
   change surface against repository Standards and the approved Spec/AC. If a
   blocking finding is owned by implementation, remediate it; any source,
   configuration, migration, or test mutation after that review invalidates the
   prior review binding for final handoff. After remediation, rerun the affected
   developer checks, capture a new immutable change surface, and invoke
   `/code-review` again. Repeat the review/remediation loop until the latest
   reviewed surface has no unresolved blocking findings. If a finding belongs to
   another owner or required correction/evidence cannot be completed safely,
   route it or exit `PARTIAL`, `BLOCKED`, or `FAILED` rather than handing off an
   unreviewed remediation. A prior clean or blocking review does not prove a
   later diff.
10. **Prepare QA continuation.** Link implementation evidence and the exact latest reviewed change surface/review revision, name remaining QA/visual/security/performance/UAT/release checks, and identify the next owner. Prefer canonical evidence plus next-owner routing metadata when QA can reconstruct the required state. Materialize `/handoff` only when a real owner/session/runtime/persistence boundary requires continuation state that cannot safely be reconstructed. Only the latest reviewed surface may support `READY_FOR_QA`; developer tests and review never pre-populate a QA verdict.
11. **Update canonical work truth.** Reconcile AC/invariants and evidence in the
   selected tracker or task file. Do not create a competing status ledger.
12. **Commit according to policy.** Commit only when repository workflow, user
    instruction, or workspace policy expects it. Otherwise leave a reviewed diff
    and report the exact uncommitted state.

## Completion

Keep **implementation workflow state** separate from **QA continuation readiness**.
`READY_FOR_QA` is a domain routing/continuation label: it means coherent source, targeted and affected-path evidence, inspected output where relevant, a latest reviewed immutable change surface with no unresolved implementation-owned blockers, truthful known failures, and enough canonical evidence/continuation state for the QA owner. It is not a QA verdict and does not mean QA passed.

- `READY` — the declared implementation scope completed truthfully, every
  activated domain lens is bound to the implemented seam and satisfied or
  truthfully routed/dispositioned, required implementation evidence and output
  inspection are present, the latest reviewed change surface has no unresolved
  implementation-owned code-review blockers (or they are correctly routed),
  canonical work evidence is reconciled, and QA continuation can be marked
  `READY_FOR_QA` when applicable.
- `PARTIAL` — useful implementation exists but a required proof, review,
  canonical-work update, or QA-continuation input remains incomplete.
- `BLOCKED` — a required upstream decision, approved frontier condition,
  authority, environment, or capability prevents safe continuation.
- `FAILED` — an attempted required mutation, verification, canonical-work write,
  or commit operation failed or left unverified state.

For every material implementation exit, expose the Semantic Continuity child
exit meanings: ACTIVE semantic unit, current truth state, material semantic
deltas/discoveries, real evidence inspected with revision/provenance binding,
challenge outcome, open material children/gaps, checkpoint/persistence result,
and why the unit may close, suspend, block, or continue-to-prove. Narrative
"done" is insufficient.

Implementation `READY` closes only this workflow's declared scope. It does not
make a parent semantic obligation `PROVEN` when material child proof or a
discovery branch remains open. Developer evidence never pre-populates a QA
verdict, UAT acceptance, or release readiness.
