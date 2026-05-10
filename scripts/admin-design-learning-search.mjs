import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

function usage() {
  console.log(`Usage:
  npm run memory:search -- --kind learning --usable --limit 5
  npm run memory:search -- --kind review --query layout
  npm run memory:search -- --kind all --cross-project --usable

Options:
  --kind learning|review|timeline|all   Default: learning
  --type TYPE                           Filter learning type
  --status STATUS                       Filter status
  --query TEXT                          Search key, insight, evidence, target, files
  --limit N                             Default: 10
  --usable                              Only show user-stated, approved, or promoted records
  --cross-project                       Include safe records from other projects
`);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') args.help = true;
    else if (arg === '--usable' || arg === '--cross-project') args[arg.slice(2)] = true;
    else if (arg.startsWith('--')) {
      const key = arg.slice(2);
      args[key] = argv[index + 1];
      index += 1;
    }
  }
  return args;
}

function git(args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

function sanitizeSlug(value, fallback) {
  return (
    value
      .replace(/^git@[^:]+:/, '')
      .replace(/^https?:\/\/[^/]+\//, '')
      .replace(/\.git$/, '')
      .replace(/[\\/]+/g, '-')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120) || fallback
  );
}

function projectSlug() {
  const remote = git(['remote', 'get-url', 'origin']);
  if (remote) return sanitizeSlug(remote, 'project');

  const root = git(['rev-parse', '--show-toplevel']) || process.cwd();
  return sanitizeSlug(path.basename(root), 'project');
}

function stateRoot() {
  const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), '.codex');
  return process.env.ADMIN_DESIGN_HOME || path.join(codexHome, 'admin-design');
}

function walkFiles(dir) {
  if (!existsSync(dir)) return [];
  const stats = statSync(dir);
  if (stats.isFile()) return [dir];
  if (!stats.isDirectory()) return [];
  return readdirSync(dir).flatMap((entry) => walkFiles(path.join(dir, entry)));
}

function ledgerFiles(projectDir, kind) {
  return walkFiles(projectDir).filter((file) => {
    const base = path.basename(file);
    if (kind === 'learning') return base === 'learnings.jsonl';
    if (kind === 'timeline') return base === 'timeline.jsonl';
    if (kind === 'review') return base.endsWith('-reviews.jsonl');
    return base === 'learnings.jsonl' || base === 'timeline.jsonl' || base.endsWith('-reviews.jsonl');
  });
}

function readRecords(file, currentProject) {
  const project = path.basename(path.dirname(file));
  return readFileSync(file, 'utf8')
    .split('\n')
    .filter(Boolean)
    .flatMap((line) => {
      try {
        const record = JSON.parse(line);
        return [{ ...record, _project: project, _crossProject: project !== currentProject }];
      } catch {
        return [];
      }
    });
}

function effectiveConfidence(record) {
  const base = Number(record.confidence || 5);
  if (!record.ts || record.source === 'user-stated' || record.status === 'approved' || record.status === 'promoted') return base;
  const days = Math.floor((Date.now() - new Date(record.ts).getTime()) / 86400000);
  return Math.max(0, base - Math.floor(days / 30));
}

function isUsable(record) {
  return record.source === 'user-stated' || record.status === 'approved' || record.status === 'promoted';
}

function searchableText(record) {
  return [
    record.key,
    record.insight,
    record.evidence,
    record.target,
    record.skill,
    record.outcome,
    ...(record.files || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function dedupeLearnings(records) {
  const latest = new Map();
  for (const record of records) {
    if (record.kind !== 'learning') continue;
    const key = `${record.type}|${record.key}|${record._project}`;
    const previous = latest.get(key);
    if (!previous || new Date(record.ts) > new Date(previous.ts)) latest.set(key, record);
  }
  const nonLearning = records.filter((record) => record.kind !== 'learning');
  return [...latest.values(), ...nonLearning];
}

function format(records) {
  if (records.length === 0) {
    console.log('没有匹配的 admin-design 记忆记录。');
    return;
  }

  console.log(`读取到 ${records.length} 条 admin-design 记忆记录。`);
  const byKind = new Map();
  for (const record of records) {
    const kind = record.kind || 'unknown';
    if (!byKind.has(kind)) byKind.set(kind, []);
    byKind.get(kind).push(record);
  }

  for (const [kind, group] of byKind.entries()) {
    console.log('');
    console.log(`## ${kind}`);
    for (const record of group) {
      const date = (record.ts || '').slice(0, 10) || 'unknown-date';
      const confidence = record.kind === 'learning' ? `, confidence ${record._effectiveConfidence}/10` : '';
      const cross = record._crossProject ? ', cross-project' : '';
      const status = record.status ? `, ${record.status}` : '';
      const source = record.source ? `, ${record.source}` : '';
      const key = record.key || record.event || record.skill || 'record';
      console.log(`- [${key}] ${record.type || record.event || record.outcome || 'note'} (${date}${status}${source}${confidence}${cross})`);
      const insight = record.insight || record.note || record.outcome || '';
      if (insight) console.log(`  ${insight}`);
      if (record.files?.length) console.log(`  files: ${record.files.join(', ')}`);
      if (record.target) console.log(`  target: ${record.target}`);
    }
  }
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  usage();
  process.exit(0);
}

const kind = args.kind || 'learning';
if (!['learning', 'review', 'timeline', 'all'].includes(kind)) {
  console.error('--kind must be learning, review, timeline, or all.');
  process.exit(2);
}

const currentProject = projectSlug();
const root = stateRoot();
const projectRoot = path.join(root, 'projects');
const projectDirs = [];
const currentDir = path.join(projectRoot, currentProject);
if (existsSync(currentDir)) projectDirs.push(currentDir);

if (args['cross-project'] && existsSync(projectRoot)) {
  for (const entry of readdirSync(projectRoot)) {
    const dir = path.join(projectRoot, entry);
    if (dir !== currentDir && statSync(dir).isDirectory()) projectDirs.push(dir);
  }
}

let records = projectDirs.flatMap((dir) => ledgerFiles(dir, kind).flatMap((file) => readRecords(file, currentProject)));

if (!args['cross-project']) records = records.filter((record) => !record._crossProject);
if (args['cross-project']) records = records.filter((record) => !record._crossProject || record.trusted === true || isUsable(record));
if (args.usable) records = records.filter(isUsable);
if (args.type) records = records.filter((record) => record.type === args.type);
if (args.status) records = records.filter((record) => record.status === args.status);
if (args.query) {
  const query = args.query.toLowerCase();
  records = records.filter((record) => searchableText(record).includes(query));
}

records = dedupeLearnings(records).map((record) => ({
  ...record,
  _effectiveConfidence: effectiveConfidence(record),
}));

records.sort((a, b) => {
  if (b._effectiveConfidence !== a._effectiveConfidence) return b._effectiveConfidence - a._effectiveConfidence;
  return new Date(b.ts || 0).getTime() - new Date(a.ts || 0).getTime();
});

const limit = Number(args.limit || 10);
format(records.slice(0, Number.isInteger(limit) && limit > 0 ? limit : 10));
