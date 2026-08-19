# Reader Communication View

Use this reference when the diagram's reader task, information priority, notation competence, viewing medium, or decomposition choice can materially change what should be visible or prominent. This is **Agent reasoning state**, not a new plan IR. The canonical plan still records only the concrete composition decisions needed to materialize the chosen view.

## Start from the reader task, not a persona label

Do not design for an abstract role such as "executive", "operator", or "auditor" unless the user's request actually defines the task that role must perform. Two people with the same job title can need different diagrams; two different roles can need the same reading task.

State the smallest useful reader contract:

```text
reader task:
  find / follow / compare / verify / decide / explain what?
required answer:
  what should a successful reader be able to state or do after reading?
primary read:
  which process facts/path must be acquired first?
critical supporting context:
  what must remain visible so the primary read is not misleading?
deferrable detail:
  what can be compressed, grouped, or moved to a child view without changing the required answer?
entry + trace path:
  where should the eye enter, and which regions/relations must remain traceable?
notation competence / medium:
  only facts that materially change symbol choice, label burden, density, or decomposition
```

If the request already makes this obvious, decide it without asking. Ask only when two materially different reader tasks would require different visible content and the intended task cannot be inferred safely.

## Translate reader task into composition pressure

The reader task does not change process truth. It changes **which truthful facts must dominate the communication view**.

| Reading task pressure | Keep visually primary | Keep as critical context | Typical detail to defer |
|---|---|---|---|
| orient / overview | trigger, outcomes, participants, dominant milestones | major handoffs and material exceptions | local implementation/retry internals |
| follow / operate | normal action path, local decisions, recovery/retry exits | owner transitions, stop/escalation conditions | unrelated controls and secondary participant internals |
| verify / audit | responsibility, decision/control points, handoffs, exception ownership | enough normal flow to prove where the control applies | operational micro-steps that do not affect the control conclusion |
| compare / decide | alternatives, branch conditions, consequences/outcomes | shared prerequisites and convergence points | repeated implementation detail common to all alternatives |
| explain / learn | stable reading order, explicit labels, recognizable notation | enough context to interpret symbols and ownership | notation nuance or low-value detail that raises decoding burden |

These are pressures, not fixed templates. If the actual task cuts across rows, state the required answer and derive the view from that answer.

## Use three information priorities

### 1. Primary read - must find

The reader should acquire this with minimal search. Start with the Agent-owned structural levers that already exist:

- dominant spine and milestone placement;
- responsibility band order;
- local group placement;
- concise labels;
- whitespace around important transitions/outcomes;
- decomposition when detail would otherwise mask the primary path.

When structural clarity alone is not enough, continue into [Diagram Visual Cognition](DIAGRAM-VISUAL-COGNITION.md) to reason about attention, grouping strength, labels, connector identity, visual mass, and accessibility. Do not invent arbitrary Draw.io style values or counterfeit semantics merely to create emphasis; if the current translator cannot express a stable perceptual requirement, keep the process/composition truthful and expose the translator gap.

### 2. Critical supporting context - must not confuse

This information may be secondary, but hiding it would make the primary read false or ambiguous. Common examples:

- the owner of a recovery step;
- the join that makes a branch safe to continue;
- the message counterpart that makes a handoff meaningful;
- the retry exit/escalation condition;
- an exception that changes the terminal outcome.

Keep this near the fact it qualifies. Do not push it to a distant child view if the reader must integrate both facts to answer the task.

### 3. Deferrable detail - can hide or compress

A detail is deferrable only if removing it from the current view does not change the required answer and does not erase a responsibility, synchronization, exception, or outcome needed to interpret the visible process correctly.

Prefer local grouping/label compression before fragmentation. A separate child view creates navigation and context-reconstruction cost; it is not automatically clearer just because the parent becomes smaller.

## Design the reading path explicitly

For many process diagrams the reader first acquires the overall structure and then follows one or more paths through the model. Make that transition easy:

1. **Overview acquisition:** participant boundaries, start/outcomes, and overall flow direction should be discoverable without tracing every edge.
2. **Primary trace:** the path needed for the required answer should remain visually continuous and locally attributable.
3. **Deviation trace:** branches, messages, retries, and exceptions needed for the task should re-enter the primary mental model at obvious anchors.
4. **Detail lookup:** supporting detail should be close to its anchor or deliberately decomposed; do not make the reader search unrelated canvas regions to reconstruct one fact.

A diagram can be semantically correct and geometrically clean while still failing because the reader must repeatedly lose and reacquire the path relevant to the task.

