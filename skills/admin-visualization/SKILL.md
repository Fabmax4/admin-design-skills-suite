---
name: admin-visualization
description: Use when an admin/backend page needs data expression decisions; deciding whether information should be shown as metrics, tables, status rails, comparison charts, or inline table signals; or reviewing whether charts are actually helping decisions instead of decorating the page. 适用于后台数据表达判断、图表取舍、表格信号设计和可视化复用评审。
---

# Admin Visualization

这个 Skill 对应渐进式 Skills 的数据表达层。它不负责让页面“更炫”，而是约束 AI 只在可视化真的帮助判断和行动时才使用图形。

## 何时使用

- 页面是数据密集型，需要决定哪些信息该图形化
- 需要在指标卡、表格、状态条、对比图之间做选择
- 需要评审现有图表是否只是装饰
- 需要把后台数据表达收敛成稳定的可复用方式

## 工作流程

1. 先确认决策任务
   说明用户需要比较什么、判断什么、处理什么；如果没有明确决策任务，默认先不用图。
2. 判断是否需要图形化
   只在趋势、对比、分布、阈值关系明确存在时才考虑图形。
3. 选择表达方式
   在 `指标卡 / 进度或状态条 / 对比图 / 表格中的可视信号` 之间选择，不默认上图表。
4. 绑定动作入口
   可视化必须服务于动作、筛选或下钻，不能孤立存在。
5. 输出表达结论
   明确哪些信息用图，哪些继续留在文字、表格或摘要区。
6. 检查表格惯性
   如果最终选择表格，优先保持列稳定和浏览惯性，空间不足时先横向滚动，不把单元格压成逐字换行。
7. 检查信息量化
   如果提示、摘要或图形说明里能先给数量、比例、时限、范围，就不要只给模糊判断。

## 输出格式

- `决策任务`
- `是否需要图形化`
- `推荐表达方式`
- `不建议图形化的信息`
- `下钻或动作入口`
- `需要避免的装饰性图表`

## 硬规则

- 图形不能直接支持决策，就不用图
- 只有一两个数值且没有比较关系时，不上图
- 需要立即处理单对象时，优先表格、列表或摘要，不优先图表
- 表格中的状态信号足够时，不额外造图
- 图表不脱离动作入口和上下文
- 表格一旦承担处理任务，就必须优先保持行列一致性和浏览阅读惯性
- 图形或说明能定量先定量，不能定量再定性

## 使用提醒

- 最短发起格式可写成 `/admin-visualization 判断是否上图` 或 `/admin-visualization decide visualization`
- 适合图形化的场景看 `references/chart-use-cases.md`
- 不适合图形化的场景看 `references/non-chart-cases.md`
- 各类表达方式的选型规则看 `references/presentation-rules.md`

## 默认做法

如果要快速判断某块信息要不要上图，先回答：

1. 这里要看趋势、对比、分布，还是只看当前值？
2. 图形会不会比表格或指标卡更快支持判断？
3. 用户看完这块信息后，下一步动作是什么？
