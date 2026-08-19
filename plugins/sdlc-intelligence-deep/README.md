# SDLC Intelligence

A skills-only Codex Plugin for proportional SDLC judgment and focused engineering planning, engineering, product, design, QA, operations, documentation, and delivery expertise.

Created by **Trí Nguyễn**. The distributed package keeps the legacy technical ID `sdlc-intelligence-deep` for update/evidence continuity, while the user-facing product name is **SDLC Intelligence**.

`assets/icon.svg` is the canonical G3 personal-brand app icon from Trí Nguyễn Brand System v0.6.1. It acts as the publisher/personal-brand mark for this plugin; it is not a separate SDLC Intelligence product logo.

## Package model

`Host executes -> Plugin packages -> Skill owns capability`

- `skills/` contains 44 native Skills. Skill-specific methods, references, scripts, assets, and metadata stay with the owning Skill.
- `runtime/skill-state.yaml` is the maintenance registry for Skill implicit-invocation state; `scripts/skill-state.py` checks/applies that state.
- `evals/vertical-depth/` contains maintenance-only qualification cases. They are not runtime Skill context and do not count as behavioral PASS evidence until executed on an actual model/runtime.
- `assets/` contains Plugin presentation assets.
- `LICENSE`, `THIRD_PARTY_NOTICES.md`, `UPSTREAM.md`, and `licenses/` preserve distribution and third-party provenance.

The Plugin does not ship a custom agent runtime, central Delivery router, App, or MCP server. Codex performs native Skill discovery and execution.
