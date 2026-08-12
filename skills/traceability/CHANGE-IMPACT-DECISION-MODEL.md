# Change Impact Decision Model

Load this reference only when an approved artifact changed materially or when a
project asks which existing artifacts and evidence must be reviewed before the
change can proceed.

The purpose is not to find files containing similar words. The purpose is to
reason over semantic dependencies, maturity, evidence freshness, release
exposure, and canonical ownership without replacing downstream decisions.

## 1. Preconditions and authority

A committed impact analysis requires:

```text
approved change identity and revision
canonical changed artifact
change decision owner and approval evidence
bounded project/release scope
current artifact graph or the best available canonical links
current maturity and verification evidence
```

When approval is absent, produce at most a clearly labeled scenario preview.
Do not mark artifacts stale, rewrite scope, or present the proposed change as
accepted. Route approval to the canonical Product, BA, Design, Architecture, or
other decision owner.

When canonical artifacts or the changed revision cannot be located, return
`BLOCKED`. A summary, ticket title, or handoff is not a substitute for the
changed artifact.

## 2. Ownership boundary

`traceability` owns:

- cross-artifact impact analysis for an approved material change;
- evidence-backed invalidation and unaffected claims;
- the affected-artifact set;
- ordered owner and reverification handoffs;
- visibility of missing graph edges, conflicts, stale evidence, and release
  exposure.

It does not own:

- approving or rejecting the change;
- changing Product scope or priority;
- rewriting requirements, rules, design, ADRs, source, tests, documentation, or
  operational policy;
- accepting implementation or UAT;
- authorizing release, deployment, migration, rollback, or risk acceptance;
- inventing canonical status or creating a shadow task ledger.

Each affected owner updates and verifies the artifact they own. Change impact
coordinates truth; it does not absorb those decisions.

## 3. Mental model

A material change invalidates assumptions and evidence along dependency edges.
Impact is a propagation problem:

```text
changed meaning or contract
→ direct consumers
→ transitive consumers
→ evidence based on old assumptions
→ released/operated surfaces
→ owner-specific rework and reverification
```

A link proves that two artifacts are related, not that the downstream artifact
is stale. Conversely, missing links do not prove no impact. Use semantic
contracts, source evidence, runtime consumption, and maturity to decide.

## 4. Material-change test

Treat a change as material when it can alter at least one of:

- actor outcome, scope, behavior, rule, acceptance, or measurable NFR;
- public interface, event, schema, data meaning, compatibility, or migration;
- approved experience/state behavior or implementation constraint;
- test oracle, evidence interpretation, release condition, rollback, runbook,
  documentation, or metric definition.

Editorial changes that preserve meaning may be `NO_MATERIAL_IMPACT`, but that
claim requires evidence such as normalized semantic equivalence, unchanged
contract identifiers, or owner confirmation. “Only wording changed” is not
sufficient by itself.

## 5. Dependency and impact classes

Inspect both declared graph links and observed consumption.

### Dependency classes

```text
SEMANTIC       downstream meaning depends on the changed decision
CONTRACT       interface/schema/event/format depends on the changed contract
IMPLEMENTATION source/config/migration implements the changed artifact
VERIFICATION   test/evidence/acceptance evaluates the old expectation
RELEASE        package, rollout, rollback, runbook, or monitoring exposes it
DOCUMENTATION  user/operator guidance describes it
METRIC         measurement definition or interpretation depends on it
UNKNOWN        relationship is plausible but not proven
```

### Impact classes

```text
DIRECT            one dependency edge from the changed artifact
TRANSITIVE        reached through an affected downstream artifact
EVIDENCE_STALE    evidence predates or assumes the superseded revision
RELEASE_EXPOSED   released, deployed, migrated, documented, or operated surface
COMPATIBILITY     old/new consumers or persisted data may disagree
UNKNOWN           graph or source evidence is insufficient
NO_MATERIAL_IMPACT supported by explicit invariance evidence
```

