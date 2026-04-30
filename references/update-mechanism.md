# Skill Update Mechanism

这套机制用于把实际工作中证明有效的后台设计范式，稳定地补回 Admin Design Skills Suite。目标是让 Skills 逐步变强，同时避免把一次性业务场景、项目实现细节或个人偏好写成通用规则。

## 更新入口

当一次真实任务中出现可复用范式时，先记录候选，不要直接改 `SKILL.md`：

```bash
npm run propose-pattern -- --title "Stable column setup for wide tables" --layer components --source "reviewed admin table work" --write
```

脚本会在 `.skill-updates/` 下生成候选文件。这个目录默认不提交，候选经过审核后才转写到 `skills/*/SKILL.md`、`skills/*/references/*.md` 或 `docs/*.md`。

## 什么算有效范式

候选必须同时满足：

1. 来自真实任务，不是凭空想象。
2. 至少能迁移到两个以上后台场景。
3. 能减少 AI 常见错误，或提高设计一致性、可读性、可执行性。
4. 不绑定某个项目路径、组件文件、业务专有名词或运行时实现。
5. 能用一句规则、一个模式契约或一个反例说明清楚。

不满足这些条件的内容只保留为案例或提示，不进入规则层。

## 分层落点

| 候选类型 | 写入位置 | 示例 |
| --- | --- | --- |
| 价值判断、澄清方式、优先级 | `skills/admin-design-principles` | 需求不清时如何提问 |
| 页面范式、导航、布局和寻址 | `skills/admin-design-patterns` | 列表详情的返回路径 |
| 可复用组件契约和交互边界 | `skills/admin-design-components` | 宽表列配置、批量操作、详情抽屉 |
| 色彩、圆角、密度、表面处理 | `skills/admin-design-style` | 信息卡片默认中性 |
| 指标、表格、图表和信号表达 | `skills/admin-design-visualization` | 提示先定量后定性 |
| 动效、焦点、反馈和降级 | `skills/admin-design-motion` | 保存后焦点回到触发点 |
| 失效归因和修复顺序 | `skills/admin-design-review` | 先修结构再修视觉 |
| 分流和组合链路 | `skills/admin-design-orchestrator` | 混合意图的最小 Skill 链 |

## 提交流程

1. 记录候选：用 `npm run propose-pattern -- --write` 生成 `.skill-updates/*.md`。
2. 归类：判断候选应该进入哪个 Skill，还是只作为案例留在 docs。
3. 抽象：去掉行业专有名词、项目路径、框架内部实现和一次性字段名。
4. 落稿：短规则写进 `SKILL.md`；详细判断、反例、表格写进对应 `references/*.md`。
5. 串联：如果新范式影响分流，把 `admin-design-orchestrator` 的 routing sample 或 workflow recipe 同步更新。
6. 校验：运行 `npm run check`，必要时再做临时安装验证。

## 审核门槛

每条候选在进入套件前都要回答：

1. 它解决的是 AI 的高频失败，还是某个页面的一次性偏好？
2. 它能跨行业使用吗？如果不能，是否应该降级为案例层？
3. 它是否和已有规则重复？重复时应该合并，不新增平行规则。
4. 它是否会让 Skill 变长？如果会，优先放入 reference。
5. 它是否引入具体技术栈、项目路径或业务术语？如果有，必须抽象掉。
6. 它是否改变公开调用名、安装结构或套件 manifest？如果改变，必须同步更新 `skills/suite.json`、README 和校验脚本。

## 输出格式

被接受的范式应写成下面之一：

- 一条硬规则：适合必须守住的边界。
- 一个判断问题：适合澄清或评审。
- 一个组件契约字段：适合可复用组件。
- 一个反模式：适合帮助 AI 识别失败。
- 一个案例样本：适合保留行业语境，但不能上升为通用规则。

默认优先写短规则和反模式，少写长篇解释。
