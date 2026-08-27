# Project Capability Profile v4 Compatibility

Load this reference only when an existing Profile v4 is being reconciled/migrated or the project explicitly chooses Profile v4 for durable cross-system normalization.

Profile v4 is a compatibility artifact, not a universal prerequisite for other Skills.

## Preserve the boundary

- `project.id` is logical project identity; provider-specific IDs remain mappings.
- canonical truth locations come from project evidence or authorized owner decisions.
- configured provider/source preference is durable intent; it is not proof of current availability.
- live availability/authentication/discovered actions must be re-discovered when they matter.
- unresolved policy stays unresolved; `null` never means permission.
- do not invent decision classes, budgets, retention values, or policy defaults to satisfy the schema.
- `extensions.sdlc` is optional project-specific Plugin configuration, not universal project truth.

The current v4 schema still contains `environments[*].availability` and `policy.capability_execution`. Treat these as compatibility fields, not evidence that Bootstrap should create or refresh runtime control state. If the project does not authoritatively own a value, preserve truthful unknown/unresolved state rather than guessing. Do not expand their use to new consumers in this Skill.

## Existing profile reconciliation

When updating an authorized existing Profile v4:

1. preserve exact project identity and canonical-source provenance;
2. distinguish durable configured intent from observations that require fresh discovery;
3. preserve project-owned extensions without redefining them as core semantics;
4. keep migrations explicit and do not normalize opaque policy identifiers;
5. bind the candidate to the project's established `profile_revision` convention;
6. validate exact candidate bytes before persistence;
7. inspect persistence/postcondition when possible.

For v3 -> v4 compatibility, preserve existing protected decision-class strings byte-for-byte when mapping them into the v4 registry. Do not invent additional classes to make automated execution easier.

## Structural validation

Run:

```bash
python3 "<skill-dir>/scripts/validate_profile.py" "<candidate-profile.json-or-yaml>"
```

The validator resolves the bundled plugin schema and validates exact parsed candidate bytes. It proves structural conformance only. It does not prove freshness, provider access, project authority, or that Profile v4 was necessary in the first place.

## Issue-triage projection migration

Current Issue Triage does not define universal tracker workflow labels. Project-native tracker category/status/workflow is canonical when it exists; Profile v4 must not standardize `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, or `wontfix` as Plugin-owned semantics.

When reconciling an older Profile v4 that contains `extensions.sdlc.triage_roles`:

1. inspect the canonical tracker/project configuration that actually owns those mappings;
2. preserve any real project-native mapping there or in an already-authoritative project-owned configuration;
3. remove `extensions.sdlc.triage_roles` from the current Profile candidate rather than translating it into another universal Issue Triage state table;
4. if the project genuinely requires cross-system tracker normalization that no native owner provides, keep it in a clearly project-owned namespaced extension/configuration instead of making it a default SDLC control surface;
5. validate the migrated exact Profile bytes before persistence.

The current schema intentionally rejects the legacy standardized field so old and new intake semantics cannot silently coexist.
