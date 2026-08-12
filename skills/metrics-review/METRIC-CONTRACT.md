# Metric Contract

```yaml
metric_id:
name:
business_meaning:
unit:
numerator:
denominator:
eligible_population:
event_semantics:
deduplication_rule:
attribution_rule:
event_or_query_source:
instrumentation_version:
segments:
time_zone:
time_window:
maturity_window:
baseline_or_control:
target:
guardrails:
minimum_practical_effect:
uncertainty_method:
owner:
data_quality_caveats:
definition_history:
```

A dashboard label is not a metric contract. If numerator, denominator, eligibility, event semantics, deduplication, or definition history is unresolved, do not compare the metric across time or cohorts.
