# 常见工作流

## 文件定位

这是规则层文件，用来描述后台设计任务的通用 Skill 组合方式。

- 这里给的是可复用工作流，不是行业案例。
- 具体行业语境、对象名和请求原文应留在案例层文件中。

## 从零开始设计后台页

1. `design-principles`
2. `admin-design-patterns`
3. `style-guardrails`
4. `admin-component-contracts`
5. 视情况补 `admin-visualization`
6. 视情况补 `admin-motion`
7. `admin-design-review`

## 已有页面，要重构结构

1. `admin-design-patterns`
2. `admin-component-contracts`
3. `admin-design-review`

## 已有结构，只想收视觉

1. `style-guardrails`
2. 视情况补 `admin-motion`
3. `admin-design-review`

## 数据密集页，要决定图表

1. `admin-visualization`
2. `admin-design-review`

## 抽象后台组件或规范

1. `admin-design-patterns`
2. `admin-component-contracts`
3. `admin-design-review`

## 先重构结构，再顺手收视觉

1. `admin-design-patterns`
2. `admin-component-contracts`
3. `style-guardrails`
4. `admin-design-review`

## 先规划后台，再补图表取舍

1. `design-principles`
2. `admin-design-patterns`
3. `admin-visualization`
4. `admin-design-review`

## 先收视觉，再补必要反馈

1. `style-guardrails`
2. `admin-motion`
3. `admin-design-review`

## 先 review，再给下一轮 Skill 链路

1. `admin-design-review`

说明：

- 后续 Skill 顺序应作为 review 结论输出
- 不重新跑完整设计链路

## 结构冻结下做组件统一

1. `admin-component-contracts`
2. `admin-design-review`

说明：

- 先判断是否能在不改结构的前提下统一组件
- 不能时，直接在 review 结论里说明冲突

## 不想上图，但想做图表摘要区

1. `admin-visualization`
2. `admin-design-review`

说明：

- 先识别“不要上图”是硬约束
- 再给出非图表替代方案

## 先不要动结构，但要出新信息架构

1. `admin-design-review`

说明：

- 先指出约束冲突
- 再把信息架构方向放进后续建议，不当场执行

## 最终验收

1. `admin-design-review`

## 使用提醒

- 优先走最短链路
- 如果上层问题明显存在，先回退，不继续往下层推进
