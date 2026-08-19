# Release Decision Record

```markdown
# REL-<id> — <candidate / environment>

## Release decision artifact identity and validity
- Release Decision record ID:
- Release Decision record revision:
- Release Decision record digest / immutable identity:
- Supersedes Release Decision record revision:
- Decision evidence cutoff / finalized at:
- Release Decision fixed-point validity: CURRENT | STALE | UNVERIFIED | CONFLICTING
- Release Decision invalidation triggers / changed since decision:
- Canonical persistence / version evidence:

## Fixed candidate
- Version / commit / artifact hashes:
- Target environment:
- Scope and exclusions:
- Canonical work items:

## Acceptance and evidence
- UAT record ID:
- UAT record revision / digest / immutable identity:
- UAT fixed candidate / environment match:
- UAT fixed-point validity: CURRENT | STALE | UNVERIFIED | CONFLICTING
- UAT invalidation triggers / changed since decision:
- UAT record admission: ADMITTED_CURRENT | STALE | UNVERIFIED | CONFLICTING | MISMATCHED
- UAT state / approver / conditions or waivers:
- UAT conditions / waivers still applicable:
- UAT-consumed QA report revision / digest (only if UAT actually depended on QA):
- UAT / Release QA report identity match (when that dependency is applicable):
- QA workflow state: READY | PARTIAL | BLOCKED | FAILED
- QA verification verdict: PASS | FAIL | INCONCLUSIVE | NOT_RUN
- QA acceptance readiness:
- QA separation requirement / policy:
- QA actual separation mode:
- QA executor / relation to implementation-review / provenance:
- QA independence / attestation status:
- QA report / visual-conformance / other required evidence:
- Failures, inconclusive, stale, or unrun checks:
- Known defects / waivers / accepted risk:

## Deployment Plan evidence
- Deployment Plan identity / revision / digest:
- Plan state: PLAN_READY | PLAN_PARTIAL | PLAN_BLOCKED
- Plan fixed candidate / target environment match:
- Applicable archetypes / strategy:
- Change graph / compatibility / migration ordering:
- Capability / environment-protection requirements:
- Verification / progressive-analysis requirements:
- Recovery model / irreversible boundaries:
- Plan blockers / stale assumptions:

## Change mechanics
- Deployment owner and required authority:
- Operator / provider automation binding:
- Migrations / data effects:
- Feature flags / configuration:
- Dependencies / compatibility:
- Irreversible steps:

## Rollback or recovery
- Trigger signals and source:
- Procedure:
- Data implications:
- Owner:
- Last tested evidence:

## Observability and post-release verification
- Signals and current baseline:
- Watch policy / duration source:
- Key user/business checks:
- Escalation:

## Decision
- UAT record revision admitted for release decision:
- Readiness: NOT_READY | CONDITIONALLY_READY | READY_FOR_RELEASE
- Release eligibility: YES only when readiness is READY_FOR_RELEASE; otherwise NO
- Decision owner / authority / date:
- Hard blockers:
- Conditions / owners / expiry / recheck triggers:
- Condition closure evidence / rechecked at:
- Observed downstream deployment status (read-only): NOT_STARTED | IN_PROGRESS | DEPLOYED | ROLLED_BACK | FAILED
- Deployment Plan revision handed to execution:
- Release Decision record revision handed to deployment:
- Release Decision record digest / immutable identity handed to deployment:
- Deployment execution state / reference:
- Deployment observation evidence / observed at:
```


`CONDITIONALLY_READY` never strengthens QA/UAT provenance and does not itself establish release eligibility. Missing required release evidence or an unresolved hard blocker must remain visible rather than being converted into a condition.


`PLAN_READY` is deployment-engineering evidence only. It does not establish release eligibility, deployment authority, or permission to mutate the target environment. A stale/mismatched plan must be revalidated by `DEPLOY_PREPARE` before release execution.

An exact `ADMITTED_CURRENT` UAT record is required whenever release policy requires persisted UAT acceptance for the release assessment. Logical UAT IDs, stale/superseded decisions, expired/non-applicable UAT conditions, or a QA-identity mismatch **when the UAT decision actually depended on that QA identity** must remain visible and cannot be converted into `CONDITIONALLY_READY`. Release may independently require current QA even when UAT did not consume QA. Release consumes UAT truth; it does not rewrite UAT state or strengthen QA/UAT provenance.

A downstream deployment workflow may rely on `READY_FOR_RELEASE` only from a `CURRENT` exact Release Decision record revision/digest (or equivalent immutable identity). A logical `REL-<id>` or readiness label alone is insufficient. Material controlling-input changes make the prior record stale; preserve it historically and create a new superseding record revision after re-evaluation rather than rewriting the old decision. If canonical record identity cannot be established, do not fabricate it; the release assessment may be preserved but deployment admission remains unverified/partial.
