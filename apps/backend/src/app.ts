import express from 'express';
import type { Request, Response, Express } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is Running!' });
});

// 정적 파일 서빙 설정 (현재 폴더 기준 public 폴더 연결)
app.use(express.static('public'));

export default app; // server.ts에서 사용할 수 있도록 내보내기
