# Admin Design Orchestrator Round 2 Validation

> 文件定位：这是评测层报告，记录案例层样本的分流结果，不是规则层规范。

- 日期：`2026-04-20`
- 样本源：`references/routing-sample-set.yaml`
- 方法：基于当前路由规则做第二轮人工核验，重点验证“混合意图”场景下的主意图优先与次意图延后。
- 结果汇总：
  - `Pass`：`18`
  - `Warning`：`0`
  - `Fail`：`0`

## 逐例结果

### case-01 门店履约工作台从零设计

- `Prompt`：帮我设计一个零售兑换后台的门店履约工作台，要能先看到超时风险和待处理门店。
- `Expected Stage`：模糊目标
- `Expected Start Skill`：design-principles
- `Expected Chain`：design-principles -> admin-design-patterns -> style-guardrails -> admin-component-contracts
- `Avoid Layers`：admin-motion
- `Validation Focus`：先明确第一优先动作和页面范式，不直接跳到视觉细节。
- `Actual Start Skill`：design-principles
- `Actual Chain`：design-principles -> admin-design-patterns -> style-guardrails -> admin-component-contracts
- `Verdict`：Pass
- `Notes`：仍然保持上层优先，没有因为页面最终会有交互反馈就提前进入动效层。

### case-02 兑换单列表结构重构

- `Prompt`：现有兑换单列表信息太乱，帮我重构结构，但先别讨论颜色。
- `Expected Stage`：结构设计
- `Expected Start Skill`：admin-design-patterns
- `Expected Chain`：admin-design-patterns -> admin-component-contracts -> admin-design-review
- `Avoid Layers`：style-guardrails, admin-motion
- `Validation Focus`：优先重构模式块和契约，不被视觉话题带偏。
- `Actual Start Skill`：admin-design-patterns
- `Actual Chain`：admin-design-patterns -> admin-component-contracts -> admin-design-review
- `Verdict`：Pass
- `Notes`：能正确识别“先别讨论颜色”是约束，不会被顺手带入样式层。

### case-03 商品编辑页视觉收紧

- `Prompt`：商品编辑页结构先不动，把圆角、留白和头部收紧一点，更像标准后台。
- `Expected Stage`：样式收敛
- `Expected Start Skill`：style-guardrails
- `Expected Chain`：style-guardrails -> admin-design-review
- `Avoid Layers`：design-principles, admin-design-patterns
- `Validation Focus`：识别结构已定，只需要视觉约束。
- `Actual Start Skill`：style-guardrails
- `Actual Chain`：style-guardrails -> admin-design-review
- `Verdict`：Pass
- `Notes`：结构冻结条件被正确识别，没有回退去做范式重判。

### case-04 补货页图表取舍

- `Prompt`：补货页里有门店库存、渠道配额和覆盖天数，帮我判断哪些该做图，哪些留在表格里。
- `Expected Stage`：数据表达
- `Expected Start Skill`：admin-visualization
- `Expected Chain`：admin-visualization -> admin-design-review
- `Avoid Layers`：admin-motion
- `Validation Focus`：只判断图表与表格信号，不重做页面结构。
- `Actual Start Skill`：admin-visualization
- `Actual Chain`：admin-visualization -> admin-design-review
- `Verdict`：Pass
- `Notes`：聚焦在数据表达取舍，没有因为页面本身是补货台就回退到结构层。

### case-05 异常处理台反馈补强

- `Prompt`：异常处理台的筛选和恢复动作做完后反馈不明显，帮我补必要的动效和状态提示。
- `Expected Stage`：反馈打磨
- `Expected Start Skill`：admin-motion
- `Expected Chain`：admin-motion -> admin-design-review
- `Avoid Layers`：admin-visualization
- `Validation Focus`：强调状态反馈，不添加装饰性动画。
- `Actual Start Skill`：admin-motion
- `Actual Chain`：admin-motion -> admin-design-review
- `Verdict`：Pass
- `Notes`：仍然把问题限定在反馈层，没有把“筛选”误判为需要补图表表达。

### case-06 后台方案最终验收

- `Prompt`：这是我们新后台方案，帮我做最终 review，指出最该先修的层。
- `Expected Stage`：最终评审
- `Expected Start Skill`：admin-design-review
- `Expected Chain`：admin-design-review
- `Avoid Layers`：无
- `Validation Focus`：直接进入总审查，不重新走完整设计链路。
- `Actual Start Skill`：admin-design-review
- `Actual Chain`：admin-design-review
- `Verdict`：Pass
- `Notes`：验收型请求仍然保持单点收口，不回退到设计层重复推演。

### case-07 库存健康组件抽象

