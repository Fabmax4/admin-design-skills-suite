import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function usage() {
  console.log(`Usage:
  npm run propose-pattern -- --title "Pattern title" --layer components --source "task or evidence" [--summary "..."] [--evidence "..."] [--target "..."] [--write]

Layers:
  principles, patterns, components, style, visualization, motion, review, orchestrator, docs
`);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') args.help = true;
    else if (arg === '--write') args.write = true;
    else if (arg.startsWith('--')) {
      const key = arg.slice(2);
      args[key] = argv[index + 1];
      index += 1;
    }
  }
  return args;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'pattern';
}

const args = parseArgs(process.argv.slice(2));
const allowedLayers = new Set(['principles', 'patterns', 'components', 'style', 'visualization', 'motion', 'review', 'orchestrator', 'docs']);

if (args.help) {
  usage();
  process.exit(0);
}

if (!args.title || !args.layer || !args.source) {
  usage();
  process.exit(2);
}

if (!allowedLayers.has(args.layer)) {
  console.error(`Invalid --layer "${args.layer}".`);
  process.exit(2);
}

const today = new Date().toISOString().slice(0, 10);
const fileName = `${today}-${slugify(args.title)}.md`;
const outputDir = path.join(root, '.skill-updates');
const outputPath = path.join(outputDir, fileName);

const targetByLayer = {
  principles: 'skills/admin-design-principles',
  patterns: 'skills/admin-design-patterns',
  components: 'skills/admin-design-components',
  style: 'skills/admin-design-style',
  visualization: 'skills/admin-design-visualization',
  motion: 'skills/admin-design-motion',
  review: 'skills/admin-design-review',
  orchestrator: 'skills/admin-design-orchestrator',
  docs: 'docs',
};

const template = `# ${args.title}

Status: candidate
Layer: ${args.layer}
Target: ${args.target || targetByLayer[args.layer]}
Source: ${args.source}

## Summary

${args.summary || 'Describe the reusable pattern in one or two sentences.'}

## Evidence

${args.evidence || '- Which real task exposed this pattern?\n- What failed before using it?\n- What improved after using it?'}

## Reuse Test

- Can this transfer to at least two admin scenarios?
- Does it reduce a recurring AI failure?
- Is it free of project paths, runtime implementation details, and industry-only terms?
- Is it different from existing rules?

## Proposed Skill Change

- Write the shortest rule, contract field, review question, or reference entry that should be added.
- If it is only a case, put it in docs or routing samples instead of SKILL.md.
`;

if (args.write) {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, template, 'utf8');
  console.log(path.relative(root, outputPath));
} else {
  console.log(template);
}
