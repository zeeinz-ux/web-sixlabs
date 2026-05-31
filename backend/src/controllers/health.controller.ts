import { Request, Response } from 'express';
import { env } from '../config/env';

/* ─────────────────────────────────────────
   Health Check Controller
   ───────────────────────────────────────── */

export const getHealth = (_req: Request, res: Response) => {
  const healthData = {
    status: 'ok',
    service: 'sixlabs-backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    version: '1.0.0',
  };

  res.status(200).json({
    success: true,
    data: healthData,
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
};
