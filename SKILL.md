---
name: admin-design
description: Suite entry for the Admin Design Skills Suite. Use when a user needs to understand, install, route, or select the right Codex admin design skill. This root skill indexes the suite and points real design work to $admin-design-orchestrator.
---

# Admin Design Skills Suite

这是后台设计技能套件的根入口。它负责说明套件定位、安装结构和子 Skill 路由，不直接替代 `$admin-design-orchestrator`。

## 何时使用

- 用户询问这套后台设计 Skills 如何安装、调用或组织。
- 用户不知道该用哪个 `$admin-design-*` Skill。
- 需要确认当前仓库是否是 Codex 可安装的 Skills 套件。
- 需要把实际工作中产生的有效范式补回技能套件。

## 默认入口

真实后台设计任务默认从 `$admin-design-orchestrator` 开始。它会先判断输入是否充分，再决定是否进入原则、模式、组件、样式、可视化、动效或审查层。

## 子 Skill

1. `$admin-design-orchestrator`：默认设计入口，负责澄清、分流、组合和收口。
2. `$admin-design-principles`：判断目标、主动作、用户角色、优先级和早期风险。
3. `$admin-design-patterns`：选择页面范式、布局骨架和可复用模式块。
4. `$admin-design-components`：定义组件契约、状态、动作、可访问性和复用边界。
5. `$admin-design-style`：约束色彩、密度、圆角、表面、层级和可访问性。
6. `$admin-design-visualization`：决定数据表达方式，避免无意义图表。
7. `$admin-design-motion`：判断是否需要动效、焦点移动或状态反馈。
8. `$admin-design-review`：审查结果、归因失效层并给出修复顺序。

## 路由规则

- 只要任务是“设计、细化、优化、评审后台页面或组件”，先推荐 `$admin-design-orchestrator`。
- 表格多选后的页面级操作统一识别为 `Selection Action Bar`（选择操作栏），也包括选择汇总操作栏、已选预览栏、批量操作栏、`Selection Summary Bar`、`Batch Action Bar`、`Bulk Action Bar`、`Selected Rows Toolbar` 等叫法。
- 如果用户只问原则、结构、组件、视觉、图表、动效或评审中的单层问题，可以直接推荐对应子 Skill。
- 需求信息不足时先澄清，不要假装已经能进入页面或组件设计。
- 对用户的回答应自然说明判断理由，不要把内部字段模板原样输出。

## 安装

```bash
git clone --single-branch --depth 1 https://github.com/Fabmax4/admin-design-skills-suite.git ~/.codex/skills/admin-design
cd ~/.codex/skills/admin-design
./setup --host codex
```

安装清单见 `skills/suite.json`。快速调用见 `docs/quick-start.md`。

## 更新机制

如果工作中出现可复用的新范式，先读 `references/update-mechanism.md`。默认先用 `npm run propose-pattern -- --write` 记录候选，通过复用性和去项目化审核后，再写入具体子 Skill 或 reference。
