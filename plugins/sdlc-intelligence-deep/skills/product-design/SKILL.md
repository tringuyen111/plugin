---
name: product-design
description: Design or revise product/application experiences and interfaces from approved Product/behavior truth, real content, and current product/design-system evidence. Use for product UI/UX authoring, direct user-flow or wireframe requests, screen/page redesign, responsive/state design, information architecture, visual composition, or design-system composition when one coherent Design owner must reason across interaction, structure/layout, components, typography, color, material/planes, and whole-page craft. Select the minimum faithful representation and render/inspect/recompose when visible quality is material. Do not use for critique-only review of a fixed artifact, formal QA visual-conformance acceptance, runtime prototype experiments, logo/marketing collateral, or production frontend implementation.
---

# Product Design

Produce coherent Product/UI Design truth, not a sequence of ceremonial artifacts.

Own one coupled design cognition from the user's task and approved behavior through experience structure, construction, interaction, visual composition, system coherence, and Design handoff. A flow, wireframe, high-fidelity composition, system specimen, or Design-truth projection is a **representation of this job**, not a mandatory lifecycle stage.

Do not invent Product behavior, business rules, user evidence, platform constraints, Design-System authority, technical architecture, or QA approval. When source truth is unresolved, expose the gap rather than designing around it.

## Universal design loop

1. **Bind truth and the real surface.** Establish approved/current Product and behavior truth, user/task boundary, real content/data pressure, relevant states, usable viewport geometry, input capabilities/modes, current product UI and Design System/source-of-truth when one exists, and the available authoring/rendering surface. Current UI is evidence, not automatic authority.
2. **Name the active Design question.** State what must become clearer: journey/IA, task progression, construction/layout, comparison/density, hierarchy/craft, system reuse, state continuity, color/type/material composition, responsive behavior, or another bounded Design uncertainty.
3. **Choose the minimum faithful representation.** Use the fidelity frontier below. Increase fidelity only when the current representation cannot answer the material question.
4. **Construct one scene through several simultaneous graphs.** Start from what the user must find, understand, compare, decide, and act on. Build semantic, layout, component, style/type/token, and plane/interaction relations for the same artifact; do not collapse them into one container tree.
5. **Compose the whole.** Decide hierarchy, grouping, grid/flow, spacing, typography, color, shape/material, controls, states, and adaptation as coupled variables. Re-enter the whole scene after local component decisions.
6. **Render and inspect when visible composition is material.** A clean layer tree or textual contract cannot prove visual craft. Inspect real output with real or representative content at both component and whole-scene scale.
7. **Diagnose causally and recompose.** Treat the visible symptom as evidence, not the cause. Name the relation that failed; when more than one Design lens can plausibly explain it, test discriminating evidence before choosing the causal owner and smallest coherent correction lever, then re-render. Correct ownership/composition before adding local exceptions or shotgun styling changes.
8. **Stress and persist.** Exercise material content, states, width/height/usable-viewport pressure, localization/text scaling, overlays/keyboard, input-mode changes, repetition, and representative system consumers. Persist only decisions/evidence needed downstream.

## Product Design Scene Model

For visible Product UI, hold these graphs **at the same time**. One node can participate in several graphs; the graphs answer different questions.

```text
SEMANTIC        what does it mean / what task relation exists?
  page -> region -> content -> action/state

LAYOUT          how does geometry stay coherent under content/constraint change?
  owner -> flow/grid -> anchors -> sizing -> spacing -> adaptation

COMPONENT       what is reused, invariant, variable, or locally contextual?
  component -> slot -> variant/state -> instance -> authorized override

STYLE / TYPE    how is visual meaning expressed consistently?
  semantic role -> token/style -> mode/theme -> consumer
  text role -> type style -> component slot -> content pressure

PLANE / INPUT   what is in front/behind, clipped, persistent, transient, or interactive first?
  contains / clips / scrolls-with / fixed-to / overlays / occludes / anchors-to / blocks-input-to
```

