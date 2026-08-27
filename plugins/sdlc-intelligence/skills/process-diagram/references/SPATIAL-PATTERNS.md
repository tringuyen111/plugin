# Contrastive Spatial Patterns

Use this reference when the process semantics are already understood but the Agent needs a stronger **visual-spatial prior** for composing or repairing a nontrivial local block. These are transfer examples, not coordinate templates and not new plan/schema fields.

Read only the pattern that matches the current failure or design pressure. Preserve the current semantic checkpoint and spatial decision memory. A pattern is useful only if its **reason** matches the current process; similarity of shape alone is not enough.

## Pattern map

| Signal | Pattern |
|---|---|
| many local actions keep becoming new forward stages | 1. Local work drifting forward |
| retry/revision sits after the checkpoint with a long back edge | 2. Rework placed as future work |
| participant exchange stretches across many stages/bands | 3. Handshake stretched into a serial chain |
| several edges become visually indistinguishable or labels lose ownership | 4. Shared-trunk / connector ambiguity |
| a rotated layout overlaps or feels unexpectedly cramped | 5. Logical spacing reused after basis change |

## 1. Local work drifting forward

### Transfer cue

Several causally ordered actions belong to one review/validation/approval milestone. The reader should perceive a **single local unit**, not a new business milestone for every internal action.

### Bad shape

```text
entry -> validate -> specialist review -> revise -> re-check -> next milestone
                    (every action consumes P)
```

This is semantically legal but spatially misleading when review/revision are local work. The page says “progress, progress, progress” and later requires long return edges or excessive canvas length.

### Why it fails

- causal order was mapped directly to P progression;
- the validation group never received an anchor or local envelope;
- Q breadth was available but unused;
- internal work becomes globally important merely because it happens later in time.

### Better structure

```text
                        specialist review
                              |
entry -> [ VALIDATE ] --------+------> next milestone
             |                |
             +---- revise ----+
                    |
                 re-check
```

Interpretation:

- `VALIDATE` is the anchor milestone;
- specialist review is `beside-Q` / lateral work;
- revision/re-check remain inside the validation semantic group;
- only completion of the group advances to the next reader milestone.

### Transfer invariant

Spend Q for **peer/local breadth** before inventing new P milestones. Internal stages are allowed when geometry needs them, but the group must still read as one anchored unit.

### Reopen if

Reopen the grouping decision if one internal action becomes a separately governed business milestone, changes responsibility/outcome in a way the parent reader must track globally, or has long-lived independence from the anchor.

---

## 2. Rework placed as future work

### Transfer cue

A reject/revise/retry action exists only because an earlier checkpoint must be revisited.

### Bad shape

```text
check -> decision -> next work -> revise
          ^                    |
          +--------------------+
```

The revision node is placed forward because it happens later, then a long edge points backward. The edge and placement tell opposite stories.

### Why it fails

- temporal order was mistaken for spatial advancement;
- `returns-to(revise, check)` was not made a first-class relation;
- no rear/outer-Q circulation was reserved before coordinates;
- later forward groups consume the only route space for the retry.

### Better structure

```text
                         normal continuation
entry -> check -> decision --------------------> next
           ^        |
           |        v
           |      revise
           |        |
           +========+
             outer-Q return
```

Interpretation:

- revise is anchored to `check` and occupies a rear/side zone of that group;
- the outer-Q return is a **reserved void with ownership**, not leftover whitespace;
- the return edge carries later-time order while placement carries rework meaning.

### Transfer invariant

A rework node should normally stay with or slightly behind the checkpoint it revisits. Rank broader loops farther from the local hull; do not share one ambiguous rail between unrelated retry scopes.

### Reopen if

Reopen the rear/rework classification if the “retry” actually launches a new independent case, changes the meaningful business milestone, or transfers responsibility/outcome so that it is no longer local recovery.

---

## 3. Handshake stretched into a serial chain

### Transfer cue

Two independent participants exchange a request/response or notification/acknowledgement around one business milestone.

### Bad shape

```text
Participant A: send ------------------------------ receive -> continue
                    \                            /
Participant B:       start -> inspect -> handle -> respond

(the two sides drift across many unrelated P stages)
```

The exchange is technically connected but visually reads as two distant stories with long messages crossing unrelated territory.

### Why it fails

