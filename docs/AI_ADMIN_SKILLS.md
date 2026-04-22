# AI 管理后台设计 Skills 总纲

这份文档位于 Skills 发行仓库中，因此只保留与规范、分层 Skill 和分流验证直接相关的内容。

这份文档现在改成总纲。目标不是只写一篇“AI 怎么设计后台”的总说明，而是建立一套像 `Ant Design` 一样可分层阅读、可逐步调用、可持续扩展的规范体系。

不同的是：

- `Ant Design` 主要服务于设计师和前端工程师
- 这套规范主要服务于 AI 设计代理

因此它既要能启发 AI，也要能约束 AI。

补充原则：

- 规则层尽量保持行业中立，不把某个行业的对象名、岗位名、流程名直接固化成通用规则。
- 行业专有语境优先放在案例层、提示层、评测层和实现层。

## 规则层与案例层的边界

- 规则层：
  负责定义可跨行业复用的原则、模式、契约、样式、表达和审查规则。
- 案例层：
  负责提供真实请求样本、prompt 示例、路由样本、评测 run 和验证报告。
- 评测层：
  负责验证案例层样本是否被正确分流、页面是否达标，不直接替代规则层。

因此：

- 可以在案例层保留零售、门店、履约、活动等具体业务语境。
- 不应把这些行业名词直接抬升成规则层的通用术语。

## 我们要做的，不是一组零散技巧

最终目标是形成一套渐进式 Skills，让 AI 在设计管理后台时，不是直接输出页面，而是按固定顺序调用不同层级的规范：

1. 先用原则收敛方向
2. 再用模式确定结构
3. 再用组件契约落具体块
4. 再用样式收敛边界
5. 再决定哪些信息需要可视化
6. 再决定是否需要动效和如何反馈
7. 最后再进入统一审查和修复排序

## 规范地图

这一套规范已经拆成 7 个部分：

- [快速开始](quick-start.md)
  给用户直接使用的 `$skill-name` 速查表
- [设计原则](design-principles.md)
  决定 AI 设计后台时的价值排序和判断标准
- [样式规范](style-spec.md)
  决定颜色、圆角、密度、层级、版式等硬边界
- [设计模式](design-patterns.md)
  决定页面范式和模式块
- [组件规范](component-spec.md)
  决定抽象组件契约和新增组件的标准
- [可视化规范](visualization-spec.md)
  决定数据表达方式
- [动效规范](motion-spec.md)
  决定状态反馈和转场节奏
- [AI 设计流程](ai-design-workflow.md)
  决定 AI 应按什么顺序调用这些规范

第一批已落地 Skill：

- [admin-design-patterns](../skills/admin-design-patterns/SKILL.md)
- [admin-component-contracts](../skills/admin-component-contracts/SKILL.md)

第二批已落地 Skill：

- [design-principles](../skills/design-principles/SKILL.md)
- [style-guardrails](../skills/style-guardrails/SKILL.md)

第三批已落地 Skill：

- [admin-visualization](../skills/admin-visualization/SKILL.md)
- [admin-motion](../skills/admin-motion/SKILL.md)

第四批已落地 Skill：

- [admin-design-review](../skills/admin-design-review/SKILL.md)

首选总入口 Skill：

- [admin-design-orchestrator](../skills/admin-design-orchestrator/SKILL.md)

## 用户主动调用方式

用户在 Codex 中可以直接使用真实的 `$skill-name` 形式主动调用 Skill，而不是只等总入口自动匹配。

如果你只想快速开始，先看 [quick-start.md](quick-start.md)。

规则：

- `$skill-name` 使用 Skill 的英文名
- `$skill-name` 后面的任务描述可以直接用中文或英文
- 不确定时先用 `$admin-design-orchestrator`
- 输入信息不足时，总入口先拦截澄清

最短可用格式：

- `$admin-design-orchestrator 设计后台页`
- `$admin-design-orchestrator design admin page`
- `$admin-design-review 审查页面`
- `$admin-design-review review page`

按任务直达：

- `$design-principles`：明确需求 / clarify brief
- `$admin-design-patterns`：收页面结构 / shape page structure
- `$style-guardrails`：收视觉 / tighten visual guardrails
- `$admin-component-contracts`：抽组件契约 / define component contracts
- `$admin-visualization`：判断是否上图 / decide visualization
- `$admin-motion`：补必要反馈 / refine motion feedback
- `$admin-design-review`：最终审查 / review design

当前封装状态：

