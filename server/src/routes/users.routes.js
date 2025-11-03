import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/role.js';
import { listUsers, updateUser } from '../controllers/users.controller.js';

const r = Router();
r.get('/', requireAuth, requireRole('admin'), listUsers);
r.put('/:id', requireAuth, requireRole('admin'), updateUser);
export default r;
