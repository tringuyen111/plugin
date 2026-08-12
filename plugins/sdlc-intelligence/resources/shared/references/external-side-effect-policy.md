# External Side-Effect Policy

Read this reference immediately before an operation that changes external or project state, including file writes outside an approved workspace, tracker mutation, commit, pull request, deployment, migration, deletion, credential use, or external communication.

**Canonical maintainer sources:** Side Effects and Capabilities (canonical source only), [Capability Execution Policy](capability-execution-policy.md), and the active project's policy profile.

## Side-effect classes

| Class | Examples | Default behavior without explicit project policy |
|---|---|---|
| `READ` | inspect source, docs, design nodes, logs, metrics | allowed when access is already available |
| `LOCAL_WRITE` | create/update an artifact in an approved project location | require a selected truth location and preserve unrelated changes |
| `EXTERNAL_WRITE` | create/update tracker items, Figma resources, cloud documents, bounded normal service control-plane state | require confirmed provider, scope, authority, canonical side-effect match, and operation policy verdict |
| `SOURCE_CONTROL` | stage, commit, push, open PR, continue rebase | follow project commit policy; never assume permission |
| `DEPLOYMENT` | plan, deploy, promote, rollback | planning may be read-only; execution requires explicit authority |
| `DESTRUCTIVE` | delete, reset, overwrite, migrate data, force-push | explicit confirmation and recovery/rollback evidence required |
| `EXTERNAL_COMMUNICATION` | page, notify, email, publish incident update | require audience, approved content, and authority |

## Decision sequence

Before acting:

1. resolve the required abstract capability and preserve the exact capability-resolution record/SHA-256;
2. inspect live availability and authentication/scope without confusing them with operation authority;
3. create Capability Operation Envelope schema v2 bound to that resolution, exact profile revision, canonical side-effect class, exact operation, and non-secret operation-parameter SHA-256;
4. verify domain responsibility and canonical resource ownership;
5. evaluate authority, preconditions, reversibility, blast radius, protected decision classes, and project policy for that exact envelope;
6. request confirmation only when the policy verdict is `REQUIRE_APPROVAL`;
7. execute only the exact admitted envelope; any operation/parameter/provider/profile/resolution drift requires re-admission;
8. verify the declared postconditions by reading the consumed state or equivalent evidence;
9. compensate when required and supported;
10. capture Integration Result Manifest schema v4 bound to the exact capability-resolution **and operation-envelope** record/SHA-256, and report partial success truthfully.

Missing profile fields never imply permission. Readiness does not grant authority. Approval does not create missing evidence. A reversible operation may still require approval because its volume, visibility, concurrency, downstream invalidation, or cross-system scope is unsafe.

A lower side-effect class cannot absorb stronger semantics. In particular, bounded `service.execute` EXTERNAL_WRITE cannot be used as a deployment, destructive, security/identity, source-control, or external-communication shortcut.

## Minimum action result

Follow `architecture/capabilities/integration-result.schema.json` schema v4. At minimum record the operation identity, requesting skill, canonical owner, exact capability-resolution record reference/SHA-256, exact operation-envelope reference/SHA-256, executor source identity, policy verdict, operation result, precondition state, postcondition verification, compensation status, resources touched, limitations, and evidence.

Never record credentials, tokens, session secrets, or sensitive authentication material. Operation-parameter digests must be computed from a canonical non-secret descriptor; secret values remain in the authorized provider/secret system.
