import { defineConfig } from 'vite';

export default defineConfig({
  base: '/EnkyShopOnline/',  // Ensure the base URL is set for GitHub Pages deployment
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
    },
  },
});

