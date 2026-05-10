# Memory And Review Ledger

这套账本用于把真实设计工作中的有效经验保存在本机，并让它们在后续任务中可检索、可审核、可提升。它不是公开规则层，也不替代 `.skill-updates/`。

## 存储位置

默认写入：

```text
${CODEX_HOME:-$HOME/.codex}/admin-design/projects/<project-slug>/
```

可用 `ADMIN_DESIGN_HOME` 临时改写到其他目录，适合测试或沙盒运行。

项目目录内使用三类 append-only JSONL：

| 文件 | 用途 |
| --- | --- |
| `learnings.jsonl` | 可复用经验、偏好、反模式、组件契约线索 |
| `<branch>-reviews.jsonl` | 当前分支或任务的设计评审结论 |
| `timeline.jsonl` | Skill 开始、完成、checkpoint 等轻量运行轨迹 |

这些文件是本地工作记忆，不提交到公开仓库。公开仓库只保留脚本和机制说明。

## 写入命令

记录一条候选经验：

```bash
npm run memory:log -- --type pattern --key stable-table-reading --insight "表格默认先保证连续阅读惯性，再考虑视觉变化。" --source user-stated --confidence 10
```

记录一条评审结果：

```bash
npm run memory:log -- --kind review --key run-07-navigation --insight "导航命名与页面对象不一致，影响寻址记忆。" --status needs-work --source observed
```

记录一次流程事件：

```bash
npm run memory:log -- --kind timeline --event completed --skill admin-design-review --outcome success
```

## 读取命令

读取当前项目可直接使用的经验：

```bash
npm run memory:search -- --kind learning --usable --limit 5
```

读取当前项目评审记录：

```bash
npm run memory:search -- --kind review --query navigation
```

跨项目读取只加载安全记录：

```bash
npm run memory:search -- --kind learning --cross-project --usable --limit 5
```

跨项目记录必须满足 `source=user-stated`，或 `status=approved/promoted`。AI 推断、一次性观察和未审核候选不能自动影响其他项目。

## 字段规范

| 字段 | 要求 |
| --- | --- |
| `kind` | `learning`、`review`、`timeline` |
| `type` | `pattern`、`pitfall`、`preference`、`decision`、`component`、`style`、`visualization`、`motion`、`routing`、`review`、`operational` |
| `key` | 短键名，只能用字母、数字、连字符和下划线 |
| `insight` | 一句话说明经验或问题，不写项目路径和一次性字段 |
| `source` | `observed`、`user-stated`、`inferred`、`cross-review` |
| `confidence` | `1-10`，用户明确表达通常为 `10`，AI 推断通常不高于 `5` |
| `status` | `candidate`、`approved`、`rejected`、`promoted`、`recorded`、`pass`、`needs-work`、`blocked`、`fixed` |
| `scope` | `project`、`suite`、`cross-project` |
| `files` | 可选，仅记录相关公开文件或设计稿线索 |

## 审核位置

用户审核发生在经验进入公开 Skill 规则层之前：

1. 真实任务中发现经验，先写入 `learnings.jsonl`，默认 `status=candidate`。
2. 如果需要进入套件，使用 `npm run propose-pattern -- --write` 生成 `.skill-updates/*.md`。
3. 用户审核候选，判断它是通用规则、案例样本、项目偏好，还是应拒绝。
4. 只有 `approved` 或 `promoted` 的内容，才能转写到 `skills/*/SKILL.md`、`skills/*/references/*.md` 或 `docs/*.md`。
5. 转写后运行 `npm run check`，确认没有本机路径、旧调用名、运行时代码词和规则层污染。

## 使用边界

- 本地记忆可以帮助 AI 找回用户偏好和历史评审问题，但不能自动升级为公开规则。
- 未审核候选只能作为当前项目参考，不跨项目生效。
- 用户明确表达的偏好可以高置信记录，但仍要判断它是个人偏好、项目偏好还是套件规则。
- 行业术语应保留在案例、样本和提示层；规则层必须抽象为通用后台设计语言。
- 记录只保留能复用或能避免重复错误的信息，不记录普通聊天摘要。
