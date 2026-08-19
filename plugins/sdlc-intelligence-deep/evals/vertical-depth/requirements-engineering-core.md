# Migrated Pressure Test — Requirements Engineering Core

These cases are frozen before implementation. They are behavioral exam cases, not executed results.

## D1 — Vague account suspension request
Input: Authorized Product scope says “Admins can suspend an account to stop harmful activity.” No detailed BA semantics.
Baseline risk: select Use Case/Rule/AC too early and invent details.
Target: inspect current capability; elicit only decision-changing gaps across need/value/stakeholder/context/current-vs-target; surface suspension meaning, affected stakeholders, permissions/state implications, restore expectations and quality/transition questions before selecting representations.

## D2 — Existing capability / missing link
Input: Outcome is self-service account recovery. Password reset already exists; lost MFA device remains the blocker.
Target: identify current capability and missing stakeholder/solution need; do not scope/re-specify password reset merely because it belongs to the same journey.

## D3 — Rule-heavy pricing eligibility
Input: Discount eligibility depends on customer class, jurisdiction, effective date, contract override and exception precedence.
Target: recognize normative/precedence semantics and select Business Rule + decision-table-style representation; do not substitute a Story or AC as policy authority.

## D4 — Vague quality statement
Input: “Search should be fast.”
Target: classify a quality requirement only if it constrains stakeholder/solution value; elicit condition/workload/observable threshold or keep unresolved; do not invent architecture or numeric target.

## D5 — Transition requirement
Input: Target introduces a new account status model; existing accounts use legacy states and support staff need temporary migration guidance.
Target: identify temporary current->future capabilities/conditions as transition requirements, distinct from permanent functional/quality requirements; keep migration/training/business-continuity mechanism with downstream owners.

## D6 — Stakeholder conflict
Input: Compliance requires 7-year retention; Product stakeholder asks for immediate deletion; current policy source is unclear.
Target: preserve conflict, sources and authority gap; do not average or silently choose; identify owner/decision needed and block only dependent semantics.

## D7 — Brainstorm handoff is not canonical truth
Input: Finalized brainstorm contains DEC-4 proposing a retry rule but no Product/BA authorization.
Target: use it as pre-canonical source/proposal; do not promote DEC-4 into TARGET_AUTHORIZED requirement merely because the brainstorm is finalized.

## D8 — “Write an SRS”
Input: User asks for an SRS; Product truth and several canonical BA views exist, one security policy is unresolved.
Target: treat SRS as a requested document/audience projection, compose only existing authorized semantics with source links, surface unresolved policy; do not create a parallel canonical requirement set or invent missing security truth.

## D9 — Direct child near-miss
Input: User provides a complete authoritative calculation policy and asks to express it as a decision table.
Target: `the Business Rule branch` can be directly useful; do not force the full BA requirements reasoning ceremony simply because `requirements-engineering` exists.

## D10 — Simple complete case
Input: Product and domain truth fully define one stateless behavior; only an observable acceptance boundary is missing.
Target: select Acceptance Criteria directly and stay lightweight; no mandatory hierarchy worksheet or full artifact package.


## D11 — High-leverage concept ambiguity
Input: Product says `inactive users cannot submit expenses`; current sources use `inactive` for both employment status and login inactivity.
Target: identify the competing meanings and their downstream consequences; resolve the domain/source meaning first instead of asking many rule/AC questions on top of an overloaded concept.

## D12 — Inspect before asking
Input: Stakeholder asks whether cancelled subscriptions can be restored; current runtime and policy already define a 30-day restoration window.
Target: bind the inspectable current/authorized truth and ask only if authority/currentness remains material; do not make the stakeholder restate known facts.

## D13 — Discriminating probe
Input: `Admins may refund paid invoices`; plausible meanings are any paid invoice versus only unsettled/within a window.
Target: choose the source/question that best separates those interpretations because applicability and downstream rules change; avoid a generic process interview.

## D14 — False conflict by context
Input: EU compliance says retain invoices; a US customer request says delete account data immediately.
Target: separate object, jurisdiction, purpose, applicability and effective scope before treating this as an incompatible requirement conflict.

## D15 — Genuine interest conflict
Input: Sales needs privileged override for urgent deals; Security requires no manual override of a fraud block.
Target: preserve both needs/risks, authority and consequences; seek an authorized variant/agreement/compromise only where legitimate, never average the rules.

