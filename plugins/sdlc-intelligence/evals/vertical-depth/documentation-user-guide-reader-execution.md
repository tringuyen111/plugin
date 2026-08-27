# User Guide Reader Execution — Frozen Supplemental Cases

Evidence-State: `NOT_RUN`

Frozen before v1.0.25 User Guide source mutation. These are behavioral evaluation inputs/expectations, not implementation prose.

## Reader/task/execution cognition

### UG-RE-01 — Procedure is a reader-state path, not a button dump
Prompt: "Write the support guide for unlocking a user account. Verified truth: open the user, choose Unlock, confirm; success is status Active."
Expected: establish the reader's starting state and success condition; write the shortest supported primary path; preserve the observable success (`Active`). Do not expand into screen inventory or invent extra checks.

### UG-RE-02 — Branch only on a discriminating condition
Prompt: "Write recovery guidance. Managed accounts must be recovered by the identity provider; local accounts can use Reset password. Account type is visible before action."
Expected: branch at the verified account-type condition before the divergent action. Do not interleave both paths or duplicate the entire procedure.

### UG-RE-03 — Consequential warning precedes the governed action
Prompt: "Document Delete workspace. Verified behavior: deletion is irreversible and removes all workspace data after confirmation."
Expected: place the supported irreversible consequence before the delete/confirm action it governs. Do not hide the warning after the step or invent backup behavior.

### UG-RE-04 — Unexpected observation causes bounded recovery
Prompt: "After Save, verified success is a green `Saved` state. If it does not appear, verified recovery is to correct validation errors shown inline; if none are shown, escalate with the request ID."
Expected: connect the expected observation to the next decision. When observed != expected, use the verified discriminating evidence/recovery; do not continue the happy path as if Save succeeded.

### UG-RE-05 — Known defect terminates unsupported recovery
Prompt: "The export action is broken in build 2.4.1; defect BUG-91 is open and there is no approved workaround."
Expected: state the fixed-point limitation and supported escalation/defect reference. Do not manufacture a workaround.

### UG-RE-06 — Multiple valid methods require a selection rule
Prompt: "Admins can create a token through UI, CLI, or API. The guide audience is first-time console administrators and the UI path is fully verified."
Expected: use the shortest faithful primary method for that audience or explain a material selection rule. Do not dump three equal procedures merely because all are valid.

## Information representation and delivery boundary

### UG-RE-07 — Existing Markdown source is native, so keep Markdown
Prompt: "Update this project's existing MkDocs page for resetting passwords. Stop after the source update."
Expected: update the project-native Markdown page; rendering/export is NOT_REQUIRED unless explicitly requested. Do not create a parallel bundle or custom HTML.

### UG-RE-08 — HTML target does not imply Markdown intermediary
Prompt: "Create a standalone HTML help page. This project already authors help pages directly in HTML and has an established build/preview path."
Expected: use the established HTML source/build/preview path. Do not manufacture Markdown as an intermediate representation or invoke a User Guide-specific Markdown renderer.

### UG-RE-09 — Project-native MDX target stays MDX
Prompt: "Add the onboarding guide to our Docusaurus docs. The repository uses MDX components for callouts and tabs."
Expected: author against the actual MDX convention and verify through the project-native docs consumer path when required. Do not down-convert to a portable Markdown bundle.

### UG-RE-10 — No real target yet: preserve semantic content, do not invent a rendering stack
Prompt: "Draft the content model and reader path for a future help guide; we have not selected the docs platform yet."
Expected: produce the requested semantic/information structure without selecting Markdown, HTML, CMS, or a renderer by convention.

## User Guide x Product Design boundary

### UG-PD-01 — Help-center spatial design is Product Design work
Prompt: "Redesign the help center shell: 150 articles, search, category navigation, responsive reading layout. The article content is already approved."
Expected owner: `product-design` for the unresolved Product/UI hierarchy/layout/interaction problem. `user-guide` may provide content/reader constraints but must not own the UI design.

### UG-PD-02 — Writing one help article does not require Product Design
Prompt: "Write a verified how-to page for changing a billing email in our existing docs template."
Expected owner: `user-guide`. Do not invoke Product Design merely because the result is eventually displayed in a UI.

### UG-PD-03 — Markdown parsing is neither User Guide nor Product Design cognition
Prompt: "Convert this Markdown file to HTML while preserving CommonMark headings, links, code blocks, and tables."
Expected: use the selected/native markup rendering tool or a narrow deterministic adapter. Do not treat this as User Guide authoring or Product Design/wireframe work.
