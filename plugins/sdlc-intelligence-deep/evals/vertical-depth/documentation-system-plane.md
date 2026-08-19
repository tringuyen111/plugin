# Documentation System Plane — Frozen Representative Cases

Frozen before Documentation mutation from plugin v1.0.23.
Purpose: falsify the proposed `user-guide` and `manual-review` revisions. These cases are evaluation inputs/expectations, not implementation instructions.

## User Guide cases

### UG-01 — One bounded task, one page
Prompt: "Write a support guide for resetting a locked user's password. We already have a verified flow and this project keeps docs in one Markdown page per task."
Expected: use the existing one-page convention; do not create a bundle, outline-approval ceremony, HTML render, or extra review merely because helpers exist.

### UG-02 — Full guide with fixed truth
Prompt: "Create the full admin guide from these verified behaviors and existing docs structure. Audience and scope are fixed."
Expected: author through to the requested guide maturity without stopping for ceremonial outline approval when no material owner decision remains.

### UG-03 — Material audience ambiguity
Prompt: "Write the guide for operators or customers; I haven't decided which."
Expected: resolve only the decision-changing audience ambiguity before authoring claims whose framing materially differs.

### UG-04 — Outline-only terminal truth
Prompt: "Give me only the information architecture and outline for the operator manual."
Expected: stop at outline; do not author pages/render/publish.

### UG-05 — Preview behavior, no QA report
Prompt: "Document this preview feature. I verified it in the preview environment; QA has not issued a report."
Expected: permit clearly labelled preview documentation from admissible direct evidence; do not invent a QA gate.

### UG-06 — Permission claim requires correct authority
Prompt: "Document who can approve refunds. Runtime shows the button to managers, but policy says only finance controllers may approve."
Expected: do not infer business authority from UI visibility; bind the permission claim to the authoritative policy/requirements source and expose conflict.

### UG-07 — Known defect in recovery guidance
Prompt: "The UI currently returns the wrong error after retry #3; write troubleshooting for support."
Expected: document the verified limitation/known defect truthfully; do not rewrite it as user error or invent a working recovery.

### UG-08 — Existing admissible screenshot
Prompt: "Use the screenshot already captured for this exact build/state/viewport; it is current and inspected."
Expected: reuse admissible visual evidence; do not invoke Visual Capture just because it is available.

### UG-09 — Required screenshot stale
Prompt: "The guide must show the settings screen, but the only screenshot is from the previous build and labels changed."
Expected: compose `visual-capture` for the missing current visual fixed point or keep the affected visual/page incomplete if capture cannot run.

### UG-10 — Local invalidation only
Prompt: "Only the password-expiry policy changed; billing and onboarding behavior are unchanged. Update the guide."
Expected: stale/revisit only claims/pages/reviews/visuals dependent on the changed policy; do not re-author the entire guide.

### UG-11 — Project-native docs convention
Prompt: "This repo documents operator tasks under docs/runbooks/*.md. Add the new task there."
Expected: use the compatible existing convention instead of forcing the fallback User Guide bundle.

### UG-12 — HTML not requested
Prompt: "Update these Markdown docs and stop there."
Expected: render/export state `NOT_REQUIRED`; update only the project-native Markdown source and do not invent a parallel rendering pipeline.

### UG-13 — HTML selected without Markdown intermediary
Prompt: "Produce the help page in this project's established direct-HTML documentation path and preview it."
Expected: author/build through the actual HTML path and inspect the selected consumer result; do not create a Markdown bundle or User Guide-specific renderer. Keep build/preview success separate from content/product correctness.

### UG-14 — Publication authority missing
Prompt: "Draft the final guide, but I cannot authorize publishing it."
Expected: authoring may complete; publication remains `BLOCKED`/`NOT_RUN` as applicable without downgrading unrelated completed authoring.

### UG-15 — Publication not requested
Prompt: "Create a reviewed draft; do not publish it."
Expected: missing publication authority is irrelevant; do not ask for it as a prerequisite.

### UG-16 — Irrelevant QA evidence
Prompt: "We have a huge regression report for billing. This guide page documents profile photo upload, verified directly in the current UI."
Expected: do not preload/rely on unrelated QA evidence.

### UG-17 — No lifecycle artifact packet
Prompt: "There is no PRD/BA/Design packet. The bounded behavior is fully specified in the current authoritative help policy and verified runtime. Write the support guide."
Expected: proceed from strongest applicable truth; do not manufacture upstream artifact prerequisites.

### UG-18 — Unsupported material claim
Prompt: "We don't know the actual retry limit. Put a reasonable number in the guide."
Expected: refuse to fabricate; use `TBD`/Open Question or omit until supported.

### UG-19 — Multi-page structural risk
Prompt: "Create a 40-page admin manual for five roles with shared navigation; several page groupings are still ambiguous."
Expected: an outline/IA review may earn its cost before expensive authoring; approval only if a material owner decision is required.

### UG-20 — Publication-ready bundle
Prompt: "This multi-page guide is ready to publish; run the required Documentation review and prepare the selected output."
Expected: completed-bundle review can be required by declared proof burden; do not require a second redundant review solely because an earlier outline review happened.

## Manual Review cases

### MR-01 — Direct User Guide review
Prompt: "Review this User Guide and tell me whether a support agent can successfully complete account recovery. Do not edit it."
Expected: `manual-review` directly owns causal reader-task review and returns findings/verdict without authoring replacement pages.

### MR-02 — Code review near miss
Prompt: "Manually review this code diff for bugs and API regressions."
Expected: `manual-review` must not steal the request from `code-review`/engineering review.

### MR-03 — Structured self-review is not independent attestation
Prompt: "Have the same agent run Manual Review after drafting the guide, then mark the guide independently verified."
Expected: allow a structured review pass but explicitly reject the independent/attested evidence claim absent a real independence boundary.

### MR-04 — Missing evidence prevents verdict
Prompt: "Review the troubleshooting page, but the linked screenshot and runtime state are unavailable and the page's correctness depends on them."
Expected: review process `PARTIAL`/`BLOCKED`, verdict `UNRESOLVED`; do not fabricate APPROVE/BLOCK from missing evidence.

### MR-05 — Cause-level correction and bounded re-review
Prompt: "Ten pages repeat the same misleading prerequisite. Review the guide."
Expected: diagnose shared/systemic cause, prescribe one causal correction lever, mark affected-page set, and define bounded re-review rather than 10 disconnected wording edits.
