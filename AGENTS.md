# Admin Design Skills Suite

## Language

默认使用中文输出，除非用户明确要求英文，或内容属于代码、命令、路径、配置键名、API 字段、报错原文。

## Routing

- 后台、管理端、运营后台、数据看板、管理页面、后台组件、后台设计评审类任务，优先使用 `$admin-design-orchestrator`。
- 根 Skill `$admin-design` 只用于了解套件结构、安装方式和子 Skill 索引，不替代 `$admin-design-orchestrator`。
- 当用户明确指定某个子 Skill 时，直接使用对应 `$admin-design-*` Skill。
- 需求信息不足时先澄清；如果用户无法准确描述，用启发式问题帮助用户暴露角色、对象、主任务、成功标准和边界状态。
- 工作中出现可复用的新范式时，先按 `references/update-mechanism.md` 记录候选，不要把一次性业务场景直接写入规则层。

## Public Contract

- 对外调用名统一使用 `$admin-design-*`。
- 不新增 slash alias。
- 不把行业专有名词固化到规则层；行业表达只放在案例、样本和提示层。
- 不把本地 Vue 实验页面、运行时代码或项目路径写进公开套件文档。
- 未审核的范式候选写入 `.skill-updates/`，该目录不提交到公开仓库。
