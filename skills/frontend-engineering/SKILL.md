---
name: frontend-engineering
description: Execute one approved production frontend implementation unit under the SDLC implementation owner, including frontend-system reconstruction, foundation readiness, economical component/state composition, real browser/runtime inspection, responsive/accessibility developer proof, and truthful domain closure. Use as an explicit-or-orchestrated supporting capability for materially frontend work; do not own visual design approval, Visual QA, Product behavior, technical-design approval, or overall work-item completion.
---

# Frontend Engineering

Read [Domain Execution Kernel](../../resources/shared/references/domain-execution-kernel.md) first. Read the
approved [Frontend System Design Reference](../codebase-design/FRONTEND-SYSTEM-DESIGN.md)
only for the material frontend seams of the ACTIVE unit.

Own one deep frontend execution unit under `/implement`. Do not turn the unit into a second work
item or take Design/Architecture/QA authority.

## Entry gate

Require the caller to provide the canonical work item/revision, ACTIVE semantic unit, approved
behavior/AC/NFR, approved Visual Contract when UI changes, applicable technical decision,
current work type/blockers, proof target, source/runtime baseline, and exact source-write scope.

If shared/foundation UI impact is approved but its required decision or predecessor is missing,
return the blocker. Do not compensate with page-local CSS/components.

## Frontend execution loop

1. **Reconstruct the production frontend system.** Inspect the real app/browser entry path,
   route/layout shell, token/styling pipeline, component catalog and callers, state ownership,
   data/loading/error boundaries, responsive modes, accessibility semantics, tests and browser
   evidence. Distinguish canonical system contracts from prototype or duplicated local patterns.
   When shared UI reuse/catalog drift is material, use `scripts/ui_registry.py scan` for
   read-only evidence. Bootstrap or reconcile a registry only when the project/caller has already
   selected an authoritative project-relative `--registry-dir`; never create a hidden default
   `.design-engineering` state namespace. Registry evidence does not create Design authority.
2. **Bind approved visual/technical truth.** Map the Visual Contract roles/states and accepted
   frontend decision to actual source seams. If the implementation would require inventing a
   component role, visual state, navigation behavior, or architecture decision, return the gap.
   When an approved Visual Contract/technical decision calls for token implementation, the
   optional helpers under `scripts/design-tokens/` and references under `references/design-system`
   may generate or validate implementation artifacts. Their output is subordinate to the approved
   token roles and repository stack; it never becomes a second canonical Visual Contract. A parent
   route may compose `/design-intelligence` for local evidence, but corpus recommendations remain
   advisory and cannot override approved project truth.
3. **Respect foundation readiness.** For `FOUNDATION`, implement only the minimum shared
   primitive/system seam proved by current consumers. For `WALKING_SKELETON`, exercise one thin
   real screen/flow through that foundation. For `VERTICAL_SLICE`, compose only from ready
   prerequisites. Do not build all pages and refactor the system later.
4. **Apply engineering economy.** Reuse the canonical system, platform/browser capability, or
   approved installed library when it satisfies the contract. Extend the existing interface
   before creating a sibling abstraction. Do not optimize for one-line JSX/CSS or fewest files.
5. **Compose production UI.** Keep truth at the correct layer: shared tokens/primitives,
   component contracts, feature composition, client/server state, and data adapters. A local
   override that changes a shared role/state is a system-impact signal, not a convenient fix.
6. **Exercise material states.** Cover the states that can falsify the unit: loading, empty,
   error, disabled, optimistic/pending, validation, long content, overflow, focus/keyboard,
   reduced-motion or other approved accessibility behavior, responsive transitions, and large
   data when material. Do not manufacture irrelevant state matrices.
7. **Inspect the real browser mechanism.** Run the smallest representative browser path after
   code executes. Inspect rendered output, interaction, focus/keyboard, console errors,
   hydration/client-server mismatches, relevant network behavior and declared viewports/states.
   Static HTML or source inspection does not prove runtime interaction.
8. **Rerun affected siblings.** Recheck shared component/token/layout callers at a scope
   proportionate to the change. If a shared fix breaks a sibling, correct the canonical contract
   rather than layering per-page exceptions.
9. **Return closure evidence.** Return source revision, changed frontend seam/callers,
   red/green/targeted commands, browser evidence, inspected states/viewports, proof limitations,
   discoveries and truthful domain state to `/implement`.

## Hard boundaries

- Prototype bytes are implementation input, never production proof by inheritance.
- Visual similarity is not Visual QA approval.
- Client-side hiding/state is not server authorization or canonical durable truth.
- A screenshot cannot prove keyboard, hydration, network, or state-transition behavior.
- A component library is not created “for consistency” without current approved shared need.

## Completion

`READY` means this bounded frontend unit is implemented at the approved seam and its material
developer-facing browser/runtime proof is present. It does not mean Design approved a visual
change, Visual QA/QA passed, or the parent work item is complete. Preserve `PARTIAL`, `BLOCKED`,
or `FAILED` when approved visual/technical truth, foundation readiness, browser/runtime
capability, write authority, or required proof is missing.
