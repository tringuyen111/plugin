#!/usr/bin/env python3
"""Capture reproducible visual evidence with strict redaction and annotations."""

from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Mapping

from capture_contract import (
    MANIFEST_SCHEMA_VERSION,
    LOCAL_EXECUTOR_PROVIDER,
    LOCAL_EXECUTOR_SOURCE_ID,
    LOCAL_EXECUTOR_SOURCE_KIND,
    adapter_source_sha256,
    canonical_shot_digest,
    file_sha256,
    normalize_capture,
    normalize_viewport,
    resolve_step_value,
    source_content_sha256,
    summarize_steps,
    validate_job,
    validate_local_executor_binding,
)


class CaptureFailure(RuntimeError):
    """A fail-closed capture contract or runtime failure."""


def emit(payload: dict[str, Any]) -> None:
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("job", type=Path)
    parser.add_argument("--out", type=Path)
    parser.add_argument("--headed", action="store_true")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--validate-only", action="store_true")
    parser.add_argument("--chromium", type=Path)
    return parser.parse_args()


def portable_path(path: Path, root: Path) -> str:
    try:
        return str(path.resolve().relative_to(root.resolve()))
    except ValueError:
        return str(path.resolve())


def source_url(shot: Mapping[str, Any], root: Path) -> str:
    if shot.get("url"):
        return str(shot["url"])
    path = Path(str(shot["html"]))
    if not path.is_absolute():
        path = (root / path).resolve()
    return portable_path(path, root)


def load_source(page: Any, shot: Mapping[str, Any], root: Path) -> list[str]:
    """Load a live URL or self-contained local HTML and return limitations."""
    if shot.get("url"):
        page.goto(shot["url"], wait_until="networkidle", timeout=45_000)
        return []
    html_path = Path(str(shot["html"]))
    if not html_path.is_absolute():
        html_path = (root / html_path).resolve()
    html = html_path.read_text(encoding="utf-8")
    page.set_content(html, wait_until="networkidle", timeout=45_000)
    limitations: list[str] = []
    relative_tokens = ('src="./', "src='./", 'href="./', "href='./", 'src="../', "src='../", 'href="../', "href='../")
    if any(token in html for token in relative_tokens):
        limitations.append("local HTML contains relative assets; bundle them or capture a live URL")
    return limitations


def run_steps(target: Any, steps: list[dict[str, Any]] | None) -> None:
    for step in steps or []:
        if "fill" in step:
            target.locator(step["fill"]).fill(resolve_step_value(step))
        elif "click" in step:
            target.locator(step["click"]).click()
        elif "waitUrl" in step:
            page = target.page if hasattr(target, "page") else target
            page.wait_for_url(step["waitUrl"], timeout=30_000)
        elif "waitFor" in step:
            target.locator(step["waitFor"]).wait_for(timeout=30_000)
        elif "scrollTo" in step:
            target.evaluate("y => window.scrollTo(0, y)", step["scrollTo"])
        elif "waitMs" in step:
            target.wait_for_timeout(step["waitMs"])
        if step.get("thenWaitMs"):
            target.wait_for_timeout(step["thenWaitMs"])


def _box_payload(box: Mapping[str, Any]) -> dict[str, float]:
    return {key: round(float(box[key]), 3) for key in ("x", "y", "width", "height")}


def _resolve_selector_items(target: Any, items: list[dict[str, Any]], *, kind: str) -> tuple[list[dict[str, Any]], list[str]]:
    resolved: list[dict[str, Any]] = []
    warnings: list[str] = []
    for item_index, item in enumerate(items):
        selector = item["selector"]
        locator = target.locator(selector)
        locator_count = locator.count()
        boxes: list[dict[str, float]] = []
        for match_index in range(locator_count):
            box = locator.nth(match_index).bounding_box()
            if box:
                boxes.append(_box_payload(box))
        expected = int(item.get("expected_matches", 1))
        required = bool(item.get("required", True))
        status = "RESOLVED" if len(boxes) == expected else "MISMATCH"
        record = {
            "index": item_index,
            "selector": selector,
            "required": required,
            "expected_matches": expected,
            "matched_count": len(boxes),
            "status": status,
            "boxes": boxes,
        }
        for key in ("type", "text", "n", "dir", "color", "leader_line"):
            if key in item:
                record[key] = item[key]
        resolved.append(record)
        if status == "MISMATCH":
            message = f"{kind} selector {selector!r} expected {expected} visible match(es), found {len(boxes)}"
            if required:
                raise CaptureFailure(message)
            warnings.append(message)
    return resolved, warnings


