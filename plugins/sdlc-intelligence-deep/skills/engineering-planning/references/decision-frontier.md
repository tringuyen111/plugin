# Decision Frontier

Use this reference only when a meaningful engineering destination exists but decision-changing fog prevents a truthful execution model. The purpose is to expose and resolve the smallest decision frontier needed for planning; it is not a mandatory tracker workflow.

## Model

Represent the frontier as:

```text
Destination
  <-BLOCKED_BY- Open decision or missing evidence
  <-INFORMED_BY- Verified source/research/prototype result
  <-AUTHORIZED_BY- Human/project/canonical owner decision
```

Start inline. Materialize a durable map only when the decision path must survive multiple sessions, parallel decision work, or a canonical work system already owns this state.

## Breadth before depth

1. Name the destination and current scope boundary.
2. Fan out the material unknowns across behavior, semantics, architecture, integration, migration, trust/safety, runtime, evidence, and operations only where they can change the route.
3. Distinguish `decision`, `evidence gap`, `prototype question`, and `bounded prerequisite`.
4. Order only by real decision dependency. Do not serialize independent questions.
5. Resolve one frontier item deeply only after the breadth view shows that it is actually decision-material.

Fog belongs inside the destination. Work beyond the destination is out of scope, not unresolved fog.

## Frontier item forms

Use the smallest form that matches the uncertainty; these are planning representations, not separate capabilities:

- **Research (AFK):** authoritative reading or evidence collection that can change a decision.
- **Prototype (HITL):** a cheap concrete artifact when reaction to a shape/behavior will collapse ambiguity faster than prose.
- **Human decision (HITL):** a protected choice that only the authorized human/project owner can settle. Never self-answer the human side of the decision.
- **Prerequisite/evidence task (AFK or HITL):** bounded work needed only to unblock a decision. It must not quietly deliver the destination.

A frontier item earns durable identity only when another session/agent must find, claim, depend on, or audit it. Otherwise keep it inline.

## Support selection

| Frontier need | Planning action |
|---|---|
| human-owned choice with a concrete decision surface | use `decision-interview` when available; consume its bounded Decision Packet back into the same planning frontier |
| concept identity, vocabulary, lifecycle/time meaning, semantic context boundary | use `domain-modeling` for the semantic frame |
| architecture/technology/public seam/durable migration architecture | use `codebase-design` or the named architecture owner |
| external/current knowledge | use `research` or inspect the authoritative source directly |
| cheap concrete reaction will collapse ambiguity | use `prototype` when authorized |
| bounded prerequisite must be observed before a decision | perform only the authorized evidence-gathering action; do not deliver the destination |

A supporting capability returns evidence or a decision to the same planning frontier. It does not become the owner of the whole plan.

## Durable decision map, when justified

If a persistent map is needed, reuse the project's canonical work surface. Do not create a shadow local ledger by default.

A minimal map contains:

```markdown
## Destination
<bounded engineering planning destination>

## Decisions so far
- <decision name> - <stable reference> - <one-line settled consequence>

## Open frontier
- <question/evidence gap> - blocked by <real dependency if any>

## Not yet specifiable
<in-scope fog that cannot yet form a useful work item>

## Out of scope
<consciously excluded work and why>
```

Stable names matter more than provider IDs in human-facing reasoning; keep IDs/links as references, not as the only identity.

## Concurrency and resolution

When parallel decision work is real, use the canonical provider's claim/dependency primitives if they exist. If exclusivity cannot be guaranteed, state the limitation and avoid pretending a claim is atomic.

After a frontier item resolves:

1. record the settled answer/evidence in one canonical place;
2. re-evaluate which fog becomes specifiable;
3. add only newly material decision items;
4. remove/close items that proved out of scope;
5. stop when the path is clear enough for `PLAN_EXECUTION` or `DIRECT`.

## SHOW

**Good:** "Can we remove `legacy_id`?" is blocked because a shipped client still reads it. The frontier records the observed client usage and routes the compatibility-window decision to the technical owner. Planning does not silently keep or remove the field.

**Bad:** Create tickets named "backend decision", "frontend decision", and "QA decision" because those teams usually participate. Organizational categories are not decision dependencies.

## Completion

The decision frontier is complete when planning can state the destination, remaining protected gaps, and the next truthful planning state without inventing a decision. It need not eliminate every implementation detail.
