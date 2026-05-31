import app from './app';
import { env } from './config/env';

/* ─────────────────────────────────────────
   Server Entry Point
   ───────────────────────────────────────── */

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 SixLabs Backend running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${env.FRONTEND_URL}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/v1/health`);
});
