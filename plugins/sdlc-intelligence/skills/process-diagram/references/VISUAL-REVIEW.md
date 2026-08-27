# Visual Review

Inspect the exact current rendered image. A mechanically valid diagram can still communicate badly. First test whether the pixels support the **intended reader task and required answer**; then review whether the qualitative spatial scene survived projection. Occupied groups should preserve their intended relations, and reserved voids/corridors should still read as usable communication space. Do not begin by nudging coordinates; first classify whether the failure belongs to reader communication, spatial composition, or local projection.

## Inspect at multiple zoom levels

Move down and back up the visual hierarchy. A local repair is not accepted until the whole diagram still communicates correctly.

| Scale | Inspect | Typical failure |
|---|---|---|
| whole diagram | entry/outcomes, primary vs quiet regions, participant/milestone structure, overall density and visual mass | reader cannot acquire the process without tracing everything |
| region / semantic group | grouping strength, local reading order, branch/rework attachment, negative-space ownership | related work fragments or unrelated work looks grouped |
| connector / label | source-label-destination identity, fan-out, crossings, external captions, shared trunks | reader guesses which edge/label belongs where |
| optical detail | text wrapping, symbol recognition, tiny gaps, stroke/text collisions | mechanically valid geometry still looks broken or illegible |

After changing a local group, connector, or label, zoom back out and verify that the fix did not create a louder secondary region, break the primary read, or inflate the page without a communication reason. When perceptual diagnosis beyond structure/geometry is material, use [Diagram Visual Cognition](DIAGRAM-VISUAL-COGNITION.md).

## Read in reader order

1. **Reader-task success:** can the intended reader complete the target find/follow/compare/verify/decide/explain task and state the required answer without reconstructing hidden context?
2. **Primary read:** is the intended entry cue obvious, and can the reader acquire the primary path/regions before competing secondary detail?
3. **Critical context:** are the supporting responsibility, branch/join, message, retry/exception, and outcome facts needed to interpret the primary read still visible and locally associated?
4. **Perceptual hierarchy:** does attention follow primary -> critical -> deferred information, or do repeated fills, borders, labels, symbols, or empty regions create competing focal points?
5. **Grouping cue strength:** do proximity/alignment/whitespace make local semantic groups legible without inventing false notation containers or over-enclosing the page?
6. **Text as geometry:** do node/edge/header labels remain readable, attributable, and proportionate to the region they occupy, including wrapping and external-caption territory?
7. **Visual-mass discipline:** do color, stroke, symbol density, and repeated decoration reinforce rather than overpower the semantic/reader hierarchy? Essential meaning must remain understandable without color alone.
8. **Scene relations:** do the rendered pixels preserve the intended `before-P`, `beside-Q`, `aligned-with`, `returns-to`, containment, adjacency, and separation relations?
9. **Reserved voids:** are branch/label gutters, inter-band message channels, front clearance, and rear/outer-Q return corridors still visibly open rather than consumed by neighboring bodies/routes?
10. **Entry/outcome:** can the reader find starts and meaningful end states at the priority required by the task?
11. **Dominant spine:** does the main reader/business progression advance clearly on P without absorbing local side/rework work?
12. **Milestone slabs:** do review, handshake, retry, and exception units stay anchored to the right reader milestone rather than a long artificial chain?
13. **Semantic groups:** does each local validation/branch/handshake/retry unit read as one coherent 2D object with a normal path, side/rear zones, and enough envelope clearance from neighboring groups?
14. **Responsibility:** are pool/lane boundaries obvious and semantically correct for the reader task?
15. **Lateral work:** do peer review, verification, and branch siblings visibly consume Q breadth instead of drifting forward?
16. **Messages:** are cross-participant handshakes aligned locally and attached near the right milestones?
17. **Feedback/rework:** do return paths read as secondary rear/outer-Q circulation rather than "forward node plus awkward back arrow"?
18. **Connector traceability:** can each material branch/message/retry needed for the reader task be followed end-to-end without guessing which source, label, shared segment, or destination owns it? A long visual merge between independent edges away from an explicit common source/target is a defect; a short source fan-out stub is acceptable only when branch identity remains obvious.
19. **Labels:** are labels associated unambiguously with their node/edge, visibly separated from competing strokes/bends, and short enough that they do not consume the corridor they explain?
20. **Crossings/trunks:** do avoidable crossings or shared rails make branch/loop ownership ambiguous? Are repeated return/message routes still individually attributable rather than one accidental trunk?
21. **Presentation hierarchy:** does structural emphasis match the primary/critical/deferred information priorities rather than decorative preference? Are labels readable at the target viewing size without shrinking the whole diagram around verbose text?
22. **Balance/orientation:** does the chosen basis fit the real P-depth vs Q-breadth pressure, or is one dimension being used to compensate for poor block composition?

