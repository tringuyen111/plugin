# BPMN Library Contract

Use this when authoring or repairing the exact `process-diagram-plan/v1`. The Agent decides process meaning and composition; this reference defines what the current BPMN execution arm can realize.

## Plan shape

```json
{
  "version": "process-diagram-plan/v1",
  "kind": "bpmn",
  "title": "Order approval",
  "direction": "left-to-right",
  "pools": [{"id": "company", "label": "Company"}],
  "lanes": [{"id": "sales", "poolId": "company", "label": "Sales"}],
  "nodes": [
    {"id": "start", "type": "start", "label": "Request received", "laneId": "sales", "stage": 0, "track": 0},
    {"id": "review", "type": "user-task", "label": "Review request", "laneId": "sales", "stage": 1, "track": 0},
    {"id": "end", "type": "end", "label": "Closed", "laneId": "sales", "stage": 2, "track": 0}
  ],
  "edges": [
    {"id": "e1", "type": "sequence", "from": "start", "to": "review"},
    {"id": "e2", "type": "sequence", "from": "review", "to": "end"}
  ]
}
```

`pools` and `lanes` are optional for a single unpartitioned process. If a pool declares lanes, every flow node in that pool must belong to one of them. `direction` supports `left-to-right` (default) and `top-to-bottom`.

## Executable subset

**Events:** `start`, `start-message`, `start-timer`, `end`, `end-message`, `end-error`, `end-terminate`, `intermediate-message`, `intermediate-timer`.

**Activities:** `task`, `user-task`, `service-task`, `manual-task`, `send-task`, `receive-task`, `subprocess`.

**Gateways:** `gateway-exclusive`, `gateway-parallel`, `gateway-inclusive`.

**Flows:** `sequence`, `message`.

Optional edge sides: `west`, `east`, `north`, `south`.

A `sequence` stays inside one participant pool and may cross lanes. A `message` crosses between two distinct participant pools.

## Translation gate

| Required meaning | Representation |
|---|---|
| ordered control inside one participant | `sequence` |
| communication between participants | `message` |
| exactly one condition branch continues | `gateway-exclusive` |
| all branches start concurrently | `gateway-parallel` |
| one or more condition branches may continue | `gateway-inclusive` |
| first arriving event chooses path | **unsupported: event-based gateway** |
| interrupting/non-interrupting boundary event | **unsupported** |
| data object / text annotation / association / compensation | **unsupported** |

For a material fork/reconvergence, construct the branch scope before applying this translation table. Use [Split and Convergence Construction](SPLIT-CONVERGENCE.md): determine the activation set, each branch completion, and the convergence contract first. In the supported subset, a parallel join synchronizes the fixed forked set, an inclusive join waits for the branches actually activated, and an exclusive merge reconverges alternatives without synchronizing inactive paths. A branch that terminates or continues independently does not require a join merely for diagram symmetry.

Do not approximate unsupported meaning with a visually similar supported construct. A supported re-expression is acceptable only when process semantics are unchanged.

## Composition fields

- `direction`: `left-to-right` or `top-to-bottom`.
- `stage`: non-negative integer milestone along the selected primary reading axis.
- `track`: integer local cross-axis offset inside the node's lane/pool/canvas band.
- `fromSide` / `toSide`: optional local endpoint-face intention; omit for ordinary default routing. Use explicit sides when the local branch territory makes the intended entry/exit face material.
- `corridorTrack`: Flowchart-only. BPMN intentionally has no canonical interior-route coordinate primitive.

For `left-to-right`, pools/lanes are horizontal responsibility bands and stage advances on X. Ordinary forward Sequence Flow defaults east -> west; for `top-to-bottom`, ordinary forward Sequence Flow defaults south -> north. These defaults do not know or infer split/join semantics. Cross-pool messages keep participant-oriented defaults. Compose fork/join relations at the spatial level before routing: choose a communicatively useful lane order, reserve branch-entry and convergence fronts, budget `stage`/`track` space, then choose endpoint sides from the branch territories. Lane order is a presentation relation, not business chronology; when responsibility semantics allow, placing the fork/join owner's lane between sibling branch lanes can reduce one-sided fan pressure, but this is not a universal rule.

When the relation is already chosen but exact body clearance is uncertain, run `process-diagram.mjs measure` with the relevant node pair and P/Q axis. Same-band measurements can translate the hard-body requirement into a minimum direct `stage`/`track` delta; cross-band measurements report absolute clearance without pretending that local `track` is a global band-placement control. For a suspect Sequence/Message Flow, `measure --edge <id>` reports resolved sides, same-side peers, absolute source/target rectangles, and effective terminal points. A non-aligned ordinary interior remains renderer-owned. If lane order, stage/track spacing, and explicit endpoint sides still cannot preserve a material route relation after rendered inspection, classify that as a `translator-gap`; do not smuggle Draw.io bends or pixel coordinates into the plan.

There is no small arbitrary stage/track limit. Different logical tracks are center-step coordinates rather than reserved cells: if projected node rectangles still overlap with positive area inside the same canvas/pool/lane container, mechanics rejects `BPMN_COMPOSITION_NODE_OVERLAP` and the Agent must recompose spacing. Mechanics also rejects invalid values, exact slot collisions, or a computed page beyond the resource-safety bound; it does not move nodes automatically.

## Hard invariants enforced by mechanics

The library rejects facts it can establish exactly:

- malformed plan values and unsupported node/edge types;
- duplicate IDs or dangling edge endpoints;
- inconsistent/unknown pool-lane ownership;
- sequence flow crossing participant pools;
- message flow that does not cross distinct pools;
- start events with incoming sequence flow;
- end events with outgoing sequence flow;
- any non-start flow node without incoming Sequence Flow;
- any non-end flow node without outgoing Sequence Flow;
- two nodes occupying the same stage/track slot in one responsibility band;
- positive-area physical node overlap after projection inside the same canvas/pool/lane container;
- computed pages beyond the renderer resource-safety limit.

For this executable subset, start-event types are the explicit process/fragment entry mechanism and end-event types are the explicit exit mechanism. A Message Flow never substitutes for Sequence Flow control inside one participant. The contract does not expose BPMN `instantiate=true` Receive Task semantics; when a message starts a participant fragment, use `start-message` and continue by Sequence Flow.

It does **not** score process quality, prove global graph reachability/deadlock freedom, guess split/join roles, or optimize layout. Those remain Agent responsibilities described in `SKILL.md`. Deterministic failures carry an explicit causal boundary (`plan-contract`, `bpmn-semantics`, or `composition`); the CLI preserves that boundary instead of inferring it from error-code spelling.
