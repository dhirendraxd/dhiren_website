#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Simple sitemap generator: extracts slugs from src/data/projectDetails.ts
// and writes public/sitemap.xml. Safe, non-invasive and run at dev time.

const ROOT = path.resolve(process.cwd());
const dataFile = path.join(ROOT, 'src', 'data', 'projectDetails.ts');
const outFile = path.join(ROOT, 'public', 'sitemap.xml');

if (!fs.existsSync(dataFile)) {
  console.error('projectDetails.ts not found; aborting sitemap generation.');
  process.exit(1);
}

const content = fs.readFileSync(dataFile, 'utf8');

// match slug: "..."
const slugRegex = /slug:\s*"([^"]+)"/g;
const slugs = new Set();
let m;
while ((m = slugRegex.exec(content)) !== null) {
  slugs.add(m[1]);
}

const base = 'https://dhirendrasinghdhami.com.np';
const staticRoutes = ['/', '/digital-marketing', '/advocacy-community', '/tech-projects'];

const today = new Date().toISOString().slice(0, 10);

const urls = [];
for (const r of staticRoutes) {
  urls.push({ loc: `${base}${r}`, lastmod: today, priority: '0.9' });
}

for (const slug of Array.from(slugs)) {
  urls.push({ loc: `${base}/projects/${slug}`, lastmod: today, priority: '0.7' });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(
    (u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}\n</urlset>\n`;

fs.writeFileSync(outFile, xml, 'utf8');
console.log(`Wrote sitemap with ${urls.length} URLs to ${outFile}`);
