# Incident Learning Analysis Contract

Use this reference when stabilized or historical incident evidence requires causal structure, historical decision reconstruction, corrective learning, or recurrence reasoning beyond a simple factual summary. The incident-learning artifact consumes evidence and technical diagnosis but does not rewrite incident history, self-approve causal certainty, assign canonical backlog priority, or implement the recommended work.

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

- **Incident history** — timestamped observations, actions, decisions, authorities, communications, and observed outcomes from the incident record. Incident learning may annotate conflicts but must not rewrite the historical record into a cleaner story.
- **Technical diagnosis** — evidence mode (`REPRODUCTION | OBSERVATION | FORENSIC | INSUFFICIENT`), symptom/mechanism evidence, hypotheses/probes, provenance and time-state alignment, confidence limits, and root-cause status owned by the project's technical-diagnosis capability.
- **Incident learning** — how evidence, conditions, controls, decisions, and system design combined to create impact; what improvement outcomes should be considered next.

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
-> diagnosis evidence reference + mode: REPRODUCTION | OBSERVATION | FORENSIC | INSUFFICIENT
-> evidence provenance + time/state alignment + demonstrated scope
-> supporting evidence
-> counter-evidence / conflicting evidence
-> unresolved assumptions / missing observations
-> confidence boundary inherited from the diagnosis evidence
-> evidence that would strengthen, weaken, or falsify the claim
```

Do not promote confidence because the narrative is coherent. Actively inspect counter-evidence when the leading explanation would drive costly remediation; this is a direct guard against confirmation bias. If evidence supports several plausible mechanisms, preserve them rather than collapsing ambiguity.

A `VERIFIED` technical root cause must point to diagnosis evidence that demonstrates the mechanism at the required scope through the selected evidence mode. A safe representative reproduction is strong evidence when available, but it is not mandatory: current observation can discriminate a live mechanism, and a one-shot forensic artifact can establish a bounded mechanism when provenance and state alignment are strong enough. `INSUFFICIENT` means the available evidence cannot discriminate the material causal claims; a coherent narrative, recent change, or responder consensus cannot upgrade it. Learning narrative cannot manufacture verification or exceed the confidence that the diagnosis owner established.

### Evidence-mode contrasts

- **REPRODUCTION:** a safe representative test repeatedly produces the same payment timeout and a targeted probe distinguishes the failing dependency path. The learning analysis may consume the diagnosis owner's supported/verified mechanism without restating the debugging procedure.
- **OBSERVATION:** replaying a checkout request could duplicate an external charge, but timestamped traces from affected and healthy requests show a mechanism-specific branch difference across multiple live occurrences. Do not downgrade the evidence merely because replay is unsafe; preserve the observation window, scope, discriminator, and diagnosis confidence.
- **FORENSIC:** a one-shot worker crash cannot be replayed, but a core dump bound to the exact binary digest and incident timestamp demonstrates the failing mechanism. Preserve the one-shot scope and bounded confidence rather than inventing repeatability.
- **INSUFFICIENT:** logs prove the user-visible symptom but cannot distinguish two plausible mechanisms. Keep the causal claim `UNKNOWN`/`HYPOTHESIS`, name the missing discriminator, and recommend the smallest further investigation instead of selecting the more convenient story.

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

Reject vague vigilance-only actions such as “be more careful,” “remember to check,” or “monitor closely” unless the learning analysis can state a concrete changed control, decision aid, verification behavior, or learning objective and how its effect will be observed.

Incident learning may record urgency/risk rationale but does not assign canonical priority. If an existing work item already covers the outcome, link it instead of creating duplicate tracker truth.

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

Do not turn incident learning into an unbounded architecture audit. Hand a reusable cross-system gap to the correct Architecture/Engineering/Product owner when broader work is warranted.

## 7. Ownership and handoff

Incident learning owns the learning artifact and its recommendation set. It does not own:

- technical evidence-mode selection, causal probing, and root-cause verification -> project technical-diagnosis capability;
- canonical Product/backlog priority -> Product/project planning owner;
- executable work graph/tracker reconciliation -> project-selected canonical work-graph capability;
- implementation/design changes -> Engineering/Design/Architecture owners;
- incident history rewrite -> incident record owner;
- production mutation or external communication -> side-effect owner/policy.

Before handoff, each recommendation should be either linked to existing canonical work or carry enough finding/outcome/evidence context for the planning owner to create/reconcile work without rereading the entire learning artifact.

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
- assigning canonical backlog priority from incident learning;
- creating duplicate tracker items instead of linking existing canonical work;
- incident learning directly implementing code/config/provider changes;
- broad recurrence search with no stated failure mechanism or unsafe assumption.

## Contrastive SHOW — hindsight-resistant learning

An operator rolled back because the available dashboard attributed errors to the new candidate; rollback worsened impact. Preserve the operator's contemporaneous evidence and decision context. If later diagnosis shows the dashboard attribution was wrong, improve attribution/control design and the decision aid. Do not rewrite the event as "operator chose incorrectly" merely because later evidence was better.
