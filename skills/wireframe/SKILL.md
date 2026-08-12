---
name: wireframe
description: Create or review a low-fidelity screen structure from an approved user flow. Use when layout, information hierarchy, grouping, primary action, content order, or device-specific arrangement is unclear but polished visual style is not yet the question.
---

# Wireframe
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before inventorying/refining material behavior that downstream work must preserve:** read [Semantic Continuity Contract](../../resources/shared/references/semantic-continuity-contract.md) to keep material obligations, discoveries, and proof-relevant behavior from disappearing during Design refinement.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->


Define low-fidelity layout and information hierarchy for a specific user state.

A wireframe is not a visual-design approval and not frontend implementation.

Read `WIREFRAME-CONTRACT.md` before creating the artifact. Preserve the canonical wireframe identity, project truth location, revision and maturity, Design owner, unresolved Design decisions, inspection evidence when material, affected artifacts, and next owner/route without copying downstream status into the wireframe.

## Process

1. **Resolve the state.** Select one screen/state at one time from the approved
   flow. Mutually exclusive states receive separate wireframes.
2. **Resolve device assumptions.** Use an approved `primary_device`, Design
   system, or Product constraint when present. If no source exists and the
   choice materially changes layout, ask the user to choose mobile, tablet,
   desktop, or truly responsive coverage. Do not ask again when already decided.
3. **Inventory content and actions.** Pull exact fields, business meaning,
   validations, wording, states, errors, and navigation from source artifacts.
   Mark missing source instead of inventing values.
4. **Preserve semantic continuity.** Apply the Semantic Continuity Contract to
   material behavior exposed by the inventory. Consume/refine existing truth,
   derive or split only when material, and externalize an unresolved choice as
   a discovery gap instead of silently omitting it or treating absence as N/A.
5. **Preserve resolved interaction semantics.** Consume the approved user-flow
   navigation/continuation model and valid-next-state behavior. Do not replace it
   with a familiar wireframe pattern merely because a list/card/template makes
   that pattern convenient. When a materially different interaction model seems
   necessary, externalize the Design decision instead of silently substituting.
6. **Set hierarchy.** Identify page purpose, primary action, secondary actions,
   critical status, supporting context, and content order.
7. **Challenge information economy.** For repeated facts, counters, labels, icons,
   and directional cues, ask what distinct user question, decision, state, or
   action each occurrence serves. Remove or consolidate repetition that exists
   only because multiple component slots can display it. Do not de-duplicate
   information that serves materially different tasks or states.
8. **Group by task.** Keep related information and actions together. Avoid a
   card grid as a default when a list, table, sequence, or focused form better
   expresses the task.
9. **Make affordance semantics explicit.** For material interactive structures,
   distinguish the interaction target from nested actions, directional cues,
   status/identity signals, and decoration. If the whole row is the action, a
   nested chevron/icon must not remain ambiguous as a second action. Repeated
   decorative cues must earn information or interaction value rather than merely
   filling a layout slot. Keep visual styling details open for Visual Design.
10. **Respect form density.** Focused forms and dialogs use a constrained content
   width; dashboards/lists may use the available workspace. Do not stretch a
   simple auth form across a desktop canvas.
11. **Annotate behavior.** Each important element links to its field meaning,
   rule/AC, state, navigation, error, interaction-target semantics, or edge
   behavior. Keep annotations concise but sufficient for BA, Design, Engineering,
   and QA.
12. **Choose artifact form.** ASCII or simple HTML is acceptable. Figma is not
   required. The artifact must be inspectable at the declared dimensions. Record
   the inspected revision/evidence when that inspection controls a handoff.
13. **Preserve continuity.** Bind the artifact to one canonical project truth
   location, record its Design maturity and owner, keep unresolved inputs/Design
   decisions visible, name affected artifacts, and hand off through the declared
   next owner/route. Do not mirror implementation, QA, UAT, or release status.

## Completion

`READY` requires one state, declared device assumptions, clear hierarchy,
source-grounded content/actions, preserved material user-flow interaction
semantics, challenged information economy, unambiguous material affordance
semantics, behavior annotations, canonical wireframe
identity with revision and maturity, explicit missing inputs and unresolved
Design decisions, inspection evidence when material, and a truthful next owner.
Every material incoming/refined/discovered behavior must remain visible through
semantic lineage, an explicit discovery gap, or another valid continuity state;
narrative completion cannot hide a dropped obligation. Color, typography,
brand, and final component styling remain open.
