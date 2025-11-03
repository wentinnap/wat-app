import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/role.js';
import { dailyActiveUsers } from '../controllers/analytics.controller.js';

const r = Router();
r.get('/dau', requireAuth, requireRole('admin'), dailyActiveUsers);
export default r;
