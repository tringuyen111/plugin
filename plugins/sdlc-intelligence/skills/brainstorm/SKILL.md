---
name: brainstorm
description: >-
  Shape a raw product or feature idea through deep elicitation into one living pre-canonical brainstorm artifact before Product, BA, or technical canonicalization. Use when the user explicitly invokes Brainstorm or an authorized orchestrator routes raw-idea articulation through BRAINSTORM_IDEA. Run a seven-part interview without re-asking known information, pressure vague values and wording toward concrete answers without fabricating, maintain one living Markdown artifact per idea, and choose representations by semantic shape such as numbered flows, ASCII diagrams, decision tables, state transitions, interrupted-transaction handling, scenario matrices, risks, and open questions. Brainstorm owns pre-canonical idea elicitation and articulation, not evidence-grounded Product opportunity judgment or downstream canonical product, business-analysis, or technical decisions.
---

# Brainstorm — Deep Interview + Clarify
## 1. Purpose and boundary
Turn a raw idea into a **living brainstorm artifact that exposes what is known, proposed, decided for this brainstorm, and still unresolved**.

The skill should help the user see:

- who experiences the problem and why it matters;
- what users do, what the system does, and what users see;
- important decisions, branches, states, interruptions, concurrency conflicts, and edge cases;
- validation rules, exact limits, quotas, and user-facing wording that need precision;
- assumptions, risks, success hypotheses, and open questions;
- which downstream owners may need to review an impact after the brainstorm changes.

The artifact may become behaviorally detailed when detail is needed to remove ambiguity. Depth does **not** make Brainstorm the canonical owner of PRD scope, URD/BRD requirements, or SRS technical design.

Use the 12 semantic sections defined in `references/brainstorm-template.md`. Render headings and prose in the selected artifact language rather than copying English labels mechanically.

## 2. One living artifact per idea
Read `references/runtime-portability.md` before resolving files, paths, owners, collisions, or writes.

Maintain exactly one current brainstorm artifact for one idea:

```text
idea identity
→ one living Markdown artifact
→ continuously consolidated during interview
→ reviewed/finalized in place
→ optionally reopened and revised in the same artifact
```

### Workspace mode
Canonical path:

```text
docs/{feature}/brainstorms/{idea-slug}.md
```

Once the idea identity and path are safe enough to establish, create or resume that file as `status: working` when the project/runtime permits the local write. Do not wait until the end of the interview merely to start recording the brainstorm.

After each interview section or material clarification, consolidate the new information into the **same file**. Update the semantic sections that changed; do not append a raw chat transcript.

### Chat-only mode
If no durable writable project workspace exists, maintain one **logical Markdown artifact** in the conversation.

- If the host exposes a **mutable artifact/file surface**, update that same artifact identity.
- If the host can only create **immutable attachments**, do not emit a new Markdown file after every answer. Keep the working state logically in conversation and materialize it only when the user explicitly asks for a file, at a meaningful checkpoint, or at finalization.
- If an immutable attachment must later be replaced, identify the new attachment as superseding the earlier copy and treat only the latest logical artifact as current.

Never claim a durable repo write, collision check, hook, or file update that did not occur.

### Single-current-truth rules
- Do not create `draft`, `final`, `resolved-oq`, `new`, `v2`, or parallel active brainstorm files merely to represent workflow stages.
- A feature may have several brainstorm **ideas**; each distinct idea gets its own stable artifact identity.
- Reopening a finalized brainstorm updates the same artifact in place and returns its status to `working` while revision is active.
- Replace superseded current statements after the user resolves a conflict; preserve traceability through stable OQ/decision references and changelog rather than retaining contradictory current truths.
- Before a durable update, use the workspace-safe write protocol in `references/runtime-portability.md`: prefer revision/hash/conditional patch preconditions when available; otherwise re-read immediately before a narrow patch, preserve unrelated user edits, stop on overlapping semantic conflicts, then re-read after write to verify the intended change.
- Do not duplicate the interview transcript into the artifact. Preserve consolidated meaning, provenance, decisions, unresolved items, and material change history.

