import { Router } from 'express';
import { getHealth } from '../controllers/health.controller';

const router = Router();

/* ── Health Check ── */
router.get('/health', getHealth);

export default router;