- `Prompt`：我想把库存健康、门店压力、渠道效率统一抽成一类后台组件，先别写页面。
- `Expected Stage`：组件抽象
- `Expected Start Skill`：admin-design-patterns
- `Expected Chain`：admin-design-patterns -> admin-component-contracts -> admin-design-review
- `Avoid Layers`：style-guardrails
- `Validation Focus`：先回收到抽象模式，而不是继续扩业务组件名。
- `Actual Start Skill`：admin-design-patterns
- `Actual Chain`：admin-design-patterns -> admin-component-contracts -> admin-design-review
- `Verdict`：Pass
- `Notes`：组件 / 规范抽象路径现在已被显式纳入规则，不再是隐含路由。

### case-08 只给业务目标的后台规划

- `Prompt`：我们要做一个支持商品、服务和兑换运营的后台，先帮我判断应该优先做哪些后台页。
- `Expected Stage`：方向判断
- `Expected Start Skill`：design-principles
- `Expected Chain`：design-principles -> admin-design-patterns
- `Avoid Layers`：style-guardrails, admin-motion
- `Validation Focus`：先做页面范式规划，而不是跳进单页设计。
- `Actual Start Skill`：design-principles
- `Actual Chain`：design-principles -> admin-design-patterns
- `Verdict`：Pass
- `Notes`：后台规划仍然稳定落在上层判断，没有被误拉到页面实现层。

### case-09 订单列表上方摘要区

- `Prompt`：订单列表已经稳定了，我只想加一个上方摘要区，帮我判断哪些指标值得图形化。
- `Expected Stage`：数据表达
- `Expected Start Skill`：admin-visualization
- `Expected Chain`：admin-visualization -> admin-design-review
- `Avoid Layers`：admin-component-contracts
- `Validation Focus`：识别为摘要区表达问题，而不是列表结构问题。
- `Actual Start Skill`：admin-visualization
- `Actual Chain`：admin-visualization -> admin-design-review
- `Verdict`：Pass
- `Notes`：已稳定的列表结构被视为前提，问题只在表达层展开。

### case-10 后台被做成营销页

- `Prompt`：这个后台现在太像营销页了，帮我拉回标准后台，但不要重做功能。
- `Expected Stage`：样式收敛
- `Expected Start Skill`：style-guardrails
- `Expected Chain`：style-guardrails -> admin-design-review
- `Avoid Layers`：admin-design-patterns
- `Validation Focus`：优先收视觉边界，不轻易改业务结构。
- `Actual Start Skill`：style-guardrails
- `Actual Chain`：style-guardrails -> admin-design-review
- `Verdict`：Pass
- `Notes`：能保持“功能不动”的边界，只处理视觉失控问题。

### case-11 先重构结构，再顺手收视觉

- `Prompt`：这个门店履约页结构有点乱，也顺手帮我把头部和卡片收紧一点，但先把结构梳清。
- `Expected Stage`：混合意图，主意图是结构设计
- `Expected Start Skill`：admin-design-patterns
- `Expected Chain`：admin-design-patterns -> admin-component-contracts -> style-guardrails -> admin-design-review
- `Avoid Layers`：admin-motion
- `Validation Focus`：先处理结构，再把视觉收敛作为第二步。
- `Actual Start Skill`：admin-design-patterns
- `Actual Chain`：admin-design-patterns -> admin-component-contracts -> style-guardrails -> admin-design-review
- `Verdict`：Pass
- `Notes`：主意图和次意图被正确拆开，视觉收紧被延后到结构稳定之后。

### case-12 先做后台规划，再决定哪些要上图

- `Prompt`：先帮我规划这套零售兑换后台应该有哪些核心页面，再顺带判断哪些页面值得做图表摘要。
- `Expected Stage`：混合意图，主意图是方向判断
- `Expected Start Skill`：design-principles
- `Expected Chain`：design-principles -> admin-design-patterns -> admin-visualization -> admin-design-review
- `Avoid Layers`：admin-motion
- `Validation Focus`：先做页面范式规划，再延后处理图表取舍。
- `Actual Start Skill`：design-principles
- `Actual Chain`：design-principles -> admin-design-patterns -> admin-visualization -> admin-design-review
- `Verdict`：Pass
- `Notes`：规划任务保持在上层，图表讨论被推迟到页面范式有初步结论之后。

### case-13 先 review，再给下一轮设计链路

- `Prompt`：先 review 这个后台方案哪里偏了，再告诉我下一轮应该按什么 Skill 顺序继续推进。
- `Expected Stage`：混合意图，主意图是最终评审
- `Expected Start Skill`：admin-design-review
- `Expected Chain`：admin-design-review
- `Avoid Layers`：无
- `Validation Focus`：先进入总审查，再把后续 Skill 链路作为 review 结论输出。
- `Actual Start Skill`：admin-design-review
- `Actual Chain`：admin-design-review
- `Verdict`：Pass
- `Notes`：正确识别为“review + 下一步建议”，没有因为用户要下一轮链路就提前重新跑设计流程。

