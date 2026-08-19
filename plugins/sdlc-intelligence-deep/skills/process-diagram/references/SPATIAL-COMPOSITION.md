# Spatial Composition on a Rotatable Plane

Use this when lateral work, orientation, dense branching, multiple responsibility bands, cross-participant messages, feedback/rework, exception corridors, or visual repair materially affects readability. This is **Agent reasoning guidance**. Mechanics does not search layouts or infer spatial intent.

## Contents

1. Core rule: causality is not visual advancement
2. Instantiate a qualitative spatial scene
3. Build a spatial skeleton before exact coordinates
4. Construct semantic spatial groups inside milestone slabs
5. Compose group envelopes before member coordinates
6. Use a local spatial basis and rotate footprint reasoning
7. Give every local block front, side, and rear circulation
8. Rank and stagger repeated return corridors
9. Materialize the skeleton into the current plan contract
10. Spatial invariants and failure re-entry
11. Preserve a compact spatial checkpoint

## Core rule: causality is not visual advancement

A process graph and a page layout answer different questions:

```text
causal graph:     what enables what, and what can happen next?
spatial skeleton: what should the reader perceive as forward, side work, exchange, return, and outcome?
```

Do not map every causal edge to `stage + 1`. Control edges carry temporal/causal order. `stage` carries reader/business progression. A causally later action can stay in the same milestone slab, sit laterally beside its anchor, or occupy a rear/rework position when that is the truthful visual role.

The page is a projection of several semantic dimensions:

| Semantic dimension | Meaning | Canonical control |
|---|---|---|
| progression | reader/business advancement | milestone slabs -> `stage` |
| responsibility | participant / lane ownership | pool/lane membership |
| local deviation | lateral branch, peer work, loop/rework clearance | `track` |
| route class | main, branch, message, feedback, exception | placement + edge sides |

## Instantiate a qualitative spatial scene

The missing bridge between a causal graph and coordinates is a **relation-first spatial scene**. Build it before exact stages/tracks for any diagram where grouping, branching, responsibility, feedback, orientation, or route clearance is material.

The scene is not a new executable artifact. It is an Agent working representation that makes spatial commitments explicit enough to reason about, rotate, audit, and repair.

### Model both matter and void

Track three kinds of spatial territory:

| Spatial territory | Examples | Proof owner |
|---|---|---|
| hard occupancy | node body, pool/lane body, deterministic corridor segment | mechanics can prove exact geometry facts |
| soft occupancy | external event/gateway labels, edge labels, perceived group hull, visual breathing room | Agent estimates before build; rendered pixels confirm |
| reserved void | branch/label gutter, inter-band message channel, front clearance, side clearance, outer-Q return rail | Agent owns the reservation; mechanics checks only explicit geometry it actually knows |

A human-readable diagram is not only an arrangement of shapes. It is an arrangement of **hard bodies + soft visual territory + intentionally preserved empty channels**. Neighboring objects are placed relative to this combined footprint, not their centers. Treat a reserved void as owned by the group/interaction that needs it until the scene is recomposed.

### Use a small qualitative relation graph

Represent material spatial relationships before coordinates:

| Relation | Meaning | Typical failure if omitted |
|---|---|---|
| `contains(A,B)` | B is perceived inside A's local unit/band | local work visually detaches from its owner |
| `anchored-to(A,B)` | A's placement is judged relative to checkpoint/group B | retries/peer work drift globally |
| `before-P(A,B)` | A is genuinely earlier in reader progression | every causal action becomes a new stage |
| `beside-Q(A,B)` | A is peer/lateral to B | breadth-heavy work becomes a serial chain |
| `aligned-with(A,B)` | A and B should read as the same local phase | handshake/parallel peers look temporally staggered |
| `adjacent-band(A,B)` | responsibility bands should remain interaction-near | message edges traverse unrelated territory |
| `separated-by(A,B,V)` | reserved void V must stay open between A and B | labels/routes have no circulation channel |
| `outside/around(R,E)` | route R circulates outside occupied envelope E | feedback/exception line cuts through the block |
| `returns-to(A,B)` | A is rework/feedback belonging to earlier checkpoint B | later-time action is placed falsely forward |

