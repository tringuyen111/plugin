---
name: manual-review
description: Review a User Guide outline or completed page set for source coverage, task-based structure, Diátaxis separation, Every Page Is Page One, audience fit, current screenshots, and unsupported claims. Use inside the User Guide workflow before outline approval or publication; do not edit product behavior or infer missing facts.
---

# Manual Review
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Review one fixed User Guide outline or page set. Read [REVIEW-FORMAT.md](REVIEW-FORMAT.md). The reviewer reports findings; the User Guide owner applies approved corrections.

## Inputs

- audience, language, scope, and fixed product state;
- outline or page bundle;
- source inventory and Open Questions;
- current runtime/QA evidence;
- screenshot manifests and images when pages use visuals;
- known limitations and preview/release status.

## Review dimensions

1. **Source support.** Every proposed page and concrete claim has a trustworthy source. Unsupported limits, messages, permissions, or recovery steps are BLOCKING.
2. **Coverage.** Source-supported reader needs are represented: concepts, getting started, main tasks, reference, troubleshooting, FAQ/glossary as appropriate. Do not demand pages for behavior absent from the source.
3. **Task orientation.** How-to titles start with actions and pages help readers finish work rather than tour screens or APIs.
4. **Content-type separation.** Tutorial, how-to, reference, explanation, and troubleshooting are not mixed into one page.
5. **Standalone readability.** Each page establishes context, prerequisite, purpose, and links without assuming earlier reading.
6. **Audience fit.** Language matches the named user/operator/support audience, explains necessary terms, and avoids irrelevant implementation detail.
7. **Operational truth.** Error and recovery guidance matches verified behavior and does not disguise defects.
8. **Visual currency.** Screenshot fixed point, state, viewport, hash, PII masks, callout placement, and source match are current. Capture success alone is not sufficient; images must be opened and inspected.
9. **Navigation and grouping.** Order follows reader intent; duplicate pages are merged and over-broad pages are split.
10. **Staleness and publication.** Changed source artifacts mark affected pages stale; preview behavior is labelled; publication authority is explicit.

## Boundaries

Do not:

- redefine Product scope, BA behavior, Design, or implementation;
- perform QA or UAT;
- edit target pages while acting in the reviewer role;
- request information already present in the source inventory;
- flag a missing page without a source-supported reader need;
- approve unresolved BLOCKING findings.

## Completion

Keep three axes separate: workflow state, Manual Review verdict, and publication authority. The review verdict is Documentation domain output; it is not a Workflow Result state and it does not grant publication authority.

- A complete review returns workflow `READY` with review verdict `APPROVE`, `REVISE`, or `BLOCK`. A clean review may be `APPROVE`; a complete review that proves unsupported material exists may be workflow `READY` with review verdict `BLOCK`.
- Use workflow `PARTIAL` or `BLOCKED` when a required source, image, fixed-point fact, or owner decision prevents the review itself from being completed truthfully. In that case the review verdict is `UNRESOLVED`.
- Use workflow `FAILED` when the review artifact/process cannot be produced or trusted.

`APPROVE` means no review blocker remains under this review contract. It does not approve the outline or publication on behalf of the Documentation owner. If a warning is accepted, record the named Documentation owner decision; the reviewer must not self-waive an accepted warning.

Always state unreviewed pages, missing sources, missing image inspection, fixed-point limitations, review verdict, and any separate publication-authority decision.
