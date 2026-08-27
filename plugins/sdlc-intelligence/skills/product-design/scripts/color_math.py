#!/usr/bin/env python3
"""Deterministic color helpers for Product Design candidate reasoning.

This tool deliberately does not choose aesthetic direction or semantic roles.
It provides exact/repeatable mechanics for:
- sRGB <-> Oklab/OKLCH inspection
- in-gamut OKLCH tonal candidate generation by reducing chroma when needed
- encoded-sRGB alpha-composite previews over an opaque backdrop
- WCAG 2.x relative-luminance contrast ratio

The tonal output is a candidate family, not an approved theme.
"""
from __future__ import annotations

import argparse
import json
import math
import re
from dataclasses import dataclass
from typing import Iterable

HEX_RE = re.compile(r"^#?([0-9a-fA-F]{6})$")
EPS = 1e-12


@dataclass(frozen=True)
class RGB:
    r: float
    g: float
    b: float

    def clamped(self) -> "RGB":
        return RGB(*(min(1.0, max(0.0, v)) for v in (self.r, self.g, self.b)))

    def in_gamut(self, eps: float = 1e-9) -> bool:
        return all(-eps <= v <= 1.0 + eps for v in (self.r, self.g, self.b))


@dataclass(frozen=True)
class OKLCH:
    l: float
    c: float
    h: float


def parse_hex(value: str) -> RGB:
    m = HEX_RE.match(value.strip())
    if not m:
        raise ValueError(f"expected #RRGGBB, got {value!r}")
    s = m.group(1)
    return RGB(int(s[0:2], 16) / 255.0, int(s[2:4], 16) / 255.0, int(s[4:6], 16) / 255.0)


def to_hex(rgb: RGB) -> str:
    c = rgb.clamped()
    vals = [int(math.floor(v * 255.0 + 0.5)) for v in (c.r, c.g, c.b)]
    return "#" + "".join(f"{v:02X}" for v in vals)


def srgb_to_linear_channel(x: float) -> float:
    if x <= 0.04045:
        return x / 12.92
    return ((x + 0.055) / 1.055) ** 2.4


def linear_to_srgb_channel(x: float) -> float:
    if x <= 0.0031308:
        return 12.92 * x
    return 1.055 * (x ** (1.0 / 2.4)) - 0.055


def srgb_to_linear(rgb: RGB) -> RGB:
    return RGB(*(srgb_to_linear_channel(v) for v in (rgb.r, rgb.g, rgb.b)))


def linear_to_srgb(rgb: RGB) -> RGB:
    return RGB(*(linear_to_srgb_channel(v) for v in (rgb.r, rgb.g, rgb.b)))


def linear_srgb_to_oklab(rgb: RGB) -> tuple[float, float, float]:
    r, g, b = rgb.r, rgb.g, rgb.b
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

    l_ = math.copysign(abs(l) ** (1.0 / 3.0), l)
    m_ = math.copysign(abs(m) ** (1.0 / 3.0), m)
    s_ = math.copysign(abs(s) ** (1.0 / 3.0), s)

    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    return L, a, bb


def oklab_to_linear_srgb(L: float, a: float, b: float) -> RGB:
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b

    l = l_ ** 3
    m = m_ ** 3
    s = s_ ** 3

    return RGB(
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    )


def srgb_to_oklch(rgb: RGB) -> OKLCH:
    L, a, b = linear_srgb_to_oklab(srgb_to_linear(rgb))
    c = math.hypot(a, b)
    h = 0.0 if c < EPS else (math.degrees(math.atan2(b, a)) % 360.0)
    return OKLCH(L, c, h)


def oklch_to_linear_srgb(color: OKLCH) -> RGB:
    angle = math.radians(color.h)
    a = color.c * math.cos(angle)
    b = color.c * math.sin(angle)
    return oklab_to_linear_srgb(color.l, a, b)


def oklch_to_srgb(color: OKLCH) -> RGB:
    return linear_to_srgb(oklch_to_linear_srgb(color))


def gamut_mapped_oklch(l: float, c: float, h: float, iterations: int = 28) -> tuple[OKLCH, RGB]:
    """Preserve L/h and reduce chroma until linear-sRGB is in gamut."""
    l = min(1.0, max(0.0, l))
    c = max(0.0, c)
    direct = OKLCH(l, c, h % 360.0)
    linear = oklch_to_linear_srgb(direct)
    if linear.in_gamut():
        return direct, linear_to_srgb(linear).clamped()

    lo, hi = 0.0, c
    best = OKLCH(l, 0.0, h % 360.0)
    best_rgb = linear_to_srgb(oklch_to_linear_srgb(best)).clamped()
    for _ in range(iterations):
        mid = (lo + hi) / 2.0
        candidate = OKLCH(l, mid, h % 360.0)
        lin = oklch_to_linear_srgb(candidate)
        if lin.in_gamut():
            best = candidate
            best_rgb = linear_to_srgb(lin).clamped()
            lo = mid
        else:
            hi = mid
    return best, best_rgb


