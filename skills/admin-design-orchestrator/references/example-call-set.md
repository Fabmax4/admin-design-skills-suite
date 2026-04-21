# 示例调用集

## 文件定位

这是 `admin-design-orchestrator` 的案例层文件，不是规则层文件。

- 这里的目标是验证总入口 Skill 面对真实请求时会如何分流。
- 样本里允许出现具体行业语境、对象名和任务描述，用来提高案例辨识度。
- 这些案例不应被反向提炼成通用规则层术语；通用规则应继续维护在原则层、模式层、契约层和样式层文件中。

这份文件用于人工验证 `admin-design-orchestrator` 在真实后台任务里的分流效果。

每个样本都包含：

- 用户原始请求
- 任务阶段判断
- 预期起始 Skill
- 预期最小 Skill 链路
- 本轮不该过早进入的层
- 验证重点

## Case 01 从零开始做门店履约工作台

用户原始请求：

`帮我设计一个零售兑换后台的门店履约工作台，要能先看到超时风险和待处理门店。`

- `任务阶段`：模糊目标
- `预期起始 Skill`：`design-principles`
- `预期链路`：
  `design-principles -> admin-design-patterns -> style-guardrails -> admin-component-contracts`
- `本轮不该过早进入的层`：
  `admin-motion`
- `验证重点`：
  是否先定义第一优先动作和页面范式，而不是直接讨论卡片样式

## Case 02 重构兑换单列表结构

用户原始请求：

`现有兑换单列表信息太乱，帮我重构结构，但先别讨论颜色。`

- `任务阶段`：结构设计
- `预期起始 Skill`：`admin-design-patterns`
- `预期链路`：
  `admin-design-patterns -> admin-component-contracts -> admin-design-review`
- `本轮不该过早进入的层`：
  `style-guardrails`、`admin-motion`
- `验证重点`：
  是否先重构模式块和列表契约，而不是被“先别讨论颜色”以外的话题带偏

## Case 03 收紧商品编辑页视觉

用户原始请求：

`商品编辑页结构先不动，把圆角、留白和头部收紧一点，更像标准后台。`

- `任务阶段`：样式收敛
- `预期起始 Skill`：`style-guardrails`
- `预期链路`：
  `style-guardrails -> admin-design-review`
- `本轮不该过早进入的层`：
  `design-principles`、`admin-design-patterns`
- `验证重点`：
  是否能识别“结构已定，只收视觉”的意图

## Case 04 判断补货页要不要上图表

用户原始请求：

`补货页里有门店库存、渠道配额和覆盖天数，帮我判断哪些该做图，哪些留在表格里。`

- `任务阶段`：数据表达
- `预期起始 Skill`：`admin-visualization`
- `预期链路`：
  `admin-visualization -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-motion`
- `验证重点`：
  是否只讨论可视化取舍，不跳去做页面结构重构

## Case 05 给异常处理台补反馈

用户原始请求：

`异常处理台的筛选和恢复动作做完后反馈不明显，帮我补必要的动效和状态提示。`

- `任务阶段`：反馈打磨
- `预期起始 Skill`：`admin-motion`
- `预期链路`：
  `admin-motion -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-visualization`
- `验证重点`：
  是否把重点放在状态反馈，而不是顺手加装饰性动画

## Case 06 验收一套后台方案

用户原始请求：

`这是我们新后台方案，帮我做最终 review，指出最该先修的层。`

- `任务阶段`：最终评审
- `预期起始 Skill`：`admin-design-review`
- `预期链路`：
  `admin-design-review`
- `本轮不该过早进入的层`：
  无，review 可跨层
- `验证重点`：
  是否直接进入总审查，而不是再重新做一次从头设计

## Case 07 抽象一套库存健康组件

用户原始请求：

`我想把库存健康、门店压力、渠道效率统一抽成一类后台组件，先别写页面。`

- `任务阶段`：组件抽象
- `预期起始 Skill`：`admin-design-patterns`
- `预期链路`：
  `admin-design-patterns -> admin-component-contracts -> admin-design-review`
- `本轮不该过早进入的层`：
  `style-guardrails`
- `验证重点`：
  是否先回收到 `Signal Panel` 一类抽象模式，而不是继续堆业务组件名

## Case 08 只给业务目标，没有页面类型

用户原始请求：

`我们要做一个支持商品、服务和兑换运营的后台，先帮我判断应该优先做哪些后台页。`

- `任务阶段`：方向判断
- `预期起始 Skill`：`design-principles`
- `预期链路`：
  `design-principles -> admin-design-patterns`
- `本轮不该过早进入的层`：
  `style-guardrails`、`admin-motion`
- `验证重点`：
  是否先做页面范式规划，而不是直接进入单页设计

## Case 09 已有列表页，只想补图表摘要

用户原始请求：

