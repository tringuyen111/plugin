from __future__ import annotations

import json
from pathlib import Path
import subprocess
import unittest

HOOKS = Path(__file__).resolve().parents[1]
SESSION_START = HOOKS / "session_start.py"
HOOKS_JSON = HOOKS / "hooks.json"


def run_session_start(stdin: str = ""):
    proc = subprocess.run(
        ["python3", str(SESSION_START)],
        input=stdin,
        text=True,
        capture_output=True,
        check=False,
    )
    payload = json.loads(proc.stdout) if proc.stdout.strip() else None
    return proc, payload


class SessionStartHookTests(unittest.TestCase):
    def test_session_start_emits_resident_guidance(self):
        proc, payload = run_session_start()
        self.assertEqual(proc.returncode, 0, proc.stderr)
        self.assertTrue(payload["continue"])
        self.assertTrue(payload["suppressOutput"])
        output = payload["hookSpecificOutput"]
        self.assertEqual(output["hookEventName"], "SessionStart")
        context = output["additionalContext"]
        self.assertIn("resident guidance", context)
        self.assertIn("host/Agent owns reasoning", context)
        self.assertIn("native Skill discovery/invocation", context)

    def test_session_start_is_stateless_for_host_event_input(self):
        proc_a, payload_a = run_session_start('{"session_id":"one","source":"startup"}')
        proc_b, payload_b = run_session_start('{"session_id":"two","source":"compact"}')
        self.assertEqual(proc_a.returncode, 0, proc_a.stderr)
        self.assertEqual(proc_b.returncode, 0, proc_b.stderr)
        self.assertEqual(
            payload_a["hookSpecificOutput"]["additionalContext"],
            payload_b["hookSpecificOutput"]["additionalContext"],
        )

    def test_resident_context_has_no_plugin_continuity_protocol(self):
        proc, payload = run_session_start('{"session_id":"cold","source":"startup"}')
        self.assertEqual(proc.returncode, 0, proc.stderr)
        context = payload["hookSpecificOutput"]["additionalContext"]
        self.assertNotIn("Working Checkpoint", context)
        self.assertNotIn("Active path:", context)
        self.assertNotIn("SDLC-WORKING-CHECKPOINT", context)
        self.assertLessEqual(len(context.encode("utf-8")), 4096)

    def test_hook_configuration_is_session_start_only(self):
        config = json.loads(HOOKS_JSON.read_text(encoding="utf-8"))
        self.assertEqual(set(config["hooks"]), {"SessionStart"})
        handler = config["hooks"]["SessionStart"][0]["hooks"][0]
        self.assertEqual(handler["type"], "command")
        self.assertEqual(handler["additionalContextLimit"], 2500)
        self.assertIn("session_start.py", handler["command"])


if __name__ == "__main__":
    unittest.main()
