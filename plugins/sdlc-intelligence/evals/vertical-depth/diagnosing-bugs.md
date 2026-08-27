# Frozen Behavioral Qualification Cases — diagnosing-bugs

Evidence-State: `NOT_RUN`

These cases are frozen before candidate edits. They test decision quality, not keyword presence. Runtime execution is `NOT_RUN` until an actual model/Skill execution is performed.

## Rubric dimensions

- `SYMPTOM_BINDING`: diagnoses the reported failure, not an adjacent signal.
- `CAUSAL_LOCALIZATION`: localizes by execution boundary/invariant/resource class rather than listing generic causes.
- `DISCRIMINATION`: proposes a probe whose outcomes separate live hypotheses.
- `PERTURBATION_AWARENESS`: notices when reproduction/instrumentation can change the mechanism.
- `EVIDENCE_BOUNDARY`: does not overclaim from a tool, mock, one-shot artifact, or unstable predicate.
- `REENTRY`: states what evidence would invalidate the current path and where to re-enter.

## Case D1 — debugger makes intermittent corruption disappear

A service occasionally emits a duplicate charge. Adding detailed synchronous debug logging or stepping through the request makes the failure disappear. Source inspection finds two plausible asynchronous paths, but there is no deterministic local repro. Existing production traces include request IDs and outbound payment-attempt IDs.

Strong behavior must:
- reject “logging fixed it” as causal evidence;
- recognize likely timing/perturbation sensitivity without declaring a race from correlation;
- prefer low-perturbation observation/differential traces across affected and nearby successful requests;
- distinguish logical operation identity, attempts, ordering and duplicate external effects;
- define a falsifier for each leading mechanism;
- re-enter evidence selection if additional instrumentation alters the symptom.

## Case D2 — regression bisection with flaky predicate

A test fails about 20% of runs on HEAD and apparently never on a release from two months ago. The user proposes `git bisect run pytest failing_test.py` immediately.

Strong behavior must:
- refuse to treat a single-run flaky predicate as valid good/bad classification;
- first improve/bound the predicate using repeated trials or a more discriminating symptom oracle;
- explain that skipped/unclassifiable revisions weaken localization certainty;
- use bisection only after the predicate can meaningfully partition revisions;
- keep the possibility of environment/data drift alive if revision alone does not explain the contrast.

## Case D3 — latency spike with ambiguous resource cause

P99 latency doubled while CPU stayed moderate. A downstream span is slower, application queue time also increased, and a retry layer may be enabled in the client library. The team wants to add broad logs and optimize a hot-looking function from source inspection.

Strong behavior must:
- decompose waiting/queueing/service time before optimizing code;
- compare affected vs healthy traces or profiles at the boundary that can distinguish downstream slowness, retry-amplified waiting, and local service work;
- avoid CPU-centric optimization when evidence points to waiting;
- verify actual client retry/runtime behavior instead of assuming configuration;
- define which observation would kill each hypothesis.

## Case D4 — clean race detector run

A concurrent test suite passes under a race detector. Production still has rare stale-state corruption. The suite covers common paths but not the high-load reconciliation path.

Strong behavior must:
- treat the clean dynamic detector run as bounded to executed paths;
- preserve concurrency as a live hypothesis if the unexecuted path can violate the invariant;
- construct a representative workload/trace/interleaving probe for the missing path rather than declaring “no race”;
- distinguish a data race from higher-level atomicity/order bugs the detector may not prove.

## Case D5 — apparent fix only in diagnostic harness

A minimized harness reproduces a timeout. Changing a cache setting removes the timeout in the harness, but the original production-like scenario has not been rerun and the minimized harness removed one queueing layer.

Strong behavior must:
- treat the harness result as support for a candidate mechanism, not closure;
- identify the removed queueing layer as a proof gap;
- rerun the original representative path or add the smallest complementary evidence that restores the missing mechanism;
- re-open the hypothesis set if the original symptom remains.

## Case D6 — diagnosis only, source mutation explicitly excluded

A login failure is intermittent. The user asks: "Find why this happens; do not change code." A low-perturbation trace and existing logs eventually distinguish a stale-session handoff from two other plausible causes. Temporary local instrumentation was added during diagnosis.

Strong behavior must:
- treat the requested terminal outcome as causal diagnosis, not an implicit request to fix;
- reach the strongest evidence-backed causal conclusion and state its confidence/falsifiers;
- not write a regression fix or source correction after the causal gate is satisfied;
- remove/revert temporary diagnostic instrumentation before clean completion unless explicit authority says to preserve it;
- report diagnosis completion without claiming the user-visible behavior is fixed.

## Case D7 — unknown cause, then authorized find-and-fix

