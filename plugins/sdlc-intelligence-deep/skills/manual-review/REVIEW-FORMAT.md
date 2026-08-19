# Manual Review Format

```markdown
# Manual Review — <guide / fixed point>

**Review target:** outline | pages | full bundle
**Review process state:** READY | PARTIAL | BLOCKED | FAILED
**Review verdict:** APPROVE | REVISE | BLOCK | UNRESOLVED
**Audience:**
**Product fixed point:**
**Sources inspected:**
**Pages/images not reviewed:**
**Publication authority / decision:**

## Summary

## Findings

### [BLOCKING | WARNING | SUGGESTION] <title>
- **Location:**
- **Reader job / success condition:**
- **Observed reader failure:**
- **Evidence:**
- **Cause scope:** local wording | page structure | navigation/grouping | evidence currency | source/behavior conflict | systemic documentation structure
- **Correction lever:**
- **Re-review evidence / affected pages:**
- **Owner:** Documentation | Product | BA | Design | Engineering | QA | Policy/Compliance | other named canonical owner

## Open Questions

## Publication limitation
```

Severity:

- `BLOCKING` — unsupported behavior, missing source for a material claim, severe content-type mixing, missing source-supported core task/troubleshooting, unsafe or stale visual evidence.
- `WARNING` — incomplete standalone context, weak grouping, audience mismatch, stale non-critical reference, missing useful cross-link.
- `SUGGESTION` — optional clarity, naming, navigation, or visual improvement.

Review verdict:

- `APPROVE` — no unresolved BLOCKING and no unaccepted WARNING remain. A warning may remain only when the named Documentation owner explicitly accepts it within their authority; preserve the accepted warning in the record. This is not publication approval.
- `REVISE` — one or more WARNING and no BLOCKING.
- `BLOCK` — one or more BLOCKING.
- `UNRESOLVED` — the review itself cannot yet determine a supported verdict because required evidence/source/owner input is missing.