Do not collapse `UNKNOWN` into affected or unaffected. Route the uncertainty to
the owner who can inspect the missing contract or runtime evidence.

## 6. Confidence and evidence freshness

For each impact claim record one confidence level:

```text
CONFIRMED  direct semantic/contract link or observed runtime consumption
LIKELY     strong dependency evidence with one unresolved assumption
POSSIBLE   plausible propagation path requiring owner inspection
UNKNOWN    required graph/source/runtime evidence is unavailable or conflicting
```

Evidence is stale when it was produced against a superseded revision or when
its oracle depends on changed meaning. A newer timestamp does not prove
freshness. Check the source revision, environment, input contract, and expected
result.

An unaffected claim must cite an invariance boundary, such as:

- the consumer uses a stable interface unchanged by the revision;
- a compatibility adapter preserves the old contract and has current evidence;
- the artifact is outside the declared scope and has no semantic/runtime edge;
- the canonical owner confirms equivalence with supporting proof.

Absence from a keyword search is never sufficient.

## 7. Traversal algorithm

### Step 1 — Anchor the change

Record the changed artifact ID, old and new revisions, approved decision,
material-change reason, and declared scope.

### Step 2 — Establish graph quality

Load canonical forward and backward links. For every material edge inspect its
`edge_id`, relationship type, exact source artifact + source revision, exact
target artifact + target revision, truth basis/evidence, and edge state. Record
missing, conflicting, stale, unverified, or duplicate edges before relying on
them. A graph edge bound to a superseded endpoint revision is stale even when
the artifact ID is unchanged. Missing endpoint revisions are unverified, not
current coverage.

Use source/runtime inspection to add observed analysis evidence, but do not
silently rewrite canonical links. If observed consumption conflicts with a
canonical declaration, preserve both facts as a graph conflict for owner
resolution rather than choosing whichever path is convenient.

### Step 3 — Find direct consumers

Inspect downstream artifacts that consume the changed meaning or contract.
Classify dependency, impact, confidence, evidence, maturity, and canonical
owner.

### Step 4 — Propagate transitively

Traverse from every affected artifact through inspectable revision-bound edge
paths. Record the exact edge IDs plus source and target revisions used by each
material path. Keep stale, conflicting, and unverified edges visible in the
traversal result; a branch that crosses one cannot become `CONFIRMED` or
`NO_MATERIAL_IMPACT` until the edge is resolved or revalidated. Continue while
the downstream artifact inherits the changed assumption. Stop a branch only when:

- an evidence-backed invariance boundary proves compatibility;
- the artifact is superseded or outside the approved scope;
- the owner determines no material impact with evidence;
- required context is unavailable, in which case mark `UNKNOWN` and hand off.

Use cycle detection and stable artifact IDs. Repeated links must not create
infinite traversal or duplicate owner tasks.

### Step 5 — Invalidate evidence

For tests, QA evidence, UAT, release evidence, documentation review, metrics,
and operational checks, compare the evidence oracle and source revision with
the changed contract. Mark `EVIDENCE_STALE` when the old result no longer proves
the new behavior.

### Step 6 — Evaluate release exposure

Check whether the affected meaning is implemented, released, persisted,
documented, monitored, or depended upon externally. Name compatibility,
migration, rollback, support, and communication decisions, but leave those
decisions with their canonical owners.

### Step 7 — Order owner handoffs

Sequence work by dependency and authority, not convenience. A common order is:

```text
changed decision owner confirms final revision
→ BA/Architecture owners update dependent contracts
→ canonical planning/work owner revises and approves affected work items
→ Design/Engineering owners revise implementation artifacts
→ QA reverifies affected acceptance and risk
→ Product/business owner reaccepts when required
→ Operations reassesses release/rollout/rollback
→ Documentation and metrics owners update consumed meaning
```

Parallelize only where two artifacts do not depend on one another's revised
contract.

### Step 7a — Gate the next authoritative workflow

