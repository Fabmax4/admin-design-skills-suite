---
name: admin-motion
description: Use when adding or reviewing motion in an admin/backend UI; deciding whether a state change needs animation, focus movement, or feedback; or reducing decorative motion so the interface stays stable, accessible, and task-oriented. 适用于后台动效取舍、状态反馈设计、转场收敛和可访问性降级。
---

# Admin Motion

这个 Skill 对应渐进式 Skills 的反馈层。它的目标不是增加存在感，而是让状态变化更容易被理解。

## 何时使用

- 需要决定后台页面是否该加动效
- 需要给筛选、保存、提交、恢复、批量处理等动作设计反馈
- 需要评审一个后台页面是否过度动效化
- 需要在动效和可访问性之间做取舍

## 工作流程

1. 确认变化事件
   先说清发生了什么变化，是页面切换、区块刷新、弹层进入，还是提交动作完成。
2. 判断是否需要动效
   如果变化本身不重要，或文字状态已经足够表达，默认不加动效。
3. 选择反馈方式
   在 `聚焦变化 / 轻量转场 / 状态更新反馈 / 文字或状态提示` 之间选最轻的一种。
4. 检查是否打扰任务
   动效不能影响扫读、判断和连续操作。
5. 做可访问性降级
   保证 `prefers-reduced-motion` 下仍能完整理解状态变化。

## 输出格式

- `变化事件`
- `是否需要动效`
- `推荐反馈方式`
- `应保留的状态提示`
- `应删除的装饰性动效`
- `可访问性降级方案`

## 硬规则

- 只为状态变化服务，不为存在感服务
- 重要反馈不能只靠动画表达
- 不做与任务无关的背景动画
- 不做所有卡片统一漂浮或所有数字统一跳动
- 同一页动效类型尽量少

## 使用提醒

- 最短发起格式可写成 `/admin-motion 补必要反馈` 或 `/admin-motion refine motion feedback`
- 合适的动效场景看 `references/good-use-cases.md`
- 常见反模式看 `references/anti-patterns.md`
- 可访问性和降级要求看 `references/accessibility-and-fallback.md`

## 默认做法

如果要快速判断某个后台动效要不要保留，先回答：

1. 这个动效是在解释什么变化？
2. 没有这个动效，用户会不会看不懂状态变化？
3. 它会不会打断扫读、筛选或连续处理？
