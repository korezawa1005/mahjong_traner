import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // Docker 内からもアクセス可
    port: 8000,        // コンテナ内 3000 → ホスト 8000 で公開
    proxy: {
      // API を Rails へパススルー
      '/api': {
        target: 'http://back:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});