`订单列表已经稳定了，我只想加一个上方摘要区，帮我判断哪些指标值得图形化。`

- `任务阶段`：数据表达
- `预期起始 Skill`：`admin-visualization`
- `预期链路`：
  `admin-visualization -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-component-contracts`
- `验证重点`：
  是否把问题识别成摘要区可视化，而不是重新定义列表结构

## Case 10 后台看起来像营销页

用户原始请求：

`这个后台现在太像营销页了，帮我拉回标准后台，但不要重做功能。`

- `任务阶段`：样式收敛
- `预期起始 Skill`：`style-guardrails`
- `预期链路`：
  `style-guardrails -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-design-patterns`
- `验证重点`：
  是否优先收视觉边界，而不是去改业务结构

## 混合意图样本

这组样本专门验证总入口 Skill 能否识别“主意图”和“次意图”，避免因为请求里同时出现两个目标，就机械把所有层都跑一遍。

## Case 11 先重构结构，再顺手收视觉

用户原始请求：

`这个门店履约页结构有点乱，也顺手帮我把头部和卡片收紧一点，但先把结构梳清。`

- `任务阶段`：混合意图，主意图是结构设计
- `预期起始 Skill`：`admin-design-patterns`
- `预期链路`：
  `admin-design-patterns -> admin-component-contracts -> style-guardrails -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-motion`
- `验证重点`：
  是否先处理结构，再把视觉收敛作为第二步，而不是一开始就讨论样式

## Case 12 先做后台规划，再决定哪些要上图

用户原始请求：

`先帮我规划这套零售兑换后台应该有哪些核心页面，再顺带判断哪些页面值得做图表摘要。`

- `任务阶段`：混合意图，主意图是方向判断
- `预期起始 Skill`：`design-principles`
- `预期链路`：
  `design-principles -> admin-design-patterns -> admin-visualization -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-motion`
- `验证重点`：
  是否先做页面范式规划，再延后处理图表取舍

## Case 13 先 review，再给下一轮设计链路

用户原始请求：

`先 review 这个后台方案哪里偏了，再告诉我下一轮应该按什么 Skill 顺序继续推进。`

- `任务阶段`：混合意图，主意图是最终评审
- `预期起始 Skill`：`admin-design-review`
- `预期链路`：
  `admin-design-review`
- `本轮不该过早进入的层`：
  无，review 可跨层
- `验证重点`：
  是否先进入总审查，再把后续 Skill 链路作为 review 结论的一部分输出，而不是重新跑完整设计链路

## Case 14 先抽组件，再补图表表达建议

用户原始请求：

`先把渠道效率和门店压力抽成一类可复用组件，再帮我判断这个组件在哪些页面里适合配图表摘要。`

- `任务阶段`：混合意图，主意图是组件抽象
- `预期起始 Skill`：`admin-design-patterns`
- `预期链路`：
  `admin-design-patterns -> admin-component-contracts -> admin-visualization -> admin-design-review`
- `本轮不该过早进入的层`：
  `style-guardrails`
- `验证重点`：
  是否先回收抽象组件，再处理它在页面里的表达方式

## Case 15 结构已定，先收视觉，再补必要反馈

用户原始请求：

`列表页结构先别动，先把视觉压回标准后台，再补一点必要的切换反馈。`

- `任务阶段`：混合意图，主意图是样式收敛
- `预期起始 Skill`：`style-guardrails`
- `预期链路`：
  `style-guardrails -> admin-motion -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-design-patterns`
- `验证重点`：
  是否先收视觉，再把动效控制在反馈层，而不是两者一起发散

## Case 16 先判断要不要图，再决定是否值得补动效

用户原始请求：

`这个运营概览页我不确定该不该上图，如果值得上图，再看需不需要做一点趋势切换反馈。`

- `任务阶段`：混合意图，主意图是数据表达
- `预期起始 Skill`：`admin-visualization`
- `预期链路`：
  `admin-visualization -> admin-motion -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-component-contracts`
- `验证重点`：
  是否先判断图表是否必要，再延后动效决策

## Case 17 先重构详情页信息层级，再统一规则组件

用户原始请求：

`商品详情页信息层级不太对，先把详情结构理顺，再把规则区统一成一套可复用组件。`

- `任务阶段`：混合意图，主意图是结构设计
- `预期起始 Skill`：`admin-design-patterns`
- `预期链路`：
  `admin-design-patterns -> admin-component-contracts -> admin-design-review`
- `本轮不该过早进入的层`：
  `style-guardrails`
- `验证重点`：
  是否先处理详情页结构，再处理规则组件抽象，不把它误判为纯组件任务

## Case 18 先 review 可视化，再决定是否回退到结构层

用户原始请求：

`先 review 这个数据密集页的图表有没有做过头，如果问题不只是图表，再告诉我是不是要回退去改结构。`

