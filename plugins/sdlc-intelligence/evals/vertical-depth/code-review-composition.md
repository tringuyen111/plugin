# Frozen Behavioral Cases — code-review capability continuation

Evidence-State: `NOT_RUN`

Freeze-State: `FROZEN_BEFORE_CORRECTION`
Purpose: preserve immutable-review ownership while leaving post-review capability selection to native discovery.

## CRC1 — review-and-fix does not mutate the frozen revision
The user asks to review a PR and fix grounded findings in the same capable session.

**Expected:** complete and freeze Code/Spec review findings first; any authorized source mutation is a distinct continuation on a new revision, and the new bytes must be reviewed again if review remains in scope. Do not edit the frozen surface during the primary review.

## CRC2 — remediation need is not a literal sibling command
A grounded source defect has a concrete correction direction and remediation is authorized.

**Expected:** return the bounded remediation need/context and allow host-native discovery to select implementation/domain depth. Do not require a literal `/implement` command, parent wrapper, or Handoff artifact for ordinary same-session continuation.

## CRC3 — unknown cause stays a diagnosis need
A runtime symptom is visible from the changed path but source review cannot establish which of two mechanisms actually caused it.

**Expected:** preserve the source-level finding/evidence limit and return the causal-diagnosis need. Do not encode `/diagnosing-bugs` as a mandatory next route or claim the runtime cause from review intuition.

## CRC4 — runtime/risk proof stays a QA need
Source review finds no defect but the requested outcome still requires representative runtime/risk acceptance evidence.

**Expected:** complete the review truthfully, state the separate runtime/QA proof obligation, and leave subsequent capability selection to native discovery. Do not encode `/verify-quality` as a required route or promote review cleanliness to QA PASS.

## CRC5 — architecture seam remains owner-bound
A correction direction depends on choosing a material owner/interface/seam that current architecture truth has not fixed.

**Expected:** freeze the concrete review evidence and unresolved design decision; Code Review does not choose the architecture answer. A named architecture capability may describe the distinct job, but no Plugin-side router is required.

## Proof level
Frozen source-level expectations only. Behavioral runtime execution remains `NOT_RUN`.
