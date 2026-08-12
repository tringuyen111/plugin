---
name: visual-capture
description: Capture state-aware visual evidence from local HTML or a live application. Use when Design, QA, Documentation, or Engineering needs screenshots with explicit intent, environment, state, viewport, actions, callouts, PII masks, hashes, and a machine-readable manifest. Capture evidence without making a design or QA decision.
---

# Visual Capture
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Own the visual-evidence workflow and request the provider-neutral
`browser.capture` capability. Resolve the selected browser source through the
Project Capability Profile and capability resolver, then execute the strict
adapter contract at `../../adapters/visual-capture` or an explicitly bound
MCP, connector, native browser tool, or API source.

This workflow owns the capture job, redaction policy, annotation intent, image
inspection requirement, and provenance handoff. Provider adapters own capture
mechanics. Neither layer owns visual judgment, Design approval, QA verdicts,
documentation structure, or release approval.

## Process

1. **Declare intent.** Choose `documentation`, `visual-qa`, `design-parity`, or
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
5. **Resolve and bind the browser source.** Request `browser.capture` through the capability resolver and require a schema-valid Resolution Record v4. Bind its exact `record_ref` and `record_sha256` into the v3 job, and copy the selected provider/provider-source identity into the job executor envelope. The executor identity must match the resolved provider/source before browser work; mismatch is `BLOCKED`/failed validation, never a silent substitution to local Playwright or another provider.
6. **Validate before browser work.** Validate the v3 job schema, resolution-record hash/binding, executor match, and runtime contract. Resolve duplicate slugs, invalid viewports, unsupported fields, unsafe login values, malformed capture modes, or provenance mismatch before execution.
7. **Run capture in an explicit environment.** Record application commit, environment, route/source, actions, state, viewport, and bound browser source. The executing adapter/provider translator must emit the actual executor identity into manifest v3; the local adapter also records provider version and adapter SHA-256 when available. The adapter must not install dependencies silently.
8. **Inspect images, not only the command result.** Open representative images,
   verify the intended state, masks, annotations, viewport, clipping, and font
   rendering. An API or process exit code is not visual proof.
9. **Inspect manifest v3.** Confirm the bound capability-resolution reference/hash, actual executor provider, `source_kind`, `source_id`, namespace/revision when applicable, provider version, adapter SHA-256 when applicable, image hashes, resolved mask and callout counts, boxes and placements, capture mode, warnings, failures, skipped captures, source mapping, and state coverage. A schema or provider example does not prove availability of a non-local provider path; only live resolution plus provider-specific execution evidence may support that claim.
10. **Hand evidence to the owner.** Design Review, Visual QA, User Guide, or
   Engineering decides what the evidence means.

## Completion

`READY` requires a valid v3 job, exact Resolution Record v4 reference/hash binding, executor identity matched before browser work, captured and visually inspected images, and a schema-valid v3 manifest whose actual executor provenance matches the selected capability resolution. The manifest must preserve provider/source identity, applicable revision/version/adapter SHA-256, image hashes, resolved selectors and placements, no exposed secrets/PII, and no failed required mask or callout expectation. If required browser dependencies or a selected non-local provider path are unavailable or unqualified, report `BLOCKED`/`PARTIAL` truthfully while preserving the validated job; schema/provider examples alone do not prove availability.
