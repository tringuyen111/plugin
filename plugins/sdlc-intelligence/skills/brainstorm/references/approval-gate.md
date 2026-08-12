# Brainstorm Approval Gates

Approval preserves user authority. Approval does **not** prove factual correctness, complete evidence, downstream canonicality, or release readiness.

All user-facing labels and sample prompts in this reference are semantic examples. Render them naturally in the selected artifact/user language rather than copying the English words mechanically.

## Contents

- Working capture authority
- L1 — Finalize the living brainstorm
- L2 — Review a material revision when required
- L3 — Refine a representation
- Approval versus quality
- Gate ordering

## Working capture authority

A Brainstorm invocation means the user is asking the skill to capture and clarify one idea. When a writable project workspace and local-write policy permit it, the skill may maintain the selected brainstorm artifact as `status: working` throughout the interview.

This authority is narrow:

- only the canonical brainstorm artifact for the current idea;
- reversible local artifact updates only;
- no source-control action;
- no downstream URD/BRD/PRD/SRS mutation;
- no external communication or publication.

If project policy requires extra confirmation for local writes, follow that policy. Do not reinterpret L1 as a universal pre-write gate.

## L1 — Finalize the living brainstorm

**Question:** `Does the user accept this consolidated brainstorm state as finalized for now and ready for downstream handoff?`

L1 happens after the skill has already maintained the working artifact.

Before L1:

1. read the full current artifact;
2. consolidate all known answers into their semantic sections;
3. run the quality checklist;
4. surface unresolved OQs and pending L3 disagreements;
5. identify downstream impacts without claiming downstream owners accepted them.

### User-facing presentation

Use natural language in the artifact's selected language. Explain:

- the artifact/path being finalized;
- the important flows/behaviors/rules/limits/wording now captured;
- unresolved OQs or `TBD`s;
- downstream owners that may need review;
- quality `pass|partial` and why.

Do not force a developer-log table such as `# | path | action | summary` for BA/PM-facing L1.

Ask:

```text
Finalize / Continue revising / Hold
```

### Outcomes

- **Finalize** → set `status: finalized`, update changelog/date, preserve unresolved OQs visibly, and provide downstream handoff suggestions.
- **Continue revising** → keep `status: working` and continue using the same artifact.
- **Hold** → keep `status: working`; do not force downstream progression.

Finalizing with unresolved OQs is allowed. Approval may be valid while quality remains `partial`.

## L2 — Review a material revision when required

L2 is not required for every incremental update to a working artifact. Use it when at least one of these is true:

- project policy explicitly requires diff approval;
- the user asks to review the exact changes;
- a previously finalized artifact is being materially revised and a diff is useful before re-finalization;
- the proposed change would replace a prior user decision and the delta could be easy to miss.

Show a unified diff or a concise contextual delta. Do not hide material changes behind a summary when exact review matters.

Example:

```diff
--- docs/authentication/brainstorms/google-oauth-login.md
+++ docs/authentication/brainstorms/google-oauth-login.md
@@
-| callback timeout | TBD | TBD | TBD |
+| callback timeout | pending-auth | return to sign-in and allow retry | clean up after 15 minutes |
```

A rejected diff leaves the current artifact unchanged for that proposed revision. A requested correction produces a new proposed delta.

## L3 — Refine a representation

Use L3 for a representation that benefits from direct user review, especially ASCII flow diagrams and potentially decision/state representations.

```text
Brainstorm representation — round 1

<representation>

Accept / Change: <correction> / Cancel
```

### Automatic refinement limit

- `Accept` → representation is accepted within Brainstorm scope.
- `Change: ...` → incorporate the correction and render the next round.
- `Cancel` → stop the refinement branch; keep affected content unresolved if needed.
- Clearly identify round 1, 2, or 3.

Three rounds limit the **automatic refinement loop**, not user authority.

If the user still disagrees after round 3:

1. keep the representation/decision `UNRESOLVED`;
2. do not silently move to L1 as if accepted;
3. offer: accept round 3, continue refining outside the automatic loop, or hold/cancel with an OQ.

Never say the artifact is accepted merely because the round limit was reached.

## Approval versus quality

| Concept | Meaning |
|---|---|
| Approval | The user accepts the workflow action/state within their authority. |
| Quality/readiness | The artifact has enough evidence/content for the intended handoff. |

A user can finalize an artifact that still contains visible `TBD`/OQ items. In that case, approval is real while quality may remain `partial`.

## Gate ordering

Typical first-pass flow:

```text
working capture/update in one artifact
→ L3 refinement where needed
→ quality gate
→ L1 finalization
→ downstream handoff suggestions
```

Typical revision of an already-finalized artifact:

```text
user asks to revise
→ reopen same artifact as working
→ consolidate changes
→ L3 where needed
→ optional/required L2 review of material delta
→ quality gate
→ L1 re-finalization
```
