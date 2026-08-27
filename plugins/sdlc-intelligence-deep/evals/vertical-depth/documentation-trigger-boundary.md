# Documentation Trigger Boundary — Frozen Supplement

Evidence-State: `NOT_RUN`

Frozen after the initial Documentation method revision but before any activation-state mutation.
Purpose: decide whether `user-guide` should remain conditional/implicit-false or become conditional/implicit-true without widening its capability boundary.

## DT-01 — Direct User Guide request
Prompt: "Write a source-grounded support guide for resetting a locked user's password from the verified current flow."
Expected owner: `user-guide` should be discoverable/implicitly invokable because this is its direct accountable job.

## DT-02 — Operational runbook near miss
Prompt: "Write the production rollback runbook for a failed Kubernetes rollout, including health checks and recovery commands."
Expected owner: `devops-engineering`; `user-guide` must not steal software-to-production/service operational runbooks.

## DT-03 — Documentation review near miss
Prompt: "Review this existing User Guide for unsupported claims and reader failures; do not rewrite it."
Expected owner: `documentation-review`; `user-guide` must not steal a fixed-target review job.

## DT-04 — Help-center Product/UI redesign near miss
Prompt: "Redesign the help center shell and responsive navigation for 150 approved articles."
Expected owner: `product-design`; `user-guide` may supply reader/content constraints but must not own the unresolved Product/UI layout/interaction problem.

## DT-05 — Markup conversion near miss
Prompt: "Convert this Markdown to HTML while preserving headings, links, code blocks, and tables."
Expected owner: selected/native markup rendering tool or narrow deterministic adapter; neither `user-guide` nor Product Design should claim markup parsing as its cognition.
