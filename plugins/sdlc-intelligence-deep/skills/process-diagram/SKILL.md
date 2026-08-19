---
name: process-diagram
description: "Design and generate editable process diagrams with agent-led process reasoning and visual composition plus thin deterministic notation arms and Draw.io execution. Use for BPMN process modeling, swimlane/collaboration diagrams, Flowchart logic/decision/process diagrams, overview/detail multi-page process documents, repairing a process-diagram plan, producing Draw.io source, or validating/rendering a generated process diagram. Executable libraries: BPMN and Flowchart; UML is not implemented."
---

# Process Diagram

Optimize the **whole agent lifecycle**, not the size of the first prompt. Spend context up front when it prevents re-brainstorming, full-plan rewrites, validation churn, or visual repair loops.

Use the Agent as the process analyst, communication designer, and spatial composer. Use scripts as the **execution arm**.

```text
requirements / existing diagram
          |
          v
Agent: reconstruct process truth + reader task + causal graph
          |
          v
Agent: choose the communication view
      (primary read + critical context + deferred detail)
          |
          v
Agent: compose the perceptual signal
      (attention + grouping + labels + connector identity)
          |
          v
Agent: build a qualitative spatial scene
      (occupied groups + reserved voids + relations)
          |
          v
Agent: choose notation/orientation and project the scene
      into stage/track/sides/corridors
          |
          v
one process-diagram-plan/v1 per communication view
          |
          +---- one view -> mechanics: exact checks + geometry + Draw.io
          |
          +---- approved overview/detail decomposition
                -> thin process-diagram-document/v1 manifest
                -> one multi-page Draw.io document
          |
          v
Agent: inspect rendered communication
          |
          +---- acceptable -> deliver
          |
          +---- visual issue -> compact recompose delta -> rebuild/render
          |
          +---- meaning issue -> return to process truth
```

## Ownership boundary

**Agent owns:** process boundary, responsibility, causal graph, split/join meaning, loops/exceptions, meaningful outcomes, reader task/required answer, information priority, reading path, decomposition, multi-page page identity/order/navigation when decomposition is approved, perceptual hierarchy, grouping intent, label/connector readability intent, notation translation, the qualitative spatial scene (occupied groups, reserved voids, spatial relations), the spatial frame/orientation, semantic block composition, milestone grouping, `stage`/`track`, routing corridors, and explicit edge sides when routing matters.

**Mechanics owns:** plan/document shape/type checks, notation-specific exact invariants, deterministic geometry, Draw.io serialization/source validation, runtime probing, rendering, and applying bounded composition deltas. BPMN and Flowchart mechanics each emit a Draw.io-free `process-diagram-layout/v2`; only the Draw.io adapter maps supported semantic/composition decisions into mxGraph styles, cell IDs/parents, geometry, page containers/navigation links, and XML. Mechanics may translate or measure an explicit Agent decision; it must not decide decomposition, page membership/order/navigation, what deserves emphasis, which elements belong together perceptually, or what process meaning a visual treatment should imply.

A build PASS proves only that the plan satisfies the executable library's exact contract/local invariants and can be materialized. It does **not** prove business semantic closure, global reachability/deadlock freedom, or visual quality.

## Enter the pipeline with a complete mental model

Separate five design truths plus unresolved business truth before drawing. These are Agent reasoning/control state, not additional canonical IRs:

| Truth | Decide before materialization |
|---|---|
| Process truth | trigger, actions, responsibility, enablement, branches, joins, messages, loops, exceptions, outcomes |
| Reader communication truth | reader task, required answer, primary read, critical supporting context, deferrable detail, entry/trace path, and any material notation-competence/medium constraint |
| Perceptual communication truth | attention order, grouping strength, label/connector identity, visual mass/density, and any material accessibility/localization pressure needed for the chosen view |
| Spatial scene truth | dominant spine, slabs/groups, anchors, containment, before/beside/aligned/rear relations, responsibility adjacency, occupied envelopes, and reserved corridors/gutters |
| Projection truth | notation, orientation, `stage`/`track`, lane order, edge sides, Flowchart rail choice, exact local spacing |
| Unresolved business truth | missing facts that change behavior, responsibility, synchronization, exception handling, or outcome |

Resolve reversible design yourself. Ask only when unresolved business truth blocks a truthful model.

### Define the reader task before composing

