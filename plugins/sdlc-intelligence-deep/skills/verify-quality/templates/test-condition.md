# Test Condition Format

```markdown
# TC-<id> — <title>

- Condition revision:
- Source bindings: <artifact-id>@<revision / immutable digest / record version>
- Definition freshness: CURRENT | STALE | CONFLICTING | UNVERIFIED
- Source conflict / missing-binding note:
- Source AC / NFR / Rule / risk / defect:
- Priority:
- Boundary / consumer:
- Bounded claim:
- Falsifier / observation that would disprove it:
- Environment and version:
- Preconditions:
- Test data:
- Action / probe:
- Substituted boundary / mock / fake / simulator:
- Why this probe can falsify the bounded claim:
- Source-backed oracle basis:
- Expected result:
- Negative guarantees / unchanged state:
- Evidence type and location:
- What this evidence does NOT prove / complementary evidence needed:
- Cleanup / rollback:
- Repeatability / idempotency:
- Automation class:
- Allowed execution results: PASS | FAIL | INCONCLUSIVE | NOT_RUN | NOT_APPLICABLE
- Observed result: NOT_RUN
- Result owner: /verify-quality
- Candidate / environment binding: NONE_UNTIL_EXECUTION
- Execution evidence: []
- Limitation / note:
```

A current condition must preserve an exact condition revision and material source
revision/digest set. Missing bindings are `UNVERIFIED`; conflicting source truth
is `CONFLICTING`; a material source revision makes the old definition `STALE`
until it is revalidated and revisioned. Current implementation behavior does not
replace the source-backed oracle.

Fresh authoring or a materially revised condition leaves `Observed result:
NOT_RUN`. Historical execution evidence remains bound to its old
condition/source/candidate fixed point and does not carry forward. Only the
owning QA execution may record another result after exact fixed-point and
evidence admission; `NOT_APPLICABLE` requires a source-backed applicability rule
and owner.