def _document_metrics(page: Any) -> dict[str, float]:
    return page.evaluate(
        """() => ({
          scrollX: window.scrollX,
          scrollY: window.scrollY,
          width: Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0, innerWidth),
          height: Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0, innerHeight),
          viewportWidth: innerWidth,
          viewportHeight: innerHeight
        })"""
    )


def annotate(page: Any, target: Any, callouts: list[dict[str, Any]], masks: list[dict[str, Any]]) -> dict[str, Any]:
    mask_resolution, mask_warnings = _resolve_selector_items(target, masks, kind="mask")
    callout_resolution, callout_warnings = _resolve_selector_items(target, callouts, kind="callout")
    metrics = _document_metrics(page)
    payload_masks: list[dict[str, Any]] = []
    for item in mask_resolution:
        for match_index, box in enumerate(item["boxes"]):
            payload_masks.append({
                **box,
                "x": box["x"] + metrics["scrollX"],
                "y": box["y"] + metrics["scrollY"],
                "color": item.get("color", "#334155"),
                "source_index": item["index"],
                "match_index": match_index,
            })
    payload_callouts: list[dict[str, Any]] = []
    for item in callout_resolution:
        for match_index, box in enumerate(item["boxes"]):
            callout_type = item.get("type", "box")
            number = item.get("n")
            if callout_type == "number" and isinstance(number, int):
                number += match_index
            payload_callouts.append({
                **box,
                "x": box["x"] + metrics["scrollX"],
                "y": box["y"] + metrics["scrollY"],
                "type": callout_type,
                "text": item.get("text"),
                "n": number,
                "dir": item.get("dir", "left"),
                "color": item.get("color", "#e11d48"),
                "leader_line": item.get("leader_line", callout_type == "label"),
                "source_index": item["index"],
                "match_index": match_index,
            })
    placements = page.evaluate(
        """({maskBoxes, callouts, metrics}) => {
          const old = document.getElementById('__sdlc_visual_capture_overlay__');
          if (old) old.remove();
          const root = document.createElement('div');
          root.id = '__sdlc_visual_capture_overlay__';
          Object.assign(root.style, {
            position: 'absolute', left: '0', top: '0', width: `${metrics.width}px`, height: `${metrics.height}px`,
            zIndex: '2147483647', pointerEvents: 'none', overflow: 'visible'
          });
          document.documentElement.appendChild(root);

          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          Object.assign(svg.style, {position:'absolute',left:'0',top:'0',width:`${metrics.width}px`,height:`${metrics.height}px`,overflow:'visible'});
          root.appendChild(svg);

          for (const b of maskBoxes) {
            const d = document.createElement('div');
            Object.assign(d.style, {
              position:'absolute', left:`${b.x}px`, top:`${b.y}px`, width:`${b.width}px`, height:`${b.height}px`,
              background:b.color, borderRadius:'4px', boxSizing:'border-box'
            });
            d.dataset.captureKind = 'mask';
            root.appendChild(d);
          }

          const result = [];
          for (const b of callouts) {
            const box = document.createElement('div');
            Object.assign(box.style, {
              position:'absolute', left:`${b.x-4}px`, top:`${b.y-4}px`, width:`${b.width+8}px`, height:`${b.height+8}px`,
              border:`3px solid ${b.color}`, borderRadius:'7px', boxSizing:'border-box'
            });
            box.dataset.captureKind = 'callout-box';
            root.appendChild(box);
            const placement = {
              source_index: b.source_index, match_index: b.match_index, type: b.type,
              target_box: {x:b.x,y:b.y,width:b.width,height:b.height}, box: {x:b.x-4,y:b.y-4,width:b.width+8,height:b.height+8}
            };
            if (b.type !== 'box') {
              const badge = document.createElement('div');
              badge.textContent = b.text || String(b.n ?? '');
              Object.assign(badge.style, {
                position:'absolute', visibility:'hidden', background:b.color, color:'#fff',
                font:'700 14px system-ui', padding:b.text?'6px 9px':'5px 9px', borderRadius:b.text?'6px':'999px',
                boxShadow:'0 1px 3px rgba(0,0,0,.25)', maxWidth:'220px', whiteSpace:'normal', boxSizing:'border-box'
              });
              badge.dataset.captureKind = 'callout-label';
              root.appendChild(badge);
              const size = badge.getBoundingClientRect();
              let left = b.x + b.width - 8;
              let top = b.y - size.height - 8;
              if (b.type === 'label') {
                const positions = {
                  left: [b.x - size.width - 12, b.y + (b.height - size.height) / 2],
                  right: [b.x + b.width + 12, b.y + (b.height - size.height) / 2],
                  top: [b.x + (b.width - size.width) / 2, b.y - size.height - 12],
                  bottom: [b.x + (b.width - size.width) / 2, b.y + b.height + 12],
                };
                [left, top] = positions[b.dir] || positions.left;
              }
              left = Math.max(4, Math.min(left, metrics.width - size.width - 4));
              top = Math.max(4, Math.min(top, metrics.height - size.height - 4));
              Object.assign(badge.style, {left:`${left}px`,top:`${top}px`,visibility:'visible'});
              placement.label_box = {x:left,y:top,width:size.width,height:size.height};
              if (b.leader_line) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                const startX = b.x + b.width / 2;
                const startY = b.y + b.height / 2;
                const endX = left + size.width / 2;
                const endY = top + size.height / 2;
                line.setAttribute('x1', String(startX)); line.setAttribute('y1', String(startY));
                line.setAttribute('x2', String(endX)); line.setAttribute('y2', String(endY));
                line.setAttribute('stroke', b.color); line.setAttribute('stroke-width', '2');
                line.setAttribute('stroke-linecap', 'round');
                svg.appendChild(line);
                placement.leader_line = {x1:startX,y1:startY,x2:endX,y2:endY};
              }
            }
            result.push(placement);
          }
          return result;
        }""",
        {"maskBoxes": payload_masks, "callouts": payload_callouts, "metrics": metrics},
    )
    for placement in placements:
        source = callout_resolution[placement["source_index"]]
        source.setdefault("placements", []).append(placement)
    return {
        "masks": mask_resolution,
        "callouts": callout_resolution,
        "warnings": mask_warnings + callout_warnings,
        "document": {key: round(float(value), 3) for key, value in metrics.items()},
    }


