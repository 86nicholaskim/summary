import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 빌드 결과물을 백엔드 주방(public)으로 바로 배달
    outDir: '../backend/public',
    emptyOutDir: true, // 배달 전 기존 파일 청소
  },
});