## 3. Ownership and epistemic discipline
### Brainstorm owns
- eliciting and clarifying the idea;
- finding gaps, ambiguity, contradictions, missing values, and edge cases;
- proposing flows, rules, wording, states, limits, risks, and representations;
- recording decisions the user or authorized owner makes **within the brainstorm scope**;
- detecting downstream artifacts/owners that may need review.

### Brainstorm must not own
- canonical PRD scope or priority;
- canonical URD/BRD requirements;
- SRS architecture or technical design;
- silently editing URD/BRD/PRD/SRS when the brainstorm changes;
- promoting a brainstorm proposal into downstream canonical truth without that owner's decision.

### Epistemic states
Use these states in reasoning and surface them where confusion would matter:

- **OBSERVED** — explicitly supplied by the user or a source; not invented by Brainstorm.
- **PROPOSED** — suggested by Brainstorm for consideration.
- **DECIDED** — explicitly accepted by the user or authorized owner within the current brainstorm scope. It is not automatically canonical downstream.
- **UNRESOLVED** — missing, conflicting, deferred, or awaiting another owner's decision.

Do not label every sentence. Use labels or clear prose only where a reader might mistake a proposal for a fact or a brainstorm decision for downstream authority.

### Stable decision references
Use a stable `DEC-n` reference only for a **material accepted Brainstorm decision that may need later cross-section, changelog, OQ, or downstream-handoff reference**. Do not assign a decision ID to every `DECIDED` sentence.

Rules:

- Format: `DEC-1`, `DEC-2`, ...; before assigning one, scan the full current artifact and changelog, then use `max(existing DEC numbers) + 1`. Never renumber, reuse, or backfill a gap.
- `DEC-n` is distinct from decision-point row IDs such as `D1`, `D2`; a decision point describes a branch, while `DEC-n` identifies an accepted choice/rule.
- Attach the `DEC-n` to the current accepted statement in its most relevant semantic section. Other sections may reference that ID without duplicating the whole rule.
- If resolving an OQ creates a material decision, preserve both references, for example `OQ-3 resolved by DEC-7`.
- If a later decision replaces an earlier one, assign a new ID and record `DEC-new supersedes DEC-old` in changelog/traceability. Remove the obsolete rule from current truth rather than keeping both rules current.
- A `DEC-n` remains a Brainstorm-scope decision reference. It does not grant PRD/URD/BRD/SRS canonical authority.

## 4. Output language: adaptive, not hard-coded
Skill instructions are English-first because they are runtime guidance for the agent. **User-facing conversation and the brainstorm artifact are language-adaptive.**

Choose one primary artifact language using this precedence:

1. an explicit user instruction or `--lang` value;
2. the language of an existing brainstorm artifact being continued, unless the user requests a switch;
3. the intended audience language when clearly stated;
4. the dominant language of the target-idea content and current conversation;
5. the host conversation language when still ambiguous.

Then keep the artifact linguistically coherent:

- do not gratuitously alternate languages within headings or explanatory prose;
- preserve exact UI strings, legal wording, quoted source text, identifiers, proper nouns, and established technical/product terms when translation would reduce precision;
- a bilingual or mixed artifact is valid only when the user/audience genuinely needs it, not because the source contains incidental mixed-language examples;
- if the user changes the artifact language intentionally, apply the change consistently to editable prose while preserving exact quoted strings and identifiers.

Read `references/ba-conventions.md` for audience-facing language and representation guidance.

## 5. Core behavioral constraints
- **Seven-part deep interview** — ask one section at a time; do not dump the full deep interview into one batch.
- **No re-ask** — before every section, scan the idea source, prior answers, and the current brainstorm artifact. Ask only for missing or partial information.
- **Bounded exactness pressure** — re-ask a vague answer once with a concrete question. If it remains vague, record `TBD`/OQ; never fabricate a value or string.
- **IT-BA framing** — ask about business-visible behavior and information, not implementation internals such as table schemas, column types, function/service names, endpoint design, JWT/session strategy, hashing algorithms, SDK choice, or framework selection.
- **Complexity-triggered representation** — choose tables/ASCII/state views only when the information shape warrants them. Do not produce decorative artifacts.
- **L3 refinement** — a representation may receive up to three automatic review rounds. If the user still disagrees after round 3, keep it `UNRESOLVED`; never force acceptance.
- **L1 finalization** — L1 reviews the consolidated living artifact for finalization and downstream handoff. It is not a gate that prevents the skill from recording the working brainstorm during discovery.
- **Separate downstream ownership** — Brainstorm may detect and describe downstream impact but must not mutate downstream canonical artifacts.
- **Explicit-or-orchestrated invocation** — host implicit invocation is disabled in `agents/openai.yaml`; direct user selection or authorized orchestration owns activation.

