---
name: creative-production
description: Create, revise, or art-direct bounded creative collateral such as logos, corporate identity, icons, campaign key visuals/posters, banners, social/marketing visuals, and slide visual direction using bundled local art-direction evidence and host-native generation only when available. Use for creative assets outside product-UI Design ownership; do not take over product UX/UI design, fixed Product/UI review, frontend implementation, technical architecture, or QA acceptance.
---

# Creative Production


Own creative collateral where the deliverable is a **logo, corporate identity/CIP, icon, campaign key visual/poster, banner/social/marketing visual, or slide visual direction**. Own creation, revision, creative brief/art direction and, only when requested and actually available, coordination of host-native generation. For a collateral type without a branch-specific corpus, use the general creative-direction model rather than forcing it into the nearest named artifact type.

Do not own product journey/state behavior, product UI Visual Contract approval, frontend code, technical architecture, QA acceptance, or external AI provider integration.

## Entry gate

Freeze the artifact branch, purpose, audience, brand/source constraints, required dimensions/format, and whether the user wants research/direction only or an actual generated asset. Missing reversible details may stay explicit assumptions; a missing irreversible brand/format decision keeps the result `PARTIAL` or `BLOCKED`.

A request to redesign an application screen/dashboard or define a Product UI icon/system role belongs to `/product-design`, not this capability. A fixed Product/UI critique belongs to `/design-review`; formal UI visual acceptance belongs to `/verify-quality` with visual-conformance scope; executable interaction learning belongs to `/prototype`; production frontend integration belongs to `/frontend-engineering`. A slide-file build must use the host presentation capability when available; this child owns slide visual direction, not a duplicate presentation engine. When an asset request names a product/web surface such as a hero or icon, distinguish standalone creative artwork from page/component/system composition before choosing the owner.

When direction is not already fixed by authoritative constraints, read [CREATIVE-DIRECTION-MODEL.md](CREATIVE-DIRECTION-MODEL.md) before selecting or refining a direction.

## Production loop

1. **Classify one branch.** Choose logo, CIP, icon, campaign/general collateral, banner/social, or slide visual direction. Use branch-specific references/data only when they actually match; campaign/general collateral can proceed from the Creative Direction Model without inventing a fake corpus match. Do not preload unrelated branch material.
2. **Derive success criteria before style.** Translate purpose, audience, message priority, brand/source truth, target context, required dimensions/format, accessibility/readability needs, and production constraints into a short criteria set. Distinguish hard constraints from preferences.
3. **Research only the active uncertainty.** Use the relevant local reference/data/search helper. Compose `/design-intelligence` only when broader style/color/type evidence can change the direction. Treat platform-specific dimensions, safe zones, ad policies, or performance claims as volatile: verify current authoritative constraints when material rather than treating bundled examples as canonical truth.
4. **Generate materially different directions when the choice is still open.** Vary a governing decision such as composition/focal strategy, information density, type/image relationship, or brand expression—not just color or ornament. If hard constraints already determine the direction, do not invent fake alternatives.
5. **Compare directions against the same criteria.** Explain what each viable direction optimizes, sacrifices, and risks in the target context. Prefer the direction best supported by the criteria, not the most fashionable one.
6. **Stress-test the chosen direction in target context.** Check crop/safe-zone behavior, small-scale readability, focal hierarchy, content/CTA competition, contrast, brand distinctiveness, and representative long/short content. A visually attractive canvas that fails target context is not ready.
7. **Refine the highest-leverage weakness.** Change the composition, hierarchy, density, type/image balance, asset choice, or message structure most responsible for the failure; avoid random polish that leaves the cause intact. Re-run the relevant stress test.
8. **Resolve generation capability.** If a final visual is requested and one exact authorized host-native image/presentation capability is already known, use it directly. Compose `/capability-resolver` only when materially different host/provider options must be selected. Never add an API key, SDK, remote provider, or external-generation fallback.
9. **Generate only when authorized and available.** Pass the frozen direction and exact artifact constraints to the host-native capability. If unavailable, return `BLOCKED`/`UNAVAILABLE`; a prompt alone is not a generated asset.
10. **Verify the returned artifact.** Confirm an actual artifact/reference exists, inspect it at target dimensions/context, and compare the result to the frozen criteria. Report limitations rather than inferring success from an attempted tool call.
11. **Handoff truthfully.** Keep approved product Visual Contract/brand/system truth authoritative where collateral intersects product surfaces.

## Local research examples

Resolve `<skill-dir>` to the directory containing this `creative-production/SKILL.md`; do not assume the host process current working directory.

```bash
python3 "<skill-dir>/scripts/logo/search.py" "tech startup modern" --design-brief -p "Brand"
python3 "<skill-dir>/scripts/cip/search.py" "tech startup" --cip-brief -b "Brand"
python3 "<skill-dir>/scripts/slides/search-slides.py" "metrics dashboard" -d layout
```

Load the corresponding file in `references` only for the active branch.

## Completion

`READY` means the requested direction is source-backed and any requested generated artifact was actually produced/verified through an available authorized host capability. `PARTIAL` means the direction is useful but a brand/format/approval/generation dependency remains. `BLOCKED` or `UNAVAILABLE` is required when generation was requested but no compliant host capability exists. Never claim completion from research or prompt text alone.
