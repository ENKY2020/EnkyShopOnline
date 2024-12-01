import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/EnkyShopOnline/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './src/main.tsx', // Update to the correct entry point
    },
    outDir: 'dist', // Ensure output directory
    emptyOutDir: true,
  },
});

