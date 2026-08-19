# Frozen Behavioral Cases — codebase-design context architecture

Freeze point: written before the v1.0.16 Engineering Core `codebase-design` mutation. Behavioral runtime execution remains `NOT_RUN` until a real Skill-runtime cohort compares baseline and candidate.

## Claim under test

Improve `codebase-design` Prompt/Context architecture without weakening technical-design depth:
- project-native terminology remains visible and traceable instead of being overwritten by an internal glossary;
- deep-module concepts remain available as analytical lenses when they change the seam/interface decision;
- supporting invocations do not need to ingest glossary/theory that is irrelevant to the current design question;
- current-system claims remain source-bound and completion remains proof-bounded.

## Case 1 — Project-native `service` / `API` terms are authoritative

Prompt shape: an existing repository has `PaymentService`, an explicitly documented public REST API, and ADRs that use `service boundary` consistently. The user asks to design a safer retry/idempotency seam.

Expected candidate behavior:
- inspect and use the repository's own names in the design artifact;
- internally map the relevant concepts to module/interface/seam/depth when useful;
- do **not** rewrite `PaymentService` as “module” or REST API as “interface” merely to satisfy Skill vocabulary;
- preserve source citations/paths tying the design to existing ownership.

Baseline risk to falsify: output vocabulary becomes detached from the codebase because the Skill says to avoid `service`, `API`, or `boundary`.

## Case 2 — Deep-module lens materially changes a seam decision

Prompt shape: one rule is duplicated in several callers; two candidate seams are plausible and the user asks for technical design.

Expected candidate behavior:
- load/use deep-module methodology because locality/leverage/interface knowledge change the decision;
- compare current owner, leaked knowledge, caller burden, failure/proof surface, migration and rollback;
- include at least one contrastive reason why a superficially smaller wrapper would remain shallow;
- recommend only when evidence supports it.

Failure: moving theory out of SKILL.md makes the deep-module mechanism easy to skip.

## Case 3 — Supporting vocabulary only; do not pull full theory

Prompt shape: `devops-engineering` owns an end-to-end delivery objective and needs one bounded architecture judgment about whether a pipeline adapter deserves a stable interface. Broad application architecture is not the terminal job.

Expected candidate behavior:
- use only the architecture lens needed for the bounded seam question;
- do not turn the task into a full architecture workflow or artifact unless required;
- do not preload unrelated frontend/data/security design branches;
- return the bounded judgment to the caller.

Failure: supporting use creates a second workflow owner or loads large irrelevant architecture context.

## Case 4 — Source truth contradicts a fashionable pattern

Prompt shape: a user suggests introducing a repository/service abstraction “for testability”, but source inspection shows one stable provider, no current protocol/ownership/change boundary, and representative tests already exercise the public behavior.

Expected candidate behavior:
- reject a new seam unless source-grounded pressure earns it;
- do not use dependency-injection or adapter vocabulary as a reason by itself;
- state what future evidence would reopen the decision.

## Case 5 — Real project uses `component` as a meaningful architecture noun

Prompt shape: a codebase's canonical architecture docs define independently deployed `components` with explicit failure and ownership boundaries.

Expected candidate behavior:
- preserve `component` in user-facing design and diagrams;
- use internal deep-module concepts only where they add reasoning value;
- never claim the project term is invalid because the Skill prefers `module`.

## Case 6 — No real alternative remains after mechanism economy

Prompt shape: current supported runtime primitive already satisfies the approved requirement and every custom seam would add ownership/cutover cost.

Expected candidate behavior:
- allow a one-option/no-new-mechanism recommendation after inspecting the real path;
- do not fabricate a second custom architecture merely to satisfy “design it twice” ceremony;
- record why alternatives collapsed under evidence.

## Case 7 — Current-system evidence missing

Prompt shape: user asks “design around our current event bus semantics”, but the source/runtime/version that establishes those semantics is unavailable.

Expected candidate behavior:
- keep current semantics `UNKNOWN`/`PARTIAL` rather than substituting framework memory;
- design only in explicitly authorized proposal space;
- do not claim readiness until the decision-changing current truth is bound.

## Case 8 — Proof semantics stay bounded

Prompt shape: technical design defines a migration and runtime probe plan but no implementation or runtime execution occurred.

Expected candidate behavior:
- design may be `READY` for approval when its own evidence/authority criteria are met;
- implementation/runtime/test status remains `NOT_RUN`;
- no validator/design artifact is narrated into behavioral proof.

## Near-miss — terminology simplification is useful

Prompt shape: the project itself uses several inconsistent names for the same seam and the user asks for a clarifying architecture model.

Expected candidate behavior:
- a normalized analytical legend is allowed when it clarifies mapping;
- preserve the mapping back to source-native terms rather than silently renaming the codebase.

## Reopen / falsify the candidate

Reopen the Prompt/Context change if runtime cohort evidence shows the candidate:
- skips deep-module reasoning more often than baseline;
- loses project-source traceability;
- over-activates detailed references for simple supporting judgments;
- produces fewer materially different alternatives when a real decision exists;
- weakens migration/rollback/proof or current-system reality binding.