This is a **reasoning graph**, not a schema. Write only relations that constrain composition. Do not invent IDs/fields in `process-diagram-plan/v1` for it.

### Close the scene before metric placement

Before measuring gaps, prove qualitative closure:

1. Every off-spine object has an anchor or containing group.
2. Every neighboring group pair has a meaningful P/Q relation rather than accidental relative position.
3. Every message/branch/return/exception route has reserved circulation space owned by the interaction that needs it.
4. Every `before-P` relation corresponds to real reader/business progression; time order alone is insufficient.
5. Every local peer/rework relation can survive a 90-degree basis rotation without changing meaning.
6. No occupied envelope is planned to consume a reserved void without an explicit recomposition decision.

Only after these are stable should you estimate physical extents, choose orientation, and assign exact `stage`/`track`.

### Audit by asking what relation was lost

When a render looks wrong, do not begin with coordinates. First identify the violated scene relation:

```text
retry looks like next milestone
    -> `returns-to(retry, check)` / rear role was lost

parallel peers look serial
    -> `aligned-with(peerA, peerB)` or `beside-Q` was lost

next group crowds branch labels
    -> `separated-by(current,next,front-clearance)` was lost

feedback rail crosses a node
    -> `outside/around(returnRail, occupiedEnvelope)` was lost

message spans unrelated bands
    -> `adjacent-band(senderBand, receiverBand)` was lost
```

Then re-enter at the smallest relation/group/envelope that is false. Coordinates are a projection of the scene, so edit coordinates only after the intended relation is clear.

If the Agent understands the rule but keeps producing the same recognizable shape failure, read [Contrastive Spatial Patterns](SPATIAL-PATTERNS.md) and transfer only the matching mechanism. The examples make local topology visible; they do not add layout grammar or plan fields.

## Build a spatial skeleton before exact coordinates

### 1. Extract the dominant spine

From the causal graph, identify the smallest chain of milestones that a reader should follow to understand the main business progression from entry to meaningful outcomes.

The dominant spine is **not** every action in topological or narrative order. Local review, supplementary work, retries, participant handshakes, and recovery can attach to a spine milestone without becoming new global milestones.

Ask for each action or block:

- Does completing this change what milestone the reader thinks the process has reached?
- Or is it local work around the current milestone?

Only the first case inherently needs forward P progression.

### 2. Create milestone slabs

A **milestone slab** is the local P region around one reader/business milestone. It is a reasoning construct only; no new plan field is required.

A slab may contain several causally ordered actions when they form one local unit, for example:

```text
             side review
                 |
entry -> REVIEW SLAB -> next milestone
           |     |
       verify   revise
           \     /
            re-check
```

The actions inside the slab can use nearby stages if geometry needs internal depth, but the block should still read as one milestone region rather than a long serial chain.

### 3. Assign placement roles relative to the slab anchor

Use placement roles to decide **where** an action belongs before assigning a stage number.

| Role | Use when | P behavior | Q behavior / circulation |
|---|---|---|---|
| forward continuation | reader/business milestone advances | move to the next slab | remain near block baseline |
| lateral sibling / branch | alternative, peer review, verification, side work | stay in anchor slab or nearby block stage | consume Q breadth |
| exchange / handshake | peer interaction across responsibility bands | align the interacting milestones around one slab | reserve inter-band message space |
| rear / rework / feedback | work revisits an earlier checkpoint | stay at or behind the anchor block | use an outer-Q return corridor |
| terminal outcome | meaningful end state | follow the resolved milestone | separate on Q only when outcomes must remain distinct |

A later-in-time action is **not automatically forward**. If its reader role is peer, lateral, or rework, keep it spatially tied to the anchor and let the edge express when it happens.

## Construct semantic spatial groups inside milestone slabs

