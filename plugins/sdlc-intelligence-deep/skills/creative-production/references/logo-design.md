# Logo Design Workflow

Use the bundled local logo datasets to build a design brief, style shortlist, color rationale, and prompt-ready concept specification.

## Search

Resolve `<skill-dir>` to the directory containing `creative-production/SKILL.md`; do not assume the host process current working directory:

```bash
python3 "<skill-dir>/scripts/logo/search.py" "tech startup modern" --design-brief -p "BrandName"
python3 "<skill-dir>/scripts/logo/search.py" "minimalist clean" --domain style
python3 "<skill-dir>/scripts/logo/search.py" "tech professional" --domain color
python3 "<skill-dir>/scripts/logo/search.py" "healthcare medical" --domain industry
```

## Output

Provide:

1. brand attributes
2. 2–4 suitable logo directions
3. shape/symbol rationale
4. color rationale
5. typography direction
6. monochrome and small-size constraints
7. prompt/spec for visual generation when requested

Use host-native visual generation only when final generated assets are requested.
