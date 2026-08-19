# Research Source Authority

Use this reference when a research task depends on external, versioned, conflicting, or incomplete evidence.

## Authority is question-specific

A source is authoritative only for the claim it owns. Prefer the nearest owner of the fact:

1. governing specification, standard, law, contract, or approved project artifact;
2. official product, API, platform, or framework documentation for the applicable version;
3. first-party source code, schema, release note, changelog, issue, or runtime artifact;
4. peer-reviewed or otherwise accountable primary research and datasets;
5. direct statements from the responsible organization or maintainer;
6. secondary analysis only for discovery, interpretation, or comparison—not as a substitute for an available primary source.

Do not use this list mechanically. Runtime behavior may disprove stale documentation; a newer source may describe a different version; a project-approved decision may intentionally override a vendor default inside that project.

## Claim ledger

For each material claim, record:

```yaml
claim:
classification: FACT | INFERENCE | ASSUMPTION | OPEN_QUESTION
source_owner:
source_reference:
version_or_date:
scope:
evidence_excerpt_or_observation:
confidence: HIGH | MEDIUM | LOW
contradictions: []
```

- `FACT` is directly supported within the source's scope.
- `INFERENCE` follows from cited evidence but is not stated by the source.
- `ASSUMPTION` is temporarily adopted without sufficient evidence.
- `OPEN_QUESTION` remains unresolved and must not be converted into a conclusion.

## Conflicts and staleness

When sources disagree:

1. compare their owner, version, publication/update date, scope, and normative strength;
2. determine whether they truly conflict or describe different contexts;
3. preserve the disagreement when it cannot be resolved;
4. state which downstream decision is affected;
5. identify the smallest next source, experiment, runtime probe, or owner decision needed.

Never silently blend incompatible sources. Never present the newest publication date as automatically authoritative for an older deployed version.

## Completeness

Research is `READY` only when the declared question is answered to the required decision level, material claims are traceable, contradictions are resolved or explicitly out of scope, and the output/persistence action is truthful.

Use `PARTIAL` when useful findings exist but source coverage, freshness, version match, or persistence remains incomplete. Use `BLOCKED` when the required source, access, owner decision, or runtime evidence is unavailable and proceeding would create unsupported conclusions. Use `FAILED` when the attempted research artifact violates its declared evidence contract.