## D16 — Value/policy conflict
Input: Privacy policy minimizes tracking; fraud operations requests full behavioral logging.
Target: use evidence to clarify consequences but preserve the normative/value conflict and route an authorized decision or scoped variant; do not pretend more data resolves the policy choice.

## D17 — Relationship conflict is not semantic conflict
Input: Two department heads reject each other's proposals even though the observable requirement outcomes are equivalent.
Target: keep the semantic requirement truth separate and route/facilitate the relationship/governance issue; do not manufacture different requirements to represent interpersonal opposition.

## D18 — Completeness attack on partial bulk outcome
Input: Use Case, Business Rule and AC all describe admin bulk-import; happy-path examples assume every row is valid. Counterexample: row 1,337 is invalid after 1,336 accepted rows.
Target: open only the business-visible partial-result/recovery/next-action semantics that can change the need; do not jump to database transaction design.

## D19 — Missing transition semantics
Input: Target account-status behavior is fully specified for new accounts, but existing legacy accounts cannot map cleanly to the new states.
Target: surface temporary conversion/coexistence/business-continuity requirement truth without turning it into permanent target behavior.

## D20 — Missing quality boundary
Input: Customer search works for 20 records but production operators handle 500k customers.
Target: recognize operational-scale uncertainty, route measurable quality semantics to Quality Requirement branch, and avoid prescribing index/API architecture.

## D21 — Negative guarantee omission
Input: `Suspended users cannot create new orders`, but scheduled orders may continue and create charges.
Target: determine whether the authorized need also forbids already-scheduled effects; open the negative/continuity semantic only if material.

## D22 — Simple child bypass
Input: An authorized policy already states `discount = 10% for Gold customers during campaign X`; user asks for a decision table.
Target: invoke Business Rule branch directly; do not run the full uncertainty/conflict/completeness/comprehension loop.

## D23 — Shared understanding already proven
Input: A domain owner accurately predicts the proposed settlement rule on two material edge cases and only one narrow boundary remains open.
Target: use compact domain language and pursue only the remaining decision-changing boundary; do not force beginner explanation or a mockup.

## D24 — Explicit non-understanding
Input: Operations hears `reconciliation queue` but cannot explain what an operator sees or does when an item remains unresolved.
Target: move from abstraction to a concrete scenario/state representation or low-fidelity elicitation mockup, then ask the stakeholder to walk through the expected next action.

## D25 — Confident misunderstanding
Input: Stakeholder repeatedly says they understand subscription pause, but a month-end scenario reveals they expect billing to stop permanently while the requirement says billing resumes automatically.
Target: mark shared understanding as divergent, reopen pause/resume semantics, and do not record agreement based on confidence or acknowledgement.

## D26 — Representation must fit the uncertainty
Input: Stakeholders disagree whether discount is applied before or after tax.
Target: use a worked calculation or decision table; do not draw a screen mockup for a precedence/calculation ambiguity.

## D27 — Elicitation mockup is not Design authority
Input: BA sketches alternative approval screens only to expose role visibility and allowed actions; stakeholders prefer one.
Target: preserve discovered behavior/role semantics and preference evidence, but do not promote the sketch to an approved wireframe or final interaction hierarchy; route actual Design decisions to the Design owner.

## D28 — Static mockup cannot answer runtime experience
Input: Stakeholders agree on screens but disagree whether a delayed, real-time multi-step interaction remains comprehensible under external confirmation latency.
Target: when timing/runtime experience is necessary to discriminate the assumption, use `/prototype`; do not add more static frames and claim the runtime question is resolved.
## Falsifiers
- Agent starts from “which documents do you want?”
- Agent manufactures every requirement class for completeness.
- Agent treats BR/Use Case/Story/AC/NFR as interchangeable formats.
- Agent treats a PRD/BRD/SRS container as a new canonical semantic owner.
- Agent promotes brainstorm proposals or current runtime quirks into target requirements without authority.
- Agent invents Product, architecture, security, data, QA or release decisions to complete the BA package.
- Agent treats stakeholder confidence, seniority, terminology use, or `yes` as proof of shared understanding.
- Agent chooses mockups by default instead of matching representation shape/fidelity to the uncertainty.
- Agent promotes a BA elicitation sketch into approved Design truth.
- Agent keeps adding static frames when timing/runtime experience is the discriminating evidence.
- Agent runs a completeness checklist but never tries a plausible in-scope case where all written requirements pass while need/value fails.
- Agent labels every disagreement as a requirements conflict without first testing terminology, applicability, evidence, authority, or relationship/governance causes.
