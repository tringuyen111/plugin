# Flowchart Library Contract

Use this when authoring or repairing an exact `process-diagram-plan/v1` with `kind: flowchart`. The Agent decides control meaning and composition; this reference defines what the current Flowchart execution arm can realize.

## When Flowchart is the right notation

Use Flowchart for a **single control/decision narrative** such as an algorithm, operating procedure, decision tree, validation routine, troubleshooting path, or simple business workflow where participant/message semantics are not material.

Use BPMN instead when the meaning depends on independent participants, Message Flow, explicit responsibility lanes/pools, synchronization/concurrency semantics, timer/message events, or BPMN exception behavior. Do not flatten those meanings into generic Flowchart arrows.

## Plan shape

```json
{
  "version": "process-diagram-plan/v1",
  "kind": "flowchart",
  "title": "Validate customer request",
  "direction": "left-to-right",
  "nodes": [
    {"id": "start", "type": "start", "label": "Request received", "stage": 0, "track": 0},
    {"id": "capture", "type": "input-output", "label": "Capture request", "stage": 1, "track": 0},
    {"id": "valid", "type": "decision", "label": "Valid?", "stage": 2, "track": 0},
    {"id": "process", "type": "process", "label": "Process request", "stage": 3, "track": -1},
    {"id": "reject", "type": "document", "label": "Issue rejection", "stage": 3, "track": 1},
    {"id": "done", "type": "end", "label": "Completed", "stage": 4, "track": -1},
    {"id": "rejected", "type": "end", "label": "Rejected", "stage": 4, "track": 1}
  ],
  "edges": [
    {"id": "f1", "type": "flow", "from": "start", "to": "capture"},
    {"id": "f2", "type": "flow", "from": "capture", "to": "valid"},
    {"id": "f3", "type": "flow", "from": "valid", "to": "process", "label": "Yes"},
    {"id": "f4", "type": "flow", "from": "valid", "to": "reject", "label": "No"},
    {"id": "f5", "type": "flow", "from": "process", "to": "done"},
    {"id": "f6", "type": "flow", "from": "reject", "to": "rejected"}
  ]
}
```

`pools` and `lanes` may be omitted or empty. Non-empty BPMN containers are rejected by the Flowchart arm. `direction` supports `left-to-right` (default) and `top-to-bottom`.

## Executable subset

**Nodes**

- `start` — explicit entry/terminator shape;
- `end` — explicit terminal outcome;
- `process` — action/operation;
- `decision` — the only branching node in this subset;
- `input-output` — input, output, read/write, capture/emit step;
- `document` — document/report/form artifact produced or handled as a process step.

**Edges**

- `flow` — directed control progression.

Optional edge sides: `west`, `east`, `north`, `south`. Optional `corridorTrack` is a safe integer naming one explicit Q-axis rail for an edge whose endpoint sides do not sufficiently determine the interior orthogonal route. It is a logical track, not a pixel waypoint list.

Unsupported in this arm: pools/lanes, Message Flow, participant handshakes, BPMN events/gateways, explicit concurrency/synchronization semantics, data associations, and UML semantics. Switch notation instead of approximating them with generic shapes.

### Construct exclusive reconvergence positively

When a Flowchart decision has alternatives that later share real common work, use [Split and Convergence Construction](SPLIT-CONVERGENCE.md) before placement. The `decision` opens an exclusive branch scope; model each alternative to its local completion, then connect those alternatives to the first genuine common continuation. That common process node may be the reconvergence target itself. Preserve branch identity until that target and do not invent a synchronization gateway. If the alternatives end in distinct outcomes, keep them separate with no decorative merge. If the required meaning is parallel-all or selected-subset synchronization, switch to BPMN.

## Exact semantic invariants

The Flowchart mechanics enforce facts they can establish deterministically:

