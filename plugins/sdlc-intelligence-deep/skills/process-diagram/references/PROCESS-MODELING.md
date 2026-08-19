# Deep Process Modeling

Use this only when the always-loaded mental model is insufficient because source truth is ambiguous, structurally large, exception-heavy, or decomposition-sensitive. This reference deepens **Agent reasoning**; mechanics deliberately do not infer these semantics.

## Recover truth before choosing notation

Build an evidence table when prose or an existing diagram is unreliable:

| Question | Evidence to recover |
|---|---|
| Boundary | real trigger, meaningful terminal outcomes, in-scope participants/systems |
| Responsibility | who performs each behavior and who owns recovery/escalation |
| Enablement | what must happen or become true before each behavior can occur |
| Communication | sender, receiver, payload/meaning, whether parties progress independently, and how each participant's internal Sequence Flow reaches/continues past the message exchange |
| Branch | exclusive vs inclusive vs concurrent vs event-selected behavior |
| Join | what tokens/conditions must exist before continuation |
| Loop | return target, repetition condition, exit, escalation/limit |
| Exception | interrupted/failing behavior, handler, recovery path, terminal effect |

Do not end the process at a handoff or notification when the requested business result is still unresolved.

## Construct branch scopes before notation

For every material branch, recover enough evidence to state four things in order: **activation contract -> branch lifecycles -> convergence contract -> continuation/outcomes**. The split and convergence are separate decisions inside one semantic scope: activation determines what can become active; convergence determines what completed active-branch set is sufficient for shared continuation.

Use [Split and Convergence Construction](SPLIT-CONVERGENCE.md) for the full positive method, including exclusive/parallel/inclusive construction, no-join cases, nested scope closure, notation mapping, spatial composition, and worked transfer cases. This deep process-modeling reference remains responsible for recovering ambiguous source truth; it does not duplicate that construction method.

When evidence is incomplete, preserve the unresolved activation or continuation condition instead of choosing a gateway from visual symmetry.

## Loops and exceptions need closure

For each loop prove all three: **return target + repetition condition + exit/escalation**. A back edge alone is not a loop model.

For each exception distinguish:

- ordinary alternative: business choice in normal control flow;
- recoverable failure: handler returns the process to a valid continuation;
- escalation: responsibility or outcome changes;
- termination: current process instance ends.

If the exact exception meaning requires a BPMN construct the executable subset does not support, preserve that meaning and stop at the translation boundary rather than approximating it.

## Decompose on semantic boundaries

A child process is justified when it has a stable trigger/input, owner, and outcome; is reusable or governed independently; or its internals obscure the parent communication target.

Do **not** decompose merely because a first render is crowded. First check artificial stages, long-lived tracks, over-modeled external participants, and verbose labels. Conversely, do not keep a 100-step semantic unit flat merely because the renderer can fit it.

For parent collaboration views, external participants often need only the interaction milestones visible to the parent. Internal provider/carrier workflows belong in their own process when they are not needed to understand the parent outcome.

## Adversarial semantic review

Before translation, challenge the model:

1. Remove each action mentally: does an important path or outcome change? If not, is it contextual rather than control behavior?
2. For every branch, can each activated path reach an outcome, compatible join, or intentional independent continuation?
3. For every join, can the paths it waits for actually be active together?
4. For every message, are sender and receiver truly different participants rather than lanes of one participant? Trace each participant's internal control before and after the exchange; Message Flow does not carry that control token.
5. For every loop, can it stop? What happens after retry exhaustion?
6. For every claimed end, is the business goal complete rather than merely handed off?
7. For every participant with large internal detail, does that detail change the parent reader's required answer or critical context? If not, it is a candidate for grouping/compression/decomposition; apply the reader communication trade-off before fragmenting the view.

## Preserve a compact semantic checkpoint

Before authoring the plan, preserve only the stable decisions needed downstream:

```text
trigger:
outcomes:
participants / responsibilities:
causal commitments:
  actions needed in the requested view:
  material enablement / control / message relations:
splits + meanings:
joins + wait conditions:
messages:
loops / exits:
exceptions / recovery:
reader communication:
  reader task / required answer:
  primary read / entry-trace path:
  critical supporting context:
  intentionally deferred detail:
decomposition decisions:
user commitments to preserve:
  labels / terminology / requested notation / medium / scope constraints:
unresolved truth:
```

For a high-fanout semantic choice that downstream work may need to preserve across a render, handoff, or later evidence update, add only the material decision memory:

```text
material decision:
  decision:
  basis:
  reopen if:
```

Use this for choices such as participant boundaries, split/join meaning, decomposition, exception/recovery outcome, or a stop/resume boundary. `reopen if` names concrete evidence that would make the basis no longer sufficient; do not use a vague condition such as `if wrong`. Do not record this tuple for obvious facts that can be recovered directly from the source.

The checkpoint is a downstream handoff surface, not a reasoning transcript. It must preserve enough causal and user-facing commitments that spatial composition / notation authoring does not need to infer missing process steps or wording from memory. Keep the original source available for provenance, but do not repeatedly reconstruct or restate it during build/render unless new evidence satisfies a stored reopen condition or otherwise directly falsifies the decision basis.