A correct process model can still be the wrong diagram for the requested use. Before choosing what dominates the page, state the smallest reader contract:

1. What must the reader be able to **find, follow, compare, verify, decide, or explain**?
2. What one-sentence answer or action should successful reading support?
3. Which facts/path are the **primary read**? Which supporting facts must stay visible so that read is not misleading? Which detail can be deferred?
4. Where should the reader enter the diagram, and which path/regions must remain traceable for the task?
5. Do known notation competence, viewing medium, or target scale materially change label burden, density, or decomposition?

Do not design from a role stereotype when the actual reading task is more precise. If this frontier is trivial, continue directly. When reader task, information priority, competence, medium, or decomposition materially changes the view, read [Reader Communication View](references/COMMUNICATION-VIEW.md) before spatial composition. Reader communication reasoning stays transient; do not add `audience`, `priority`, or `view` fields to the plan merely because the Agent used those concepts.

When decomposition is justified **and** the approved parent/child views should remain together in one editable document, read [Multi-page Document Composition](references/DOCUMENT-COMPOSITION.md). Keep each page as an independently valid `process-diagram-plan/v1`; persist only page identity/order, local plan references, and explicit node-to-page navigation in `process-diagram-document/v1`.

### Compose perception before styling

A process diagram is read through both **primary notation** (semantic shapes, edge types, labels, containment) and **secondary notation** (position, alignment, whitespace, type/label treatment, color/line weight, connector continuity, and grouping strength). Primary notation owns meaning; secondary notation may reinforce that meaning but must never counterfeit it.

Use the reader priorities to allocate attention deliberately:

- make the primary read structurally easy to find before adding stronger visual signals;
- use the weakest grouping cue that still preserves the intended relation;
- treat text and edge labels as geometry that consumes real visual territory;
- keep simple diagrams quiet rather than decorating every semantic type;
- treat connector continuity/source-label-destination attribution as a first-class visual obligation;
- if the intended perception cannot be expressed through the current plan/mechanics without distorting semantics or composition, expose a **translator gap** instead of hacking stage/track or inventing Draw.io style fields.

When hierarchy, grouping cues, typography/labels, color/visual mass, shape/stroke treatment, connector perception, density, localization/accessibility, or multi-zoom critique can change the result, read [Diagram Visual Cognition](references/DIAGRAM-VISUAL-COGNITION.md) before exact composition. These concepts remain Agent reasoning unless a future stable output-bearing intent passes the canonical gate; this Skill does not add visual-style fields merely because Draw.io supports them.

### Choose notation by semantics, not by visual preference

| Use BPMN when... | Use Flowchart when... |
|---|---|
| independent participants or handoffs matter | one control/decision narrative is sufficient |
| pools/lanes communicate responsibility | responsibility containers are not material |
| message exchange has process meaning | ordinary directed control arrows are enough |
| parallel/inclusive synchronization matters | branching is conditional and can be expressed by labeled decisions |
| timers/messages/exceptions need BPMN semantics | the job is an algorithm, procedure, troubleshooting path, validation routine, or simple workflow |

Honor an explicitly requested notation when its semantics fit the executable subset. If the requested notation would erase material meaning, expose the mismatch instead of drawing a visually convenient approximation. Read [BPMN](references/BPMN.md) for BPMN authoring and [Flowchart](references/FLOWCHART.md) for Flowchart authoring.

### Build the causal graph, not a transcript

Reason from **what enables what**, not sentence order. Classify each relation as control progression, participant message, event/trigger, condition/decision, exception/interrupt, feedback/loop, or contextual information.

Before notation, be able to state:

1. What starts the process and what business outcomes actually finish it?
2. Who owns each behavior? Which interactions cross an independent participant boundary?
3. What does every split activate, how does each branch complete, and what exact branch-completion set permits any common continuation?
4. Where can work repeat, fail, recover, escalate, or terminate?
5. Is every important behavior on an intentional path to an outcome or intentionally independent?
6. What complexity belongs in a child process instead of the parent communication view?

### Construct split/convergence scopes before choosing gateway symbols

When branching is material, construct one semantic scope at a time:

```text
activation contract
    -> branch lifecycles
        -> convergence contract
            -> common continuation or independent outcomes
```

First state which branches may be active together: exactly one, a selected subset, or all. Then define what makes **each branch complete for this scope**. Only after that decide whether a common continuation exists and what completed active-branch set makes it valid. Close nested scopes from the inside out: a local merge completes its local choice; it does not automatically synchronize the enclosing fork. If branches terminate or continue independently, do not invent a convergence.

