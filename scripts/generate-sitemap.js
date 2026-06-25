#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Generates public/sitemap.xml from routes and project slugs.
// Digital-marketing project detail pages are excluded — they are not
// surfaced in the /projects listing and should not be indexed.

const ROOT = path.resolve(process.cwd());
const dataFile = path.join(ROOT, 'src', 'data', 'projectDetails.ts');
const outFile = path.join(ROOT, 'public', 'sitemap.xml');

if (!fs.existsSync(dataFile)) {
  console.error('projectDetails.ts not found; aborting sitemap generation.');
  process.exit(1);
}

const content = fs.readFileSync(dataFile, 'utf8');

// Extract (slug, serviceSlug) pairs — serviceSlug follows slug within each entry block.
const pairRegex = /slug:\s*"([^"]+)"[\s\S]*?serviceSlug:\s*"([^"]+)"/g;
const slugs = [];
let m;
while ((m = pairRegex.exec(content)) !== null) {
  if (m[2] !== 'digital-marketing') {
    slugs.push(m[1]);
  }
}

const base = 'https://dhirendrasinghdhami.com.np';
const staticRoutes = [
  { path: '/',                    priority: '1.0' },
  { path: '/projects',            priority: '0.9' },
  { path: '/digital-marketing',   priority: '0.8' },
  { path: '/advocacy-community',  priority: '0.8' },
  { path: '/tech-projects',       priority: '0.8' },
];

const today = new Date().toISOString().slice(0, 10);

const urls = [];
for (const r of staticRoutes) {
  urls.push({ loc: `${base}${r.path}`, lastmod: today, priority: r.priority });
}
for (const slug of slugs) {
  urls.push({ loc: `${base}/projects/${slug}`, lastmod: today, priority: '0.7' });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(
    (u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}\n</urlset>\n`;

fs.writeFileSync(outFile, xml, 'utf8');
console.log(`Wrote sitemap with ${urls.length} URLs to ${outFile}`);
