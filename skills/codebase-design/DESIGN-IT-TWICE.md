# Design It Twice

Use this workflow when a chosen technical boundary needs materially different interface options before a decision. The goal is alternative isolation, not dependence on a particular sub-agent tool.

Use the vocabulary in the [Codebase Design workflow](SKILL.md): **module**, **interface**, **seam**, **adapter**, and **leverage**.

## Process

### 1. Frame the problem space

Freeze one technical brief containing:

- the selected behavior and boundary;
- non-negotiable constraints and non-goals;
- current callers, dependencies, ownership, and failure modes;
- the dependency categories from [DEEPENING.md](DEEPENING.md);
- project-authorized domain context and accepted terminology;
- a rough illustrative sketch that clarifies constraints without selecting a design.

Do not assume `CONTEXT.md`, an ADR path, or any other fixed artifact location. Resolve domain context from the project capability/profile and current source.

### 2. Declare the alternative-generation mode

Use the strongest available mode:

- `ISOLATED_PARALLEL` — independent workers can receive the same frozen brief concurrently.
- `ISOLATED_SEQUENTIAL` — independent workers are available but execute sequentially.
- `INLINE_SEQUENTIAL` — no isolated-worker capability exists; generate one alternative at a time and freeze each alternative before generating the next.

Do not claim delegation, isolation, or parallelism when the runtime does not provide it.

### 3. Generate enough materially different alternatives to expose the trade-off

Use **minimum two** alternatives. Use three when the decision space is not genuinely binary and a third distinct seam is feasible. Do not fabricate a third option whose only purpose is satisfying a count. A genuinely binary constraint may stop at two when the frozen brief proves the alternatives exhaust the meaningful design space.

Useful distinct constraints include:

1. **Minimal interface** — target 1–3 entry points and maximize leverage per entry point.
2. **Flexible interface** — support justified extension while keeping ownership explicit.
3. **Common-caller interface** — make the dominant use case trivial and failures clear.
4. **Ports and adapters**, when external/provider seams materially shape the decision.

Each alternative must be produced from the frozen brief, not from the recommendation or ranking of earlier alternatives. Under `INLINE_SEQUENTIAL`, freeze each alternative before generating the next and do not edit it until comparison begins.

Each alternative contains:

1. Interface: types, operations, parameters, invariants, ordering, and error modes.
2. Representative caller usage.
3. Responsibilities hidden behind the seam.
4. Dependency and adapter strategy.
5. Compatibility, migration, rollback, and observability implications.
6. Trade-offs: where leverage is high and where the abstraction remains thin.

### 4. Compare after alternatives are frozen

Present alternatives sequentially, then compare them on:

- ownership and interface knowledge;
- depth and leverage;
- locality of future change;
- seam placement and provider coupling;
- test/runtime proof surface;
- compatibility, migration, rollback, and failure observability.

Recommend one option only after the comparison. A hybrid is valid only when its combined ownership remains coherent; do not merge features merely to avoid choosing. Preserve rejected alternatives and unresolved decisions in the technical design artifact.
