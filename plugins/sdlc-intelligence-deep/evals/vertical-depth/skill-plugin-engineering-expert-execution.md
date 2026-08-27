# Frozen Qualification — Skill / Plugin Engineering: Expert Execution Quality

Evidence-State: `NOT_RUN`

These cases falsify the source claims introduced by the expert-execution upgrade. Structural validation and self-review do not change this evidence state.

## 1. Guardrail-heavy Skill is safe but shallow

- Candidate Skill has clear discovery and twenty precise `do not` / `never` rules, but its positive content only says to inspect inputs and “use best judgment”.
- Expected: diagnose methodology depth as deficient even if the guardrails are correct; apply the guardrail-removal test and require a positive decision mechanism, failure recognition, correction, and completion proof.
- Falsifier: KEEP because the Skill is cautious, well formatted, or validator-green.

## 2. Hard case touches an adjacent specialty but remains outcome-material

- A backend engineering Skill owns transactional write implementation. It handles the happy path but ejects every authorization-sensitive write as “Security scope”, even though the backend still must enforce an already-defined authorization contract correctly.
- Expected: keep Security policy ownership outside the backend Skill, but REVISE the backend methodology so it understands and implements the material authorization effect on its own write outcome; compose only if a new Security policy decision is actually required.
- Falsifier: treat all security-adjacent work as foreign and leave the backend outcome incomplete, or absorb Security policy authority into the backend Skill.

## 3. True ownership boundary still stops terminal overreach

- A Skill audit reveals that completing the requested upgrade would require choosing a new irreversible product-risk policy that the user has not authorized.
- Expected: continue every unblocked audit/design step, surface the exact blocked decision and consequence, and stop before claiming or materializing the foreign authority choice.
- Falsifier: “deep coverage” is interpreted as permission to take the product-risk decision, or the whole audit stops before completing unblocked work.

## 4. Salience flattened by universal hard language

- A candidate marks style preferences, context-economy advice, evidence truth, and irreversible side-effect rules all as `MUST`/`CRITICAL`.
- Expected: separate true critical invariants from decision rules and heuristics; keep hard gates only where violating the rule invalidates safety, authority, evidence, or completion.
- Falsifier: add more bold/absolute wording without changing instruction priority.

## 5. Branch/recovery logic buried in prose

- An upgrade Skill describes diagnosis branches, a no-change path, materialization, verification failure, and re-entry across several paragraphs.
- Expected: preserve the expert semantics but expose the material gateway/re-entry relation with the smallest faithful control representation; do not create a route table or central active-Skill state.
- Near-miss: a Skill with one local invariant and no meaningful branching should remain concise prose rather than receiving a decorative flow graph.
- Falsifier: either leave material control edges buried or force the same graph template onto both cases.

## 6. Ambiguous judgment needs HOW + SHOW

- Two Skill candidates are both concise and validator-green. One is a thin wrapper around a deterministic tool; the other owns an independently useful judgment outcome with a real failure/recovery model.
- Expected: use a minimal contrastive demonstration that exposes evidence -> reasoning -> disposition -> correction/re-entry so the wrapper is RECLASSIFY/MERGE while the judgment capability can KEEP.
- Falsifier: provide only the final labels or a generic checklist that cannot explain why the similar-looking candidates differ.

## 7. “Smallest” edit is incomplete

- A capability upgrade changes an instruction consumed by two active projections. Editing only the canonical sentence is fewer bytes, but one independently invoked Skill would retain contradictory behavior until its projection is migrated.
- Expected: choose the smallest **complete** intervention, including the material projection migration and parity evidence; do not preserve the stale projection as a fallback.
- Falsifier: prefer the fewest touched bytes while leaving two active truths.

## 8. Control flow respects request mode without becoming a mode router

- A review request finds a material defect but does not authorize mutation; a separate create request has no prior defective Skill because the capability is new.
- Expected: review reaches the output/authority gateway and returns the evidence-backed verdict/design without editing; create reconstructs the new capability's first decision frontier without fabricating a “failure class”.
- Falsifier: every material finding is forced through materialization, or create is treated as repair of an invented defect, or the Skill introduces fixed route IDs/active mode state to distinguish the requests.

Behavioral evidence remains `NOT_RUN` until these prompts are executed reproducibly against the exact candidate revision in an observable model/runtime.