For any non-trivial split, convergence, synchronization, nested branch, or no-join decision, read [Split and Convergence Construction](references/SPLIT-CONVERGENCE.md) **before** notation/spatial projection. It provides the positive construction method, notation mapping, branch-scope spatial composition, and worked transfer cases.

For materially ambiguous, exception-heavy, or very large process truth, also read [Process Modeling](references/PROCESS-MODELING.md) **before** authoring the plan.

### Use counterexamples to pressure the constructed model

| Tempting shortcut | Correct reasoning |
|---|---|
| exclusive split -> parallel join for visual symmetry | usually wrong: the join can wait for tokens that can never coexist |
| gateway has one outgoing edge -> bad gateway | false: it may be a valid synchronization/merge join |
| handoff/notification happened -> process complete | only if that is the meaningful business outcome |
| two lanes communicate -> message flow | lanes are one participant; use sequence/control inside the participant |
| two independent participants share sequence flow | invalid participant boundary; use a message exchange |
| retry path returns somewhere -> loop is complete | identify retry condition **and** exit/escalation path |
| first event wins -> exclusive gateway | event-based selection is different; current library does not implement it |
| renderer lacks data/annotation shape -> turn it into control flow | preserve the information meaning; do not invent control semantics |

Once semantic closure and the reader task are stable, preserve a compact checkpoint that is **sufficient for downstream work without reinterpreting the source prose**: trigger/outcomes, participant/responsibility boundaries, the actions and material causal relations needed to reconstruct the requested view, split/join/message/loop/exception meanings, reader task/required answer, primary read + critical supporting context + intentionally deferred detail, material perceptual obligations such as label/connector attribution or grouping/hierarchy that downstream work must preserve, decomposition, unresolved truth, and any user-visible wording/notation/output constraints that must survive. Keep the original source as evidence, but do not replay a reasoning narrative downstream. Re-open source interpretation only when new evidence contradicts the checkpoint or satisfies a stored reopen condition.

Treat a reusable checkpoint as **control state, not a summary**. For any material decision whose reopening would fan out into semantic reconstruction or broad recomposition, retain three things: `decision` (what is currently committed), `basis` (the evidence/relation that makes it valid), and `reopen if` (specific new evidence that falsifies or materially changes that basis). Do not attach this tuple to trivial local coordinates or ports. Downstream work keeps the material decision while its basis remains valid; defects below that boundary are repaired below it instead of reopening upstream truth.

## Build a relational spatial scene before coordinates

The causal graph says **what enables what**. The spatial scene says **what should read as forward, lateral, exchange, return, outcome, occupied territory, and deliberately preserved void**. Never map causal order directly to `stage + 1`.

Keep these universal invariants in mind:

- **dominant spine:** only reader/business milestones inherently advance on P; local review, branches, handshakes, and rework stay attached to their anchor when that is how they should be perceived;
- **semantic groups:** construct validation/split/handshake/retry/exception units from intent, entry/exit, normal internal spine, side/rear zones, and required corridors before placing member shapes;
- **matter + void:** budget hard node/container bodies, soft label/group territory, and reserved gutters/message/return corridors;
- **relation first:** reason with `contains`, `anchored-to`, `before/after` on P, `beside` on Q, `aligned-with`, `adjacent-band`, `separated-by`, `outside/around`, and `returns-to` before assigning numbers;
- **rotatable basis:** P is reader/business progression; Q carries responsibility separation, lateral work, branches, and return clearance. LTR projects P->X/Q->Y; TTB projects P->Y/Q->X;
- **smallest sufficient spacing:** use projected shape extent + only the label/route gutter the local relation actually needs; `stage` and `track` are controls, not reserved grid cells;
- **front / side / rear circulation:** forward continuation leaves the block front, lateral/exchange work spends Q, and rework/feedback circulates around the side/rear instead of becoming a fake new milestone;
- **thin mechanics:** mechanics may measure/check/materialize explicit choices; it never searches a better composition or silently moves a node.

For a trivial linear diagram these invariants may be enough. **When orientation, dense branching, semantic groups, multiple responsibility bands, message traffic, feedback/exception corridors, footprint rotation, or visual repair is material, read [Spatial Composition](references/SPATIAL-COMPOSITION.md) before exact `stage`/`track` assignment.** When a recurring spatial failure is easier to recognize from a contrastive topology, read [Contrastive Spatial Patterns](references/SPATIAL-PATTERNS.md).

