---
name: review-visual
description: Orchestrate a Design-owned review of one fixed design artifact or implemented UI by resolving reference and evidence scope, invoking capture and Design judgment as needed, prioritizing findings, assigning correction ownership, and defining re-review targets without claiming independent QA acceptance.
---

# Review Visual
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Review what users actually see and return prioritized Design feedback.

This user-facing workflow owns the review fixed point, evidence orchestration, prioritized Design feedback, correction handoff, and re-review target. The supporting `/visual-review` skill owns reusable per-artifact Design judgment. This workflow does not own source edits, functional QA, business acceptance, or release approval.

## Preconditions

Resolve the review fixed point:

- an approved Visual Contract, Figma frame, or other reference;
- the exact implementation version or design artifact being reviewed;
- required states and viewports;
- the review question and intended audience.

If no visual direction exists, route to `/design-visual`. If the request is a
release-quality QA verdict, route to the QA workflow when available.

## Process

1. **Read the contract and current artifact.** Resolve exact versions and accepted
   differences. Do not compare a current implementation with a stale or draft
   reference without saying so.
   When a finding needs broader UI/UX precedent, compose `/design-intelligence`
   as supporting evidence only. It cannot convert taste or corpus guidance into
   a Design defect, QA verdict, or contract change.
2. **Invoke `/visual-capture` when runtime images are needed.** Declare
   `design-parity` intent when comparing against approved visual direction, or
   `evidence` when no parity claim is being made. Do not label Design-review
   capture as `visual-qa`. Capture relevant states/viewports, open
   representative images, and inspect the manifest. Capture alone is not review.
3. **Invoke `/visual-review`.** Evaluate hierarchy, layout, spacing/density,
   typography, components, content stress, state feedback, responsive behavior,
   accessibility-visible concerns, and parity characteristics.
4. **Ground every finding.** Link surface, state, viewport, contract/reference,
   observed image/hash, user impact, severity, confidence, and smallest coherent
   correction. Do not report taste as a blocking defect.
5. **Separate design changes from implementation defects.** If the contract is
   wrong, route to Design approval. If implementation diverges, hand feedback to
   Engineering. If evidence is missing, request capture rather than guessing.
6. **Prioritize feedback.** Fix comprehension, task completion, broken responsive
   transformations, inaccessible presentation, and cross-state inconsistency
   before decorative polish.
7. **Prepare re-review.** Name exact states/viewports to recapture and which
   findings the next evidence must close.

## Completion

`READY` requires a fixed point, opened evidence, state/viewport scope, grounded
findings, explicit limitations, correction ownership, and re-review targets. It
must not report QA PASS, UAT acceptance, or release readiness.
