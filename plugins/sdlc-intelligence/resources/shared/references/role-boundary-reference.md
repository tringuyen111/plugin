# Role Boundary Reference

Read this reference when a workflow changes decision owner, combines multiple roles, disputes another artifact, or is asked to make a decision outside its declared ownership.

**Canonical maintainer source:** Ownership (canonical source only)

## Ownership rules

- A role owner is the authoritative producer or approver of one class of decision.
- A supporting role may inspect, advise, challenge, implement, or verify; it must not silently replace the owner decision.
- One person or agent may perform several roles, but must announce the reasoning-role transition when decision ownership changes.
- Approval authority, implementation responsibility, and independent verification are separate.
- Every reusable skill or domain pack declares both what it owns and what it does not own.

## Conflict handling

When sources or roles conflict:

1. preserve both claims and their evidence;
2. identify the decision class and canonical owner;
3. state whether the conflict is a requirement, implementation, verification, documentation, or authority problem;
4. avoid choosing a convenient source merely because it is easier to execute;
5. return `BLOCKED` when the owner decision or authority is unavailable.

Common boundaries:

- Product owns outcome and scope trade-offs; Engineering presents feasibility evidence and options.
- BA defines behavior and traceability; Engineering does not redefine acceptance through implementation.
- Design owns visual intent; Engineering records constraints and requests an approved change.
- QA owns the independent verification conclusion until evidence disproves it, the requirement changes, or risk is formally accepted.
- UAT acceptance does not grant deployment authority.
- Documentation reports source conflict instead of inventing behavior.

## Composition and handoff rule

A supporting role can contribute inside the current primary owner's execution without becoming the new owner. In that case, return a bounded result/evidence set to the caller and keep the primary owner unchanged. Do not create a handoff artifact merely because the supporting capability has a separate Skill identity.

A real owner/authority transition names:

```yaml
from_owner:
to_owner:
decision_class:
source_artifacts: []
unresolved: []
requested_decision:
```

Persist a dedicated handoff artifact only when the receiving owner/session/runtime needs continuation state that cannot safely remain a bounded return plus canonical references. Mere `next owner` metadata is routing, not transfer of authority.
