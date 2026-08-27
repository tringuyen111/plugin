# Product Definition vertical-depth behavioral cases

Evidence-State: `NOT_RUN`
Freeze-Note: Cases freeze the expected Product Definition decision behavior; they are not behavioral PASS evidence by themselves.

## Rubric

- `COMMITMENT`: keeps `Outcome Claim = OUTCOME | CONTRIBUTION | NO_OUTCOME_CLAIM` independent from `Learning Commitment = LEARNING | NO_LEARNING_COMMITMENT`, so learning does not erase outcome truth and partial scope cannot silently claim a whole-journey outcome.
- `VALUE_MECHANISM`: connects user-condition change to business value; usage/frequency alone is not value.
- `CURRENT_TRUTH`: inventories existing capability/workaround and identifies the material blocker before adding scope.
- `SCOPE_ENVELOPE`: tests necessity and sufficiency relative to the declared commitment without importing BA/Design/Engineering detail.
- `CAPABILITY_TOPOLOGY`: distinguishes standalone feature, capability cluster, product area, and commercial package by user/business relation rather than technical adjacency.
- `OPERATING_SHAPE`: recognizes actor, cadence, criticality, scale, recovery/support expectations when they materially change Product scope.
- `OPTION_HORIZON`: distinguishes `BUILD_NOW | PRESERVE_OPTION | DEFER_SPECULATIVE` without speculative generic scope.
- `COMMERCIAL_VIABILITY`: surfaces segment/core-vs-expansion/cost-to-serve/package implications only when they can change the Product decision; never invents pricing authority or exact commercial terms.
- `BOUNDARY_DISCIPLINE`: keeps BA, Design, Architecture, Engineering, QA, metrics evidence verdicts, and commercial approval with their real owners.

## Cases

### P1 — useful but insufficient finance export
Outcome: finance managers complete monthly consolidated reporting without reconstructing work manually. Proposal: add CSV export only; multi-account merge and adjustments remain manual blockers.
Expected: reject the whole-outcome claim or narrow it to a contribution; identify the unresolved blockers and do not call a useful partial feature sufficient for the declared outcome.

### P2 — duplicate existing capability, miss the real blocker
Outcome: users recover accounts without support. Password reset already exists; inaccessible MFA remains the blocker. Proposal: rebuild password reset inside a new Recovery Center.
Expected: bind current capability truth, avoid redundant scope, and define the missing capability delta around inaccessible-factor recovery.

### P3 — solution-contaminated executive request
Input: an executive asks to “add AI search” but evidence only supports that support agents cannot find the current procedure quickly.
Expected: preserve the problem/outcome and treat AI as a hypothesis; do not convert solution preference into authorized scope without evidence/decision authority.

### P4 — cross-owner journey
Outcome spans the product plus an external identity provider or another team's service.
Expected: distinguish Product's contribution from the total outcome, identify dependency/owner, and do not inflate local Product scope merely to own the entire journey.

### P5 — simple low-risk near-miss
One small authorized capability has a clear outcome, no meaningful topology/operational/future/commercial uncertainty, and existing treatment is unchanged.
Expected: stay lightweight; do not force a Product-area map, pricing analysis, or future-option worksheet.

### P6 — high usage, weak business value
A dashboard widget is clicked many times per day but mainly exposes information already visible elsewhere and changes no important user/business condition.
Expected: do not equate usage with value; require a plausible value mechanism before prioritizing it as high value.

### P7 — rare but critical recovery
Emergency account recovery is used infrequently, but failure can cause churn, support escalation, trust loss, or security harm.
Expected: treat criticality/consequence as material value evidence; low frequency is not evidence of low value.

### P8 — real versus false capability cluster
A: password reset, MFA recovery, account unlock, and session revoke help complete one access-recovery/control job. B: invoice export and fraud review share a table component but serve different jobs.
Expected: cluster A when product meaning supports it; keep B separate. Technical adjacency alone must not create Product topology.

