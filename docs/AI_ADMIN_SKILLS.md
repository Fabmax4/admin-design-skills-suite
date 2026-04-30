# Admin Design Skills Suite

这是一套面向 Codex 的后台设计 Skills。目标不是替代设计师，而是约束 AI 在管理后台任务中按稳定顺序工作：先澄清目标，再定结构和组件，最后处理视觉、数据表达、动效和审查。

## 入口

默认入口是 `$admin-design-orchestrator`。根 Skill `$admin-design` 只负责说明套件结构和路由，不直接承接页面设计。

## 渐进层级

1. `$admin-design-principles`：明确用户角色、页面任务、主动作、成功标准和关键风险。
2. `$admin-design-patterns`：选择页面范式、导航位置、列表/详情/编辑/看板等模式块。
3. `$admin-design-components`：定义组件职责、输入、状态、动作、可访问性和复用边界。
4. `$admin-design-style`：约束色彩、密度、圆角、表面、信息卡片和文字使用。
5. `$admin-design-visualization`：决定是否使用指标、图表、状态轨、对比或表格。
6. `$admin-design-motion`：只保留能帮助理解状态变化和操作结果的动效。
7. `$admin-design-review`：按层归因问题，并给出修复顺序。

## 文档

- [quick-start.md](quick-start.md)：6 条最短调用。
- [ai-design-workflow.md](ai-design-workflow.md)：AI 执行后台设计任务的渐进流程。
- [design-principles.md](design-principles.md)：原则层说明。
- [design-patterns.md](design-patterns.md)：后台页面模式。
- [component-spec.md](component-spec.md)：组件契约规范。
- [style-spec.md](style-spec.md)：视觉和样式约束。
- [visualization-spec.md](visualization-spec.md)：数据表达规则。
- [motion-spec.md](motion-spec.md)：动效使用边界。
- [output-voice.md](output-voice.md)：把内部规范翻译成用户可读回答的输出语气规则。

## 使用约束

- 公开调用名统一使用 `$admin-design-*`。
- 需求信息不足时先澄清；如果用户说不清，用启发式问题获取线索。
- 信息架构和导航必须统一协调，符合用户肌肉记忆寻址。
- 表格优先保障连续阅读惯性，减少单元格大小随机性；超过 15 列时支持个性化显示列和列排序。
- 提示类信息能定量先定量，不能定量再定性。
- 信息卡片和正文文字默认中性；没有特殊状态或风险，不额外加色。
- 渐变色、强阴影、大圆角和装饰动效都不是后台默认手段。
