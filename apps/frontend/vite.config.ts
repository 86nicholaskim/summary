import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 빌드 결과물을 백엔드 주방(public)으로 바로 배달
    outDir: '../backend/public',
    emptyOutDir: true, // 배달 전 기존 파일 청소
    // 소스맵 활성화 (기본값: false)
    sourcemap: true,
  },
  // 개발 서버 실행 시 CSS 소스맵이 필요한 경우
  css: {
    devSourcemap: true,
  },
});