### case-14 先抽组件，再补图表表达建议

- `Prompt`：先把渠道效率和门店压力抽成一类可复用组件，再帮我判断这个组件在哪些页面里适合配图表摘要。
- `Expected Stage`：混合意图，主意图是组件抽象
- `Expected Start Skill`：admin-design-patterns
- `Expected Chain`：admin-design-patterns -> admin-component-contracts -> admin-visualization -> admin-design-review
- `Avoid Layers`：style-guardrails
- `Validation Focus`：先回收抽象组件，再处理它在页面里的表达方式。
- `Actual Start Skill`：admin-design-patterns
- `Actual Chain`：admin-design-patterns -> admin-component-contracts -> admin-visualization -> admin-design-review
- `Verdict`：Pass
- `Notes`：组件抽象保持为主线，图表建议作为次任务延后处理，没有被颠倒顺序。

### case-15 结构已定，先收视觉，再补必要反馈

- `Prompt`：列表页结构先别动，先把视觉压回标准后台，再补一点必要的切换反馈。
- `Expected Stage`：混合意图，主意图是样式收敛
- `Expected Start Skill`：style-guardrails
- `Expected Chain`：style-guardrails -> admin-motion -> admin-design-review
- `Avoid Layers`：admin-design-patterns
- `Validation Focus`：先收视觉，再把动效控制在反馈层。
- `Actual Start Skill`：style-guardrails
- `Actual Chain`：style-guardrails -> admin-motion -> admin-design-review
- `Verdict`：Pass
- `Notes`：先处理视觉边界，再补反馈层，符合“主意图优先、次意图延后”。

### case-16 先判断要不要图，再决定是否值得补动效

- `Prompt`：这个运营概览页我不确定该不该上图，如果值得上图，再看需不需要做一点趋势切换反馈。
- `Expected Stage`：混合意图，主意图是数据表达
- `Expected Start Skill`：admin-visualization
- `Expected Chain`：admin-visualization -> admin-motion -> admin-design-review
- `Avoid Layers`：admin-component-contracts
- `Validation Focus`：先判断图表是否必要，再延后动效决策。
- `Actual Start Skill`：admin-visualization
- `Actual Chain`：admin-visualization -> admin-motion -> admin-design-review
- `Verdict`：Pass
- `Notes`：先确认图表是否必要，只有表达层成立后才进入反馈层。

### case-17 先重构详情页信息层级，再统一规则组件

- `Prompt`：商品详情页信息层级不太对，先把详情结构理顺，再把规则区统一成一套可复用组件。
- `Expected Stage`：混合意图，主意图是结构设计
- `Expected Start Skill`：admin-design-patterns
- `Expected Chain`：admin-design-patterns -> admin-component-contracts -> admin-design-review
- `Avoid Layers`：style-guardrails
- `Validation Focus`：先处理详情页结构，再处理规则组件抽象。
- `Actual Start Skill`：admin-design-patterns
- `Actual Chain`：admin-design-patterns -> admin-component-contracts -> admin-design-review
- `Verdict`：Pass
- `Notes`：详情层级调整被识别为主任务，规则组件统一作为结构后的抽象动作处理。

### case-18 先 review 可视化，再决定是否回退到结构层

- `Prompt`：先 review 这个数据密集页的图表有没有做过头，如果问题不只是图表，再告诉我是不是要回退去改结构。
- `Expected Stage`：混合意图，主意图是最终评审
- `Expected Start Skill`：admin-design-review
- `Expected Chain`：admin-design-review
- `Avoid Layers`：无
- `Validation Focus`：先做总审查，再判断是否需要回退到结构层。
- `Actual Start Skill`：admin-design-review
- `Actual Chain`：admin-design-review
- `Verdict`：Pass
- `Notes`：总审查器可以先判断问题层级，再在结论里建议是否回退到结构层，无需提前改链路。

## 总结

- `主要通过项`：
  新增的 8 个混合意图样本全部通过，说明当前总入口 Skill 已能稳定区分主意图和次意图，并按上层优先顺序延后处理次任务。
- `主要 warning`：
  本轮没有新增 warning；当前规则在“先 review 再给下一步”“先规划再谈图表”“先收视觉再补反馈”这三类容易混线的任务上表现稳定。
- `需要调整的规则文件`：
  本轮已补 `entry-routing.md` 的混合意图总规则，以及 `workflow-recipes.md` 的 4 条混合链路；暂无新增调整项。
- `下一轮验证建议`：
  继续补“冲突意图”样本，例如“既说先别动结构，又要求顺手重构组件”“既要最终验收，又要求当场出新方案”，验证总入口 Skill 在矛盾约束下是否仍能正确收口。
