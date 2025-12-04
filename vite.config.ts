
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Exposes the dev server to the local network
  },
  preview: {
    host: true, // Exposes the preview server to the local network
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