A milestone slab answers **which reader milestone owns this local work**. A semantic spatial group answers **what 2D object the local work forms inside/around that slab**. Use a group when several nodes/edges share one local meaning such as:

- validation + correction/retry;
- split + local branches + convergence;
- request/response handshake;
- peer review + revision;
- parallel work + synchronization;
- exception/recovery + return.

A group is an **Agent reasoning object only**. Do not add group IDs, nested containers, rows/columns, or a packing schema to `process-diagram-plan/v1`.

### Build a group from topology, not a grid

Construct the group in this order:

1. **Intent + anchor:** state the one local question/job the group communicates and which milestone/checkpoint anchors it.
2. **Boundary:** identify entry and exit of the group. If there are multiple terminal outcomes, identify the normal exit and the side terminal exits.
3. **Internal spine:** trace the shortest normal path through the group. This is local progression, not necessarily new global milestones.
4. **Side/rear zones:** attach alternatives, peer work, correction, retry, exchange, or exception work to the checkpoint they semantically belong to.
5. **Internal corridors:** reserve branch, message, return, and exception routes before placing members; each important edge should have a route class and a place to circulate.
6. **Envelope:** wrap the member bodies, labels, and corridors with breathing room. Treat this envelope as occupied space when composing neighboring groups.

Think in relative topology such as:

```text
VALIDATION GROUP

                  side terminal / exception
                           |
entry -> check A -> check B -> normal exit
           |         |
           +----+----+
                v
          correction/rework
                |
          rear return rail
```

The sketch is not a row/column template. It communicates **normal spine + side/rear zones + return circulation**. After rotation, the same group topology survives while page X/Y changes.

### Compose groups before composing nodes globally

Once a group's topology is stable, estimate its envelope:

- **P depth:** entry-to-exit span plus any necessary internal phases;
- **Q breadth:** side/rear members, labels, responsibility separation, and corridor rails;
- **front clearance:** space needed after the exit before the next forward group;
- **side/rear clearance:** space reserved so local branch/return routes are not invaded by neighboring groups.

Place groups relative to **envelopes**, not to isolated node centers. A next forward group begins after the previous group's front clearance. A lateral peer group occupies Q beside its anchor. A rear/rework group remains within or immediately behind its anchor envelope.

This is the missing step between `slab` and `stage/track`: first decide the 2D shape of the meaning unit, then place its members.


## Budget the smallest sufficient spacing

Treat whitespace as a scarce communication resource. First compute the clearance required by the **projected** bodies, then add only named local gutter:

```text
Q / track (center-stepped):
  required center gap
    ~= half(Q extent A) + half(Q extent B) + named gutter
  track steps
    = ceil(required center gap / track gap)

P / stage (leading-edge stepped):
  if B is after A:
    required stage steps
      = ceil((P extent A + named gutter) / stage gap)
  if B is before A:
    required stage steps
      = ceil((P extent B + named gutter) / stage gap)
```

Use the smallest integer count that satisfies the block. `track` is center-stepped on Q; `stage` advances a node's leading edge on P, so P clearance is directional when node extents differ. They are coordinates, not occupancy cells, so `track + 1` or `stage + 1` is not proof of clearance. One extra stage is not a harmless margin: it can add hundreds of pixels, weaken group identity, shrink labels when the whole canvas is scaled, and make a local branch look like a new milestone. Conversely, do not force compactness below the label/corridor budget. The target is **compact but breathable**. When body clearance or a hard group hull is the uncertain part, use the read-only `measure` command on the current valid plan and pass the Agent-owned soft/route allowance as `--gutter`; mechanics returns exact projected body facts. For same-stage P comparisons it reports the two directional minima instead of choosing which node should be earlier. It never chooses a replacement stage/track, infers the relation, or models label territory. Mechanics may reject actual positive-area node overlap after projection, but it must not auto-recompose.

For a decision-to-side-work branch, budget enough Q room for the node bodies, the branch label, and a short exit/entry segment before the bend. For the next forward group, budget only the front envelope actually occupied by members and internal routes; do not reserve an empty milestone slab merely because the current group is complex.

