#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Generates public/sitemap.xml from routes and project slugs.

const ROOT = path.resolve(process.cwd());
const dataFile = path.join(ROOT, 'src', 'data', 'projectDetails.ts');
const outFile = path.join(ROOT, 'public', 'sitemap.xml');

if (!fs.existsSync(dataFile)) {
  console.error('projectDetails.ts not found; aborting sitemap generation.');
  process.exit(1);
}

const content = fs.readFileSync(dataFile, 'utf8');

// Extract project slugs.
const slugRegex = /slug:\s*"([^"]+)"/g;
const slugs = [];
let m;
while ((m = slugRegex.exec(content)) !== null) {
  slugs.push(m[1]);
}

const base = 'https://dhirendrasinghdhami.com.np';
const staticRoutes = [
  { path: '/',                    priority: '1.0' },
  { path: '/about',               priority: '0.8' },
  { path: '/projects',            priority: '0.9' },
  { path: '/digital-marketing',   priority: '0.8' },
  { path: '/advocacy-community',  priority: '0.8' },
  { path: '/tech-projects',       priority: '0.8' },
];

const urls = [];
// Omit lastmod: build time is not necessarily the date a page's content changed.
for (const r of staticRoutes) {
  urls.push({ loc: `${base}${r.path}`, priority: r.priority });
}
for (const slug of slugs) {
  urls.push({ loc: `${base}/projects/${slug}`, priority: '0.7' });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(
    (u) => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}\n</urlset>\n`;

fs.writeFileSync(outFile, xml, 'utf8');
console.log(`Wrote sitemap with ${urls.length} URLs to ${outFile}`);
