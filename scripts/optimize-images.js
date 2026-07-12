#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd());
const assetsDir = path.join(ROOT, 'src', 'assets');
const outDir = path.join(ROOT, 'public', 'optimized_images');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function isImage(file) {
  return /\.(jpe?g|png|webp|avif)$/i.test(file);
}

async function processFile(srcPath, relPath) {
  const destDir = path.join(outDir, path.dirname(relPath));
  ensureDir(destDir);
  const srcFull = path.join(assetsDir, relPath);
  const destWebp = path.join(destDir, path.basename(relPath).replace(/\.[^.]+$/, '.webp'));

  try {
    await sharp(srcFull)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(destWebp);
    console.log(`Optimized: ${relPath} -> ${path.relative(ROOT, destWebp)}`);
  } catch (err) {
    console.error('Failed to process', relPath, err.message || err);
  }
}

function walk(dir, base = '') {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p, path.join(base, name));
    } else if (stat.isFile() && isImage(name)) {
      processFile(p, path.join(base, name));
    }
  }
}

ensureDir(outDir);

if (!fs.existsSync(assetsDir)) {
  console.error('No assets directory found at', assetsDir);
  process.exit(1);
}

console.log('Starting image optimization (outputs to public/optimized_images/)');
walk(assetsDir);