def alpha_composite_srgb(fg: RGB, alpha: float, bg: RGB) -> RGB:
    """Opaque result of source-over using encoded sRGB channel values.

    This is a practical preview helper for UI token inspection; it intentionally
    reports its color-space assumption rather than pretending alpha is a fixed
    tonal transformation.
    """
    if not 0.0 <= alpha <= 1.0:
        raise ValueError("alpha must be between 0 and 1")
    return RGB(
        alpha * fg.r + (1.0 - alpha) * bg.r,
        alpha * fg.g + (1.0 - alpha) * bg.g,
        alpha * fg.b + (1.0 - alpha) * bg.b,
    )


def relative_luminance(rgb: RGB) -> float:
    lin = srgb_to_linear(rgb)
    return 0.2126 * lin.r + 0.7152 * lin.g + 0.0722 * lin.b


def contrast_ratio(a: RGB, b: RGB) -> float:
    la, lb = relative_luminance(a), relative_luminance(b)
    light, dark = max(la, lb), min(la, lb)
    return (light + 0.05) / (dark + 0.05)


def parse_tones(value: str | None) -> list[float]:
    if not value:
        return [0.98, 0.95, 0.90, 0.80, 0.70, 0.60, 0.50, 0.40, 0.30, 0.20, 0.12, 0.06]
    out: list[float] = []
    for raw in value.split(","):
        v = float(raw.strip())
        if v > 1.0:
            v /= 100.0
        if not 0.0 <= v <= 1.0:
            raise ValueError(f"tone lightness out of range: {raw}")
        out.append(v)
    return out


def inspect_payload(value: str) -> dict:
    rgb = parse_hex(value)
    o = srgb_to_oklch(rgb)
    return {
        "hex": to_hex(rgb),
        "srgb": {"r": rgb.r, "g": rgb.g, "b": rgb.b},
        "oklch": {"l": o.l, "c": o.c, "h": o.h},
    }


def tones_payload(value: str, tones: Iterable[float]) -> dict:
    base = srgb_to_oklch(parse_hex(value))
    items = []
    for target_l in tones:
        mapped, rgb = gamut_mapped_oklch(target_l, base.c, base.h)
        items.append(
            {
                "target_l": target_l,
                "oklch": {"l": mapped.l, "c": mapped.c, "h": mapped.h},
                "hex": to_hex(rgb),
                "chroma_reduced": mapped.c + 1e-9 < base.c,
            }
        )
    return {
        "source": inspect_payload(value),
        "method": "hold OKLCH hue/source chroma where sRGB gamut permits; reduce chroma only as needed",
        "warning": "candidate tonal family only; semantic roles and theme balance require Design judgment",
        "tones": items,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Deterministic Product Design color math")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_inspect = sub.add_parser("inspect", help="inspect sRGB and OKLCH coordinates")
    p_inspect.add_argument("--hex", required=True)

    p_tones = sub.add_parser("tones", help="generate in-gamut perceptual tonal candidates")
    p_tones.add_argument("--hex", required=True)
    p_tones.add_argument("--tones", help="comma-separated OKLCH L values (0..1) or percentages")

    p_comp = sub.add_parser("composite", help="preview encoded-sRGB alpha composite over opaque backdrop")
    p_comp.add_argument("--fg", required=True)
    p_comp.add_argument("--alpha", type=float, required=True)
    p_comp.add_argument("--bg", required=True)

    p_contrast = sub.add_parser("contrast", help="WCAG 2.x relative-luminance contrast ratio")
    p_contrast.add_argument("--a", required=True)
    p_contrast.add_argument("--b", required=True)

    args = parser.parse_args()
    if args.cmd == "inspect":
        payload = inspect_payload(args.hex)
    elif args.cmd == "tones":
        payload = tones_payload(args.hex, parse_tones(args.tones))
    elif args.cmd == "composite":
        fg, bg = parse_hex(args.fg), parse_hex(args.bg)
        result = alpha_composite_srgb(fg, args.alpha, bg)
        payload = {
            "foreground": to_hex(fg),
            "alpha": args.alpha,
            "background": to_hex(bg),
            "space": "encoded-sRGB channel source-over preview",
            "result": to_hex(result),
        }
    else:
        a, b = parse_hex(args.a), parse_hex(args.b)
        payload = {"a": to_hex(a), "b": to_hex(b), "contrast_ratio": contrast_ratio(a, b)}

    print(json.dumps(payload, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
