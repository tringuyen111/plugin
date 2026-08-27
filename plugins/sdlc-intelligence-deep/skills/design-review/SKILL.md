---
name: design-review
description: Independently review an existing Product/UI Design proposition or implementation for evidence, coherence, fidelity, trade-offs, and user consequence. Use for critique of screens, flows, wireframes, prototypes, Design specs, system decisions, or implemented experiences. Do not author the replacement design or issue QA/UAT/release approval.
---

# Design Review

Review the Design proposition, not merely its pixels. Treat screenshots, flows, specs, prototypes, source/runtime state, research, and implementation as evidence about a Design claim rather than as the capability boundary.

Own one independent second-order judgment loop: bind the exact review subject and authority, reconstruct only the material Design reasoning, challenge the claims and their realization, locate the earliest evidence-supported break, determine impact/scope/owner, state correction intent, and define a falsifiable re-review target.

A review may challenge approved Design truth; it does **not** silently supersede it. A review may expose an unsupported upstream Product premise; it does **not** resolve that Product truth by assumption. Return authoring/recomposition to `product-design`, explicit visual/design conformance PASS/FAIL to `verify-quality` with a bounded visual-conformance scope, production source correction to Engineering, and missing visual evidence mechanics to `visual-capture`.

Read [Design Claim Diagnosis](references/design-claim-diagnosis.md) whenever the issue may live above visual realization, a Design inference itself is challengeable, a material omission/conflict/trade-off exists, or apparently correct realization still produces a bad outcome. Read [Perceptual Diagnosis](references/perceptual-diagnosis.md) only when visible/spatial/typographic/color/material/control/responsive signals are material to the judgment. Read [Review Format](references/review-format.md) before reporting material findings.

## Bind the review subject, not a visual-only fixed point

Bind the minimum exact truth needed to make the requested review falsifiable:

- review question and intended audience;
- exact candidate/revision: screen, flow, wireframe, prototype, Design spec, system decision, implementation, or bounded experience;
- material Product/behavior truth and its authority/maturity;
- current approved/proposed Design truth, assumptions, accepted differences, and system references when available;
- material states, transitions, viewports, content/localization pressure, input modes, and runtime conditions;
- evidence/provenance actually available, including outcome evidence when the claim depends on real user consequence;
- what is explicitly unreviewed or unresolved.

“Fixed” means the reviewed candidate/revision is bound. It does **not** mean Design Review is limited to one screenshot or cannot challenge the proposition that produced the artifact.

Do not require a complete canonical Design contract for every critique. Review against the strongest authority actually available and downgrade unsupported claims rather than inventing missing truth.

## Reconstruct the material Claim Graph

Use this graph only to the depth that can change the conclusion:

```text
PRODUCT / BEHAVIOR TRUTH
        |
        | supports
        v
DESIGN PREMISE / ASSUMPTION
        |
        | justifies
        v
DESIGN DECISION
        |
        | specifies
        v
EXPERIENCE / INTERACTION / SYSTEM MODEL
        |
        | projects-to
        v
ARTIFACT / SPEC / PROTOTYPE
        |
        | realized-by
        v
IMPLEMENTATION
        |
        | produces
        v
EXPERIENCED OUTCOME
```

Do **not** fill every node ceremonially. A direct implementation divergence may need only `approved Design -> implementation`. A disputed navigation choice may require `Product premise -> Design decision -> experienced consequence` even when implementation is perfect.

Review two different things:

- **Node quality:** Is this premise/decision/model itself supported, complete, coherent, explicit about material trade-offs, and compatible with governing truth?
- **Edge quality:** Does the upstream node actually justify/specify/project/realize/produce the downstream relation being claimed?

A polished downstream node never repairs a broken upstream relation.

## Review-state model

