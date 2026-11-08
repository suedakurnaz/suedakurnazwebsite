import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`        → normal production build in dist/ (deploy this)
// `npm run build:single` → one self-contained HTML file in dist-single/ (for previews)
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: mode === 'single' ? { outDir: 'dist-single' } : { outDir: 'dist', assetsInlineLimit: 0 }
}));
