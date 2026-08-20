# SDLC Intelligence

A Codex Plugin for proportional SDLC judgment, a thin native session operating kernel, and focused independent engineering, product, design, QA, operations, documentation, and delivery Skills.

Created by **Trí Nguyễn**. The distributed package keeps the legacy technical ID `sdlc-intelligence-deep` for update/evidence continuity, while the user-facing product name is **SDLC Intelligence**.

`assets/icon.svg` is the canonical G3 personal-brand mark from Trí Nguyễn Brand System v0.6.1 and is reused directly for Plugin presentation metadata; it is not a separate SDLC Intelligence product logo.

## Package model

`Host executes -> Plugin packages -> Skill owns capability`

- `skills/` contains 44 native Skills. Skill-specific methods, references, scripts, assets, and metadata stay with the owning Skill.
- `hooks/` contains the thin Codex `SessionStart` operating kernel. It is plugin-level convenience, not a dependency of any standalone Skill.
  Codex runs plugin hooks only after the user reviews/trusts the current hook definition; without hook trust, the Skills still work independently and only the session kernel is absent.
- `runtime/skill-state.yaml` is the maintenance registry for Skill implicit-invocation state; `scripts/skill-state.py` checks/applies that state.
- `evals/vertical-depth/` contains maintenance-only qualification cases. They are not runtime Skill context and do not count as behavioral PASS evidence until executed on an actual model/runtime.
- `assets/` contains Plugin presentation assets.
- `LICENSE`, `THIRD_PARTY_NOTICES.md`, `UPSTREAM.md`, and `licenses/` preserve distribution and third-party provenance.

The Plugin does not ship a custom agent runtime, central Delivery router, App, or MCP server. Codex performs native Skill discovery and execution. Skill activation is treated as bounded expertise inside the active user outcome, not as an organizational handoff; real cross-agent/session/runtime/authority transfer uses the dedicated Handoff capability only when needed. The lifecycle hook is Codex-specific; each bundled Skill remains complete without it and can be separated from the Plugin.
