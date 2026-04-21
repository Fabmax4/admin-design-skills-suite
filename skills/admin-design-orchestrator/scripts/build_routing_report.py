#!/usr/bin/env python3
"""
Build a markdown validation report scaffold from routing sample cases.

Usage:
    python build_routing_report.py <sample_yaml> <output_md>
"""

from __future__ import annotations

import re
import sys
from datetime import date
from pathlib import Path

import yaml


REQUIRED_CASE_KEYS = {
    "id",
    "title",
    "prompt",
    "expected_stage",
    "expected_start_skill",
    "expected_chain",
    "avoid_layers",
    "validation_focus",
}


def load_cases(sample_path: Path) -> list[dict]:
    data = yaml.safe_load(sample_path.read_text())
    if not isinstance(data, dict) or "cases" not in data:
        raise ValueError("YAML must contain top-level 'cases'.")
    cases = data["cases"]
    if not isinstance(cases, list) or not cases:
        raise ValueError("'cases' must be a non-empty list.")
    return cases


def validate_cases(cases: list[dict]) -> list[str]:
    errors: list[str] = []
    seen_ids: set[str] = set()
    for index, case in enumerate(cases, start=1):
        if not isinstance(case, dict):
            errors.append(f"Case #{index} is not a mapping.")
            continue

        missing = REQUIRED_CASE_KEYS - set(case.keys())
        if missing:
            errors.append(
                f"Case #{index} missing keys: {', '.join(sorted(missing))}"
            )
            continue

        case_id = case["id"]
        if case_id in seen_ids:
            errors.append(f"Duplicate case id: {case_id}")
        seen_ids.add(case_id)

        expected_start = case["expected_start_skill"]
        expected_chain = case["expected_chain"]
        avoid_layers = case["avoid_layers"]

        if not isinstance(expected_start, list) or not expected_start:
            errors.append(f"{case_id}: expected_start_skill must be a non-empty list.")
        if not isinstance(expected_chain, list) or not expected_chain:
            errors.append(f"{case_id}: expected_chain must be a non-empty list.")
        if not isinstance(avoid_layers, list):
            errors.append(f"{case_id}: avoid_layers must be a list.")

        if isinstance(expected_start, list) and isinstance(expected_chain, list):
            if expected_chain and expected_start and expected_start[0] != expected_chain[0]:
                errors.append(
                    f"{case_id}: expected_start_skill[0] must equal expected_chain[0]."
                )

    return errors


def infer_report_title(output_path: Path) -> str:
    stem = output_path.stem
    match = re.search(r"round-(\d+)", stem)
    if match:
        return f"Admin Design Orchestrator Round {match.group(1)} Validation"
    return "Admin Design Orchestrator Validation"


def build_report(cases: list[dict], sample_path: Path, output_path: Path) -> str:
    lines: list[str] = []
    lines.append(f"# {infer_report_title(output_path)}")
    lines.append("")
    lines.append(f"- 日期：`{date.today().isoformat()}`")
    lines.append(f"- 样本源：`{sample_path}`")
    lines.append("- 方法：基于当前路由规则生成验证骨架，并记录样本自洽性检查结果。")
    lines.append("- 结果汇总：")
    lines.append("  - `Pass`：")
    lines.append("  - `Warning`：")
    lines.append("  - `Fail`：")
    lines.append("")
    lines.append("## 逐例结果")
    lines.append("")

    for case in cases:
        lines.append(f"### {case['id']} {case['title']}")
        lines.append("")
        lines.append(f"- `Prompt`：{case['prompt']}")
        lines.append(f"- `Expected Stage`：{case['expected_stage']}")
        lines.append(
            f"- `Expected Start Skill`：{', '.join(case['expected_start_skill'])}"
        )
        lines.append(f"- `Expected Chain`：{' -> '.join(case['expected_chain'])}")
        lines.append(
            f"- `Avoid Layers`：{', '.join(case['avoid_layers']) if case['avoid_layers'] else '无'}"
        )
        lines.append(f"- `Validation Focus`：{case['validation_focus']}")
        lines.append("- `Actual Start Skill`：")
        lines.append("- `Actual Chain`：")
        lines.append("- `Verdict`：")
        lines.append("- `Notes`：")
        lines.append("")

    lines.append("## 总结")
    lines.append("")
    lines.append("- `主要通过项`：")
    lines.append("- `主要 warning`：")
    lines.append("- `需要调整的规则文件`：")
    lines.append("- `下一轮验证建议`：")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: python build_routing_report.py <sample_yaml> <output_md>")
        return 1

    sample_path = Path(sys.argv[1]).resolve()
    output_path = Path(sys.argv[2]).resolve()

    if not sample_path.exists():
        print(f"[ERROR] Sample file not found: {sample_path}")
        return 1

    cases = load_cases(sample_path)
    errors = validate_cases(cases)
    if errors:
        print("[ERROR] Validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(build_report(cases, sample_path, output_path) + "\n")
    print(f"[OK] Wrote report scaffold to {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