Before metric placement, ensure every off-spine block has an anchor/role, every material route has circulation space, and every intended P advance represents real reader/business progression. If exact body clearance is uncertain after the relation is already decided, use `measure`; do not guess and do not ask mechanics to choose the relation.

## Current executable libraries

Stay inside the semantic envelope of the selected notation. Both arms use one canonical `process-diagram-plan/v1` with an explicit `kind` and `direction`, then emit the same provider-neutral `process-diagram-layout/v2`. Supported directions are `left-to-right` and `top-to-bottom`; do not fake other orientations by reversing stage numbers or patching generated geometry.

### BPMN

- events: start/end plus message/timer intermediates, message starts/ends, error/terminate ends;
- activities: task variants and subprocess;
- gateways: exclusive, parallel, inclusive;
- flows: sequence inside a participant and message across participants;
- explicitly unsupported: event-based gateway, boundary events, data/annotation/association/compensation semantics.

Read [BPMN](references/BPMN.md) once before authoring an exact BPMN plan. If unsupported BPMN meaning is material, expose the boundary instead of substituting a visually similar construct.

### Flowchart

- nodes: `start`, `end`, `process`, `decision`, `input-output`, `document`;
- flow: directed `flow` edges; optional `fromSide` / `toSide`, plus Flowchart-only `corridorTrack` for one explicit Q-axis rail when endpoint sides are insufficient;
- decisions: at least two outgoing branches with distinct non-empty labels;
- global control: every node must be reachable from a start and able to reach an end;
- explicitly unsupported: pools/lanes, Message Flow, participant handshakes, BPMN event/gateway semantics, explicit concurrency/synchronization, UML semantics.

Read [Flowchart](references/FLOWCHART.md) once before authoring an exact Flowchart plan. If participant/message/concurrency semantics become material, switch to BPMN rather than stretching Flowchart.

UML is not implemented. Keep BPMN and Flowchart as explicit notation arms; do not introduce a notation registry, base classes, universal graph IR, or hidden fallback. Concrete post-implementation audit found that their similar validation helpers are small while semantic checks, reachability, containers, geometry, and routing differ materially, so no shared notation core is justified yet. Generalize only when future concrete duplication proves an identical contract.

### Execution is not Skill development

During ordinary diagram work, treat `scripts/`, `references/`, and `assets/` as immutable. Unsupported semantics or a mechanics defect is a capability boundary, not permission to modify the Skill while delivering the diagram. Modify implementation only when the user explicitly asks to develop/repair/upgrade the Skill.

## First-pass composition sequence

Build positively in this order; load deeper references only when the decision becomes material:

1. Bound trigger, meaningful outcomes, responsibility/participants, material messages, branches/joins, loops/exceptions, unresolved business truth, and the reader task/required answer.
2. Choose BPMN or Flowchart from semantics, not appearance. Load the notation reference before exact authoring.
3. Build the causal graph and identify the smallest dominant reader/business spine.
4. Decide the perceptual priorities: primary read, critical context, deferrable detail, label burden, grouping strength, and connector identity requirements. Load [Diagram Visual Cognition](references/DIAGRAM-VISUAL-COGNITION.md) when these are nontrivial.
5. For nontrivial geometry, instantiate the relation-first spatial scene and semantic groups, reserve needed voids, choose placement roles, and load [Spatial Composition](references/SPATIAL-COMPOSITION.md).
6. Choose orientation/lane order from real P-depth/Q-breadth and interaction locality. For a material split/convergence, reserve branch-entry and convergence fronts before exact routing; then assign the smallest sufficient `stage`/`track`, explicit sides, and Flowchart corridor rails. Use `measure` only after the Agent has decided the relation and spatial territories.
7. Trace the normal path, every material branch/message/retry/exception path, and every outcome. Ensure connector labels remain attributable and no semantic group/route depends on an imagined auto-router.
8. Build and validate the exact plan/source. For Flowchart, materialization rejects a known axis-aligned ordinary route that pierces another node body instead of relying on Draw.io to emit it; diagnose that edge with `measure --edge` and let the Agent choose sides/corridor/local recomposition. Build PASS still proves executable contract/materialization only.
9. Render and inspect the exact pixels at whole-diagram, region/group, connector/label, and optical-detail scales. Use [Visual Review](references/VISUAL-REVIEW.md).
10. Re-enter at the earliest failed truth: process -> reader/perception -> spatial relation -> local projection/translator -> renderer runtime. Repair the smallest owner; do not reopen stable upstream truth without its `reopen if` condition.

