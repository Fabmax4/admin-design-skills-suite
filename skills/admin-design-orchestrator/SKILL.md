---
name: admin-design-orchestrator
description: Primary entry skill for admin/backend design work. Use when a user asks to design, refine, review, or extend an admin UI, admin page, admin component system, or management dashboard, and you need to choose which specialized admin design skills to apply in what order. 适用于后台设计任务总入口、Skill 分流、调度编排与收口。
---

# Admin Design Orchestrator

这个 Skill 是整套后台设计 Skills 的总入口。它不直接替代其他 Skill，而是负责判断当前任务该调用哪些 Skill、按什么顺序调用、在什么时机停止下钻，以及何时进入最终审查。

## 何时使用

- 用户要设计一个后台页面或后台组件
- 用户要优化、重构、评审一套后台设计
- 用户只给了模糊业务目标，需要先判断从哪一层开始
- 用户给了具体页面，但不确定该先做结构、样式还是表达

## 核心职责

1. 识别任务阶段
   判断当前任务更接近“方向判断”“结构设计”“组件抽象”“数据表达”“反馈打磨”还是“最终评审”。
2. 选择 Skill 链路
   只调用当前必要的 Skill 组合，不默认把所有 Skill 全部跑一遍。
3. 控制下钻顺序
   永远优先上层问题，避免在原则未定时讨论样式，在结构未定时讨论动效。
4. 统一输出
   把多层 Skill 的结论汇总成一份简洁、可执行的后台设计建议或评审结论。

## 默认分流顺序

优先从下面顺序判断：

1. `design-principles`
2. `admin-design-patterns`
3. `style-guardrails`
4. `admin-component-contracts`
5. `admin-visualization`
6. `admin-motion`
7. `admin-design-review`

不是每次都要走到第 7 步。只有当用户明确要求 review、验收，或者方案已经成型时，才进入 `admin-design-review`。

## 工作流程

1. 读取任务意图
   判断用户要的是“设计”“细化”“规范化”“评审”还是“修正”。
2. 判断起始层
   用 `references/entry-routing.md` 决定从哪一层开始。
3. 选择最小 Skill 组合
   用 `references/workflow-recipes.md` 找最短可行链路，不做冗余调用。
4. 汇总结论
   用 `references/output-templates.md` 输出统一结果。
5. 必要时收口 review
   如果任务已经足够具体，最后再用 `admin-design-review` 检查偏题和修复顺序。

## 输出格式

- `任务阶段`
- `建议调用的 Skill`
- `调用顺序`
- `本轮重点`
- `暂不进入的层`
- `下一步`

## 硬规则

- 不在任务模糊时直接进入组件和样式细节
- 不在结构未定时讨论可视化和动效
- 不为了“完整”而机械调用全部 Skill
- 不跳过 review 就宣布方案稳定

## 使用提醒

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

## 默认做法

如果用户只是说“做一套后台设计”，默认先输出：

1. 当前任务阶段是什么
2. 先调用哪两个 Skill
3. 这轮不该过早进入哪一层
4. 下一轮什么时候进入 review
