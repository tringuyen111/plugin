# Design Truth Projection

## Contents
- Minimal current Product Design record
- Direct representation projections
- Flow / wireframe / visual-direction projections
- Visual / UI-system contract projection
- Continuity rule

Use a projection only when a project/downstream consumer needs a durable artifact. The projection records current Design truth; it is not a second Design brain.

## Minimal current Product Design record

Preserve only the fields material to the job:

```markdown
# Product Design — <scope>

- Identity / revision / maturity: DRAFT | REVIEWED | APPROVED | SUPERSEDED
- Design owner:
- Approval owner / evidence:
- Source Product/behavior truth:
- Current product/system evidence:
- Active Design question:
- Representation / fidelity:
- Rendered evidence identity when material:
- Supersedes / affected artifacts:

## User/task and perceptual order

## Experience / interaction decisions

## Spatial / visual / system decisions

## Material states, content and viewports checked

## System disposition and impact

## Open Design decisions / evidence gaps

## Downstream continuation
- Prototype question, if any:
- Frontend implementation constraints:
- Review / QA visual-conformance scope:
```

`APPROVED` requires actual accountable-owner evidence. A recommendation or polished render does not grant approval by itself.

## Direct representation projections

When the user/project specifically needs a user flow, wireframe, visual-direction decision, or implementation-neutral visual/system contract, serialize only the relevant view and keep the current Product Design decision source authoritative.

### Flow projection

Include scoped task, truth altitude (`CURRENT_OBSERVED | TARGET_AUTHORIZED | PROPOSED_EXPLORATION`), entry context, typed transitions, perceivable states, valid continuation, governing behavior truth, recovery/unknown branches when material, actor/process handoffs, and open Design decisions.

### Wireframe projection

Include state/device assumption, real content pressure, structural hypothesis, major regions/groups/anchors, action hierarchy, source behavior, responsive notes, unresolved visual styling, artifact maturity, and inspection evidence when structure was visually checked. A low-fi wireframe does not prove final visual craft.

### Visual-direction projection

When materially different directions were evaluated, record decision target, constraints, alternatives, fit/evidence states, strongest contradiction, selected/recommended thesis, rejected alternatives, intentional system divergence, unresolved decisions, owner, approval evidence, and supersession.

### Visual / UI-system contract projection

Record implementation-neutral design semantics needed downstream. Use the following only when material; do not fill every section ceremonially.

**Visual intent**
- user problem/task addressed;
- hierarchy and reading/action order;
- density target;
- brand/character intent and non-goals.

**Surface/state/content scope**
- surfaces/regions;
- approved behavior states;
- responsive modes;
- content/localization/text-scaling pressure;
- reference/render evidence.

**Composition semantics**
- grouping/scanning order;
- alignment/grid/rhythm relationships;
- persistent vs contextual regions;
- disclosure/overflow behavior;
- plane/material relations.

**Existing system disposition**
Use `REUSE | EXTEND | DIVERGE | REPLACE | NOT_AVAILABLE` only when source evidence supports the claim. Apply it to material token, typography, iconography, component, layout, or interaction roles. Missing inspectable source is not inferred `REUSE`.

**Token intent**
Distinguish primitive evidence, semantic roles, component roles, and state roles. Record exact values only when already canonical or intentionally decided by Design; do not prescribe CSS/build syntax.

**Component role/anatomy**
For material roles, record variants/states/density/content limits/reuse scope and only the anatomy invariants that affect usability or system truth: enclosure, type/line-box relation, icon optical relation, internal spacing, shape/surface, interaction feedback, target/input behavior, and long/empty/localized content.

**Responsive/state mapping**
Describe information priority, permitted actions, composition transformation, persistence/navigation, input/content pressure, and visual/non-color state cues. Do not invent business states.

**Exceptions/debt**
Distinguish new reusable pattern, intentional one-off, temporary divergence, and Design-System debt with owner/scope/review condition.

**UI-system impact**
Record `NONE | CONTAINED | SHARED | FOUNDATION` plus the Design source/owner, semantic invariant, affected component/role/surfaces, material variants/states/density or input modes, representative re-inspection targets, and the fixed technical question when shared/foundation implementation design is required. Product Design does not infer source-file/import/CSS dependency blast radius or choose frontend library/state manager/CSS architecture; Frontend Engineering resolves implementation propagation from source evidence.

**Accessibility/parity intent**
Record contrast/non-color meaning, focus/reflow/target/motion obligations and exact/semantic/approximate visual characteristics for downstream QA. Product Design does not issue the QA verdict.

## Continuity rule

Do not copy governing child/project truth into multiple competing artifacts. Update identity/revision links and reopen affected projections when current Product Design truth changes. A visually complete contract cannot close an omitted upstream behavior or an unresolved system-source contradiction.
