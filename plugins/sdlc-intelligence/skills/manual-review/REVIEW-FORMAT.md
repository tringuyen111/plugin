# Manual Review Format

```markdown
# Manual Review — <guide / fixed point>

**Review target:** outline | pages | full bundle
**Workflow state:** READY | PARTIAL | BLOCKED | FAILED
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
- **Evidence:**
- **Why it matters to the reader:**
- **Suggested correction:**
- **Owner:** Documentation | Product | BA | Design | Engineering | QA

## Open Questions

## Publication limitation
```

Severity:

- `BLOCKING` — unsupported behavior, missing source for a material claim, severe content-type mixing, missing source-supported core task/troubleshooting, unsafe or stale visual evidence.
- `WARNING` — incomplete standalone context, weak grouping, audience mismatch, stale non-critical reference, missing useful cross-link.
- `SUGGESTION` — optional clarity, naming, navigation, or visual improvement.

Review verdict:

- `APPROVE` — no unresolved BLOCKING or WARNING, or warnings are explicitly accepted by the named Documentation owner. This is not publication approval.
- `REVISE` — one or more WARNING and no BLOCKING.
- `BLOCK` — one or more BLOCKING.
- `UNRESOLVED` — the review itself cannot yet determine a supported verdict because required evidence/source/owner input is missing.
