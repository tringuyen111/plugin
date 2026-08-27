# UI Prototype

Use the smallest runtime UI experiment that can answer a question which static Design cannot discriminate because the answer depends on real application context, state, data density, auth, navigation, timing, responsiveness, or interaction.

One runtime candidate is valid when there is one fixed hypothesis. Build multiple variants only when competing hypotheses are part of the actual decision.

If the question is logic/state without UI, use [LOGIC.md](LOGIC.md). If the uncertainty is static hierarchy, typography, components, visual direction, or stakeholder Design approval without a runtime dependency, stop Prototype and return the bounded Product Design concern.

## When this is the right branch

- "Does this scanning interaction stay understandable with real event state?"
- "Does this fixed layout survive the dashboard's real data density and navigation?"
- "Can this flow work inside the existing authenticated route?"
- "Does the responsive transformation remain usable with live content?"
- "Which of these competing interaction hypotheses survives the same real runtime context?"

Pure visual-direction comparison belongs to Design. This branch is justified only by what runtime observation can prove that static artifacts cannot.

## Place the experiment in representative context

Prefer an existing page/shell when the decision depends on its real auth, navigation, data, density, or surrounding interactions. Preserve the existing fetching/params/context and replace only the bounded surface under test.

Use a clearly marked throwaway route only when no representative host surface exists or isolation is itself required by the experiment. Do not invent a new top-level application structure for prototype convenience.

## Process

### 1. Bind the experiment question and candidate count

Use [Prototype Experiment Design](EXPERIMENT-DESIGN.md). State the runtime observation that changes the decision and which context must remain stable.

Choose candidate count from the uncertainty:

- **One candidate** when one fixed hypothesis only needs runtime validation/observation.
- **Two or more variants** only when materially different hypotheses must be compared under the same evidence method.
- Stop adding variants when another candidate cannot plausibly change the decision; comparison breadth is not quality by itself.

### 2. Build only the load-bearing runtime surface

Each candidate must preserve the project context required for the observation: representative data, shell/auth/navigation, component constraints, content, and interaction semantics that are not themselves the variable.

When comparing variants, change the mechanism relevant to the hypothesis while holding irrelevant confounds stable. Variants should differ materially in the decision variable, not merely colour/copy polish.

### 3. Add comparison controls only when comparison is required

A single-candidate experiment needs no variant switcher.

For multiple variants, use the smallest reliable mechanism that makes observations comparable and reproducible. A URL query parameter such as `?variant=A` plus a minimal switcher can be useful when reload/share stability matters, but neither is mandatory if a simpler mechanism preserves the evidence contract.

Any experiment-only control must be clearly separate from the candidate UI and prevented from silently shipping as production behavior.

### 4. Make it runnable and observe it

Record the exact route/run command and execute the experiment when the current environment supports it. Inspect the declared runtime observation under the required context before claiming the question answered.

When human comprehension/preference is itself the discriminator, let the relevant human drive or judge the bounded experiment and capture that observation as evidence. A preference is not automatic Product/Design approval. If required runtime/human evidence is unavailable, report `NOT_RUN`, `BLOCKED`, or `INCONCLUSIVE` as appropriate rather than treating a rendered artifact as proof.

### 5. Interpret evidence and dispose of the artifact

Compare observations against the predeclared decision rule. If no candidate discriminates the question, record `INCONCLUSIVE` or the newly exposed uncertainty and reframe instead of declaring a winner.

Preserve the learned decision/invariant, exact observation, prototype reference/run command, and remaining uncertainty, then choose:

- **DELETE** — remove the prototype surface after preserving the learning.
- **ABSORB** — return the learned direction/invariant, prototype reference, observations, and any exact candidate bytes proposed for reuse as bounded input to the owning production work. Prototype-only controls/losing variants are removed; candidate bytes are not yet supported source.
- **KEEP_AS_EXPERIMENT** — retain a clearly gated, explicitly non-production experiment for continued learning.

Host-native discovery owns any subsequent capability selection. Ordinary same-session continuation is not a Handoff; use the dedicated Handoff contract only for a real owner/agent/session/runtime transfer that needs durable state or when policy requires persistence.

## Anti-patterns

- **Variant ceremony.** Do not create three variants, a `?variant=` switcher, or a floating control when one candidate answers the runtime question.
- **Uncontrolled comparisons.** Do not change several irrelevant dimensions and then attribute the observation to one mechanism.
- **Real mutations by default.** Prefer read-only/stub/fixture behavior unless mutation semantics are the question.
- **Rendered == proven.** Route loading or a polished screen proves setup only unless that is the declared technical question.
- **Direct production promotion.** Prototype bytes were authored under experiment constraints; supported implementation must establish normal production evidence independently.
