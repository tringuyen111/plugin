---
type: brainstorm
feature: {{feature}}
idea_slug: {{idea_slug}}
status: working              # working | finalized
quality: partial             # pass | partial
mode: {{mode}}               # deep | shallow
lang: {{lang}}
owner: {{owner}}
created: {{date}}
updated: {{date}}
source_refs: {{source_refs}}
links: {{links}}
tags: {{tags}}               # deep: [brainstorm, {{feature}}]; shallow: [brainstorm, {{feature}}, shallow]
changelog: []
---

# {{title}}

> Feature: {{feature}} | Idea: {{idea_slug}}
> This is the single living brainstorm artifact for this idea. `working` and `finalized` are lifecycle states of the same artifact, not separate files.

<!--
RUNTIME AUTHORING NOTE

This template is written in English because it is agent-facing runtime guidance.
Render headings, explanatory prose, and table labels in the selected artifact language.
Do not mechanically preserve English labels when the artifact language is different.
Preserve exact quoted strings, identifiers, proper nouns, and established technical terms when translation would reduce precision.

AUTHORING DISCIPLINE

1. Keep exactly 12 numbered semantic sections.
2. Do not add new facts to Idea Seed.
3. Brainstorm-generated rules/values/wording/flows remain PROPOSED until accepted.
4. DECIDED means accepted within current Brainstorm scope; it does not automatically become downstream canonical truth. Use stable `DEC-n` only for material accepted decisions that need later reference.
5. Missing/conflicting content stays TBD/OQ/UNRESOLVED.
6. Do not label every line OBSERVED/PROPOSED/DECIDED/UNRESOLVED; label where authority/provenance could be confused.
7. Render only representations justified by the idea's semantic complexity. Omit empty decorative tables/ASCII placeholders.
8. After each material user answer, update the relevant current sections in this artifact. Do not append a raw interview transcript.
9. Keep decision-point row IDs (`D1`, `D2`, ...) distinct from accepted-decision references (`DEC-1`, `DEC-2`, ...). Never renumber or reuse `DEC-n`.
10. When a new material decision supersedes old current behavior, assign a new `DEC-n`, replace the current rule, and preserve `DEC-new supersedes DEC-old` plus any OQ linkage in changelog/traceability.
11. Finalization changes frontmatter `status`, not filename/path.
-->

## Section map

1. Idea Seed
2. Context
3. User Groups
4. Capability Breakdown
5. Core Flows
6. System Behavior Deep Dive
7. Validation, Limits & Wording
8. Assumptions
9. Risks
10. Success Criteria
11. Open Questions
12. Next Steps

> Localize the rendered section names to the selected artifact language while preserving the same semantic section identity/order.

## 1. Idea Seed

{{seed}}

*Faithful raw input or a faithful summary of a long source. Keep source references. Do not mix Brainstorm proposals into the seed.*

## 2. Context

{{context}}

Capture problem context, why now, requester/deadline/signals, and related process/capability context. If Brainstorm infers an interpretation that matters, phrase it as an assumption/proposal.

## 3. User Groups

| User group | Pain/problem | Primary need | Access/gating if material |
|---|---|---|---|
| {{user_type}} | {{pain}} | {{need}} | {{gating}} |

Do not invent roles because they are common elsewhere. Unsupported roles remain `PROPOSED` or OQ.

## 4. Capability Breakdown

### P0 — Must have (preliminary)

{{p0_capabilities}}

### P1 — Should have (preliminary)

{{p1_capabilities}}

### P2 — Nice to have (preliminary)

{{p2_capabilities}}

> P0/P1/P2 here are brainstorm-level prioritization hypotheses. Canonical product priority belongs to the PRD/product owner unless an authoritative current source already supplies it.

## 5. Core Flows

Each material flow should use numbered `user action → system behavior → user-visible result` steps. Add ASCII only when complexity warrants it.

### 5.1 {{flow_1_name}}

1. {{step_1}}
2. {{step_2}}
3. {{step_3}}

```text
{{ascii_flow_1_if_triggered}}
```

### 5.2 {{flow_2_name_if_material}}

1. {{step_1}}
2. {{step_2}}
3. {{step_3}}

```text
{{ascii_flow_2_if_triggered}}
```

List all material distinct flows. Do not collapse signup/login, first/retry, upgrade/downgrade, or other behaviorally distinct flows into one paragraph merely to shorten the artifact.

## 6. System Behavior Deep Dive

Render only subsections justified by actual complexity. Keep BA-level depth: business-observable system behavior, rules, states, external-service purpose, interruptions, and concurrency — not implementation design.

### 6.1 Decision Points

| ID | Flow | Condition | YES / true path | NO / false path | State/result if material |
|---|---|---|---|---|---|
| D1 | {{flow_name}} | {{condition}} | {{yes_action}} | {{no_action}} | {{state_note}} |

Every material branch gets a row. A rule invented by Brainstorm remains explicitly `PROPOSED` or unresolved. `D1`/`D2` identify branch rows only; when the user accepts a material branch rule and it needs stable later reference, attach a separate `DEC-n` to the accepted rule in the relevant section.

### 6.2 Scenario Matrix — only for material role/input-state combinations

| Starting state / role | Target state/object | Rule | Action | Result |
|---|---|---|---|---|
| {{scenario_row}} | | | | |

Unknown combinations remain `UNRESOLVED`; do not fill them with plausible guesses.

### 6.3 State Transitions — only for governed lifecycle

