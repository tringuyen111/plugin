# Design Claim Diagnosis

Use this reference when the review may challenge the Design proposition itself, not only its visual realization: unsupported assumptions, weak inference, omitted states/users/constraints, conflicting decisions, representation drift, implementation divergence, emergent experience failure, or a supplied outcome that contradicts the Design expectation.

## Contents
- Claim graph semantics
- Node-quality challenge
- Edge-quality challenge
- Earliest broken relation
- Competing hypotheses and discriminators
- Trade-offs and alternatives
- Worked contrasts
- Failure patterns

## Claim graph semantics

Review only the material slice of this graph:

```text
PRODUCT / BEHAVIOR TRUTH
        --supports--> DESIGN PREMISE / ASSUMPTION
        --justifies--> DESIGN DECISION
        --specifies--> EXPERIENCE / INTERACTION / SYSTEM MODEL
        --projects-to--> ARTIFACT / SPEC / PROTOTYPE
        --realized-by--> IMPLEMENTATION
        --produces--> EXPERIENCED OUTCOME
```

Each node is a claim about what is true or should be true. Each edge is a claim that one representation legitimately leads to the next. Reviewers challenge both.

Do not mistake document status for correctness. `APPROVED` establishes current authority, not immunity from review. Do not mistake a challenged claim for new canonical truth; only the accountable owner can supersede it.

## Node-quality challenge

Ask the smallest set of questions capable of changing the conclusion.

| Node | Strong review question | Common failure |
|---|---|---|
| Product / behavior truth | What exact evidence/authority makes this governing for the Design? | stale or unsupported premise presented as fact |
| Design premise | What must be true for this Design direction to work? | hidden assumption, overgeneralized user/context |
| Design decision | Does the decision actually address the premise under material constraints? | plausible convention substituted for reasoning |
| Experience / system model | Are task progression, states, recovery, permissions, information/action ownership, responsive/system invariants complete and coherent? | happy-path-only model, conflicting responsibilities |
| Artifact / prototype | Does this representation preserve the supported Design model? | polished projection that changes interaction/state/priority semantics |
| Implementation | Does runtime realize the supported current Design truth? | faithful-looking surface with behavior/state/system divergence |
| Experienced outcome | Does supplied outcome evidence show the intended consequence actually occurs? | internally coherent Design whose real consequence contradicts its claim |

Challenge four properties when material:

1. **Support** — evidence/authority exists at the required altitude.
2. **Completeness** — material users, states, constraints, recovery, content, and system context are not omitted.
3. **Coherence** — decisions do not contradict one another or governing truth.
4. **Consequence** — the node predicts a user/system/perceptual result that can be inspected or falsified.

Do not add an “alternative” test by default. Alternatives matter when the current inference is not forced, when a trade-off is being hidden, or when the current choice consumes material attention/space/complexity/risk.

## Edge-quality challenge

A correct upstream node can still lead to a weak downstream decision.

### `supports`
Does the Product/behavior truth actually support the Design premise, or has frequency, importance, user segment, risk, or context been generalized beyond the evidence?

### `justifies`
Does the premise require this Design decision? Separate **goal** from **chosen mechanism**. “Fast access” does not automatically mean “persistent sidebar”; “prevent mistakes” does not automatically mean “blocking confirmation modal.”

### `specifies`
Does the decision produce a complete experience/system model? Check transitions, waits, errors, partial success, recovery, action ownership, information dependency, responsive/context continuity, and system responsibilities that materially follow.

### `projects-to`
Does the artifact/spec/prototype preserve the model, or has representation changed state, priority, hierarchy, semantics, or continuity for the sake of presentation?

### `realized-by`
Does implementation preserve approved/proposed Design semantics under real state/content/input/runtime conditions? When source cause is not inspectable, report the divergence without inventing implementation mechanics.

### `produces`
Does supplied outcome evidence support the expected user consequence? A coherent Design may still fail through habituation, emergent composition, misunderstanding, inaccessible pressure, or interaction cost. Do not invent outcome evidence when none exists.

## Find the earliest broken relation

Prefer the earliest evidence-supported break that explains downstream symptoms.

