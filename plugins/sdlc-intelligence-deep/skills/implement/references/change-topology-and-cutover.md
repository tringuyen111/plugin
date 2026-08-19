# Change Topology and Cutover
Load this when a fixed implementation change crosses material old/new surfaces: readers or writers, generated artifacts, config/defaults, registration/discovery, durable state, independently updated consumers, feature-selected paths, or another compatibility/cutover edge. Skip it for a truly local change whose one consumed seam and focused proof establish correctness.
This is transient implementation reasoning, not a required project artifact. Build only enough topology to choose and verify a coherent mutation sequence.
## 1. Freeze transition truth
State briefly:

```text
CURRENT   implementation/contract/state active now
TARGET    intended active truth after cutover
PRESERVE  named behavior, compatibility, data, rollout, or consumer obligations
```

A target source shape does not authorize breaking a current compatibility obligation. If the target depends on unresolved architecture, Product, data, security, or release truth, return that affected decision to its owner.
## 2. Reconstruct material surfaces

Trace only surfaces whose old/new state can change correctness, compatibility, discovery, or proof:

```text
producers/writers
      -> canonical implementation/state/contract
           -> readers/callers/consumers
           -> generated derivatives
           -> config/defaults/registration/discovery
           -> durable/cache representation
           -> external/runtime seam
           -> proof oracle
```

Do not use file adjacency or imports as completeness evidence. Hidden surfaces commonly include runtime/string registration, generated clients/schemas/manifests, config read by independently updated processes, old durable state, exhaustive consumers/serializers, and flags/fallback selectors.

Load domain specialist depth when one of these surfaces introduces API, data, frontend, backend, security, dependency, architecture, or deployment semantics that can change the implementation.
## 3. Classify ordering/overlap edges

| Relation | Meaning | Consequence |
|---|---|---|
| `MUST_PRECEDE` | B is unsafe until A exists/proves | introduce/prove A before migrating B |
| `CAN_OVERLAP_BOUNDED` | old/new may coexist under a named obligation | keep both only for that obligation and define exit |
| `MUST_NOT_OVERLAP` | coexistence creates competing truth/invalid state | switch at the approved authoritative seam/mechanism |
| `DERIVED_FROM` | one surface is generated from another authority | change authority, regenerate, verify |
| `INDEPENDENT` | order is semantically irrelevant | choose the smallest convenient slice |

Compilation together does not prove `CAN_OVERLAP_BOUNDED`. Coexistence needs a real compatibility, rollout, experiment, or migration obligation.
## 4. Derive the mutation sequence

Choose the smallest sequence that keeps every **material intermediate state** coherent. Common shapes include:

```text
introduce compatible capability
-> prove required old/new obligations
-> migrate callers/writers/registration
-> verify target consumption
-> remove superseded path
```

or, when overlap is forbidden:

```text
prepare target behind existing owner seam
-> switch the authoritative selector/cutover point
-> prove consumed behavior
-> delete unreachable old implementation
```

Do not apply expand/contract, dual-read/write, feature flags, adapters, or similar migration patterns by habit. The observed topology and fixed semantics must require them.
## 5. Make temporary dual truth explicit

When two paths must coexist temporarily, bind:

```text
WHY       named compatibility / rollout / experiment obligation
SELECTOR  who/what chooses old versus new
PROOF     how both paths and their interaction are observed
EXIT      condition that removes the old path
```

A fallback kept only because the new path is untrusted is not a safe coexistence contract. Prove parity at the real seam or keep the result `PARTIAL`; do not hide uncertainty behind permanent duplicate logic.
## 6. Prove transition claims at the consumed seam

- mixed-version compatibility -> exercise representative required combinations;
- generated/derived surface -> regenerate through its owner and inspect the consumed derivative;
- config/registration/discovery -> inspect actual runtime resolution, not only imports/types;
- durable transition -> prove relevant old/new reader/writer state with data-persistence depth;
- replacement -> prove the target is consumed and the superseded path is no longer active before deletion is complete.

Compilation is sufficient only when it can falsify the material transition claim.
## 7. Re-enter when evidence breaks the sequence

```text
unexpected old consumer            -> topology incomplete
wire/state mismatch during overlap -> overlap classification wrong
new path needs old fallback        -> target parity not established
runtime still resolves old path    -> cutover incomplete
```

Keep the contradicting evidence and return to the earliest invalidated topology, compatibility, or target-truth assumption before adding later slices or compatibility shims.
## Stop condition

Stop this branch when current/target truth, material surfaces, ordering/overlap constraints, temporary coexistence exit, and risky intermediate/final proof are clear. If that adds nothing beyond one local caller and one focused proof, return to the ordinary edit -> run -> observe loop.
