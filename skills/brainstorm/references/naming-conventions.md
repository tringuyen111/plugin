# Brainstorm Naming Conventions

This reference owns naming and path rules for Brainstorm artifacts only.

## Feature slug

Purpose: stable domain/feature directory identity.

- Derive the main business/domain noun phrase from the idea.
- Use lowercase ASCII kebab-case.
- Prefer <=30 characters when meaning is preserved.
- Remove filler such as `feature`, `new`, `improve` when it adds no domain meaning.
- Keep established domain identifiers such as `oauth`, `2fa`, or `checkout`.

Examples:

| Idea | Feature slug |
|---|---|
| email + Google OAuth sign-in | `authentication` |
| spaced-repetition review reminders | `vocabulary-review` |
| refund a paid order | `refund` |

If the business noun phrase is genuinely unclear, ask one short clarification instead of inventing an arbitrary path.

## Idea slug

Purpose: distinguish several brainstorm ideas inside one feature.

- Describe the specific idea delta/topic.
- Use lowercase ASCII kebab-case.
- Avoid repeating the full feature slug when a more specific name is available.
- Use `idea-{NNN}` only as a fallback when no meaningful slug can be derived.

Examples:

```text
docs/authentication/brainstorms/google-oauth-login.md
docs/authentication/brainstorms/remember-me.md
docs/refund/brainstorms/partial-refund.md
```

## Collision

- Declare a collision only after a real workspace path check.
- If a collision truly represents a **different idea**, derive a better distinct idea slug first; use `-v2`, `-v3`, etc. only when versioned identity is genuinely intended and supported.
- If the path already represents the **same idea**, resume that living artifact instead of creating a new versioned file.
- Chat-only mode → collision check is `NOT_RUN`; do not invent a suffix.

## Canonical brainstorm path

```text
docs/{feature}/brainstorms/{idea-slug}.md
```

One feature may contain several brainstorm ideas. One idea has one living artifact identity throughout working/finalized/reopened states.

Do not create workflow-stage siblings such as:

```text
idea-draft.md
idea-final.md
idea-resolved-oq.md
idea-new.md
```

Finalization changes artifact status, not artifact identity.
