# SUMMARY NOTE

> AI가 알려주는 것들을 하나씩 해보기

웹 어플리케이션에 대한 학습자료 정리.
훑어보기 등 놀이터

## 유형별 사용패턴 정리

> 깃헙 / 깃헙액션 / 기타 클라우드 서비스

---

# 라이브러리 조합 패턴 트렌드 정리

# 📦 모노레포(Monorepo) 통합 관리 체계

본 시스템은 **Turbo v2**를 중심으로 백엔드와 프론트엔드를 하나의 유기적인 파이프라인으로 관리합니다.

## 📁 폴더 구조

- `apps/backend`: 기존 Node.js + Rollup 서버 로직
- `apps/frontend`: 신규 Vite + React + Lexical 클라이언트
- `package.json`: 공통 개발 도구(Turbo, ESLint 등) 관리

## 🚀 주요 워크플로우

1. **로컬 개발**: 루트에서 `pnpm dev` 실행 시 백/프론트 동시 기동.
2. **품질 검사 (CI)**: GitHub Actions에서 `pnpm turbo run type-check lint build` 단 한 줄로 모든 앱을 병렬 검토.
3. **배포 (CD)**: Vercel에서 `Root Directory`를 각 앱으로 지정하여 독립 배포.

## 🛠️ 핵심 도구 업데이트 (Turbo v2)

- `pipeline` 필드가 **`tasks`**로 변경됨.
- 각 앱의 `package.json` 스크립트 이름을 통일하여 통합 관리 효율 극대화.