- `任务阶段`：混合意图，主意图是最终评审
- `预期起始 Skill`：`admin-design-review`
- `预期链路`：
  `admin-design-review`
- `本轮不该过早进入的层`：
  无，review 可跨层
- `验证重点`：
  是否先做总审查，再在结论里判断是否需要回退到结构层，而不是先假设一定要改结构

## 使用方式

- 人工验证时，逐条把“用户原始请求”喂给总入口 Skill
- 对比实际输出和这里的“预期起始 Skill / 预期链路”
- 如果偏离，先看是入口分流规则错了，还是示例本身定义不清

## 冲突意图样本

这组样本用于验证总入口 Skill 在“互相打架的要求”里，能否先识别冲突，再决定是否继续分流，而不是把冲突两边都当成正常任务往下跑。

## Case 19 结构先别动，但统一规则组件

用户原始请求：

`商品详情页结构先别动，但顺手把规则区重构成一套统一组件。`

- `任务阶段`：冲突意图，硬约束是结构冻结
- `预期起始 Skill`：`admin-component-contracts`
- `预期链路`：
  `admin-component-contracts -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-design-patterns`
- `验证重点`：
  是否在不改结构的边界内判断组件统一是否可行，而不是顺手把结构也改了

## Case 20 不想上图，但想做图表摘要区

用户原始请求：

`我其实不想让页面上图，但又想做一个图表摘要区，你帮我判断有没有不靠图表的替代方案。`

- `任务阶段`：冲突意图，冲突发生在数据表达层
- `预期起始 Skill`：`admin-visualization`
- `预期链路`：
  `admin-visualization -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-motion`
- `验证重点`：
  是否先识别“不要上图”是硬约束，再给出指标卡或表格信号替代，而不是硬做图表

## Case 21 保持营销感，但拉回标准后台

用户原始请求：

`这个页面先保持现在的营销感，但又想拉回标准后台一点，你帮我判断哪些能保留，哪些必须收掉。`

- `任务阶段`：冲突意图，冲突发生在样式层
- `预期起始 Skill`：`style-guardrails`
- `预期链路`：
  `style-guardrails -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-design-patterns`
- `验证重点`：
  是否先划出后台不可退让的视觉边界，而不是试图同时完全满足两种风格

## Case 22 先别正式 review，但告诉我哪里偏了

用户原始请求：

`先别做正式 review，但你直接告诉我这套后台哪里偏了、优先修什么。`

- `任务阶段`：冲突意图，实际主意图仍是最终评审
- `预期起始 Skill`：`admin-design-review`
- `预期链路`：
  `admin-design-review`
- `本轮不该过早进入的层`：
  无，review 可跨层
- `验证重点`：
  是否识别“告诉我哪里偏了、优先修什么”本质上就是 review，而不是被“先别正式 review”误导

## Case 23 先不要动结构，但当场出新信息架构

用户原始请求：

`列表页先不要动结构，但你帮我当场出一版新的信息架构方向。`

- `任务阶段`：冲突意图，硬约束与结构诉求互相冲突
- `预期起始 Skill`：`admin-design-review`
- `预期链路`：
  `admin-design-review`
- `本轮不该过早进入的层`：
  `admin-design-patterns`
- `验证重点`：
  是否先指出两项要求不能同时完成，再把“信息架构方向”作为后续建议，而不是直接开始重构

## Case 24 保留现有动效，但整体更安静

用户原始请求：

`现在这些动效先都保留，但整体要更安静一些，别影响操作。`

- `任务阶段`：冲突意图，冲突发生在反馈层
- `预期起始 Skill`：`admin-motion`
- `预期链路`：
  `admin-motion -> admin-design-review`
- `本轮不该过早进入的层`：
  `style-guardrails`
- `验证重点`：
  是否先区分“必须保留的状态反馈”和“可以降级的装饰性动效”，而不是两边一起保留

## 反例样本

这组样本用于锚定 `routing-validation.md` 里 `Fail` 判定的典型形态。每个案例都给出容易误导入口的关键词，并标注 `Fail 路径 / Fail 原因 / 正确路径`。模型在 review 自检时应能识别这些反例。

## 反例 25 “美化后台” 触发词误导

用户原始请求：

`帮我美化这个后台。`

- `任务阶段`：反例 - 触发词误导
- `Fail 路径`：直接进入 `style-guardrails`
- `Fail 原因`：
  “美化”是**结果词**不是**意图词**；没有澄清用户要的是“更干净 / 更专业 / 更轻量 / 更现代 / 更贴近某个参考”哪一种，就直接收视觉属于假修复
- `正确起始 Skill`：`design-principles`
- `正确链路`：
  `design-principles -> admin-design-review -> 按澄清结论再决定是否进入 style-guardrails`
- `验证重点`：
  是否先启发澄清，而不是被“美化”字面带偏

