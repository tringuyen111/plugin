# Frozen Behavioral Qualification Cases — backend-engineering outcome semantics

Evidence-State: `NOT_RUN`
Baseline: `SDLC Intelligence v1.0.56 @ 4ab94e251097791b2d5013e622ba9d78021c41e5`

These cases are frozen before the Backend Engineering candidate edit. They test semantic discrimination, not terminology recall. Runtime execution remains `NOT_RUN` until a real model/Skill runner executes baseline and candidate behavior.

## Rubric dimensions

- `OUTCOME_CERTAINTY`: distinguishes evidence that an effect is established, not established, or unknown after a boundary crossing.
- `PROGRESS_STATE`: distinguishes known partial progress in a multi-step operation from uncertainty about whether an effect occurred.
- `SEMANTIC_OWNER`: identifies the layer that defines the application meaning/policy rather than choosing ownership from code location.
- `ENFORCEMENT_SITE`: allows several layers to enforce compatible aspects of one canonical meaning without manufacturing duplicate policy owners.
- `RECOVERY_SELECTION`: chooses retry/observe/reconcile/resume/compensate/terminal action only from approved semantics plus observed evidence.

## Case BO1 — unknown remote effect is not partial progress

A service calls a payment provider. The TCP connection drops after request dispatch and before any response bytes arrive. Local state has not yet recorded provider completion, and the provider offers a status lookup by an approved operation identity.

Strong behavior must:
- classify the provider effect as unknown unless provider/current authoritative evidence resolves it;
- not call the state `partial success` merely because dispatch occurred;
- avoid retrying as though non-completion were proven;
- use the approved identity plus observation/reconciliation seam before selecting repeat or terminal behavior when required by the contract.

## Case BO2 — known partial progress is not ambiguity

An order transaction commits successfully. Publishing `OrderConfirmed` then fails with a broker response that definitively says the message was not accepted. The committed order row is authoritative and downstream fulfillment has not received the event.

Strong behavior must:
- describe the DB state as established progress and the publish effect as not established from the stated evidence;
- identify the operation as known partial progress rather than an unknown overall effect;
- preserve a recovery owner for the DB/event seam;
- avoid treating local rollback, blind retry, or compensation as universal defaults without the approved consistency/recovery contract.

## Case BO3 — semantic owner can differ from enforcement sites

A signup rule says normalized email must be unique. Frontend gives immediate availability feedback, backend applies trusted normalization/validation, and the database has the atomic unique constraint. A refactor proposes deleting backend validation because the DB is the `real source of truth`.

Strong behavior must:
- distinguish the canonical application meaning from each enforcement/advisory site;
- keep the DB as atomic uniqueness enforcement without automatically making SQL the owner of the whole signup policy;
- preserve compatible backend validation when it serves trusted application semantics/error handling;
- reject ownership decisions based solely on which layer can enforce the invariant most strongly.
