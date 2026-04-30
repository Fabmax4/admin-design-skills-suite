---
name: admin-design-principles
description: Use when an admin/backend design request is still ambiguous and needs value judgment before structure; when reviewing whether a page prioritizes clarity, action, hierarchy, density, and continuity; or when resetting a design that feels visually busy but strategically weak. 适用于后台设计早期方向判断、价值排序、结构前置约束与原则评审。
---

# Design Principles

这个 Skill 是渐进式 Skills 的启发层。它不负责决定具体组件，而是先回答“这个后台页面究竟应该优先服务什么”。

## 何时使用

- 用户给的信息不足，还没有稳定页面结构
- 一个后台方案看起来完整，但判断标准不清
- 页面视觉很多，但主动作、主层级和异常链路不明确
- 需要先做方向评审，再进入模式和组件层

## 工作流程

1. 先判断是否需要澄清
   如果输入里的角色、对象、主任务、成功标准不清楚，先要求澄清；如果用户在澄清后仍说不清，就用启发式问题帮助其暴露线索。
2. 明确页面任务
   先说清这个页面主要服务什么任务，是“看全局”“找对象”“处理异常”还是“维护内容”。
3. 找第一优先动作
   如果页面最重要的动作说不清，先不要进入结构设计。
4. 套原则判断
   依次检查：`清晰优先`、`行动优先`、`异常优先`、`层级优先`、`密度克制`、`连续性优先`。
5. 找主要风险
   指出这个需求最容易滑向的反模式，例如信息同权、只展示不处理、过度装饰、孤立页面。
6. 输出方向结论
   给出页面应该优先强化什么，以及暂时不该做什么。

## 输出格式

- `页面任务`
- `待澄清问题`
- `第一优先动作`
- `最重要的 2-3 条原则`
- `主要风险`
- `应该强化的方向`
- `不应该出现的设计`

## 硬规则

- 不在原则没明确前进入组件命名
- 不在输入信息仍不足时直接进入页面结构
- 不把后台页面做成展示页
- 不让主要动作淹没在信息噪音里
- 不忽略异常、边界和恢复链路
- 不把每一页都设计成彼此割裂的独立海报
- 不把行业专有名词直接固化成原则层术语

## 使用提醒

- 最短发起格式可写成 `$admin-design-principles 明确需求` 或 `$admin-design-principles clarify brief`
- 原则定义看 `references/core-principles.md`
- 输入信息不足时先读 `references/diagnostic-questions.md`
- 需要快速指出方向性问题时读 `references/anti-patterns.md`

## 输出语气

澄清问题要说人话，直接说明为什么这个问题会影响后续设计判断。不要把“角色、对象、主任务、成功标准”写成冷冰冰的字段登记。

## 默认做法

如果用户只给一句需求，默认先回答这 5 个问题：

1. 这个页面最核心的工作任务是什么？
2. 谁在使用这页，进入页面后是先判断局势还是先处理对象？
3. 页面最重要的动作是什么？
4. 哪种异常或边界状态最值得优先暴露？
5. 哪些内容不该和主动作同权出现？
