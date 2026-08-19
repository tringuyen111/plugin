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
tags: {{tags}}
changelog: []
---

# {{title}}

> Feature: {{feature}} | Idea: {{idea_slug}}
> This is one living pre-canonical brainstorm artifact. `working` and `finalized` are states of the same artifact, not separate files.

<!--
RUNTIME AUTHORING NOTE

This file is a semantic fallback, not a mandatory user/project presentation schema.

Structure precedence:
1. explicit user-requested structure;
2. existing compatible project/idea structure;
3. structure inferred from the material semantic shape;
4. this fallback.

When another structure is selected, map the material meanings below into it instead of copying these headings mechanically.
When this fallback is used, render only conditional sections that carry material meaning. Stable slot numbers may have gaps when an optional section is omitted.
Render headings/prose/table labels in the selected artifact language. Preserve exact quoted strings, identifiers, proper nouns, and established technical terms when translation would reduce precision.

AUTHORING DISCIPLINE

1. Idea Seed remains faithful to source; do not mix Brainstorm proposals into it.
2. Brainstorm-generated rules/values/wording/flows stay PROPOSED until accepted.
3. DECIDED means accepted within Brainstorm scope only; it is not downstream canonical truth.
4. Missing/conflicting material content stays TBD/OQ/UNRESOLVED.
5. Label epistemic state only where authority/provenance could be confused.
6. Render only representations justified by current semantics; omit empty decorative sections/tables/ASCII.
7. After each material answer, update every affected current section; do not append a raw interview transcript.
8. Keep decision-row IDs (`D1`, `D2`, ...) distinct from stable accepted-decision references (`DEC-1`, `DEC-2`, ...).
9. Finalization changes artifact state, not artifact identity/path.
10. Priority tiers, success signals, exact wording, and deep behavior structures are optional tools: use them when requested, source/project-backed, or semantically useful — never merely to make the artifact look complete.
-->

## Semantic fallback map

| Slot | Meaning | Default |
|---|---|---|
| 1 | Idea Seed | core |
| 2 | Context | core |
| 3 | User Groups | conditional |
| 4 | Capability Breakdown | conditional |
| 5 | Core Flows | conditional |
| 6 | System Behavior Deep Dive | conditional |
| 7 | Validation, Limits & Wording | conditional |
| 8 | Assumptions | conditional |
| 9 | Risks | conditional |
| 10 | Success Hypotheses / Signals | conditional |
| 11 | Open Questions | core when unresolved material questions exist |
| 12 | Next Steps / Handoff | core at meaningful checkpoint/finalization |

## 1. Idea Seed

{{seed}}

*Faithful raw input or a faithful summary of a long source. Keep source references. Do not mix Brainstorm proposals into the seed.*

## 2. Context

{{context}}

Capture problem context, why now, requester/deadline/signals, and related process/capability context. If Brainstorm infers an interpretation that matters, phrase it as an assumption/proposal.

## 3. User Groups — when actor/access differences are material

| User group | Pain/problem | Primary need | Access/gating if material |
|---|---|---|---|
| {{user_type}} | {{pain}} | {{need}} | {{gating}} |

Do not invent roles because they are common elsewhere. Unsupported roles remain `PROPOSED` or OQ.

## 4. Capability Breakdown — when decomposing the idea helps

### Candidate capabilities

{{capability_breakdown}}

Use an unranked breakdown by default unless ordering/tiers improve the current brainstorm.

### Optional priority hypothesis — only when requested, source/project-backed, or semantically useful

```text
P0 / must-have hypothesis: {{p0_if_used}}
P1 / should-have hypothesis: {{p1_if_used}}
P2 / nice-to-have hypothesis: {{p2_if_used}}
```

If Brainstorm proposes tiers, label them as brainstorm-level hypotheses. Canonical Product priority belongs to the Product owner/workflow unless an authoritative current source already supplies it.

## 5. Core Flows — when user/system sequence is material

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

## 6. System Behavior Deep Dive — only for material complexity

Render only subsections justified by actual complexity. Keep BA-level depth: business-observable system behavior, rules, states, external-service purpose, interruptions, and concurrency — not implementation design.

### 6.1 Decision Points — when material branches exist

| ID | Flow | Condition | YES / true path | NO / false path | State/result if material |
|---|---|---|---|---|---|
| D1 | {{flow_name}} | {{condition}} | {{yes_action}} | {{no_action}} | {{state_note}} |

Every material branch gets a row. A rule invented by Brainstorm remains explicitly `PROPOSED` or unresolved. `D1`/`D2` identify branch rows only; when the user accepts a material branch rule and it needs stable later reference, attach a separate `DEC-n` to the accepted rule in the relevant section.

