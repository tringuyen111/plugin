# SDLC Intelligence 1.0.0 — release and migration notes

## Upgrade from 0.10.0

- Plugin identity remains `sdlc-intelligence`; all 71 first-class Skill identities are preserved.
- `sdlc` and `upgrade-sdlc-intelligence` change from explicit-only to implicit-visible so broad Delivery/System requests have a live routing entrypoint.
- No domain-group wrapper or portable `sdlc-intelligence` mega-router is reintroduced.
- Skill-picker descriptions are complete/non-ellipsized and `interface.defaultPrompt` is normalized to an array.
- Compact runtime provenance is package-local where upstream maintainer documents are not shipped.
- Frontend design-token generation now accepts both the existing layered schema and the documented generic W3C DTCG token document; no project token/data migration is performed automatically.

For a local Codex installation, refresh/reinstall the plugin through the configured marketplace so the plugin cache consumes the 1.0.0 package. No database, project source, or user-data migration is required by this release.

## Rollback

Rollback is package replacement, not an in-place data operation: reinstall the preserved 0.10.0 distributable whose SHA-256 is `207b41f47a1283f72eace75174abd8eafe107c4466d7e4bf8101941998221611`. No automatic rollback is performed and no external marketplace publication is implied.

## Assurance boundary

Routing behavior qualified as `DIRECTIONAL_PASS` under `SANDBOX_PROCEDURAL_COMPARISON`; independent Codex-model attestation is not claimed. External publication remains `NOT_RUN`.