- message timing was treated as the primary page axis;
- interacting responsibility bands were not made `adjacent-band`;
- peer milestones were not `aligned-with` around the same slab;
- inter-band message space was not reserved before neighboring work was placed.

### Better structure

```text
Participant A: ... send ---- wait/receive ---- continue ...
                      |          ^
                      | message  | message
                      v          |
Participant B:    msg-start -> handle -> respond
```

Interpretation:

- the exchange occupies one compact P interval;
- responsibility separation lives on Q / participant bands;
- Message Flow crosses participants; each participant keeps its own internal Sequence Flow;
- the inter-band gap is a reserved communication channel.

### Transfer invariant

Align the **interaction milestones**, not every internal action. External participant internals that do not change the parent reader's decision should be collapsed/decomposed rather than stretching the collaboration.

### Reopen if

Reopen the compact-handshake decision if one participant continues substantial independent work whose duration/order is itself part of the requested communication, or if the interaction is not actually between independent participants.

---

## 4. Shared-trunk / connector ambiguity

### Transfer cue

The render is mechanically valid but the reader cannot trace one branch/message/retry end-to-end without guessing which line belongs to which source, label, or destination.

### Bad shape

```text
             branch A ----\
decision ---- branch B -----+================> later nodes
             branch C ----/

labels sit near the shared segment; the physical merge occurs before a semantic join
```

Another bad form is two independent return/message edges that overlap for a long segment and visually become one rail even though no semantic merge exists.

### Why it fails

- connector geometry created a **visual merge without a semantic merge**;
- branch labels lost ownership after leaving the split;
- several routes consumed the same reserved void;
- a shared trunk is doing more semantic work than the nodes/gateways express.

### Better structure

```text
             A -----------\
                           > explicit join / target
             B -----------/

decision
   |
   +-- C -----------------> separate outcome
```

or, for independent loops/messages:

```text
local retry       ===== nearest outer-Q rail =====>
broader rework  ========= farther rail ==========>
```

Keep routes independently traceable until the **actual semantic convergence point**. Put short branch labels close enough to the split that their owner is obvious. If same-side edges visually hide one another, change sides, local tracks, or group spacing; do not invent free-form waypoints.

### Transfer invariant

Every material connector should have a readable identity from source to destination. A short common stub immediately at one explicit split/source can be acceptable when the fan-out and labels remain obvious; a long shared stroke between semantically independent edges away from that source/target is not. A crossing can be acceptable when ownership remains obvious.

### Reopen if

Reopen the topology only if the process semantics reveal a real merge/join that was missing. Otherwise repair projection/corridor ownership and keep the semantic graph stable.

---

## 5. Logical spacing reused after basis change

### Transfer cue

A layout that was clear left-to-right becomes cramped/overlapping top-to-bottom, or vice versa, even though the same stage/track numbers were reused.

### Bad assumption

```text
LTR: track gap of 1 looked safe
rotate 90°
TTB: keep track gap of 1 because the logical graph did not change
```

The graph did not change, but the **physical dimension projected onto Q did**.

### Why it fails

- orientation was treated as coordinate swapping rather than a basis change;
- Q clearance reused logical distance without rotating the node footprint;
- soft occupancy such as labels/bends was omitted from the new projection.

### Better reasoning

```text
same spatial scene
      |
      +-- LTR: Q uses physical HEIGHT
      |
      +-- TTB: Q uses physical WIDTH

required Q center gap
  ~= 0.5 * extent(A) + 0.5 * extent(B) + local gutter
```

Re-estimate the hardest group's P/Q envelope in the candidate basis, then choose the smallest sufficient integer stage/track separation.

### Transfer invariant

Rotation preserves semantics, group identity, anchors, and qualitative relations. It does **not** preserve physical clearance numbers automatically.

### Reopen if

Reopen orientation itself when many groups fight the same Q capacity or the target medium/aspect changes materially. If only one local pair is tight, keep orientation and repair local projection.

---

## Use examples as priors, not templates

A good transfer sequence is:

```text
recognize the failure class
      -> name the governing relation / reserved void
      -> copy the reasoning pattern, not coordinates
      -> instantiate current group/participants/labels
      -> estimate current footprint
      -> materialize with current notation controls
      -> inspect exact pixels
```

Do not force a process into one of these patterns when its semantic evidence disagrees. The purpose of SHOW is faster pattern recognition and better first-pass composition, not a library of canned layouts.
