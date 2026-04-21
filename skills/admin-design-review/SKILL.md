---
name: admin-design-review
description: Use when reviewing an admin/backend design proposal, page, component plan, or implemented UI against the full progressive Skills stack; diagnosing whether failures come from principles, style, patterns, component contracts, visualization, or motion; and producing a fix order with severity. 适用于后台设计评审、方案验收、失效归因、修复优先级排序与最终把关。
---

# Admin Design Review

这个 Skill 是渐进式 Skills 的最后一层。它不负责再发明新规范，而是用前面 6 个 Skill 的标准，审查一个后台设计方案、页面、组件计划或已实现界面是否偏题。

## 何时使用

- 用户要评审一个后台页面或一套后台方案
- 需要判断问题出在原则、样式、模式、组件、可视化还是动效层
- 需要给设计结果做最终把关，而不是继续发散
- 需要输出清晰的修复顺序，而不是泛泛而谈

## 工作流程

1. 明确审查对象
   先说清是在审查页面方案、组件抽象、设计稿，还是已实现界面。
2. 先查前置澄清
   如果原始输入信息不足，先判断是否已经通过澄清或启发式问题拿到了足够线索。
3. 逐层检查
   依次审查：`design-principles`、`style-guardrails`、`admin-design-patterns`、`admin-component-contracts`、`admin-visualization`、`admin-motion`。
4. 识别失效层
   每个问题都要归因到具体层级，避免把结构问题错归到视觉问题。
5. 评定严重度
   使用统一严重度，把“阻断问题”和“可后置打磨”分开。
6. 输出修复顺序
   总是先修原则和结构，再修样式和表达，最后才修动效。

## 输出格式

- `审查对象`
- `前置澄清是否充分`
- `结论`
- `主要问题`
- `问题归因层`
- `严重度`
- `修复顺序`
- `残余风险`

## 硬规则

- 不把结构问题伪装成视觉问题
- 不把业务命名问题伪装成组件问题
- 不忽略“需求本身没澄清就直接画页面”的前置失效
- 不在主动作不清时讨论细节动效
- 不在原则层失效时直接进入美化建议
- 问题必须给出归因和修复次序，不能只给感受

## 使用提醒

- 最短发起格式可写成 `/admin-design-review 审查页面` 或 `/admin-design-review review page`
- 总审查清单看 `references/review-checklist.md`
- 常见失效模式看 `references/failure-modes.md`
- 严重度定义看 `references/severity-model.md`
- 修复顺序看 `references/fix-order.md`

## 默认做法

如果用户让你“review 这个后台设计”，默认先回答：

1. 它的第一优先动作清楚吗？
2. 页面范式和模式块选对了吗？
3. 组件契约是抽象复用，还是场景堆砌？
4. 图表和动效是在帮助判断，还是在制造噪音？
5. 最先该修的是哪一层？
