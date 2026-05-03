import app from './app.js'; // 확장자 .js 확인!
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// 핵심: Vercel(프로덕션) 환경이 아닐 때만 서버를 직접 실행합니다.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🛡️ Server listening on port: ${PORT} 🛡️`);
  });
}

// Vercel이 이 app 객체를 가져가서 직접 실행할 수 있게 export 합니다.
export default app;