## Treat notation competence as a decoding constraint

Use notation semantics first. Reader competence may change how much decoding help the view needs, but it must not justify semantic substitution.

- If Flowchart semantics are sufficient, it may be easier for a general reader because fewer notation-specific constructs need decoding.
- If participant/message/concurrency/event semantics are material, keep BPMN rather than flattening the truth into a simpler but misleading Flowchart.
- When the reader is not known to be BPMN-competent, prefer standard supported constructs, concise semantic labels, obvious responsibility boundaries, and a stable reading path over clever notation density.

Do not infer competence from a job title alone.

## Treat medium and scale as communication constraints

Only make medium explicit when it changes the design:

- a presentation/small-screen view needs stronger scope control and shorter labels because the reader cannot inspect tiny detail comfortably;
- an editable analysis canvas can carry more detail, but connector identity and local grouping must still survive at the expected working zoom;
- a printable single-view artifact may favor a flatter structure when jumping between detached details would impose navigation cost.

Do not optimize page dimensions as a goal. Optimize the reader's ability to complete the target task at the intended viewing scale.

## Decompose only when abstraction benefit beats navigation cost

Decomposition is a communication decision as well as a semantic one.

Decompose when:

- the child has a stable semantic boundary; and
- its internals are not needed to answer the parent reader task; and
- hiding those internals materially improves the parent's reading path or density.

Keep the view flatter when:

- the reader must trace a path across the proposed boundary;
- the hidden detail changes responsibility, branch meaning, exception handling, or outcome interpretation;
- the reader would have to bounce between views to answer one question;
- grouping and local spatial composition can solve the density without fragmentation.

Do not use a node-count threshold as a substitute for this trade-off.

## Contrastive examples

### Same process, different reader task

Process truth: a request is submitted, reviewed, risk-checked, approved or sent back for revision, and eventually completes or terminates.

**Overview task:** "Where does the request go and what outcomes are possible?"

- primary read: submit -> review -> decision -> approved/revision -> terminal outcomes;
- critical context: customer/company responsibility boundary and the revision return;
- deferrable: internal risk-check substeps that do not change the overview answer.

**Recovery task:** "What happens after a review or risk failure, and how does work return?"

- primary read: rejection/revision triggers, correction owner, retry target, exhaustion/escalation/exit;
- critical context: the normal checkpoint each recovery path rejoins;
- deferrable: unrelated happy-path detail.

**Verification task:** "Who makes the approval decision and which handoffs/control points prove it?"

- primary read: responsibility bands, review/risk decision points, approval/revision messages, terminal ownership;
- critical context: enough sequence flow on both participants to prove the handoff is not floating;
- deferrable: local execution steps unrelated to the control conclusion.

The semantic graph can remain the same while stage/track grouping, visible detail, and decomposition differ.

### Decomposition near-miss

Bad reasoning:

> "The process is large, so put every retry and validation block on separate pages."

Why it fails:

The reader task is to diagnose why a failed request loops back and where it can exit. Splitting each local recovery block forces the reader to reconstruct one trace across several views.

Better reasoning:

Keep the recovery spine and its return anchors together in the parent view. Decompose only the internal work of a recovery unit whose details do not change the diagnosis.

## Re-enter at the right truth boundary

If the rendered diagram fails the reader task, classify the failure before editing:

| Failure | Re-enter at |
|---|---|
| required answer is impossible because process meaning is missing/wrong | process truth |
| correct process facts are present but wrong facts dominate or necessary context was hidden | reader communication view |
| priority is right but attention/grouping/labels/connector identity do not communicate that priority | diagram visual cognition |
| perceptual intent is right but groups/paths are spatially misplaced or crowded | spatial scene / composition |
| composition is right but current controls cannot express the intended connector/label/visual treatment | translator gap |
| controls are sufficient but a local clearance/projection is wrong | projection / pixel repair |

Do not reopen process semantics merely because the reader path is poor. Do not solve a communication-scope problem with extra spacing alone.

## Completion proof

Before building, be able to state:

- the reader task and required answer;
- the primary read and its entry/trace path;
- the critical supporting context that must remain visible;
- what detail was intentionally deferred and why;
- any notation-competence or medium constraint that materially changed the view;
- why decomposition, if used, improves this task more than it increases navigation/context cost.

After rendering, inspect the exact pixels and ask whether a reader can complete that task without guessing connector ownership, hunting for hidden context, or reconstructing an unintended path.