Use the semantic graph to decide **meaning**; layout graph for **geometric responsibility**; component graph for **reuse/invariance**; style/type graph for **system language**; plane/input graph for **2.5D and interaction ordering**. Never use one graph as a proxy for all five.

### Construction responsibilities before tool objects

Choose the responsibility first; then choose the tool-specific object that can express it.

| Need | Positive selection rule |
|---|---|
| Structural container/frame | Use when a region owns explicit bounds, child layout/constraints, clipping/scrolling, responsive behavior, or a meaningful coordinate/surface context. |
| Group | Use when items need perceptual/transform grouping but no independent layout, clipping, surface, or reusable behavior contract. |
| Flow/grid | Use when sibling relations need stable ordering, rhythm, comparison anchors, wrapping, or repeatable alignment under content/viewport pressure. Grid is a relation field, not decoration. |
| Component | Create/reuse when the **same semantic job** needs stable anatomy/state behavior across consumers. Repetition alone is insufficient. |
| Slot/property/variant | Use slots for replaceable semantic regions; properties/variants for controlled dimensions of the same component job; split when the job or anatomy becomes materially different. |
| Token/style | Bind when a repeatable semantic design decision should survive value/theme/mode changes. Equal raw values do not prove one role. |
| Text role/style | Define by information function and repeated hierarchy behavior, then bind metrics/color/spacing appropriate to that role. Text participates in geometry. |
| Plane | Create a distinct plane when focus, persistence, occlusion, independent movement, or interaction priority truly changes—not because a shadow/radius token exists. |

For full selection mechanics and worked construction contrasts, **READ** [Construction System](references/construction-system.md).

## Whole-scene composition lens

Before a local styling change, run this short pass:

1. **Meaning:** what must the user notice, compare, understand, or act on first?
2. **Ownership:** which node owns layout, silhouette/surface, component anatomy, text role, and interaction state? These owners may differ.
3. **Relations:** which alignments/grid fields, spacing roles, component slots, style/token roles, and plane relations express that ownership?
4. **Visual distribution:** where do contrast, type weight/size, color chroma/lightness/temperature, negative space, shape, and depth accumulate? Attention is relative and has an occupied-area cost.
5. **Adaptation:** what semantic/component/style invariants survive when width, height, usable viewport, content, language, input capability, or state changes? What may recompose?
6. **Proof:** inspect part -> whole -> neighboring consumer/state/mode. Structural conformance and visual craft are separate proof obligations.

### Tiny transfer examples

- A title, form rows, and Save button need a parent that owns vertical layout and responsive bounds -> a structural container is justified; a visible card is a separate surface decision.
- Three visually similar promo blocks have different jobs/states and never update together -> repetition does **not** automatically make them one component.
- `24px` used for shell separation and card padding -> classify two relationships before choosing tokens; same value can represent different roles.
- A text role remains “supporting metadata” across compact and spacious modes even if size/line-height/wrap changes -> preserve semantic role, adapt geometry.
- The same blue token can look different on warm gray versus cool gray surroundings -> inspect contextual color interaction before inventing another semantic role.
- A table can own one silhouette while header/rows inherit clipping; status may own a pill because its semantic object role is different.
- A modal can be semantically inside a workflow but visually/input-wise above the page through scrim + focus/input blocking -> semantic containment is not the plane graph.

When a locally plausible answer still has multiple valid interpretations, load [Worked System Examples](references/worked-system-examples.md) rather than minting another rule.

## Representation / fidelity frontier

