---
name: improve-codebase-architecture
description: Discover, compare, and explore source-grounded codebase architecture improvements when observed friction or an authorized future constraint creates architecture-significant pressure. Distinguish local refactors from durable responsibility, state, trust, deployment, failure, performance, or operability relationships; derive direction-level candidates and stop before fixed technical design or execution planning. Use before a specific technical boundary/design has been selected.
---

# Improve Codebase Architecture

## Runtime context

Read the strongest project-native architecture decisions, current source, representative callers/tests/runtime evidence, and authorized target constraints that can change the architecture judgment. Preserve meaningful repository names such as `PaymentService`, `CheckoutComponent`, `Orders API`, package names, bounded contexts, workers, and deployment units. Analytical terms such as **owner**, **seam**, **locality**, **isolation**, or **coupling** explain a relation; they do not rename source truth.

Ordinary discovery/exploration is read-only. Writing a report or project artifact requires the actual project/user authority for that destination. This Skill never implements the change.

## Accountable outcome

Find whether a **source-grounded architecture driver** reveals a durable architecture relationship worth changing. When it does, derive one or more direction-level improvement candidates, compare their gains/regressions/reversibility/proofability, and explore the selected or clearly dominant candidate until the next unresolved job becomes fixed technical design or execution planning.

A valid result may be **no architecture change**. Do not turn code shape, stylistic preference, or hypothetical future flexibility into architecture work.

Infer the requested terminal scope instead of forcing a mode ceremony:

- `DISCOVERY_ONLY` — candidate/no-change judgment and prioritization are enough.
- `DISCOVERY_AND_EXPLORE` — the request also asks to deepen the selected/best candidate before fixed design.

## Architecture-improvement kernel

### 1. Bind a real architecture driver

Inspect the smallest evidence set that can change the decision: source, callers, tests, runtime paths, observed failures, change history when available, current deployment/state/trust relationships, and authoritative future constraints.

A driver is eligible when it is grounded by either:

- **current evidence** — repeated change/debug/test/failure/operational friction, leaked design knowledge, state conflicts, blast radius, latency/resource pressure, trust leakage, deployment/lifecycle coupling, or another observed consequence; or
- **authorized target pressure** — an accepted requirement, security/policy constraint, quality target, protocol/lifecycle change, or other current authority that the inspected architecture must satisfy.

A generic request such as “clean this architecture,” “fewer files,” “make it scalable,” a preferred pattern/framework, or a hypothetical future consumer is only a lead. Inspect proportionally; if no source-grounded driver exists, return no eligible architecture candidate.

Keep inference auditable:

```text
Observed / Authorized -> Architecture relation -> Proposed direction
```

If two materially different explanations fit the same evidence, gather the smallest discriminating evidence rather than promoting one to truth.

### 2. Apply the architecture-significance gate

Before calling something an architecture candidate, ask whether the pressure depends on or would change a **durable relationship across meaningful system parts or operational boundaries**.

| Load-bearing relation | Typical evidence | Architecture question |
|---|---|---|
| knowledge / change scatter | several callers must know or edit the same design rule; repeated cross-module regressions | should responsibility or information hiding change? |
| responsibility / ownership | behavior has no coherent owner or one owner contains independently governed responsibilities | should responsibility move, deepen, or split? |
| state / data ownership | multiple components mutate or interpret durable state inconsistently | should state authority or access boundary change? |
| temporal / synchronous coupling | critical flow waits on unnecessary work; retry/order/time semantics leak across boundaries | should interaction topology or temporal ownership change? |
| trust / security boundary | privilege, tenancy, secrets, or policy enforcement cross an unsafe/shared boundary | should authority/isolation move or tighten? |
| deployment / lifecycle | parts that must deploy, evolve, retire, or recover independently are coupled | should the boundary be separated or compatibility pressure changed? |
| failure propagation / isolation | non-critical or independent work expands blast radius or recovery coupling | should failure containment/isolation change? |
| performance / resource topology | critical-path latency, contention, fan-out, or resource sharing conflicts with an authorized/current constraint | should topology or ownership of expensive work change? |
| operability / observability | ownership or boundaries prevent reliable diagnosis/control of a meaningful runtime responsibility | should the operational seam or responsibility change? |

If the issue remains local to one implementation unit and does not materially change one of these durable relationships, classify it as a **local implementation/refactor concern**, not an architecture-improvement candidate. Duplication, file size, method length, call depth, and test convenience alone do not pass this gate.

### 3. Derive intervention directions, not premature designs

Choose candidate directions from the architecture root rather than always preferring consolidation:

- **deepen / consolidate responsibility** when leaked knowledge or change scatter should move behind a stable owner;
- **split / isolate responsibility** when independent trust, failure, deployment, lifecycle, or quality semantics are incorrectly coupled;
- **move state or responsibility ownership** when authority is distributed or assigned to the wrong boundary;
- **introduce a seam** when a real protocol/trust/lifecycle/change boundary needs stable translation or containment;
- **narrow or remove a seam** when it leaks policy, duplicates active truth, or adds coupling without an earned boundary;
- **change interaction topology** when synchronous/temporal/failure/resource coupling is the root problem;
- **preserve the current architecture** when alternatives do not improve the load-bearing relation without unacceptable regression.

When the load-bearing evidence is **knowledge/change scatter, shallow ownership, or test-seam leakage**, read [Deep Module and Locality](references/DEEP-MODULE-LOCALITY.md). That branch preserves the existing information-hiding/deletion-test method; do not apply it mechanically to trust, availability, lifecycle, performance, or isolation problems.

