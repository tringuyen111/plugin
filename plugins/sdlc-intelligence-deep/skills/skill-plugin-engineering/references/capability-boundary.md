# Capability Boundary

Use this method to decide what the reusable capability actually is before naming or packaging it.

## Reconstruct the claim

Express the candidate as:

```text
When <triggering situation>,
use <inputs/evidence>
to perform <distinct mechanism>
and produce/decide <accountable outcome>
under <constraints/authority>,
complete when <checkable condition>.
```

If this cannot be stated without several unrelated outcomes or authorities, the boundary is probably wrong or unresolved.

## Decision variables

Evaluate together:

- repeatable job and triggering situation;
- semantic inputs and evidence authority;
- accountable output/decision/action;
- mechanism that should change agent behavior;
- authority and side effects;
- completion/proof;
- independent reuse or direct invocation value;
- independent validation value;
- neighbor overlap and negative trigger cases;
- invocation/context/maintenance cost.

## Skill-worthiness test

A first-class Skill should normally earn all of:

1. reusable job;
2. observable behavioral delta from the base agent;
3. distinct reasoning/workflow/tool mechanism;
4. bounded input/output/authority/completion;
5. value from direct invocation or independent reuse/validation;
6. simpler artifact is insufficient;
7. material failure can falsify the capability claim.

Do not improve a weak candidate until it passes. Reclassify it instead.

## Local methodological sufficiency

First-class identity implies local sufficiency, not knowledge exclusivity. Unless the runtime contract guarantees another capability will be active, a Skill must expose enough of its own decision mechanism, governing constraints, failure/correction logic, and completion semantics to perform its accountable job when invoked directly. Its own conditional references count as local context; an unrelated sibling Skill does not.

Treat the boundary as an **accountability/authority boundary, not an ignorance boundary**. A Skill may need deep knowledge from adjacent specialties when that knowledge changes whether its own outcome is correct. Keep the foreign terminal decision or authority with the proper owner, but do not eject the local consequence: apply already-established adjacent constraints, preserve unblocked work, and hand off/compose only the genuinely foreign decision.

Do not remove a decision-critical rule merely because another Skill teaches a similar principle. Adjacent Skills may legitimately repeat a compact concept when it drives different decisions under different accountable outcomes. Split/merge decisions follow job, mechanism, authority, completion, and independent value—not whether two Skills share vocabulary or a reusable heuristic.

Challenge cross-Skill overlap only when it creates a material defect: contradictory guidance, boundary/authority collision, repeated context cost under real co-loading, or maintenance divergence capable of changing behavior. Otherwise prefer independently capable Skills over theoretical deduplication.

## Boundary failure signatures

- role-as-Skill: the artifact mostly says what persona owns;
- micro-Skill: one small substep with no independent outcome;
- provider/tool split: same job duplicated by provider name;
- wrapper Skill: renames a tool call without decision or verification delta;
- super-capability: several unrelated outcomes/authorities under one entrypoint;
- route-as-Skill: selects another owner but performs no bounded capability;
- package confusion: distribution/composition concern mistaken for a Skill;
- reference inflation: knowledge that could be conditional context is given a first-class trigger.

## Split / merge / keep logic

Prefer **REVISE** when identity and job are coherent but depth, context, steering, evidence, or implementation is weak.

Consider **MERGE** when candidates share the same accountable outcome, mechanism, authority, and completion, and separation adds discovery/context/handoff cost without independent value.

Consider **SPLIT** only when resulting candidates have independently useful outcomes, mechanisms/authority, direct triggers or reuse, and falsifiable completion. A split proposal does not automatically create several Skills.

Use **RECLASSIFY** when the mechanism is actually knowledge, deterministic transformation, provider translation, composition, package governance, or project-specific state.

Use **REMOVE/DEPRECATE** only with consumer/replacement/migration evidence.

## Falsifiers

Challenge the boundary with near cases:

- Could the base agent do the same work with a short reference and no reusable control surface?
- Does changing provider leave the job unchanged?
- Can the claimed Skill finish without merely naming another capability?
- Can two adjacent Skills both plausibly trigger on the same ordinary request?
- Can an evaluator state a concrete failure that distinguishes this capability from generic competence?

If answers undermine the claimed identity, reopen the boundary rather than patching wording.
