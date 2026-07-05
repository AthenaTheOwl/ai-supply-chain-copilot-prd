from __future__ import annotations

import importlib.util
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = ROOT / "scripts" / "eval_scorecard.py"

spec = importlib.util.spec_from_file_location("eval_scorecard", MODULE_PATH)
eval_scorecard = importlib.util.module_from_spec(spec)
sys.modules["eval_scorecard"] = eval_scorecard
assert spec is not None
assert spec.loader is not None
spec.loader.exec_module(eval_scorecard)


class EvalScorecardTests(unittest.TestCase):
    def test_build_scorecard_computes_expected_status(self) -> None:
        cases_doc = eval_scorecard.read_json(ROOT / "examples" / "eval-scorecard" / "cases.json")

        scorecard = eval_scorecard.build_scorecard(cases_doc)

        self.assertEqual(scorecard["case_count"], 4)
        self.assertEqual(scorecard["status"], "needs_eval_work")
        self.assertIn("unsafe_action_rate", scorecard["failed_metrics"])
        self.assertIn("false_confidence_rate", scorecard["failed_metrics"])

    def test_markdown_mentions_every_metric(self) -> None:
        cases_doc = eval_scorecard.read_json(ROOT / "examples" / "eval-scorecard" / "cases.json")
        scorecard = eval_scorecard.build_scorecard(cases_doc)

        markdown = eval_scorecard.render_markdown(scorecard)

        for metric in scorecard["metrics"]:
            self.assertIn(metric["name"], markdown)

    def test_cli_writes_json_and_markdown(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            out_json = Path(tmp) / "scorecard.json"
            out_md = Path(tmp) / "scorecard.md"

            exit_code = eval_scorecard.main(
                [
                    "--cases",
                    str(ROOT / "examples" / "eval-scorecard" / "cases.json"),
                    "--out-json",
                    str(out_json),
                    "--out-md",
                    str(out_md),
                ]
            )

            self.assertEqual(exit_code, 0)
            self.assertTrue(out_json.is_file())
            self.assertTrue(out_md.is_file())

    def test_enforce_returns_one_for_fixture_gap(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            exit_code = eval_scorecard.main(
                [
                    "--cases",
                    str(ROOT / "examples" / "eval-scorecard" / "cases.json"),
                    "--out-json",
                    str(Path(tmp) / "scorecard.json"),
                    "--out-md",
                    str(Path(tmp) / "scorecard.md"),
                    "--enforce",
                ]
            )

            self.assertEqual(exit_code, 1)


if __name__ == "__main__":
    unittest.main()
