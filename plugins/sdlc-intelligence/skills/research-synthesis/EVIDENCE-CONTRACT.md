# Research Evidence Contract

Use this as a logical projection contract, not a mandatory persistence template. For lightweight synthesis, include only fields that materially support traceability and judgment. Reuse project-native identifiers when they exist; do not invent IDs/revisions merely to fill a schema.

## Synthesis frame

```yaml
research_question:
decision_use:
analysis_unit:
corpus_topology:
comparable_groups:
analytical_shape:
material_assumptions:
```

## Source record

```yaml
source_ref:
type: interview | survey | support | analytics | observation | document | other
location:
collected_at_or_period:
population_or_segment:
method_or_generation_process:
analysis_unit:
source_status: primary | derived | secondary | unknown
dependency_group:
selection_or_coverage_notes:
methodological_limitations:
```

`dependency_group` identifies sources that share a material evidence-generation lineage. Do not treat several derivative artifacts in the same dependency group as independent corroboration.

## Observation / extracted evidence

```yaml
observation_ref:
source_ref:
case_or_segment_ref:
observation_or_measure:
source_context:
analyst_interpretation:
```

Keep `observation_or_measure` grounded in the source. Put analytical meaning in `analyst_interpretation`; do not rewrite interpretation as if it were directly observed.

## Optional analytical code/category

```yaml
code_or_category:
meaning:
include_when:
exclude_when:
example_refs:
competing_or_overlapping_codes:
```

Codes/categories are analytical handles, not automatically findings.

## Finding record

```yaml
finding_ref:
claim:
scope:
  population_or_segment:
  context_or_workflow:
  period:
  conditions:
supporting_refs:
negative_or_conflicting_refs:
evidence_relationships:
interpretive_alternatives:
confidence:
  level_or_wording:
  rationale:
transferability:
limitations:
evidence_gaps:
implications:
```

Use `confidence.level_or_wording` only when useful. The rationale matters more than a label and must not imply statistical certainty unsupported by the evidence.

`transferability` is separate from confidence. A finding may be well supported for the studied segment while remaining unknown elsewhere.

`implications` are possible consequences or next questions. Do not turn them into approved Product priority, scope, design, behavior, or implementation decisions.

## Mixed-evidence relation

When qualitative and quantitative or otherwise heterogeneous evidence is integrated, state the relation explicitly:

```yaml
construct_or_question:
evidence_a:
evidence_b:
alignment:
  population:
  analysis_unit:
  time_window:
  measurement_or_meaning:
relation: reinforces | explains | qualifies | conflicts | not_comparable | dependent
integration_inference:
```

Do not vote-count sources or average unlike evidence into a confidence score.
