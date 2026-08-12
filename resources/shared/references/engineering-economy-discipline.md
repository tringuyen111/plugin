# Engineering Economy Discipline

Use this reference inside an Engineering workflow that already owns a fixed technical
decision or approved implementation item. It does not own Product scope, Architecture
approval, diagnosis, implementation completion, QA, or a second task ledger.

## Principle

Optimize for the **smallest sufficient system surface**, not the fewest lines. Economy starts
after the owner has understood the real problem, traced the affected source/runtime flow,
and fixed the semantic/proof target.

Before introducing a custom mechanism, walk the ladder and stop at the first rung that is
**fit for purpose**:

```text
1. no build/change is required
2. existing canonical project mechanism
3. language/runtime standard capability
4. native platform/framework capability already in the supported environment
5. already-approved/installed dependency
6. new dependency with a demonstrated material advantage
7. minimum custom mechanism
```

A rung holds only when it satisfies the approved semantics and material constraints for:
compatibility/support, canonical ownership, maintainability, security/privacy, accessibility
when relevant, observability/debuggability, failure behavior, and the required proof boundary.
Existing code is not automatically preferred when it is legacy, incompatible, duplicated, or
owned by the wrong seam.

## Change economy

Prefer, in order:

- deletion or direct reuse when parity and callers are proven;
- a boring direct expression when it stays clear and testable;
- extension of the canonical seam when the change belongs there;
- a new abstraction only when observed ownership/change pressure requires one;
- a new dependency only when its lifecycle, compatibility, attack-surface, and operational
  cost are justified by material benefit;
- custom code only for behavior not sufficiently covered above.

Do not optimize for a one-liner, fewest files, or the shortest textual diff. The target is the
**smallest coherent correct change** at the right owner. A tiny patch at the wrong seam is not
economy; it creates another defect surface.

## Diagnosis and caller rule

Do not infer root cause from a ticket symptom. `/diagnosing-bugs` owns root-cause evidence for
bugs. Once the faulty owner/seam is proven, implementation maps affected callers/sibling paths
and fixes the canonical owner once when that is the smallest correct change. A local guard is
valid only when the local seam is actually the fault boundary.

## Protected boundaries

Economy never waives:

- input validation at trust boundaries;
- error handling required to prevent corruption, loss, or untruthful success;
- security/identity/authorization enforcement;
- accessibility requirements;
- data invariants, migration, recovery, or rollback obligations;
- environment/hardware calibration needed by the real mechanism;
- explicit approved behavior, AC, NFR, or policy.

Tests/probes remain proportionate to the claim and risk. “Small code” does not imply “no
proof.”

## Deliberate bounded simplification

A deliberately simple mechanism with a known ceiling is acceptable when it is correct for the
current approved scale/risk and cheaper than premature infrastructure. Record, using the
project-authorized comment/ADR/task mechanism:

```text
current ceiling or assumption
observable failure/upgrade trigger
intended upgrade path
```

Do not impose a universal comment marker or create speculative upgrade code now.

## Completion check

Before adding a new dependency or custom mechanism, the owning workflow can explain why every
cheaper plausible rung did not hold the fit gate. Keep that reasoning proportional; do not turn
this reference into mandatory user-facing ceremony.
