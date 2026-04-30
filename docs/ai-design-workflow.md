# AI Design Workflow

这套 Skills 的核心是渐进式分流：先判断任务是否清楚，再决定该进入哪一层。不要一上来写组件、配颜色或补动效。

## 默认入口

```text
$admin-design-orchestrator 设计后台页
```

`$admin-design-orchestrator` 负责先问清楚输入，再选择最小可行 Skill 链路。用户已经明确知道要做哪一层时，才直接调用对应子 Skill。

## 推荐顺序

1. `$admin-design-principles`：先判断角色、对象、主任务、成功标准和主要风险。
2. `$admin-design-patterns`：再定页面范式、导航位置、主模式块和返回路径。
3. `$admin-design-components`：把模式落成组件契约，明确输入、状态、动作和复用边界。
4. `$admin-design-style`：收紧颜色、圆角、密度、表面和可访问性。
5. `$admin-design-visualization`：决定数据应不应该图形化，以及用哪种表达。
6. `$admin-design-motion`：只补必要的状态反馈、焦点变化和可访问性降级。
7. `$admin-design-review`：对成型方案做失效归因和修复排序。

这不是强制全量链路。每次只走当前必要的几层。

## 分流规则

- 输入不足：先澄清；用户仍说不清时，用 `$admin-design-principles` 提启发式问题。
- 结构不稳：先 `$admin-design-patterns`，不要直接发明业务组件。
- 页面已有结构但组件不可复用：用 `$admin-design-components`。
- 视觉变花、色彩过多、圆角过重、密度失控：用 `$admin-design-style`。
- 页面是数据密集型，但不确定该不该上图：用 `$admin-design-visualization`。
- 只是在补提交、刷新、保存、关闭、批量处理等反馈：用 `$admin-design-motion`。
- 已经有设计稿、页面或组件计划需要验收：用 `$admin-design-review`。

## 输出要求

- 对用户先说结论，再说明为什么走这条 Skill 链。
- 明确本轮暂不进入哪些层，避免把任务做散。
- 如果需要澄清，问题要具体到角色、对象、主动作、边界状态或成功标准。
- 不输出长路线图，只给当前最小有效链路和下一步。

## 自检

发送设计建议前至少确认：

1. 页面第一优先动作是否清楚？
2. 页面范式和导航寻址是否稳定？
3. 组件是否先有契约再命名？
4. 表格是否保持行列一致性和连续阅读惯性？
5. 信息卡片和正文是否没有乱用颜色？
6. 图表和动效是否真的帮助判断或行动？