- at least one `start` and at least one `end`;
- every `start` has no incoming flow and exactly one outgoing flow;
- every non-start node has incoming control flow;
- every non-end node has outgoing control flow;
- only `decision` nodes may branch to more than one outgoing flow;
- every `decision` has at least two outgoing branches;
- every outgoing decision branch has a non-empty, case-insensitively distinct label;
- all edge endpoints exist and self-loops are rejected;
- every node is reachable from at least one start;
- every node has a path to at least one end;
- two nodes may not occupy the same `stage`/`track` slot;
- different `stage`/`track` values do not guarantee physical clearance; after projection, positive-area node overlap fails as `FLOWCHART_COMPOSITION_NODE_OVERLAP` and must be recomposed by the Agent;
- every explicit `corridorTrack` path must stay outside the interior of every node envelope; mechanics rejects `FLOWCHART_CORRIDOR_INTERSECTS_NODE` rather than auto-routing around the obstruction;
- when an ordinary edge's resolved endpoint terminals form a deterministic axis-aligned direct path, that path must not pierce another node body; materialization rejects `FLOWCHART_ORDINARY_ROUTE_OBSTRUCTED` and leaves the repair choice to the Agent;
- non-aligned ordinary orthogonal interiors remain renderer-owned and therefore require rendered-pixel review; mechanics does not fabricate an obstacle-avoiding path for them;
- the computed page must stay within the resource-safety bound.

A build PASS proves these executable-library invariants and materializability. It does **not** prove that the user's business rule, decision criteria, or labels are substantively correct.

## Composition

- `direction`: `left-to-right` or `top-to-bottom`;
- `stage`: non-negative reader milestone along the selected primary axis;
- `track`: local separation on the cross axis;
- `fromSide` / `toSide`: optional routing intention using cardinal page sides;
- `corridorTrack`: optional single Q-axis rail. LTR projects it to Y; TTB projects it to X. Mechanics adds deterministic short endpoint stubs and Draw.io control points through that rail. Use it only when endpoint sides alone produce an ambiguous/ugly interior bend. The chosen side -> stub -> rail -> stub -> side polyline must have clear visibility around node envelopes; if not, change the face/rail or recompose the local group.

For `left-to-right`, stage advances on X and track separates vertically. For `top-to-bottom`, stage advances on Y and track separates horizontally. Ordinary forward edges resolve east -> west or south -> north respectively; backward loops use a cross-axis corridor unless explicit edge sides override it.

When the relation is already chosen but exact body clearance is uncertain, run `process-diagram.mjs measure` with the relevant node pair and P/Q axis. Mechanics reports the exact projected hard-body gap and minimum direct logical delta; add label/route breathing room explicitly with `--gutter`. For a suspect connector, `measure --edge <id>` reports resolved sides/fan-out and can prove node-envelope obstruction on explicit or axis-aligned direct segments; non-aligned ordinary interiors remain Draw.io-owned. If normal materialization rejects `FLOWCHART_ORDINARY_ROUTE_OBSTRUCTED`, use `measure --edge` on that unchanged plan to identify the blockers before choosing an explicit face/rail or local recomposition. Mechanics never selects the repair. The Draw.io adapter may allocate distinct attachment slots when several edges already share one chosen side, but it never changes that side.

Current scale cues:

| Cue | Current scale |
|---|---:|
| stage gap | 220 px |
| track gap | 110 px |
| start / end | 130 x 54 px |
| process | 160 x 64 px |
| decision | 90 x 90 px |
| input-output | 170 x 70 px |
| document | 170 x 72 px |
| page safety bound | 20,000 px per dimension |

Keep the main path near `track: 0`. Put short decision branches on nearby cross-axis tracks and return to the main baseline after convergence. Budget the smallest sufficient separation from projected node extent + label/bend gutter. Use explicit edge sides for local ports; when those ports still leave the interior rail ambiguous, add one `corridorTrack`. Do not use extra empty stages as a substitute for a route rail.

## Agent review before build

1. State one or more explicit starts and meaningful end outcomes.
2. Trace every node from a start and onward to an end.
3. Put every conditional branch behind a `decision` node.
4. Give each outgoing decision branch a short, distinct condition/result label such as `Yes` / `No`, `Valid` / `Invalid`, or `Retry` / `Stop`.
5. If the flow suddenly needs participant ownership, messages, synchronization, or event semantics, stop and use BPMN instead of stretching Flowchart.
6. Reserve a feedback corridor for loops so return arrows do not cut through the primary path.
7. For every `corridorTrack`, mentally trace side -> stub -> rail -> stub -> side. If any leg passes through a node envelope, do not build that composition; choose another physical face/rail or move the local rework member.
8. Do not route one branch outcome through unrelated work merely to align end states. Keep the outcome near the branch/milestone it terminates when that reduces connector competition; if a known direct ordinary route pierces another node, materialization will reject it rather than hide the defect.
