# Logic Prototype

Use the smallest runnable logic experiment that can expose the declared discriminator for **business logic, state transitions, data shape, or API semantics**. An interactive terminal shell is one possible observation harness, not the default artifact.

## When this is the right branch

- "Can this state machine reach the illegal state after X then Y?"
- "Does this data shape represent the edge case where...?"
- "Will this candidate API/state contract behave the way the decision depends on?"
- "Do I need to drive the state manually to understand the behavior?"

If the unresolved question is visual hierarchy or styling rather than runtime behavior, stop Prototype and return the bounded Design concern.

## Process

### 1. Bind the experiment question and decision rule

Use the parent [Prototype Experiment Design](EXPERIMENT-DESIGN.md). Before writing code, state the state/data model, assumption or competing hypotheses, observable discriminator, and what observation changes the decision. A runnable artifact that cannot falsify or distinguish the assumption is pure waste.

### 2. Pick the runtime already available

Use the host project's existing language/tooling when practical. Do not add a new package manager, framework, or runtime merely to make the prototype look complete. If no usable runtime exists and that fact prevents execution, record the prerequisite as unavailable rather than inventing setup ceremony.

### 3. Isolate only the load-bearing logic

Put the logic that answers the question behind the smallest inspectable interface appropriate to the uncertainty:

- **Executable assertion/probe** when one exact event sequence or invariant answers the question.
- **Pure reducer** when discrete actions transform one state value.
- **Explicit state machine** when legal/illegal transitions are the uncertainty.
- **Small pure functions** for data-shape or transformation semantics.
- **Small stateful module/class** only when ongoing internal state is itself material.

Keep unrelated I/O and presentation outside the load-bearing logic. Preserve the learned invariant and candidate interface after the experiment; exact prototype bytes remain prototype-origin input until normal production gates establish supported source.

### 4. Choose the cheapest observation harness

Use only the harness required to expose the discriminator:

- direct assertion/test-runner probe for machine-observable truth;
- one-shot CLI/script output when a compact trace is enough;
- small scripted sequence when order/timing matters;
- lightweight TUI only when **interactive manual driving is itself useful evidence**.

Do not build keyboard loops, screen rendering, task-runner integration, or other shell machinery when a smaller executable observation answers the question reliably.

### 5. Make the experiment reproducible

Record one exact run command or invocation. Add it to an existing task runner only when that genuinely makes the experiment easier to repeat; a direct command is sufficient for a bounded scratch experiment.

### 6. Run and observe

When the current environment can execute the experiment, run it and inspect the discriminating state/event/output yourself before claiming the question answered.

Human interaction is appropriate when human behavior, comprehension, or manual exploration is the declared discriminator. In that case, surface the bounded run/interaction method and capture the resulting observation. If required execution is unavailable, preserve the artifact/reference but report the evidence as `NOT_RUN` or `BLOCKED`; do not manufacture a `READY` conclusion from artifact existence.

### 7. Capture the answer

Interpret the observed result against the predeclared decision rule: `SUPPORTS`, `FALSIFIES`, `INCONCLUSIVE`, or `EXPOSED_DIFFERENT_UNCERTAINTY`. Preserve the exact observation, changed invariant/decision, remaining uncertainty, and prototype disposition. Do not force a conclusion when the experiment did not discriminate.

## Continuation boundary

If the learning becomes input to Design, requirements, architecture, or production implementation, return the bounded observation/invariant/reference to that owning work. Host-native discovery owns any subsequent capability selection. Ordinary same-session continuation is not a Handoff; use the dedicated Handoff contract only for a real owner/agent/session/runtime transfer that needs durable state or when project policy requires persistence.

## Anti-patterns

- **Production-test ceremony.** A tiny executable assertion is valid; a broad hardening/test suite that does not improve the discriminator is not.
- **Real persistence by default.** Use in-memory/fixture/read-only state unless persistence is the question.
- **Speculative generalization.** The prototype answers one question, not future product scope.
- **Mandatory TUI.** Do not build an interactive shell unless interaction contributes evidence.
- **Prototype bytes silently becoming production.** Carry forward the learning and bounded reference; supported source must earn normal production evidence independently.
