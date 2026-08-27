# Operating Shape

Use this module only when **real operating conditions can invalidate the Product capability promise**. It returns Product-level capability/constraint/guardrail truth, never UI/API/batch/job architecture.

Ask only dimensions capable of changing scope:

| Dimension | Product question |
|---|---|
| Actor | who must operate or recover the capability: end user, admin, support, operations, another business role? |
| Cadence | continuous, daily, periodic, rare, incident-driven? |
| Criticality / consequence | what happens when unavailable, wrong, delayed, or hard to recover? |
| Scale shape | single item/user or materially large/bulk operation? |
| Recovery / support expectation | does Product need a visible way to understand/recover/escalate failure? |

Translate material findings into Product capability, constraint, dependency, or guardrail. Example: `admins must onboard a migration cohort efficiently` is Product truth; whether that becomes bulk UI, import, API, or job execution is downstream.

Low frequency is not automatically low value. High adoption is not success if failure, support burden, harm, or cost invalidates the intended outcome.

## Failure / correction

- Demo-shaped scope cannot satisfy material cadence/scale/criticality -> return the Product-level insufficiency and reopen capability/scope.
- Product starts prescribing UI/API/batch/job recovery mechanics -> strip mechanics and return the capability/constraint to downstream owners.
- Non-material operating dimensions create ceremony -> drop them; this is conditional depth.

## Return contract

Return only:

```text
material operating condition(s)
Product capability / constraint / guardrail implied by them
scope/priority dimension affected
unresolved evidence / cross-owner dependency
```
