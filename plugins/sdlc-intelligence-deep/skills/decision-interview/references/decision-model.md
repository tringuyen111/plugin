# Decision Model

Use this reference when a simple single-choice conversation is insufficient because premises, hard constraints, values, authority, or decisions interact.

## Diagnostic model

Run this diagnosis **inside the already-selected highest-leverage frontier**. Treat decision quality as a weakest-link problem only within that frontier; a globally broken frame is handled earlier as the frontier itself.

| Link | Healthy when | Failure signature | Correction |
|---|---|---|---|
| Frame | actual decision, scope, objective, non-goals are coherent | solving the wrong decision or bundling several choices | repair frame before ranking options |
| Alternatives | credible feasible option classes exist after mandatory constraints | false dichotomy, infeasible option retained, first idea treated as full set | apply hard constraints, then reopen plausible alternatives |
| Information | facts are sufficient for the current choice | owner is asked source-answerable facts or unknowns hide a flip condition | inspect/research only decision-changing gaps |
| Values / trade-offs | differentiating objectives, preferences, soft thresholds, and risk posture are visible | recommendation depends on hidden preference or treats preference as prohibition | elicit the governing value/threshold and keep it distinct from hard constraints |
| Reasoning | disposition follows from evidence + constraints + values | conclusion hides assumption/bias or ignores strong countercase | expose premise, alternative, sensitivity |
| Commitment / authority | final decision authority and any bounded input authority are explicit | conversational input is treated as protected approval, or useful input is discarded because its source cannot decide | use input for its bounded role; keep final disposition with the correct decision authority |

Do not run all six links as a checklist. Diagnose the selected frontier's weakest material link.

## Hard constraint versus value

Keep these semantics separate:

- `CONSTRAINT` — mandatory bound that can eliminate an alternative when its authority/provenance is established.
- `VALUE` — objective, preference, trade-off priority, soft threshold, or risk tolerance that differentiates feasible alternatives.
- A value/threshold becomes a hard constraint only when the authorized owner/policy explicitly governs it as a mandatory bound. Record the reclassification and provenance; do not infer it from strong wording.

## Authority roles

Do not collapse all participants into one owner role:

- **Decision authority** — may adopt, defer, or accept protected residual risk for the decision in scope.
- **Input authority** — authoritative for a bounded fact or constraint relevant to the decision but may not decide the whole choice.
- **Stakeholder value source** — legitimately supplies an affected objective/preference but does not automatically own facts, policy, or final disposition.

A useful interview may collect bounded input from a non-final participant. That input can change the decision model without becoming approval.

## Logical decision dependency graph

Maintain the graph internally only as deeply as it changes reasoning.

Node classes:

- `FACT` — current source/runtime/external truth supported by evidence.
- `CONSTRAINT` — mandatory policy, authority, technical, contractual, or business bound.
- `VALUE` — objective, preference, trade-off priority, soft threshold, or risk tolerance.
- `ASSUMPTION` — unresolved premise currently supporting a disposition.
- `DECISION` — human-owned choice/disposition.

`EVIDENCE_GAP` and `DEFERRED_FRONTIER` are **frontier/register states**, not dependency-graph node classes. Keep them in the interview register unless representing them as nodes changes an actual dependency decision.

Typed edges:

```text
[FACT] --------EVIDENCES--------> [DECISION]
[CONSTRAINT] ---CONSTRAINS------> [DECISION]
[VALUE] --------SHAPES_TRADEOFF-> [DECISION]
[DECISION A] ---DEPENDS_ON------> [DECISION B]
[DECISION] -----ASSUMES---------> [ASSUMPTION]
[NEW FACT] -----INVALIDATES-----> [ASSUMPTION / DECISION]
[DECISION] -----AUTHORIZED_BY---> [DECISION AUTHORITY]
[FACT/CONSTRAINT] -ATTESTED_BY--> [INPUT AUTHORITY]
[VALUE] ---------EXPRESSED_BY---> [STAKEHOLDER VALUE SOURCE]
```

### Dependency direction invariant

`A --DEPENDS_ON--> B` means **A is the dependent and B is the prerequisite**.

When prerequisite `B` becomes invalid/reopened, traverse the **incoming** `DEPENDS_ON` edges in reverse from `B` to find dependents such as `A`. Apply the same principle to a changed assumption: from the invalidated assumption, reverse-traverse incoming `ASSUMES` edges to decisions that rely on it, then continue through incoming `DEPENDS_ON` edges to downstream dependents. Preserve unrelated branches.

Use typed edges because a single changed premise can invalidate several dependent decisions while leaving unrelated decisions intact.

## Decision register discipline

For a material resolution, capture only fields needed to preserve coherence:

- stable local ID when cross-reference/re-entry matters;
- decision question and selected/deferred disposition;
- final decision authority;
- material input authority/provenance when validity depends on it;
- evidence + hard constraints + values/preferences that govern the choice;
- strongest material alternative;
- load-bearing assumptions;
- flip condition / sensitivity;
- affected dependents;
- continuation/persistence owner when any.

Do not expose the full register after every answer. Surface a concise delta plus the next single question; show the compact full register only on request, checkpoint, or finalization.

## Boundary cases

- A raw idea with broad missing semantics belongs to Brainstorm rather than being inflated into a decision graph.
- A source-inspectable fact is not a human decision node.
- A protected decision remains unresolved when the participant lacks final authority even if they express a preference.
- A non-final participant may still be the legitimate source of a bounded fact, constraint, or stakeholder value input; collect only that input and preserve the final authority boundary.
- A reversible low-impact preference may be deferred when it does not constrain the current handoff.
