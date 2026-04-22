# AI 管理后台渐进式 Skills 流程

这份文档定义 AI 应如何逐层调用规范，形成一套渐进式 Skills。

## 总体顺序

1. `设计原则`
2. `样式规范`
3. `设计模式`
4. `组件规范`
5. `可视化规范`
6. `动效规范`
7. `自检与回收`

首选总入口 Skill：

- `admin-design-orchestrator`

## Codex 原生快捷入口

在 Codex 中，用户可以直接用 `$skill-name` 主动点名这套 Skills。

规则：

- `$skill-name` 使用英文 Skill 名
- 后面的任务描述可以中文或英文
- 不知道从哪层开始时，默认先用 `$admin-design-orchestrator`
- 如果输入信息不足，总入口先澄清，再继续下游分流

最短可用格式：

- `$admin-design-orchestrator 设计后台页`
- `$admin-design-orchestrator design admin page`
- `$admin-design-patterns 收页面结构`
- `$admin-design-review review page`

这套写法比长提示词更适合作为日常发起入口。

## 为什么要渐进式

因为 AI 最容易犯的错误，不是不会画组件，而是：

- 太早进入组件层
- 太早给场景命名
- 太晚处理约束
- 太少做自检

渐进式 Skills 的作用，就是让 AI 先在高层做对，再往下落细节。

## 分层调用建议

### 用户输入信息不足

先用：

- `设计原则`
- `设计模式`
- 已落地 Skill：
  `design-principles` + `admin-design-patterns`

目标：

- 判断页面范式
- 找到第一优先动作
- 选出主模式块
- 如果当前输入仍不足，先由总入口拦截澄清

### 用户已经给了明确页面

再用：

- `样式规范`
- `组件规范`
- 已落地 Skill：
  `style-guardrails` + `admin-component-contracts`

目标：

- 把结构落成稳定后台骨架
- 选择抽象组件契约，而不是发明新名词

### 页面是数据密集型

补充：

- `可视化规范`
- 已落地 Skill：
  `admin-visualization`

目标：

- 决定哪些信息该图形化
- 决定哪些信息继续留在指标卡、表格或摘要区

### 页面进入打磨阶段

最后用：

- `动效规范`
- `自检`
- 已落地 Skill：
  `admin-motion`

目标：

- 只给必要反馈
- 删除无效动效
- 检查是否偏离后台语境

## 自检清单

AI 在输出前至少自问：

1. 我先判断了页面范式吗？
2. 我是不是过早发明了场景组件？
3. 这个页面第一优先动作够明确吗？
4. 可视化是真的帮助判断，还是只是装饰？
5. 动效是否只服务于状态反馈？
6. 有没有可以回收到已有模式块的地方？

如果要做最终验收，再补：

- `admin-design-review`

## 严重度分级 S0-S3

`admin-design-review` 的每条 check 都带严重度，review 结果应直接驱动修复优先级排序：

- `S0`：**阻断**，页面核心任务无法完成，必须先修（如未澄清就设计、页面任务不明、第一优先动作不明）
- `S1`：**高优**，结构 / 模式 / 契约或可访问性底线有问题（如结构不对、组件契约缺失、关键信息无状态色兜底）
- `S2`：**中优**，视觉、可视化、动效表达失衡（如 token 超档、动效超时、图表不必要）
- `S3`：**低优**，细节一致性（如间距、文案、微动效）

修复顺序原则：

- 先修 `S0`，再修 `S1`，后补 `S2 / S3`
- 不允许跳过 `S0 / S1` 直接收 `S2 / S3`
- 实际评审时可根据影响范围上调或下调

具体 check 到严重度的映射见 Skill 内部：[skills/admin-design-review/references/review-checklist.md](../skills/admin-design-review/references/review-checklist.md)。

## 常见误分流识别

`admin-design-orchestrator` 在分流前应先识别以下误分流形态，不要被字面触发词带偏：

