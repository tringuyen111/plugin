# Challenge and Re-entry

Use this reference after an initial coherent disposition exists, when new truth arrives, or when closure/reopening is uncertain.

## Stress only load-bearing vulnerabilities

Challenge the smallest material set:

- strongest plausible counter-alternative;
- sensitivity / flip condition;
- contradiction with another accepted value/decision;
- shared assumption whose failure invalidates several dependents;
- material failure/recovery/rollback implication;
- changed or stale source truth.

Do not run a universal security/scale/rollback/UX/etc. checklist. A topic earns attention only when it can change the current decision or safe handoff.

## Proportional rigor

Use the lightest rigor that protects the decision:

- reversible, low-consequence, well-grounded choice -> a single bounded owner decision may be enough;
- coupled, costly, uncertain, or multi-stakeholder choice -> deepen alternatives, assumptions, sensitivity, evidence, legitimate stakeholder input, and recovery implications only where they can change the decision;
- safety-, legal-, contractual-, high-financial-, security-, or irreversible decision -> Decision Interview may improve the frame and expose evidence/authority gaps, but must not impersonate formal risk analysis, protected review, or the authorized decision maker.

Rigor follows consequence and uncertainty, not the number of checklist topics available.

## Re-entry algorithm

When new truth arrives:

1. identify the earliest `FACT`, `ASSUMPTION`, `VALUE`, `CONSTRAINT`, or `DECISION` made false/materially different;
2. from an invalidated assumption, reverse-traverse incoming `ASSUMES` edges to relying decisions; from an invalidated/reopened prerequisite decision, reverse-traverse incoming `DEPENDS_ON` edges to its dependents;
3. apply changed `CONSTRAINT` or `VALUE` semantics to the decisions they govern, preserving the distinction between elimination and trade-off;
4. mark only affected dispositions reopened or conditional;
5. preserve unaffected decisions and their evidence;
6. derive the highest-leverage frontier among the reopened surface;
7. diagnose the weakest decision-quality link **inside that selected frontier** and ask at most one owner/input question.

### Contrast

```text
F9 --INVALIDATES--> A1
D1 --ASSUMES------> A1
D2 --DEPENDS_ON---> D1
F4 --EVIDENCES----> D3
```

`D2 --DEPENDS_ON--> D1` means D2 is dependent and D1 is its prerequisite. When `F9` falsifies `A1`, reverse-traverse `ASSUMES` to reopen `D1`, then incoming `DEPENDS_ON` from `D1` to reopen `D2`; keep `D3` resolved. Reopening the entire interview destroys valid truth; keeping D1/D2 resolved preserves stale truth.

## Value/criterion conflict

If two accepted decisions imply contradictory priorities, do not rationalize both. Surface the shared criterion conflict as a frontier.

Example:

- D4 chooses latency over auditability.
- D7 chooses auditability over latency under materially similar conditions.

Ask what contextual difference changes the priority. If none exists, one or both decisions are not coherent.

Do not use this rule to trade away an authoritative hard constraint; constraints determine feasibility before values rank feasible alternatives.

## Closure sufficiency

Close when no unresolved branch can still:

- change a load-bearing decision;
- invalidate a recommendation;
- block the caller's current handoff;
- create a material evidence/input/authority contradiction.

A branch may be deliberately deferred when it is reversible, cannot affect the current decision, has a safe later owner, or residual uncertainty is explicitly accepted by the authorized owner.

Do not confuse "all imaginable questions asked" with decision sufficiency.

## Participant unavailable / wrong owner

If final decision authority is unavailable, first distinguish whether an available participant still owns decision-changing bounded input.

- If **yes**, collect only that evidence/constraint/value input, record its provenance, and preserve final disposition as unresolved.
- If **no**, preserve a `DEFERRED_FRONTIER` with the unresolved question, why it matters, evidence already established, the final authority needed, and what downstream work is safe or blocked meanwhile.

Do not interrogate an available but unauthorized participant as a substitute decision maker.