## Think in block depth, breadth, and corridor demand

For each nontrivial semantic group, estimate a coarse envelope before orientation or exact tracks:

- **P depth** — how many visible internal phases/milestones the group genuinely needs;
- **Q breadth** — how many lateral siblings, parallel/peer actions, responsibility bands, and return/message corridors must coexist;
- **corridor demand** — where main, message, feedback, and exception routes need clean circulation;
- **label demand** — where edge/node labels consume visual territory;
- **neighbor clearance** — where the next/adjacent group may begin without visually merging into this group.

This prevents the common failure mode:

```text
causal sequence exists
    -> advance P
    -> advance P again
    -> draw a long back-edge later
```

when the better model is:

```text
anchor milestone
    -> keep local side/rework block near anchor
    -> spend Q breadth
    -> return to the spine
```

A breadth-heavy block should get cross-axis space before it gets extra forward stages.

## Use a local spatial basis

Represent the composition with two local basis vectors:

```text
P = primary reader/business progression axis
Q = cross axis used for responsibility, lateral work, branches, loops, and clearance
```

Supported materializations are:

```text
left-to-right:  P -> page X     Q -> page Y
top-to-bottom:  P -> page Y     Q -> page X
```

Changing orientation is a **basis change**, not a different process model. Causality, ownership, placement roles, branch meaning, and outcomes must survive rotation unchanged.

Choose orientation **after** the spatial skeleton exists. Compare the hardest block in both bases when the answer is not obvious:

| Pressure | What it means |
|---|---|
| high P depth | many real reader milestones / long dominant spine |
| high Q breadth | many responsibility bands / lateral siblings / branch fan-out |
| high message pressure | interaction peers need adjacency and short cross-band corridors |
| high return pressure | several feedback/rework/exception rails need outside space |
| target aspect | portrait vs wide reading surface changes available P/Q capacity |

Choose the basis that best preserves the block structure, not the one that merely makes the page smaller.

## Rotate the footprint, not only the coordinates

A 90-degree basis change also rotates which physical node dimension consumes Q.

```text
left-to-right:  Q -> page Y -> use node HEIGHT for cross-axis clearance
top-to-bottom:  Q -> page X -> use node WIDTH for cross-axis clearance
```

For two same-slab shapes A and B, estimate:

```text
required Q center gap
  ~= 0.5 * Q_extent(A)
   + 0.5 * Q_extent(B)
   + gutter_for_labels_and_edges

track steps
  ~= ceil(required Q center gap / track_gap)
```

This is a planning heuristic, not a second executable schema. Use notation scale cues for current node sizes and track gaps. Dense labels or nearby corridors need a larger gutter.

Example: in top-to-bottom BPMN, a task's Q extent is its width (~160 px), not its height. Two equal tasks therefore need roughly 160 px plus gutter between centers; two 62 px track steps are insufficient, while three steps are usually enough.

## Give every local block front, side, and rear circulation

Reason about relative **faces** before page-specific ports:

```text
                  SIDE / peer / branch
                         |
REAR / return  <- [ local block ] -> FRONT / next milestone
                         |
                  SIDE / exchange
```

- **Front** is for genuine reader/business continuation.
- **Side** is for peer/lateral work, branches, and cross-responsibility exchanges.
- **Rear** represents rework/feedback toward a previous checkpoint.

These are semantic faces. The physical `fromSide` / `toSide` may differ when a clean outer-Q route requires leaving from a side port.

### Forward continuation

Advance P when the reader should understand that a new milestone has been reached. Keep the main spine visually monotone and near the local baseline.

### Lateral review / peer work

Keep peer review, verification, supplementary checks, and side decisions near their anchor slab. Spend Q breadth first.

```text
                 peer check
                    |
previous -> [ REVIEW ] -> next milestone
                    |
                 revision
```

Do not turn `peer check -> revision -> re-check` into three global forward milestones when the reader should perceive them as one review/rework unit.

