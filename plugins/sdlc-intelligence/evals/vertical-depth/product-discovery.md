# Product Discovery vertical-depth qualification cases

Evidence-State: `NOT_RUN`

Freeze-Note: Cases freeze the expected Product Discovery decision behavior; they are not behavioral PASS evidence by themselves.

## PD1 — Feature request hides several possible opportunities
Input: `Please add dark mode.` Plausible explanations include low-light eye strain, accessibility/visual sensitivity, aesthetic preference, or OS/work-environment convention.
Target: preserve dark mode as a proposed solution/request; discriminate the customer progress gap before opportunity framing; do not advance `build dark mode` as the opportunity.

## PD2 — High usage may be a workaround, not success
Input: thousands of finance users export CSV every month.
Target: treat usage as evidence of current behavior, not unmet need/value by itself; distinguish desired export workflow from missing trusted consolidation, legitimate downstream analysis, or audit/archive needs.

## PD3 — Defect near-miss
Input: checkout abandonment jumps immediately after yesterday's release.
Target: diagnose/consume current-state defect evidence before inventing a new opportunity; re-enter Discovery only if a product opportunity remains after defect truth is known.

## PD4 — Existing capability / discoverability gap
Input: users request bulk invite; bulk import already exists but is buried and poorly explained.
Target: do not infer a new bulk capability; frame the remaining find/understand/complete gap when evidence supports it.

## PD5 — Segment-specific SSO signal
Input: enterprise prospects repeatedly ask for SSO while SMB customers do not.
Target: preserve enterprise/procurement/security context and segment boundary; do not generalize to all customers or decide SSO/SCIM/tier/scope.

## PD6 — Same symptom, different opportunities
Input: SMB and Enterprise both say onboarding is slow. SMB repeatedly re-enters data; Enterprise waits days for cross-department approval.
Target: split the opportunity frames instead of averaging them into generic `faster onboarding`.

## PD7 — Undo request is solution-shaped
Input: `Add Undo after deleting a customer.`
Target: recover the problem-space need such as safe recovery from accidental high-impact actions; keep Undo as a solution hypothesis and stop before choosing the recovery capability.

## PD8 — Competitor AI signal
Input: a competitor launches AI summaries and executives want one too.
Target: treat this as market/strategy signal that creates hypotheses; do not claim customer opportunity without need/pain/desire evidence. Preserve real executive direction as authority/constraint without rewriting it as customer validation.

## PD9 — Regulatory mandate
Input: law requires records to be retained for seven years.
Target: keep mandate as authoritative constraint/requirement input, not desirability evidence. Discovery may study user consequences but must not gate compliance truth on user research.

## PD10 — Opportunity granularity
Input: complaints about `reporting`.
Target: reject both `reporting is bad` and solution-shaped `users need CSV export`; prefer a bounded actor/context/progress-gap frame such as finance managers reconciling adjustments across accounts without manual reconstruction, while stopping before solution scope.

## PD11 — Parent/child opportunity structure
Input: several access problems: sole admin loses MFA, backup codes gone, organization lock, compromised sessions.
Target: structure parent/child/sibling relations only if that changes understanding, comparison, or next learning; do not infer one UI/module/team/package.

## PD12 — Workaround exists but opportunity is weak
Input: five expert users maintain a spreadsheet beside the product; it takes minutes, causes no material error/risk, and fits an established workflow.
Target: do not equate workaround existence with worthwhile opportunity; current evidence may justify PARK/REJECT.

## PD13 — Founder idea without customer evidence
Input: founder proposes collaborative dashboards from strategy intuition.
Target: preserve as strategic hypothesis, expose customer/problem assumptions and the smallest decision-useful evidence need; do not fabricate validation.

## PD14 — Product Discovery vs Product Definition
Input: grounded opportunity: enterprise finance teams lose significant time and trust when monthly close requires manual reconciliation across accounts.
Target: stop at opportunity + evidence boundary + riskiest uncertainty + ADVANCE recommendation. Do not design consolidated-reporting scope, scheduling, report definitions, packaging, or other capability delta.

## PD15 — Product Discovery vs Define Behavior
Input: grounded opportunity: tenant admins need controlled recovery when the sole admin loses authentication access.
Target: stop at grounded problem/opportunity and evidence. Do not define eligible actor, recovery states, proof rules, exception precedence, partial outcomes, AC, or NFR semantics.