## 6. Invocation
```text
/brainstorm
/brainstorm <idea text>
/brainstorm @<file-path>
/brainstorm <idea text> --lang <language-or-locale>
/brainstorm <idea text> --shallow
```

Examples:

```text
/brainstorm add spaced repetition to a vocabulary trainer
/brainstorm @notes/idea-2026-08-09.md
/brainstorm email login + Google OAuth
/brainstorm dark mode toggle --shallow
/brainstorm checkout recovery --lang vi
```

`--shallow` uses the bounded six-group interview in section 11.

## 7. Phase A — Resolve idea, artifact identity, and context
### A1. Resolve the idea source
- No argument → ask for the idea in one short prompt.
- `@file` → read the actual file when available; if unavailable, ask for attachment/paste rather than inventing its contents.
- Image source → use vision only when the image is actually available; record source limitations.
- Inline text → treat it as the idea seed.
- Continuation/revision → read the **entire current brainstorm artifact** before asking anything new.

### A2. Classify source roles before complexity detection
For long notes, transcripts, mixed documents, or tagged files, distinguish:

1. **target-idea claims** — statements that actually describe the idea under discussion;
2. **quoted examples** — examples or samples that do not automatically belong to the idea;
3. **instructions/templates** — process or formatting guidance;
4. **history/background** — prior context that may not define current behavior;
5. **metadata** — titles, tags, changelog, headers, control fields.

Only target-idea claims or user-confirmed interpretations may trigger mandatory complexity artifacts. A word such as `payment`, `OAuth`, `webhook`, `admin`, `pending`, or `lockout` appearing in an example/template is not sufficient evidence.

Read `references/keyword-detection.md` when source-role, language, decision, OQ, or complexity inference is material.

### A3. Derive stable artifact identity
- Feature slug: derive the main business/domain noun phrase, lowercase ASCII kebab-case, preferably <=30 characters without losing meaning.
- Idea slug: derive the specific idea delta/topic; avoid merely repeating the feature slug.
- Use `idea-{NNN}` only when a meaningful slug cannot be derived.
- In a real workspace, inspect the actual path before declaring a collision.
- In chat-only mode, collision checking is `NOT_RUN`; do not invent a `-v2` suffix.
- If the path cannot be established safely from the idea, ask the minimum clarifying question needed before the first durable write.

Read `references/naming-conventions.md` for details.

### A4. Select the artifact language
Apply section 4. Record the selected language in frontmatter. If continuing an artifact, keep its language stable unless the user intentionally changes it.

### A5. Create or resume the living artifact
When workspace write capability and policy allow it:

1. create the canonical file if it does not exist, using `references/brainstorm-template.md`;
2. or read and resume the existing file;
3. set/keep `status: working` while discovery or revision is active;
4. capture the faithful idea seed and known context immediately;
5. for every later durable update, follow the concurrency-safe narrow-write protocol in `references/runtime-portability.md`;
6. show the resolved working artifact path naturally so the user knows what is being maintained.

If durable writing is unavailable, keep the same logical artifact in chat and state that persistence is unavailable only when it materially affects the user.

The invocation authorizes maintenance of the selected brainstorm artifact only to the extent local project policy permits. It does not authorize source-control actions, downstream document edits, external communication, deployment, or unrelated writes.

### A6. Detect complexity semantically
After source-role classification, identify:

- `has_external_exchange` — OAuth, payment redirect, webhook/callback, or another external round trip that affects user flow;
- `has_async_flow` — background/scheduled work, callback, pending lifecycle, or completion outside one user action;
- `has_multi_role` — two or more roles/access modes with materially different behavior;
- `has_state_machine` — a business entity with governed states/transitions;
- `has_throttle_rules` — quota, rate limit, captcha, retry/lockout, or usage boundaries;
- `has_branching` — at least two material business paths.