def _capture_screenshot(page: Any, target: Any, png_path: Path, capture: Mapping[str, Any]) -> dict[str, Any]:
    mode = capture["mode"]
    if mode == "full-page":
        page.screenshot(path=str(png_path), full_page=True)
        return {"mode": mode}
    if mode == "viewport":
        page.screenshot(path=str(png_path))
        return {"mode": mode}
    if mode == "clip":
        clip = dict(capture["rect"])
        page.screenshot(path=str(png_path), clip=clip)
        return {"mode": mode, "rect": clip}
    selector = str(capture["selector"])
    locator = target.locator(selector)
    count = locator.count()
    if count != 1:
        raise CaptureFailure(f"element capture selector {selector!r} expected exactly 1 match, found {count}")
    box = locator.first.bounding_box()
    if not box:
        raise CaptureFailure(f"element capture selector {selector!r} is not visibly renderable")
    metrics = _document_metrics(page)
    padding = float(capture.get("padding", 16))
    x = max(0.0, float(box["x"]) + metrics["scrollX"] - padding)
    y = max(0.0, float(box["y"]) + metrics["scrollY"] - padding)
    right = min(metrics["width"], float(box["x"]) + metrics["scrollX"] + float(box["width"]) + padding)
    bottom = min(metrics["height"], float(box["y"]) + metrics["scrollY"] + float(box["height"]) + padding)
    clip = {"x": x, "y": y, "width": right - x, "height": bottom - y}
    page.screenshot(path=str(png_path), clip=clip)
    return {"mode": mode, "selector": selector, "padding": padding, "rect": {key: round(value, 3) for key, value in clip.items()}}


