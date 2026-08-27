# Frozen Vertical-Depth Cases — Product Design System Coherence & Adaptation

Evidence-State: `NOT_RUN`

Freeze-Note: Frozen before Product Design source mutation; behavioral execution remains separate from validator status.

## Rubric

- `COHERENCE_INVARIANTS`: identifies what must stay semantically/systemically stable across screens, states, densities and modes while allowing controlled contextual variation.
- `DESIGN_SOURCE_OF_TRUTH`: locates the design owner/source of truth for an observed element before proposing a broad change.
- `PROPAGATION_SCOPE`: distinguishes INSTANCE / COMPONENT / SEMANTIC_ROLE / SYSTEM_FOUNDATION change scope and inspects affected contexts without inventing source-code dependencies.
- `COLOR_ROLE_SYSTEM`: maps color through surface/content/action/state/status roles and detects unexplained cross-screen drift.
- `SPACING_GRAMMAR`: reasons shell/region/component spacing by relationship; equal raw values do not imply equal semantic roles.
- `CONTROL_GEOMETRY`: distinguishes interaction target, visible container, icon optical box, text/label box, internal padding/gap, shape/depth and state layer.
- `INTERACTION_ANATOMY`: models anchor/target/action/state relations including nested interactions and material pointer/touch/keyboard behavior.
- `ADAPTIVE_CONSTRAINTS`: reasons width, height, aspect/usable viewport, content pressure, text scale/locale, overlays/keyboard, input capabilities and state together rather than device labels alone.
- `MODALITY_CONTINUITY`: preserves semantic action across touch/pointer/keyboard/stylus/assistive modes without requiring identical presentation.
- `BOUNDARY_DISCIPLINE`: keeps Product Design at design truth/propagation and leaves code/source dependency propagation to Frontend Engineering.
- `VISIBLE_PROOF`: uses render/inspection when micro-geometry or visible coherence is material; does not upgrade prose completeness to craft proof.

## PDS1 — Cross-screen color drift
Dashboard and Settings use the same semantic primary/action system. Billing independently uses cyan for its primary CTA and Admin independently uses green for selection, with no brand, theme, status or sub-product authority explaining the change.

Strong behavior must:
- distinguish intentional semantic/theming variation from local invention;
- identify unexplained color-role drift across screens rather than judging each screen in isolation;
- trace the affected semantic roles/surfaces before changing raw hex values;
- preserve local exception only when authoritative product/system truth justifies it.

## PDS2 — Icon change propagation
The Search action uses the same semantic action across six screens. One toolbar icon looks optically inconsistent. The user asks, “If I change this icon, what else must change? Is the icon itself a token?”

Strong behavior must:
- distinguish icon asset/semantic mapping from size/color/spacing tokens unless the actual system defines otherwise;
- locate whether the issue is a local instance, component slot, semantic action mapping, or iconography foundation;
- define design propagation scope and representative affected contexts/states;
- avoid inventing React files/import paths/CSS dependency details.

## PDS3 — Same number, different spacing roles
`24px` is currently used both between sidebar and workspace and as padding inside cards. Compact density requires tighter card interiors but the shell still needs the larger separation.

Strong behavior must:
- reject “same value means same token/role”;
- reason relation -> spacing role -> token/value;
- allow the two values to diverge when semantic relationships differ;
- avoid a universal 8px-grid recipe as the decision mechanism.

## PDS4 — Canonical token, wrong local mapping
A component uses only approved spacing/color/radius tokens, but its icon-label alignment and surface treatment still look inconsistent with the product.

Strong behavior must:
- recognize that canonical tokens do not prove correct semantic mapping or component anatomy;
- inspect role assignment, optical relation, wrapper/context and repeated instances before creating a new token;
- distinguish local misuse from systemic foundation defect.

## PDS5 — Icon visual size versus target size
An icon button renders a 16px icon inside a 20px clickable box on desktop and the same anatomy is reused on touch devices.

Strong behavior must:
- distinguish icon optical/visual size, visible control/container size and interaction target size;
- consider input precision and neighboring-target spacing without forcing the visible icon itself to become huge;
- preserve hierarchy/density while making the target reliably operable.

## PDS6 — Clickable card with inner action conflict
A list card opens detail when clicked. Inside it, a small Delete icon is independently clickable. Touch users frequently trigger the wrong action and keyboard focus order is unclear.

Strong behavior must:
- model parent and child action ownership/targets explicitly;
- detect nested/competing target ambiguity and destructive-action risk;
- choose a coherent interaction anatomy rather than merely adding spacing;
- preserve keyboard/focus and touch/pointer access paths.

