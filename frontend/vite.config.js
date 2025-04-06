import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false // Disable source maps
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
