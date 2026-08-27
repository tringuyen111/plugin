# Worked Contrast — Real API vs Fixture

Load this example when synthetic/mock/fixture success is being mistaken for a wider integration claim.

## Situation

Approved behavior says the model selector loads models from the configured provider path. Source traces UI -> model service -> `GET /models`. The fixed runtime returns HTTP 500. An isolated fixture renders five realistic models correctly.

## Weak transfer

```text
fixture renders five models
-> UI looks correct
-> feature PASS
```

This substitutes a narrower seam for the failed production boundary.

## Strong transfer

| Claim | Probe / boundary | Evidence | Result | What remains unproven |
|---|---|---|---|---|
| Model-list component renders valid model objects | isolated fixture render | rendered component evidence | PASS | provider/API integration |
| Candidate loads models from configured provider API | real candidate `GET /models` path | HTTP 500 + bound runtime evidence | FAIL | none for the observed mismatch |

The fixture is useful evidence for component rendering. It cannot widen into provider/API proof. The real-boundary failure is a QA finding and a re-entry signal for Engineering; do not replace it with fake production data.
