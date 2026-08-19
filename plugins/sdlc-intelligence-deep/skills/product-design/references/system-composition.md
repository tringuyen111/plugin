# System Composition

## Contents
- Part <-> whole reasoning
- System coherence invariants
- Reuse before invention
- Component contract: job, anatomy, slots, variants, instances, overrides
- Tokens as relationships
- Design source of truth and change propagation
- Real-content/system stress
- Decision packet and worked contrast
- Failure patterns

Use this reference when a Design System exists, when repeated UI roles/components/tokens must remain coherent across surfaces, or when a Design change may propagate beyond one local instance.

## Decision packet — shared/system change

- **Cue:** one visual/interaction decision repeats, drifts, or may propagate beyond a local instance.
- **Mechanism:** locate semantic invariant and supported ownership relations from observed instance through component/pattern, semantic role, token/asset mapping, and representative consumers.
- **Selection:** choose the smallest valid scope: `INSTANCE`, `COMPONENT`, `SEMANTIC_ROLE`, or `FOUNDATION`.
- **Failure:** broad edits are justified only by visual similarity, token names, or a single broken consumer.
- **Correction:** test the strongest local-vs-shared alternative explanation and inspect neighboring consumers before widening scope.
- **Consequence:** record Design propagation and proof targets; hand implementation dependency discovery to Frontend Engineering.

## Atomic thinking is bidirectional

Do not treat atomic design as a one-way production pipeline. Repeatedly move both directions:

```text
atom -> component -> region -> page -> product
product -> page -> region -> component -> atom
```

A locally elegant component can create global noise when repeated 40 times. A dense real page can reveal that a component's padding, type, border, state model, or token mapping is wrong.

## System coherence = stable invariants + controlled variation

Do not equate consistency with pixel sameness. Decide which invariants must survive across screens, densities, themes, and input/composition modes:

- semantic meaning and consequence;
- action priority and state meaning;
- component anatomy/slot ownership when the same role is reused;
- typography/color/material/icon language;
- focus/selection/disabled/pending behavior;
- system source-of-truth and exception ownership.

Allow geometry, disclosure, density, control presentation, or placement to vary when context changes **and** the invariant remains recognizable. Treat unexplained local variation as potential drift, not personality by default.

A useful coherence question is:

```text
What must stay the same because the meaning is the same?
What may change because the constraint/context is different?
What changed with no semantic/system reason?
```

## Reuse semantics, not merely shapes

Inspect the actual existing shell, tokens, roles, components, variants, states, density modes, asset mappings, and consuming contexts before creating a new one.

Use an existing role when its semantics and state behavior fit. Extend the existing role when the need is genuinely the same concept with one missing supported variant. Create a new role only when the interface must communicate a materially different semantic/interaction relation that existing roles cannot express truthfully.

Do not create a local visual system because a feature should "feel distinctive."

## Construct a component contract from the repeated job

Do not componentize from shape repetition alone. Build the contract in this order:

```text
semantic job
  -> invariant anatomy
      -> slots
          -> controlled properties / variants / states
              -> instances
                  -> authorized contextual overrides
```

### Invariant anatomy
Define the stable semantic regions the job needs: identity/content, primary value/status, supporting metadata, leading/trailing media, primary/secondary action, selection/focus/disabled/pending/error state, disclosure, etc. Use names that explain the job rather than generic `header/body/footer` when possible.

### Slots
A slot is a stable semantic region whose composed content may vary. The slot still owns constraints: expected content kind, layout behavior, state/interaction relation, and pressure handling. A slot is not an escape hatch for arbitrary subtree replacement.

### Variants and properties
Use a variant/property for a controlled dimension of the **same** job: size, density, emphasis, state, orientation, or supported content configuration. If the variants require unrelated anatomy, action ownership, or state meaning, reopen whether they belong to one component.

### Instances and overrides
Instances inherit the shared contract while supplying contextual content and approved properties. Repeated local geometry/color/state overrides are evidence that the shared anatomy, token mapping, or role boundary may be wrong.

### Componentization falsifier
Several regions can share surface/type/spacing foundations without becoming one component. Keep them local when their jobs, state behavior, evolution, or content pressure are materially different and a generic API would erase meaning.

For authoring representation choices such as frame/group/grid/component/style/text ownership, load `construction-system.md`. For interactive target/state mechanics, load `control-interaction-anatomy.md`.

## Tokens encode relationships

