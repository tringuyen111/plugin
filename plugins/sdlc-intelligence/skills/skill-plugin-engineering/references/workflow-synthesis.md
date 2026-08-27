# Workflow Synthesis

Derive the work sequence from the actual request and evidence. Do not map verbs to fixed route IDs.

The workflow must be complete for the accountable outcome, not artificially short. “Do not widen scope” means do not take ownership of a different terminal outcome; it does not permit dropping a hard case, recovery step, or adjacent-domain effect required to make the current outcome true.

## Inputs to workflow design

Use:

```text
terminal truth
+ starting artifact/revision
+ decision-changing unknowns
+ reversibility and blast radius
+ authority/approval boundary
+ dependencies and side effects
+ final proof burden
```

## Synthesis method

1. **Name the terminal truth.** What must be true when the request is complete?
2. **Bind the starting truth.** What exact bytes/state/evidence are current?
3. **List decision-changing unknowns.** Ignore questions whose answers cannot change the intervention, authority, or proof.
4. **Place evidence before dependent mutation.** Research, inspection, or runtime checks belong before a decision only when their result can alter it.
5. **Place approval at consequence boundaries.** Ask for user/owner choice when scope, intent, irreversible/high-cost trade-off, protected side effect, or accepted risk changes.
6. **Materialize only the accepted complete intervention.** Do not widen ownership merely because nearby defects exist, but include every material hard case, recovery, dependency effect, and proof obligation required by the accepted outcome.
7. **Verify the terminal claim.** Match evidence to the claim rather than running every available test.
8. **Re-enter at earliest invalidated truth.** A packaging defect returns to materialization; a discovered boundary flaw returns to design; new conflicting source truth returns to inspection.

Use a compact control graph when branching/re-entry would otherwise be reconstructed from prose:

```text
STARTING TRUTH
      ↓
UNKNOWN / DEFECT
      ↓
GATE: what decision changes next?
      ↓
EVIDENCE / METHOD / AUTHORITY needed for that gate
      ↓
ACTION
      ↓
VERIFY CLAIM
  ┌───┴──────────────┐
PASS              FAIL / NEW EVIDENCE
  ↓                    ↓
NEXT/END       EARLIEST INVALIDATED TRUTH
                       └─────── loop ───────┘
```

This graph is an execution relation, not a lifecycle router. Different requests may have different gates, branches, and terminal truths.

## Typical semantic differences

These are examples, not routes:

- **Review:** normally read/compare -> findings/verdict; mutation is out of scope unless separately requested.
- **Audit:** reconstruct claim -> seek supporting and counter-evidence -> root cause/disposition -> acceptance evidence.
- **Create:** establish job -> prove artifact class -> design mechanism/context -> approve material boundary -> materialize -> verify.
- **Upgrade/repair:** bind exact current bytes and observed weakness -> diagnose -> read the candidate as the consuming Agent -> choose the smallest complete change -> approve if material -> patch -> cold-reread the changed loading path -> regression verify -> re-enter only the falsified dependency when proof fails.
- **Package:** bind candidate bytes -> run native creator/package checks -> inspect package contents/hash -> report only package-level claims unless more evidence runs.
- **Migrate/replace:** inventory consumers -> prove replacement parity -> authorize cutover -> update all active surfaces -> verify postconditions -> remove superseded truth.

## Research economy

Research is material when current primary evidence is missing, stale, disputed, provider-specific, or decision-sensitive. It can be skipped when exact authoritative local evidence already decides the issue.

Research is not a mandatory stage and approval is not a substitute for research.

## Failure signatures

- every request follows the same audit -> research -> approve -> run sequence;
- review mutates by default;
- research occurs after the solution was already hard-coded;
- approval is requested for reversible implementation details already inside an accepted boundary;
- a late test failure restarts discovery instead of returning to the affected truth;
- workflow continues into release/publication merely because candidate construction succeeded;
- completion language hides `NOT_RUN`, missing authority, or missing exact source.
- “minimal scope” is used to drop a material edge/failure case that still determines whether the accountable outcome is actually complete.
- the workflow is a long paragraph even though a gateway, legal branch, or recovery loop materially changes the next action.
