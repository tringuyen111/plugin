#!/usr/bin/env python3
from __future__ import annotations
import argparse, json, re, sys
from pathlib import Path
import yaml
FRONTMATTER_RE=re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)
MD_LINK_RE=re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")
def fm(path):
    m=FRONTMATTER_RE.match(path.read_text(encoding="utf-8")); return yaml.safe_load(m.group(1)) if m else None
def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent); a=ap.parse_args(); root=a.root.resolve(); errors=[]; warnings=[]; stats={}
    required=[".codex-plugin/plugin.json","architecture/runtime/runtime-context-map.json","architecture/runtime/skill-index.json","architecture/runtime/routes.json","architecture/runtime/system/routes.json","skills/sdlc/SKILL.md","skills/upgrade-sdlc-intelligence/SKILL.md"]
    for rel in required:
        if not (root/rel).is_file(): errors.append(f"missing required file: {rel}")
    skill_dirs=sorted([p for p in (root/"skills").iterdir() if p.is_dir()]) if (root/"skills").is_dir() else []
    names={}; implicit={};
    for d in skill_dirs:
        p=d/"SKILL.md"
        if not p.is_file(): errors.append(f"missing SKILL.md: {d.name}"); continue
        data=fm(p)
        if not isinstance(data, dict): errors.append(f"invalid frontmatter: {d.name}"); continue
        name=data.get("name")
        if name != d.name: errors.append(f"name/dir mismatch: {d.name} != {name}")
        if name in names: errors.append(f"duplicate Skill name: {name}")
        names[name]=p
        ay=d/"agents/openai.yaml"
        if ay.is_file():
            y=yaml.safe_load(ay.read_text(encoding="utf-8")) or {}; pol=y.get("policy", {}) if isinstance(y,dict) else {}
            if isinstance(pol,dict):
                if "products" in pol: errors.append(f"unsupported policy.products: {name}")
                implicit[name]=pol.get("allow_implicit_invocation")
    stats["skills"]=len(names); stats["implicit_true"]=sum(v is True for v in implicit.values()); stats["implicit_false"]=sum(v is False for v in implicit.values())
    if len(names)!=71: errors.append(f"expected 71 Skills, found {len(names)}")
    if (stats["implicit_true"],stats["implicit_false"])!=(32,39): errors.append(f"expected implicit counts 32/39, got {stats["implicit_true"]}/{stats["implicit_false"]}")
    for name,prompt in names.items():
        ay=prompt.parent/"agents/openai.yaml"
        if not ay.is_file(): continue
        yd=yaml.safe_load(ay.read_text(encoding="utf-8")) or {}; sd=((yd.get("interface") or {}).get("short_description")) if isinstance(yd,dict) else None
        if not isinstance(sd,str) or not sd.strip(): errors.append(f"missing short_description: {name}"); continue
        if len(sd)>140: errors.append(f"short_description too long {name}: {len(sd)}")
        if sd.endswith("..."): errors.append(f"ellipsized short_description: {name}")
        if sd[-1] not in ".!?": errors.append(f"incomplete short_description punctuation: {name}")
    if "sdlc-intelligence" in names or (root/"skills/sdlc-intelligence").exists(): errors.append("portable mega-router remains active")
    ctx=json.loads((root/"architecture/runtime/runtime-context-map.json").read_text(encoding="utf-8")) if (root/"architecture/runtime/runtime-context-map.json").is_file() else {}; idx=json.loads((root/"architecture/runtime/skill-index.json").read_text(encoding="utf-8")) if (root/"architecture/runtime/skill-index.json").is_file() else {}
    mapped=ctx.get("skills",{}) if isinstance(ctx,dict) else {}; indexed=idx.get("skills",{}) if isinstance(idx,dict) else {}
    if set(mapped)!=set(names): errors.append("runtime-context Skill identity set differs from native Skills")
    if set(indexed)!=set(names): errors.append("skill-index identity set differs from native Skills")
    for name in names:
        want=f"skills/{name}/SKILL.md"
        if isinstance(mapped.get(name),dict) and mapped[name].get("path")!=want: errors.append(f"context path mismatch {name}: {mapped[name].get('path')}")
        if isinstance(indexed.get(name),dict) and indexed[name].get("path")!=want: errors.append(f"index path mismatch {name}: {indexed[name].get('path')}")
    route_count=0
    for rel in ["architecture/runtime/routes.json","architecture/runtime/system/routes.json"]:
        p=root/rel
        if not p.is_file(): continue
        data=json.loads(p.read_text(encoding="utf-8")); routes=data.get("routes",[]) if isinstance(data,dict) else []
        route_count += len(routes)
        for r in routes:
            if not isinstance(r,dict): continue
            owner=r.get("owner_skill")
            if owner not in names: errors.append(f"{rel}:{r.get('id')}: unresolved owner {owner}")
            for s in r.get("supporting_skills",[]) or []:
                if s not in names: errors.append(f"{rel}:{r.get('id')}: unresolved supporting Skill {s}")
    stats["routes_total"]=route_count
    links=0
    for p in root.rglob("*.md"):
        text=p.read_text(encoding="utf-8")
        for raw in MD_LINK_RE.findall(text):
            target=raw.strip().split(" ",1)[0].strip("<>")
            if not target or target.startswith(("http://","https://","mailto:","#")): continue
            if target == "link": warnings.append(f"intentional non-file placeholder: {p.relative_to(root)} -> link"); continue
            path_part=target.split("#",1)[0]
            resolved=(p.parent/path_part).resolve()
            try: resolved.relative_to(root)
            except ValueError: errors.append(f"link escapes plugin: {p.relative_to(root)} -> {target}"); continue
            if not resolved.exists(): errors.append(f"missing Markdown link: {p.relative_to(root)} -> {target}")
            links += 1
    stats["markdown_links"]=links
    # Active behavioral suites must bind to exact packaged artifact bytes. This is structural
    # evidence only; it does not execute candidate or baseline behavior.
    import hashlib
    eval_count=0
    suites_dir=root/"architecture/runtime/evaluation/suites"
    if suites_dir.is_dir():
        if (suites_dir/"eval-operational-context-routing.json").exists(): errors.append("obsolete portable-root evaluation suite remains active")
        for suite in sorted(suites_dir.glob("eval-*.json")):
            d=json.loads(suite.read_text(encoding="utf-8")); art=d.get("artifact",{}) if isinstance(d,dict) else {}
            aid=art.get("id") if isinstance(art,dict) else None; rev=art.get("revision") if isinstance(art,dict) else None
            apath=(root/aid).resolve() if isinstance(aid,str) else None
            if apath is None or not apath.is_file(): errors.append(f"{suite.relative_to(root)}: unresolved artifact {aid}"); continue
            try: apath.relative_to(root)
            except ValueError: errors.append(f"{suite.relative_to(root)}: artifact escapes plugin {aid}"); continue
            actual=hashlib.sha256(apath.read_bytes()).hexdigest()
            if rev != actual: errors.append(f"{suite.relative_to(root)}: revision mismatch {rev} != {actual}")
            eval_count += 1
    stats["evaluation_suites_bound"]=eval_count
    if eval_count!=12: errors.append(f"expected 12 active evaluation suites, got {eval_count}")
    status="PASS" if not errors else "FAIL"
    print(json.dumps({"status":status,"errors":errors,"warnings":warnings,"stats":stats}, indent=2, sort_keys=True))
    raise SystemExit(0 if not errors else 1)
if __name__ == "__main__": main()