## PDS7 — Model-selector popover anatomy
A compact selector has a trigger, anchored overlay, selected option with checkmark, hover/focus row, an unavailable future model with metadata, click-outside/Escape dismissal, and must work with mouse, keyboard and touch.

Strong behavior must:
- model trigger -> anchor -> overlay -> option/state relations;
- account for control geometry, row density, selected/focus/unavailable states and dismissal semantics;
- adapt pointer/touch/keyboard interaction without requiring identical affordances;
- escalate to Prototype only if timing/focus/runtime continuity cannot be resolved statically.

## PDS8 — Same width, different height and input
A 1366x768 laptop uses mouse+keyboard. A 1366x1024 tablet uses touch. The current design picks the same layout solely because width is similar.

Strong behavior must:
- treat width alone as insufficient;
- consider usable height, input precision, posture/context only when evidence supports it, and material action/target needs;
- preserve semantic relations while allowing different composition or interaction modes.

## PDS9 — Ultrawide but shallow viewport
A 3440x1440 display gives far more horizontal space than the task needs; the current app stretches content and text measure across the full width.

Strong behavior must:
- avoid equating more width with “use all width”;
- preserve readable measure, scan fields and meaningful parallelism;
- use bounded regions/secondary context/negative space only when they improve the task rather than fill space.

## PDS10 — Phone landscape
A phone rotates to a wide-but-short landscape viewport. The current responsive rule switches to the desktop composition because width crosses a breakpoint.

Strong behavior must:
- treat height/aspect/usable viewport as material constraints;
- avoid device/breakpoint labels as the sole decision rule;
- choose a composition that preserves task/action accessibility under the reduced vertical budget.

## PDS11 — Touch to trackpad/keyboard switch
A tablet session starts with touch, then the user attaches a trackpad and hardware keyboard while staying in the same task.

Strong behavior must:
- preserve semantic action/state continuity across modality changes;
- allow hover/focus/shortcut enhancements without making essential behavior depend on them;
- not redesign into separate “tablet app” and “desktop app” truths solely because input changed.

## PDS12 — Virtual keyboard collapses vertical space
A mobile form works at rest, but opening the software keyboard leaves less than half the previous usable height and obscures the focused field plus primary action.

Strong behavior must:
- treat overlay/keyboard as a real geometry constraint;
- determine which region scrolls/persists/reflows and keep focused field/action reachable;
- avoid preserving the original frame at the expense of usability.

## PDS13 — Design propagation versus code propagation
A shared button should become more compact across the product. Product truth permits the design change, but the codebase implementation may have several wrappers and local overrides.

Strong behavior must:
- define the Design-system change and design-level affected contexts/variants/states;
- state the invariants that must survive the compact treatment;
- leave source-file/import/CSS dependency discovery and implementation migration to Frontend Engineering;
- not claim implementation blast radius without source evidence.

## PDS14 — Micro-geometry visible inconsistency
A rendered toolbar contains icon buttons whose visible containers, icon optical sizes, baselines and gaps vary slightly even though all use allowed tokens. The page-level layout is otherwise correct.

Strong behavior must:
- inspect at component/optical zoom, not only page hierarchy;
- diagnose whether the defect is shared anatomy, icon asset geometry or local wrapper/mapping;
- use the smallest coherent correction and re-render representative repeated instances;
- not treat token conformance alone as visual READY.

## PDS15 — same-session capability continuation is not a Handoff artifact
A Product Design task resolves static composition but leaves one runtime focus/timing question that Prototype could answer in the same active session. Canonical project sources already carry the Design state.

Strong behavior must:
- return the bounded unresolved runtime question/constraints for Prototype consumption;
- not create or label a Handoff artifact merely because another capability becomes useful;
- keep Product Design as the owner of the Design decision and Prototype as executable learning only.

## PDS16 — downstream implementation/review notes are not automatically Handoff
A durable Design projection needs to record Frontend implementation constraints and later visual review/QA scope. No owner/session/runtime transfer needs non-recoverable execution state.

Strong behavior must:
- record these as downstream continuation/consumer notes;
- not call the section `Handoffs` by default;
- use the dedicated Handoff semantics only when a real transfer boundary exists and canonical sources are insufficient for safe continuation.

## PDS17 — user/process handoff inside a designed flow remains domain semantics
A business workflow moves from requester to approver and that actor transition changes user-visible state and valid continuation.

Strong behavior must:
- preserve the actor/process handoff as part of the designed experience/flow;
- not confuse that domain transition with the Plugin Handoff capability;
- keep technical/runtime owner routing out of the user flow unless it is user-visible approved behavior.
