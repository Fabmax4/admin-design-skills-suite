# 示例实现映射

这份文件记录的是"常见实现形态示例"，用于帮助安装后的 Skill 使用者理解这些模式通常会落在什么位置。

安装到其他项目后，不应假设这些实现名称或目录结构真实存在；应把它们重新映射到你自己的列表页、详情抽屉、统一反馈封装和表格配置实现。

> `ant-design-vue 对应` 一列是**内部团队的推荐起点**，基于 `ant-design-vue` 现有组件。如果项目已有更贴合业务的包装，优先复用自己的；这一列只是给出第一次选型时的稳定锚点，不是强制映射。非 `ant-design-vue` 项目使用者可以忽略这一列，仅参考前两列的抽象含义。

| 抽象模式 | 常见实现形态 | ant-design-vue 对应 | 说明 |
| --- | --- | --- | --- |
| `Summary Metrics` | 指标卡组 / 概览卡 | `a-card` + `a-statistic` | 首页或工作台的概览包装 |
| `Status Rail` | 阶段轨道 / 状态流程条 | `a-steps` | 多阶段流程的状态承接 |
| `Signal Panel` | 风险卡 / 信号卡 / 健康卡 | `a-alert` 或 `a-card` + 状态色 | 风险、波动、健康度等信号包装 |
| `Queue Block` | 队列卡 / 异常分桶卡 | `a-card` + `a-tabs` 或 `a-segmented` | 待处理对象分桶与优先级视图 |
| `Scan Table` | 扫读型表格 | `a-table` | 主列表、执行清单、异常队列等表格实现 |
| `Search Bar` | 关键词搜索栏 | `a-input-search` | 列表首行搜索入口 |
| `Filter Panel` | 条件筛选区 | `a-form` + `a-select` / `a-date-picker` / `a-cascader` | 列表筛选条件区 |
| `Pagination Bar` | 分页栏 | `a-pagination`，或用 `a-table` 内置 `pagination` | 列表底部分页器 |
| `Column Configurator` | 列配置浮层 | 自研浮层 + `a-checkbox-group` + `a-popover`（antdv 无现成列配置，需自封装） | 显示列与列顺序配置 |
| `Bulk Action Bar` | 批量动作栏 | 自研粘性栏 + `a-space` + 选中项提示（antdv 无现成批量栏） | 已选数量与批量动作承接 |
| `Rule Block` | 规则摘要块 / 规则说明块 | `a-descriptions` 或 `a-card` + `a-typography` | 规则摘要与适用条件表达 |
| `Snapshot Block` | 对象摘要卡 | `a-descriptions` + `a-card` | 当前对象或当前任务摘要 |
| `Detail Drawer` | 详情抽屉 / 侧边详情板 | `a-drawer` | 保留父列表上下文的详情承接 |
| `Section Editor` | 分区编辑卡 | `a-form` + `a-card` | 详情编辑区块包装 |
| `Journey Editor` | 步骤编辑器 / 流程编辑器 | `a-steps` + `a-form`（复杂场景需自研） | 旅程、流程或步骤的维护 |
| `List Editor` | 列表编辑器 | `a-form-list` 或 `a-table` + 行内编辑 | 卖点、规则、摘要项等清单维护 |

## 使用方式

- 如果你自己的当前实现已经满足抽象契约，优先复用
- 如果只是字段差异，优先通过数据结构和插槽扩展
- 只有当抽象契约都不一致时，才考虑新增组件
- `ant-design-vue` 列标注为"自研"或"需自封装"的模式（如 `Column Configurator`、`Bulk Action Bar`），表明 `antdv` 未提供一等公民支持，团队应建立统一包装层，不在页面里散落写

## 浮层与反馈实现

| 抽象模式 | 常见实现形态 | ant-design-vue 对应 | 说明 |
| --- | --- | --- | --- |
| `Dialog / Modal` | 风险确认弹窗 | `a-modal` 或 `Modal.confirm()` | 承接阻断式确认或高风险操作确认 |
| `Drawer / Side Panel` | 详情抽屉 / 侧边任务板 | `a-drawer` | 保留父页面上下文的临时查看或编辑 |
| `Popover` | 锚点浮层 | `a-popover` | 承接轻动作或小范围设置 |
| `Tooltip` | 单句说明提示 | `a-tooltip` | 解释字段语义或锁定规则 |
| `Message / Toast` | 轻反馈提示 | `message.success / .error / .warning` | 输出短结果、短确认或短告警 |
| `Notification` | 异步反馈通知 | `notification.open / .success` | 输出异步完成、系统推送或复杂反馈 |

## 运行时约束

- 全局反馈的程序化入口应收口到项目内统一反馈封装；不鼓励页面里直接 `import { message }` 或 `import { notification }`，而是通过团队封装（如 `useFeedback`、`$feedback`）统一调用
- 根布局应提供统一反馈上下文（`antdv` 的 `App` 组件或自研 Provider）
- 如果项目里已有运行时检查，优先通过类似 `check:feedback-runtime` 的命令守住边界
