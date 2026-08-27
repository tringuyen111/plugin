# Frozen Pressure Test — Issue Triage Boundary and Independence

Evidence-State: `NOT_RUN`

Frozen against exact v1.0.28 `triage` baseline before the `issue-triage` mutation. These cases define intended behavior; they are `NOT_RUN` until executed against an actual model/runtime.

## Capability identity

Issue Triage turns an uncertain existing incoming issue, PR, or change request into grounded intake truth, disposition, and the next accountable continuation. It is not Requirements Engineering, Engineering Planning, Product, Design, implementation, QA, or a generic tracker workflow owner.

## Representative cases

1. **External raw bug — positive trigger**
   - Input: canonical external bug report + current evidence that can distinguish the claim.
   - Expected: bind item, verify/bound claim, preserve project-native category/state, determine disposition and next continuation.
   - Falsifier: forcing `bug|enhancement` or a universal `ready-for-*` workflow.

2. **Planning-created current node — near miss**
   - Input: current Engineering Planning graph already materialized objective, dependencies, proof boundary, and executable frontier; user asks to continue the work.
   - Expected: do not re-triage by default; preserve Planning/execution truth.
   - Falsifier: reconstructing readiness because a ticket exists.

3. **Direct Requirements request — near miss**
   - Input: user asks for AC/business-rule semantics, not issue intake.
   - Expected: Requirements Engineering owns the job; Issue Triage does not activate.

4. **Small confirmed implementation-ready bug**
   - Expected: `ACTIVE`, actionable, next continuation = bounded implementation when target/scope are already authoritative.
   - Falsifier: inventing architecture, execution sequencing, or new acceptance criteria to produce readiness.

5. **Technical planning frontier**
   - Input: valid accepted issue but dependency/cutover/proof topology is materially unresolved.
   - Expected: name Engineering Planning frontier and stop; absence of the sibling Skill does not prevent Triage completion.

6. **Requirement meaning frontier**
   - Input: request contains unresolved threshold/reset/exception semantics.
   - Expected: preserve exact requirement/business-rule gap; do not choose the rule.

7. **Missing reporter fact**
   - Expected: `INSUFFICIENT`, waiting on the smallest external fact; no Decision Interview dependency and no false contradiction.

8. **Human-owned Product decision**
   - Expected: preserve Product decision frontier/authority; do not accept scope or require another Skill to finish intake.

9. **Disposition separation**
   - Inputs: exact duplicate, already-satisfied request, authorized rejection.
   - Expected: distinguish `DUPLICATE`, `ALREADY_SATISFIED`, and `REJECTED`; do not collapse all into `wontfix` truth.

10. **Project-native workflow/category**
    - Input: tracker category/status does not use SDLC-specific labels.
    - Expected: preserve native semantics and return intake truth without inventing universal mapping.

11. **PR human merge/review**
    - Input: PR work is complete/verified; only authorized review/merge remains.
    - Expected: next continuation = human review/merge, distinct from human implementation.

12. **Standalone with no siblings**
    - Expected: classify source-answerable facts, external facts, owner decisions, disposition, and next continuation locally. Missing sibling capability alone never makes intake `BLOCKED`.

13. **Preserve authoritative downstream truth**
    - Input: linked approved AC/design/interface truth already exists.
    - Expected: Intake Brief may project it with provenance; must not rewrite or replace it.

14. **Stale planning-created node**
    - Input: requirement/source changed after Planning materialization.
    - Expected: identify stale execution topology and return repair to Engineering Planning/replan; do not treat as fresh intake by default.

15. **Provider mutation boundary**
    - Input: intake truth is complete but write mapping/authority is unavailable.
    - Expected: semantic analysis may be READY while requested mutation remains PARTIAL/BLOCKED; no shadow status.

16. **Same-session supporting capability return is not a Handoff**
    - Input: Triage has isolated one protected-owner frontier and the current authorized request continues through the matching supporting capability in the same session, then consumes its bounded result back into intake.
    - Expected: pass only the bounded frontier/context and consume the result without manufacturing a Handoff artifact or router state. A durable Intake Brief/Handoff is reserved for a real context/owner/session/runtime transfer that earns persistence.
    - Falsifier: the in-process supporting return is labeled or implemented as a mandatory handoff merely because another capability participates.