- **触发词误导**：用户说"美化后台"，不应直接进 `style-guardrails`；"美化"是结果词不是意图词，先进 `design-principles` 澄清"更干净 / 更专业 / 更轻量"哪一种。
- **问题层级错配**：用户说"组件样式不对"，但真实问题是页面结构不对；不要把结构问题收到 `style-guardrails`。
- **来源未澄清**：用户说"按某某参考做"，但参考物本身没审过；先澄清参考物是否稳定，再决定是否锁视觉。
- **内部矛盾**：用户同时要"更简洁"和"更丰富"，先拦截澄清主从优先级。
- **主从意图混淆**：用户同时提"改结构"和"改视觉"，先做结构再收视觉，不要平行处理。

完整反例样本和路由验证集见 Skill 内部：[skills/admin-design-orchestrator/references/example-call-set.md](../skills/admin-design-orchestrator/references/example-call-set.md)。

## 给人看 vs 给 AI 自己看

这套 skill 里的文字服务两类读者，AI 产出时必须自己分得清：

- **规范本身**（`SKILL.md`、`references/*.md`、本文档）是给 AI 看的。它用"必须 / 应 / 禁止"、`S0 / P1 / PT1 / CC1` 这种高密度的规范书腔调，目的是让 AI 不放飞——这种腔调**必要**，不要去改。
- **AI 对用户的回答** 是给人看的。人读"违反 5 秒承诺 / 业务正确性级问题 / 结构层 + 契约层 + 数据正确性层都存在阻断问题"会头疼，还要在脑子里翻译一遍才知道是"有个会让财务数据出错的 bug"。

所以 AI 把规范翻译成回答时，要做一层**转译**：把内部代号、规范词、并列名词堆，换成人能一眼看懂的句子。转译不做，就是不说人话。

这一层转译由 [admin-output-voice](../skills/admin-output-voice/SKILL.md) 统一负责，所有 skill 对用户可见的输出都要套它。核心要点：

- **结论先行**：第一句就是最要紧的结论，不做"审查对象 / 技术栈 / 业务定位"登记开场
- **代号只留严重度**：用户可见输出只保留 `S0 / S1 / S2 / S3`；内部代号（`P1 / PT1 / CC1 / ST1 / VS1`）不出现
- **讲清影响**：每条问题除了"代码/设计是什么样"，必须带一句"对用户 / 业务的后果"
- **避开规范书腔**：不用"违反 / 偏离 / 兜底 / 硬塞 / X 级问题 / X 承诺"这类词，换成"跟 XX 对不上 / 写进了 / 会让 XX 出错的 bug"
- **术语统一**：抽象模式名首次出现配中文译名（`Queue Block` / 队列分组卡），之后只用一套叫法
- **Bullet 有节制**：单块 bullet 最多 `5` 条，bullet 块之间要有叙述承接，一份回答大表格最多 `1` 个

重灾区是 `admin-design-review` 的产出——它文字量最大、结构化字段最多，最容易直接把"审查对象 / 前置澄清是否充分 / 结论 / 主要问题 / 问题归因层 / 严重度 / 修复顺序 / 残余风险"八个字段列表甩给用户。这是**内部结构**，必须翻译成自然段落再给。

具体黑名单词、术语对照和前后对照示例见 Skill 内部：

- [skills/admin-output-voice/SKILL.md](../skills/admin-output-voice/SKILL.md)
- [skills/admin-output-voice/references/banned-words.md](../skills/admin-output-voice/references/banned-words.md)
- [skills/admin-output-voice/references/glossary.md](../skills/admin-output-voice/references/glossary.md)
- [skills/admin-output-voice/references/before-after-examples.md](../skills/admin-output-voice/references/before-after-examples.md)

## 从文档到真正 Skill 的落地方式

当前已经开始产品化：

- `admin-design-orchestrator`
  用于先判断任务阶段，再编排后续 Skill
- `design-principles`
  用于任务很模糊时先收敛方向
- `admin-design-patterns`
  用于定义页面范式和模式块
- `style-guardrails`
  用于把后台视觉边界收回到稳定骨架
- `admin-component-contracts`
  用于约束结构和输入契约
- `admin-visualization`
  用于数据表达判断
- `admin-motion`
  用于反馈与动效收口
- `admin-design-review`
  用于最终审查输出是否偏题
- `admin-output-voice`
  用于所有 skill 对用户的可见输出，负责把内部规范腔翻译成人话

到这里，渐进式 Skills 的首版调用链已经闭环。
