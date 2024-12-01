import { defineConfig } from 'vite';

export default defineConfig({
  base: '/EnkyShopOnline/',  // Ensure that this is set for GitHub Pages deployment
  build: {
    outDir: 'dist',  // Output directory
    rollupOptions: {
      input: './index.html',  // Main entry point for the build
    },
  },
});

