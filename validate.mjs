#!/usr/bin/env node
// validate.mjs — sanity-checks every topic page for spine requirements.
// Run: `node validate.mjs`. Exits non-zero on failure.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname;
const TOPICS_DIR = join(ROOT, 'topics');

const RED = '\x1b[31m', YEL = '\x1b[33m', GRN = '\x1b[32m', DIM = '\x1b[2m', RST = '\x1b[0m';

const checks = [
  {
    name: 'has <meta viewport>',
    test: (html) => /<meta[^>]+name=["\']?viewport["\']?/i.test(html),
  },
  {
    name: 'has <title>',
    test: (html) => /<title>[^<]+<\/title>/i.test(html),
  },
  {
    name: 'has <meta description>',
    test: (html) => /<meta[^>]+name=["\']?description["\']?[^>]+content=/i.test(html),
  },
  {
    name: 'loads /_shared/freshness.css',
    test: (html) => /href=["\']\/?_shared\/freshness\.css["\']/.test(html),
  },
  {
    name: 'loads /_shared/freshness.js',
    test: (html) => /src=["\']\/?_shared\/freshness\.js["\']/.test(html),
  },
  {
    name: 'has #onescroll-meta JSON block',
    test: (html) => /id=["\']onescroll-meta["\']/.test(html),
  },
  {
    name: 'metadata parses as JSON with required fields',
    test: (html) => {
      const m = html.match(/<script[^>]+id=["\']onescroll-meta["\'][^>]*>([\s\S]*?)<\/script>/);
      if (!m) return false;
      try {
        const d = JSON.parse(m[1]);
        return d.topic && d.title && d.generated && /^\d{4}-\d{2}-\d{2}$/.test(d.generated)
          && ['evergreen', 'slow', 'fast'].includes(d.volatility);
      } catch { return false; }
    },
  },
  {
    name: 'has back-link with .onescroll-backlink class',
    test: (html) => /class=["\'][^"\']*onescroll-backlink/.test(html),
  },
  {
    name: 'has single <h1>',
    test: (html) => (html.match(/<h1[\s>]/gi) || []).length === 1,
  },
  {
    name: 'has <main>',
    test: (html) => /<main[\s>]/i.test(html),
  },
];

function validateTopic(slug) {
  const file = join(TOPICS_DIR, slug, 'index.html');
  if (!existsSync(file)) return [`missing ${file}`];
  const html = readFileSync(file, 'utf8');
  const failures = [];
  for (const c of checks) {
    if (!c.test(html)) failures.push(c.name);
  }
  return failures;
}

function validateManifest(slugs) {
  const file = join(ROOT, 'manifest.json');
  if (!existsSync(file)) return ['manifest.json missing'];
  let data;
  try { data = JSON.parse(readFileSync(file, 'utf8')); }
  catch (e) { return ['manifest.json is invalid JSON']; }
  if (!Array.isArray(data.topics)) return ['manifest.json missing topics[]'];

  const failures = [];
  const manifestSlugs = new Set(data.topics.map(t => t.slug));
  for (const slug of slugs) {
    if (!manifestSlugs.has(slug)) failures.push(`topic "${slug}" not in manifest`);
  }
  for (const t of data.topics) {
    if (!slugs.includes(t.slug)) failures.push(`manifest entry "${t.slug}" has no page`);
    for (const k of ['slug', 'title', 'blurb', 'generated', 'volatility']) {
      if (!t[k]) failures.push(`manifest entry "${t.slug}" missing ${k}`);
    }
  }
  return failures;
}

const topicSlugs = readdirSync(TOPICS_DIR)
  .filter(n => !n.startsWith('.') && statSync(join(TOPICS_DIR, n)).isDirectory());

let failed = 0;

console.log(`${DIM}Validating ${topicSlugs.length} topic(s)...${RST}\n`);

for (const slug of topicSlugs) {
  const fails = validateTopic(slug);
  if (fails.length === 0) {
    console.log(`${GRN}✓${RST} topics/${slug}`);
  } else {
    failed++;
    console.log(`${RED}✗${RST} topics/${slug}`);
    fails.forEach(f => console.log(`  ${RED}·${RST} ${f}`));
  }
}

const manifestFails = validateManifest(topicSlugs);
console.log();
if (manifestFails.length === 0) {
  console.log(`${GRN}✓${RST} manifest.json`);
} else {
  failed++;
  console.log(`${RED}✗${RST} manifest.json`);
  manifestFails.forEach(f => console.log(`  ${RED}·${RST} ${f}`));
}

console.log();
if (failed > 0) {
  console.log(`${RED}${failed} check(s) failed${RST}`);
  process.exit(1);
} else {
  console.log(`${GRN}all good${RST}`);
}
