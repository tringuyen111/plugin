# Frozen Behavioral Qualification Cases — api-engineering outcome semantics

Evidence-State: `NOT_RUN`
Baseline: `SDLC Intelligence v1.0.57 @ 0d443deee31fad60831434854bc3aee602373fbd`

These cases are frozen before the API Engineering candidate edit. They test semantic discrimination rather than terminology recall. Runtime execution remains `NOT_RUN` until a real model/Skill runner executes baseline and candidate behavior.

## Rubric dimensions

- `OPERATION_IDENTITY`: distinguishes one caller-intended Logical Operation from individual transport Request Attempts and from merely equal payloads.
- `OUTCOME_EVIDENCE`: distinguishes what authoritative evidence establishes about a caller-visible effect: `ESTABLISHED`, `NOT_ESTABLISHED`, or `UNKNOWN`.
- `PROGRESS_STATE`: distinguishes known Partial Progress from uncertainty about whether an effect occurred.
- `ACCEPTANCE_COMPLETION`: distinguishes the server accepting responsibility/work from the caller-visible operation reaching approved terminal completion.
- `RECOVERY_ACTION`: derives retry/refetch/status/reconcile/stop behavior from approved Caller Contract plus evidence rather than transport labels or habitual API patterns.

## Case AO1 — unknown effect is not known partial progress

A client starts a payment Logical Operation. The API dispatches the approved provider operation, then the connection to the client drops before any response is delivered. The API has no authoritative completion record yet, but the provider supports status lookup by the approved operation identity.

Strong behavior must:
- classify the payment effect as `UNKNOWN` until authoritative evidence resolves it;
- not call the outcome `partial success` merely because dispatch occurred;
- keep the caller recovery path tied to the same Logical Operation rather than assuming non-completion from the lost response;
- require the approved observation/reconciliation seam before selecting a repeat or terminal outcome when the contract requires certainty.

## Case AO2 — known Partial Progress is not ambiguity

An API operation performs two approved caller-visible steps. The first durable resource creation is confirmed and returns a stable resource identity. The second downstream registration receives a definitive rejection proving it did not occur. The overall Logical Operation is not complete.

Strong behavior must:
- treat the first effect as `ESTABLISHED` and the second as `NOT_ESTABLISHED` from the stated evidence;
- describe the operation as known Partial Progress rather than an ambiguous overall result;
- expose only the approved caller recovery/next-action semantics for that known state;
- avoid blind retry, rollback-all, or compensation claims unless the approved Backend/Data/System Design semantics support them.

## Case AO3 — equal requests do not define one Logical Operation

A caller submits two intentional purchases of the same SKU, quantity, shipping address, and price within one minute. Separately, a network retry for the first purchase arrives with the same approved operation identity but a different tracing header and a refreshed bearer token.

Strong behavior must:
- allow the two intentional purchases to be distinct Logical Operations despite equal business payloads;
- recognize the retry as another Request Attempt of the first Logical Operation when the approved identity/equivalence semantics say so;
- not use raw JSON equality, request ID, connection identity, or tracing metadata as the sole operation-identity rule;
- reject reuse of one operation identity for materially different intent according to the approved contract.

## Case AO4 — Acceptance is not Completion

An export API returns `202 Accepted` with an operation identity and status URL. The status resource says `running`; no terminal result exists yet. A later terminal state will provide either the export result location or a stable failure outcome.

Strong behavior must:
- treat the initial response as Acceptance, not Completion;
- recognize that the contract may already be complete enough for the caller journey if identity, status, terminal result/failure, retention and recovery semantics are approved and observable;
- avoid demanding synchronous completion merely because the caller ultimately needs a result;
- prove Acceptance and terminal Completion as different observable states through the real transport path when that is the claim.
