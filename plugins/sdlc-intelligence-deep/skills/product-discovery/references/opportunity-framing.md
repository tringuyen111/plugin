# Opportunity Framing

Use this module only when the **identity or boundary of the opportunity** is materially uncertain. Return a bounded solution-free frame, strongest competing frames, and the exact evidence question that would discriminate them. Do not continue into evidence sufficiency, learning-test design, Product scope, or requirement semantics.

## Signal disposition

A signal deserves interpretation before it becomes an opportunity.

| Signal shape | Discovery disposition |
|---|---|
| Feature/solution request | preserve the solution as a signal; recover the customer progress gap first |
| Repeated workaround/manual step | determine whether it creates material friction/risk/value loss or is an acceptable preferred practice |
| Abrupt metric regression after a release/change | establish current-state defect/regression truth before inventing a desirability opportunity |
| Existing capability present but hard to find/understand/use | frame the remaining discoverability/experience gap when supported; do not infer a duplicate capability |
| Competitor/technology launch | treat as market/solution signal creating hypotheses, not customer-need evidence |
| Regulatory/policy mandate | preserve authoritative constraint independently of desirability; study customer consequences only if a Product opportunity remains |
| Sales/stakeholder escalation from one segment | preserve segment/context; do not generalize beyond the evidence boundary |
| Direct repeated customer problem evidence | frame proportionally; do not manufacture extra discovery ceremony |

**Failure:** every signal becomes a new desirability opportunity.  
**Correction:** re-enter at signal disposition and establish the current-state/authority/segment truth that can explain it first.

## Customer-progress frame

Make the unit concrete enough to falsify:

```text
ACTOR / SEGMENT    who experiences this?
CONTEXT            when / under what condition?
DESIRED PROGRESS   what are they trying to accomplish, avoid, understand, or experience?
CURRENT REALITY    what happens today; existing capability, workaround, or alternative?
PROGRESS GAP       where does current reality diverge from desired progress?
CONSEQUENCE        what friction, delay, error, risk, abandonment, cost, or lost value follows?
EVIDENCE BOUNDARY  which population/context/time state is actually supported?
```

A singular causal root is not required when the bounded need/pain/desire is already supported.

### Worked contrast

Signal:

```text
Thousands of finance users export CSV every month.
```

Do not infer `Opportunity: build better CSV export.` Competing frames may be:

- export is already the intended workflow;
- users lack a trusted consolidated reporting view;
- downstream analysis legitimately belongs in spreadsheet/BI tools;
- portable records are required for audit/archive.

The opportunity is the bounded progress gap that survives evidence, not the surface behavior with a new label.

## Competing frames

When one signal supports several plausible interpretations, state the strongest alternatives before collecting more evidence.

For each material frame ask:

```text
What customer progress would this explain?
What evidence already supports it?
What evidence contradicts/narrows it?
Which observation/source would separate it from the strongest alternative?
What recommendation would change if that evidence appeared?
```

**Failure:** broad research gathers more stories but cannot distinguish frames.  
**Correction:** identify the competing frames and the evidence capable of changing their relative plausibility or boundary.

## Opportunity quality test

A useful opportunity remains answerable without proposing a solution.

Reopen the frame when it is:

- a solution with the noun changed (`need AI assistant`, `need CSV export`);
- too broad to discriminate (`reporting is bad`);
- implementation-shaped (`need a button beside column X`);
- generalized beyond supported segment/context;
- a metric symptom with no customer/problem mechanism;
- already explained by a defect, mandate, or existing capability with no material remaining gap;
- a workaround with no material friction/risk/value consequence.

## Structure only when it changes a decision

Use parent/child/sibling/segment-variant structure only when it changes which opportunity is discussed, keeps materially different segments separate, affects comparison, or changes the next learning question. Group by customer-experienced problem, not implementation/screen/team/package/technology.

Do not require an Opportunity Solution Tree or hierarchy artifact for a single bounded opportunity.

## Return contract

Return only:

```text
bounded opportunity frame
strongest material alternative frame(s)
evidence/segment boundary
exact discriminating evidence question
re-entry point if the current frame fails
```

Stop before capability delta, scope/priority, business rules, behavior states, AC, NFRs, visual design, or implementation.
