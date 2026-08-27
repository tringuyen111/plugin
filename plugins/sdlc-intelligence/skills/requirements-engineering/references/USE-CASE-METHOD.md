# Use Case Branch
<!-- runtime-context:start -->
## Runtime context

- **When interruption, UNKNOWN outcome, partial commitment, retry/duplicate intent, multi-actor interaction, or effective time can materially change the actor goal or valid next action:** read [Scenario Continuity](SCENARIO-CONTINUITY.md) before finalizing those branches.
- **When the project requests or already maintains a governed canonical Use Case:** read [Governed Use Case Artifact](USE-CASE-FORMAT.md) before persistence; lightweight analysis does not require that projection.
<!-- runtime-context:end -->

Model a purposeful conversation between external actor(s) and a declared solution boundary for one meaningful goal. A Use Case owns requirement-level interaction semantics, not UI realization, acceptance verdicts, policy invention, or implementation mechanics.

## Universal model: Goal -> Boundary -> Scenario Set

1. **Calibrate the goal.** Identify the primary external initiator, the beneficiary when different, and the independently meaningful outcome.
   - A candidate is **too small** when it is only an internal action, UI gesture, validation step, calculation, rule evaluation, or technical call with no independently useful external outcome.
   - A candidate is **too broad** when it combines multiple external goals that can succeed, fail, change, or be delivered independently.
   - Keep summary context outside the detailed Use Case when it spans several independent goals.
2. **Declare the boundary.** Name the solution/subject whose behavior is being specified. Actors are outside this boundary. An actor may be a person, external system, device, timer, or event source; do not invent human motivation for a non-human trigger. Distinguish initiator from beneficiary when useful.
3. **Write the main success scenario.** Describe the shortest grounded actor-system interaction that reaches the goal. Use business-observable actions and responses, not screens, endpoints, services, tables, queues, or provider internals.
4. **Add only material extensions.** Add alternate, error, interruption, or recovery scenarios when a grounded condition changes the goal outcome, obligation, permission, valid next action, business-visible state, or downstream interpretation. Do not manufacture an exception catalog merely because a failure is theoretically possible.
5. **State material postconditions.** Capture the business-visible success result and, when decision-material, no-change, pending, partial, reconciliation-required, or compensated outcomes.
6. **Preserve authority and questions.** Link controlling Business Rules/state truth and keep unresolved policy explicit. Do not invent eligibility, permission, priority, precedence, effective-time, or calculation semantics to make a scenario complete.

### Contrastive SHOW

```text
Weak:  Goal = "User clicks Submit" -> this is a UI gesture, not an independently meaningful outcome.
Better: Goal = "Claimant submits an eligible reimbursement claim for review" -> the actor goal survives UI/API changes.
```

If the channel itself is contractually required, preserve that channel constraint separately; do not let the control gesture replace the goal.

## Truth context

Use the smallest truthful source binding available. A useful workshop analysis does not require canonical IDs or revisions that do not exist.

When the distinction matters, label behavior as:

- **CURRENT_VERIFIED** — as-is behavior supported by inspectable current source/runtime or another authoritative current-state source;
- **TARGET_AUTHORIZED** — intended behavior authorized by the governing Product/domain/policy/requirement decision;
- **PROPOSED_OR_ASSUMED** — a candidate branch, interpretation, or unverified working claim awaiting sufficient evidence or authority.

These labels describe evidence/truth context; they are not routing modes. Never promote current behavior into target authority or merge current and target paths when they materially conflict. Expose the delta and owner/question that must resolve it.

When the project requests or already maintains a durable canonical Use Case, use `USE-CASE-FORMAT.md` and preserve the real project-native identity, source revisions, supersession/change-impact truth, and fixed-point links. Do not fabricate `UC-*`, Product scope IDs, actor IDs, or approval states for a lightweight analysis.

## Scenario depth

Keep simple interactions simple. Do not enumerate timeout, duplicate, retry, UNKNOWN, partial, compensation, multi-actor, or effective-time branches unless evidence or material risk makes them relevant.

When those semantics are material, use `SCENARIO-CONTINUITY.md` and preserve business truth such as:

- UNKNOWN/pending outcome and reconciliation or safe-next-action semantics;
- already-real partial business effects and commitment boundaries;
- repeated actor intent or duplicate business effect guarantees;
- cancellation/compensation obligations;
- multi-actor authority/conflict and effective-time rules.

Specify the required business meaning, not the technical mechanism. Architecture/Engineering owns idempotency keys, database transactions, locks, queues, retry counts, provider orchestration, and similar implementation choices.

## Neighbor boundaries

- The **User Story branch** owns a backlog-sized value slice and conversation token. A Story may reference Use Case behavior but is not a detailed interaction model.
- The **Business Rule branch** owns eligibility, permission, calculation, precedence, effective-time, and other decision authority. A Use Case links a rule and applies its result to a scenario.
- The **Acceptance Criteria branch** owns item-specific observable acceptance conditions and negative guarantees. Do not turn a Use Case into an AC checklist.
- **`product-design`** owns user-facing interaction realization, including flow/state continuity and screen/navigation representations. Keep Use Cases channel/interface independent.
- **`user-acceptance`** owns business acceptance coverage/representations, witnessed user/business evidence for a fixed execution point, acceptance evaluation, and any explicit authorized acceptance decision. A Use Case is requirement behavior, not an acceptance design or test run; candidate/environment are execution evidence only when actual witnessing is claimed.
- **Architecture/Engineering** owns technical orchestration, transactions, providers, schemas, APIs, concurrency, retries, and implementation mechanisms.

Product metrics and priorities remain upstream outcome context unless they change the interaction requirement itself.

## IT-BA boundary

Ask in business language:

- who or what initiates the interaction, and who benefits;
- what meaningful outcome defines success;
- what must already be true for the interaction to start;
- what the actor does and what the solution observably does in response;
- which grounded conditions create materially different valid paths;
- what business-visible state or obligation exists after success, failure, no-change, pending, or partial completion;
- which Business Rule or authority governs a branch when the answer is not inherent in the interaction.

Do not ask for or prescribe column names, schemas, function/service names, endpoints, framework choices, token strategy, hashing algorithms, SDK details, idempotency-key formats, lock types, queue ordering, transaction strategy, or retry counts.

## Completion

A lightweight Use Case analysis can be `READY` when:

- the goal is meaningful at the declared solution boundary and is neither a micro-step nor a super-goal;
- initiator/beneficiary roles and trigger are clear enough for the current decision;
- the main success scenario reaches a business-visible outcome;
- material alternate/exception/interruption paths are covered or explicitly unresolved without speculative branches;
- material preconditions/postconditions and Business Rule/state links are grounded;
- current, target, and proposed behavior remain distinct when more than one matters;
- UI/navigation, UAT execution, acceptance verdicts, unowned policy, and technical implementation are not disguised as Use Case truth.

For a governed persisted Use Case, also require the project's real canonical identity/source revision and any applicable supersession/change-impact truth. Missing canonical metadata must remain missing rather than being invented.
