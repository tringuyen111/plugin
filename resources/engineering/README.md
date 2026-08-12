# Engineering

Skills I use daily for code work.

## User-invoked

Explicit or orchestrated by default (`agents/openai.yaml` sets `policy.allow_implicit_invocation: false`).

- **[triage](../../skills/triage/SKILL.md)** — Move issues through a state machine of triage roles.
- **[improve-codebase-architecture](../../skills/improve-codebase-architecture/SKILL.md)** — Discover evidence-grounded architecture-improvement candidates from observed friction, present them in the best available artifact, and explore the selected candidate without implementation.
- **[to-spec](../../skills/to-spec/SKILL.md)** — Turn the current conversation into a spec and publish it to the issue tracker.
- **[to-tickets](../../skills/to-tickets/SKILL.md)** — Break any plan, spec, or conversation into a set of tracer-bullet tickets, each declaring its blocking edges — text in a local file, or native blocking links on a real tracker.
- **[implement](../../skills/implement/SKILL.md)** — Build work from a spec or agent-ready ticket with TDD, code review, and truthful completion evidence.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[prototype](../../skills/prototype/SKILL.md)** — Build a throwaway prototype to answer a design question: a runnable terminal app for state/logic, or several toggleable UI variations.

- **[diagnosing-bugs](../../skills/diagnosing-bugs/SKILL.md)** — Disciplined diagnosis loop for hard bugs and performance regressions: reproduce → minimise → hypothesise → instrument → fix → regression-test.
- **[resolving-merge-conflicts](../../skills/resolving-merge-conflicts/SKILL.md)** — Resolve an in-progress Git merge or rebase conflict without discarding either side blindly.
- **[tdd](../../skills/tdd/SKILL.md)** — Test-first red-green vertical slices through a resolved public seam; refactoring is deferred to review.
- **[codebase-design](../../skills/codebase-design/SKILL.md)** — Design one fixed technical module/interface boundary with alternatives, migration, rollback, and proof, while exposing reusable deep-module vocabulary.
- **[code-review](../../skills/code-review/SKILL.md)** — Two-axis review of a frozen change surface: **Standards** and **Spec**, using isolated workers when available or frozen sequential notes otherwise.

## Supporting domain execution under `/implement`

These are explicit-or-orchestrated deep execution owners for one approved ACTIVE implementation unit. They return closure evidence to `/implement`; they do not own Product/BA/Design/Architecture/QA/Release decisions or the parent work-item completion.

- **[frontend-engineering](../../skills/frontend-engineering/SKILL.md)** — Production frontend system execution with foundation readiness, component/state composition, browser inspection, responsive/accessibility developer proof, and sibling regression checks.
- **[backend-engineering](../../skills/backend-engineering/SKILL.md)** — Application/service execution with module boundaries, transaction/side-effect semantics, concurrency/failure behavior, observability, and runtime proof.
- **[api-engineering](../../skills/api-engineering/SKILL.md)** — Caller-visible API contract execution covering validation, errors, auth exposure, idempotency/retries, continuation/concurrency, compatibility, and request/response proof.
- **[data-persistence-engineering](../../skills/data-persistence-engineering/SKILL.md)** — Durable data/schema/migration/backfill execution with invariant, concurrency, recovery, query, and compatibility proof.
- **[security-engineering](../../skills/security-engineering/SKILL.md)** — Approved security/identity enforcement execution with trust boundaries, authorization scope, bypass mapping, lifecycle/replay controls, and negative developer proof.
