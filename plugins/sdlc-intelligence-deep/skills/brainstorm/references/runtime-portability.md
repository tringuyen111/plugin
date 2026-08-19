# Runtime Portability

Use this reference whenever filesystem, project workspace, artifact structure/location, owner, collision, or write capability is not guaranteed.

## 1. Execution modes

### Workspace mode

Use only when a writable project filesystem is actually available.

Allowed behaviors when the runtime/project policy permits them:

- inspect the user/project-selected ideation location and existing brainstorm artifacts;
- detect an existing current artifact for the same idea;
- resolve or verify a compatible structure/path;
- create or update the single canonical brainstorm artifact;
- reopen a finalized brainstorm in place for revision;
- show material diffs when policy or the approval contract requires them.

A filesystem does not imply Git, hooks, credentials, provider access, publication authority, or permission to create a new project convention.

### Chat-only mode

Use when no durable writable project workspace is available.

- Preserve the same seven-lens semantic routing, no-re-ask behavior, exactness discipline, representation logic, epistemic states, quality gate, and L1 finalization semantics.
- Maintain one coherent **semantic brainstorm state** in the conversation; no file or Markdown representation is required.
- If the host provides a mutable artifact/file surface and durable materialization is useful, update the same selected artifact identity.
- If the host only creates immutable attachments, do not emit replacement attachments after every answer. Materialize only at explicit user request or a meaningful handoff/finalization checkpoint.
- If a later immutable attachment replaces an earlier one, state that it supersedes the prior copy and treat only the newest durable materialization as current.
- Never claim durable persistence, path collision checking, conditional patching, hook execution, Git identity lookup, or downstream file updates that did not occur.

## 2. Structure and location resolution

Use this precedence for durable artifact structure/location:

```text
explicit user/project rule
→ existing current artifact for the same idea
→ existing compatible project brainstorm/ideation convention
→ safe semantic structure inferred for this idea
→ Brainstorm fallback path/template
```

Do not ask the user to choose a file structure when one safe compatible choice is already evident. Ask one bounded question only when competing choices could create parallel truth, overwrite another artifact, or materially change downstream handoff.

The fallback path is:

```text
docs/{feature}/brainstorms/{idea-slug}.md
```

It is a Skill fallback, **not a globally canonical project location**. Read `naming-conventions.md` for slug/collision rules.

For a new artifact, prefer the project's existing semantic section order when it can preserve Brainstorm meaning. Otherwise choose the smallest useful structure; use `brainstorm-template.md` as fallback guidance rather than forcing every optional section.

## 3. Living-artifact behavior

The brainstorm process has one current artifact identity per idea.

### Workspace

```text
resolve selected structure/location
→ create or resume one current artifact
→ status: working
→ consolidate each material answer in place
→ L1 finalization
→ status: finalized
→ optional later reopen of the same artifact
```

Do not create workflow-stage siblings such as `draft`, `final`, `resolved-oq`, `v2`, or `new`.

### Workspace-safe write protocol

Before each durable update:

1. Read the current artifact and identify the exact semantic section(s) to change.
2. If the runtime exposes a revision, ETag, file hash, compare-and-swap, or conditional patch precondition, bind the write to that current revision.
3. Prefer a **narrow patch** to the affected section(s) rather than rewriting the whole file.
4. If no conditional-write primitive exists, re-read the artifact immediately before applying the patch.
5. If intervening edits are unrelated, rebase the narrow patch on the newest content and preserve those edits.
6. If intervening edits overlap the same semantic area and intent conflicts, do not overwrite. Keep the affected rule `UNRESOLVED`, show the conflict, and ask for resolution.
7. After a successful write, re-read the artifact and verify: the intended change is present, unrelated content remains, the artifact identity/path is unchanged, and no competing current file was created.
8. If post-write verification fails, report the write as unverified/failed and preserve the intended delta in chat for recovery; do not silently create a replacement file elsewhere.

### Chat only

Keep one coherent semantic state in conversation. Update the consolidated meaning as the user answers; do not require a document representation. If the user asks to materialize it, render the latest state in the selected target format rather than creating competing copies. On immutable-attachment-only hosts, replacement materializations explicitly supersede earlier copies.

## 4. Tagged and attached sources

- `@file` is valid only when the runtime can actually read it.
- Unreadable source → ask the user to attach/paste it; never infer its contents.
- Continuation → read the whole current brainstorm artifact before asking new questions.
- Missing current artifact → report missing context; do not rebuild from conversation memory and call it the same artifact.
- Image source → use vision when available and preserve source limitations.

## 5. Language selection

Apply the output-language discipline in `SKILL.md`. Runtime portability must not redefine that policy.

In either execution mode, keep one primary artifact language stable and preserve exact quoted strings, identifiers, proper nouns, and established technical terms when translation would reduce precision. Use `mixed` only for a real bilingual need.

## 6. Slug and collision truth

- Derive feature/idea slugs only when the selected convention needs them.
- Workspace mode may declare a collision only after inspecting the actual selected location.
- Chat-only collision check is `NOT_RUN`; do not invent version suffixes.
- Same-idea match → resume the existing artifact instead of creating a sibling.
- Different-idea collision → derive a clearer identity before considering version suffixes.

## 7. Owner handling

- Use an explicitly known project/user owner convention when available.
- Do not require Git/shell/memory lookup.
- Unknown owner → `owner: TBD`; this does not block discovery.

## 8. Writes, changelog, and downstream impact

- Brainstorm invocation authorizes maintenance of the selected brainstorm artifact only to the extent project policy permits reversible local writes.
- L1 is finalization/handoff review, not approval before initial working capture.
- If local write policy requires a separate confirmation, follow the project policy without changing Brainstorm's semantic model.
- OQ resolution updates the same brainstorm artifact and propagates dependent current meaning.
- Downstream artifacts may be read for impact verification when permitted; Brainstorm never edits downstream canonical Product/BA/technical truth.
- Update the brainstorm changelog for material changes; do not claim an unavailable hook performed it.

## 9. Truthfulness

Never report `checked`, `written`, `collision resolved`, `owner looked up`, `hook ran`, or `downstream updated` unless that operation actually occurred.