| State | Required truth | Advance when | If the gate fails |
|---|---|---|---|
| `UNBOUND` | Review question and candidate identity are known or explicitly missing. | Exact review subject, authority basis, material claim path, and relevant evidence scope are bound. | Return `PARTIAL`/`BLOCKED`; do not review a remembered or ambiguous revision. |
| `CLAIM_BOUND` | The material claim/relation under review is falsifiable. | Existing evidence is sufficient or the smallest discriminating evidence gap is named. | Do not broaden into generic critique or substitute convention for missing truth. |
| `EVIDENCE_READY` | Evidence is inspectable and bound to the relevant claim/state/version. | Node/edge quality and plausible alternative explanations can be judged without guessing. | Record the exact evidence gap; acquire only evidence capable of changing the conclusion. |
| `DIAGNOSED` | Earliest supported break, consequence, scope, uncertainty, and authority effect are explicit. | Correction intent/owner and re-review falsifier are coherent. | Keep locus/scope `UNKNOWN`; do not prescribe a downstream patch. |
| `CONTINUATION_READY` | Findings preserve evidence trails and have bounded owner/action/re-review targets. | Result can continue to the accountable owner/capability without silently authoring or granting acceptance. | Re-enter at the earliest invalid claim/evidence state. |

A correction or superseded Design decision starts a new review cycle at the earliest changed node/edge. Reuse unaffected evidence only when its candidate/authority/state relation remains exact.

## Challenge claims before polishing realization

For every material concern, ask only the questions that can falsify or relocate it:

1. **What is being claimed?** State the material premise, decision, experience relation, system invariant, projection, implementation relation, or outcome expectation.
2. **What authority supports it?** Separate observed truth, approved truth, proposed Design intent, convention/precedent, and unsupported assumption.
3. **Is the node sound?** Test support, completeness, internal coherence, omitted users/states/constraints, and material trade-offs.
4. **Is the edge sound?** Test whether the next decision actually follows and whether each projection/realization preserves the intended relation.
5. **Where is the earliest supported break?** Prefer the earliest causal relation that explains downstream symptoms; do not blame Engineering for faithful execution of a weak Design decision.
6. **What alternative explanation competes?** Generate alternatives only when evidence leaves more than one plausible cause; seek discriminating evidence instead of listing lenses.
7. **What consequence follows?** Tie the issue to task comprehension, action, continuity/recovery, system coherence, perceptual hierarchy, accessibility-visible risk, or supplied outcome evidence.
8. **What is the smallest correction intent?** Reopen a premise/decision, restore a relation, complete a missing state/model, correct a projection, or return an implementation divergence to Engineering. Do not author the replacement unless the terminal job moves to `product-design`.
9. **What would falsify the finding?** Name the smallest observable evidence that would show the challenged relation is restored or the diagnosis was wrong.

## Use expert lenses conditionally

A Design Review is broader than visual critique. Activate only the lenses that can change the current claim:

- **Experience / interaction:** task topology, information/action dependency, state transitions, continuity, feedback, waiting, recovery, permissions, destructive consequence, and valid next action.
- **Information / content:** hierarchy, grouping, naming, disclosure, comprehension, comparison, density, localization, empty/error content, and semantic priority.
- **Perceptual / visual:** expected perception, salience, spatial grouping, typography, color, material/depth, control anatomy, state visibility, responsive composition, and part/whole visual mass. Use [Perceptual Diagnosis](references/perceptual-diagnosis.md).
- **System / composition:** component responsibility, semantic role, repeated pattern, token/style mapping, invariants, controlled variation, accepted exception, and propagation scope.
- **Accessibility-visible Design risk:** focus visibility, non-color meaning, target relation, text/reflow pressure, motion/occlusion, and perceivable state. Do not turn visible-risk review into formal accessibility conformance.
- **Outcome:** supplied usability/behavior evidence that can confirm or contradict the Design proposition. Do not manufacture user evidence from intuition.

A lens is evidence/reasoning support, not a separate terminal owner.

## Classify the finding on independent axes

Locate **where** the issue lives:

- `UPSTREAM_PREMISE` — Product/behavior premise required by the Design claim is unsupported, stale, or conflicting at the available authority level;
- `DESIGN_CLAIM` — a Design premise/decision/inference is itself the challenged object;
- `DESIGN_MODEL` — journey, IA, interaction/state, content, component/system, or responsive model is incomplete/incoherent;
- `DESIGN_PROJECTION` — artifact/spec/prototype fails to preserve an otherwise supported Design model;
- `IMPLEMENTATION` — implementation diverges from supported current Design truth;
- `EXPERIENCED_OUTCOME` — supplied outcome evidence contradicts the expected consequence even though preceding realization may be internally coherent;
- `EVIDENCE` — evidence/authority is insufficient to locate or support the material claim.

Then state the **condition** that matters: `UNSUPPORTED | ERROR | OMISSION | CONFLICT | DIVERGENCE | EMERGENT_FAILURE | TRADEOFF | POLISH | INSUFFICIENT | UNKNOWN`.

Do not force impossible combinations. The axes exist to separate “where it broke” from “how it is wrong.” Preserve `UNKNOWN` when evidence cannot discriminate.

## Determine scope and causal ownership

When the issue has a realization/system component, classify scope as:

- `LOCAL` — one candidate/consumer/projection is wrong while the shared role/system is sound;
- `REPEATED_PATTERN` — several surfaces repeat the same non-canonical local pattern;
- `SYSTEMIC` — a shared Design decision, component/role, token/style, interaction rule, or layout/system invariant causes the issue across valid consumers;
- `UNKNOWN` — evidence cannot distinguish local/shared/system cause.

Distinguish visible evidence from causal evidence. A screenshot may prove that hierarchy fails; it rarely proves by itself that a shared component/token is the causal owner. Test the strongest plausible local-versus-shared explanation before widening scope.

## Authority and continuation

Apply these boundaries strictly:

- **Challenge does not grant ownership.** You may mark approved Design truth as needing reconsideration, but it remains approved until its accountable owner supersedes it.
- **Unsupported upstream is not disproven upstream.** State the dependency and missing/contradictory evidence; keep the decision with the real Product/research/requirements authority. If the same session can gather the missing evidence or obtain the decision, continue there and feed the bounded result back into this review without a handoff artifact.
- **Review is not redesign.** State the failed relation, trade-off, correction intent, constraints, and falsifier; author a replacement only after the terminal job explicitly moves to `product-design`.
- **Review is not conformance acceptance.** If the terminal job is exact implementation PASS/FAIL against approved Design, use `verify-quality` with bounded visual-conformance scope. In one capable session this is a capability transition, not a handoff; a Design Review finding may be context but is never inherited acceptance.
- **Review is not source repair.** When supported Design truth is correct and implementation diverges, return the exact relation/evidence to the active job. If the user also requested repair and the same session has the needed engineering capability/authority, continue there without a handoff artifact; do not invent source-level causes without source evidence.
- **Review is not release/UAT authority.** `BLOCKING` means blocking the declared Design expectation or task relation, not release approval.

## Evidence discipline

Use evidence that can change the claim. Existing exact artifacts, specs, screenshots, runtime observations, source/system truth, research, or supplied outcome evidence are preferable to repeated acquisition.

Use `visual-capture` only for missing/stale/invalid visible evidence. Use `design-intelligence` only when precedent/comparison can change a Design judgment; precedent never becomes Product truth, canonical Design authority, or a QA verdict by frequency.

When several plausible causes remain, ask for or inspect the **discriminator**, not more generic evidence. Example: if a recovery action looks weak, inspect semantic action ownership before prescribing stronger color; if a page hierarchy collapses only after repetition, inspect part/whole composition before rewriting the component primitive.

## Completion

Return the smallest truthful state:

- `READY` — the declared Design claim/scope was independently reviewed with sufficient evidence; material node/edge challenges, earliest supported breaks, consequence, uncertainty, correction intent/owner, and re-review falsifiers are explicit.
- `PARTIAL` — useful Design judgment exists but a material authority/evidence/state/outcome/system check needed for the requested claim is missing.
- `BLOCKED` — the review subject, governing Product/behavior truth, or authority is too unresolved to make a valid Design judgment.

A clean result may say `NO_BLOCKING_DESIGN_FEEDBACK` for the reviewed Design scope. Never upgrade that statement into Design approval, QA/UAT/release PASS, or proof that unreviewed Product assumptions are correct.