### Handshake / exchange

A participant handshake is a **cross-band local block**, not a serial chain that should drag every peer milestone forward.

```text
participant A   ... send ---- wait/receive ---- continue ...
                      |          ^
                      | message  | message
                      v          |
participant B      start ---- handle ---- respond
```

Align the exchange around a compact P interval. Let responsibility bands and Q carry the peer separation. Internal Sequence Flow remains inside each participant; Message Flow crosses bands.

### Rear / rework / feedback

If work revisits an earlier checkpoint, place the rework node with that checkpoint or slightly behind it in P, then reserve an outer-Q return corridor.

```text
                   normal continuation
anchor -> decision ----------------------> next
           |                                ^
           | revise                         |
           v                                |
        [rework] ---- re-check -------------+
             \_____ outer Q return _______/
```

Do not push the rework node into a later forward slab merely because it occurs later in time. That produces the visually awkward pattern of "keep moving forward, then draw a long arrow backward." The edge already carries temporal order; placement should carry the return meaning.

### Terminal outcomes

Keep alternative terminal outcomes near the milestone that resolves them. Separate them on Q when the reader must distinguish outcome classes, but do not keep advancing P just to avoid overlap.

## Rank and stagger repeated return corridors

When several retries/rework loops overlap in P, one shared outer rail can become an unreadable trunk. Give return corridors a simple **scope rank**:

1. local retry nearest the block hull;
2. broader rework farther out;
3. exception/escalation farther still when it spans more of the process.

If two returns overlap heavily in P and their labels/trunks would merge, stagger them onto different Q rails or mirror one to the opposite Q side. Keep each rail attributable to one loop/block.

This is spatial reasoning, not a routing algorithm: choose the rail intentionally, then express it with `track` and edge sides.

### Prove face-to-rail visibility

A named rail is not enough. For each explicit Flowchart corridor, trace the deterministic polyline in this order: source side -> source stub -> Q rail -> target stub -> target side. Every segment must stay outside every node/group envelope except for touching its own endpoint boundary. A common failure is a same-slab rework node sitting directly between the rail and the target port; the edge reaches the right node but one rail leg cuts straight through the rework body. Fix that by changing the physical endpoint face, moving/mirroring the rail, or placing the rework member slightly rearward/laterally so the rail has line-of-sight. Do not add forward stages merely to create route space. Mechanics may reject an intersecting explicit corridor, but it must not search for a new route.

## Materialize the skeleton into the current plan contract

Only after the skeleton is stable, translate it:

```text
dominant spine milestone     -> stage progression
semantic group envelope   -> reserve local P/Q interval before neighboring groups
group internal spine      -> compact internal stage progression
slab/group side work      -> same / nearby stage + different track
exchange peer             -> aligned stage interval across responsibility bands
rear/rework               -> same/earlier group position + outer-Q track/corridor
front/side/rear intent    -> node placement + fromSide/toSide where needed
```

Do not create new hidden metadata. `process-diagram-plan/v1` remains the only canonical plan.

## Spatial invariants worth proving before build

