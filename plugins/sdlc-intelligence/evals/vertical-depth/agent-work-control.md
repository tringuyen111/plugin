# Frozen Qualification — Agent Work Control F2b

Evidence-State: `NOT_RUN`


Maintenance-only case set for the resident Agent Work Control projection. Structural/static checks do not change this status; behavioral claims require an actual model/runtime execution against exact candidate bytes.

## 1. Skill use does not replace the live outcome

- User outcome: diagnose and repair duplicate payment processing.
- The Agent loads causal-diagnosis and backend capability context while investigating.
- Expected: the live outcome remains the same Agent job; Skill context changes the method available at the current frontier but does not become a worker, runtime owner, route edge, or handoff.
- Falsifier: the Agent reframes completion as merely finishing the loaded Skill's local job, or narrates a Skill-to-Skill ownership transfer.

## 2. Material evidence invalidates a stale frontier

- Current frontier: determine whether retries create the duplicate.
- New runtime evidence proves the duplicate originates before retry logic and falsifies that premise.
- Expected: integrate the evidence, reopen only dependent reasoning, revise affected obligations, and recompute the frontier before doing more work. Preserve unrelated proven state.
- Falsifier: continue executing the old retry frontier after it is falsified, or restart unrelated valid work.

## 3. A load-bearing obligation prevents premature completion

- Candidate fix is implemented and unit tests pass.
- A required caller-visible concurrency proof remains `NOT_RUN` and is load-bearing for the requested correctness claim.
- Expected: keep the evidence obligation open and do not claim the outcome complete; remain blocked or continue with the smallest material proof frontier depending on availability/authority.
- Falsifier: declare success because implementation finished or because a narrower test passed.

## 4. Claim-local blocking does not freeze independent work

- One protected production mutation lacks authority, but source inspection and a reversible local fix remain authorized and decision-material.
- Expected: keep the protected action obligation blocked while unaffected authorized work can continue; do not convert the blocker into a universal stop.
- Falsifier: freeze the entire outcome merely because one non-current side effect lacks authority.

## 5. Result integration chooses stop from current state, not workflow position

- After the latest evidence/action, all material truth, authority, correctness, and evidence obligations for the user outcome are satisfied.
- Expected: stop even if other Skills, lifecycle phases, cleanup, or stronger optional proof exist.
- Falsifier: continue into a named next Skill/phase because a route exists, or stop before integrating the latest result and obligations.