Do not choose exact methods, types, schema, queue/broker, database, protocol, cutover sequence, or deployment plan here merely to make a candidate concrete.

### 4. Build falsifiable candidate records

For each eligible candidate record only what is needed to compare the architecture direction:

- project-native units, representative callers/runtime paths, and evidence scope;
- driver/pressure and its authority or observed consequence;
- architecture root relation;
- direction-level intervention and responsibility/state/boundary movement;
- current owner/relationship and proposed owner/relationship at architecture level;
- **expected gain** and the load-bearing quality/constraint it improves;
- **cost/regression pressure** in other qualities or boundaries — especially security, availability/failure isolation, performance/resource use, consistency/state integrity, deployability/lifecycle, operability, and modifiability/locality;
- compatibility/migration **pressure** and coexistence constraints, not a detailed migration path;
- reversibility and proofability, including representative evidence that could falsify the claimed improvement;
- ADR/authorized-target conflict or unresolved authority, if any;
- fixed-design questions intentionally deferred;
- recommendation strength: `Strong`, `Worth exploring`, or `Speculative`.

A prettier diagram or more hidden code cannot compensate for a load-bearing regression. If a candidate improves locality but materially worsens an authorized availability, trust, state-integrity, lifecycle, or performance constraint, make that regression decision-significant.

### 5. Prioritize proportionally

When more than one candidate is eligible, read [Candidate Prioritization](CANDIDATE-PRIORITIZATION.md). Use qualitative dominance, tie, sensitivity, and realistic flip conditions; do not create a universal weighted score.

If one candidate clearly dominates for the current authorized drivers and no human-owned trade-off remains, recommend/select it directly. When `DISCOVERY_AND_EXPLORE` was requested, continue exploring that candidate without asking the user to repeat an obvious selection.

Ask one bounded owner question only when a real tie, risk acceptance, protected trade-off, or authority decision can change the choice. Missing a named interview Skill is not a reason to manufacture uncertainty or stop ordinary reasoning.

### 6. Present in the smallest useful representation

The architecture judgment is the capability; a report format is optional.

1. **Conversation/Markdown** is sufficient for ordinary discovery and exploration.
2. **Authorized HTML** may be used when a visual artifact is materially useful; read [HTML Report](HTML-REPORT.md).
3. `BLOCKED` applies when the required source/authority evidence itself is unavailable, not because a renderer or sibling Skill is absent.

Use text/ASCII/visual diagrams only when they clarify the load-bearing relationship. Preserve source-native names in every representation.

### 7. Explore the selected or dominant candidate

Re-inspect its source/runtime surface and try to falsify the candidate before deepening it. Clarify:

- which architecture driver and root relation survive deeper inspection;
- what responsibility/state/boundary movement is actually implied;
- which quality improves and which quality may regress;
- compatibility/migration pressure and reversibility;
- representative proof that could falsify the improvement;
- which exact decision has now become a different capability's job.

Exploration stops before fixed technical design. It may establish that a direction is wrong and re-enter candidate generation/prioritization without preserving the old winner for narrative consistency.

## Composition boundaries

A sibling Skill may provide optional depth or take a **distinct continuation**. It is not a prerequisite for this Skill's own architecture judgment.

| Unresolved truth / requested continuation | This Skill does | Distinct continuation when useful |
|---|---|---|
| domain identity, lifecycle, or semantic model itself is contradictory and changes candidate validity | expose the exact semantic gap and its consequence; do not invent domain truth | `domain-modeling` may resolve that semantic job when available/desired. Absence of the Skill name is not the blocker; unresolved semantic truth may make the declared exploration `PARTIAL`. |
| a genuine human-owned architecture trade-off/tie remains | state evidence, options, consequence, sensitivity/flip condition, and ask one bounded owner question when the owner is present | `decision-interview` may add decision-quality depth when available; it does not own the architecture candidate. |
| a direction is accepted but exact owner/interface/seam, alternatives, migration/rollback design, or architecture artifact must now be designed | finish this architecture-improvement result with the fixed design frontier, evidence, constraints, quality trade-offs, compatibility pressure, and proofability | `codebase-design` owns the detailed technical design. If unavailable, this Skill's completed architecture sub-result does **not** become `PARTIAL`; only the broader unexecuted design continuation remains open. |
| accepted target/design now needs sequence, dependency graph, cutover tasks, or execution proof topology | stop; preserve only planning-relevant constraints already established | `engineering-planning` owns execution topology. |
| source contains duplicate old/new implementations, hidden fallback, stale active truth | record the source-grounded architecture/single-truth consequence if material | implementation/removal belongs to the execution owner after the target is accepted. |

Do not load sibling methods just because their names exist. Classify the unresolved **truth/job** first.

## Completion

- `READY` for `DISCOVERY_ONLY` when evidence-grounded candidates are prioritized/presented, or inspected evidence justifies no architecture candidate.
- `READY` for `DISCOVERY_AND_EXPLORE` when the selected or clearly dominant candidate has been explored through the direction-level architecture frontier, with surviving evidence, trade-offs, falsifiers, unresolved protected decisions, and any distinct next job explicit.
- `PARTIAL` when load-bearing evidence/truth or a genuine selection/owner decision required by the declared architecture scope remains unresolved.
- `BLOCKED` when representative source/current-target authority required for meaningful architecture judgment is unavailable.
- `FAILED` when an authorized requested write/render operation fails and no explicit fallback preserves the requested deliverable.

A missing sibling capability is not itself `PARTIAL` or `BLOCKED`. The workflow does not implement the refactor, approve Product/business/security/risk decisions, perform detailed technical design, create an execution work graph, or claim unexecuted runtime proof.
