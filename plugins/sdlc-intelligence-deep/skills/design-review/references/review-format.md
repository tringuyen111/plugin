# Design Review Format

Use this shape for material Design-review results. Omit immaterial fields; never invent missing authority/evidence to make the report complete.

```markdown
# Design Review — <scope / candidate revision>

## Review subject
- Review question:
- Candidate / revision:
- Governing Product / behavior truth:
- Current Design truth / maturity:
- Material claim path reviewed:
- States / transitions / viewports / content / input / runtime conditions reviewed:
- Evidence / provenance:
- Supplied outcome evidence when any:
- Accepted differences / constraints:
- Unreviewed scope / unresolved authority:

## Summary
- State: READY | PARTIAL | BLOCKED
- Design result: NO_BLOCKING_DESIGN_FEEDBACK | REVISE | REOPEN_DESIGN_TRUTH | BLOCKED_BY_EVIDENCE
- Highest-impact challenged relation:
- Shared/systemic cause when supported:
- What this review does not prove:

## Findings

### DR-<n> — <title>
- Severity: BLOCKING | WARNING | SUGGESTION
- Locus: UPSTREAM_PREMISE | DESIGN_CLAIM | DESIGN_MODEL | DESIGN_PROJECTION | IMPLEMENTATION | EXPERIENCED_OUTCOME | EVIDENCE
- Condition: UNSUPPORTED | ERROR | OMISSION | CONFLICT | DIVERGENCE | EMERGENT_FAILURE | TRADEOFF | POLISH | INSUFFICIENT | UNKNOWN
- Scope: LOCAL | REPEATED_PATTERN | SYSTEMIC | UNKNOWN
- Material claim / node or edge challenged:
- Authority basis:
- Expected relation / consequence:
- Evidence / observed result:
- Competing explanation and discriminator when material:
- Earliest supported broken relation:
- User / Design / system consequence:
- Correction intent (not replacement design):
- Correction / resolution owner:
- Authority effect (e.g. approved truth remains until superseded):
- Re-review target / falsifier:
- Confidence / limitation:

## Accepted / supported relations

## Open Design decisions / upstream evidence needs

## Handoff
- Product / research truth to resolve:
- Product Design decision to reopen:
- Engineering divergence to correct:
- QA visual-conformance scope if explicitly requested:
- Missing evidence to acquire:
```

Do not use numeric scores as a substitute for reasoning. Do not call the summary `PASS`; Design approval, QA/UAT acceptance, and release authority remain separate.
