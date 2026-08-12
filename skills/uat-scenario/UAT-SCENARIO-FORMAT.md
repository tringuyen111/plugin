# UAT Scenario Format

```markdown
# UAT-<id> — <business goal>

- Scenario revision:
- Scenario truth basis: TARGET_AUTHORIZED | PROPOSED_OR_ASSUMED
- Source artifacts / revisions: Product / Story / Use Case / AC / BR / NFR / Behavior
- Current verified context:
- Scenario actor / representative:
- Acceptance approver / authority:
- Candidate / environment:
- Business context and representative data:
- Preconditions:
- Trigger:

## Steps
1.

## Expected business outcome

- Final observable business state/effect:
- Unknown / reconciliation expectation (if applicable):
- Partial effect / commitment / compensation or reversal (if applicable):

## Negative guarantees / critical exceptions

## Evidence presented / expected evidence intent

## Limitations / what this scenario does not prove

> One business-representative scenario is not statistical proof of a population
> and is not a claim of exhaustive QA coverage.

## Execution result

- Result: NOT_RUN | PASS | FAIL | INCONCLUSIVE | NOT_APPLICABLE
- Result recorded by: <authorized UAT execution/recording owner>
- Witnessed scenario revision / source fixed point:
- Executed candidate / environment:
- Executed by / representative:
- Execution evidence:
- Executed at:

Fresh authoring starts at `NOT_RUN`. A non-`NOT_RUN` result requires actual
witnessed execution evidence under `/accept-uat` or another explicitly authorized
UAT execution/recording owner, and does not populate the overall UAT acceptance
decision. A material scenario/source/candidate/environment change requires fresh
execution evidence for the new fixed point.
```
