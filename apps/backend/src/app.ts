import express from 'express';
import type { Request, Response, Express } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is Running!' });
});

export default app; // server.ts에서 사용할 수 있도록 내보내기
