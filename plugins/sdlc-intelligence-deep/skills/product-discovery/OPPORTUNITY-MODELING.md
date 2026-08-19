# Product Opportunity Modeling

Use this reference when the incoming signal does not yet justify a stable problem/opportunity frame, when several plausible opportunity interpretations compete, or when opportunity granularity/segment boundaries could change the recommendation.

This reference owns **problem-space modeling** only. Evidence topology, sufficiency, assumption ownership, learning-test design, opportunity comparison, and solution-contamination proof remain in `DISCOVERY-EVIDENCE-DECISION-CONTRACT.md`.

## 1. Signal is not opportunity

Treat requests, complaints, observed behavior, workarounds, metric shifts, sales escalations, strategy, market events, and existing-product friction as **signals**. A signal is evidence that something deserves interpretation; it is not automatically the opportunity itself.

Use this decision frontier:

```text
SIGNAL
  -> signal disposition
  -> actor + concrete context
  -> desired customer progress
  -> current reality / workaround / alternative
  -> progress gap
  -> consequence
  -> competing opportunity frames
  -> discriminating evidence
  -> bounded opportunity
  -> optional opportunity structure
```

Stop Product Discovery at evidence-grounded problem/opportunity truth plus the next learning/advance recommendation. Do not convert the result into Product capability scope or requirement semantics.

## 2. Dispose the signal before framing an opportunity

Ask what kind of uncertainty the signal actually exposes. This is a local guardrail, not a global router.

| Signal shape | Discovery disposition |
|---|---|
| Feature/solution request | Preserve the proposed solution as a signal; recover the customer progress gap before calling it an opportunity. |
| Repeated workaround/manual step | Determine whether it represents material harmful friction/risk or an acceptable preferred practice. |
| Abrupt metric regression after a release/change | Current-state defect/regression is plausible; establish that truth before inventing a new opportunity. |
| Existing capability is present but users cannot find/understand/use it | Frame the remaining discoverability/experience gap when supported; do not infer a duplicate capability. |
| Competitor/technology launch | Treat as market/solution signal that creates hypotheses, not customer-need evidence. |
| Regulatory/policy mandate | Preserve authoritative constraint/requirement truth independently of desirability discovery; study user consequences only when a Product opportunity remains. |
| Sales/stakeholder escalation from one segment | Preserve segment/context; do not generalize beyond the evidence boundary. |
| Direct repeated customer problem evidence | Model the bounded opportunity proportionally; do not manufacture extra discovery ceremony. |

**Failure:** every signal becomes a new desirability opportunity.

**Correction:** re-enter at signal disposition and establish the current-state/authority/segment truth that can explain the signal first.

## 3. Build the customer-progress frame

For a material signal, make the problem-space unit concrete enough to falsify:

```text
ACTOR / SEGMENT
who is experiencing this?

CONTEXT
when / under what condition?

DESIRED PROGRESS
what are they trying to accomplish, avoid, understand, or experience?

CURRENT REALITY
what do they do now? existing capability, alternative, or workaround?

PROGRESS GAP
where does current reality fail the desired progress or expectation?

CONSEQUENCE
what friction, delay, error, risk, abandonment, cost, lost value, or unmet desire follows?
```

Do not require a singular causal root. Product Discovery often has enough evidence to establish a customer need/pain/desire while the deeper causal mechanism remains plural or uncertain.

### Worked contrast

Signal:

```text
Thousands of finance users export CSV every month.
```

Do not infer:

```text
Opportunity: build better CSV export.
```

Competing frames may include:

- export is already the intended workflow;
- users lack a trusted consolidated reporting view;
- downstream analysis legitimately belongs in spreadsheet/BI tools;
- portable records are required for audit/archive.

The opportunity is whichever bounded progress gap survives evidence, not the surface behavior with a new label.

## 4. Keep competing opportunity frames alive until evidence discriminates them

When one signal supports several plausible problem interpretations, state the alternatives explicitly before asking for more data.

For each material frame ask:

```text
What customer progress would this explain?
What evidence already supports it?
What evidence contradicts or narrows it?
Which observation/source would separate it from the strongest alternative?
What recommendation would change if that evidence appeared?
```

Use `DISCOVERY-EVIDENCE-DECISION-CONTRACT.md` for evidence dependency, selection, sufficiency, learning-test design, and decision rules.

**Failure:** ask broad discovery questions that collect more stories but cannot distinguish the competing frames.

**Correction:** name the strongest alternatives and select evidence that can change their relative plausibility or boundary.

## 5. Bound the opportunity truth

A useful opportunity remains answerable without proposing a solution.

Check:

```text
WHO / CONTEXT
Is the actor/segment/situation explicit?

PROGRESS
Is the customer progress or desired condition clear?

CURRENT REALITY
Is the existing behavior/workaround/alternative visible?

GAP
Is the divergence between current reality and desired progress explicit?

CONSEQUENCE
Is there evidence that the gap matters?

EVIDENCE BOUNDARY
Which population/context does the evidence actually support?

COMPETING FRAME
What plausible alternative explanation still matters?
```

Reopen the frame when it is:

- a solution with the noun changed (`need AI assistant`, `need CSV export`);
- too broad to discriminate (`reporting is bad`);
- too implementation-shaped (`need a button beside column X`);
- generalized beyond the supported segment/context;
- only a metric symptom with no customer/problem mechanism;
- actually explained by a current defect, mandate, or already-existing capability with no material remaining gap;
- a workaround with no material friction/risk/value consequence.

## 6. Use opportunity structure only when it changes a decision

When several opportunities interact, represent the smallest useful problem-space structure:

```text
PARENT opportunity
  |- CHILD opportunity A
  |- CHILD opportunity B
  `- CHILD opportunity C

SIBLINGS = distinct subsets under the same broader problem.
SEGMENT VARIANTS = similar wording but materially different actor/context/gap.
```

Group by how customers experience the need/problem, not shared implementation, screen, team, package, or technology.

Use structure only if it changes:

- which opportunity is actually being discussed;
- which segment should remain separate;
- comparison/prioritization;
- the next learning question.

Do not require an Opportunity Solution Tree or any hierarchy artifact when a single bounded opportunity is already sufficient.

## 7. Preserve adjacent-owner boundaries

```text
Brainstorm
  -> articulates raw/pre-canonical idea and unresolved hypothesis space

Product Discovery
  -> establishes evidence-grounded customer opportunity/problem-space truth

Product Definition
  -> decides justified Product commitment, capability delta, scope, priority, option/commercial implications

Define Behavior
  -> establishes exact requirement/behavior semantics and faithful representations
```

Examples of Product Discovery STOP conditions:

```text
Enterprise finance teams closing a month across multiple accounts
cannot reconcile adjustments without manually reconstructing a trusted view.
```

Do not continue into:

```text
Build consolidated reporting + scheduled delivery + Enterprise packaging.
```

And:

```text
Tenant admins need controlled recovery when the sole admin loses authentication access.
```

Do not continue into eligible actors, recovery states, proof rules, exception precedence, partial outcomes, AC, or NFRs.

## 8. Failure and re-entry

| Failure | Re-enter at |
|---|---|
| Feature request promoted directly to opportunity | signal disposition + customer progress |
| Usage/workaround treated as proof of value | progress gap + consequence + evidence boundary |
| One generic frame averages distinct segments | actor/context + segment variants |
| Metric symptom becomes opportunity without mechanism | current reality + competing frames |
| Competitor/executive solution becomes customer validation | signal disposition + evidence contract |
| Opportunity remains solution-shaped or too broad | opportunity quality test |
| New Product capability is being selected | stop and hand to Product Definition |
| Rules/states/AC/NFRs are being specified | stop and hand to Define Behavior / child owner |
| Hierarchy adds ceremony but no decision value | collapse back to the single bounded opportunity |

A failed opportunity frame invalidates downstream comparison and recommendation that depended on it. Re-enter at the earliest wrong problem-space assumption rather than collecting more evidence against a malformed opportunity.
