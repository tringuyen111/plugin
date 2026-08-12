---
name: verify-visual
description: Orchestrate fixed-scope Visual QA for one UI candidate under a declared QA separation mode by freezing the acceptance scope, building the required state/viewport matrix, acquiring and inspecting evidence, invoking reusable visual classification, recording defects, and issuing an evidence-backed verdict without redesigning or editing implementation.
---

# Verify Visual
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Act as the Visual QA verdict owner for one fixed implementation and visual acceptance scope under a declared separation mode. Sequential review by the same agent is procedural separation, not independent attestation. This workflow owns the coverage matrix, evidence acquisition and integrity, complementary-probe linkage, defect handoff, and overall Visual QA verdict. The supporting `/visual-qa` skill owns reusable per-state/per-viewport classification. Do not redesign the experience, edit frontend source, approve a new Visual Contract, grant UAT, or release production in this workflow.

Read [VISUAL-QA-REPORT.md](VISUAL-QA-REPORT.md). Use `/visual-capture` for
screenshots and manifests, `/visual-qa` for reusable judgment, and
`/defect-report` for verified deviations. Design `/visual-review` findings are
inputs, not inherited QA verdicts.

## Preconditions

Resolve:

- fixed implementation version, build, route, and environment;
- approved Visual Contract/reference and accepted Design decisions;
- related AC/NFRs and required state/viewport/content matrix;
- previous Design review findings and their resolution status;
- browser, data, permissions, flags, locale, fonts, and dependencies;
- authorized owners for any accepted visual difference.

If the reference is missing or disputed, route to Design. If the implementation
is moving or unavailable, report `BLOCKED` or `PARTIAL` and route to
Engineering. Do not choose a new design inside QA.

## Composition context

Declare exactly one composition context before complementary verification:

- `PARENT_QA` — `/verify-quality` invoked this Visual QA workflow for one bounded visual scope. Record every required non-visual complementary claim, its source, required evidence, and current status, then return those requirements or admitted evidence links to the parent. In this context Visual QA **must not recursively invoke `/verify-quality`** or create a second overall QA verdict.
- `STANDALONE` — no parent QA workflow owns the current execution. For any material keyboard, semantics, focus-order, interaction, animation, calculated-contrast, or other non-visual claim, define a bounded `/test-condition` request and hand off the next owner to `/verify-quality`. Do not nested-call the parent and resume recursively in the same rooted execution. Until required complementary evidence returns and is linked, remain `PARTIAL` or `BLOCKED` as appropriate.

In either context, `/verify-visual` owns only the Visual QA conclusion. Complementary evidence may be consumed once it is bound to the same candidate/reference/environment; it does not transfer overall functional QA ownership into this skill.

## Process

1. **Freeze the fixed point.** Record implementation and reference versions,
   environment, routes, states, viewports, content stress, and exclusions.
2. **Build the visual coverage matrix.** Derive it from the Visual Contract,
   UX states, AC/NFRs, breakpoints, real content boundaries, and release risk.
3. **Capture evidence.** Create `visual-qa` jobs for `/visual-capture`. Include
   exact state, viewport, actions, PII masks, application commit, and output
   manifest. Validate jobs before browser work.
4. **Inspect every required image.** Open images; check intended state, clipping,
   overflow, truncation, hierarchy, density, alignment, responsive
   transformation, content stress, and visible accessibility signals. A green
   capture command is not a Visual QA PASS.
5. **Resolve complementary probes without recursion.** Screenshots cannot prove keyboard behavior,
   focus order, semantics, contrast calculations, animation, or interaction.
   Under `PARENT_QA`, record the required claim/probe/evidence contract for the parent and consume only bound evidence it returns; never nested-call `/verify-quality`.
   Under `STANDALONE`, create a bounded `/test-condition` request and hand off to `/verify-quality` as the next owner rather than executing that parent recursively. Link returned evidence before closing the affected Visual QA condition.
6. **Apply `/visual-qa`.** Compare fixed reference and implementation, classify
   each state/viewport result, and separate defects from evidence gaps.
7. **Handle differences truthfully.** A difference is accepted only when an
   authorized Design/Product owner records the decision. QA cannot self-waive.
8. **Record defects.** Use `/defect-report` with exact state, viewport,
   reference, screenshot path/hash, impact, and re-verification target.
9. **Produce the Visual QA conclusion.** Derive and record workflow state, Visual QA verdict, and acceptance readiness separately; list unreviewed states and residual visual/accessibility risk.

## Visual QA conclusion and workflow closure

Keep these axes separate:

```text
workflow state:       READY | PARTIAL | BLOCKED | FAILED
Visual QA verdict:    PASS | FAIL | INCONCLUSIVE | NOT_RUN
acceptance readiness: READY_FOR_ACCEPTANCE | NOT_READY_FOR_ACCEPTANCE
```

Preserve matrix results exactly as observed. For required visual conditions, any `FAIL` yields Visual QA verdict `FAIL`; otherwise required `INCONCLUSIVE` yields `INCONCLUSIVE`; otherwise required `NOT_RUN` yields `NOT_RUN`; otherwise the verdict is `PASS`. A justified `NOT_APPLICABLE` does not worsen the verdict. An accepted visual difference must have an authorized Design/Product decision artifact; if that decision changes the acceptance reference, invalidate and re-evaluate affected rows rather than rewriting old evidence.

`READY_FOR_ACCEPTANCE` requires every required visual condition to be `PASS`, justified `NOT_APPLICABLE`, or closed against an authorized accepted-difference decision, plus every required complementary non-visual claim linked to admitted evidence for the same fixed point. Otherwise acceptance readiness is `NOT_READY_FOR_ACCEPTANCE`.

Derive the workflow state from execution truth, not candidate quality. A complete evidence-grounded mismatch can return workflow `READY`, Visual QA verdict `FAIL`, and acceptance readiness `NOT_READY_FOR_ACCEPTANCE`. Missing required state/viewport images or complementary evidence makes the workflow `PARTIAL` or `BLOCKED` as appropriate. Reserve workflow `FAILED` for a broken capture/evidence/report/side-effect contract or another failure of the Visual QA workflow itself.

## Completion

Workflow `READY` requires:

- fixed implementation and approved reference mapped;
- all required states/viewports captured and opened;
- evidence paths and image hashes recorded;
- contract, runtime-state, responsive, content-stress, and visible accessibility findings classified truthfully;
- complementary non-visual claims either linked to admitted evidence or explicitly reflected as unresolved in workflow state/readiness;
- accepted differences separated from defects and backed by authorized decision artifacts;
- Visual QA verdict, acceptance readiness, and unverified scope explicit;
- no Design, Engineering, overall functional QA, UAT, or Release authority silently assumed.
