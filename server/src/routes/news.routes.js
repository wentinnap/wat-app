import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/role.js';
import { listNews, createNews, updateNews, deleteNews } from '../controllers/news.controller.js';

const r = Router();
r.get('/', listNews);
r.post('/', requireAuth, requireRole('admin'), createNews);
r.put('/:id', requireAuth, requireRole('admin'), updateNews);
r.delete('/:id', requireAuth, requireRole('admin'), deleteNews);
export default r;
