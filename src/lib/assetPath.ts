export const assetPath = (relativePath: string) => {
  // relativePath should be path under src/assets, e.g. 'tech-projects/hackathon.webp' or 'digital-marketing-icons/civic-tech.webp'
  const clean = relativePath.replace(/^\/+/, '').replace(/\\/g, '/');
  const normalized = clean.split('?')[0].split('#')[0];
  const webpPath = normalized.endsWith('.webp')
    ? normalized
    : normalized.replace(/\.[^.]+$/, '.webp');

  // In production, prefer optimized WebP copies under /optimized_images/
  if (import.meta.env.PROD) {
    return `/optimized_images/${webpPath}`;
  }

  // In dev, resolve via import.meta.url for module-relative assets
  try {
    // relative to src/lib -> go up two levels to src
    return new URL(`../assets/${normalized}`, import.meta.url).href;
  } catch (e) {
    return `/src/assets/${normalized}`;
  }
};
