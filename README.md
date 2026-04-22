# Admin Design Skills Suite

这是一个面向 AI 的管理后台设计 Skills 发行仓库。

仓库只保留与 Skills 分发、安装、阅读和复用直接相关的内容：

- `skills/`
- `docs/`

不包含本地前端实验页、运行时代码、页面生成评测实现或其他与 Skills 安装无关的文件。

## 入口

- 套件清单：[skills/suite.json](skills/suite.json)
- 默认入口 Skill：[admin-design-orchestrator](skills/admin-design-orchestrator/SKILL.md)
- 规范总纲：[AI_ADMIN_SKILLS.md](docs/AI_ADMIN_SKILLS.md)

## 用户主动调用 Skill 的快捷入口

用户在 Codex 里可以直接用真实的 `$skill-name` 形式主动点名 Skill。

速查表见 [docs/quick-start.md](docs/quick-start.md)。

规则：

- `$skill-name` 使用 Skill 的英文名
- `$skill-name` 后面的任务描述可以用中文或英文
- 不确定该调哪个 Skill 时，默认先用 `$admin-design-orchestrator`
- 如果输入信息不足，总入口会先要求澄清，而不是直接分流

最短可用格式：

- `$admin-design-orchestrator 设计后台页`
- `$admin-design-orchestrator design admin page`
- `$admin-design-review 审查页面`
- `$admin-design-review review page`

常见快捷入口：

- `$design-principles 明确需求`
- `$design-principles clarify brief`
- `$admin-design-patterns 收页面结构`
- `$admin-design-patterns shape page structure`
- `$style-guardrails 收视觉`
- `$admin-component-contracts 抽组件契约`
- `$admin-visualization 判断是否上图`
- `$admin-motion 补必要反馈`
- `$admin-design-review 最终审查`

如果用户已经明确知道自己要做结构、视觉、组件、可视化或 review，可以直接点名对应 Skill。

## 技能清单

- [design-principles](skills/design-principles/SKILL.md)
- [style-guardrails](skills/style-guardrails/SKILL.md)
- [admin-design-patterns](skills/admin-design-patterns/SKILL.md)
- [admin-component-contracts](skills/admin-component-contracts/SKILL.md)
- [admin-visualization](skills/admin-visualization/SKILL.md)
- [admin-motion](skills/admin-motion/SKILL.md)
- [admin-design-review](skills/admin-design-review/SKILL.md)
- [admin-design-orchestrator](skills/admin-design-orchestrator/SKILL.md)

## 文档地图

- [快速开始](docs/quick-start.md)
- [设计原则](docs/design-principles.md)
- [样式规范](docs/style-spec.md)
- [设计模式](docs/design-patterns.md)
- [组件规范](docs/component-spec.md)
- [可视化规范](docs/visualization-spec.md)
- [动效规范](docs/motion-spec.md)
- [AI 设计流程](docs/ai-design-workflow.md)

## 仓库边界

- 规则层：维护可跨行业复用的原则、模式、契约、样式、表达和审查规则。
- 案例层：保留在 Skill references 中的样本、prompt 和路由示例，用于验证总入口 Skill。
- 评测层：保留在 Skill references 中的分流验证报告，用于验证分流逻辑，而不是替代规则层。

行业专有语境允许存在于案例层和评测层，但不应被误读成规则层。

## Highlights

> 记录对外可见的规则和产出变化。

- **审查结果带严重度**：`admin-design-review` 的 checklist 每条标注 S0–S3（阻断 / 高 / 中 / 低），输出直接可用于修复排序。
- **面向内部团队的 ant-design-vue 锚定**：`style-guardrails` 的间距 / 字号 / 行高档位已对齐 `ant-design` 默认值；`admin-component-contracts` 的实现映射新增 `ant-design-vue 对应` 列，把抽象模式映射到 `a-table / a-drawer / a-modal / a-steps / a-popconfirm` 等组件作为起点（不是强制映射，非该栈项目可忽略此列）。
- **总入口分流更稳**：`admin-design-orchestrator` 样本集扩到 `31` 条，新增 `5` 条反例（触发词误导、问题层级错配、来源未澄清、内部矛盾、主从意图混淆）和 `2` 条横向行业 case（订阅计费对账、ETL 任务监控），验证入口在非零售语境下依然能正确分流。
- **动效硬规则更紧**：`admin-motion` 把 "转场不超过 `200ms`" 和 "重要状态不能只靠动效承载信息" 纳入硬规则，对齐 `prefers-reduced-motion` 降级底线。
- **组件定义前先澄清**：`admin-component-contracts` 在用户只给一个组件名时，默认先回答 `5` 问（对应模式 / 最小输入 / 浮层归属 / 现有实现 / 可访问性底线），再输出契约。

## 使用说明

这个仓库本身就是 Skills 源。安装时，使用你本地的 Skill 安装器指向该 GitHub 仓库即可。
