---
name: user-guide
description: Create or update a source-grounded task-oriented user or operator guide from verified, released, or explicitly preview product behavior. Use when admins, support teams, operators, or end users need current guidance, troubleshooting, reference material, and screenshots without inventing undocumented behavior.
---

# User Guide
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Create a manual that helps a named audience complete real tasks against one fixed product state. Documentation explains supportable behavior; it does not define requirements, approve Design, perform QA, repair the product, or hide known defects.

Read [USER-GUIDE-BUNDLE.md](USER-GUIDE-BUNDLE.md). Use `/manual-review` before the outline approval stop and again when reviewing completed pages. Use shared `/visual-capture` for screenshots, callouts, masking, and provenance; do not duplicate its engine.

## Preconditions

Resolve:

- audience, language, scope, and intended environment;
- fixed released build, verified candidate, or explicitly labelled preview;
- approved Product/BA/Design artifacts relevant to the scope;
- current runtime evidence, QA reports, error behavior, and known limitations;
- canonical terminology and source locations;
- declared authoring scope: `OUTLINE_ONLY`, `REVIEWED_DRAFT`, or `PUBLICATION_READY`;
- output path, selected consumed artifact/output target, publication request state, and publication authority when publication is in scope;
- screenshot permission, PII policy, and available application states.

If a statement is unsupported or sources conflict, record `TBD` or an Open Question. Do not invent wording, limits, thresholds, permissions, messages, or recovery steps.

## Phase 1 — Source inventory and outline

1. **Fix the documentation point.** Record product version/commit, environment, scope, audience, language, and whether the guide is released or preview documentation.
2. **Inventory trustworthy sources.** Map each candidate page to runtime evidence and approved artifacts. Documentation and memory alone are not proof of behavior.
3. **Cluster by reader need.** Use Diátaxis internally:
   - explanation / concepts;
   - one successful getting-started tutorial;
   - task-based how-to pages;
   - reference;
   - troubleshooting;
   - FAQ and glossary when supported.
4. **Keep one content type per page.** Do not mix a tutorial path with a complete option reference or turn a reference table into a narrative.
5. **Use task titles.** How-to titles begin with an action such as “Create…”, “Approve…”, or “Recover…”, not a screen noun such as “Management page”.
6. **Make every page stand alone.** Each page establishes its audience, purpose, prerequisite, and relevant links without assuming the previous page was read.
7. **Run `/manual-review` on the outline.** Resolve BLOCKING findings and surface unsupported pages as Open Questions instead of writing guesses.
8. **Approval stop for full generation.** When the declared scope includes full manual generation, present the reviewed outline, audience, source gaps, visual plan, and proposed output before writing the full manual. Do not continue into full-page authoring until the user or authorized documentation owner approves that outline. For `OUTLINE_ONLY`, the reviewed outline itself may complete the declared scope. This stop is local to User Guide authoring, not a global file-write policy.

## Phase 2 — Author and verify

1. **Persist the approved outline.** Create the bundle index with each page marked `pending`, so a later session restores state from source rather than chat memory.
2. **Write gap-driven pages.** Use the page contract in `USER-GUIDE-BUNDLE.md`. Keep instructions observable and source-linked. Mark unsupported content `TBD`.
3. **Explain real failure behavior.** Troubleshooting uses verified symptoms, messages, causes, and recovery. A known defect is linked as a defect, not rewritten as user error.
4. **Capture current visual evidence.** Build a `/visual-capture` job for only the states needed by the guide. Record route, state, viewport, source/build, image hash, callouts, and PII masks. Capture is not Design approval or QA acceptance.
5. **Open and inspect output.** Confirm screenshots show the intended state, callouts do not cover important content, responsive layouts are readable, and the guide links resolve.
6. **Run `/manual-review` on completed pages.** Check source support, task orientation, content-type separation, standalone readability, current screenshots, terminology, and unresolved `TBD`s.
7. **Render or export the selected consumed artifact when required by scope.** Use the project documentation adapter chosen by project truth. Use the bundled HTML renderer only when HTML is the selected consumed artifact or an HTML proof is explicitly requested. For another output target, verify that selected artifact instead of forcing bundled HTML. Do not claim render/export success until the selected artifact opens or is otherwise inspected by its real consumer path.
8. **Update traceability.** Link pages to the released/preview behavior and mark stale pages when source, UI, AC, or error behavior changes.

## Completion

Keep these axes separate: workflow state, artifact maturity, publication state, and render/export state. The declared authoring scope determines which axes are required for this execution. Publication and render/export are not universal prerequisites.

- `READY` — the declared authoring scope is complete with source-grounded content and required review/evidence for that scope. An `OUTLINE_ONLY` result may complete with a reviewed outline. A reviewed draft may complete with workflow `READY`, artifact maturity `REVIEWED`, publication `NOT_REQUESTED`, and render/export `NOT_REQUIRED` when no publication or exported artifact was requested. `PUBLICATION_READY` additionally requires the selected consumed artifact to be rendered/exported and inspected as applicable, plus publication authority when publication is in scope.
- `PARTIAL` — useful documentation exists but a requirement inside the declared scope remains incomplete, such as source support, required review, requested screenshot evidence, selected-target render/export, or requested publication approval.
- `BLOCKED` — a required behavior/source/authority for the declared scope is missing or contradictory and the requested work cannot safely continue. Missing publication authority is not a blocker when publication was not requested.
- `FAILED` — an attempted generation, capture, selected-target render/export, persistence, or output validation failed such that the declared result cannot be trusted.

Report unsupported claims, stale images, unreviewed pages, preview-only behavior, artifact maturity, publication state, and render/export state explicitly.
