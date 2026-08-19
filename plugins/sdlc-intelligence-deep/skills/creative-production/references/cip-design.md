# Corporate Identity Program Workflow

Use the bundled CIP datasets to select deliverables, industries, styles, and mockup contexts, then produce an implementation-ready identity program brief.

## Search

Resolve `<skill-dir>` to the directory containing `creative-production/SKILL.md`; do not assume the host process current working directory:

```bash
python3 "<skill-dir>/scripts/cip/search.py" "tech startup" --cip-brief -b "BrandName"
python3 "<skill-dir>/scripts/cip/search.py" "business card letterhead" --domain deliverable
python3 "<skill-dir>/scripts/cip/search.py" "luxury premium elegant" --domain style
python3 "<skill-dir>/scripts/cip/search.py" "hospitality hotel" --domain industry
python3 "<skill-dir>/scripts/cip/search.py" "office reception" --domain mockup
```

## Output

Use host-native visual generation only when final generated assets are requested.