### 6.2 Scenario Matrix — when role/input-state combinations differ

| Starting state / role | Target state/object | Rule | Action | Result |
|---|---|---|---|---|
| {{scenario_row}} | | | | |

Unknown combinations remain `UNRESOLVED`; do not fill them with plausible guesses.

### 6.3 State Transitions — when governed lifecycle exists

```text
{{entity}}: {{state_a}} → {{state_b}} → {{state_c}}
                      ↘ {{state_d_if_material}}
```

| Entity | From | To | Trigger | Reversible? | User-visible result if material |
|---|---|---|---|---|---|
| {{entity}} | {{from}} | {{to}} | {{trigger}} | {{reversible}} | {{visible_result}} |

### 6.4 Interrupted Transactions — when external/async/pending/repeated behavior is material

| Situation | State that remains | Resume / retry / conflict rule | Cleanup / TTL | User-visible result |
|---|---|---|---|---|
| Browser/app closes mid-flow | {{state}} | {{resume}} | {{cleanup}} | {{visible}} |
| External service fails/times out | {{state}} | {{resume}} | {{cleanup}} | {{visible}} |
| Link/token expires | {{state}} | {{resume}} | {{cleanup}} | {{visible}} |
| Two devices/actors act concurrently | {{state}} | {{conflict_rule}} | {{cleanup}} | {{visible}} |
| New attempt while old attempt is pending | {{state}} | {{resume_or_reject}} | {{cleanup}} | {{visible}} |

Do not choose TTL/retry/conflict rules without authority. Use `PROPOSED` or OQ when unknown.

### 6.5 Other Edge Cases — when material

{{edge_cases}}

Examples when material: empty state, lost connectivity, validation failure, incompatible legacy data, duplicate submission, permission change mid-flow, late callback, repeated notification.

## 7. Validation, Limits & Wording — only when these semantics matter

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

### 7.3 Wording Samples — only when exact copy is requested/material

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

## 8. Assumptions — when material assumptions affect meaning/risk

{{assumptions}}

Keep assumptions distinct from facts. A material assumption that can change flow/scope/risk should have a validation path or OQ.

Examples:

- `ASSUMPTION: email is a unique identity — confirm with product/identity owner.`
- `ASSUMPTION: users can access their email for 24 hours after signup.`

## 9. Risks — when risk analysis changes the brainstorm/handoff

| Risk | Likelihood | Business impact | Prevention / mitigation |
|---|---|---|---|
| {{risk}} | frequent / occasional / rare / TBD | {{business_impact}} | {{mitigation}} |

Common useful categories:

- **Adoption** — users do not understand the flow → conversion/activation drops.
- **Vendor** — provider policy/fees/availability changes → cost or availability impact.
- **Compliance** — missing consent/evidence/process → audit or launch blocked.
- **Process** — support/operations not ready → complaints or handling time increases.
- **Timeline** — external review/approval dependency → launch delay.
- **Data** — legacy data lacks required information/rules → migration or user-impact risk.

A technical symptom such as `API slow` is not enough; connect it to business consequence before recording it as a risk.

## 10. Success Hypotheses / Signals — only when requested or materially useful

{{success_hypotheses}}

These are pre-canonical hypotheses/signals, not mandatory Brainstorm completeness and not canonical Product metrics. Preserve unknown baselines/targets as unknown; do not invent numbers. Product owners may later define canonical outcome metrics.

## 11. Open Questions — when material questions remain

- [ ] OQ-1: {{open_question_1}}
- [ ] OQ-2: {{open_question_2}}
- [ ] OQ-3: {{open_question_3}}

Keep OQ IDs stable for the artifact lifecycle. Do not renumber remaining OQs after one is resolved when that would break traceability. If resolving an OQ creates a material accepted decision, record the link such as `OQ-3 resolved by DEC-7`.

## 12. Next Steps / Handoff

### Suggested handoffs

{{suggested_handoffs}}

Name only downstream owners/workflows supported by the current project/orchestrator context. Do not invent legacy commands merely to fill this section. Brainstorm recommends or requests review; it does not authorize downstream canonicalization.

### Downstream impact — only when current Brainstorm changes may stale another artifact

| Owner / Artifact | Detected impact | Why review is needed | Requested handoff |
|---|---|---|---|
| {{downstream_owner}} | {{impact}} | {{reason}} | {{requested_review}} |

Brainstorm reports impact and requests review. It does not edit downstream canonical artifacts.
