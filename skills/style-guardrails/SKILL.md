---
name: style-guardrails
description: Use when an admin/backend UI needs hard visual guardrails for color, radius, density, layout, surface treatment, and accessibility; when reviewing whether a design has drifted away from a stable Ant-style admin skeleton; or when constraining AI before visual polish. 适用于后台视觉边界约束、样式收敛、后台骨架守卫和风格偏航纠正。
---

# Style Guardrails

这个 Skill 是渐进式 Skills 的约束层。它不是用来“做美化”，而是用来防止 AI 把后台做偏。

## 何时使用

- 页面结构已经基本明确，但视觉边界还不稳定
- 需要把设计拉回后台语境，而不是营销页语境
- 需要统一色彩、圆角、密度、布局和表面处理
- 需要评审一个后台页面是否过度装饰、过度留白或过度圆润

## 工作流程

1. 确认任务与主动作
   样式约束必须服务于任务，不脱离页面目标单独存在。
2. 套硬边界
   依次检查：色彩、圆角、密度、版式、边框与阴影、可访问性。
3. 找样式偏航
   明确哪些地方已经偏向展示页、营销页或卡片秀。
4. 输出收敛方案
   说明哪些视觉元素应保留、降级、统一或删除。
5. 产出样式结论
   给出一版简洁、稳定、可扫读的后台样式决策。

## 输出格式

- `视觉目标`
- `必须保留的边界`
- `需要收紧的样式`
- `允许强调的元素`
- `需要删除的装饰`
- `可访问性底线`

## 硬规则

- 主色不做大面积底色
- 默认信息卡和正文文字保持中性，`brand / info` 不自动上色
- 只有状态、风险、成功反馈、一级动作允许使用语义色强调
- 不使用渐变做主要表面或装饰性背景
- 不使用大圆角制造展示感
- 不靠阴影做主要层级
- 不用巨大的头部和留白稀释后台密度
- 不牺牲键盘可达、聚焦和状态可读性

## 使用提醒

- 最短发起格式可写成 `$style-guardrails 收视觉` 或 `$style-guardrails tighten visual guardrails`
- 颜色、圆角、密度看 `references/tokens.md`
- 后台骨架和表面处理看 `references/layout-and-surfaces.md`
- 可访问性底线看 `references/accessibility-baseline.md`

## 默认做法

如果要快速判断一个后台页面有没有做偏，默认先看：

1. 主色是不是被滥用成大面积装饰？
2. 圆角和阴影是不是太强？
3. 页面头是不是过大，挤压了主内容？
4. 信息密度是不是靠乱堆而不是靠结构承载？
5. 主要状态和主要动作是不是一眼可见？
