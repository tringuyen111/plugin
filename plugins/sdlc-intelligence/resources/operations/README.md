# Operations

Operations owns release readiness, authorized deployment execution, normal service operation, production procedures, stabilization, recovery, and incident coordination. It does not redefine Product behavior, replace QA/UAT, guess technical root cause, or execute external side effects without explicit authority.

## User-invoked

- **[release-gate](../../skills/release-gate/SKILL.md)** — Assess one fixed candidate for release readiness with evidence, approvals, rollback, monitoring, and known risk; deployment remains explicit.
- **[deploy-release](../../skills/deploy-release/SKILL.md)** — Deployment Engineering owner: prepare revision-bound Deployment Plans before release assessment, then execute, verify, and recover the exact authorized release after `READY_FOR_RELEASE`.
- **[service-operations](../../skills/service-operations/SKILL.md)** — Normal service-operations owner: consume post-deploy/runtime evidence, assess operational health, execute only bounded authorized routine actions, verify postconditions, and hand off incidents/diagnosis/runbook/deployment/Product learning.
- **[runbook](../../skills/runbook/SKILL.md)** — Create or update an evidence-grounded operational procedure with prerequisites, safe steps, verification, rollback, and escalation.
- **[incident-response](../../skills/incident-response/SKILL.md)** — Coordinate an active incident through impact assessment, stabilization, factual communication, timeline, and recovery.

## Model-invoked

- **[postmortem](../../skills/postmortem/SKILL.md)** — Reconstruct a stabilized incident from evidence, distinguish symptom/contributing factor/root cause, and create canonical follow-up actions without blame or speculation.