| Active question | Minimum faithful representation | Stop / escalate rule |
|---|---|---|
| Wider journey, information grouping, navigation topology | scenario/topology model | Stop when topology is resolved; do not draw screens by ceremony. |
| Local task progression, choices, waits, handoffs, recovery | typed interaction flow | Stop after flow if spatial/visual questions are not material. |
| Screen hierarchy, grouping, comparison, construction, density, placement | low-fidelity frame/wireframe + structural graph | Keep visual styling unresolved; escalate only when perceptual craft/system proof needs it. |
| Typography/color/material/whole-composition quality | rendered visual composition | Inspect and iterate; prose or token validity alone is insufficient proof. |
| Repeated component/system relationship, change propagation | system specimen + component/style graphs in representative contexts | Prove invariants, controlled variation, source-of-truth, and affected consumers before widening scope. |
| Interactive control anatomy / micro-geometry | control/state specimen in real context | Separate content/container/target and state/input ownership; inspect at component and page scale. |
| Timing, drag, focus, delayed completion, runtime continuity | hand to `prototype` | Product Design states the runtime question; Prototype owns executable learning. |

Direct requests such as **"make a user flow"** or **"make a wireframe"** should enter that branch immediately and stop proportionally. Do not force the user through the rest of this Skill.

## Perceptual invariants

- **Attention is a budget.** Contrast, type mass, chroma, area, enclosure, motion, and depth all compete for salience; allocate them according to task hierarchy.
- **Enclosure and silhouette are semantic.** Use a visible boundary when a real object/action/plane relation needs it; children normally inherit the parent's boundary unless they own a distinct role.
- **Layout is relational.** Padding, gaps, grid anchors, alignment, sizing, and negative space encode relationships; do not infer meaning from repeated numbers.
- **Typography is geometry and system language.** Typeface metrics, hierarchy role, line-height/measure, wrapping, numeric behavior, localization, and text style/token mapping affect layout and emphasis.
- **Color is contextual.** Semantic role and accessibility are necessary, but perceived color also depends on surrounding hue/temperature, lightness/chroma, occupied area, repetition, and backdrop. Judge system correctness and composition quality separately.
- **Depth is relational.** Surface tone, border, overlap, clipping, scrim, shadow, translucency, blur, scale, and motion express plane relations; they are not an effect menu.
- **Part and whole constrain each other.** A good component can damage a repeated page; a good screenshot can hide a broken component/system structure. Inspect both directions.
- **System coherence = stable invariants + controlled variation.** Preserve meaning/state/action/system language while allowing constraint-driven geometry/presentation changes.
- **Adapt to constraints, not device labels.** Width, height, usable viewport, content pressure, input capabilities, and state can change independently.
- **Real content is structural evidence.** Placeholder success does not prove hierarchy, wrapping, density, or composition.

## Load expert depth only when it changes the current decision

