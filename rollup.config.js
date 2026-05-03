// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/app.ts', // 진입점
  output: {
    dir: 'dist',
    format: 'es', // nodenext에 맞게 ES 모듈로 출력
    sourcemap: true,
  },
  plugins: [
    resolve({ exportConditions: ['node'] }), // Node.js 내장 모듈 및 패키지 해석
    commonjs(), // CommonJS 패키지를 ESM으로 변환
    typescript({
      // 1. 기존 tsconfig.json 파일을 그대로 읽어옵니다.
      tsconfig: './tsconfig.json',

      // 2. 하지만 빌드 시에는 'noEmit: true'를 무시하고
      // 실제 .js 파일을 생성해야 하므로 이 부분만 오버라이드합니다.
      noEmit: false,

      // 3. 컴파일 결과물이 저장될 위치 명시
      outDir: 'dist',
      declaration: true,
      declarationDir: 'dist/types',
    }), // TS 설정 적용
  ],
  // node_modules의 외부 라이브러리는 번들에 포함하지 않고 런타임에 불러오도록 설정
  external: ['express', 'dotenv'],
};