def _load_previous_manifest(path: Path) -> dict[str, dict[str, Any]]:
    if not path.exists():
        return {}
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return {}
    if payload.get("schema_version") != MANIFEST_SCHEMA_VERSION:
        return {}
    return {item.get("slug"): item for item in payload.get("shots", []) if isinstance(item, Mapping) and item.get("slug")}


def main() -> int:
    args = parse_args()
    root = Path.cwd()
    try:
        job = json.loads(args.job.read_text(encoding="utf-8"))
    except Exception as error:
        emit({"ok": False, "stage": "job", "error": str(error)})
        return 1
    findings = validate_job(job)
    if findings:
        emit({"ok": False, "stage": "validation", "findings": findings})
        return 1
    try:
        validate_local_executor_binding(job["executor"])
    except ValueError as error:
        emit({"ok": False, "stage": "executor", "error": str(error)})
        return 1
    if args.validate_only:
        emit({"ok": True, "stage": "validation", "schema_version": job["schema_version"], "shot_count": len(job["shots"])})
        return 0

    try:
        from playwright.sync_api import sync_playwright
    except Exception:
        emit({"ok": False, "stage": "module", "hint": "Install Python Playwright in the adapter environment."})
        return 2

    out_dir = (args.out or Path(job.get("outDir", "artifacts/visual-capture"))).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest_path = out_dir / "visual-capture-manifest.json"
    previous_by_slug = _load_previous_manifest(manifest_path)
    manifest: dict[str, Any] = {
        "schema_version": MANIFEST_SCHEMA_VERSION,
        "capability": "browser.capture",
        "capability_resolution": dict(job["capability_resolution"]),
        "executor": {
            "provider": LOCAL_EXECUTOR_PROVIDER,
            "provider_version": None,
            "source_kind": LOCAL_EXECUTOR_SOURCE_KIND,
            "source_id": LOCAL_EXECUTOR_SOURCE_ID,
            "namespace": job["executor"].get("namespace"),
            "revision": job["executor"].get("revision"),
            "adapter_sha256": adapter_source_sha256(),
        },
        "intent": job["intent"],
        "environment": job["environment"],
        "application_commit": job.get("application_commit"),
        "captured_at": datetime.now(timezone.utc).isoformat(),
        "job": portable_path(args.job, root),
        "shots": [],
        "errors": [],
    }

    storage_state = None
    login = job.get("login")
    if login and login.get("storageStatePathFromEnv"):
        env_name = login["storageStatePathFromEnv"]
        if env_name not in os.environ:
            emit({"ok": False, "stage": "auth", "error": f"missing environment variable: {env_name}"})
            return 1
        storage_state = os.environ[env_name]

    executable = args.chromium or (Path(os.environ["VISUAL_CAPTURE_CHROMIUM"]) if os.environ.get("VISUAL_CAPTURE_CHROMIUM") else None)
    launch_kwargs: dict[str, Any] = {"headless": not args.headed}
    if executable:
        if not executable.exists():
            emit({"ok": False, "stage": "browser", "error": f"Chromium executable not found: {executable}"})
            return 3
        launch_kwargs["executable_path"] = str(executable)
    if getattr(os, "geteuid", lambda: -1)() == 0:
        launch_kwargs["args"] = ["--no-sandbox"]

    with sync_playwright() as playwright:
        try:
            browser = playwright.chromium.launch(**launch_kwargs)
            manifest["executor"]["provider_version"] = browser.version
        except Exception as error:
            emit({"ok": False, "stage": "browser", "error": str(error)})
            return 3
        try:
            for shot in job["shots"]:
                viewport = normalize_viewport(shot.get("device", job.get("device")))
                context_kwargs: dict[str, Any] = {"viewport": viewport, "device_scale_factor": 2}
                if storage_state:
                    context_kwargs["storage_state"] = storage_state
                context = browser.new_context(**context_kwargs)
                page = context.new_page()
                digest = canonical_shot_digest(job, shot, root=root)
                source_sha256 = source_content_sha256(shot, root)
                png_path = out_dir / f"{shot['slug']}.png"
                digest_path = out_dir / f"{shot['slug']}.capture.sha256"
                record: dict[str, Any] = {
                    "slug": shot["slug"],
                    "state": shot["state"],
                    "viewport": viewport,
                    "source": source_url(shot, root),
                    "source_sha256": source_sha256,
                    "actions": summarize_steps(shot.get("steps")),
                    "input_digest": digest,
                }
                previous = previous_by_slug.get(shot["slug"])
                if (
                    not args.force
                    and previous
                    and png_path.exists()
                    and digest_path.exists()
                    and digest_path.read_text(encoding="utf-8").strip() == digest
                ):
                    record = {**previous, **record, "status": "SKIPPED", "reason": "unchanged input digest", "image": portable_path(png_path, root), "image_sha256": file_sha256(png_path)}
                    manifest["shots"].append(record)
                    context.close()
                    continue
                try:
                    if login and not storage_state:
                        load_source(page, login, root)
                        run_steps(page, login.get("steps"))
                    limitations = load_source(page, shot, root)
                    page.evaluate("() => document.fonts ? document.fonts.ready : Promise.resolve()")
                    page.add_style_tag(content="*{animation:none!important;transition:none!important;caret-color:transparent!important}")
                    if shot.get("waitMs"):
                        page.wait_for_timeout(shot["waitMs"])
                    if shot.get("waitFor"):
                        page.locator(shot["waitFor"]).wait_for(timeout=30_000)
                    target = page
                    if shot.get("frame"):
                        frame = next((frame for frame in page.frames if shot["frame"] in frame.url), None)
                        if frame is None:
                            raise CaptureFailure(f"frame not found: {shot['frame']}")
                        target = frame
                    run_steps(target, shot.get("steps"))
                    annotation = annotate(page, target, shot.get("callouts", []), shot.get("masks", []))
                    capture_result = _capture_screenshot(page, target, png_path, normalize_capture(shot.get("capture")))
                    digest_path.write_text(digest + "\n", encoding="utf-8")
                    record.update({
                        "status": "CAPTURED",
                        "image": portable_path(png_path, root),
                        "image_sha256": file_sha256(png_path),
                        "capture": capture_result,
                        "masks": annotation["masks"],
                        "callouts": annotation["callouts"],
                        "document": annotation["document"],
                        "warnings": annotation["warnings"],
                        "limitations": limitations,
                    })
                except Exception as error:
                    if png_path.exists():
                        png_path.unlink()
                    record.update({"status": "FAILED", "error": str(error)})
                    manifest["errors"].append({"slug": shot["slug"], "error": str(error)})
                finally:
                    manifest["shots"].append(record)
                    context.close()
        finally:
            browser.close()

    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    ok = not manifest["errors"]
    emit({
        "ok": ok,
        "stage": "capture",
        "manifest": portable_path(manifest_path, root),
        "captured": sum(item["status"] == "CAPTURED" for item in manifest["shots"]),
        "skipped": sum(item["status"] == "SKIPPED" for item in manifest["shots"]),
        "failed": sum(item["status"] == "FAILED" for item in manifest["shots"]),
        "errors": manifest["errors"],
    })
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
