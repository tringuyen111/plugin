---
name: manual-review
description: Review a fixed User Guide, help page, outline, or documentation bundle by simulating reader jobs, checking claim support and visual currency, diagnosing material reader failures, and returning a bounded Documentation verdict. Do not review code diffs, own Design or QA/UAT acceptance, edit the target while reviewing, or invent independence.
---

# Manual Review

Review one fixed documentation target and return reader-centered findings plus a Documentation review verdict. Review does not silently edit the frozen target, but if corrections are also authorized the same session may continue through the User Guide/documentation capability after freezing the review result; no handoff artifact is required. Read [Review Format](REVIEW-FORMAT.md) for the output contract.

A direct review can complete from the supplied target and the evidence actually needed to evaluate its claims. Do not require a Project Capability Profile, publication destination, QA report, or provider-selection ceremony merely because those artifacts/capabilities exist.

## Inputs

Bind only review-material context:

- audience, reader job, language, scope, and product fixed point;
- exact outline/page/bundle under review;
- source inventory or claim evidence needed by the reviewed content;
- images/manifests when visuals are part of the target;
- known limitations and preview/release status when they affect reader truth.

Missing evidence for one material claim may make that finding/verdict `UNRESOLVED`; it does not authorize guessing.

## Reader-task diagnosis

Before severity, reconstruct: **who is trying to do or understand what, with what prerequisite knowledge, and what observable success means**. Read [Reader-Task Diagnosis](READER-TASK-DIAGNOSIS.md) when the failure or correction lever is not obvious.

For each material finding preserve:

`reader job -> observed reader failure -> evidence -> cause scope -> correction lever -> affected set -> re-review evidence`.

Prefer one causal correction over many prose-level symptoms.

## Review dimensions

Use only dimensions material to the fixed target:

1. **Claim support** — material claims are actually supported at the stated fixed point; unsupported limits/messages/permissions/recovery are BLOCKING. When source roles conflict or the authoritative source is non-obvious, read [Claim Authority](CLAIM-AUTHORITY.md) and resolve the proposition by claim type rather than source availability.
2. **Reader coverage** — source-supported reader jobs are present; do not demand pages for behavior absent from authoritative truth.
3. **Task orientation** — procedures help complete work rather than tour screens/APIs.
4. **Content-type fit** — tutorial/how-to/reference/explanation/troubleshooting are separated when mixing harms the reader job.
5. **Standalone usability** — context, prerequisite, success, and links are sufficient without assuming a prior page was read.
6. **Audience fit** — language and detail match the named audience and avoid irrelevant implementation detail.
7. **Operational truth** — failure/recovery guidance matches supported behavior and does not disguise defects.
8. **Visual currency** — required images are tied to the correct fixed point/state/viewport and were actually inspected.
9. **Navigation/grouping** — information is findable by reader intent; duplicate/over-broad structures create no material ambiguity.
10. **Staleness** — changed evidence invalidates only affected claims/pages/visuals/review conclusions.

## Review method

1. Pick the reader job and success condition for the page/section.
2. Simulate the documented path using only stated prerequisites, steps, references, visuals, and recovery guidance.
3. Identify the first material reader failure or evidence gap.
4. Classify cause scope: local wording, page structure, navigation/grouping, stale/missing evidence, source/behavior conflict, or systemic documentation structure.
5. Choose the smallest correction lever that removes the cause without inventing product truth.
6. Mark the exact affected-page/evidence set and what must be re-reviewed after correction.
7. Assign severity and overall verdict only after the causal diagnosis.

## Evidence and independence boundary

A review run by the same authoring agent/session is a **structured self-review pass**. It may be useful evidence about the target, but it is not independent or attested review merely because this Skill was invoked.

Claim independent/attested review only when the project requires and actually provides the corresponding independent execution/governance boundary. Missing independence never prevents an ordinary direct Manual Review unless independence itself is part of the requested proof burden.

## Boundaries

Do not:

- redefine Product/Requirements behavior, Design, implementation, QA, or UAT;
- edit target pages while acting as reviewer;
- review a code diff merely because the user says “manual review” — use the appropriate code/review owner;
- request information already present in the fixed target/source inventory;
- flag a missing page without a source-supported reader need;
- self-waive an unresolved BLOCKING finding;
- convert review `APPROVE` into publication authority.

## Completion

Keep review process state, review verdict, independence status, and publication authority separate.

- Review process `READY` returns verdict `APPROVE`, `REVISE`, or `BLOCK`.
- Use process `PARTIAL`/`BLOCKED` with verdict `UNRESOLVED` when missing material source/image/fixed-point/owner input prevents a supported verdict.
- Use process `FAILED` when the review artifact/process cannot be produced or trusted.

`APPROVE` means no unresolved `BLOCKING` finding and no unaccepted `WARNING` remain under this Documentation review contract. A named Documentation owner may explicitly accept a warning within their authority; preserve that accepted warning in the review record. `APPROVE` never approves publication or Product behavior. State unreviewed pages, missing sources/image inspection, fixed-point limits, structured-self-review vs independent status, accepted warnings, and any separate publication limitation.
