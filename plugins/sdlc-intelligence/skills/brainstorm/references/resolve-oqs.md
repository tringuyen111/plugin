# Resolve Brainstorm Open Questions

Use this workflow when the user wants to resolve OQs in an existing brainstorm. The goal is not merely to tick a checkbox; it is to **propagate the new answer through the same living brainstorm artifact so current sections remain consistent**, then detect downstream impact without mutating downstream truth.

## Contents

1. Preconditions
2. Collect OQs
3. Select scope
4. Resolve one OQ
5. Propagate inside the brainstorm
6. Replace stale current truth safely
7. Detect downstream impact
8. Persist and review
9. Complete

## 1. Preconditions

- The current living brainstorm artifact or its full logical Markdown state must be available.
- Read the whole artifact before asking an OQ.
- Resolve OQs owned by this brainstorm only.
- Do not import URD/BRD/PRD/SRS OQs and silently make Brainstorm their owner.

If the artifact is missing, report missing context instead of reconstructing it from memory.

If the artifact was `finalized` and the user explicitly asks to revise/resolve OQs, reopen the **same artifact** as `working`; do not create a revision sibling.

## 2. Collect OQs

Build a stable-ID list:

```text
OQ-1 — unresolved — How long is the verification link valid?
OQ-2 — unresolved — If Google and local accounts share an email, link or reject?
OQ-3 — hold — Does legal require separate consent wording?
```

Do not renumber remaining OQs when one is resolved.

## 3. Select scope

The user may choose:

- `all` — all unresolved OQs, one by one;
- `OQ-2` — one OQ;
- `OQ-1,OQ-3` — a subset;
- `skip` / `hold` — leave unresolved.

Apply no-re-ask: if the current session/source already answered an OQ, use that answer rather than asking it again.

## 4. Resolve one OQ

For each selected OQ:

1. show the OQ plus relevant current context;
2. separate any existing Brainstorm proposal from observed facts;
3. receive the new fact/decision/correction;
4. classify it as appropriate:
   - `OBSERVED` — directly supplied evidence/source claim;
   - `DECIDED` — accepted by the user/authorized owner within Brainstorm scope;
   - `PROPOSED` — still only a suggestion;
   - `UNRESOLVED` — missing/conflicting/deferred;
5. when the accepted answer is a material decision that needs stable later reference, scan the full artifact + changelog for existing decision references, assign `DEC-(max existing + 1)`, and record `OQ-x resolved by DEC-y`; never backfill or reuse a missing number;
6. preserve exact values/rules/wording when they matter.

Do not pick a plausible option merely because it seems reasonable.

## 5. Propagate inside the same brainstorm

After resolving an OQ, inspect every section that may now be stale:

- Context;
- Capability Breakdown;
- Core Flows;
- Decision Points;
- Scenario Matrix;
- State Transitions;
- Interrupted Transactions;
- Validation / Limits / Wording;
- Assumptions;
- Risks;
- Success Criteria;
- Open Questions;
- Next Steps / downstream impact handoff.

Example:

```text
OQ-2 resolved:
Google account matches an existing local email
→ user must authenticate locally before linking.
```

Potentially stale content:

- Google OAuth happy path;
- decision `email already exists?`;
- interruption path if the user cannot remember the local password;
- assumption `same email auto-merges`;
- error/info wording;
- PRD/SRS impact handoff.

Update all affected sections of the **same artifact**, not only the OQ row.

## 6. Replace stale current truth safely

When a new answer conflicts with old content:

1. link the change to the stable OQ and, when material, `DEC-n` reference;
2. replace the old current behavior with the new current behavior;
3. if a prior material decision is replaced, assign a new `DEC-n` and record `DEC-new supersedes DEC-old`; never reuse the old ID;
4. update changelog for the material change and any OQ→DEC/supersession link;
5. do not keep both incompatible behaviors as two current truths unless they are intentionally retained alternatives.

If the conflict remains unresolved, keep it `UNRESOLVED` rather than choosing a side.

The artifact is a current consolidated model, not a raw history log. Historical traceability belongs in stable `OQ-n`/`DEC-n` references, changelog, and source history. Decision-point row IDs such as `D1` are not substitutes for `DEC-n`.

## 7. Detect downstream impact

After internal propagation, inspect downstream artifacts **read-only** when the runtime/project policy permits it.

Create a handoff such as:

| Owner / Artifact | Potentially stale content | Brainstorm evidence | Requested action |
|---|---|---|---|
| PRD | account-linking rule | OQ-2 + updated flow | PRD owner reviews canonical scope/rule |
| SRS | callback/linking behavior | OQ-2 + state/interrupt behavior | SRS owner reviews technical design after product decision |

Rules:

- Brainstorm may detect + describe impact.
- Brainstorm must not edit URD/BRD/PRD/SRS.
- If downstream files cannot be read, a handoff may still be produced from known links, but file-level impact verification remains `NOT_RUN`.

## 8. Persist and review

### Workspace

If local write capability/policy permits, update the living brainstorm artifact in place as the user answers. Do not create a separate resolved-OQ file.

For a material revision to a previously finalized artifact, use L2 if required by project policy, requested by the user, or useful to make a replaced decision explicit before re-finalization.

Then run the quality gate and L1 again when the revision is ready to finalize.

### Chat only

Return or maintain the latest consolidated logical Markdown artifact. Do not claim the repo file changed.

## 9. Complete

Report naturally in the artifact/user language:

- OQs resolved;
- OQs still held/unresolved;
- brainstorm sections changed;
- downstream owners/artifacts needing review;
- current artifact status `working|finalized`;
- quality `pass|partial`.

Example semantics:

```text
Resolved: OQ-2
Updated in Brainstorm: Flow 5.2, D3, Assumption A-2, Wording W-4
Still unresolved: OQ-1, OQ-3
Downstream review: PRD authentication rule; SRS account-linking behavior
Status: working until re-finalized
```
