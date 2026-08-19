# Frozen Behavioral Cases — improve-codebase-architecture architecture pressure

Freeze point: cases defined before the v1.0.31 architecture-pressure mutation. Behavioral runtime execution remains `NOT_RUN` until a real Skill-runtime cohort compares representative behavior.

## 1. Split/isolate beats deepen
A shared service couples public API traffic, a critical batch worker, and an admin flow. Runtime evidence shows overload in one path can fail the others; deployment and recovery need to evolve independently.

**Expected:** architecture-significant failure/deployment relation; consider split/isolate or interaction-topology directions. Do not force a larger shared owner for locality.

## 2. Authorized performance pressure without historical incident
An accepted p99 target is 200 ms. Current topology synchronously fans out to four services and the slowest two dominate the critical path.

**Expected:** authorized target plus inspected topology is a valid driver; analyze temporal/resource coupling without inventing exact broker/API design.

## 3. Trust-boundary pressure
Public and admin operations share an authorization context while current security policy requires stricter privilege separation.

**Expected:** treat trust/authority relation as architecture-significant; consider isolation/boundary or responsibility movement without inventing policy.

## 4. Failure propagation
A non-critical recommendation dependency is synchronous in checkout; production evidence shows its timeout/retries consume the checkout latency budget.

**Expected:** identify temporal/failure coupling and evaluate interaction-topology/isolation directions, not only leaked implementation knowledge.

## 5. Local-refactor near miss
Two adjacent methods duplicate a small pure transformation; changes remain local, no external contract/state/trust/deployment/failure/quality relation changes.

**Expected:** local refactor/implementation concern, not an architecture-improvement candidate.

## 6. Authorized future tenant isolation
Hard tenant isolation is approved for the next release; current code uses one shared tenant-sensitive cache namespace and no incident has occurred.

**Expected:** accepted future constraint plus current source is a valid architecture driver; analyze state/trust ownership pressure without requiring an incident or inventing a storage product.

## 7. Locality gain with availability regression
Candidate A centralizes three policies behind one owner but couples two independently deployed critical paths through a new shared synchronous dependency. Candidate B preserves more caller knowledge but keeps failure isolation.

**Expected:** availability/failure-isolation regression is load-bearing; do not declare A dominant solely because locality improves.

## 8. Clear dominance without selection ceremony
The user asks to find and explore the strongest improvement. Candidate A materially dominates alternatives on current consequence, reversibility, proofability, and has no load-bearing regression.

**Expected:** continue into A without asking the user to repeat the obvious selection.

## 9. Genuine owner tie
Candidate A improves availability but raises cost/operational complexity; candidate B preserves cost but misses an accepted resilience preference. Evidence cannot rank them without owner trade-off authority.

**Expected:** expose the tie, evidence, consequence, sensitivity/flip condition, and ask one bounded owner question when possible. Do not invent a weighted score or require Decision Interview merely to frame the choice.

## 10. Fixed-design frontier
Exploration establishes that durable payment state should move out of `CheckoutComponent`, while exact owner API, schema, migration sequence, cutover, and rollback design remain undecided.

**Expected:** complete the architecture direction with evidence, constraints, compatibility/reversibility pressure, proofability, and exact fixed-design frontier. Do not invent detailed design or downgrade the architecture sub-result because Codebase Design is absent.

## Standalone composition invariant
For every case above, the Skill must perform its own architecture-significance/root/intervention/trade-off reasoning without requiring sibling Skill context. A sibling may supply distinct semantic/decision/design/planning continuation when available, but missing a named sibling is not itself a failure state.

## Proof level
Frozen source-level behavioral expectations only. Native/package validation cannot prove these outcomes. Behavioral status remains `NOT_RUN` until representative runtime/model executions occur on exact candidate bytes.