```text
{{entity}}: {{state_a}} → {{state_b}} → {{state_c}}
                      ↘ {{state_d_if_material}}
```

| Entity | From | To | Trigger | Reversible? | User-visible result if material |
|---|---|---|---|---|---|
| {{entity}} | {{from}} | {{to}} | {{trigger}} | {{reversible}} | {{visible_result}} |

### 6.4 Interrupted Transactions — only for external/async/pending behavior

| Situation | State that remains | Resume / retry / conflict rule | Cleanup / TTL | User-visible result |
|---|---|---|---|---|
| Browser/app closes mid-flow | {{state}} | {{resume}} | {{cleanup}} | {{visible}} |
| External service fails/times out | {{state}} | {{resume}} | {{cleanup}} | {{visible}} |
| Link/token expires | {{state}} | {{resume}} | {{cleanup}} | {{visible}} |
| Two devices/actors act concurrently | {{state}} | {{conflict_rule}} | {{cleanup}} | {{visible}} |
| New attempt while old attempt is pending | {{state}} | {{resume_or_reject}} | {{cleanup}} | {{visible}} |

Do not choose TTL/retry/conflict rules without authority. Use `PROPOSED` or OQ when unknown.

### 6.5 Other Edge Cases

{{edge_cases}}

Examples when material: empty state, lost connectivity, validation failure, incompatible legacy data, duplicate submission, permission change mid-flow, late callback, repeated notification.

## 7. Validation, Limits & Wording

### 7.1 Validation Rules

| Field / input | Required? | Rule / format | Min/Max if material | Failure behavior |
|---|---|---|---|---|
| {{field}} | {{required}} | {{validation_rule}} | {{min_max}} | {{behavior}} |

### 7.2 Limits & Quotas — exact, proposed, or explicitly TBD

| Parameter | Value | Window/duration | Behavior when exceeded | Epistemic note if needed |
|---|---|---|---|---|
| {{limit_name}} | {{exact_value_or_tbd}} | {{window}} | {{action}} | {{state_note}} |

Good forms:

```text
5 attempts / 10 minutes → lock for 30 minutes
PROPOSED: 5 attempts / 10 minutes
TBD (OQ-3)
```

Bad form: `reasonable rate limit`.

### 7.3 Wording Samples

Keep exact strings exact. The strings may intentionally use a different language from the artifact's explanatory prose when they target a different end-user audience.

#### Error

| Situation | Exact string | Epistemic note if needed |
|---|---|---|
| {{error_case}} | "{{exact_string_or_tbd}}" | {{state_note}} |

#### Success

| Situation | Exact string | Epistemic note if needed |
|---|---|---|
| {{success_case}} | "{{exact_string_or_tbd}}" | {{state_note}} |

#### Informational / Neutral

| Situation | Exact string | Epistemic note if needed |
|---|---|---|
| {{info_case}} | "{{exact_string_or_tbd}}" | {{state_note}} |

A Brainstorm-authored string remains `PROPOSED` until the user/authorized owner accepts it.

## 8. Assumptions

{{assumptions}}

Keep assumptions distinct from facts. A material assumption that can change flow/scope/risk should have a validation path or OQ.

Examples:

- `ASSUMPTION: email is a unique identity — confirm with product/identity owner.`
- `ASSUMPTION: users can access their email for 24 hours after signup.`

## 9. Risks

| Risk | Likelihood | Business impact | Prevention / mitigation |
|---|---|---|---|
| {{risk}} | frequent / occasional / rare | {{business_impact}} | {{mitigation}} |

Common useful categories:

- **Adoption** — users do not understand the flow → conversion/activation drops.
- **Vendor** — provider policy/fees/availability changes → cost or availability impact.
- **Compliance** — missing consent/evidence/process → audit or launch blocked.
- **Process** — support/operations not ready → complaints or handling time increases.
- **Timeline** — external review/approval dependency → launch delay.
- **Data** — legacy data lacks required information/rules → migration or user-impact risk.

A technical symptom such as `API slow` is not enough; connect it to business consequence before recording it as a risk.

## 10. Success Criteria (preliminary)

{{success_criteria}}

Prefer measurable hypotheses where meaningful: conversion >= X%, completion time < Y, support tickets reduced by Z%, etc. Unapproved numbers remain proposed/TBD. Downstream owners may refine canonical success metrics.

## 11. Open Questions

- [ ] OQ-1: {{open_question_1}}
- [ ] OQ-2: {{open_question_2}}
- [ ] OQ-3: {{open_question_3}}

Keep OQ IDs stable for the artifact lifecycle. Do not renumber remaining OQs after one is resolved when that would break traceability. If resolving an OQ creates a material accepted decision, record the link such as `OQ-3 resolved by DEC-7`.

## 12. Next Steps

### Suggested handoffs

- `/urd {{feature}}` — canonicalize user needs/journey if the project uses URD.
- `/brd {{feature}}` — canonicalize business case/objectives/risks if the project uses BRD.
- `/prd {{feature}}` — canonicalize product scope/priority/requirements.
- `/srs {{feature}}` — design technical behavior after relevant upstream decisions are owned.

### Downstream impact handoff — only when Brainstorm changes may make another artifact stale

| Owner / Artifact | Detected impact | Why review is needed | Requested handoff |
|---|---|---|---|
| {{downstream_owner}} | {{impact}} | {{reason}} | {{requested_review}} |

Brainstorm reports impact and requests review. It does not edit downstream canonical artifacts.