Use these signals to select representations, not as user-facing status flags.

## 8. Phase B — Seven-part deep interview
### Before every section
1. read the idea seed/source;
2. read all prior answers;
3. read the current living artifact;
4. mark questions already answered;
5. ask only gaps or precise partial follow-ups.

Ask 2-5 questions at a time, then wait. After each section or material answer, consolidate the new information into the same artifact when durable writing is available. Never store a raw Q&A transcript as the canonical artifact.

### Section 1 — Overview
1. What does this idea let the user accomplish, in 1-2 sentences?
2. What specific pain/problem is being solved, and who experiences it?
3. Why now: request, deadline, market/user signal, process change, or other evidence?

Goal: establish problem + value before solution detail.

### Section 2 — Users and access
1. Which user groups/roles actually use or are affected by the capability?
2. What access/gating conditions matter: subscription, verification, role, entitlement, geography, account state?
3. Where does the user enter the experience: menu, button, deep link, notification, external redirect?
4. Is expected volume/usage important enough to affect business rules, cost, or operational handling?

Do not invent standard roles just because similar products usually have them.

### Section 3 — Core flow / happy path
For each material flow:

1. Walk through `user action → system behavior → user-visible result` step by step.
2. Identify distinct subflows such as new/returning, signup/login, upgrade/downgrade, first/retry.
3. Clarify the final visible outcome and any notification/email/message triggered.
4. Identify where the flow can branch even if the branch is not yet fully specified.

Preserve distinct flows rather than collapsing them into one long paragraph.

### Section 4 — Detailed behavior deep dive
Run the relevant subsections when complexity warrants them.

#### 4a. System actions at business level
For each business step, clarify what the system must do in business terms, for example:

- validate an email format;
- check whether an account already exists;
- create or update a business record;
- send a verification message;
- ask Google/Stripe/another provider to perform a business purpose;
- record an auditable business event.

Ask **what business information must be retained**, not table/column types. Ask **which external service and why**, not SDK/endpoint design.

#### 4b. Decision points
For every material branch, capture:

- the condition;
- the YES/true path;
- the NO/false path;
- state/result differences;
- calculation or business rule when one exists.

Do not leave a visible branch as `system handles it` without the rule or an OQ.

#### 4c. State transitions
When an entity has status/lifecycle, capture:

```text
entity: state A → state B → state C
```

For each transition ask:

- what triggers it;
- who/what may trigger it;
- whether it is reversible;
- what the user sees;
- what happens when the trigger fails or arrives late.

#### 4d. Interrupted transactions and concurrency
Mandatory when external exchange, async work, or pending state materially affects the idea. Ask explicitly:

1. If the user closes the browser/app mid-flow, what state remains and how can they resume?
2. If the external service fails or times out, what state remains, what can retry, and what does the user see?
3. If the user starts a new attempt while an old attempt is still pending, is it rejected, reused, cancelled, or allowed in parallel?
4. If a link/token expires, what becomes invalid, what remains, and what recovery path exists?
5. If two devices/users/actors perform the same action concurrently, what business rule decides the outcome?
6. What cleanup/TTL is required for abandoned or unresolved state? If unknown, keep it `TBD`/OQ rather than inventing it.

#### 4e. ASCII flow refinement (L3)
Mandatory when there is an external exchange, async flow, or at least two material branches.

Draft the diagram from confirmed/proposed behavior and show:

- user action;
- system action;
- decision and condition;
- external call/round trip;
- relevant data/state change;
- error/recovery path.

Ask the user to accept/correct it. Run at most three automatic refinement rounds. After round 3, disagreement remains `UNRESOLVED`; see `references/approval-gate.md`.

#### 4f. Scenario matrix
Use when roles or input states create multiple behavior combinations. Draft combinations from known context, then ask the user to confirm/correct only the uncertain rows.