## PD16 — Simple bounded signal
Input: a small reversible improvement has direct repeated user evidence, one bounded segment, no competing interpretation, and no consequential ambiguity.
Target: record the bounded opportunity and use existing evidence-sufficiency/recommendation logic proportionally; do not manufacture an opportunity tree or extended discovery ceremony.

## Falsifiers
- Agent translates a feature request directly into an opportunity without recovering the customer progress gap.
- Agent treats raw usage, request count, workaround existence, or competitor activity as proof of customer value/opportunity.
- Agent broadens evidence from one segment/context to the whole customer base without support.
- Agent requires a singular root cause where bounded problem-space evidence is sufficient.
- Agent turns every current-product regression, mandate, or discoverability issue into a desirability opportunity.
- Agent jumps from opportunity framing into capability delta, feature scope, packaging, business rules, states, AC, NFRs, or implementation.
- Agent forces an Opportunity Solution Tree or other hierarchy when the structure does not change a decision or learning question.
- Agent duplicates framing/evidence/learning/comparison depth in the resident workflow instead of activating the bounded Product Discovery module that owns the decision-specific HOW.

## Standalone / composition qualification

These cases were frozen before the standalone-independence mutation and are retained here as release-bound qualification targets, not as PASS evidence.

## PD17 — Standalone bounded opportunity, no siblings
Input: repeated direct evidence from one bounded segment establishes a material progress gap and consequence; no sibling Skills are installed.
Target: frame the solution-free opportunity, evidence boundary, riskiest assumption, and Discovery recommendation without requiring Research, Decision Interview, Domain Modeling, Product Definition, or another sibling to perform Product Discovery's own job.

## PD18 — Small coherent supplied corpus without Research Synthesis
Input: five readable interview notes from one study round with clear provenance and one bounded question; no synthesis capability is available.
Target: inspect proportionally and derive only claims supported by the supplied corpus. Do not block solely because `research-synthesis` is absent and do not pretend heavyweight heterogeneous-corpus synthesis was performed.

## PD19 — Synthesis-heavy corpus without synthesis capability
Input: hundreds of interviews, support tickets, and metrics whose coding/comparability/lineage analysis is decision-material; no qualified synthesis result/capability is available.
Target: name the exact unsynthesized evidence frontier and how it limits the Discovery decision. Preserve `GATHER_EVIDENCE`/`PARTIAL` as appropriate because required analysis is missing, not because a sibling Skill name is absent.

## PD20 — External evidence without Research sibling
Input: the opportunity depends on a current external regulation or market fact not present in supplied evidence; `/research` is not installed, while an authorized source surface may or may not exist.
Target: name the exact evidence question and source/applicability need; use an actually available authorized evidence surface if present, otherwise preserve the evidence gap. Do not block merely because a sibling named Research is absent.

## PD21 — Human-owned weighting without Decision Interview
Input: two supported opportunities remain tied only because the accountable Product owner must supply a strategic weighting; Decision Interview is unavailable and the owner is present.
Target: expose the sensitivity and ask only the bounded decision-changing owner input when useful, or preserve the tie. Do not require Decision Interview and do not invent a weight.

## PD22 — Overloaded term can be locally qualified
Input: Sales uses `Account` for customer organization while telemetry uses `Account` for login identity; source context makes the relevant meaning explicit for this bounded opportunity and Domain Modeling is unavailable.
Target: context-qualify the term locally and continue Product Discovery. Do not require a domain model merely because the label is overloaded.

## PD23 — Real semantic-model boundary
Input: opportunity interpretation changes depending on whether `Workspace` and `Organization` are one concept, distinct concepts, or context-specific roles, and authoritative sources conflict across multiple consumers.
Target: identify that semantic-model truth itself is decision-material; preserve the opportunity impact and request/consume semantic clarification when available. Without it, keep the semantic frontier explicit rather than inventing the model.

## PD24 — Supported opportunity but Product priority unresolved
Input: evidence supports a material opportunity, but the organization has several roadmap commitments and no authorized portfolio-priority decision.
Target: Product Discovery may advance the opportunity to Product Definition and preserve strategic sensitivity. It must not `REJECT_OR_PARK` solely by inventing portfolio priority.

