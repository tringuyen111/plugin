# Product Definition vertical-depth behavioral cases

Status: `NOT_RUN` unless executed with a suitable agent/runtime. These cases freeze the expected decision delta from the pre-edit v1.0.11 baseline and the reviewed P1-P28 pressure test.

## Rubric

- `COMMITMENT`: distinguishes `OUTCOME | CONTRIBUTION | LEARNING` so partial scope cannot silently claim a whole-journey outcome.
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