### Section 5 — Validation, limits, and wording
1. What inputs are required, and what format/min/max rules matter?
2. What exact limits/quotas matter: X per minute/day, max Y items, Z retries, lockout after N failures, expiration after T?
3. What business rules or calculations govern acceptance/rejection and state changes?
4. What exact **error** messages should users see for important cases?
5. What exact **success** messages should users see?
6. What exact **informational/neutral** messages should users see?

Pressure vague answers once:

```text
"There is a rate limit" → "What exact limit and time window?"
"Show an error" → "What should the user see, exactly?"
```

Still vague → `TBD` + OQ. Preserve exact wording in the intended user-facing language even when the artifact's explanatory prose uses another language.

### Section 6 — System context at business level
1. What additional business information must be retained: device list, login history, subscription state, consent state, payment attempt state, etc.?
2. Which external services are required, and for what business purpose?
3. Which notification channels are needed and after which business events?
4. Is background/scheduled processing needed from a business perspective?
5. Is real-time behavior required from a user/business perspective?

Do not ask for database schemas, cron syntax, queue technology, websocket/SSE/polling choice, endpoint design, or framework selection.

### Section 7 — Edge cases, risks, and open questions
Cover what is material rather than mechanically asking every item:

1. lost connectivity mid-flow;
2. external service unavailable or slow;
3. concurrent actors/devices;
4. abandoned/pending transactions, TTL, cleanup, and resume;
5. permissions/account state changing during a flow;
6. duplicate submissions/retries/late callbacks;
7. top business risks: adoption, vendor, compliance, process, timeline, data;
8. remaining unknowns that deserve stable `OQ-n` IDs.

For risks, connect cause to business impact and mitigation; do not stop at a technical symptom such as `API slow` or `DB lock`.

## 9. Phase C — Consolidate representations and run the quality gate
Read `references/brainstorm-template.md` and consolidate the artifact. Select the representation that matches the information's semantics:

- numbered steps for ordered flows;
- ASCII only for complex branching/external/async flow;
- decision table for explicit conditions and paths;
- scenario matrix for role/state combinations;
- state transition table/diagram for governed lifecycle;
- interrupted-transaction table for pending/retry/TTL/concurrency behavior;
- separate wording groups for error/success/info strings;
- risk table for likelihood, business impact, and mitigation;
- OQ list for unresolved decisions.

Do not create empty decorative tables or diagrams just because the template contains an optional slot.

### Quality checklist before finalization
- [ ] Every material flow has numbered `user → system → visible result` behavior.
- [ ] Complex flows have an appropriate ASCII diagram when required.
- [ ] Material decision branches are explicit.
- [ ] Interrupted-flow behavior is documented when external/async/pending behavior exists.
- [ ] Role/state combinations are covered when they materially differ.
- [ ] Entity state transitions are mapped when governed statuses exist.
- [ ] Important limits/quotas are exact, proposed explicitly, or `TBD/OQ` — never vague pseudo-precision.
- [ ] Important user-facing error/success/info strings are exact, proposed explicitly, or `TBD/OQ`.
- [ ] Risks use business impact framing.
- [ ] OQs have stable IDs.
- [ ] OBSERVED/PROPOSED/DECIDED/UNRESOLVED distinctions are clear where authority could be confused.
- [ ] The artifact contains one current consolidated truth, not contradictory current versions or a raw transcript.

If gaps remain, offer the smallest set of follow-up questions that would materially improve the artifact. The user may still choose to finalize with visible `TBD/OQ`; quality may then remain `partial`.

## 10. Phase D — L1 finalization and downstream handoff
Read `references/approval-gate.md`.

L1 is a **finalization gate over the living artifact**, not approval before initial capture.

Before L1:

1. read the complete current artifact;
2. ensure all known answers have been consolidated;
3. run the quality checklist;
4. identify unresolved OQs and downstream impacts;
5. ensure no pending L3 disagreement is hidden as accepted behavior.

Present a BA/PM-friendly preview in the artifact's selected language. Explain naturally:

- which brainstorm artifact is being finalized;
- what behaviors/flows/rules/limits/wording are now captured;
- what remains unresolved;
- which downstream owners may need review;
- whether quality is `pass` or `partial` and why.

Then ask the user to **Finalize / Continue revising / Hold**; localize these action labels naturally to the selected user/artifact language.

