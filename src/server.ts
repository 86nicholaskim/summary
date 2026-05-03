import app from './app'; // 확장자 .js 주의 (nodenext/bundler 환경)
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// 서버 실행 로직만 담당
const server = app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT} 🛡️
  ################################################
  `);
});

// 예기치 못한 에러 핸들링
process.on('unhandledRejection', (err) => {
  console.log('Error: ', err);
  server.close(() => process.exit(1));
});
