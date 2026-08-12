# Capability-Gap Handoff

**Canonical maintainer source:** ADR-0001: Unified Delivery and System Planes (canonical source only)

Use this contract when project delivery exposes a reusable weakness or missing capability in SDLC Intelligence.

```markdown
# Capability-Gap Handoff

**State:** READY | PARTIAL | BLOCKED | FAILED
**Detected by:** <delivery workflow and project artifact>
**Project consequence:** <what cannot be completed or what recurring weakness occurred>
**Observed evidence:** <source/runtime/artifact/eval references>
**Existing capabilities considered:** <skills/references/adapters/composition>
**Candidate class:** skill | shared_reference | adapter | deterministic_tool | domain_pack | route | project_artifact
**Reusable boundary:** <what generalizes and what remains project-specific>
**Safety/authority constraints:** <writes, approvals, sensitive data, provider limits>
**Requested System route:** /create-skill | /audit-sdlc-artifact | /qualify-sdlc-capability | /create-integration | /create-domain-pack | /manage-skill-lifecycle
**Delivery status:** <why current project work is READY, PARTIAL, or BLOCKED>
```

The handoff is evidence, not automatic authorization to modify or promote the skill system. Do not create a shadow project task ledger. Link the project's canonical artifact and leave project status with its existing owner.
