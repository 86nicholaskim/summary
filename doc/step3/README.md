# 🌐 웹사이트 관리 전체 워크플로우 요약 (Full-Stack Pipeline)

본 프로젝트는 현대적 빌드 시스템(Turbo/Rollup), 엄격한 품질 관리(CI), 무중단 자동 배포(CD)를 통합하여 설계자의 의도가 사용자에게 안전하게 전달되도록 구성되었습니다.

### 1단계: 설계 및 로컬 개발 (Prep & Cooking)

- 환경: pnpm + TypeScript + ESM 기반의 고성능 환경.
- 빌드: Turbo의 캐싱과 Rollup의 번들링 최적화를 결합하여 빌드 속도 극대화.
- 구조: Layered Architecture (Route -> Controller -> Service)를 적용하여 SaaS 급 유지보수성 확보.
- 품질: VSCode와 연동된 ESLint(v8) 및 Prettier로 실시간 코드 정돈.

### 2단계: 지속적 통합 (CI: Automated Inspection)

- 도구: GitHub Actions (.github/workflows/ci.yml).
- 검역: 모든 push 및 PR 시 원격 리눅스 환경에서 아래 과정을 자동 수행

1. Install: 락파일 기반의 깨끗한 의존성 설치
2. Type-check: tsc --noEmit으로 정적 타입 안정성 검증
3. Lint: 코드 컨벤션 위반 여부 확인
4. Build: 최종 번들링 성공 여부 확인.

#### 🛠️ GitHub Actions 설정 방법

프로젝트 루트에 아래 경로대로 폴더와 파일을 만드세요.
(.github 폴더 앞에 점.이 붙는 것에 주의하세요!)

**경로**: .github/workflows/ci.yml

```yaml
name: CI (Remote Build & Lint)

# 언제 실행할지 결정
on:
  push:
    branches: [master] # master 브랜치에 코드가 올라올 때
  pull_request:
    branches: [master] # master 브랜치로 합쳐달라는 요청이 올 때

jobs:
  build-and-test:
    runs-on: ubuntu-latest # 깨끗한 리눅스 환경 빌려오기

    steps:
      # 1. 깃허브 서버로 내 코드 가져오기
      - name: Checkout code
        uses: actions/checkout@v4

      # 2. pnpm 설치 (우리가 사용하는 패키지 매니저)
      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      # 3. Node.js 환경 설정
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm' # 빌드 속도를 위해 pnpm 캐시 사용

      # 4. 의존성 설치
      - name: Install dependencies
        run: pnpm install

      # 5. 타입 체크 (타입스크립트 규칙 검사)
      - name: Type check
        run: pnpm type-check

      # 6. 린트 체크 (코드 스타일 검사)
      - name: Lint check
        run: pnpm lint

      # 7. 리모트 빌드 실행 (최종 빌드 확인)
      - name: Remote Build
        run: pnpm build
```

### 3단계: 지속적 배포 (CD: Serving)

- 도구: Vercel (Serverless Infrastructure).
- 연동: GitHub master 브랜치 병합 시 즉시 배포.
- 설정: vercel.json을 통해 서버리스 환경에 최적화된 엔트리 포인트(src/server.ts) 지정.
- 결과: 전 세계 어디서든 접속 가능한 https://... 기반의 프로덕션 주소 확보.

### 4단계: 브랜치 보호 및 운영 (Governance)

- 규칙: Branch Protection Rules 적용

1. master 브랜치 직접 Push 금지 (PR 필수)
2. CI(build-and-test) 통과 필수 (Status Check)
3. 리뷰 대화 해결(Conversation Resolution) 필수.

- 효과: 1인 개발이라도 시스템적 강제성을 부여하여 '실수 없는 배포' 구현.