Before build, prove at least: semantic closure or explicit unresolved truth; reader-task/primary-read integrity; perceptual hierarchy without false notation; anchored spatial groups/reserved voids; notation-specific ownership/branch/message invariants; connector identity for material routes; smallest-sufficient clearance; and mechanics-boundary integrity. Deep spatial proofs live in `SPATIAL-COMPOSITION.md`; visual/perceptual proofs live in `DIAGRAM-VISUAL-COGNITION.md`.

## Use a thin, high-signal pipeline

### Build the canonical plan

```bash
node scripts/process-diagram.mjs build --plan <plan.json> --out-dir <out-dir>
```

Default stdout is an Agent packet: status, artifact paths, page/count summary, and next action. `build-report.json` binds the exact input bytes and every deterministic transform with `inputPlanSha256`, `normalizedPlanSha256`, `layoutSha256`, and `sourceSha256`.

For an approved overview/detail document, keep the page plans independent and compose them with a thin manifest:

```bash
node scripts/process-diagram.mjs build-document --manifest <document.json> --out-dir <out-dir>
```

Do not use document mode merely because one page is large. Read [Multi-page Document Composition](references/DOCUMENT-COMPOSITION.md) when page boundaries/navigation are material.

### Measure an explicit spatial choice

When the semantic/group relation is already decided but exact body clearance is uncertain, query mechanics without changing the plan:

```bash
node scripts/process-diagram.mjs measure \
  --plan <plan.json> --a <node-a> --b <node-b> --axis <P|Q> --gutter <px>

node scripts/process-diagram.mjs measure \
  --plan <plan.json> --nodes <id,id,...> --gutter <px>

node scripts/process-diagram.mjs measure \
  --plan <plan.json> --edge <edge-id> --gutter <px>
```

Pair mode reports projected body extents, current/required axis clearance, and the minimum `stage`/`track` delta only when both nodes share a coordinate frame where that field is a direct physical control. `track` is center-stepped, so Q clearance is symmetric. `stage` anchors the leading P edge; when two nodes already have a P order, the minimum delta uses the earlier node's projected P extent plus the Agent-supplied gutter. When they share a stage, mechanics reports both directional minima and leaves `minimumDelta` unset rather than choosing `before`/`after`. Envelope mode reports the absolute hard-occupancy hull of the Agent-supplied node set.

Edge mode reports resolved endpoint sides, same-side peers, edge-label role, absolute source/target rectangles, effective terminal points, and hard node-envelope intersections for a deterministically known route or an axis-aligned direct path. A non-aligned ordinary orthogonal interior remains Draw.io-owned and is returned as `renderer-owned-orthogonal` with no fabricated path/clearance verdict. During materialization, a Flowchart axis-aligned ordinary edge whose deterministic direct path crosses another node body fails as `FLOWCHART_ORDINARY_ROUTE_OBSTRUCTED`; run edge mode on the same plan to see the blockers, then let the Agent choose explicit sides/corridor or local recomposition. For BPMN, solve material branch-routing pressure first through branch territory, lane order, stage/track spacing, and explicit endpoint sides. If those controls still cannot preserve a material connector relation, expose a `translator-gap`; do not persist pixel waypoints into the plan. `--gutter` inflates hard node envelopes for inspection only; it is an explicit Agent-owned breathing allowance.

The Draw.io adapter uses renderer-internal visual roles rather than plan-level style fields. It may deterministically separate ordinary edges that use the same resolved node-side into distinct attachment slots, anchor decision/gateway branch labels nearer their split, place cross-participant message labels near the gap between participant pools when that gap is geometrically resolvable, offset edge labels from their stroke, and render line jumps at connector crossings to show that a crossing is not a semantic join. The adapter does not choose a split/join corridor from gateway type, lane index, or branch count. The Agent still owns composition, routing intent, branch meaning, lane ordering for communication, explicit endpoint sides, and Flowchart corridor decisions. Mechanics does not estimate soft label territory, move a node, search a corridor, or mutate the canonical plan.