- **WHEN** journey/IA or local interaction progression is material, **READ** [Experience and Interaction](references/experience-interaction.md) **BECAUSE** task topology and typed continuation must follow approved behavior rather than screen templates.
- **WHEN** deciding frame/group/grid/flow/component/slot/variant/token/style/text-role representation or structural ownership, **READ** [Construction System](references/construction-system.md) **BECAUSE** representation should follow design responsibility rather than tool defaults or visual repetition.
- **WHEN** grouping, grid, density, comparison, placement, negative space, spatial-workspace coordinates, or low-fi hierarchy is material, **READ** [Spatial Composition](references/spatial-composition.md) **BECAUSE** geometry must encode semantic/perceptual relations rather than component inventory.
- **WHEN** typeface, hierarchy, text roles/styles, line measure, numeric scanning, localization, text scaling, or optical alignment can change the composition, **READ** [Typography as Geometry](references/typography.md) **BECAUSE** text meaning and font metrics participate in system and layout decisions.
- **WHEN** palette, theme, perceptual color relation, semantic color roles, status, contrast, alpha, brand color, or color harmony/mass is material, **READ** [Color Composition and System](references/color-system.md) **BECAUSE** contextual perception, visual distribution, semantic role, and accessibility must be solved together. Use `scripts/color_math.py` only for deterministic candidate math.
- **WHEN** materially different visual/system/brand directions remain plausible, **READ** [Visual Direction](references/visual-direction.md) **BECAUSE** alternatives must be compared by purpose, hierarchy, system continuity, adaptability, accessibility, and character rather than taste or color swaps.
- **WHEN** layers, surfaces, clipping, scroll/fixed persistence, occlusion, input priority, borders, shadows, scrims, translucency, blur, radius, state geometry, icon/image treatment, or transforms are material, **READ** [Material, Depth, and Shape](references/material-depth-shape.md) **BECAUSE** semantic containment and 2.5D plane/input relations must remain distinct and coherent.
- **WHEN** a button/icon/input/row/card/menu/selector/popover or other interactive component has material target, micro-geometry, nested-action, state, pointer/touch/keyboard, or anchored-overlay decisions, **READ** [Control and Interaction Anatomy](references/control-interaction-anatomy.md) **BECAUSE** operable target, visible anatomy, action ownership, state feedback, and input affordance must be reasoned together.
- **WHEN** loading/empty/error/pending/selection, motion, usable-viewport pressure, input-mode change, responsive behavior, or continuity across geometry/content/input constraints is material, **READ** [States, Motion, and Responsive Recomposition](references/states-motion-responsive.md) **BECAUSE** state and temporal/spatial/interaction continuity must remain perceivable under change.
- **WHEN** a mature Design System exists, a new component/role is proposed, repeated elements must stay coherent, or a Design change may propagate across consumers, **READ** [System Composition](references/system-composition.md) **BECAUSE** component contracts, atomic part/whole reasoning, coherence invariants, source-of-truth, and propagation scope should precede local invention or broad system changes.
- **WHEN** visual craft or visible readiness is claimed, or one visual symptom has several plausible causes, **READ** [Visual Proof and Critique](references/visual-proof-critique.md) **BECAUSE** rendered evidence, cross-lens hypothesis testing, causal ownership, and falsifiable re-inspection are required to prove and improve composition.
- **WHEN** system/construction/color/plane reasoning remains ambiguous or a near-miss looks locally valid, **READ** [Worked System Examples](references/worked-system-examples.md) **BECAUSE** contrastive examples teach pattern transfer without turning literal styles into rules.
- **WHEN** downstream work needs a durable Design record, flow/wireframe identity, or implementation-neutral visual contract, **READ** [Design Truth Projection](references/design-truth-projection.md) **BECAUSE** serialization must preserve current decisions without becoming a second cognition owner.

Do not preload all references. Load the smallest set that can change the active Design decision.

## Keep adjacent capabilities separate

- **Prototype:** executable experiment for unresolved runtime/timing/interaction questions. Prototype bytes do not become canonical Design or production truth by inheritance.
- **Design Review:** critique/judgment of a fixed artifact when redesign is not the requested terminal job.
- **Visual Verification / QA:** acceptance/parity verdict against approved visual obligations. Do not redesign inside acceptance.
- **Creative Production:** logos, campaign/social/banner/collateral work outside Product UI truth.
- **Frontend Engineering:** production implementation, source integration, browser/runtime proof. Engineering consumes current Design truth and surfaces missing Design decisions instead of inventing them.

## Completion semantics

Return the smallest truthful state:

- `READY` — the bounded Product Design question is resolved; material visible-quality claims have inspectable render evidence and required stress checks; current decisions and unresolved items are explicit.
- `STRUCTURE_READY` — a flow/topology/low-fi question is resolved and higher visual fidelity is intentionally outside scope.
- `PARTIAL` — useful Design truth exists, but a material render/provider/evidence/state/viewport/system check required for the requested claim is missing.
- `BLOCKED` — missing Product/behavior/authority/current-system truth prevents a valid Design decision.

A recommendation is not accountable approval. Record Design maturity/approval separately; only evidence from the accountable owner may mark a direction or durable Design truth `APPROVED`.

Never upgrade text completeness, a Design contract, structural conformance, approval absence, or validator success into proof that a visible composition is coherent or polished.
