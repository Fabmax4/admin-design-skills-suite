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

## 为什么要渐进式

因为 AI 最容易犯的错误，不是不会画组件，而是：

- 太早进入组件层
- 太早给场景命名
- 太晚处理约束
- 太少做自检

渐进式 Skills 的作用，就是让 AI 先在高层做对，再往下落细节。

## 分层调用建议

### 用户只给了模糊目标

先用：

- `设计原则`
- `设计模式`
- 已落地 Skill：
  `design-principles` + `admin-design-patterns`

目标：

- 判断页面范式
- 找到第一优先动作
- 选出主模式块

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

到这里，渐进式 Skills 的首版调用链已经闭环。
