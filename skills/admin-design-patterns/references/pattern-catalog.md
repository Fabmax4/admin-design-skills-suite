# 模式块目录

| 模式块 | 何时使用 | 最小输入 | 当前业务包装示例 |
| --- | --- | --- | --- |
| `Summary Metrics` | 先建立局势概览 | 数值、趋势、解释语境 | `BusinessMetricCard` |
| `Status Rail` | 表达流程型状态 | 阶段、当前状态、时效或进度 | `FulfillmentRail` |
| `Signal Panel` | 表达健康度、风险、资源压力 | 当前状态、阈值或占比、建议动作 | `InventoryHealthCard`、`ChannelPerformanceCard`、`StoreFulfillmentCard` |
| `Queue Block` | 承接等待处理对象 | 责任、时限、优先级、动作 | `ExceptionTaskCard`、`ExceptionBucketCard` |
| `Rule Block` | 表达限制、策略、恢复预案 | 规则标签、规则内容、适用范围 | `RuleSummaryBlock`、`RecoveryPlaybookCard` |
| `Snapshot Block` | 在当前上下文看对象摘要 | 对象标题、关键状态、补充字段 | `OrderSnapshotCard` |
| `Section Editor` | 非线性区块编辑 | 标题、说明、区块内容 | `DetailSectionEditorCard` |
| `Journey Editor` | 维护步骤型内容 | 步骤名、责任方、时效、说明 | `JourneyStepEditor` |
| `List Editor` | 维护重复清单结构 | 项标题、标签或类型、描述 | `DetailHighlightEditor`、`RuleListEditor` |

## 选择提醒

- `Signal Panel` 用于“判断”
- `Queue Block` 用于“处理”
- `Rule Block` 用于“约束”
- `Snapshot Block` 用于“补充上下文”
- `Section / Journey / List Editor` 用于“维护内容”

一个页面通常只有 `1` 个主模式块；其他模式块应服务于它，而不是平权并列。