Spacing/type/color/surface/elevation tokens are useful when they preserve meaningful repeated relationships. A token name does not prove the relationship is correct.

Prefer semantic roles (`surface-raised`, `text-secondary`, `space-group`, `action-danger`) over copying raw values into feature-local styles. But do not invent a new token taxonomy inside one feature without current shared need.

Two equal raw values are not automatically the same semantic token. Conversely, two different raw values may realize the same semantic role under different density/theme/platform constraints. Resolve the **relationship/role first**, then the token/value.

## Locate Design source of truth before propagating a change

When an observed element looks wrong, do not immediately patch the local instance or promote the change to the whole system. Traverse the actual Design relationships first:

```text
[Observed instance] --INSTANCE_OF--> [Component / pattern]
[Component slot]    --REPRESENTS--> [Semantic action/content role]
[Role]              --STYLED_BY-->  [Semantic token / system role]
[Role]              --USES_ASSET--> [Icon / image / asset mapping]
[Role]              --APPEARS_IN--> [Screens / states / density or input modes]
```

Only use relations that the current Design/System evidence actually supports. An icon glyph, for example, may be an asset or semantic mapping while its size/color/gap are tokenized; do not declare the glyph itself a token unless the real system does.

### Choose propagation scope

Use the smallest scope that explains the evidence:

| Scope | Use when | Re-check |
|---|---|---|
| `INSTANCE` | the shared role is correct and one context misuses/wraps it | the local context plus one normal sibling |
| `COMPONENT` | repeated instances share a defective anatomy/variant/state relation | representative consumers, states, density/content pressure |
| `SEMANTIC_ROLE` | the meaning is mapped inconsistently across components/surfaces | all material representations of that role |
| `FOUNDATION` | a product-wide visual/interaction relationship is wrong at the foundation level | multiple component families, screens, themes/modes |

Before broadening scope, test the strongest alternative explanation: local wrapper/content/state misuse can mimic a component defect; a component defect can mimic a token/foundation defect.

### Keep Design propagation separate from code propagation

Product Design owns the design-level statement of:

- source/owner of the Design decision;
- semantic invariant;
- intended change scope;
- affected Design contexts/variants/states/modes;
- visual/interaction proof needed after the change.

Frontend Engineering owns source-file/import/CSS/component dependency discovery, migration mechanics, runtime integration, and implementation proof. Do not invent implementation blast radius from Design evidence alone.

## Worked contrast — one odd Share icon

A composer toolbar, detail header, and item menu all expose the same semantic **Share** action. One feature uses a filled upload-like glyph while the rest of the product uses the current outline Share mapping. Size/color tokens are already correct.

**Bad:** replace every Share icon globally because the odd instance looks wrong, or create a feature-local token because the values differ.

**Better transfer:** trace `odd instance -> component slot -> Share semantic role -> current asset mapping -> representative consumers`. If the feature locally overrides an otherwise correct mapping, correct the instance/component usage. If the semantic Share mapping itself is wrong everywhere, widen to `SEMANTIC_ROLE`. Only widen to iconography `FOUNDATION` when multiple semantic roles reveal the same foundation defect. Code files/imports remain an Engineering question.

## System stress

Test a candidate role/component/system change in:

- the densest realistic repeated context;
- long/short content;
- error/pending/disabled/selected states;
- light/dark themes if applicable;
- narrow/wide and short/tall usable viewports;
- text scaling/localization where material;
- adjacent sibling components that share visual hierarchy;
- at least one materially different interaction/input mode when the role is interactive;
- representative downstream contexts implied by a `COMPONENT`, `SEMANTIC_ROLE`, or `FOUNDATION` change.

## Failure patterns -> correction

- **New feature gets a local mini-design-system:** inspect existing roles; extend/reuse before invention.
- **Component looks great in isolation but noisy in list:** reduce repeated mass/enclosure and re-evaluate anatomy in context.
- **Token consistency but visual inconsistency:** token usage may encode the wrong semantic relation; fix role mapping/anatomy before changing values.
- **Many local overrides:** treat as evidence of a shared component/role mismatch or a legitimately different semantic role; do not normalize exceptions blindly.
- **One bad icon triggers a global icon rewrite:** locate asset/slot/semantic-role ownership and prove propagation scope first.
- **System change lists React/CSS files from Design inference:** stop at Design propagation and hand implementation dependency discovery to Frontend Engineering.
- **Everything must match exactly across mobile/desktop:** preserve semantic/system invariants while allowing constraint-driven presentation changes.
