# User Guide Context Precision — Frozen Representative Cases

Source: frozen against the exact v1.0.26 baseline before context-optimization mutation. These cases evaluate observable behavior and unnecessary ceremony; they do not require the model to reveal which internal files it loaded.

## UCX-01 — Simple task stays simple
Prompt: "Write a source-grounded three-step guide for enabling dark mode in the verified current UI. The exact labels and result are supplied. No screenshots, publication, review, or multi-page output."
Expected: produce the compact task guide from the supplied truth. Do not emit a reader-analysis worksheet, source ledger, bundle manifest, publication plan, review ceremony, screenshot workflow, or Product Design handoff.

## UCX-02 — Complex branch earns deeper execution reasoning
Prompt: "Write account recovery guidance. Managed and personal accounts diverge after the first step, and a missing recovery action has a verified permission check and escalation path."
Expected: branch on the supported visible discriminator and connect unexpected observation -> discriminating check -> recovery/escalation. Do not inflate the task into multi-page or Product Design work.

## UCX-03 — Source conflict re-enters only affected truth
Prompt: "Update this guide: the current UI screenshot conflicts with authoritative permission policy, and only two pages use the stale permission claim."
Expected: use the controlling authority for the permission claim, flag the visual conflict separately, and bound rework to affected claims/pages/visuals rather than invalidating the whole guide.

## UCX-04 — Existing screenshot: instructional judgment without recapture
Prompt: "Add this already inspected current screenshot to the reset-password step and point out the Reset button."
Expected: use the screenshot only if it improves recognition/orientation, define a minimal highlight/callout and place it near the relevant instruction. Reuse the supplied current image; do not require a new capture or Product Design.

## UCX-05 — Missing screenshot: compose capture only after visual intent
Prompt: "The current UI changed. Capture a fresh screenshot for the reset step, mask the email, and label the Reset button."
Expected: first establish the visual's instructional target/framing/annotation intent, then use Visual Capture for acquisition/provenance/masking/annotation execution. Do not turn capture mechanics into User Guide methodology.

## UCX-06 — Relationship problem prefers a diagram
Prompt: "Users understand the buttons, but keep misunderstanding how Parent, Workspace, and Project permissions inherit. Add a visual explanation."
Expected: prefer a relationship/hierarchy diagram or structured visual over an arbitrary UI screenshot because the learning problem is relational, while keeping decisive meaning available in text.

## UCX-07 — Overloaded screenshot is rejected
Prompt: "Put 11 numbered callouts on one full-screen settings screenshot so every field is explained at once."
Expected: reduce visual load by splitting/sequencing/cropping or moving exhaustive field detail to reference content. Do not equate more callouts with better instruction.

## UCX-08 — Help-center shell is Product Design
Prompt: "The 150 approved articles are correct, but users cannot navigate the help center on mobile. Redesign the sidebar, search, reading layout, and responsive hierarchy."
Expected owner: Product Design for the visible help/docs Product/UI surface. User Guide may provide reader/content constraints but must not absorb layout/interaction design.

## UCX-09 — Multi-page native target
Prompt: "Map these 30 approved task/reference topics into the repo's existing Docusaurus/MDX docs structure with shared navigation and source linkage."
Expected: use semantic bundle/IA reasoning and stay native to MDX/Docusaurus. Do not add a Markdown fallback/custom renderer.

## UCX-10 — Publication and review are not universal
Prompt: "Write one support article in the existing docs source. Do not review or publish it."
Expected: complete the requested authoring truth without Manual Review/publication ceremony unless a real project policy makes it required.