A payment flow can create duplicate external charges. The user asks to find the cause and fix it. The first evidence pass leaves multiple mechanisms live; later traces support one causal mechanism and the repository scope authorizes correction.

Strong behavior must:
- preserve causal diagnosis until the mechanism is actually supported rather than speculatively editing;
- after causal proof and mutation authority, continue into a correction without a ceremonial handoff requirement;
- write a regression at the correct causal seam when one exists, see it fail for the intended reason, apply the fix, then see it pass;
- return to the original representative evidence path or agreed post-fix observation before declaring correction closure;
- keep the causal confidence bounded to the evidence actually obtained.

## Case D8 — cause already proven before entry

A prior investigation has already proven that a retry branch creates a new operation ID and violates the idempotency contract. The user asks only to implement the known correction.

Strong behavior must:
- recognize that broad causal diagnosis is no longer the primary job;
- avoid restarting reproduction/hypothesis ceremony merely because the work is bug-related;
- allow ordinary implementation or the dominant domain specialist to own the correction;
- preserve the existing causal evidence as input rather than pretending it must be rediscovered.

## Case D9 — active incident stabilization and diagnosis in parallel

A production incident is actively affecting users. An authorized low-regret mitigation can stop the impact, but the underlying technical cause is still unknown.

Strong behavior must:
- leave incident command, stabilization, and mitigation authority with `incident-response`;
- not delay an obvious authorized mitigation just to preserve a clean diagnostic experiment;
- continue technical diagnosis in parallel or after stabilization using evidence whose perturbation/provenance is explicit;
- not treat mitigation success as root-cause proof.

## Case D10 — causal proof followed by cross-domain correction

Diagnosis supports a causal mechanism whose correction changes API semantics, backend orchestration, durable-data behavior, and security enforcement. The user asked for find-and-fix and the coding scope is authorized.

Strong behavior must:
- preserve one causal chain from observed symptom through supported mechanism to correction;
- use implementation/domain expertise when it can materially change the correction, without making a named sibling mandatory;
- synthesize shared contract/invariant decisions before concurrent writes to shared semantics;
- keep causal ownership coherent rather than creating several contradictory mutation owners;
- verify the correction at both the relevant domain seams and the original representative bug path.

## Case D11 — evidence cannot discriminate material causes

Two mechanisms remain observationally equivalent with the available logs and one-shot forensic artifact. Either could produce the symptom, and choosing between them requires one additional discriminator the agent cannot currently obtain.

Strong behavior must:
- state that causal truth is incomplete and name the smallest missing discriminator;
- keep both material mechanisms live at an honest confidence level;
- not mutate a speculative causal fix simply because one hypothesis seems more plausible;
- return `PARTIAL` or `BLOCKED` according to what the requested diagnosis can actually establish.

## Case D12 — diagnosis-only with temporary instrumentation

During a diagnosis-only request, the agent adds reversible local debug logging tagged with a unique debug prefix. The evidence is sufficient to explain the failure and no source fix is requested.

Strong behavior must:
- perform shared diagnostic cleanup before clean completion;
- remove/revert the temporary instrumentation and verify the cleanup, or explicitly record authorized preservation, owner, scope, and removal trigger;
- separate cleanup of diagnostic mutations from a causal product fix;
- not convert the cleanup step into permission to change unrelated source behavior.

## Case D13 — minimized regression is green, original path remains unverified

After an authorized fix, a minimized regression that models the supported causal mechanism is red before the fix and green after it. The original production-like path cannot yet be rerun or re-observed.

Strong behavior must:
- treat the regression as strong mechanism-level support but not proof that the user's original path is fixed;
- report the missing original-path observation as a proof gap;
- avoid manufacturing an independent QA/release verdict;
- return a bounded completion state such as `PARTIAL` when the requested correction claim still depends on the unavailable representative path.

## Case D14 — HITL fallback remains executable on the supported shell path

A diagnosis cannot be automated and the bounded fallback uses the bundled `scripts/hitl-loop.template.sh` on a Linux/Bash environment.

Strong behavior must:
- keep the bundled template syntactically valid for Bash on the target environment;
- preserve machine-readable captured values so returned HITL evidence can be evaluated rather than treated as an opaque anecdote;
- treat a template that cannot parse/run as an executable-resource defect, not as successful diagnostic evidence.

## Case D15 — HITL does not assume a shared Agent/user terminal

The Agent runtime and the user's terminal are separate, so the user cannot answer `read` prompts inside the Agent's sandbox TTY. Human interaction is still unavoidable for one discriminating diagnostic step.

Strong behavior must:
- adapt/provide the HITL script for a terminal the user can actually access, or run it directly only when the runtime genuinely shares the interactive session;
- ask the user to return the captured evidence block when execution occurs outside the Agent runtime;
- preserve HITL provenance and label the human step rather than silently claiming automated execution.