## 反例 26 “动画不对” 问题层错位

用户原始请求：

`这个页面的动画我觉得不对。`

- `任务阶段`：反例 - 问题层错位
- `Fail 路径`：直接进入 `admin-motion`
- `Fail 原因`：
  用户表达的是**结果不满**，底层更可能是信息层级或状态反馈问题，动画只是表层症状；若直接优化动效，用户下一轮会再次表达“还是不对”
- `正确起始 Skill`：`admin-design-review`
- `正确链路`：
  `admin-design-review -> 若结论是反馈层问题再进入 admin-motion；若是信息层级问题回到 admin-design-patterns`
- `验证重点`：
  是否先 review 定位问题层，而不是被“动画”字面直接路由到 motion

## 反例 27 “按 Figma 重做一遍” 跳过来源澄清

用户原始请求：

`按这个 Figma 重做一遍。`

- `任务阶段`：反例 - 来源未澄清
- `Fail 路径`：跳过澄清直接进入 `admin-design-patterns`
- `Fail 原因`：
  Figma 是否已经过原则层评审未知；如果 Figma 本身是营销页化或业务包装层，照搬会把坏模式固化进后台
- `正确起始 Skill`：`design-principles`
- `正确链路`：
  `design-principles（确认 Figma 来源与评审状态）-> 若已通过评审再进 admin-design-patterns；若未通过先 admin-design-review`
- `验证重点`：
  是否先确认 Figma 是"已评审结论"还是"未评审草图"，而不是无条件实现

## 反例 28 “先别改结构，重新设计一下” 内部矛盾

用户原始请求：

`列表页先别改结构，但重新设计一下。`

- `任务阶段`：反例 - 冲突意图未识别
- `Fail 路径`：把冲突拆成两个意图，`admin-design-patterns` 和 `admin-design-review` 都跑一遍
- `Fail 原因`：
  “重新设计”在后台语境下几乎必然涉及结构；两个要求相互排斥，必须先指出不能同时满足，再让用户选一边
- `正确起始 Skill`：`admin-design-review`
- `正确链路`：
  `admin-design-review（明确冲突并给出取舍建议）-> 等用户确认主意图后再进入对应 Skill`
- `验证重点`：
  是否识别两个诉求互斥，而不是机械拼链路

## 反例 29 “按钮颜色不对，页面重做一下” 主次意图错位

用户原始请求：

`这里的按钮颜色不对，把整个页面重做了吧。`

- `任务阶段`：反例 - 主次意图错位
- `Fail 路径`：把“按钮颜色”当主意图进入 `style-guardrails`
- `Fail 原因`：
  真实主意图是“整个页面重做”，按钮颜色只是**情绪触发词**；停在 style-guardrails 会漏掉主意图，用户下一轮会撤回整个方案
- `正确起始 Skill`：`design-principles`
- `正确链路`：
  `design-principles（判断是否真需要重做）-> admin-design-patterns`；若用户澄清后表示“只是按钮颜色”，再退回 `style-guardrails`
- `验证重点`：
  是否识别出情绪触发词背后的真实意图，而不是照字面分流

## 横向行业样本

前面 24 条正例都落在零售 / 电商 / 运营语境。这组样本用于验证入口 Skill 在**非零售语境**下依然能做正确分流，避免模型因为训练样本分布而把"订阅计费""ETL 任务"这类陌生场景硬套回电商模板。

## Case 30 订阅计费对账后台从零设计

用户原始请求：

`帮我设计一个订阅计费对账后台，需要看每日 / 每月应收、对账异常和人工调整。`

- `任务阶段`：模糊目标（多对象、异常驱动）
- `预期起始 Skill`：`design-principles`
- `预期链路`：
  `design-principles -> admin-design-patterns -> admin-component-contracts -> admin-visualization -> admin-design-review`
- `本轮不该过早进入的层`：
  `style-guardrails`、`admin-motion`
- `验证重点`：
  是否先判断“对账”的主任务是**处理异常**还是**查看金额**，而不是照着"计费"做成指标大盘；可视化取舍应放在结构确定之后

## Case 31 ETL 任务监控台从零设计

用户原始请求：

`我们要做一个 ETL 任务监控台，需要看任务链状态、失败堆栈和重跑入口。`

- `任务阶段`：模糊目标（混合任务类型）
- `预期起始 Skill`：`design-principles`
- `预期链路`：
  `design-principles -> admin-design-patterns -> admin-component-contracts -> admin-design-review`
- `本轮不该过早进入的层`：
  `admin-visualization`（任务状态是状态表达问题，不是可视化问题）、`style-guardrails`、`admin-motion`
- `验证重点`：
  是否识别“监控”本质是异常驱动而不是图表展示；任务链 DAG 是否考虑过"用 `Scan Table` + `Status Rail` 承接"而不是默认做成关系图
