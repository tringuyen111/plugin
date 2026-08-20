---
name: visual-capture
description: Capture state-aware visual evidence from local HTML or a live application. Use when Design, QA, Documentation, or Engineering needs screenshots with explicit intent, environment, state, viewport, actions, callouts, PII masks, hashes, and a machine-readable manifest. Capture evidence without making a design or QA decision.
---

# Visual Capture



Own the visual-evidence workflow for the provider-neutral `browser.capture` capability. Use the deterministic local implementation in [`scripts/`](scripts/) when it is the known suitable executor. If several live sources could materially change fidelity, data boundary, or outcome, resolve the source choice from explicit user/project/provider evidence before capture. When `capability-resolver` is available it may supply that bounded selection evidence, but absence of that sibling Skill is not itself a blocker. A Project Capability Profile or Resolution Record is not a prerequisite for an obvious single-source capture.

This workflow owns the capture job, redaction policy, annotation intent, image
inspection requirement, and provenance handoff. Provider adapters own capture
mechanics. Neither layer owns visual judgment, Design approval, QA verdicts,
documentation structure, or release approval.

## Process

1. **Declare intent.** Choose `documentation`, `visual-conformance`, `design-parity`, or
   `evidence`. This controls how downstream owners interpret the artifact.
2. **Define the state matrix.** Name each route/surface, state, viewport, content
   stress condition, and source artifact. Do not capture only the happy path
   when error, empty, permission, loading, or responsive states are material.
3. **Protect credentials and PII.** Login fill values use environment-variable
   references or a storage-state path reference. Never place passwords or
   tokens in the job. Declare masks as strict objects with `required` and
   `expected_matches`; required redaction mismatches must fail the shot.
4. **Declare annotation and crop semantics.** Use box, number, or label
   callouts with exact visible-match expectations. Select viewport, full-page,
   element, or explicit clip capture. Labels requiring spatial association use
   a leader line.
5. **Bind the actual browser source.** When one suitable live executor is already clear, record its exact provider/source identity directly in the v4 job. When provider/source choice is materially ambiguous, resolve that ambiguity from authoritative current evidence before browser work. If a capability-resolution record was actually produced, bind its exact reference/hash plus the selected executor identity; otherwise record the direct selection evidence and selected executor identity without fabricating a record. If the available evidence cannot resolve a material ambiguity, remain `BLOCKED`/`PARTIAL` and name the missing truth rather than treating a missing sibling Skill as the problem. Never create a Profile or resolution record solely because capture is happening, and never silently substitute the local Playwright adapter for another selected source.
6. **Validate before browser work.** Always validate the v4 job and exact executor identity. When a capability-resolution binding is present, reopen the exact record, recompute its raw-byte SHA-256, require admissible `browser.capture` READY/AVAILABLE truth, and match provider/source identity to the executor; a supplied missing, tampered, partial, unavailable, or mismatched record fails before browser work. In direct local mode, the local adapter's exact executor identity is the provenance boundary. Then reject duplicate slugs, invalid viewports, unsupported fields, unsafe login values, malformed capture modes, or other contract mismatch before execution.
7. **Run capture in an explicit environment.** Record application commit, environment, route/source, actions, state, viewport, and bound browser source. The executing adapter/provider translator must emit the actual executor identity into manifest v4; the local adapter also records provider version and adapter SHA-256 when available. The adapter must not install dependencies silently.
8. **Inspect images, not only the command result.** Open representative images,
   verify the intended state, masks, annotations, viewport, clipping, and font
   rendering. An API or process exit code is not visual proof.
9. **Inspect manifest v4.** Confirm actual executor provider/source identity, provider version, adapter SHA-256 when applicable, image hashes, resolved mask/callout counts, boxes/placements, capture mode, warnings, failures, skipped captures, source mapping, and state coverage. When a Resolution Record was used, also confirm its exact reference/hash remains bound. Schema/provider examples alone do not prove availability of a non-local provider path; only live provider-specific execution evidence may support that claim.
10. **Return bounded evidence to the active job.** Capture does not decide meaning. If Design Review, `verify-quality` visual conformance, User Guide, or Engineering is also material to the user outcome, the same capable session may continue there without a handoff artifact.

## Completion

`READY` requires a valid v4 job, an exact executor that the chosen implementation can actually execute, captured and visually inspected images, and a schema-valid v4 manifest preserving current executor provenance, image hashes, resolved selectors/placements, and no failed required mask or callout expectation. If a Resolution Record was supplied because provider selection was material, its exact bytes/digest and READY/AVAILABLE provider-source match are additionally required and must remain fixed-point valid through handoff. Direct local execution does not require a synthetic resolution record. Missing browser dependencies, an unexecutable selected non-local source, a supplied stale/tampered/partial resolution, exposed secrets/PII, or failed required redaction/annotation keeps the result `BLOCKED`/`PARTIAL`; capture evidence never upgrades provider-selection or operation-authority truth.