```text
upstream premise wrong/unsupported
        -> downstream decision may be polished but unjustified

decision sound, model incomplete
        -> artifact cannot fully represent valid continuation

model sound, artifact projection diverges
        -> fix representation before challenging model

approved Design sound, implementation diverges
        -> Engineering correction, not Design rewrite

all preceding relations coherent, supplied outcome contradicts expectation
        -> reopen the Design claim/outcome assumption
```

Do not escalate upstream merely because upstream exists. The “earliest break” is causal, not a preference for abstract explanations.

## Competing hypotheses and discriminators

Generate competing hypotheses only when one symptom has multiple plausible owners. Keep the set small enough to test.

For each plausible cause:

```text
HYPOTHESIS
  predicts -> DISTINCT OBSERVATION
  contradicted-by -> DISTINCT OBSERVATION
  needs -> SMALLEST DISCRIMINATING EVIDENCE
```

Prefer evidence that separates explanations over evidence that merely adds confidence to all of them.

Examples:

- A weak recovery action may be `wrong semantic action role` **or** `correct role, weak visual projection`. Inspect action ownership/Design model before changing visual salience.
- A dense comparison surface may be `information-model overload`, `typography metrics`, `spacing`, or `responsive topology`. Check which relationship fails under content pressure before widening spacing everywhere.
- Repeated card dominance may be `component primitive`, `composition policy`, or `usage density`. Inspect the isolated component **and** repeated page before changing the system primitive.

Preserve `UNKNOWN` when the available evidence cannot discriminate.

## Trade-offs and alternatives

Review trade-offs when a Design decision gains one value by consuming another: speed versus workspace, interruption versus assurance, information visibility versus cognitive load, consistency versus task-specific optimization, compactness versus touch/readability, system reuse versus semantic fit.

Do not score trade-offs numerically unless the project has a real decision model. State:

```text
chosen benefit
vs
material cost
under
specific user/task/constraint
```

A reviewer may identify that the current inference is weak or that another class of solution could satisfy the premise with less cost. Do not materialize the replacement unless authoring becomes the terminal job.

## Worked contrasts

### Supported premise, weak inference

```text
Evidence: users need fast access to advanced filters.
Design claim: therefore keep the full filter panel permanently open.
Review: premise is supported; inference is not forced.
Material cost: persistent panel reduces comparison workspace.
Correction intent: reopen access mechanism versus workspace trade-off.
Not review-owned: design the replacement panel/navigation.
```

### Correct realization of a wrong semantic role

```text
Design model: recovery action classified as auxiliary.
Artifact: renders auxiliary styling correctly.
Perception: recovery action is buried.
Earliest break: action-role classification, not token application.
Correction intent: reconsider semantic action priority before visual tuning.
```

### Missing recovery, not missing screenshot

```text
Behavior truth: partial failure and retry exist.
Design model: success/failure only; no partial-failure continuation.
Artifact: no partial-failure screen.
Earliest break: Design-model omission.
Evidence gap only applies if behavior truth itself is unclear.
```

### Outcome contradiction

```text
Claim: confirmation prevents accidental destructive action.
Artifact + implementation: exact and internally coherent.
Supplied usability evidence: users habitually confirm; no recovery.
Earliest break: Design outcome assumption must be reopened.
Do not blame implementation and do not prescribe Undo by default.
```

## Failure patterns

- **Review the artifact but never reconstruct the claim:** move one level upstream until the material Design decision and governing truth are explicit.
- **Treat approved as correct by definition:** preserve approval authority while allowing evidence-backed challenge.
- **Treat challenge as authority:** do not silently supersede Product/Design truth.
- **Fix the latest symptom:** locate the earliest supported broken relation first.
- **Assume convention proves inference:** precedent can suggest alternatives; it does not establish the user/product premise.
- **List every design lens:** use only lenses that can change locus, consequence, scope, or correction intent.
- **Invent user outcome:** require supplied/observed outcome evidence for claims about actual user consequence.
- **Review turns into redesign:** stop at correction intent, constraints, trade-off, and falsifier unless the terminal job explicitly changes.
- **Perfect implementation implies successful Design:** implementation parity proves realization, not Design premise or outcome validity.