## Diagnose the mechanism before editing

| Pixel symptom | Likely cause | Correct reasoning / plan lever |
|---|---|---|
| local decisions/correction look like unrelated shapes despite belonging to one unit | no semantic group topology was constructed | rebuild intent/anchor/entry/exit/internal spine + side/rear zones before moving nodes |
| next milestone starts while a retry/branch still visually occupies the same area | group envelope omitted corridor/front clearance | reserve the full group envelope, then move the neighboring group beyond its front/side clearance |
| correction/retry is connected but sits far outside the local validation block | rear work was placed as a separate global node rather than a group zone | pull it into the anchor group's rear/side zone and keep the return rail group-local |
| group has huge empty gaps between members | spacing was chosen as safety padding rather than from projected footprint | compute body + label + route/stub gutter and snap to the smallest sufficient stage/track count |
| branch label or bend is squeezed immediately against a node | body clearance was budgeted but label/exit-entry stub room was not | add the smallest local gutter that clears the label and first/last segment; do not move the whole group |
| Flowchart endpoints are right but the interior elbow/return rail is mechanically awkward | endpoint sides do not specify the interior rail | keep the composition and set one explicit `corridorTrack`; if that still fails, treat it as mechanics evidence rather than adding empty stages |
| explicit Flowchart corridor reaches the right endpoint but one leg cuts through a node body/envelope | chosen endpoint face/rail has no physical line-of-sight through the local group | change the face/rail or recompose the obstructing local member; mechanics should reject the intersection, never auto-route around it |
| ordinary Flowchart edge would run straight through unrelated node bodies | a branch/outcome was stretched across another semantic group, or endpoint faces imply a known bad direct path | materialization rejects `FLOWCHART_ORDINARY_ROUTE_OBSTRUCTED`; run `measure --edge`, then prefer semantic-group recomposition when the outcome belongs locally, otherwise choose explicit sides/corridor. Do not ask mechanics to invent a detour |
| almost every action keeps drifting forward | causal order was mapped directly to P | rebuild dominant spine + milestone slabs; keep local/peer/rework actions anchored and spend Q |
| side review / verification sits far ahead of its decision | lateral role was promoted to a new milestone | move it into the decision/review slab; separate with `track` rather than artificial stage depth |
| rework node is ahead of the checkpoint and a long edge points backward | temporal order was mistaken for spatial progression | place rework with/behind its anchor and reserve an outer-Q return corridor |
| handshake is stretched as a serial chain across participants | exchange peers were treated as forward milestones | align send/receive/respond around one compact P interval and use responsibility/Q separation |
| primary path zig-zags | poor milestone assignment | repair the dominant spine / `stage` progression |
| branches overlap | block breadth was under-budgeted | enlarge local Q separation or internal block depth |
| join/decision labels ambiguous | shared trunk / poor entry sides | separate local branch corridors with `track` and `fromSide` / `toSide` |
| two independent edges visually become one connector before a real join | shared physical trunk erased connector identity | run `measure --edge` when the suspect segment is explicit/aligned; keep routes separate until the explicit semantic convergence point, then change local tracks/sides/group clearance rather than inventing a hidden merge |
| several same-side edges are individually valid but visually hide one another near a node | same-side terminal fan-out plus local spacing is still insufficient after renderer slot separation | run `measure --edge` to confirm the fan-out set, then try distinct endpoint sides where semantics permit or change local track/group spacing; mechanics may separate attachment slots within the chosen side but does not choose a new side |
| edge label reads like it belongs to the wrong branch/message | label sits in a shared/crossing corridor, participant-gap translation still leaves local competition, or the wording is too verbose for the available segment | first check the deterministic label role/placement in the current render; then shorten to the semantic discriminator or restore local corridor/side separation. Do not add global whitespace first, and do not patch generated label coordinates. |
| long message traverses empty canvas | milestones misaligned or participant over-modeled | align handshake slab or collapse/decompose external detail |
| feedback cuts through main path | no rear/outer-Q circulation | move return to an outer Q rail and use explicit sides if needed |
| several retry rails merge into one long trunk | return scopes were not ranked | stagger/mirror Q rails by loop scope and keep labels attributable |
| same-slab shapes overlap after rotation | Q footprint was measured on the wrong physical axis | LTR: compare heights; TTB: compare widths; choose enough track steps for footprint + gutter |
| one responsibility band unusually tall/wide | long-lived cross-axis separation | compact local tracks or rethink responsibility/block anchoring |
| diagram excessively long on P | artificial one-action-per-stage, forward drift, wrong basis, or too much parent detail | rebuild slabs first; only then compare rotated basis or decompose |
| external pool mostly empty | external internals modeled at wrong level | collapse to interaction milestones |
| labels collide despite valid geometry | block footprint omitted label territory | increase local slab breadth/depth or shorten labels |

