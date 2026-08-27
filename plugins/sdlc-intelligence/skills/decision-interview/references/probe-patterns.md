# Probe Patterns

The seven probe families are selected from the universal map in `SKILL.md`. Use this reference for **HOW+SHOW** when the selected family has a realistic near-miss, recommendation maturity is uncertain, or tacit expert judgment needs deeper elicitation.

## Contents

- Probe selection details
- Recommendation forms
- Contrastive examples
- Tacit expert judgment

## Probe selection details

| Probe | Question should expose | Do not |
|---|---|---|
| Frame | governing objective, non-goal, decision unit | recommend before frame is coherent |
| Alternative | credible third option / authoritative constraint excluding it | accept user-supplied A/B as exhaustive |
| Value / trade-off | differentiating preference, soft threshold, risk tolerance | invent weights or trade a mandatory constraint as a preference |
| Assumption / disconfirmation | evidence/counter-condition that would make the choice wrong | ask generic "what could go wrong?" checklist questions |
| Tacit judgment | cue, expectation, anomaly, goal, case distinction | force numeric scoring when expertise is recognition-based |
| Authority / risk | final decision authority, protected risk boundary, or bounded input role | treat stakeholder/input contribution as final approval |
| Commitment / closure | adopt, defer, or explicitly accept remaining assumption | use closure to hide unresolved frame/evidence/authority |

## Recommendation forms

### NO_RECOMMENDATION

Use when a deciding link is too weak.

Good:
> I do not have enough basis to prefer A or B yet; the deciding criterion is still missing. **Which matters more here: preserving auditability or minimizing migration time?**

Bad:
> I recommend A because it seems safer. Which do you prefer?

The bad version anchors the owner using an unstated criterion.

### CONDITIONAL_RECOMMENDATION

Use when one option currently leads but a named flip condition remains.

Good when the flip condition is evidence-answerable:
> A is currently stronger because it preserves rollback, **unless** the provider cannot support dual-write safely. That capability is an evidence frontier, so I should verify it from source/Research/Prototype before asking you to commit. If that verification has material cost or delay, the owner question is whether to authorize that evidence work — not whether the provider supports the feature.

Do not hide the flip condition, present the recommendation as final, or ask a human to guess a factual capability answer.

### RECOMMEND

Use when decision-ready.

Good shape:
> Recommend A because it best satisfies the stated latency ceiling and rollback requirement. B is simpler operationally, but loses bounded rollback. This flips if the latency ceiling is relaxed enough that B's simpler failure model dominates.

Then ask at most one owner question if explicit adoption is still required.

## Contrastive examples

### 1. False dichotomy

Weak:
> Should we use Kafka or REST?

Better when no-change is plausible:
> Is keeping the current integration a valid option for this release, or is there an authoritative constraint that rules it out?

Why: repair the option frame before ranking A/B.

### 2. Hard constraint versus preference

Weak:
> You prefer provider Y, but regional compliance prefers X. Which matters more?

Better:
> The regional rule is an authoritative hard constraint, so Y is infeasible unless that rule changes. Among the compliant options, what operating preference should distinguish the choice?

Why: mandatory constraints eliminate; preferences rank the remaining feasible alternatives.

### 3. Missing value

Weak:
> I recommend the safer migration. Agree?

Better:
> What is the maximum temporary operational overhead you are willing to accept to preserve rollback during migration?

Why: the decision turns on owner trade-off, not generic safety preference.

### 4. Load-bearing assumption

Weak:
> Have we considered scale, security, rollback, and observability?

Better:
> What would have to be false about current traffic burst behavior for this queuing decision to become wrong?

Why: challenge the actual premise rather than exhaust a checklist.

### 5. Decision authority versus bounded input

Weak to a Security SME who cannot accept release risk:
> Are you okay accepting this release risk?

Better:
> Which security constraint or assessment result should the release owner treat as non-negotiable input here?

Why: collect authoritative bounded input without turning the SME into the final decision maker.

### 6. Wrong final authority

Weak:
> Are you okay accepting possible data loss?

Better:
> Is accepting this data-loss risk within your authority, or should this remain unresolved for the data owner?

Why: separate conversational preference from protected decision authority.

### 7. Zero-question completion

Weak:
> Everything looks resolved. One more question: what is your rollback plan?

Better:
> No material human-owned or bounded-input frontier remains for the caller's current decision or continuation. Rollback mechanics are already source-defined and belong to execution/release verification, so I would close the interview here.

Why: invocation does not justify ceremony.

## Tacit expert judgment

When an expert says "I just know B is safer," do not dismiss the judgment or force fake math. Elicit recognition cues:

- What signal makes this case different from similar cases where you choose A?
- What would you expect to observe if B were actually the wrong choice?
- Which anomaly would make you abandon B?
- What goal are you protecting that is not captured by the current criteria?

Convert the answer into explicit evidence/value/assumption semantics only when that preserves real meaning; do not fabricate a scoring model.