### P9 — plausible versus speculative future
A current reporting capability has repeated evidence that scheduled recurring delivery is the likely next customer need. Another idea imagines an unrelated “AI reporting platform someday.”
Expected: preserve a cheap Product option for the evidence-backed adjacent direction without scoping it now; defer the speculative future and never mandate generic engineering.

### P10 — operating shape changes scope
Admins must onboard 2,000 employees during periodic migrations. Proposal supports one-at-a-time invites only.
Expected: recognize scale/cadence as Product-level operational insufficiency; identify the needed bulk/operational capability without choosing API/batch/UI mechanics.

### P11 — core value gate versus valid segment fence
A: the final step required for a new user to realize the product's core value is gated only because it is “useful.” B: SSO and advanced audit are required by a distinct enterprise-governance segment while smaller customers can realize core value without them.
Expected: flag A as a value-realization/viability risk; allow B as a plausible segment/package hypothesis without inventing exact tier or price.

### P12 — capability cluster is not a commercial bundle
Reporting export, scheduled delivery, and report templates form one user-job cluster. A commercial proposal bundles scheduled delivery with an unrelated premium admin feature simply because both are labeled Pro.
Expected: keep Product topology and commercial packaging as different relations; commercial bundling requires its own segment/value rationale.

### P13 — AI value with material cost-to-serve
An AI analysis capability creates high customer value but inference cost grows sharply with usage.
Expected: treat cost shape as a business-viability risk that can change entitlement/package hypotheses; do not pick billing architecture, exact limits, or price points without evidence/authority.

## Falsifiers

- Agent treats usage frequency as a synonym for Product value.
- Agent starts scope from the proposed feature instead of current capability/blocker truth.
- Agent claims a whole outcome from a contribution-sized scope without naming the remaining dependency/blocker.
- Agent groups features because they share implementation, a screen, or a current plan label.
- Agent scopes speculative future capability merely to “future-proof” the product.
- Agent ignores live operating cadence/scale/criticality that makes the proposed capability unusable for the declared commitment.
- Agent invents Free/Pro/Enterprise fences, price points, willingness-to-pay evidence, billing mechanics, or commercial authority.
- Agent forces deep topology/commercial analysis on a simple case where those decisions are not material.

## F5d Prompt / Knowledge Architecture qualification

These cases freeze the expected context-activation behavior after the Product Definition prompt-architecture refactor. Status remains `NOT_RUN` until executed against an actual model/runtime.

### P14 — simple bounded Product definition does not preload depth
Input: one small reversible capability has a supported opportunity, `Outcome Claim = CONTRIBUTION`, `Learning Commitment = NO_LEARNING_COMMITMENT`, an obvious current capability delta, one directly linked metric with no target controversy, and no material operating/future/commercial uncertainty.
Expected: complete the Product recommendation from resident truth plus only the depth actually needed. Do not load topology, operating-shape, option-horizon, commercial-viability, priority-framework, or durable-format modules merely because they exist.

### P15 — measurement uncertainty activates measurement only
Input: Product outcome and scope are stable, but the proposed success metric is an engagement proxy with no defensible target basis and a plausible quality guardrail.
Expected: activate `references/outcome-measurement.md`; return metric role/outcome link, proxy limitation, target basis/unknown, and guardrail/prerequisite. Do not reopen unrelated capability scope unless the measurement finding actually invalidates it.

### P16 — current capability truth activates capability/scope
Input: account recovery already supports password reset but inaccessible MFA remains the blocker; proposal rebuilds all recovery in a new center.
Expected: activate `references/capability-scope.md`; return current capability truth, blocker, `REUSE/EXTEND/NEW` delta, smallest justified scope/non-goals, and no implementation/module architecture.

### P17 — operating shape returns Product constraint, not mechanics
Input: migration admins must onboard 2,000 employees periodically and one-at-a-time operation cannot satisfy the declared Product commitment.
Expected: activate `references/operating-shape.md`; return the scale/cadence insufficiency and Product-level capability/constraint. Do not choose bulk UI, import format, API, queue, or batch-job implementation.

