# Brainstorm Naming Conventions

This reference owns Brainstorm fallback naming rules. Project/user naming and location conventions take precedence when they already provide one compatible current truth.

## Resolution precedence

Before deriving a fallback path:

1. honor an explicit user/project artifact location or naming rule;
2. resume an existing current artifact for the same idea;
3. reuse an existing compatible project brainstorm/ideation convention;
4. only then apply the Brainstorm fallback path below.

Ask one bounded question only when competing choices could create parallel truth or an unsafe write.

## Feature slug

Use when the selected convention needs a stable feature/domain directory identity.

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

If the business noun phrase is genuinely unclear **and the selected path convention requires it**, ask one short clarification instead of inventing an arbitrary path.

## Idea slug

Use when the selected convention needs a stable idea filename/identity.

- Describe the specific idea delta/topic.
- Use lowercase ASCII kebab-case.
- Avoid repeating the full feature slug when a more specific name is available.
- Use `idea-{NNN}` only as a fallback when no meaningful slug can be derived.

Fallback examples:

```text
docs/authentication/brainstorms/google-oauth-login.md
docs/authentication/brainstorms/remember-me.md
docs/refund/brainstorms/partial-refund.md
```

## Collision

- Declare a collision only after a real check in the selected workspace location.
- If a matching path represents the **same idea**, resume that living artifact.
- If it represents a **different idea**, derive a clearer distinct idea slug first.
- Use `-v2`, `-v3`, etc. only when versioned identity is genuinely intended and supported by the project; never use it as a workflow-stage shortcut.
- Chat-only mode → collision check is `NOT_RUN`; do not invent a suffix.

## Brainstorm fallback path

Use only when no explicit/current/project convention owns location:

```text
docs/{feature}/brainstorms/{idea-slug}.md
```

This path is a portable Skill fallback, not a globally canonical repository structure.

One feature may contain several brainstorm ideas. One idea has one living artifact identity throughout working/finalized/reopened states.

Do not create workflow-stage siblings such as:

```text
idea-draft.md
idea-final.md
idea-resolved-oq.md
idea-new.md
```

Finalization changes artifact status, not artifact identity.
