# Architecture Improvement Candidate Prioritization

Use this reference only after direct evidence has produced two or more **eligible** architecture-improvement candidates. It decides what direction is worth exploring first; it does not design the selected solution or authorize implementation.

## Compare decision-relevant variables

For each candidate make current evidence visible for:

- **Driver consequence and authority** — observed frequency/severity or the strength of the authorized future constraint that makes the pressure real.
- **Architecture-root fit** — how directly the intervention addresses the proven responsibility/state/trust/deployment/failure/temporal/performance/operability relation rather than a superficial symptom.
- **Affected scope / blast radius** — callers, workloads, state, trust zones, deployment units, or owners whose behavior/consequence changes.
- **Expected gain** — the load-bearing quality/constraint improved: locality/modifiability, security/isolation, availability, latency/resource use, consistency, deployability/lifecycle, operability, or another source-grounded target.
- **Regression pressure** — a material loss in another quality/boundary that can reverse the recommendation.
- **Dependency unlock** — accepted work, removals, migrations, tests, or constraints that become feasible if this candidate moves first.
- **Compatibility/migration pressure** — coexistence, data/config/caller transition, policy/protocol compatibility, and operational burden at direction level.
- **Reversibility** — how safely the direction can be learned from, staged, or abandoned without creating duplicate active truth.
- **Proofability** — whether representative before/after evidence can falsify the claimed architecture improvement.

Do not assign universal numeric weights. These variables interact, and authority/current consequence determines which are load-bearing.

## Dominance

Prefer a candidate when it is materially better on the current load-bearing variables and is not materially worse on a variable capable of reversing the decision. State the evidence that creates dominance.

A deep-module/locality gain is not dominance when the same move materially worsens an authorized availability, trust, state-integrity, performance, lifecycle, or failure-isolation constraint.

When the user's requested scope includes exploration and one candidate clearly dominates with no protected trade-off left, continue into that candidate without asking the user to select it again.

## Tie / protected trade-off

Keep a tie explicit when candidates trade qualities or authority-owned consequences with no evidence-based dominance. Identify the **one fact or owner decision** most likely to flip the ordering.

Examples:

- availability gain versus accepted cost/operational-complexity tolerance;
- locality gain versus independent deployment/failure isolation;
- stronger tenant isolation versus an unresolved compatibility obligation;
- lower latency versus an integrity/consistency constraint.

Do not hide a real tie inside `Strong` / `Worth exploring` labels or a fabricated score. Ask one bounded owner question when that owner is available; otherwise preserve the unresolved decision.

## Sensitivity / flip condition

State what evidence would reverse the recommendation. Examples:

- if the supposed shared rule does not change together in practice, does consolidation still help?
- if an isolation split adds an unacceptable cross-boundary consistency obligation, does it still dominate?
- if a compatibility bridge must remain for two releases, does a smaller move become preferable?
- if a low-frequency failure can corrupt durable state, does consequence dominate routine friction?
- if the authorized latency/security/availability target changes, does the architecture driver still exist?

A recommendation without a realistic flip condition is likely overconfident.

## Reject false priority signals

Do not prioritize a candidate merely because it:

- deletes the most files;
- hides the most code;
- creates the most reusable-looking abstraction;
- matches a preferred architecture style/framework;
- has the prettiest after-diagram;
- introduces an impressive distributed mechanism;
- promises hypothetical future consumers;
- is easiest to explain while current risk/driver remains elsewhere.

## Re-entry

If new evidence invalidates a load-bearing driver, architecture-root inference, quality trade-off, compatibility pressure, or authority assumption, discard the old ranking and re-run the comparison. Do not preserve the previous winner for narrative consistency.

## Output

For the top candidates return:

`candidate -> driver/evidence -> root relation -> intervention direction -> gain -> regression/cost -> reversibility/proofability -> dominance/tie -> sensitivity/flip condition -> recommendation strength -> next evidence/owner/design frontier`

A discovery result may end with a tie or no eligible candidate when that is what the evidence supports.
