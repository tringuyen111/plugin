# Skill Lifecycle

```text
DRAFT
→ REVIEWED
→ EVALUATED       # required for ASSURED promotion
→ PROMOTED
→ MONITORED
→ REVISED | DEPRECATED

Prompt-only OpenAI Skill exception:
DRAFT → REVIEWED → PROMOTED under SKILL_CREATOR_VALIDATED
```

## Gates

- `DRAFT` — artifact type and capability gap proposed; not active.
- `REVIEWED` — ownership, context, depth, composition, portability, safety, and maintainability accepted.
- `EVALUATED` — behavioral definitions exist and representative outputs were reviewed. `NOT_RUN`, `INCONCLUSIVE`, or a failed critical invariant blocks **ASSURED** promotion.
- `PROMOTED` — active manifest/routes/docs/package updated with version and migration evidence under one explicit promotion profile.

## Promotion profiles

- `ASSURED` — default. Requires the behavioral/evidence gates appropriate to the assigned assurance tier.
- `SKILL_CREATOR_VALIDATED` — maintainer-selected OpenAI prompt-only Skill profile. Requires `REVIEWED`, exact-byte OpenAI `skill-creator` validation/packaging, repository/portable structural checks, ownership/route coherence, and package/version/migration truth. Behavioral status may remain `NOT_RUN`; that status must remain visible and this profile must not claim demonstrated behavioral superiority, independent verification, production safety, or security assurance.

`SKILL_CREATOR_VALIDATED` is invalid when the artifact's bounded capability depends on executing a bundled deterministic script, adapter/provider operation, deployment/destructive action, or another runtime side effect whose correctness cannot be established by prompt/package validation.
- `MONITORED` — invocation misses, overlap, failures, context cost, and provider drift are observed.
- `REVISED` — meaningful correction returns through review and evaluation.
- `DEPRECATED` — removed from active manifest/routes, with replacement route, migration note, provenance, and removal plan.

Never leave deprecated sediment active merely to preserve history. Preserve provenance outside active discovery surfaces.
