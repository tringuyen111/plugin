# Example Sequencing and Informative RED

Load this when the next example is not obvious, one example can be overfit, a target test is unexpectedly green, or RED may be caused by setup/runtime failure rather than missing behavior. Keep the list transient unless the project already has a canonical test-plan artifact.

## 1. Keep a live behavior/test list

Capture only examples that can still change implementation, design pressure, or bounded proof. Tag their role when useful:

- `PRESERVE` — characterization/current behavior that must survive the change;
- `TARGET` — approved new/changed behavior that should first become RED;
- `BOUNDARY` — an input/state edge that distinguishes two plausible semantics;
- `FAILURE` — an error/exception/rejection state that changes the observable contract;
- `INVARIANT` — a property that should hold across a meaningful class of examples.

This is a thinking surface, not a requirement to author all tests up front. Add/remove/reorder candidates as each cycle teaches you more.

## 2. Choose the next test by information gain

Pick the smallest executable example that most usefully distinguishes the remaining plausible behaviors or implementation shapes. Prefer a candidate that exposes a salient unresolved point, for example:

- a boundary that decides inclusive versus exclusive behavior;
- a second ordinary example that prevents a one-example constant/special-case fit;
- a failure state that fixes the caller-visible error/recovery contract;
- a compatibility case that protects current behavior while a new branch is added;
- an invariant/property when many example rows would only repeat the same relation;
- an interface-usage example when two allowed implementation-level seams lead to meaningfully different coupling or usability.

Do not sequence tests merely from easiest to hardest or enumerate every input. A new example earns a cycle when its result can change the implementation, bounded interface design, contract understanding, or confidence in the current behavior. Broader coverage optimization still belongs to QA/test strategy.

## 3. Validate what RED means before coding

Use this disposition table for the active test:

| Observed state before the intended production change | Meaning | Action |
|---|---|---|
| `TARGET` fails because the approved behavior is absent/wrong | **VALID RED** | make the smallest coherent production change that satisfies this bounded behavior |
| `TARGET` is already green | behavior may already exist, assertion may be weak, seam may be wrong, or test may be redundant | inspect the reason; strengthen/rebind/remove the test or close the slice if behavior already exists — do not add code merely to manufacture a cycle |
| test cannot run or fails in fixture/build/environment before reaching the behavior | **INVALID RED** | repair/diagnose the harness or choose a valid seam; production code must not be driven by this failure |
| `PRESERVE` characterization is green | current baseline captured | keep it green while adding the separate TARGET slice |
| `PRESERVE` characterization fails against the bound baseline | current truth and expected oracle disagree | stop/reconcile baseline truth before changing behavior |

A RED is useful only when its failure is evidence about the intended behavior.

## 4. Green without overfitting or speculation

Implement the smallest **coherent** change supported by the approved behavior already bound to the task and the examples proven so far. Avoid two opposite mistakes:

- **overfit:** special-case the current example when another already-known approved partition would immediately falsify it;
- **speculative generalization:** build abstractions/branches for hypothetical cases not present in approved behavior or the live test list.

When the current example still permits materially different implementations and that difference matters, choose the next discriminating test before generalizing by intuition.

### Contrastive example

A shipping rule is approved as banded by weight. The first test `1kg -> 5` can be passed with `return 5`. Do not treat that single green as proof of the rule. Put a boundary/second-band example next, make it RED for the intended distinction, then generalize only enough for the now-proven bands. Conversely, if `isEmpty([]) -> true` is the only missing unambiguous branch, ordinary RED -> GREEN is sufficient; no sequencing ceremony is needed.

## 5. Refactor under the green behavior envelope

After GREEN, inspect both production and test structure. Improve structure only while the same externally observable behavior remains green:

- remove duplication exposed by repeated examples;
- clarify names and ownership;
- refine an implementation-level interface when test use reveals awkward coupling and the externally owned contract remains unchanged;
- simplify redundant test setup/assertions while preserving specificity and bounded predictiveness.

Rerun the same green proof after structural changes. If the desired refactor changes behavior or an externally governed seam, leave the refactor step, bind the new semantic decision, and start a new TARGET RED. If there is no material structural pressure, move on without cosmetic churn.

## 6. Re-enter when evidence or method fit contradicts the current model

- A later example invalidates an earlier assumption -> update the live list and re-enter at next-test selection/generalization.
- Integration/runtime evidence contradicts a double-backed green -> re-enter proof/seam selection using the Skill-root `mocking.md` guidance.
- A test keeps needing internal call-order assertions -> re-enter the behavior/seam decision unless that interaction is itself the contract.
- The next candidates only add broad coverage without changing the bounded implementation decision -> return that concern to QA/test strategy instead of expanding the TDD slice indefinitely.
- Every available test-first seam is too slow/nondeterministic to drive code, while smaller seams remove the mechanism that matters -> surface the method-fit/proof limitation; do not fabricate a fast RED/GREEN loop.