### Cheap visual recomposition

If semantics are unchanged and pixel review only requires stage/track/edge-side adjustments, do **not** rewrite the full plan. Emit a transient delta:

```json
{
  "version": "process-diagram-recompose/v1",
  "nodes": {
    "risk-check": {"stage": 4, "track": -1}
  },
  "edges": {
    "retry": {"fromSide": "south", "toSide": "west", "corridorTrack": 2}
  }
}
```

Apply and rebuild in one command:

```bash
node scripts/process-diagram.mjs recompose \
  --plan <current-plan.json> \
  --delta <delta.json> \
  --out-plan <next-plan.json> \
  --out-dir <out-dir>
```

The delta may change only node `stage`/`track` and edge `fromSide`/`toSide`/`corridorTrack`. `corridorTrack` is Flowchart-only. The delta is an instruction packet, **not canonical truth**. The emitted full `process-diagram-plan/v1` is the next canonical plan and preserves the current plan's sparse authoring shape instead of expanding internal defaults/derived fields.

### Validate or render

```bash
node scripts/process-diagram.mjs validate --source <diagram.drawio> [--out <validation.json>]
node scripts/process-diagram.mjs doctor
node scripts/process-diagram.mjs render --source <diagram.drawio> --out <preview.png|svg|pdf>
node scripts/process-diagram.mjs render --source <multi-page.drawio> --page <page-id> --out <preview.png|svg|pdf>
```

Validation covers every Draw.io page and verifies internal page-link targets. For multi-page rendering, select a page explicitly; never treat one default page export as visual proof of the whole document. Valid Draw.io `object` / `UserObject` wrappers may carry opaque metadata, tags, tooltips, or links around an `mxCell`; validation accepts that file structure but does not infer business meaning from arbitrary attributes. Process Diagram authoring currently owns only node-to-page links declared by `process-diagram-document/v1`; layers, tags, business metadata, external links, and custom actions remain outside the authoring contract.

Use `--debug` only when the concise failure packet is insufficient. Do not pay runtime/debug context cost on the happy path.

After render, inspect the **exact current pixels**. Use [Visual Review](references/VISUAL-REVIEW.md) for diagnosis. Accept a slightly larger canvas when it materially improves communication; do not optimize dimensions as a goal in themselves.

## Re-enter at the causal boundary

| Observed failure | Re-enter at |
|---|---|
| missing/contradictory business meaning | process truth (Agent) |
| malformed canonical plan shape/reference | `plan-contract` |
| unsupported/invalid BPMN meaning | `bpmn-semantics`; preserve meaning instead of approximating it |
| unsupported/invalid Flowchart control meaning | `flowchart-semantics`; repair the control/decision graph or use BPMN when richer process semantics are material |
| reader task is correct but hierarchy/grouping/label/connector perception hides the required answer | perceptual communication; use visual cognition and preserve process truth |
| violated spatial relation, consumed reserved void, or wrong stage/track/edge-side/Flowchart-corridor/page composition | spatial scene / `composition`; repair the smallest invalid relation before coordinates |
| intended perceptual/spatial relation is correct but current controls cannot express it without distortion | translator gap; preserve intent, do not invent semantics or hidden auto-fix |
| generated/loaded Draw.io source invalid | `drawio-adapter`; inspect deterministic translation/source mechanics |
| renderer unavailable, unsupported output, timeout, or export failure | `renderer-runtime`; do not change process semantics |
| unexpected mechanics defect | `internal`; inspect implementation before changing truth |
| render semantically correct but confusing/ugly | pixel diagnosis -> compact composition delta |

Before reopening a stored material decision, compare the new evidence with its `reopen if` condition. If the condition is not met, preserve that upstream state and repair the smallest downstream defect. If it is met, re-enter at the owner of that decision and update only the dependent state.

Never add a second canonical contract, hidden fallback, or algorithmic semantic/layout fixer to repair an Agent reasoning problem.

## Completion truth

Keep claims separate:

- **modeling reviewed:** semantic closure was checked or unresolved truth exposed;
- **source generated:** build succeeded and the build report binds exact input, normalized plan, layout, and Draw.io source identities;
- **source valid:** Draw.io structural validation passed for the exact `sourceSha256`;
- **visual accepted:** the exact current render was inspected and accepted;
- **visual blocked:** no working renderer was available.

Deliver only claims supported by evidence from the current run.
