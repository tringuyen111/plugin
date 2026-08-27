# SDLC Rigor Synthesis

Use this reference after `SKILL.md` has selected the core **semantic uncertainty x consequence** posture. This file applies that posture to interacting SDLC concerns; it does not redefine the governing System Plane law. The goal is not to score a project or force phases. Choose the **smallest controls that can actually discharge the active concerns**, order them by dependency, then re-evaluate.

## 1. Turn the selected rigor posture into SDLC controls

Apply the posture to the actual concern rather than repeating a generic phase sequence:

- **Execute:** use the most specific capability directly and keep proof targeted to the requested claim.
- **Clarify/bound:** resolve or explicitly bound the smallest consequential decision; a reversible assumption is acceptable only when plausible alternatives do not materially change the correct outcome.
- **Contain + prove:** keep settled Product/Design meaning fixed; increase impact analysis, containment/recovery, rollout caution, and representative proof appropriate to the consequence.
- **Stop affected mutation:** resolve the semantic/architecture/security uncertainty first, then establish containment/recovery and stronger proof before execution.

These are reasoning postures, not numeric risk scores. Exact controls come from the real concern and project policy.

## 2. Apply orthogonal SDLC gates

The following dimensions do not collapse into the matrix and cannot compensate for one another.

### Authority / protected side effects

Authority is a gate, not a confidence score. Strong evidence, low blast radius, or an available tool cannot grant permission to deploy, delete, publish, communicate externally, change protected policy, or accept risk.

### Evidence / proof burden

Match proof to the **claim being made** and the consequence of being wrong. New evidence may close uncertainty or strengthen readiness, but an approval cannot convert `FAIL`, `NOT_RUN`, `MISSING`, or contradictory evidence into PASS.

### Explicit policy

A repository/workspace/user policy may require a concrete control even when the change is otherwise low-risk. Apply the named control; do not infer unrelated phases from it.

### Persistence / continuation

Persist state or create a handoff only when a real downstream consumer cannot safely reconstruct what it needs from canonical truth plus the ordinary result. Continuation machinery is not a default lifecycle step.

## 3. Map each concern to a control that can change it

Avoid adding generic process. Ask what action would actually reduce or resolve the concern.

| Material concern | Control that can discharge/reduce it |
|---|---|
| Unresolved behavior/meaning | Obtain the smallest authoritative decision, experiment, or evidence that distinguishes materially different outcomes. |
| Architecture/compatibility uncertainty | Inspect current contracts and resolve the consequential design choice before dependent implementation. |
| High consequence / low reversibility | Reduce exposure with bounded scope, staged rollout, backup/rollback/compensation, observability, or stronger impact analysis as appropriate. |
| Weak proof for the intended claim | Run the smallest representative verification that can falsify the claim; strengthen only when the claim or consequence requires it. |
| Missing authority | Obtain authority from the real owner or stop the protected action. |
| Real continuation need | Persist only the decision/evidence/state the next consumer cannot reconstruct. |
| Explicit required policy | Execute the named control and verify its own completion condition. |

If a proposed artifact, review, phase, or approval cannot change any active concern, it is ceremony for this task.

## 4. Order controls by dependency, not lifecycle tradition

Use this default dependency logic:

1. **Resolve correctness-changing meaning before dependent mutation.** If two plausible interpretations produce materially different correct implementations, do not code one merely because the edit is easy.
2. **Establish containment/recovery before high-consequence mutation.** Known semantics do not eliminate operational risk.
3. **Obtain authority before protected side effects.** Do not postpone permission checks until after irreversible work.
4. **Execute through the most specific capability.** SDLC does not perform the domain work itself.
5. **Verify the observed result against the intended claim.** Provider acknowledgement or implementation completion is not automatically acceptance/release/operational proof.
6. **Re-evaluate the concern set.** New evidence can close a concern, expose a new one, or reduce required rigor. Shed resolved context instead of carrying the original process plan forward by inertia.

## 5. De-escalation rules

De-escalation is evidence-driven and dimension-specific.

- A proven root cause can close causal uncertainty and permit implementation, but it does not grant deployment authority.
- A canary, staged rollout, backup, or rollback path can reduce exposure consequence; it does not resolve ambiguous product behavior.
- Strong targeted tests can support a narrow correctness claim; they do not automatically become independent QA, UAT, release, or production-health evidence.
- An authorized risk acceptance can permit proceeding under known risk; it does not rewrite failed/missing evidence as success.
- A canonical source that fully reconstructs continuation state can remove the need for a handoff; it does not remove unrelated evidence or authority gates.

## 6. Contrastive examples

### Fixed semantics, high consequence

A data backfill has approved meaning and exact compatibility rules, but touches millions of rows. Do not restart Product/BA. Require data invariants, bounded execution, recovery/rollback strategy, representative verification, and the actual mutation authority.

### High uncertainty, low consequence

A reversible internal UI label has two plausible interpretations that would communicate different behavior. Resolve the smallest meaning gap before choosing copy; do not manufacture a full product-discovery package.

### Evidence closes one concern only

Diagnosis proves the duplicate-charge root cause. Causal uncertainty is closed, so implementation can proceed. Production deployment remains blocked if release authority is still absent.

### Containment cannot repair wrong meaning

A staged rollout is proposed for a feature whose effective-date semantics are unresolved. Canarying reduces exposure but cannot determine the correct behavior. Resolve the semantic decision before rollout engineering.
