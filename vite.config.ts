import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Image optimization during build (optional dev dependency: vite-plugin-imagemin)
let viteImagemin: any;
try {
  // require dynamically so dev server continues if plugin isn't installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  viteImagemin = require('vite-plugin-imagemin');
} catch (e) {
  viteImagemin = null;
}

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  const plugins: any[] = [react()];

  if (isBuild && viteImagemin) {
    plugins.push(
      viteImagemin({
        gifsicle: { optimizationLevel: 7, interlaced: false },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 75 },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        svgo: {
          plugins: [
            { name: 'removeViewBox', active: false },
            { name: 'removeEmptyAttrs', active: false },
          ],
        },
        webp: { quality: 75 },
      }),
    );
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "es2019",
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            motion: ["framer-motion"],
            query: ["@tanstack/react-query"],
          },
        },
      },
    },
  };
});
