# Frozen Pressure Test — Engineering Planning Consolidation

Baseline frozen before `engineering-planning` source mutation.

## Capability identity

The capability is Tech Lead-owned engineering planning, not a Tech Lead persona and not an agent runtime. It converts a sufficiently grounded engineering objective into the smallest truthful executable/evaluation frontier, resolving only decision-changing fog and materializing durable planning state only when justified.

## Representative cases

1. **DIRECT — small clear change**
   - Input: one bounded bug fix with exact source, expected behavior, and proof already clear.
   - Expected: no map, spec, ticket graph, or planning ceremony; return/compose the exact execution owner with the bounded truth needed to act.
   - Falsifier: creating planning artifacts merely because the Skill was invoked.

2. **DISCOVER_PATH — decision fog**
   - Input: destination is meaningful but architecture/product/semantic decisions preventing an executable path are not yet known.
   - Expected: expose the decision frontier breadth-first; use research/prototype/decision-interview/domain/architecture support only when material; do not execute the destination.
   - Falsifier: resolving protected decisions by assumption or requiring a tracker map when an inline frontier is enough.

3. **PLAN_EXECUTION — strongest applicable truth**
   - Input: current code/runtime and accepted behavior are sufficient, but no complete PRD/BA/Design packet exists.
   - Expected: plan from the strongest applicable authoritative truth; block only on a missing protected decision that changes the execution model.
   - Falsifier: requiring a full upstream artifact checklist as ceremony.

4. **Reality binding vs intended target**
   - Input: accepted API behavior says duplicate create -> 409; current code returns 200.
   - Expected: preserve 409 target, bind 200 as observed baseline delta, plan code/compatibility/proof; never rewrite target to match current source.

5. **Protected architecture decision**
   - Input: planning discovers that one choice would establish a new public seam or durable migration architecture.
   - Expected: keep that node blocked and compose `codebase-design`; consume its accepted result back into the same planning frontier.
   - Falsifier: planning invents architecture truth to keep momentum.

6. **Semantic vertical decomposition**
   - Input: one observable behavior crosses UI -> API -> persistence using already-ready contracts.
   - Expected: one vertical slice when layers have no independent cutover/failure/proof meaning.
   - Falsifier: `DB task -> API task -> UI task` solely from code layers/team boundaries.

7. **Foundation + walking skeleton**
   - Input: several current consumers require one new canonical invariant before any can be correct.
   - Expected: minimum FOUNDATION, representative WALKING_SKELETON when real-boundary proof matters, then parallel dependent slices.
   - Falsifier: foundation for hypothetical future reuse or arbitrary sequential fan-out.

8. **Migration/cutover earns a node**
   - Input: backfill + compatibility + constraint cutover has independent restart/rollback semantics.
   - Expected: separate MIGRATION node with proof/recovery target and only real blocking edges.

9. **Parallelism from dependency truth**
   - Input: two slices consume ready contracts and touch no conflicting protected seam.
   - Expected: keep parallel even if different teams/layers would traditionally sequence them.
   - Falsifier: dependency edge justified only by convenience, staffing, or file layout.

10. **Proof topology**
    - Input: an item is proposed as implementation-ready.
    - Expected: node names observable outcome, runtime/artifact entrypoint, proof boundary, material obligations, blockers and non-goals; QA/UAT authority is not manufactured.

11. **MATERIALIZE_GRAPH only when durable coordination earns it**
    - Input: multi-session/parallel work needs shared identity, dependencies, claims, and current frontier.
    - Expected: use project canonical work source/provider; write only authorized planning-owned state; verify consumed postconditions.
    - Near miss: a single-session plan remains inline rather than creating tracker tickets.

12. **Provider ambiguity**
    - Input: several eligible canonical work systems differ materially.
    - Expected: resolve actual provider capability or preserve ambiguity; never create a shadow local ledger by default.

13. **REPLAN from changed truth**
    - Input: source/requirement/ADR/evidence change invalidates part of an existing graph.
    - Expected: determine impact, preserve unaffected current nodes, invalidate/reopen/supersede only affected planning truth, and derive a new frontier.
    - Falsifier: rebuilding everything or continuing from stale assumptions.

14. **No runtime orchestration ownership**
    - Input: plan exposes three parallel ready slices and user asks the Skill to "assign agents and run them".
    - Expected: planning can express executable parallel topology and hand the frontier to the host/execution capability, but does not impersonate a harness or claim agent execution.

15. **Neighbor boundary — traceability**
    - Input: user asks what artifacts/work are affected by a revision, without asking to reconcile planning state.
    - Expected: `traceability` remains the owner; Engineering Planning consumes change-impact evidence when replanning is requested.

16. **Neighbor boundary — handoff**
    - Input: user asks to transfer settled planning context across session/runtime boundary.
    - Expected: `handoff` owns transfer mechanics; Engineering Planning owns the planning truth being transferred.

17. **Legacy discovery absence**
    - Expected after migration: no host-visible `wayfinder`, `to-spec`, or `to-tickets` owner remains; old names may survive only inside historical/eval provenance when explicitly marked non-routing.
