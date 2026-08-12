# Runtime Portability

Use this reference whenever filesystem, project-workspace, owner, collision, or write capability is not guaranteed.

## 1. Execution modes

### Workspace mode

Use only when a writable project filesystem is actually available.

Allowed behaviors when the runtime/project policy permits them:

- inspect `docs/` and existing brainstorm artifacts;
- resolve or verify feature/idea paths;
- create or update the single canonical brainstorm artifact;
- reopen a finalized brainstorm in place for revision;
- show material diffs when policy or the approval contract requires them.

A filesystem does not imply Git, hooks, credentials, provider access, or publication authority.

### Chat-only mode

Use when no durable writable project workspace is available.

- Preserve the same seven-part interview, no-re-ask behavior, exactness pressure, representation logic, epistemic states, quality gate, and L1 finalization semantics.
- Maintain one logical Markdown artifact in the conversation.
- If the host provides a mutable artifact/file surface, update the same artifact identity.
- If the host only creates immutable attachments, keep the working artifact logically in conversation and avoid producing a new Markdown attachment after every answer. Materialize at an explicit user request, meaningful checkpoint, or finalization.
- If a later immutable attachment must replace an earlier one, state that it supersedes the prior copy and treat only the newest logical artifact as current.
- Never claim durable repo persistence, path collision checking, hook execution, Git identity lookup, or downstream file updates that did not occur.

## 2. Living-artifact behavior

The brainstorm process has one current artifact identity per idea.

### Workspace

```text
resolve idea/path
→ create or resume docs/{feature}/brainstorms/{idea-slug}.md
→ status: working
→ consolidate each material answer in place
→ L1 finalization
→ status: finalized
→ optional later reopen of the same file
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

Keep one logical document state. Each time the user answers, update that same conceptual artifact. When showing the whole Markdown again, show the latest consolidated version rather than multiple competing copies. On immutable-attachment-only hosts, do not treat several generated files as concurrently current; replacement materializations explicitly supersede earlier copies.

## 3. Tagged and attached sources

- `@file` is valid only when the runtime can actually read it.
- Unreadable source → ask the user to attach/paste it; never infer its contents.
- Continuation → read the whole current brainstorm artifact before asking new questions.
- Missing current artifact → report missing context; do not rebuild from conversation memory and call it the same artifact.
- Image source → use vision when available and preserve source limitations.

## 4. Language selection

Apply the canonical output-language precedence in `SKILL.md` section 4. Runtime portability must not redefine or reorder that policy.

In either execution mode, keep one primary artifact language stable and preserve exact quoted strings, identifiers, proper nouns, and established technical terms when translation would reduce precision. Use `mixed` only for a real bilingual need.

## 5. Slug and collision truth

- Both modes may derive feature and idea slugs.
- Workspace mode may declare a collision only after inspecting the real path.
- Chat-only collision check is `NOT_RUN`; do not invent version suffixes.

## 6. Owner handling

- Use an explicitly known project/user owner convention when available.
- Do not require Git/shell/memory lookup.
- Unknown owner → `owner: TBD`; this does not block discovery.

## 7. Writes, changelog, and downstream impact

- Brainstorm invocation authorizes maintenance of the selected brainstorm artifact only to the extent project policy permits reversible local writes.
- L1 is finalization/handoff review, not approval before initial working capture.
- If local write policy requires a separate confirmation, follow the project policy without changing Brainstorm's semantic model.
- OQ resolution updates the same brainstorm artifact.
- Downstream artifacts may be read for impact verification when permitted, but Brainstorm never edits URD/BRD/PRD/SRS canonical truth.
- Update the brainstorm changelog for material changes; do not claim an unavailable hook performed it.

## 8. Truthfulness

Never report `checked`, `written`, `collision resolved`, `owner looked up`, `hook ran`, or `downstream updated` unless that operation actually occurred.
