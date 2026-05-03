🛠️ GitHub Actions 설정 방법
프로젝트 루트에 아래 경로대로 폴더와 파일을 만드세요.
(.github 폴더 앞에 점.이 붙는 것에 주의하세요!)

**경로**: .github/workflows/ci.yml

```yaml
name: CI (Remote Build & Lint)

# 언제 실행할지 결정
on:
  push:
    branches: [main] # main 브랜치에 코드가 올라올 때
  pull_request:
    branches: [main] # main 브랜치로 합쳐달라는 요청이 올 때

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
