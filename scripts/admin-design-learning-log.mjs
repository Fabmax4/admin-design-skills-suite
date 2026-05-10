import { appendFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const allowedKinds = new Set(['learning', 'review', 'timeline']);
const allowedTypes = new Set([
  'pattern',
  'pitfall',
  'preference',
  'decision',
  'component',
  'style',
  'visualization',
  'motion',
  'routing',
  'review',
  'operational',
]);
const allowedSources = new Set(['observed', 'user-stated', 'inferred', 'cross-review']);
const allowedStatuses = new Set([
  'candidate',
  'approved',
  'rejected',
  'promoted',
  'recorded',
  'pass',
  'needs-work',
  'blocked',
  'fixed',
  'success',
  'error',
  'abort',
  'unknown',
]);
const allowedScopes = new Set(['project', 'suite', 'cross-project']);
const allowedEvents = new Set(['started', 'completed', 'checkpoint', 'note']);

function usage() {
  console.log(`Usage:
  npm run memory:log -- --type pattern --key stable-table-reading --insight "..." --source user-stated --confidence 10
  npm run memory:log -- --kind review --key run-07-layout --insight "..." --status needs-work
  npm run memory:log -- --kind timeline --event completed --skill admin-design-review --outcome success

Options:
  --kind learning|review|timeline   Default: learning
  --type TYPE                       Required for learning
  --key SHORT_KEY                   Required for learning and review
  --insight TEXT                    Required for learning and review
  --source SOURCE                   observed|user-stated|inferred|cross-review
  --confidence 1-10                 Required for learning
  --status STATUS                   candidate|approved|rejected|promoted|needs-work|pass|...
  --scope SCOPE                     project|suite|cross-project
  --files a,b,c                     Optional related files
  --target PATH_OR_SKILL            Optional intended landing target
  --evidence TEXT                   Optional evidence summary
`);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') args.help = true;
    else if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[index + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        index += 1;
      }
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

function branchName() {
  return sanitizeSlug(git(['branch', '--show-current']) || 'unknown', 'unknown');
}

function stateRoot() {
  const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), '.codex');
  return process.env.ADMIN_DESIGN_HOME || path.join(codexHome, 'admin-design');
}

function assertEnum(value, allowed, label) {
  if (!allowed.has(value)) {
    throw new Error(`${label} must be one of: ${Array.from(allowed).join(', ')}`);
  }
}

function assertKey(value) {
  if (!value || !/^[a-zA-Z0-9_-]+$/.test(value)) {
    throw new Error('--key must use letters, numbers, hyphens, or underscores only.');
  }
}

function assertSafeText(value, label) {
  if (!value) return;
  const patterns = [
    /ignore\s+(all\s+)?previous\s+(instructions|context|rules)/i,
    /you\s+are\s+now\s+/i,
    /skip\s+(all\s+)?(review|checks|rules)/i,
    /override[:\s]/i,
    /\bsystem\s*:/i,
    /\bassistant\s*:/i,
    /\buser\s*:/i,
    /do\s+not\s+(report|flag|mention)/i,
    /approve\s+(all|every|this)/i,
  ];
  for (const pattern of patterns) {
    if (pattern.test(value)) {
      throw new Error(`${label} contains instruction-like text and was rejected.`);
    }
  }
}

function parseFiles(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildRecord(args) {
  const kind = args.kind || 'learning';
  assertEnum(kind, allowedKinds, '--kind');

  const base = {
    kind,
    project: projectSlug(),
    branch: branchName(),
    ts: new Date().toISOString(),
  };

  if (kind === 'timeline') {
    const event = args.event || 'note';
    assertEnum(event, allowedEvents, '--event');
    return {
      ...base,
      event,
      skill: args.skill || 'admin-design',
      outcome: args.outcome || 'unknown',
      note: args.note || '',
    };
  }

  assertKey(args.key);
  if (!args.insight) throw new Error('--insight is required.');
  assertSafeText(args.insight, '--insight');
  assertSafeText(args.evidence, '--evidence');

  const source = args.source || 'observed';
  const status = args.status || (kind === 'learning' ? 'candidate' : 'recorded');
  const scope = args.scope || 'project';
  assertEnum(source, allowedSources, '--source');
  assertEnum(status, allowedStatuses, '--status');
  assertEnum(scope, allowedScopes, '--scope');

  const record = {
    ...base,
    type: args.type || kind,
    key: args.key,
    insight: args.insight,
    source,
    status,
    scope,
    target: args.target || '',
    evidence: args.evidence || '',
    files: parseFiles(args.files),
  };

  if (kind === 'learning') {
    assertEnum(record.type, allowedTypes, '--type');
    const confidence = Number(args.confidence);
    if (!Number.isInteger(confidence) || confidence < 1 || confidence > 10) {
      throw new Error('--confidence must be an integer from 1 to 10.');
    }
    record.confidence = confidence;
  } else if (args.confidence) {
    const confidence = Number(args.confidence);
    if (!Number.isInteger(confidence) || confidence < 1 || confidence > 10) {
      throw new Error('--confidence must be an integer from 1 to 10.');
    }
    record.confidence = confidence;
  }

  record.trusted = record.source === 'user-stated' || record.status === 'approved' || record.status === 'promoted';
  return record;
}

function ledgerFile(record) {
  const projectDir = path.join(stateRoot(), 'projects', record.project);
  mkdirSync(projectDir, { recursive: true });
  if (record.kind === 'learning') return path.join(projectDir, 'learnings.jsonl');
  if (record.kind === 'timeline') return path.join(projectDir, 'timeline.jsonl');
  return path.join(projectDir, `${record.branch}-reviews.jsonl`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  usage();
  process.exit(0);
}

try {
  const record = buildRecord(args);
  const target = ledgerFile(record);
  appendFileSync(target, `${JSON.stringify(record)}\n`, 'utf8');
  console.log(path.relative(stateRoot(), target));
} catch (error) {
  console.error(`admin-design-learning-log: ${error.message}`);
  usage();
  process.exit(2);
}
