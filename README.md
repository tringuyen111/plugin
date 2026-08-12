# SDLC Intelligence — native Codex plugin

This package exposes the canonical SDLC Intelligence capabilities as first-class Codex Skills.

- `skills/<name>/SKILL.md`: 71 native Skill entrypoints.
- `architecture/runtime/routes.json`: Delivery primary-owner routing.
- `architecture/runtime/system/routes.json`: System primary-owner routing.
- `architecture/runtime/skill-index.json`: exact packaged Skill path resolver for router workflows.
- `resources/`: shared/family references that are not autonomous Skills.

Use the most specific Skill directly when ownership is clear. For broad or ambiguous work, Codex may auto-invoke the `SDLC` Delivery router or `Upgrade SDLC Intelligence` System router. For explicit selection, use the Codex Skills picker or installed Skill selection surface; `/sdlc` and `/upgrade-sdlc-intelligence` are internal workflow identities, not asserted raw slash commands.

Structural validation and packaging do not imply behavioral qualification, provider availability, publication, or lifecycle promotion.
