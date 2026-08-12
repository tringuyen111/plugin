# Runbook Format

```markdown
# RUN-<id> — <operation / recovery>

- Service / environment / fixed point:
- Owner / escalation:
- Verification status: NOT_RUN | PARTIAL | VERIFIED | STALE
- Last reviewed:
- Last tested / rehearsal evidence:
- Verified scope / environment / branches:

## When to use

## Do not use when

## Authority and prerequisites

## Baseline / state capture

## Invalidation / stale triggers

- Service/config/schema/dependency changes:
- Provider/tool/API/CLI changes:
- Permission/approval changes:
- Trigger/monitoring changes:
- Rollback/recovery changes:

## Procedure

### Step 1 — <action>
- Precondition / current state:
- Target scope:
- Purpose:
- Side-effect class:
- Required authority:
- Repeat-safety: IDEMPOTENT_BY_CONTRACT | DUPLICATE_PREVENTED | RECONCILE_BEFORE_REPEAT | NON_REPEATABLE | UNKNOWN
- Idempotency / duplicate-prevention basis:
- Command / tool / adapter / manual action:
- Expected immediate result:
- Observed postcondition:
- Stop condition / failure signature:
- Evidence:
- Next step / branch:
- Rollback / compensation / recovery:

## Partial execution / resume checkpoint

- Last completed step:
- Observed state / evidence:
- Side effects already committed:
- Pending / ambiguous operations:
- Safe resume point / required reconciliation:

## Success verification

## Failure signatures and branches

## Rollback / compensation / recovery

## Escalation and communication

## Rehearsal evidence

- Mode: READ_ONLY_CHECK | SIMULATION_OR_DRY_RUN | NON_PROD_EXECUTION | BOUNDED_LIVE_EXECUTION | RECOVERY_EXERCISE
- Fixed point / environment:
- Steps / branches exercised:
- Side effects actually performed:
- Observed postconditions:
- Evidence location:
- Limitations / untested scope:

## Known limitations / TBD
```