`next_route` names the next authoritative workflow required to make an affected
branch actionable. It is not the eventual executor merely because implementation
will happen later.

For an implementation impact:

- route to `/implement` only when a current approved canonical work item already
  binds the changed revision, evidence target, and selected task-status owner;
- when the only work item is done, closed, draft, or bound to superseded input,
  route to `/to-tickets` or the project-selected canonical planning/work owner so
  it can revise, reopen, approve, and publish the actionable work contract;
- when the canonical work-status owner or tracker convention is unknown, route
  to `/project-bootstrap` instead of creating a local task or status file;
- never reopen, approve, rewrite, or change task status inside the impact report.

The ordered handoff may still show later Engineering, QA, UAT, Release,
Documentation, or Metrics steps, but the report's top-level `next_owner` and
`next_route` must point to the first unresolved authoritative gate.

### Step 8 — Persist truth safely

A report may recommend stale/review states. Persist them only in the selected
canonical source, with authority and side-effect evidence. Every attempted persistence
operation uses the canonical **Integration Result Manifest** schema v4 rather than a
traceability-local result shape. Reopen the manifest and verify `operation_result`,
`precondition_status`, `postcondition_status`, resources touched, and compensation truth;
bind the Change Impact Report to the exact manifest using `record_ref` and
`record_sha256`. If write capability or approval is unavailable, preserve the intended
changes in the report and return `PARTIAL` or `BLOCKED`; do not create a local shadow
status file or synthesize a success result.

## 8. Required action vocabulary

Use the smallest action that restores trustworthy downstream state:

```text
REVIEW_RELATIONSHIP
REVISE_ARTIFACT
REVERIFY
REACCEPT
REASSESS_RELEASE
PLAN_COMPATIBILITY
PLAN_MIGRATION
UPDATE_DOCUMENTATION
UPDATE_METRIC_DEFINITION
ADD_OR_CORRECT_TRACE_LINK
OWNER_DECISION_REQUIRED
```

An impact report creates handoffs, not implementation tickets by default. The
project's canonical planning workflow decides whether and where tasks are
created.

## 9. Conflict and failure handling

- **Approval conflict:** preserve claims and route to the change decision owner;
  no canonical stale write.
- **Graph conflict:** report both links and evidence; route correction to the
  traceability owner.
- **Artifact conflict:** preserve both revisions and route the decision class to
  its canonical owner.
- **Evidence conflict:** keep the independent QA/verification conclusion until
  disproved, superseded, or formally accepted by the authorized risk owner.
- **Missing runtime/source:** mark affected branch `UNKNOWN`; do not claim it is
  safe.
- **Denied write:** keep the report, record the denied side effect, and return
  `BLOCKED` for persistence while analysis may remain usable.
- **Critical owner violation:** return `FAILED` if the workflow rewrites or
  approves another owner's truth.

## 10. Quality ladder

```text
WEAK
keyword/file search; no revisions, owners, confidence, or evidence freshness

ACCEPTABLE
linked direct artifacts, canonical owners, and explicit unknowns

STRONG
semantic and transitive impact, maturity, stale evidence, release exposure,
confidence, and ordered handoffs

READY
all material branches are affected, evidence-backed unaffected, or explicitly
unknown; persistence is truthful; downstream owners can act without rediscovery
```

## 11. Completion mapping

- `READY` — approved change and canonical artifact are known; material branches
  are classified; evidence and unaffected claims are inspectable; owner and
  reverification order is complete; any authorized stale writes succeeded.
- `PARTIAL` — useful analysis exists, but a bounded branch, write, source, or
  verification remains unresolved.
- `BLOCKED` — approval, canonical changed artifact, required owner decision, or
  critical graph/runtime evidence is unavailable.
- `FAILED` — the analysis violated ownership, hid a failed side effect, or
  claimed safety/completion contrary to observed evidence.

`READY` means the impact report is actionable. It does not mean downstream
artifacts are revised, verified, accepted, or released.
