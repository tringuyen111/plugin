---
name: engineering-planning
description: Plan multi-session, decision-fogged, or coordination-sensitive engineering work from verified current truth into the smallest executable and evaluable frontier. Use for technical planning, decomposition, dependency/proof topology, durable work reconciliation, or replanning. Let small clear work go directly to execution; do not execute implementation or invent protected Product, Requirements, Architecture, QA, or release truth.
---

# Engineering Planning

Treat this as Tech Lead planning accountability expressed as a reusable capability, not as a Tech Lead persona. Own the planning model and current executable frontier. Do not become an agent harness or execute the destination merely because the plan is ready.

## Planning states

Choose the state from current evidence; do not force a lifecycle sequence.

| State | Use when | Terminal planning result |
|---|---|---|
| `DIRECT` | the objective, source target, constraints, and proof are already clear enough for one bounded execution loop | no map/spec/ticket ceremony; return the bounded frontier to the active caller so the same session may execute immediately when authorized |
| `DISCOVER_PATH` | a meaningful destination exists but decision-changing fog prevents a truthful execution model | a resolved or explicitly blocked decision frontier; load [Decision Frontier](references/decision-frontier.md) |
| `PLAN_EXECUTION` | target intent is sufficiently fixed but the technical delta, sequencing, risk, or proof model needs synthesis | a source-grounded engineering plan; load [Execution Plan](references/execution-plan.md) |
| `MATERIALIZE_GRAPH` | multi-session or parallel work needs durable identity, dependencies, shared frontier, or tracker reconciliation | a verified canonical work graph; load [Durable Work Graph](references/durable-work-graph.md) |
| `REPLAN` | changed source, decision, requirement, ADR, risk, or evidence invalidates existing planning truth | only the affected planning model is revised and a new current frontier is derived |

A single request may move between states when evidence changes, but artifacts are optional. A plan, map, or ticket graph must earn its existence by reducing material uncertainty or coordination cost.

## Truth model

Keep three planning truth classes distinct:

- `TARGET_AUTHORIZED`: accepted Product, Requirements, Design, Architecture, policy, or owner decisions that constrain the destination.
- `CURRENT_VERIFIED`: current source, runtime, tests, configuration, migrations, tracker state, and observed behavior.
- `PROPOSED_OR_ASSUMED`: reversible planning hypotheses or unresolved options. Mark them explicitly; never let them impersonate protected truth.

Use the strongest applicable authoritative truth. Do not require a complete upstream artifact set when the engineering objective is already safe to plan. Block only when an unresolved protected decision would change the execution model, public contract, durable state, risk acceptance, or proof obligation.

## Universal planning kernel

1. **Bind the objective and terminal planning truth.** Name what engineering outcome is being planned, what would count as an executable frontier, and whether the request needs only analysis or durable planning-state mutation.
2. **Inspect the real system before claiming current state.** Read the smallest sufficient source/docs/runtime/tests/configuration/work-state evidence that can change the plan. A summary, ticket, or prior plan does not override inspectable current truth.
3. **Choose the planning state.** Prefer `DIRECT` when nothing material is gained by another planning artifact. Choose deeper states only for real decision fog, technical synthesis, durable coordination, or invalidated planning truth.
4. **Resolve only decision-changing uncertainty.** Keep protected Product/Requirements/Design/Architecture/security-policy/QA/UAT/release choices with their canonical owner. Planning may frame the exact question, evidence, affected topology, and consequence, then consume the accepted result back into the same planning model.
5. **Model the execution and proof topology.** For non-trivial decomposition, load [Decomposition and Proof](references/decomposition-and-proof.md). Split by independently meaningful outcome, failure/recovery, cutover, proof, or protected seam; not by team, code layer, file layout, or imagined future reuse.
6. **Select the minimum faithful representation.** Keep a small plan inline. Use a delivery-plan artifact when technical synthesis must survive context boundaries. Use a durable graph only when stable identity, dependency, shared frontier, or parallel coordination requires it.
7. **Verify planning-owned writes.** Before any canonical work mutation, bind the exact target, authority, live provider primitive, repeat-safety/concurrency need, and postcondition. Re-read the consumed canonical state; tool success alone is not proof.
8. **Derive the current executable frontier without manufacturing a handoff or route.** A frontier item must have ready prerequisites, explicit protected gaps, observable outcome, runtime/artifact entrypoint, proof boundary, and no stale planning truth. Planning itself does not implement. When the active user outcome also includes execution, return the execution-ready frontier to the same capable/authorized Agent; host-native discovery may supply whatever implementation depth is material. Do not encode a next-Skill route in the plan.

## Composition boundaries

- **Architecture or durable technical seam is unresolved:** use `codebase-design`; Engineering Planning consumes the accepted decision and updates the topology.
- **Requirements meaning or transition obligation is unresolved:** use `requirements-engineering`; do not recreate requirements inside the plan.
- **Change-impact question without planning reconciliation:** `traceability` owns the impact analysis. Use its result when `REPLAN` is requested.
- **Implementation requested from a ready frontier:** return the bounded planning truth and executable frontier to the active job. Planning does not select the next Skill, rewrite identity/dependencies to make execution convenient, or require a handoff merely because execution continues in the same session.
- **QA/UAT/release/operations verdict:** keep the verdict with its owner. Planning may name the required evidence boundary only.
- **Cross-session/runtime transfer:** `handoff` owns transfer/privacy/delivery mechanics; Engineering Planning owns the planning truth being transferred.
- **Actual agent assignment, scheduling, execution, or supervision:** host/runtime concern, not this Skill.

## Replan discipline

When truth changes, re-enter at the earliest invalidated planning claim. Preserve unaffected nodes and evidence. Reopen, supersede, relink, or discard only the planning state whose assumptions, dependency truth, proof target, or protected source revision actually changed. Do not rebuild the entire plan to make history look clean.

## Completion

- `READY`: the requested planning scope is truthful and a current executable frontier can be derived without inventing protected decisions; every requested planning-owned write has a verified postcondition.
- `PARTIAL`: useful planning truth exists, but material decision fog, evidence, provider fidelity, or a requested durable write remains unresolved.
- `BLOCKED`: an exact target, required authoritative decision/evidence, canonical work owner, or write authority needed for truthful planning is unavailable.
- `FAILED`: an attempted planning mutation or required verification produced contradictory, partial, or untrusted state. Report the observed state; do not upgrade it to readiness.

Structural/native validation proves only Skill/package invariants. Behavioral improvement remains unproven until representative runtime cases execute.
