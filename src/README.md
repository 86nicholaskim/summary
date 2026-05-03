### 권장 폴더 구조 (The Most Common Pattern)

src/
├── app.ts # 서버 진입점 (Express 설정 및 미들웨어 연결)
├── server.ts # 실제 서버 리슨(Listen) 로직 (배포 환경 분리용)
├── routes/ # URL 경로와 컨트롤러 연결 (API 엔드포인트 정의)
├── controllers/ # 요청(Request)을 받고 응답(Response)을 보내는 로직
├── services/ # 실제 비즈니스 로직 (DB 연산, 외부 API 호출 등 핵심 기능)
├── middlewares/ # 인증, 에러 핸들링, 로그 기록 등 공통 처리
├── models/ # 데이터베이스 스키마 또는 타입(Type/Interface) 정의
└── utils/ # 공통으로 사용하는 유틸리티 함수 (날짜 계산, 포맷팅 등)
