export const assetPath = (relativePath: string) => {
  // relativePath should be path under src/assets, e.g. 'hackathon-events/logo.webp' or 'civic tech.webp'
  const clean = relativePath.replace(/^\/+/, '');

  // In production, prefer optimized WebP copies under /optimized_images/
  if (import.meta.env.PROD) {
    const webp = clean.replace(/\.[^.]+$/, '.webp');
    return `/optimized_images/${webp}`;
  }

  // In dev, resolve via import.meta.url for module-relative assets
  try {
    // relative to src/lib -> go up two levels to src
    return new URL(`../assets/${clean}`, import.meta.url).href;
  } catch (e) {
    return `/src/assets/${clean}`;
  }
};
