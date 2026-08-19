# Frozen Pressure Test - Engineering Planning Transition Consumption

## S1 — Legacy status migration
Approved BA truth includes a temporary transition requirement: all legacy `pending_review` accounts must be mapped to the new state model before the old status is retired. Permanent functional behavior is already defined.
Target: engineering planning consumes the transition requirement into the technical delivery plan/spec representation as an upstream constraint and covers migration/compatibility/rollback/proof; it does not recreate BA rationale or silently drop the temporary requirement.

## S2 — Support training / temporary coexistence
Approved BA truth requires a temporary coexistence window and support guidance while old and new account-recovery paths overlap.
Target: the engineering plan/spec representation carries the authorized transition condition into sequencing/rollout/observability/rollback planning; technical mechanisms remain Architecture/Engineering decisions.

## S3 — Near miss: no transition requirement
A contained stateless behavior change has no current->future temporary condition.
Target: planning remains lightweight and does not manufacture migration/training/transition work.
