# Admin Design Skills Suite

Codex 专用的后台设计技能套件。它把后台页面设计拆成渐进式 Skill：先判断目标和信息架构，再进入页面模式、组件契约、视觉约束、数据表达、动效反馈，最后做设计审查。

默认入口是 `$admin-design-orchestrator`。根目录的 `admin-design` Skill 只负责套件定位和索引，不替代编排入口。

## 安装

```bash
git clone --single-branch --depth 1 https://github.com/Fabmax4/admin-design-skills-suite.git ~/.codex/skills/admin-design
cd ~/.codex/skills/admin-design
./setup --host codex
```

`setup` 会把根套件注册为 `admin-design`，并把 8 个子 Skill 以 sibling 形式注册到 `${CODEX_HOME:-$HOME/.codex}/skills`。默认使用 symlink；如果目标位置已有非本套件内容，会停止并提示。

## 快速调用

```text
$admin-design-orchestrator 设计后台页
$admin-design-orchestrator design admin page
$admin-design-review 审查页面
$admin-design-components 抽组件契约
$admin-design-style 收视觉
$admin-design-visualization 判断是否上图
```

更多最短调用见 [docs/quick-start.md](docs/quick-start.md)。

## Skill 索引

- `$admin-design-orchestrator`：后台设计任务默认入口，负责澄清、分流和收口。
- `$admin-design-principles`：在结构前判断目标、角色、主动作、风险和优先级。
- `$admin-design-patterns`：选择页面范式、布局骨架和高频交互模式。
- `$admin-design-components`：把模式落成可复用组件契约，避免场景化堆砌。
- `$admin-design-style`：约束颜色、圆角、密度、表面、可访问性，防止视觉偏航。
- `$admin-design-visualization`：判断数据应使用指标、表格、状态轨、对比图还是不画图。
- `$admin-design-motion`：只保留能帮助状态理解、焦点转移或风险反馈的动效。
- `$admin-design-review`：按渐进层级审查设计结果，给出失效归因和修复顺序。

## 工程结构

- [SKILL.md](SKILL.md)：根套件入口，只做定位、路由说明和子 Skill 索引。
- [skills/suite.json](skills/suite.json)：套件 manifest，声明真实安装名、入口名和安装顺序。
- [skills](skills)：8 个可被 Codex 直接调用的子 Skill。
- [docs](docs)：面向使用者的套件文档和调用速查，不包含实验页面或运行时代码说明。
- [scripts/check-skill-suite.mjs](scripts/check-skill-suite.mjs)：自包含套件校验脚本。

## 校验

```bash
npm run check
./setup --host codex --dest /tmp/admin-design-skills-install
```

校验会检查 manifest、Skill frontmatter、`agents/openai.yaml`、默认 prompt、公开文档调用名、本机绝对路径和规则层污染。

## 更新机制

工作中产生的新范式先进入候选池，不直接写进规则层：

```bash
npm run propose-pattern -- --title "Wide table column control" --layer components --source "real admin table review" --write
```

候选文件会写入 `.skill-updates/`，默认不提交。通过复用性、跨场景、去项目化和重复性审核后，再转写到对应 Skill 或 reference。完整流程见 [references/update-mechanism.md](references/update-mechanism.md)。

## 迁移说明

公开接口统一使用 `$admin-design-*`。旧短名不再作为推荐入口；`setup` 只会检测并提示旧目录，不会自动删除用户已有 Skill。
