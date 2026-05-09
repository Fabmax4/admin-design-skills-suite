---
name: admin-design-orchestrator
description: Primary entry skill for admin/backend design work. Use when a user asks to design, refine, review, or extend an admin UI, admin page, admin component system, management dashboard, admin UI Kit, or design specification package, and you need to choose which specialized admin design skills to apply in what order. 适用于后台设计任务总入口、Skill 分流、调度编排与收口，也适用于后台 UI Kit 和设计规范包任务。
---

# Admin Design Orchestrator

这个 Skill 是整套后台设计 Skills 的总入口。它不直接替代其他 Skill，而是负责判断当前任务该调用哪些 Skill、按什么顺序调用、在什么时机停止下钻，以及何时进入最终审查。

## 何时使用

- 用户要设计一个后台页面或后台组件
- 用户要设计后台 UI Kit、设计规范包或组件规范集
- 用户要优化、重构、评审一套后台设计
- 用户只给了模糊业务目标，需要先判断从哪一层开始
- 用户给了具体页面，但不确定该先做结构、样式还是表达

## 核心职责

1. 先判断输入是否充分
   如果当前输入不足以判断页面范式、主任务、使用角色或成功标准，先要求澄清，不直接进入下游 Skill 分流。
2. 识别任务阶段
   只有在输入已足够的前提下，才判断当前任务更接近“方向判断”“结构设计”“组件抽象”“数据表达”“反馈打磨”还是“最终评审”。
3. 选择 Skill 链路
   只调用当前必要的 Skill 组合，不默认把所有 Skill 全部跑一遍。
4. 控制下钻顺序
   永远优先上层问题，避免在原则未定时讨论样式，在结构未定时讨论动效。
5. 统一输出
   把多层 Skill 的结论汇总成一份简洁、可执行的后台设计建议或评审结论。

## 默认分流顺序

优先从下面顺序判断：

1. `admin-design-principles`
2. `admin-design-patterns`
3. `admin-design-components`
4. `admin-design-style`
5. `admin-design-visualization`
6. `admin-design-motion`
7. `admin-design-review`

不是每次都要走到第 7 步。只有当用户明确要求 review、验收，或者方案已经成型时，才进入 `admin-design-review`。

## 工作流程

1. 先检查输入是否充分
   用 `references/input-contract.md` 判断当前输入是否足够；不够时先输出澄清问题。
2. 读取任务意图
   在输入足够的前提下，判断用户要的是“设计”“细化”“规范化”“评审”还是“修正”。
   如果用户要的是 UI Kit、设计规范包或组件规范集，先读 `references/ui-kit-page-set.md`，不要把它降级成单页 demo。
3. 判断起始层
   用 `references/entry-routing.md` 决定从哪一层开始。
4. 选择最小 Skill 组合
   用 `references/workflow-recipes.md` 找最短可行链路，不做冗余调用。
5. 汇总结论
   用 `references/output-templates.md` 输出统一结果。
6. 必要时收口 review
   如果任务已经足够具体，最后再用 `admin-design-review` 检查偏题和修复顺序。

## 输出格式

以下字段是内部组织结构，供 AI 判断分流和收口。最终对用户可见的回答必须翻译成自然段落：先给结论，再说明为什么从这一层开始，以及本轮暂时不进入哪些层。

- `任务阶段`
- `输入是否充分`
- `待澄清问题`
- `建议调用的 Skill`
- `调用顺序`
- `本轮重点`
- `暂不进入的层`
- `下一步`

## 硬规则

- 不在输入信息不足时直接进入组件和样式细节
- 不在结构未定时讨论可视化和动效
- 不为了“完整”而机械调用全部 Skill
- 不跳过 review 就宣布方案稳定
- 不把“可以先猜一下”当成跳过澄清的理由
- 不把上面的输出字段原样交给用户，除非用户明确要求结构化表格

## 使用提醒

- 用户主动调用时，优先使用 `$admin-design-orchestrator`
- 最短发起格式可写成 `$admin-design-orchestrator 设计后台页` 或 `$admin-design-orchestrator design admin page`
- 如果用户明确知道自己只要某一层，也可以直接用 `$admin-design-principles`、`$admin-design-patterns`、`$admin-design-review` 等显式 Skill 入口
- 分流规则看 `references/entry-routing.md`
- 稳定输入契约看 `references/input-contract.md`
- 常见组合链路看 `references/workflow-recipes.md`
- 示例调用集看 `references/example-call-set.md`
  这是案例层，不是规则层；其中允许保留具体行业语境来验证分流效果。
- 结构化验证样本看 `references/routing-sample-set.yaml`
  这是案例层数据，不是通用后台规则。
- 路由验收规则看 `references/routing-validation.md`
  这是评测层规则，用于判断分流是否正确，不直接充当页面设计规则。
- 汇总输出模板看 `references/output-templates.md`
- UI Kit 或设计规范包任务看 `references/ui-kit-page-set.md`
- 对用户可见的最终输出要结论先行、理由清楚、少用内部代号，避免规范书腔调

## 默认做法

如果用户只是说“做一套后台设计”，默认先输出：

1. 当前输入是否足够
2. 如果不够，先补哪几个澄清问题
3. 如果足够，先调用哪两个 Skill
4. 这轮不该过早进入哪一层
5. 下一轮什么时候进入 review