- 每个 Skill 已生成 `agents/openai.yaml`
- 每个 Skill 已补 `icon_small / icon_large / brand_color`
- 总入口 Skill 已补稳定输入契约：[input-contract.md](../skills/admin-design-orchestrator/references/input-contract.md)
- 总入口 Skill 已补示例调用集与路由验收规则，开始具备验证面
- 首轮验证结果见 [routing-round-1-report.md](../skills/admin-design-orchestrator/references/routing-round-1-report.md)
- 第二轮样本已扩到 `18` 个，重点覆盖“混合意图”分流，验证结果见 [routing-round-2-report.md](../skills/admin-design-orchestrator/references/routing-round-2-report.md)
- 第三轮样本已扩到 `24` 个，重点覆盖“冲突意图”分流，验证结果见 [routing-round-3-report.md](../skills/admin-design-orchestrator/references/routing-round-3-report.md)

本轮内容质量里程碑：

- **review 输出带严重度**：`admin-design-review` 的 [review-checklist.md](../skills/admin-design-review/references/review-checklist.md) 每条 check 已标注 S0–S3，可直接驱动修复优先级排序
- **面向内部团队的 ant-design-vue 锚定**：`style-guardrails` 的 [tokens.md](../skills/style-guardrails/references/tokens.md) 补齐间距 / 字号 / 行高档位（对齐 `ant-design` 默认值）；`admin-component-contracts` 的 [implementation-map.md](../skills/admin-component-contracts/references/implementation-map.md) 新增 `ant-design-vue 对应` 列，作为起点而非强制映射
- **orchestrator 覆盖面扩到 31 条**：[example-call-set.md](../skills/admin-design-orchestrator/references/example-call-set.md) 和 [routing-sample-set.yaml](../skills/admin-design-orchestrator/references/routing-sample-set.yaml) 同步新增 5 条反例（触发词误导、问题层级错配、来源未澄清、内部矛盾、主从意图混淆）+ 2 条横向行业 case（订阅计费对账、ETL 任务监控）
- **硬规则更紧**：`admin-motion` 把“转场不超过 `200ms`”和“重要状态不能只靠动效承载信息”纳入硬规则；`admin-component-contracts` 加“命名前先回答 5 问”的默认做法；`design-principles` 在 5 问入口后追加 [diagnostic-questions.md](../skills/design-principles/references/diagnostic-questions.md) 扩展诊断题

## 渐进式 Skills 的含义

这里的“渐进式”不是指功能越来越多，而是指 AI 的设计过程必须逐层推进：

### 第一层：启发层

对应 `设计原则`

- 解决“这个页面究竟应该先服务什么”
- 防止 AI 一开始就陷入视觉或组件细节
- 输入信息不足时先澄清；如果用户在澄清后仍无法准确描述，再用启发式问题获取线索

### 第二层：结构层

对应 `设计模式`

- 解决“页面应该由哪些稳定模式构成”
- 防止 AI 直接按业务名发明组件

### 第三层：契约层

对应 `组件规范`

- 解决“每种模式块的最小输入和状态是什么”
- 防止 AI 输出只有名字没有契约的组件

### 第四层：约束层

对应 `样式规范`

- 解决“这个页面不能长成什么样”
- 防止 AI 把后台做成营销页或展示页

### 第五层：表达层

对应 `可视化规范` 与 `动效规范`

- 解决“数据和变化该如何被表达”
- 防止 AI 过度图形化或过度动效化

### 第六层：自检层

对应 `admin-design-review`

- 解决“AI 如何回看自己的输出是否偏题”
- 统一归因问题并给出修复顺序

## 案例层如何服务这套总纲

当前仓库保留的案例层材料，不再被视为最终抽象层，而是这套总纲下的“已验证参考”。

这意味着后续继续扩展时，应优先补规范、Skill 和验证样本，而不是继续堆某个具体业务项目的页面实现。

## 当前项目的下一步重点

后续优先级改成：

1. 先补齐规范体系，而不是继续扩场景
2. 为每个抽象模式补最小输入契约
3. 为每层规范准备可调用的 Skill 形态
4. 再决定哪些规范需要代码资产，哪些只需要文档约束

## 已经开始落地的 Skill

当前先把最核心的两层做成可调用 Skill：

- `admin-design-orchestrator`
  作为总入口，先判断输入是否充分；信息不足时先拦截澄清，信息足够后再决定从哪一层开始、调用哪些 Skill、何时进入 review
- `admin-design-patterns`
  负责页面范式判断、模式块选择、结构回收
- `admin-component-contracts`
  负责抽象组件契约、新组件判定、实现映射
- `design-principles`
  负责在输入信息不足时先收敛价值排序、第一优先动作和方向风险
- `style-guardrails`
  负责在页面结构明确后，把视觉边界和后台骨架收回来
- `admin-visualization`
  负责判断数据该如何表达，以及何时根本不该上图
- `admin-motion`
  负责把后台动效压回状态反馈和必要转场
- `admin-design-review`
  负责统一审查前面 6 层输出，并给出归因和修复顺序

到这里，首版渐进式 Skills 已经形成闭环，`admin-design-orchestrator` 负责把这条链真正调度起来。
