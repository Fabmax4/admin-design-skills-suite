---
name: admin-component-contracts
description: Use when turning admin/backend design patterns into reusable component contracts; deciding whether to create a new component; specifying required inputs, states, actions, and accessibility; or reviewing whether an admin component is too scenario-specific. 适用于后台组件抽象、契约定义、新组件判定、复用性评审。
---

# Admin Component Contracts

这个 Skill 解决的不是“页面长什么样”，而是“一个后台组件最少要承担什么”。只有在页面范式和模式块已经基本确定后，才使用它。

## 何时使用

- 需要定义一个后台组件的输入契约
- 需要判断一个业务组件是否值得独立存在
- 需要把业务包装回收到抽象组件
- 需要审查现有组件是否过于场景化

## 工作流程

1. 先确认模式来源
   如果还不知道它属于哪种模式块，先使用 `admin-design-patterns`，不要直接定义组件。
2. 定义契约
   至少明确：最小输入、主要状态、主动作、辅助信息、可访问性要求。
   如果它是临时任务或反馈容器，必须先判断该用 `Modal`、`Drawer`、`Popover`、`Tooltip`，还是 `Message / Notification`。
3. 检查命名
   命名优先使用模式名；业务名只能作为包装层，不应作为抽象层。
4. 判断是否新增组件
   只有在现有模式无法表达、输入结构稳定且可跨场景复用时，才允许新增。
5. 落到实现
   如果当前仓库已有对应 Vue 组件，优先复用或扩展，不要再平行造一个名字很像的新组件。
6. 检查表格惯性
   如果模式落到表格，必须确认列顺序、列宽、横向滚动和关键字段包裹策略稳定，不允许把表格挤成逐字换行或让单元格尺寸随机波动。
7. 检查浮层边界
   如果模式落到浮层或全局反馈，必须确认是否阻断、是否保留父上下文、是否只承载轻量解释，以及关闭语义是否清晰。
8. 检查运行时封装
   如果当前仓库已经有统一反馈入口，页面实现必须复用它，不允许重新散落静态调用。
9. 检查列表高频交互
   如果当前页面是查询列表，必须确认搜索、筛选、分页的组合是否稳定；当列数超过 `15` 时是否提供列配置；列配置是否锁定关键列；批量操作是否依赖已选对象；详情抽屉是否保留返回来源和关闭确认。

## 输出格式

- `抽象模式`
- `组件职责`
- `最小输入`
- `必备状态`
- `主动作`
- `辅助字段`
- `可访问性要求`
- `是否需要新组件`
- `现有实现映射`

## 硬规则

- 不创建只有名字没有契约的组件
- 不把业务包装误写成抽象契约
- 不允许只有展示，没有动作或状态
- 不允许只有数据，没有说明语境
- 不允许组件脱离后台密度和可扫读要求
- 不允许表格失去行列一致性和浏览阅读惯性
- 不允许提示类信息只有定性判断，没有数量、范围、时限或阈值
- 不允许把长表单和长详情塞进 `Modal`
- 不允许把必要信息只放在 `Tooltip`
- 不允许用 `Message / Notification` 代替真正的任务承接界面
- 不允许同一任务堆叠多个重量级浮层
- 不允许页面或业务组件直接散落 `message`、`notification`、`Modal.confirm` 或 `AntApp.useApp()`
- 不允许搜索、筛选、分页彼此割裂，破坏查询列表浏览惯性
- 不允许批量危险动作脱离已选对象和影响范围说明
- 不允许详情抽屉失去“回到列表上下文”的语义

## 使用提醒

- 契约定义看 `references/contracts.md`
- 浮层和反馈边界看 `references/overlay-feedback.md`
- 现有实现映射看 `references/implementation-map.md`
- 新组件判定看 `references/new-component-test.md`
