import express from 'express';
import type { Request, Response, Express } from 'express';
import path from 'path';

const app: Express = express();

// 1. 현재 실행 경로(apps/backend) 기준 public 폴더 위치 설정
// 상대 경로(../) 없이 현재 폴더의 public을 바로 바라봅니다.
const publicPath = path.join(process.cwd(), 'public');

// 2. 미들웨어 설정
app.use(express.json());

// 3. 정적 파일 서빙 (프론트엔드 빌드 파일들)
app.use(express.static(publicPath));

// 4. API 경로 설정
app.get('/api/status', (req: Request, res: Response) => {
  res.json({ message: 'Backend is healthy!' });
});

// 5. SPA 대응: API 외의 모든 요청은 index.html로 보냄
// __dirname 대신 고정된 publicPath를 사용하여 혼선을 방지합니다.
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

export default app;
