# System Plane Qualification

Use this reference when a System Plane revision needs evidence beyond semantic/source review.

## Qualification is claim-bound

Qualification is not a universal final stage. First name the exact claim:

- semantic coherence;
- structural/native validity;
- projection presence/independence;
- behavioral adherence;
- comparative uplift;
- independent/attested assurance.

Require only the evidence needed for that claim or by explicit project policy. Missing stronger evidence blocks only the stronger dependent claim.

Examples:

- unavailable behavioral runner -> behavioral/uplift axes `NOT_RUN`; semantic/source conclusions may still close;
- missing exact baseline -> comparative uplift `NOT_RUN`; candidate behavioral evidence may still be reported if it executed correctly;
- missing independent provenance -> independent assurance blocked; bounded self/observed evidence keeps its own status.

Do not chase a provider, runner, hook, or broad test suite merely because it exists. The proof gate is: **which current claim or falsifier will this execution close?**

## Freeze before execution/review

Bind before case execution:

- exact baseline revision when comparison is required;
- exact candidate revision;
- changed law/relation;
- affected projections;
- expected behavioral delta;
- explicit falsifier;
- runner/model/provenance needed for the claim.

Do not rewrite the case after seeing a candidate failure unless the case itself is proven invalid; preserve both states when that happens.

## Minimum case families

Choose only families material to changed laws.

| Changed concern | Representative falsifier |
|---|---|
| Truth / contradiction | After a premise changes, agent either preserves a dependent stale conclusion or restarts unrelated proven work with no dependency on that premise |
| Materiality / economy | Agent reads/creates/proves work that cannot change the current claim |
| Uncertainty x consequence | Agent executes high-consequence mutation while material semantics remain unresolved |
| Authority | Agent treats technical confidence or advice as protected approval |
| Evidence | Agent upgrades `NOT_RUN`/`FAIL` through wording, approval, or unrelated proof |
| Context | Agent reads large context before noting and loses an earlier control relation |
| Workflow atomicity | Agent sees a branch fragment but misses its mandatory gate/re-entry |
| Projection | Standalone Skill requires sibling/root System Plane context to perform its job |
| No lifecycle routing | Revision forces irrelevant SDLC phases before bounded completion |

## Evidence strength

- Structural/native validation proves only the invariants it checks.
- Static inspection can prove presence/absence of dependency or projection text, not model adherence.
- Behavioral cases can support bounded behavior claims on the bound runtime/model.
- Candidate + exact baseline on the same frozen cases is required for comparative uplift when feasible.
- Sequential self-review is not independent qualification.

If required execution is unavailable, preserve `NOT_RUN` and state the re-entry condition. Do not redesign a sound semantic model merely to avoid an evidence limitation.
