# Claim Challenge Contract

Canonical maintainer source: this runtime contract; changes require matching root/router and adversarial-eval updates.

Use this contract only when a claim is load-bearing for the current decision, evidence conflicts with it, or the user explicitly disputes an evidence-based verdict. It is not a mandate to challenge every statement. Low-risk, reversible gaps may be recorded as assumptions and allowed to proceed.

## Claim anatomy

Separate mixed input into explicit claims. Classify each material claim as one of:

```text
FACT
ASSUMPTION
INTERPRETATION
DECISION
PREFERENCE
APPROVAL
FORECAST
QUALITY
READINESS
COMPLETION
```

Record the claim, source, scope, decision impact, evidence cited, and what downstream action would rely on it. One sentence may contain several claims with different states.

## Evidence language

Use these evidence labels truthfully:

```text
OBSERVED      read or inspected directly
REPRODUCED    repeated by a named command, probe, or procedure
SUPPORTED     several relevant observations point the same way
INFERRED      reasoned from evidence but not directly observed
ASSERTED      stated without sufficient supporting evidence
MISSING       required evidence is absent
CONFLICTING   credible evidence points to incompatible conclusions
```

Search for both supporting evidence and counter-evidence. Do not search only to defend the user, upstream author, or agent's preliminary view. Authority, confidence, seniority, and repetition are not factual evidence.

## Challenge threshold

Judge both **impact if wrong** and **reversibility**:

| Impact if wrong | Reversibility | Required handling |
|---|---|---|
| Low | Easy | Record an explicit assumption and proceed. |
| High | Easy | Run a bounded check or warn before proceeding. |
| Low | Hard | Ask the decision authority before committing. |
| High | Hard | Challenge with evidence; remain `UNRESOLVED` or `BLOCKED` until safe. |

Also challenge when direct source/runtime/test/artifact evidence contradicts the claim, when the claim grants approval or completion, or when downstream would make a costly or irreversible decision from it.

Do not challenge merely because an alternative is imaginable. Do not expand the investigation beyond evidence needed for the current decision.

## Challenge loop

1. **Extract the exact claim.** Do not attack a broad paraphrase.
2. **Name the decision impact.** State what would happen if the claim is accepted.
3. **Set a preliminary verdict before asking questions.** Record current state, confidence, supporting evidence, counter-evidence, and what evidence could change the verdict.
4. **Inspect the smallest sufficient evidence set.** Prefer current source, runtime, reproducible tests/probes, consumed artifacts, and logs over summaries.
5. **Present observations before conclusions.** Separate what was seen from inference.
6. **Ask direct questions.** Ask only questions that can resolve the contradiction, authority, or missing evidence.
7. **Update only for new evidence or an explicit authority decision.** A louder assertion without new evidence does not change factual truth.
8. **Choose the next action.** Confirm, revise, reject, proceed under assumption, return to the claim owner, or stop.

## Claim states

```text
ASSERTED     claim received but not yet tested
CHALLENGED   material counter-evidence or missing proof is presented
CONFIRMED    sufficient evidence supports using the claim for this decision
REVISED      a narrower or corrected claim is supported
REJECTED     current evidence directly contradicts the claim
UNRESOLVED   evidence is insufficient or conflicting
BLOCKED      unresolved claim makes the next action unsafe
```

`CONFIRMED` is scoped to the current decision and evidence. Do not generalize a unit result into E2E readiness or a stakeholder preference into factual correctness.

## Authority versus factual truth

Decision authority may choose product intent, scope, priority, risk acceptance, approval, or a hard-to-reverse trade-off. Evidence determines what source/runtime/tests/artifacts currently show.

Keep them separate:

```text
Verification: FAIL
Decision: ACCEPTED_WITH_KNOWN_RISK
Authority: named decision authority
```

Never rewrite `FAIL`, `NOT_RUN`, `MISSING`, or `CONFLICTING` into success because an authority wants to proceed. Conversely, do not use a factual finding to seize an authority decision the current workflow does not own.

## Stop rules

Proceed under an explicit assumption when the gap is low-risk, reversible, visible to the downstream consumer, and does not affect a hard-to-reverse decision.

Stop or return `BLOCKED` when a load-bearing claim remains unresolved, evidence conflicts, required authority is absent, or proceeding could cause data loss, contract breakage, unsafe release, broad rework, or false completion.

Stop investigating when the current decision is supported, remaining uncertainty does not affect the next consumer, or further work only prepares for hypothetical future needs. The target is the **smallest sufficient evidence**, not certainty about everything.

## Challenge record

```markdown
Claim:
Claim type:
Source and scope:
Decision impact:
Preliminary verdict:

Supporting evidence:
Counter-evidence:
Evidence gaps:
Direct questions:

Claim state: ASSERTED | CHALLENGED | CONFIRMED | REVISED | REJECTED | UNRESOLVED | BLOCKED
Recommended action: PROCEED | PROCEED_WITH_ASSUMPTION | REVISE | RETURN_TO_OWNER | STOP
What evidence would change this state:
```
