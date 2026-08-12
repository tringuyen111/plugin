# Worked Brainstorm Example — External Payment Recovery

This is an **illustrative fixture**, not evidence about a real product. It demonstrates one living artifact, adaptive-language separation, epistemic states, deep behavioral representation, and downstream ownership boundaries.

The fixture's selected artifact language is English. Exact strings are therefore English as well; in a real brainstorm they would follow the intended end-user language.

---
type: brainstorm
feature: checkout
idea_slug: external-payment-recovery
status: working
quality: partial
mode: deep
lang: en
owner: product-owner
created: 2026-08-09
updated: 2026-08-09
source_refs:
  - fixture-seed
links: []
tags: [brainstorm, checkout]
changelog:
  - 2026-08-09 | /brainstorm | created working brainstorm artifact from fixture seed
  - 2026-08-09 | /brainstorm | DEC-1: pending attempt prevents automatic competing payment attempts; OQ-3 remains open
---

# Recover an external payment attempt after redirect interruption

> Feature: checkout | Idea: external-payment-recovery
> This file is the single living brainstorm artifact for the idea.

## 1. Idea Seed

**OBSERVED fixture seed:**

> Customers sometimes leave the checkout while an external payment page is open. When they return, the product should help them understand whether payment succeeded, failed, or is still pending instead of starting over blindly.

No provider, timeout, retry count, or canonical product rule was supplied in the seed.

## 2. Context

**OBSERVED:**

- The user starts checkout in the product and may be redirected to an external payment provider.
- A payment result may not be known at the moment the user returns.
- The business problem is confusion and duplicate attempts when the user cannot tell what happened.

**PROPOSED interpretation:** the experience should make the payment-attempt state visible before offering a new payment attempt.

Why now is still **UNRESOLVED**; the seed provides no deadline, support-ticket count, or conversion evidence.

## 3. User Groups

| User group | Pain/problem | Primary need | Access/gating if material |
|---|---|---|---|
| Checkout customer | Cannot tell whether an interrupted payment completed | See the current payment result and safe next action | Must have an active checkout/order |
| Support agent | May receive duplicate-payment complaints | Understand the attempt status and what the customer can do | **PROPOSED**; v1 scope not decided |

`Support agent` remains proposed because the seed did not establish support tooling scope.

## 4. Capability Breakdown

### P0 — Must have (preliminary)

- Show the current state of the active payment attempt after the user returns.
- Prevent a new attempt from silently racing an existing pending attempt.
- Provide recovery behavior for provider failure/timeout and expired return context.
- Preserve a stable relationship between the checkout/order and the payment attempt.

### P1 — Should have (preliminary)

- Give the user a clear retry path after a failed attempt.
- Explain when a pending attempt is still being checked.
- Let the user resume checkout without re-entering unrelated order information.

### P2 — Nice to have (preliminary)

- Support-facing visibility into payment-attempt history.

> These priorities are brainstorm hypotheses, not canonical PRD priority.

## 5. Core Flows

### 5.1 Successful return from external payment

1. User confirms checkout and chooses the external payment option.
2. System creates/associates a payment attempt with the checkout and redirects the user.
3. External provider completes payment and returns/callbacks.
4. System reconciles the attempt result.
5. User returns to the product and sees the order/payment success state.

```text
User            Product                     External provider
 |                 |                                |
 | Confirm pay     |                                |
 |---------------->| create/associate attempt       |
 |                 |------------------------------->|
 |                 |        redirect / pay          |
 |<------------------------------------------------>|
 |                 |<--------- result/callback -----|
 | return          | reconcile current attempt      |
 |---------------->|                                |
 |<----------------| show success                   |
```

### 5.2 User returns while payment is still pending

1. User returns to checkout before the final provider result is known.
2. System finds the current payment attempt in `pending`.
3. System shows a pending state instead of starting a new attempt automatically.
4. System continues/retries reconciliation according to the still-unresolved retry policy.
5. User sees success, failure, or a still-pending message when the state changes.

**DEC-1 (DECIDED in this fixture):** a new payment attempt is not automatically created while the current attempt is still pending.

## 6. System Behavior Deep Dive

### 6.1 Decision Points

| ID | Flow | Condition | YES / true path | NO / false path | State/result if material |
|---|---|---|---|---|---|
| D1 | Return | Is there an active payment attempt for this checkout? | Load its current state | Offer a new payment action | no attempt vs existing attempt |
| D2 | Return | Is the attempt pending? | Show pending/reconciliation behavior | Show terminal success/failure | pending vs terminal |
| D3 | Retry | Did the previous attempt fail terminally? | Allow retry subject to policy | Do not create a competing attempt | failed vs pending/success |

### 6.2 Scenario Matrix

| Starting state / role | Target state/object | Rule | Action | Result |
|---|---|---|---|---|
| customer + no attempt | new attempt | checkout still payable | start external payment | redirected |
| customer + pending | same attempt | per **DEC-1**: no automatic competing attempt | reconcile / show pending | one active attempt |
| customer + failed | new attempt | **UNRESOLVED:** retry policy | allow or block retry | OQ-3 |
| customer + succeeded | order success | payment terminal | show success | no retry |

### 6.3 State Transitions

```text
payment-attempt: created → pending → succeeded
                         ↘ failed
```

| Entity | From | To | Trigger | Reversible? | User-visible result if material |
|---|---|---|---|---|---|
| payment attempt | created | pending | external flow started | no | payment in progress |
| payment attempt | pending | succeeded | confirmed provider result | no | success |
| payment attempt | pending | failed | terminal provider/business failure | no | failure + possible retry |

A `pending → expired` state is **PROPOSED** but not decided because TTL behavior is unresolved.

