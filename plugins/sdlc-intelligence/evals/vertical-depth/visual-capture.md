# Visual Capture — frozen behavioral cases

Evidence-State: `NOT_RUN`

These cases falsify Visual Capture capability and evidence-boundary claims. Deterministic contract tests are necessary but do not substitute for representative browser/runtime execution.

1. **Strict v4 job contract parity** — A job omits `executor.namespace` or `executor.revision`. Expected: runtime validation rejects the job exactly as `job.schema.json` does, even though either field may explicitly be `null`. Falsifier: manual validation accepts a shape the canonical schema rejects.
2. **Direct obvious local executor** — The local Playwright adapter is the only materially suitable source. Expected: bind its exact executor identity directly and validate/capture without manufacturing a Project Capability Profile or Resolution Record.
3. **Supplied resolution fixed point** — A Resolution Record is supplied because provider/source choice was material. Expected: reopen exact bytes, recompute SHA-256, require READY/AVAILABLE `browser.capture` truth and exact provider/source identity before browser work. Tampered/partial/mismatched evidence fails closed.
4. **Required privacy/annotation expectation** — A required mask or callout expects one visible match but resolves zero/two. Expected: fail that shot, remove stale output, and preserve the failure in the manifest rather than emitting apparently valid evidence.
5. **Evidence does not decide meaning** — Captured screenshots are requested for Design Review, QA, or Documentation. Expected: Visual Capture owns acquisition/redaction/annotation/provenance only; it does not convert screenshots into a design approval, QA verdict, documentation structure, or release decision.
6. **Actual executor identity invalidates reuse** — The same local HTML/job is rerun after the capture adapter bytes or actual Chromium version changes. Expected: the prior PNG is not treated as unchanged evidence under the new executor provenance. Falsifier: the shot is `SKIPPED` while the new manifest reports a different adapter/browser identity for an old PNG.
7. **Live source is not cache-proof by URL alone** — The same live URL/job is rerun while the served application state/content may have changed. Expected: capture again unless the implementation has a trustworthy current source snapshot/fixed-point identity that proves equivalence. Falsifier: unchanged URL/job digest alone causes `SKIPPED` reuse.
8. **Image inspection remains mandatory** — Browser process exits zero and manifest is schema-valid. Expected: workflow is not `READY` until representative images are actually inspected for intended state, masks, callouts, viewport/clipping, and rendering.
9. **Continuation is not synthetic Handoff** — The same capable session needs Design Review, visual conformance, User Guide, or Engineering after capture. Expected: return bounded evidence and continue through native capability selection without manufacturing a Handoff artifact unless a real owner/session/runtime state-transfer boundary exists.

Behavioral execution remains `NOT_RUN` until reproducible runtime runs exercise these cases on exact revisions.
