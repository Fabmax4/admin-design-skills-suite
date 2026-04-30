import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

const publicRoots = [
  'README.md',
  'SKILL.md',
  'AGENTS.md',
  'VERSION',
  'package.json',
  'setup',
  'agents',
  'docs',
  'skills',
];

const expectedSkills = [
  'admin-design-principles',
  'admin-design-style',
  'admin-design-patterns',
  'admin-design-components',
  'admin-design-visualization',
  'admin-design-motion',
  'admin-design-review',
  'admin-design-orchestrator',
];

function fail(message) {
  errors.push(message);
}

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), 'utf8');
}

function walk(relativePath) {
  const absolute = path.join(root, relativePath);
  if (!existsSync(absolute)) return [];
  const stats = statSync(absolute);
  if (stats.isFile()) return [relativePath];
  if (!stats.isDirectory()) return [];
  const ignored = new Set(['.git', 'node_modules', 'dist']);
  return readdirSync(absolute).flatMap((entry) => {
    if (ignored.has(entry)) return [];
    return walk(path.join(relativePath, entry));
  });
}

function frontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map((matchLine) => [matchLine[1], matchLine[2].replace(/^['"]|['"]$/g, '')]),
  );
}

const suite = JSON.parse(read('skills/suite.json'));
if (suite.name !== 'admin-design-skills-suite') fail('suite.json name must be admin-design-skills-suite.');
if (suite.version !== read('VERSION').trim()) fail('suite.json version must match VERSION.');
if (suite.host !== 'codex') fail('suite.json host must be codex.');
if (suite.suite_skill !== 'admin-design') fail('suite.json suite_skill must be admin-design.');
if (suite.entry_skill !== 'admin-design-orchestrator') fail('suite.json entry_skill must be admin-design-orchestrator.');

const suiteNames = suite.skills.map((skill) => skill.name);
if (JSON.stringify(suite.install_order) !== JSON.stringify(expectedSkills)) {
  fail('suite.json install_order does not match expected prefixed skill order.');
}
if (JSON.stringify(suiteNames) !== JSON.stringify(expectedSkills)) {
  fail('suite.json skills array does not match expected prefixed skill list.');
}

const rootSkill = frontmatter(read('SKILL.md'));
if (rootSkill.name !== 'admin-design') fail('Root SKILL.md frontmatter name must be admin-design.');
const rootAgent = read('agents/openai.yaml');
if (!rootAgent.includes('$admin-design')) fail('Root agents/openai.yaml default_prompt must use $admin-design.');

for (const skill of expectedSkills) {
  const skillDir = `skills/${skill}`;
  const skillPath = `${skillDir}/SKILL.md`;
  const agentPath = `${skillDir}/agents/openai.yaml`;
  if (!existsSync(path.join(root, skillPath))) fail(`${skillPath} is missing.`);
  if (!existsSync(path.join(root, agentPath))) fail(`${agentPath} is missing.`);
  if (!existsSync(path.join(root, skillDir, 'assets/icon.svg'))) fail(`${skillDir}/assets/icon.svg is missing.`);
  if (!existsSync(path.join(root, skillDir, 'assets/logo.svg'))) fail(`${skillDir}/assets/logo.svg is missing.`);

  if (existsSync(path.join(root, skillPath))) {
    const meta = frontmatter(read(skillPath));
    if (meta.name !== skill) fail(`${skillPath} frontmatter name must equal ${skill}.`);
  }

  if (existsSync(path.join(root, agentPath))) {
    const agent = read(agentPath);
    if (!agent.includes(`$${skill}`)) fail(`${agentPath} default_prompt must include $${skill}.`);
    if (!agent.includes('brand_color:')) fail(`${agentPath} must include brand_color.`);
  }
}

const setupPath = path.join(root, 'setup');
if (!existsSync(setupPath)) {
  fail('setup script is missing.');
} else if ((statSync(setupPath).mode & 0o111) === 0) {
  fail('setup script must be executable.');
}

const files = publicRoots.flatMap(walk).filter((file) => /\.(md|yaml|json|mjs|sh)$/.test(file) || ['setup', 'VERSION'].includes(path.basename(file)));
const oldPublicInvocations = [
  '$design-principles',
  '$style-guardrails',
  '$admin-component-contracts',
  '$admin-visualization',
  '$admin-motion',
];
const forbiddenRuntimeTerms = [
  'useAdminFeedback',
  'AntApp.useApp',
  'a-app',
  'Modal.confirm',
];

for (const file of files) {
  const content = read(file);
  if (content.includes('/Users/')) fail(`${file} contains a local absolute path.`);
  for (const term of oldPublicInvocations) {
    if (content.includes(term)) fail(`${file} contains legacy public invocation ${term}.`);
  }
  if (content.match(/[`'"]\/(?:admin-design|design-principles|style-guardrails|admin-component-contracts|admin-visualization|admin-motion)\b/)) {
    fail(`${file} contains slash-alias style invocation.`);
  }
  for (const term of forbiddenRuntimeTerms) {
    if (content.includes(term)) fail(`${file} contains project runtime term ${term}.`);
  }
  if (content.includes('模糊需求')) fail(`${file} contains the rule-layer phrase 模糊需求.`);
}

if (errors.length > 0) {
  console.error(`Skill suite check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Skill suite check passed.');