### 6.4 Interrupted Transactions

| Situation | State that remains | Resume / retry / conflict rule | Cleanup / TTL | User-visible result |
|---|---|---|---|---|
| Browser closes during provider flow | current attempt remains associated with checkout | return to checkout and load the same attempt | **UNRESOLVED** | current status shown |
| Provider times out | pending unless terminal failure is known | retry reconciliation, not payment creation | **UNRESOLVED** | "We're still checking your payment." **PROPOSED** |
| Return link/context expires | attempt remains server-side if known | recover through checkout/order context | **UNRESOLVED** | recovery guidance |
| Two devices return concurrently | both read same attempt | per **DEC-1**: neither creates a new attempt while pending | normal cleanup | both converge on same status |
| User presses Pay again while pending | pending attempt remains | per **DEC-1**: block/redirect to current attempt status | normal cleanup | explain pending state |

### 6.5 Other Edge Cases

- Late success callback arrives after the user previously saw pending.
- Duplicate provider callbacks for the same attempt.
- Checkout price/inventory changes while external payment is in progress — **OQ-4**.
- User loses access to the checkout/order while the attempt is pending — **UNRESOLVED**.

## 7. Validation, Limits & Wording

### 7.1 Validation Rules

| Field / input | Required? | Rule / format | Min/Max if material | Failure behavior |
|---|---|---|---|---|
| checkout/order context | yes | must identify the business transaction | n/a | do not guess an unrelated attempt |
| payment attempt reference | yes when an attempt exists | must belong to the current checkout/order | n/a | show recovery/error state |

### 7.2 Limits & Quotas

| Parameter | Value | Window/duration | Behavior when exceeded | Epistemic note if needed |
|---|---|---|---|---|
| pending attempt TTL | TBD (OQ-1) | TBD | TBD | UNRESOLVED |
| reconciliation retry | TBD (OQ-2) | TBD | TBD | UNRESOLVED |
| user payment retry | TBD (OQ-3) | TBD | TBD | UNRESOLVED |

No exact value is invented simply to make the table look complete.

### 7.3 Wording Samples

#### Error

| Situation | Exact string | Epistemic note if needed |
|---|---|---|
| previous attempt failed | "Your payment didn't go through. You can try again." | PROPOSED |

#### Success

| Situation | Exact string | Epistemic note if needed |
|---|---|---|
| payment succeeded | "Payment confirmed." | PROPOSED |

#### Informational / Neutral

| Situation | Exact string | Epistemic note if needed |
|---|---|---|
| attempt still pending | "We're still checking your payment. Please don't start another payment yet." | PROPOSED |

## 8. Assumptions

- **ASSUMPTION:** the product can recover an attempt from checkout/order context after redirect interruption.
- **ASSUMPTION:** external provider result is eventually reconcilable even if the browser return is missing.
- **ASSUMPTION:** duplicate payment creation is a meaningful business/customer risk.

Each assumption requires downstream verification before canonical product/technical design.

## 9. Risks

| Risk | Likelihood | Business impact | Prevention / mitigation |
|---|---|---|---|
| Duplicate payment attempts | occasional | customer distrust, refund/support cost | converge on one active attempt; explicit pending UX |
| Provider delay/outage | occasional | checkout abandonment / conversion loss | clear pending/recovery path; operational monitoring downstream |
| Incorrect retry policy | occasional | duplicate charge or unnecessary abandonment | PRD owner decides retry/pending policy before launch |
| Price/inventory change mid-payment | rare/unknown | paid amount may no longer match fulfillable order | resolve OQ-4 with product/business owner |

## 10. Success Criteria (preliminary)

**PROPOSED hypotheses:**

- reduce duplicate payment attempts after interrupted external flows;
- reduce support contacts asking whether payment succeeded;
- increase successful recovery from pending/failed payment states.

Exact target percentages are **UNRESOLVED**.

## 11. Open Questions

- [ ] OQ-1: How long may a payment attempt remain pending before it is treated as expired/abandoned?
- [ ] OQ-2: How often and for how long should reconciliation retry before the user needs another action?
- [ ] OQ-3: After a terminal failure, what exact user retry rule applies?
- [ ] OQ-4: What happens if price or inventory changes while external payment is in progress?
- [ ] OQ-5: Is support-agent visibility in v1 scope?

## 12. Next Steps

### Suggested handoffs

- PRD owner: decide canonical pending/retry/price-change product rules and v1 support scope.
- SRS owner: design technical reconciliation/idempotency after product behavior is decided.
- Operations/support owner: review customer-support implications if support visibility enters scope.

### Downstream impact handoff

| Owner / Artifact | Detected impact | Why review is needed | Requested handoff |
|---|---|---|---|
| PRD | pending/retry policy | changes user-visible product behavior | product owner decides canonical rule |
| SRS | concurrent/late result handling | technical design depends on canonical product rule | architect/engineering designs after PRD decision |

Brainstorm reports these impacts; it does not edit PRD or SRS.

---

## Example continuation behavior

If the user later answers:

> OQ-3: after a terminal failure, allow at most 2 user retries within 15 minutes.

The skill should:

1. reopen this **same artifact** as `working` if it had been finalized;
2. mark OQ-3 resolved without renumbering OQ-4/OQ-5;
3. assign `DEC-2` to the accepted retry rule and record `OQ-3 resolved by DEC-2`;
4. update retry behavior in Capability Breakdown, relevant flow/decision rows, Limits, Risks, and downstream impact;
5. add one material changelog entry referencing OQ-3 and DEC-2;
6. remove/replace any old contradictory current retry statement;
7. re-run quality/L1 before finalization;
8. **not** create `external-payment-recovery-v2.md` or `external-payment-recovery-resolved-oq.md`.
