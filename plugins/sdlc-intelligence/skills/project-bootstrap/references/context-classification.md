# Context Classification

Use this reference when deciding where a project fact belongs or whether it should be persisted.

## Five dimensions

| Dimension | Ask | Typical failure if ignored |
|---|---|---|
| Authority | Who may define or change this meaning? | an observation overrides an owner decision |
| Scope | User, organization, host, project, subtree/component, provider, or session? | a local rule becomes global or vice versa |
| Volatility | Durable configuration or live observation? | stale runtime state becomes canonical truth |
| Consumer | Model instruction, host runtime, tool/provider, human/project process, or adapter? | data is stored where the real consumer never reads it |
| Canonicality | Authoritative, derived, compatibility projection, cache/snapshot, or unknown? | duplicate truth trees drift apart |

Classify all five together. A fact can be durable but non-canonical, or canonical but narrowly scoped.

## Treatment matrix

| Situation | Preferred treatment |
|---|---|
| Existing authoritative config already answers the question | Reuse it; repair only if authorized |
| More specific scoped instruction legitimately overrides a broader one | Preserve both scopes; do not flatten them into one profile |
| Two artifacts claim the same canonical meaning with unresolved authority | `BLOCKED`; reconcile ownership before writing |
| Missing durable fact with a clear owner/location | Add the smallest fact to that owner |
| Existing meaning is canonical elsewhere but agent discovery is weak | Add one bounded pointer/import instead of copying the truth |
| Configured provider/source preference | Persist only the durable preference/source identity |
| Live auth, tool availability, discovered actions, sandbox access | Discover at use time; do not persist as timeless truth |
| Operation permission/approval | Read the real host/project/owner authority; capability is not permission |
| Multiple systems need one durable normalized project view | Consider Profile v4 only if project explicitly chooses or needs it |

## Conflict pressure tests

- `AGENTS.md` says Linear and a subtree instruction says Jira only for one component: this may be valid scope specialization, not a global conflict.
- A README casually mentions Jira while the project-owned tracker configuration says Linear: authority and intent decide; file presence alone does not.
- A Profile says a connector is configured but the current connector is unauthenticated: keep the configured preference; report live access separately.
- A host permission setting allows writes while the project owner forbids production mutation: technical permission does not upgrade project authority.
- A browser was available yesterday: unless a freshness-bound observation artifact exists, re-discover it rather than trusting persisted availability.