## PD25 — Simple inline completion
Input: direct repeated evidence supports one bounded reversible opportunity with no competing frame; user asks only whether it is ready to move into Product Definition.
Target: return compact evidence-grounded Discovery truth and disposition. Do not require an OPP identifier, durable file, approval table, or the full Opportunity Artifact template.

## Standalone falsifiers
- Missing sibling name alone causes Product Discovery to block even though its own opportunity judgment can finish truthfully.
- Product Discovery copies Research, Research Synthesis, Decision Interview, Domain Modeling, or Metrics Review methodology into itself to fake standalone capability.
- Ordinary context-qualified terminology always forces Domain Modeling.
- Product Discovery invents portfolio priority to park/reject an otherwise supported opportunity.
- A simple bounded request forces the full durable Opportunity Artifact format.

## F5c Prompt / Knowledge Architecture qualification

These cases freeze the expected context-activation behavior after the Product Discovery prompt-architecture refactor. Status remains `NOT_RUN` until executed against an actual model/runtime.

## PD26 — Simple bounded opportunity does not preload depth
Input: direct repeated evidence supports one bounded segment, one clear progress gap, no material competing frame, and the next step is reversible.
Target: complete the bounded frame and Discovery recommendation from the resident control surface. Do not load framing, evidence, learning-test, comparison, or durable-format depth merely because those modules exist.

## PD27 — Ambiguous signal activates framing only
Input: finance users export CSV heavily, but it is unclear whether export is desired workflow, a workaround for missing trusted consolidation, or an audit/archive need.
Target: activate `references/opportunity-framing.md` because opportunity identity is unresolved. Return a bounded candidate frame, strongest alternatives, and the discriminating evidence question into the parent workflow. Do not preload learning-test/comparison depth.

## PD28 — Dependent evidence activates evidence judgment
Input: twenty support tickets report the same failure, but all were generated by one outage and the Product team wants to treat them as twenty independent proof points.
Target: activate `references/evidence-judgment.md`; return dependency/selection limits, evidence boundary, and sufficiency disposition. Do not redesign the opportunity or invent a test unless that becomes the next frontier.

## PD29 — Critical assumption activates learning-test depth
Input: the opportunity frame survives, but advancement depends on whether users will actually switch from the current workaround; preference statements are already abundant.
Target: activate `references/learning-test.md`; return the material assumption, discriminating evidence, appropriate evidence source/method, pre-bound decision rule, and limitations. Do not choose a cheap survey merely because it is easy.

## PD30 — Comparison activates comparison depth without fake precision
Input: two evidence-grounded opportunities remain plausible; one has stronger user consequence while the other has stronger strategic relevance, and no authorized weights exist.
Target: activate `references/opportunity-comparison.md`; return qualitative trade-off/tie plus the exact evidence or owner weight that would change the ordering. Do not invent a composite numeric score.

## PD31 — Knowledge module cannot widen Product Discovery
Input: a Discovery module surfaces a technical feasibility uncertainty or an attractive feature solution while framing/evaluating an opportunity.
Target: return the technical truth as a dependency/evidence need or keep the feature as a solution hypothesis. Do not let the loaded module select capability scope, architecture, behavior states, AC, NFRs, or implementation.

## PD32 — Durable format is projection, not reasoning authority
Input: a bounded Discovery truth is complete inline; later the project asks to persist it into a governed cross-session artifact.
Target: load `references/opportunity-format.md` only for faithful projection of already-established truth. Do not let the template create an OPP identity, Product approval, hierarchy, evidence, or decision that did not already exist or was not authorized.

## F5c prompt-architecture falsifiers
- The Agent loads both legacy-sized end-to-end Discovery contracts or all decision modules before identifying which decision frontier is material.
- A conditional module ends at "read this reference" without returning the named decision/state/evidence update to the resident workflow.
- `SKILL.md` and a support module each act as competing end-to-end Discovery workflow authorities.
- Simple bounded Discovery forces opportunity hierarchy, extended evidence ceremony, learning-test depth, comparison depth, or durable artifact format.
- A loaded module widens Product Discovery into Product Definition, detailed behavior, Design, technical truth, implementation, or another owner's authority.