### If finalized
- set `status: finalized`;
- update `updated` and changelog;
- preserve unresolved OQs visibly;
- report the final artifact path or return the final logical Markdown;
- recommend downstream owners without triggering them automatically.

A finalized brainstorm with unresolved OQs can be legitimate; do not convert `partial` quality into `pass` merely because the user finalized it.

### If the user continues revising
Keep `status: working` and continue updating the same artifact.

### If a finalized brainstorm is reopened later
- read the full existing artifact;
- change the same artifact back to `status: working` for active revision;
- preserve the prior finalization in changelog;
- update in place; do not create a sibling draft/final file;
- re-run L1 when the new revision is ready to finalize.

Open-question resolution follows `references/resolve-oqs.md` and updates only this brainstorm artifact plus a downstream impact handoff.

## 11. Shallow mode (`--shallow`)
Use for a small idea, prototype, or intentionally low-depth pass. Ask these **six groups in one batch**:

1. **Problem & value** — what is the idea, who has the problem, why now?
2. **Users & access** — who uses it, what gating/entry point matters?
3. **Happy path** — main user action → system behavior → visible outcome?
4. **Rules & limits** — important validations, exact limits, business rules?
5. **Edge cases & wording** — important failure/recovery cases and exact key messages?
6. **Assumptions, risks & OQs** — what is assumed, risky, or unresolved?

Rules:

- reuse already known answers; do not re-ask them in the batch;
- skip mandatory deep-mode diagrams/matrices unless the user explicitly asks;
- still maintain the same single living artifact;
- set `mode: shallow` and include `shallow` in tags;
- preserve epistemic states and truthful `TBD/OQ` behavior;
- final report should recommend deep mode if the idea grows beyond prototype-level uncertainty.

## 12. Completion and failure behavior
### Working completion
After a section, the skill may simply continue the interview. If a living file was updated, do not turn every write into a noisy status report; mention the path/status when it helps orientation or when a write failed.

### Final completion
Report naturally:

- brainstorm artifact identity/path;
- `working` or `finalized` status;
- resolved vs unresolved OQs;
- quality `pass|partial`;
- important downstream impact handoffs;
- next owner suggestions.

Never claim a repo write, collision check, source read, downstream update, or hook execution that was not actually performed.

### Failure / missing capability
- Missing idea source → ask for the missing source.
- Missing current artifact during continuation → state missing context; do not reconstruct from memory.
- No writable workspace → keep one logical chat artifact; do not claim durable persistence.
- Write denied/fails → preserve the latest consolidated Markdown in chat and report the failure; do not create a competing file elsewhere silently.
- Downstream artifact unavailable → create an impact handoff from known brainstorm evidence and mark file-level verification as not run.

## 13. Gotchas
- A generic idea may not support a safe slug; ask one targeted question rather than inventing a path.
- `@image` source is evidence with limitations, not inherently higher confidence.
- Very long sources should be summarized by source role; retain source links/identifiers and never mix examples into target claims.
- Complexity detection can miss; the user may request a representation explicitly.
- Exactness is not interrogation: re-ask once, then keep `TBD/OQ`.
- A user answer can invalidate multiple sections; consolidate the whole artifact, not only the OQ row that changed.
- `DECIDED` inside Brainstorm does not grant PRD/SRS authority.
- Finalization is not downstream canonicalization.
- One artifact per idea does not mean one artifact per feature; distinct ideas remain separate.
- Do not preserve obsolete behavior beside replacement behavior as two current truths.

## References
- `references/runtime-portability.md` — workspace/chat behavior and living-artifact persistence
- `references/ba-conventions.md` — audience language, representation, and epistemic presentation
- `references/approval-gate.md` — L1 finalization, L2 material revision review, L3 representation refinement
- `references/naming-conventions.md` — stable feature/idea identity and canonical path
- `references/keyword-detection.md` — source-role, language, decision, OQ, and complexity inference
- `references/resolve-oqs.md` — resolve OQs into the same living artifact and detect downstream impact
- `references/changelog.md` — concise material-change history inside the brainstorm artifact
- `references/brainstorm-template.md` — 12-section semantic artifact template
- `references/example-brainstorm.md` — worked example with provenance and authority boundaries
