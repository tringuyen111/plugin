# Frozen Behavioral Qualification Cases — api-engineering

These cases were frozen before the candidate edit. They test whether API Engineering improves caller-contract decisions rather than merely adding protocol vocabulary. Runtime execution is `NOT_RUN` until a real model/Skill runner compares baseline and candidate behavior.

## Rubric dimensions

- `CALLER_JOURNEY`: starts from the caller's intended outcome and identifies what the caller must know/do after each material result.
- `CURRENT_SURFACE`: inspects existing operations, schemas, clients/SDKs and compatibility before creating parallel contract truth.
- `INPUT_SEMANTICS`: separates wire/schema admissibility from domain/security/data decisions.
- `OUTPUT_ACTIONABILITY`: success/error/accepted/partial responses give enough stable information for the approved next action.
- `COMPLETION_TRUTH`: distinguishes accepted, completed, partial and ambiguous outcomes without treating transport success as business completion.
- `RETRY_IDENTITY`: distinguishes retry of the same logical operation from a new business intent.
- `ATOMICITY_BOUNDARY`: states caller-visible all-or-nothing/partial semantics without claiming the API owns the datastore/distributed mechanism.
- `COMPATIBILITY_PROOF`: reasons from actual serialized consumers rather than internal type similarity.

## Case A1 — schema-valid but domain-invalid input

`POST /orders` receives syntactically valid JSON with valid types, but the account is suspended or inventory cannot satisfy the order.

Strong behavior must:
- accept that transport/schema validation can pass while the domain operation is rejected;
- keep business/security/data truth at its canonical seam;
- require a stable caller-visible outcome that lets the client correct, stop or choose the approved next action;
- avoid moving business rules into request-schema validation merely to make all rejections look uniform.

## Case A2 — accepted export with no completion journey

`POST /exports` returns `202 {"status":"accepted"}` but no operation identity, status/result path, terminal failure model, expiry or recovery semantics.

Strong behavior must:
- identify that acceptance is not completion;
- mark the contract incomplete for a caller that must later obtain the export;
- derive the missing caller journey from approved async semantics rather than inventing a provider-specific shape;
- prove accepted and terminal outcomes through the real transport path.

## Case A3 — lost response after charge

The charge provider may have completed the effect before the API response is lost; the client retries.

Strong behavior must:
- distinguish the same logical operation from a new purchase intent;
- bind duplicate/in-flight/final caller semantics to an approved operation identity or natural repeatability mechanism;
- preserve an ambiguous outcome until evidence resolves it;
- leave atomic persistence/deduplication mechanics to Backend/Data while proving the caller-visible contract.

## Case A4 — partial bulk semantics

A bulk request contains 100 independent item mutations; 97 succeed and 3 fail. Product semantics have not yet said whether the batch is all-or-nothing or per-item.

Strong behavior must:
- refuse to infer atomicity from the single request envelope;
- surface the missing operation-completion semantics rather than picking 207, rollback-all or per-item results by habit;
- if partial outcomes are approved, require stable item/result identity and actionable errors;
- if all-or-nothing is approved, state that caller guarantee while requiring a real Backend/Data/System Design mechanism capable of upholding it.

## Case A5 — existing API surface already owns the capability

Current API already supports `PATCH /users/{id}` status transitions; a proposal adds `POST /users/{id}:deactivate` for the same approved caller concept.

Strong behavior must:
- inspect existing routes, schemas, SDKs and real consumers before creating the operation;
- reuse/extend the existing caller-visible owner when semantics fit;
- keep a new operation only if a real distinct caller concept/lifecycle/compatibility need justifies it;
- avoid using internal handler structure as the contract model.

## Case A6 — valid success response that is not actionable

An operation returns `200 {"status":"success"}` but the caller needs the created resource ID or current version to continue safely.

Strong behavior must:
- reject schema validity as sufficient contract proof;
- identify the stable result/state identity the approved caller journey requires;
- inspect status/headers/body/serialization together;
- keep optional fields or links out unless they change caller behavior or proof.
