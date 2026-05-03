# SUMMARY NOTE

> AI가 알려주는 것들을 하나씩 해보기

웹 어플리케이션에 대한 학습자료 정리.
훑어보기 등 놀이터

## 유형별 사용패턴 정리

> 깃헙 / 깃헙액션 / 기타 클라우드 서비스

---

# 🌐 Architect Log: Monorepo Full-Stack System

본 프로젝트는 **Turbo v2**를 중심으로 구축된 고성능 모노레포 아키텍처입니다. 백엔드의 견고함과 프론트엔드의 유연함을 하나의 파이프라인으로 통합 관리합니다.

## 🏗️ 시스템 아키텍처 (Monorepo)

```text
summary/ (Root)
├── apps/
│   ├── backend/        # Node.js + Rollup + Express (API Server)
│   └── frontend/       # Vite + React + Lexical (Editor Client)
├── package.json        # 전역 개발 도구 및 통합 스크립트
├── turbo.json          # Turbo v2 빌드/실행 파이프라인 설정
└── pnpm-workspace.yaml # 워크스페이스 관리 정의
```

## 🚀 핵심 기술 스택

| 구분         | 기술 스택                                                            |
| :----------- | :------------------------------------------------------------------- |
| **Common**   | pnpm Workspace, Turbo v2, TypeScript, ESLint, Prettier               |
| **Backend**  | Node.js, Express, Rollup, Nodemon, dotenv                            |
| **Frontend** | React, Vite, Lexical Editor, Lucide React, CSS Variables (Dark Mode) |
| **Infra**    | GitHub Actions (CI), Vercel (CD)                                     |

## 🛠️ 주요 실행 명령어

최상위 루트 폴더에서 모든 제어가 가능합니다.

```bash
# 1. 의존성 설치 및 워크스페이스 동기화
pnpm install

# 2. 전체 프로젝트 통합 빌드 (backend & frontend)
pnpm build

# 3. 통합 개발 모드 실행 (백엔드와 프론트엔드 동시 기동)
pnpm dev

# 4. 전체 프로젝트 품질 검사 (Type-check & Lint)
pnpm turbo run type-check lint
```

## 🔄 워크플로우 (CI/CD)

1. **Local Development**: 루트에서 `pnpm dev`로 백/프론트 동시 개발.
2. **Quality Gate (CI)**: GitHub Push 시 GitHub Actions가 모든 앱의 빌드/린트/타입을 병렬 검수.
3. **Automated Deploy (CD)**: 검증 완료 시 Vercel을 통해 실시간 배포.
   - **Backend**: `https://vercel.app`
   - **Frontend**: `https://vercel.app`

## 📝 관리 포인트

- **Data**: 현재 백엔드에서 CSV/JSON 기반 Mock Data 서빙 중. (향후 MySQL 확장 가능 구조)
- **Editor**: Meta의 **Lexical** 프레임워크를 탑재하여 고수준의 Rich Text 편집 지원.
- **Theme**: CSS 변수 기반의 **다크모드(Dark Mode)** 기본 지원.