1. **Milestone integrity:** P advancement corresponds to reader/business progression, not every causal step.
2. **Group integrity:** every nontrivial local unit has one intent, anchor, entry/exit, normal internal spine, and intentional side/rear zones.
3. **Envelope integrity:** group envelopes include shapes, labels, internal corridors, and gutter; neighboring groups do not intrude into them.
4. **Role integrity:** every off-spine group/member has an anchor and a forward/lateral/exchange/rear/terminal role.
5. **Breadth integrity:** breadth-heavy groups use Q capacity instead of artificial stage depth.
6. **Locality:** a review/handshake/retry group occupies a compact slab interval unless its meaning is genuinely long-running.
7. **Return-to-spine:** temporary Q deviation returns toward the dominant spine after the local group.
8. **Rear-circulation integrity:** rework/retry nodes are placed with the checkpoint they revisit; the return edge is secondary circulation rather than a visual contradiction.
9. **Corridor separation:** main, message, feedback, and exception routes do not rely on one ambiguous long trunk.
10. **Responsibility adjacency:** frequently interacting bands stay close enough that messages do not traverse unrelated territory.
11. **Projection clearance:** Q separation uses the footprint dimension produced by the selected basis.
12. **Orientation stability:** rotation does not change causal graph, ownership, group identity/topology, placement roles, or outcomes.
13. **Minimum-sufficient spacing:** no stage/track gap is larger than needed without a named reader/corridor reason, and none is smaller than the projected body + label + route/stub budget.
14. **Corridor visibility:** each explicit Flowchart corridor has clear source-face -> rail -> target-face line-of-sight outside every node/group envelope; a rail hidden behind a local member is not a valid composition.
15. **No mechanics wishful thinking:** every important corridor is already expressed by the composition; no imagined router is expected to invent it. For Flowchart, one explicit `corridorTrack` may name a Q rail when endpoint sides alone cannot materialize the intended bend.
16. **Connector identity:** every material branch/message/retry remains traceable from source to destination; independent edges do not visually merge into a long shared trunk before an explicit semantic convergence point.

## Re-enter at the smallest spatial scale

When pixels are semantically correct but hard to read:

```text
single port / label / clearance defect
    -> adjust side or local track

explicit corridor leg pierces a node/group envelope
    -> change physical face/rail or recompose the local member; mechanics must reject, not reroute

one group looks loose, stretched, or internally shapeless
    -> rebuild its internal topology + envelope before moving individual members

next/adjacent group intrudes into local branches or retry circulation
    -> restore envelope clearance and group-to-group adjacency

one group has wrong breadth/depth
    -> rebuild that group inside its slab

lateral/rework work has drifted forward
    -> reclassify placement roles and rebuild milestone slabs

several return rails merge
    -> rank/stagger/mirror outer-Q corridors

many blocks fight the same Q capacity
    -> revisit responsibility order or whole-plane orientation

entire diagram has the wrong aspect / reading burden
    -> preserve process truth + spatial roles, re-project in the other supported basis

meaningful unit remains too large in both bases
    -> decompose the process view

mechanics cannot materialize explicit valid intent
    -> only then treat it as a mechanics defect
```

A `process-diagram-recompose/v1` delta can fix stage/track/edge sides inside the same orientation. A whole-plane orientation change requires a new full canonical composition with the same process graph and placement roles.

## Preserve a compact spatial checkpoint

For a materially nontrivial diagram, keep this internal checkpoint before exact authoring:

```text
spatial scene:
  communication target / medium:
  dominant spine milestones:
  occupied regions:
    milestone slabs / responsibility bands / semantic groups:
  material relations:
    contains / anchored-to / before-P / beside-Q / aligned-with / adjacent-band / returns-to:
  reserved voids:
    owner + purpose + front/side/rear/message/return scope:
  semantic groups per slab:
    intent / anchor / entry / exit:
    internal spine + side/rear zones:
    internal corridors:
    P/Q envelope + neighbor clearance:
  placement roles + anchors:
  P depth / Q breadth of dense groups:
  message / feedback / exception corridor ranks:
  orientation candidates considered:
  chosen direction + reason:
  projected Q footprint / clearance hotspots:
  blocks needing explicit sides:
  material decision memory when handoff/re-entry matters:
    decision / supporting relation or footprint basis / reopen if:
```

Use material decision memory selectively for spatial choices whose reopening would trigger broad recomposition: orientation, responsibility-band order/adjacency, major group anchoring/topology, or return/message corridor strategy. Do not log every `stage`, `track`, or port choice. A useful `reopen if` names the evidence that changes the original pressure or relation, for example `global Q pressure is no longer localized` rather than `layout looks bad`.

This checkpoint is reversible composition truth, not process truth. Keep a material decision while its basis remains valid. If visual evidence satisfies its `reopen if` condition or directly falsifies that basis, update the smallest affected spatial assumption without re-brainstorming causality.
