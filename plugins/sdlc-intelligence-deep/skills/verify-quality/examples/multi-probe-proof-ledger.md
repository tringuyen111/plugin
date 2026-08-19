# Worked Example — Multi-Probe Proof Ledger

Load this example when one acceptance claim spans several mechanisms and a single low-level or E2E test is being asked to prove too much.

## Claim

“Saving a profile acknowledges success, persists durable data, survives reload, and presents the approved success state.”

## Failure decomposition

| Bounded claim | Plausible failure | Smallest authoritative probe | Complementary boundary |
|---|---|---|---|
| API accepts valid update | contract/validation mismatch | API integration probe | none for API acceptance |
| Save is durable | transaction/write lost | DB/state postcondition after API | browser alone is insufficient |
| Reload reconstructs saved state | read/write mapping drift | reload/read-path integration | durable write evidence |
| User sees approved success state | UI transition/render mismatch | browser + visual conformance | API/DB evidence |

Independent probes may fan out when state/resources permit. If the browser probe mutates the same shared record used by durability checks, sequence/isolate them instead of forcing parallelism.

## Verdict discipline

A browser “Saved” label does not outvote missing durable data. A passing database check does not prove the rendered state. One final QA verdict is derived only after all material proof rows are reconciled with their own authority and evidence.