### P18 — option horizon does not become technical future-proofing
Input: repeated evidence makes scheduled report delivery a likely adjacent need, but it is not required for the current reporting commitment.
Expected: activate `references/option-horizon.md`; return `PRESERVE_OPTION` only when justified, plus the current Product relation/trade-off. Do not mandate generic platform/extensibility architecture or scope the future capability now.

### P19 — commercial viability stays Product-level
Input: an AI capability has strong value but cost-to-serve grows materially with usage; no pricing research or commercial authority is present.
Expected: activate `references/commercial-viability.md`; return the viability risk/hypothesis and its effect on scope/priority with unresolved evidence/owner. Do not invent price points, tiers, usage limits, billing mechanics, or commercial approval.

### P20 — priority sensitivity avoids fake precision
Input: two Product commitments remain close; one has higher user consequence while the other has stronger strategic alignment, and no authorized weights exist.
Expected: activate `references/priority-decision.md`; return evidence-backed trade-off/tie and the exact evidence or authorized weight that would change disposition. Do not fabricate a composite score.

### P21 — durable format is projection only
Input: Product truth is complete inline and later needs durable governed persistence.
Expected: load `references/product-definition-format.md` only to serialize established truth. Do not let the template invent a Product identity, baseline, target, scope, priority, continuation owner, or Authorized Product decision.

### P22 — contribution and learning are independent
Input: Product can materially improve one part of a larger outcome but must also use the same bounded scope to discriminate a decision-critical adoption assumption.
Expected: return `Outcome Claim = CONTRIBUTION` and `Learning Commitment = LEARNING`; preserve remaining whole-outcome blockers and the named learning question. Do not collapse the pair into one mutually-exclusive `LEARNING` commitment or silently upgrade the contribution to `OUTCOME`.

### P23 — outcome and learning may coexist
Input: Product claims the bounded target condition is achievable subject only to explicit dependencies, while a decision-critical assumption still requires discriminating evidence during the scope.
Expected: allow `Outcome Claim = OUTCOME` together with `Learning Commitment = LEARNING`; the learning obligation does not automatically weaken the Outcome Claim.

### P24 — pure learning does not fabricate outcome value
Input: the current Product slice exists only to discriminate a strategic assumption and makes no present claim that the target user/business condition improves.
Expected: return `Outcome Claim = NO_OUTCOME_CLAIM` and `Learning Commitment = LEARNING`; keep user/business outcomes as opportunity context without presenting experiment activity as delivered Product value.

### P25 — no ceremonial learning commitment
Input: one bounded contribution has a clear evidence-grounded scope and no decision-critical assumption that the current slice must discriminate.
Expected: return `Outcome Claim = CONTRIBUTION` and `Learning Commitment = NO_LEARNING_COMMITMENT`; do not invent an experiment or evidence obligation merely for completeness.

### P26 — learning invalidation re-enters only dependents
Input: a Product definition has an independently supported Outcome Claim and scope plus a Learning Commitment. New evidence invalidates only the learning question, not the outcome mechanism or scope premise.
Expected: reopen the learning evidence path and dependent measurement/experiment/recommendation only. Preserve the independent Outcome Claim and scope unless the invalidated learning premise actually supported them.

## F5d prompt-architecture falsifiers

- The Agent loads both legacy-sized Product Definition contracts or all decision modules before identifying the current Product decision frontier.
- A conditional module ends at `read this reference` without returning the named Product decision/state/evidence update.
- `SKILL.md` and a support module each act as competing end-to-end Product Definition workflow authorities.
- A simple bounded Product definition forces topology, operating-shape, future-option, commercial, priority-framework, or durable-format depth.
- A loaded module widens Product Definition into BA/Design/Architecture/Engineering/QA, metrics evidence verdicts, pricing/billing/legal mechanics, or invented execution ownership.
- Durable projection creates Product truth that was not established or authorized before serialization.
