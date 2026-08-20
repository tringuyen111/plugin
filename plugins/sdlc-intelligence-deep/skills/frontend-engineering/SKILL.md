---
name: frontend-engineering
description: Implement production frontend changes when browser/runtime behavior is the dominant boundary, including state/lifecycle, component composition, runtime/performance, responsive/accessibility behavior, and real-browser proof. Use as bounded frontend depth in broader implementation; not as code-review or owner of Product behavior, Design approval, architecture/security policy, or QA verdicts.
---

# Frontend Engineering

Treat approved frontend-system decisions as project input when material; do not import a sibling Skill's design file as authority. If a shared UI-system or architecture decision is missing, surface that decision instead of hiding it in feature-local implementation.

Load expert depth conditionally:

- When correctness depends on where URL/server/local/form/derived/shared/persisted/optimistic state lives, what semantic identity preserves or resets it, or how draft/remote/optimistic truth reconciles, read [Frontend State Authority and Lifecycle](references/state-authority-and-lifecycle.md). Use its semantic-state decision table and lifecycle falsifiers; do not globalize/persist/URL-bind state by habit.
- When correctness or performance depends on async request graphs, client async-result freshness/supersession/cancellation ownership, React/Next server-client boundaries, hydration, bundle loading, reactive invalidation/rerenders, caching/deduplication, rendering cost, or interaction responsiveness/main-thread pressure, read [Frontend Runtime and Performance](references/runtime-performance.md). Apply framework-specific branches only when repository/runtime evidence establishes that framework; when supersession is material, use the authority state-transition SHOW to separate commit authority from transport cancellation.
- When closure depends on browser interaction, focus/keyboard, responsive behavior, accessibility semantics, hydration, network/error states, or real rendered output, read [Browser Proof Discipline](references/browser-proof.md). Separate semantics required by an already-approved platform/pattern contract from unresolved Product/Design choices, then use its claim-to-falsifier matrix when a plausible artifact may be relevant but unable to disprove the claim.
- Load the existing `references/design-system/` material only when approved project truth actually requires token/design-system implementation. Its example values are implementation examples, never project visual truth.

## Entry gate

Establish the exact frontend outcome, inspected production/browser seam, fixed Product/behavior/visual truth that constrains the change, relevant technical decisions, source-write scope, and a falsifiable browser/runtime proof target. A tracker, work item, semantic ledger, or parent `/implement` invocation is not required.

If the change would require a new Product behavior, UX/visual decision, architecture decision, or security policy, stop that affected part and name the missing decision. Do not compensate with page-local CSS/components or convenient behavior.

## Frontend execution loop

1. **Reconstruct the production frontend mechanism.** Inspect the real app/browser entry path, framework/runtime and rendering boundaries, route/layout shell, token/styling pipeline, component catalog/callers, semantic state owners and lifetimes, request/data boundaries, loading/error behavior, responsive modes, accessibility semantics, tests, bundle/runtime evidence and representative browser behavior. Distinguish canonical contracts from prototypes or duplicated local patterns. When shared UI reuse/catalog drift is material, `scripts/ui_registry.py scan` may provide read-only evidence. Write a registry only when the project already selected an authoritative project-relative `--registry-dir`.
2. **Bind approved visual and technical truth.** Map approved roles/states and accepted frontend decisions to actual seams. Preserve intentional design specificity rather than normalizing it to generic convenience, but never invent an aesthetic, component role, navigation behavior or visual state from market guidance. If a new Design/architecture decision is required, return the gap.
3. **Select only the expert lens that can change the implementation decision.** Use the state-authority reference when state identity, ownership, lifetime, reset/rebase, duplicate truth or optimistic convergence can change correctness. Use the runtime/performance reference for request-graph, rendering, hydration, bundle, reactive or performance mechanisms. Use the browser-proof reference for interaction/runtime closure. Use token helpers/references only for approved token work. If browser credential attachment, cross-site request semantics, authorization, sensitive data, or another security boundary becomes material, load `security-engineering` expertise for implementation mechanics when useful; if the policy itself is unresolved, stop and surface the policy gap instead of deciding it inside frontend implementation.
4. **Respect actual shared prerequisites.** When the change depends on a shared token, primitive, component contract, layout shell, data adapter, or other foundation seam, verify the existing consumers and readiness of that real dependency before building on it. Do not invent planning labels or a foundation project merely because the change crosses files.
5. **Apply engineering economy at the real seam.** Reuse the canonical platform/library/component/state mechanism when it satisfies the contract. Extend the existing interface before creating a sibling abstraction. Do not optimize for fewer files, fashionable abstractions, memoization everywhere, code splitting everywhere, or a new state library without evidence of the corresponding pressure.
6. **Implement the smallest coherent production UI change.** Keep truth at the correct layer. For material state, name the semantic fact, authority, lifetime/reset identity and transition before choosing URL/router, remote data/cache, form/draft, derived, local, shared, persisted or optimistic storage. Prefer derivation over synchronized duplicates; keep remote canonical truth distinct from drafts and optimistic projections. A local override that changes a shared role/state is a system-impact signal, not a convenient fix.
7. **Exercise material states and failure paths.** Cover only states that can falsify the unit: loading, empty, error, disabled, pending/optimistic, validation, identity switch/reset, draft versus remote refresh, navigation/reload/back behavior, overlapping mutation where material, long content, overflow, focus/keyboard, reduced motion, responsive transitions, hydration, degraded network, large data, or security-relevant browser behavior when applicable. Do not manufacture a state matrix for irrelevant risks.
8. **Prove the real consumed mechanism.** Run the smallest representative browser/runtime path after code executes. Inspect the evidence surface required by the claim: user-visible interaction, focus/keyboard, console/hydration errors, relevant network behavior, declared viewports/content stress, rendering or bundle/runtime measurements. A screenshot, static DOM node, unit mock, green typecheck, or micro-benchmark proves only its exercised boundary.
9. **Challenge affected siblings and the claimed cause.** Recheck shared component/token/layout callers at scope proportionate to the change. For performance work, prove that the selected mechanism actually changed the measured critical path rather than merely moving work. If a shared fix breaks a sibling, repair the canonical contract rather than layering feature-local exceptions.
10. **Report bounded frontend evidence.** Report the changed frontend seam/callers, expert lens loaded, commands/probes and observed outputs, browser/runtime evidence, inspected states/viewports, substituted boundaries, proof limitations, and unresolved decisions.

## Hard boundaries

- Prototype bytes are implementation input, never production proof by inheritance.
- Visual similarity is not Design approval or QA visual-conformance proof.
- Market knowledge is advisory expertise, never canonical project Product/Design truth.
- Client-side hiding/state is not server authorization or canonical durable truth.
- A screenshot cannot prove keyboard, hydration, network, accessibility semantics, or state-transition behavior.
- Framework-specific guidance is inactive until the inspected repository/runtime establishes that framework and the mechanism is material.
- A component library or design system is not created "for consistency" without current approved shared need.

## Completion

`READY` means this bounded frontend unit is implemented at the approved/established production seam and every **materially activated** expert lens has claim-relevant developer evidence, including real browser/runtime proof when the claim depends on it. It does not mean Design approved a visual change, QA passed, security policy was accepted, or a broader delivery outcome is complete. Preserve `PARTIAL`, `BLOCKED`, or `FAILED` when material visual/technical/security truth, foundation readiness, browser/runtime capability, write authority, or required proof is missing.
