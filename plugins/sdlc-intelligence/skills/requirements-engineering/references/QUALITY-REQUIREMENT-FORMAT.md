# Quality Requirement Artifact

Use this projection only for a **governed canonical quality requirement** whose identity, revision, authority/source truth, and lifecycle are actually being persisted. For lightweight exploration or drafting, use the smallest useful quality claim from `SKILL.md` instead of manufacturing these fields.

```markdown
# <project-native requirement ID> — <quality requirement>

**Requirement identity:**
**Requirement revision:**
**Requirement maturity:** DRAFT | REVIEWED | APPROVED | SUPERSEDED
**Normative truth basis:** TARGET_AUTHORIZED | PROPOSED_OR_ASSUMED
**Category:**
**Requirement owner:**
**Authority / source identity / revision:**
**Effective / affected scope:**
**Supersedes / superseded by:**

> Preserve the project's real canonical identity (for example `NFR-31`) when it exists. Do not synthesize or rename an ID to `QR-*` merely because this Requirements branch is called Quality Requirement.

## Risk / value protected

## Quality claim

- Subject / population:
- Stimulus / condition:
- Environment / operating mode:
- Required response / invariant:
- Measurable or conformance boundary:
- Authority-backed assumptions:
- Unresolved target semantics:

## Current baseline observations (non-normative, optional)

Record only observations that materially inform the requirement. Keep provenance explicit and do not reuse a current value as the normative target without authority.

- Observation / evidence reference:
- Candidate / environment / time basis:
- What the observation establishes:
- What it does **not** authorize:

## Measurement semantics

_Use only when the quality claim is quantitative or signal-based._

- Signal / metric:
- Unit:
- Population / load:
- Statistic / aggregation:
- Observation window:
- Operating mode / environment:
- Authorized exclusions:
- Threshold / boundary source:
- Unresolved measurement semantics:

## Conformance semantics

_Use only when the requirement is standard/profile/invariant based._

- Standard / profile / rule-set identity:
- Version / level:
- Applicable scope:
- Authorized exceptions / applicability rule:
- Required conformance outcome:
- Unresolved conformance semantics:

## Category-specific semantics

Record only decision-material fields from `QUALITY-CLAIM-CONTRACT.md`, such as recovery start/end and data-integrity boundary, protected security/privacy scope, compatibility matrix, locale/time basis, or audit/observability event guarantee.

## Failure / degraded behavior (only if normative here)

Include only behavior that is itself part of this quality requirement. Link a separate Business Rule, Acceptance Criterion, or Use Case when the degraded/failure behavior has independent business semantics.

## Verification intent

| Evidence class | Broad environment / conditions | Falsifying or satisfying boundary | Known limitation / unresolved point |
|---|---|---|---|

> Keep this at requirement-owned evidence intent. `verify-quality` derives/executes the QA proof and verdict and can materialize a durable reusable condition artifact when needed.

## Canonical downstream references (links only, when real)

- Test-condition / executable probe record:
- Verification / QA evidence record:
- Waiver / risk-acceptance record:
- Release / operational decision record:

> Do not copy mutable PASS/FAIL/INCONCLUSIVE, verification execution status, waiver decision, or release state into this requirement artifact.

## Assumptions and caveats

## Change impact / linked stories, use cases, rules, design, tasks, and tests
```
