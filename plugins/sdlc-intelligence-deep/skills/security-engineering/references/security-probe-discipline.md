# Security Probe Discipline

Load this reference when a security implementation claim needs negative/bypass evidence or when the path from untrusted input to protected action is not obvious. The goal is the smallest representative probe that can falsify the exact security claim without turning defensive implementation into exploitation work.

## 1. Build the source-to-enforcement-to-sink graph

For each material class, map a **typed directed graph**. Use only edge types that change the security claim:

```text
SOURCE --DATA--> TRANSFORM / LOOKUP --DATA--> OBJECT / ACTION INPUT
IDENTITY CONTEXT --IDENTITY--> ENFORCEMENT
CANONICAL POLICY / RELATIONSHIP --POLICY--> ENFORCEMENT
ENTRY / ALTERNATE PATH --REACH--> ENFORCEMENT --GUARDS--> PROTECTED SINK / ACTION
ENFORCEMENT --OBSERVE--> ALLOW / DENY / FAILURE EVIDENCE
```

- `DATA` means attacker/caller-controlled or external data can influence the next node.
- `IDENTITY` means the edge supplies authenticated subject/session/claim context; it is not authorization.
- `POLICY` means the edge supplies the canonical relationship/property/action rule or freshness input used by the decision.
- `REACH` means an execution path can arrive at the node.
- `GUARDS` means the enforcement is unavoidable before the protected sink/action for that path.
- `OBSERVE` means the runtime result can prove/falsify the frozen claim without exposing secrets.

Include alternate execution paths that reach the same protected sink: nested routes, bulk/export operations, background jobs, queue consumers, service-to-service callers, webhooks, retries and generated/internal endpoints when present. A path with `REACH` to the sink but no required `GUARDS` relation is a bypass candidate; a named middleware/helper is not proof until the graph shows every material path passes through it with the correct identity/policy inputs.

### Contrastive example: authenticated tenant member, wrong invoice

Suppose `/orgs/{org}/invoices/{invoice}` authenticates Alice and proves membership in tenant A, but the repository later loads `invoice` by ID alone. The graph contains `IDENTITY(Alice) --IDENTITY--> membership-check(A)` and `invoice-id --DATA--> load-by-id --REACH--> invoice-read`, but there is no `POLICY(invoice belongs to A) --> authorization` plus `authorization --GUARDS--> invoice-read` relation. The control that is green (authentication + tenant membership) does not guard the caller-controlled invoice relation.

The discriminating probe keeps Alice, route, method and session constant and changes only the invoice to one owned by tenant B. A real deny through the production enforcement seam closes the object-scope claim; a happy-path invoice from A does not.

## 2. Freeze one security claim per probe

State the claim before running the check, for example:

- “A member of tenant A cannot read invoice B owned by tenant B.”
- “A valid but revoked session cannot authorize after password reset.”
- “The same valid webhook event cannot create a second credit.”
- “A user-controlled avatar URL cannot make the service reach a prohibited network destination.”

Then choose the smallest real boundary that can make the claim false. Avoid broad scanners when one targeted request/harness gives clearer evidence.

## 3. Vary the security-relevant dimension, not everything at once

Keep the legitimate path fixed and change one material dimension:

- identity/authentication absent versus present;
- same-scope versus cross-scope object;
- permitted versus forbidden property/action;
- current versus stale/revoked credential;
- first event versus valid duplicate/replay;
- approved versus prohibited outbound destination;
- same-site/approved browser request versus cross-site state-changing near miss;
- normal versus abusive-but-policy-valid use rate when resource abuse is the class.

This makes a failed probe discriminating rather than merely noisy.

## 4. Follow transformations and indirections

Security-sensitive data often disappears syntactically before the sink: request values become environment variables, decoded claims, model fields, ORM filters, queue messages, helper arguments, URLs or service request objects. Follow the value semantically through those transformations.

When a wrapper/composite/helper hides the enforcement or sink, resolve far enough to prove where the material decision is made. Do not stop at a clean-looking caller.

## 5. Bind proof to the real mechanism

Prefer evidence through the production enforcement seam or a representative runtime boundary. A unit test can prove a pure policy function but not that every route/job calls it. A mocked identity provider can prove downstream policy logic but not token validation/revocation. A stubbed HTTP client can prove URL selection logic but not network egress containment.

When substitution is necessary, state exactly what it removes from the claim and add the smallest complementary probe if the missing mechanism is material.

## 6. Observe denial safely

Record the outcome that matters without leaking secrets:

- status/error category and machine-consumed response shape;
- resource/object actually selected or rejected;
- authorization decision inputs at non-secret scope;
- duplicate/idempotency result;
- outbound destination class and blocked/allowed disposition;
- audit/log event containing useful subject/scope/action/result context but no raw credential/token/secret.

Do not add verbose secret-bearing instrumentation simply to make proof easier.

## 7. Distinguish prevention, detection and recovery

A log/alert does not prevent access; a rate limit does not authorize; a rollback does not make a destructive action safe. State which control is preventative, detective or recovery-oriented and require the evidence appropriate to that claim.

## 8. Closure

Before returning security-domain READY, name:

1. exact policy/design revision or authoritative source used;
2. selected threat/failure class(es);
3. source-to-enforcement-to-sink graph and covered alternate paths;
4. negative/bypass probe(s) actually run and their results;
5. substituted/unverified boundaries;
6. secret/logging inspection when material;
7. remaining risk or owner decision not proved by this implementation unit.

## Provenance

The data-flow and rationalization-resistant review pattern is paraphrased/derived from Trail of Bits' `agentic-actions-auditor` at repository revision `304c81a8cefb6e3c029ebd0d12940ccf0713eccb` (CC BY-SA 4.0), combined with the defensive OWASP sources recorded in the frozen Depth Program source pack. No exploit recipes, payload corpus or offensive automation are imported.
