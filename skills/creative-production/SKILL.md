---
name: creative-production
description: Own bounded creative-collateral direction and production for logos, corporate identity, icons, banners, social visuals, and slide visual direction using bundled local art-direction evidence and host-native generation only when available. Use for creative assets outside product-UI Visual Contract ownership; do not take over product UX/UI design, frontend implementation, technical architecture, or QA acceptance.
---

# Creative Production
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or creative handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to distinguish generated, partial, blocked, unavailable, and unverified outcomes.
- **When the request overlaps product UX/UI, brand authority, Engineering, or QA:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce any required handoff.
- **Before any local/external write or generation side effect:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to verify authority and report the exact action/result.
- **Before selecting a host image/presentation capability:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve actual host/project capability instead of assuming a provider.
<!-- runtime-context:end -->

Own creative collateral where the deliverable is a **logo, corporate identity/CIP, icon, banner, social visual, or slide visual direction**. Own the creative brief/art direction and, only when requested and actually available, coordination of host-native generation.

Do not own product journey/state behavior, product UI Visual Contract approval, frontend code, technical architecture, QA/Visual-QA acceptance, or external AI provider integration.

## Entry gate

Freeze the artifact branch, purpose, audience, brand/source constraints, required dimensions/format, and whether the user wants research/direction only or an actual generated asset. Missing reversible details may stay explicit assumptions; a missing irreversible brand/format decision keeps the result `PARTIAL` or `BLOCKED`.

A request to redesign an application screen/dashboard belongs to `/design-experience` or `/design-visual`, not this capability. A slide-file build must use the host presentation capability when available; this child owns slide visual direction, not a duplicate presentation engine.

## Production loop

1. **Classify one branch.** Choose logo, CIP, icon, banner/social, or slide visual direction. Do not preload unrelated branch material.
2. **Research locally.** Use only the relevant references/data/search helper. Compose `/design-intelligence` when broader style/color/type/UX evidence materially strengthens the direction and the parent route permits it.
3. **Build the direction.** State concept, visual language, composition, color/type/icon treatment, dimensions/format, content constraints, accessibility/readability considerations, and unresolved choices. Tie recommendations to observed evidence rather than stylistic memory alone.
4. **Resolve generation capability.** If a final visual is requested, verify an authorized host-native image/presentation capability. Never add an API key, SDK, remote provider, or external-generation fallback.
5. **Generate only when authorized and available.** Pass the frozen direction and exact artifact constraints to the host-native capability. If unavailable, return `BLOCKED`/`UNAVAILABLE`; a prompt alone is not a generated asset.
6. **Verify the returned artifact.** Confirm an actual artifact/reference exists and inspect what can be inspected. Report format/dimension/content limitations rather than inferring success from a planned or attempted tool call.
7. **Handoff truthfully.** Keep approved product Visual Contract/brand/system truth authoritative where collateral intersects product surfaces.

## Local research examples

```bash
python3 scripts/logo/search.py "tech startup modern" --design-brief -p "Brand"
python3 scripts/cip/search.py "tech startup" --cip-brief -b "Brand"
python3 scripts/slides/search-slides.py "metrics dashboard" -d layout
```

Load the corresponding file in `references` only for the active branch.

## Completion

`READY` means the requested direction is source-backed and any requested generated artifact was actually produced/verified through an available authorized host capability. `PARTIAL` means the direction is useful but a brand/format/approval/generation dependency remains. `BLOCKED` or `UNAVAILABLE` is required when generation was requested but no compliant host capability exists. Never claim completion from research or prompt text alone.
