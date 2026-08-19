# Transition Requirement Branch

Model the **temporary capability or condition needed to move from current state to future state**. A transition requirement exists because the change is not yet complete; once the future state is established and the temporary obligation is retired, it should no longer be required.

Do not turn migration plans, implementation tasks, cutover commands, scripts, or project schedules into requirement truth. Requirements Engineering owns the temporary business/solution obligation; Engineering/DevOps owns the mechanism and execution plan.

## Decision mechanism

1. **Bind current and future state.** State the relevant current reality and the authorized/proposed future condition without collapsing them. Verify current-system claims from inspectable evidence when available.
2. **Ask whether the need survives the transition.**
   - If the capability/quality/rule must remain after the future state is established, model it in the permanent functional, quality, or Business Rule branch.
   - If it is needed only to move safely/correctly from current to future, keep it as a transition requirement.
   - If it merely says *how/when engineering will perform work*, keep it in implementation/DevOps planning, not requirements.
3. **Define the temporary obligation.** Capture only decision-material dimensions:

   ```text
   transition trigger / starting condition
   -> affected population, data, process, actors, or service scope
   -> temporary capability/condition
   -> integrity / continuity / compatibility invariant when material
   -> authority + unresolved assumptions
   -> exit condition / retirement point
   ```

4. **Pressure transition-specific risks.** Check only where they can change business-visible meaning:
   - **data conversion:** scope/population, semantic mapping/integrity, reconciliation, tolerated exceptions, and what proves conversion is sufficient;
   - **training/adoption:** which roles need what capability before they can operate the future state, without inventing training format or proficiency thresholds;
   - **business continuity:** which business obligations must remain available or recoverable during transition, without inventing outage windows or fallback policy;
   - **temporary coexistence:** old/new populations, reads/writes, decisions, or operating paths that must coexist and how conflicting/duplicate business effects are handled at requirement level;
   - **retirement:** what evidence/authority permits the temporary capability/process to be removed.
5. **Compose neighboring requirement branches instead of absorbing them.** A transition need may depend on a Business Rule, Quality Requirement, Use Case, or Acceptance Criteria. Load that branch for the semantic concern and return to the same Requirements evidence chain.
6. **Expose authority gaps rather than guessing.** Missing conversion tolerance, continuity target, training sufficiency, coexistence policy, or retirement criterion remains `PROPOSED_OR_ASSUMED`, `PARTIAL`, or `BLOCKED` according to its consequence.

## Contrastive SHOW

```text
Need: During customer migration, support staff need to look up the legacy customer ID until all active records are converted.

Transition requirement:
- applies only to the in-transition active-customer population;
- preserves the authorized identity mapping needed for support/reconciliation;
- remains available until conversion/reconciliation reaches the authorized exit condition;
- is retired after that condition is met.

Not a permanent requirement:
- "Support must always expose legacy IDs" unless authority says the legacy identity remains part of the future product/service.

Not an implementation plan:
- "Run migration_job.py Saturday at 02:00"; that is Engineering/DevOps execution detail.
```

A second common case is data conversion: "Before legacy writes are disabled, all active balances must be converted without changing authorized monetary meaning." Preserve population, integrity invariant, authority and exit condition; do not prescribe database tooling, batch size, transaction strategy, or migration script mechanics.

## Truth and authority

- `CURRENT_VERIFIED` describes inspectable current transition-relevant reality.
- `TARGET_AUTHORIZED` describes the authorized future state or transition obligation at its actual authority.
- `PROPOSED_OR_ASSUMED` preserves a candidate migration, continuity, training, coexistence, or retirement condition that lacks sufficient authority/evidence.

A project plan, migration script, deployment window, current workaround, or provider recommendation is not automatically normative requirement authority. Conversely, lack of formal approval does not block useful analysis of a proposed transition need; keep its altitude truthful.

## Completion

A transition requirement is `READY` for its declared scope when:

- current and future states are distinguished honestly;
- the requirement is demonstrably temporary rather than a permanent solution obligation or implementation task;
- affected scope and the temporary capability/condition are specific enough for the current consumer;
- material conversion, training, continuity, coexistence, integrity, or reconciliation semantics are grounded or explicitly unresolved;
- authority/assumptions are visible without invented thresholds or process policy;
- the exit/retirement condition is explicit enough to prevent the temporary capability from silently becoming permanent;
- implementation mechanics, QA/UAT evidence, deployment execution and release truth remain with their owners.

Use `PARTIAL` when useful transition meaning exists but a material authority/exit/integrity/continuity question remains unresolved. Use `BLOCKED` only when missing source/authority prevents meaningful progress on the declared transition question. `READY` never means the migration/cutover was executed successfully.