If meaning is wrong, return to process truth. If the process is correct but the required answer is obscured by wrong scope, priority, or decomposition, return to the reader communication view. If reader priority is correct but attention, grouping strength, label hierarchy, visual mass, or connector attribution is wrong, return to diagram visual cognition. If perceptual intent is correct but the objects are actually misplaced/crowded, state the first violated spatial relation or consumed reserved void. If both cognition and composition are correct but the current plan/mechanics cannot express the required treatment without distortion, classify a translator gap rather than forcing a geometry or semantic hack. When the symptom matches a recurring topology failure and the correct shape is not obvious from prose rules alone, read [Contrastive Spatial Patterns](SPATIAL-PATTERNS.md) and transfer the matching reasoning pattern. Before moving to a broader state, compare the pixel evidence with any stored `reopen if` condition for that material decision. A local route/label defect does not reopen orientation, group topology, or process truth when their supporting basis still holds. If the local unit has no coherent shape, re-enter at **semantic group topology/envelope** before tweaking member ports. If the group is sound but a placement/adjacency/alignment relation is wrong, repair the spatial scene. If only a local clearance/route projection is wrong, use the smallest `recompose` delta. A `process-diagram-recompose/v1` delta cannot change `direction`; a systemic orientation change requires a new full composition with the same semantic graph and spatial relations. Never patch generated `mxGeometry` or pixel coordinates.

Treat presentation as subordinate to process communication, but do not treat it as irrelevant. Current notation styling is deterministic; do not invent brand/theme fields or use color as a substitute for process semantics. Improve the artifact first through truthful hierarchy the Agent already controls: concise labels, semantic shapes, local grouping, whitespace ownership, alignment, connector identity, and task-driven decomposition. When a stable perceptual requirement needs a renderer channel that the current plan/mechanics does not expose, preserve the intent and report a translator gap instead of pretending stage/track is a universal styling control.

For repair continuation, carry only actionable control state rather than the whole diagnosis narrative. If a real owner/agent/session/runtime transfer requires durable state, the dedicated Handoff contract may carry the same bounded packet:

```text
current plan/render identity:
first violated relation / consumed void:
KEEP material upstream decisions:
REOPEN decision (only if its condition fired):
smallest repair / delta intent:
```

This packet does not replace the current plan or pixels; it tells the next repair step what must remain stable and what is authorized to change.

Accept a larger diagram when the extra space makes the semantic block structure clearer. Visual optimization is subordinate to semantic clarity and editability.
