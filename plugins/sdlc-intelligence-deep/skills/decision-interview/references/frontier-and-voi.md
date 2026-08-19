# Frontier and Value of Information

Use this reference when several unresolved branches compete, the next frontier is unclear, or someone proposes more inspection/research/prototyping.

## Global frame first

A frame defect that changes what decision is actually being made, its objective, scope, or non-goals can invalidate the whole surface. In that case the frame defect **is** the highest-leverage frontier and must be repaired before comparing downstream branches.

Otherwise do not diagnose every branch first. Enumerate material candidates, select the frontier, then diagnose the weakest link inside that selected frontier.

## Candidate frontier

A candidate frontier can be:

- an unresolved **human-owned decision**;
- a bounded **stakeholder/input question** whose answer can materially change a decision but does not itself authorize disposition;
- an **evidence gap** that can credibly flip a choice or invalidate a load-bearing premise; or
- a weak frame element that must be repaired before responsible decision-making.

Filter before prioritizing:

1. If current source/runtime/artifacts can answer a factual gap, inspect instead of asking.
2. If external evidence or an experiment can answer it, compose the available `research` or `prototype` owner only when the Value-of-Information gate below passes; consume the bounded result back into the same decision surface.
3. If a participant lacks final decision authority but owns decision-changing evidence, a constraint, or stakeholder value input, collect only that bounded input and keep disposition unresolved for the decision authority.
4. If another canonical owner must decide the choice, preserve/return that final authority boundary.
5. If the answer cannot change the current decision or caller handoff, defer/drop it.

## Frontier selection lenses

Compare only material lenses; never turn them into additive scores.

| Lens | Selection effect |
|---|---|
| dependency unlock / fan-out | prefer the branch that unlocks real dependent decisions |
| consequence / blast radius | give more attention to safety, contractual, financial, data, customer, migration consequences |
| reversibility / lock-in | hard-to-reverse/public/external commitments can outrank cheap preferences |
| decision-changing uncertainty | prefer an evidence gap only if better information can credibly flip the choice or invalidate a premise |
| authority / timing window | prioritize a valid decision/input authority window when delay would remove the chance to decide correctly |
| cost of delay | prioritize a blocker whose deferral materially stalls or risks current work |
| contradiction / invalidation pressure | repair a premise/value conflict that makes current resolutions incoherent |
| cognitive / information cost | avoid low-value owner questions and investigations |

If two frontiers remain genuinely tied, prefer the one that unlocks the next dependent decision. If the tie itself is an owner priority choice, ask that single priority question.

A low-impact branch does **not** outrank a high-leverage frontier merely because its local decision-quality link is weaker.

## Value-of-Information gate

Reduce uncertainty only when **both** are true:

1. the uncertain variable could credibly change the preferred option, invalidate a load-bearing assumption, or change the safe handoff; and
2. the expected decision benefit justifies owner attention, tool/research cost, schedule delay, or prototype cost.

Otherwise proceed with residual uncertainty visible or defer to the correct owner. No universal numeric VoI formula is required.

## Evidence frontier outcomes

- `INSPECT_NOW` — current source/runtime can answer and the answer changes the decision model.
- `RESEARCH_OR_PROTOTYPE` — external/new evidence can change the decision and passes the VoI gate.
- `AUTHORIZE_EVIDENCE_WORK` — evidence would be valuable, but its material cost/delay/risk needs owner authorization; ask about that authorization, not the factual answer.
- `DECIDE_WITH_UNCERTAINTY` — more evidence is unlikely to change the choice or costs too much relative to value.
- `COLLECT_BOUNDED_INPUT` — a non-final participant owns decision-changing evidence/constraint/value input; collect that input without treating it as final disposition.
- `DEFER_TO_DECISION_AUTHORITY` — the unknown is actually a protected value/authority decision.
- `DROP` — the gap cannot affect the current handoff.

## Failure corrections

| Failure | Correction |
|---|---|
| research continues because information is available | re-run VoI gate; stop if choice cannot flip |
| weakest-looking local issue wins by default | select frontier by leverage/consequence/dependency first, then diagnose locally |
| convenient question asked while a blocker remains | re-rank by dependency unlock / consequence |
| owner asked a repository/provider fact | inspect source or compose bounded Research/Prototype; ask only if authorization of evidence cost/delay is the real frontier |
| non-final stakeholder input discarded | collect only the bounded legitimate input; preserve final decision authority |
| preference treated as mandatory policy | restore constraint/value distinction before ranking options |
| high-consequence choice rushed because it is "one question" | deepen evidence/alternatives/authority proportionally before asking |
| low-impact reversible choice consumes interview time | defer it if it does not constrain the caller |
