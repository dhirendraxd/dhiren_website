#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const dataFile = path.join(ROOT, 'src', 'data', 'projectDetails.ts');
const srcDir = path.join(ROOT, 'src');

const content = fs.readFileSync(dataFile, 'utf8');
const slugRegex = /slug:\s*"([^"]+)"/g;
const slugs = new Set();
let m;
while ((m = slugRegex.exec(content)) !== null) slugs.add(m[1]);

const allowedStatic = new Set(['/', '/digital-marketing', '/advocacy-community', '/tech-projects']);

const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.jsx') || p.endsWith('.html')) files.push(p);
  }
}
walk(srcDir);

const hrefRegex = /href=\{?\s*"(\/[^"\s#?]+)"\s*\}?/g;
const bad = [];

for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  let mh;
  while ((mh = hrefRegex.exec(txt)) !== null) {
    const p = mh[1];
    if (allowedStatic.has(p)) continue;
    if (p.startsWith('/projects/')) {
      const slug = p.replace('/projects/', '').replace(/\/$/, '');
      if (!slugs.has(slug)) bad.push({ file: f, link: p, reason: 'missing project slug' });
    }
  }
}

if (bad.length === 0) {
  console.log('No broken project links found.');
  process.exit(0);
}

console.log('Potential broken links found:');
for (const b of bad) console.log(`${b.file}: ${b.link} — ${b.reason}`);
process.exit(1);
