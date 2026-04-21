# Skills Quick Start

这是一张给用户直接使用的速查表。

目标只有一个：让你在 Codex 里用最短的 `/skill-name` 指令发起这套 Skills，而不用先读完整规范。

## 一条总规则

- `/skill-name` 使用英文 Skill 名
- 斜杠后面的任务描述可以用中文或英文
- 不确定从哪层开始时，默认先用 `/admin-design-orchestrator`

## 默认入口

最短写法：

- `/admin-design-orchestrator 设计后台页`
- `/admin-design-orchestrator design admin page`

适用场景：

- 你不知道该先收结构、视觉还是组件
- 你只知道要做“一个后台页”或“一个后台方案”
- 你怀疑输入信息还不够完整

## 按任务直达

需求还不清楚：

- `/design-principles 明确需求`
- `/design-principles clarify brief`

先收页面结构：

- `/admin-design-patterns 收页面结构`
- `/admin-design-patterns shape page structure`

先收视觉边界：

- `/style-guardrails 收视觉`
- `/style-guardrails tighten visual guardrails`

先抽组件契约：

- `/admin-component-contracts 抽组件契约`
- `/admin-component-contracts define component contracts`

判断是否上图：

- `/admin-visualization 判断是否上图`
- `/admin-visualization decide visualization`

只补必要反馈：

- `/admin-motion 补必要反馈`
- `/admin-motion refine motion feedback`

做最终审查：

- `/admin-design-review 审查页面`
- `/admin-design-review review page`

## 不知道怎么描述时

你甚至可以只写一个很短的目标：

- `/admin-design-orchestrator 列表页`
- `/admin-design-orchestrator dashboard`
- `/admin-design-review review`

如果输入信息不足，总入口会先要求澄清，而不是直接误分流。

## 最常见的选择

- 新做一页：`/admin-design-orchestrator`
- 重构结构：`/admin-design-patterns`
- 收视觉：`/style-guardrails`
- 抽组件：`/admin-component-contracts`
- 看图表取舍：`/admin-visualization`
- 做验收：`/admin-design-review`

## 一个简单心法

- 不确定：先 `/admin-design-orchestrator`
- 已知要做哪一层：直接点名那个 Skill
- 想少打字：保持 `斜杠 + 英文 Skill 名 + 2 到 6 个字的任务`
