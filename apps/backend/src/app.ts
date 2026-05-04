import express from 'express';
import type { Request, Response, Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app: Express = express();

// 💡 ESM 환경에서 __dirname을 안전하게 추출
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 💡 Vercel 배포 환경과 로컬 환경 모두에서 작동하도록 'public' 경로 최적화
// 보통 빌드된 파일은 dist와 같은 뎁스인 ../public에 위치하게 됩니다.
const publicPath = path.resolve(__dirname, '../public');

app.use(express.json());

// 1. 정적 파일 서빙
app.use(express.static(publicPath));

// 2. API 경로
app.get('/api/status', (req: Request, res: Response) => {
  res.json({ message: 'Backend is healthy!' });
});

// 3. SPA 대응 (Express v5 규격 준수)
// '/*'는 모든 경로를 매칭하며 index.html을 반환합니다.
app.get('/\/.*\/', (req: Request, res: Response) => {
  const indexPath = path.join(publicPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // 파일이 없을 경우를 대비한 에러 핸들링
      res.status(404).send('Front-end build files not found.');
    }
  });
});

export default app;
