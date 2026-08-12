# Postmortem Analysis Contract

Use this reference when the postmortem must reason about causal structure, historical decisions, improvement recommendations, or recurrence beyond a simple factual incident summary. The postmortem remains a learning artifact: it consumes evidence and technical diagnosis but does not rewrite incident history, self-approve causal certainty, assign canonical backlog priority, or implement the recommended work.

## Contents

1. Analysis boundary
2. Causal learning model
3. Evidence, confidence, and counter-evidence
4. Decision-context reconstruction
5. Recommendation traceability
6. Recurrence generalization
7. Ownership and handoff
8. Anti-patterns

## 1. Analysis boundary

Keep three truths separate:

- **Incident history** — timestamped observations, actions, decisions, authorities, communications, and observed outcomes from the incident record. Postmortem may annotate conflicts but must not rewrite the historical record into a cleaner story.
- **Technical diagnosis** — reproduction, hypotheses, instrumentation, mechanism, and root-cause evidence owned by `/diagnosing-bugs` or the project's technical diagnosis owner.
- **Postmortem learning** — how evidence, conditions, controls, decisions, and system design combined to create impact; what improvement outcomes should be considered next.

A later diagnosis can refine causal interpretation without changing what responders actually observed or knew at the time.

## 2. Causal learning model

Do not force a single root cause. Model the incident using the smallest evidence-supported set of roles needed to explain both initiation and impact:

- **Trigger / initiating event** — event or change that started the failure sequence. A trigger is not automatically the whole cause.
- **Enabling / contributing conditions** — pre-existing states, assumptions, dependencies, capacity limits, coupling, configuration, or process conditions that made impact possible or larger.
- **Failed / absent controls** — guardrails, validation, isolation, quotas, tests, permissions, rollback protections, observability, or recovery controls that should have prevented, contained, or exposed the failure but did not.
- **Detection contributors** — why the issue was detected when/how it was; include blind spots, misleading signals, alert quality, or manual discovery when supported.
- **Response/recovery contributors** — conditions that accelerated or delayed containment, mitigation, diagnosis, recovery, or handoff.
- **Causal claim(s)** — supported mechanism statements explaining how the above produced the observed impact. Several claims may be jointly necessary.

Distinguish correlation from mechanism. An event occurring immediately before impact is evidence for a trigger hypothesis, not proof that all other conditions were irrelevant.

Avoid a mandatory linear `why -> why -> why` chain when the system has interacting conditions. “5 Whys” may be a questioning technique, but it is not evidence and must not be forced until one human mistake appears.

## 3. Evidence, confidence, and counter-evidence

For each material causal claim, preserve:

```text
claim
-> status: UNKNOWN | HYPOTHESIS | SUPPORTED | VERIFIED
-> supporting evidence
-> counter-evidence / conflicting evidence
-> unresolved assumptions / missing observations
-> evidence that would strengthen, weaken, or falsify the claim
```

Do not promote confidence because the narrative is coherent. Actively inspect counter-evidence when the leading explanation would drive costly remediation; this is a direct guard against confirmation bias. If evidence supports several plausible mechanisms, preserve them rather than collapsing ambiguity.

A `VERIFIED` technical root cause should point to diagnosis evidence capable of reproducing or otherwise demonstrating the mechanism at the required scope. Postmortem wording cannot manufacture verification that the diagnosis owner did not establish.

## 4. Decision-context reconstruction

Blameless analysis evaluates system and decision conditions without pretending every historical decision was correct.

For consequential response decisions, reconstruct:

- information available at the time;
- signals that were missing, delayed, noisy, or contradictory;
- declared objective and constraints;
- known authority/policy boundaries;
- alternatives realistically available then;
- expected outcome or mental model when inspectable;
- what later evidence changed the interpretation.

Use this to control hindsight bias: do not judge a responder using evidence that did not yet exist. Blamelessness does not erase a demonstrated control/process failure; state the observable gap and system condition without personal blame.

Do not invent motives or mental state. If why a decision was made is unknown, say so.

## 5. Recommendation traceability

A recommendation must be traceable to observed learning rather than merely sounding prudent. Record:

```text
recommendation
-> linked finding / causal condition / unresolved risk
-> intended class when useful: PREVENT | DETECT | MITIGATE | RECOVER | LEARN
-> recommended outcome
-> suggested owner role
-> evidence target
-> verification / falsifier / closure condition
-> existing canonical work item when one already represents it
-> planning handoff when executable work must be created/reconciled
```

Classify the effect truthfully. A faster alert is usually `DETECT`, not proof of `PREVENT`. A rollback drill may improve `RECOVER` even if the initiating failure remains possible.

Do not force every recommendation class. The action set should cover the important supported failure mechanisms and response gaps, not satisfy a category quota.

Reject vague vigilance-only actions such as “be more careful,” “remember to check,” or “monitor closely” unless the postmortem can state a concrete changed control, decision aid, verification behavior, or learning objective and how its effect will be observed.

Postmortem may record urgency/risk rationale but does not assign canonical priority. If an existing work item already covers the outcome, link it instead of creating duplicate tracker truth.

## 6. Recurrence generalization

Do not search “similar services” only by name or technology. State the generalized failure mechanism or unsafe assumption first, then ask where else that mechanism could exist.

For recurrence review, preserve:

- generalized failure mechanism / unsafe assumption;
- scope conditions under which it applies;
- related services/flows/components selected because those conditions may exist there;
- evidence/probe needed to confirm or reject exposure;
- known scope limitations.

Example semantic shape:

```text
unsafe assumption: one operation can affect resources across isolation boundaries
-> candidate surfaces: other workflows using the same bulk-operation primitive
-> check: bounded query/config inspection proving whether isolation guard exists
-> outcome: exposed | not exposed | unknown
```

Do not turn a postmortem into an unbounded architecture audit. Hand a reusable cross-system gap to the correct Architecture/Engineering/Product owner when broader work is warranted.

## 7. Ownership and handoff

Postmortem owns the learning artifact and its recommendation set. It does not own:

- technical reproduction/root-cause verification -> `/diagnosing-bugs`;
- canonical Product/backlog priority -> Product/project planning owner;
- executable work graph/tracker reconciliation -> `/to-tickets` or project-selected owner;
- implementation/design changes -> Engineering/Design/Architecture owners;
- incident history rewrite -> incident record owner;
- production mutation or external communication -> side-effect owner/policy.

Before handoff, each recommendation should be either linked to existing canonical work or carry enough finding/outcome/evidence context for the planning owner to create/reconcile work without rereading the entire postmortem.

## 8. Anti-patterns

Reject these patterns:

- forced single root cause for a multi-condition failure;
- forced **5 Whys** chain treated as proof;
- “human error” as closure without identifying system/decision conditions;
- hindsight blame using information unavailable at decision time;
- rewriting or smoothing the incident timeline to fit the causal narrative;
- causal confidence without supporting evidence or with hidden counter-evidence;
- recommendations unlinked to a finding/risk;
- “be more careful” / “pay more attention” as the only corrective action;
- mislabeling DETECT/MITIGATE/RECOVER work as PREVENT;
- action with no verifiable outcome/evidence target;
- assigning canonical backlog priority from the postmortem;
- creating duplicate tracker items instead of linking existing canonical work;
- postmortem directly implementing code/config/provider changes;
- broad recurrence search with no stated failure mechanism or unsafe assumption.
