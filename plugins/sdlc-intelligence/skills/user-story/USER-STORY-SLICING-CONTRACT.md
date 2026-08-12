# User Story Slicing Contract

Use this reference only when a Story is oversized, dependency-heavy, proposed as
technical-layer work, or difficult to split without losing actor value. It owns
story-slice reasoning only; Product retains scope/priority/outcome authority,
Acceptance Criteria owns detailed acceptance, and Engineering owns technical work.

## Contents

1. Value-slice model
2. Vertical slice versus technical layers
3. Independence and dependency truth
4. Splitting strategies
5. Assumptions and readiness
6. Solution contamination
7. NFRs and technical enablers
8. Completion and anti-patterns

## 1. Value-slice model

A useful Story slice can be reconstructed as:

```text
specific actor
-> capability the actor can exercise
-> user/business benefit or outcome
-> bounded scope / rule conditions
-> observable end-to-end change
-> acceptance handoff
```

A smaller implementation chunk is not automatically a smaller Story. The slice
must still produce an **observable** actor/business outcome or a coherent usable
step toward one that Product/BA intentionally authorizes as value.

If a proposed slice has **no usable actor outcome**, treat it as a technical
enabler/task or keep the parent Story unsplit rather than manufacturing a benefit.

## 2. Vertical slice versus technical layers

Prefer a **vertical/end-to-end** slice that may cross presentation, API, domain,
data and integration boundaries while delivering one actor capability. Do not
create separate “frontend Story”, “backend Story”, “database Story” or “API Story”
for one capability simply because different components must change.

Technical tasks can be independently planned/executed under Engineering while
remaining linked to one Story. Story ownership does not require BA to describe
how each technical layer is implemented.

A vertical slice may still be narrow, for example:

- one actor goal for one supported business condition;
- one independently useful workflow outcome before advanced variants;
- one authorized rule/eligibility branch with observable value;
- one bounded data population or channel when Product scope authorizes that cut.

Do not split by arbitrary CRUD verbs, screens, services or repository boundaries
unless each proposed Story independently preserves actor value and Product scope.

## 3. Independence and dependency truth

“Independent” means the Story is understandable and negotiable as a value unit;
it does **not mean dependency-free** implementation.

For a material dependency preserve:

- canonical dependency reference and revision when known;
- dependency owner;
- **blocking dependency** versus **non-blocking dependency**;
- ordering or synchronization constraint when material;
- what actor value/acceptance becomes impossible if it is unavailable;
- whether the dependency is Product/behavior truth, technical work, external
  capability/provider, data migration, policy, or another class.

Do **not copy mutable status** from the dependency into Story maturity. Link the
canonical source of truth. A blocking dependency can make the current workflow
`PARTIAL`/`BLOCKED` while the Story itself remains a legitimate value definition.

Do not split one Story into several technical Stories merely to make the
“independent” mnemonic look satisfied. That hides the real dependency rather than
removing it.

## 4. Splitting strategies

When a Story is too large, search for the smallest boundary that preserves an
observable actor outcome. Useful candidate cuts include, only when Product/behavior
truth supports them:

- basic authorized outcome versus a separately valuable advanced outcome;
- one actor/role with materially different goals or permissions;
- one business-rule branch whose outcome is independently useful;
- one bounded workflow completion state before a separately valuable extension;
- one supported channel/data population/geography where scope is intentionally phased;
- one externally observable integration outcome before optional enrichment.

Reject a split when it creates:

- a data/backend slice with **no usable actor outcome**;
- a UI-only slice where the **UI control** is mistaken for the capability;
- a test-only/monitoring/refactor/migration Story whose value is actually enabling
  technical delivery;
- duplicate Stories that each restate the same actor capability while ownership
  differs only by component.

## 5. Assumptions and readiness

An assumption is material when resolving it could change actor, capability,
benefit, scope, business-rule/NFR applicability, dependency class, or acceptance
boundary.

Keep the Story workflow `PARTIAL` when such an assumption lacks an owner or
resolution path. A low-risk assumption may remain explicit when it does not alter
the value slice or acceptance semantics and project policy permits proceeding.

Do not turn an assumption into target truth merely because a Story needs to be
estimated or scheduled.

## 6. Solution contamination

The Story describes the actor capability/value boundary. A named UI control,
component, endpoint, table, queue, cache, library or service is not the capability
unless the authorized Product/behavior source makes that concrete interaction part
of the required user experience or external contract.

When the request begins with a solution, recover the actor goal and benefit first.
Preserve mandatory interaction constraints as linked Product/Design truth rather
than generalizing implementation detail into business need.

## 7. NFRs and technical enablers

An NFR can constrain the Story slice, but the Story does not copy NFR verification
status or redefine its quality semantics. Link the exact NFR revision.

A migration, refactor, infrastructure change, observability work item, security
mechanism or other **technical enabler** remains Engineering/Architecture work.
Link it to the Story or invariant it enables. Do not create an actor persona solely
to make technical work look like a User Story.

## 8. Completion and anti-patterns

A refined Story slice is ready for acceptance work when:

- actor, capability and benefit are specific;
- exact source revisions and target truth are known or unresolved truth is explicit;
- the slice has observable value and explicit non-goals;
- material dependencies/assumptions have owner and blocking meaning;
- rules/NFR constraints are linked rather than copied;
- `/acceptance-criteria` can define observable acceptance without inventing scope;
- technical enablers remain external work;
- no downstream QA/release status is copied into Story maturity.

Anti-patterns:

```text
"Must have no dependencies" -> hides legitimate dependency truth.
"Frontend story + backend story + database story" -> technical decomposition, not value slicing.
"As engineering, migrate the DB" -> technical enabler masquerading as actor value.
"Conversion target = acceptance criteria" -> Product metric ownership collapsed into Story/AC.
"Story approved, therefore implementation/QA complete" -> maturity/status axis collapse.
```
