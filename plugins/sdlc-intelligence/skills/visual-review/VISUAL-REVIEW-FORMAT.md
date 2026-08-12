# Visual Review Format

```markdown
# Visual Review — <artifact/version>

## Fixed point
- Visual Contract / reference version:
- System/foundation reference when material:
- Implementation/design version:
- Environment:
- Capture manifest:
- States reviewed:
- Viewports reviewed:
- Material component roles reviewed:
- Unreviewed scope:

## Summary
- Verdict: NO_BLOCKING_DESIGN_FEEDBACK | REVISE | BLOCKED_BY_EVIDENCE
- Blocking:
- Warnings:
- Suggestions:

## Findings

### VR-<n> — <title>
- Severity: BLOCKING | WARNING | SUGGESTION
- Type: CONTRACT_CHANGE | IMPLEMENTATION_GAP | EVIDENCE_GAP | POLISH
- Surface / state / viewport:
- Expected contract or reference:
- Component role / characteristic when material:
- Primitive/token/system basis when material:
- Observed:
- User impact:
- Evidence path and SHA-256:
- Smallest coherent correction:
- Suggested owner:
- Suggested follow-up evidence:
- Confidence:
- Evidence limitation / what this review does not prove:

## Accepted differences

## Open decisions
```

Suggested correction, owner, and follow-up evidence are advisory inputs to the parent `/review-visual`; they are not a canonical correction handoff or re-review plan. Do not use a numeric score as a substitute for findings. Do not call the summary `PASS` because independent QA and acceptance have separate owners.
