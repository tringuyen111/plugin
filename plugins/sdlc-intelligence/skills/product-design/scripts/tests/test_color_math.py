import pathlib
import sys
import unittest

SCRIPTS_DIR = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS_DIR))
import color_math as cm  # noqa: E402


class ColorMathTests(unittest.TestCase):
    def assert_rgb_close(self, a, b, tol=2.0 / 255.0):
        self.assertLessEqual(abs(a.r - b.r), tol)
        self.assertLessEqual(abs(a.g - b.g), tol)
        self.assertLessEqual(abs(a.b - b.b), tol)

    def test_srgb_oklch_round_trip_representative_colors(self):
        for value in ["#000000", "#FFFFFF", "#6750A4", "#FF0000", "#00A67E", "#123456", "#F3B61F"]:
            with self.subTest(value=value):
                original = cm.parse_hex(value)
                o = cm.srgb_to_oklch(original)
                reconstructed = cm.oklch_to_srgb(o).clamped()
                self.assert_rgb_close(original, reconstructed)

    def test_encoded_srgb_alpha_composite_depends_on_backdrop(self):
        fg = cm.parse_hex("#000000")
        white = cm.parse_hex("#FFFFFF")
        blue = cm.parse_hex("#0000FF")
        self.assertEqual(cm.to_hex(cm.alpha_composite_srgb(fg, 0.5, white)), "#808080")
        self.assertNotEqual(
            cm.to_hex(cm.alpha_composite_srgb(fg, 0.5, white)),
            cm.to_hex(cm.alpha_composite_srgb(fg, 0.5, blue)),
        )

    def test_black_white_contrast_is_21(self):
        ratio = cm.contrast_ratio(cm.parse_hex("#000000"), cm.parse_hex("#FFFFFF"))
        self.assertAlmostEqual(ratio, 21.0, places=6)

    def test_tonal_candidates_are_in_gamut_and_monotonic_in_target_lightness(self):
        payload = cm.tones_payload("#6750A4", [0.95, 0.8, 0.6, 0.4, 0.2])
        actual = [item["oklch"]["l"] for item in payload["tones"]]
        self.assertEqual(actual, sorted(actual, reverse=True))
        for item in payload["tones"]:
            rgb = cm.parse_hex(item["hex"])
            self.assertTrue(rgb.in_gamut())
            self.assertAlmostEqual(item["oklch"]["h"], payload["source"]["oklch"]["h"], places=6)

    def test_extreme_tone_reduces_chroma_instead_of_channel_clipping(self):
        base = cm.srgb_to_oklch(cm.parse_hex("#FF0000"))
        mapped, rgb = cm.gamut_mapped_oklch(0.97, base.c, base.h)
        self.assertTrue(rgb.in_gamut())
        self.assertLess(mapped.c, base.c)
        linear = cm.oklch_to_linear_srgb(mapped)
        self.assertTrue(linear.in_gamut())

    def test_parse_tones_accepts_percentages(self):
        self.assertEqual(cm.parse_tones("95,50,10"), [0.95, 0.5, 0.1])


if __name__ == "__main__":
    unittest.main()
