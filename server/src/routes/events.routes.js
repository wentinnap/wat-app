import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/role.js';
import { listEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events.controller.js';

const r = Router();
r.get('/', listEvents);
r.post('/', requireAuth, requireRole('admin'), createEvent);
r.put('/:id', requireAuth, requireRole('admin'), updateEvent);
r.delete('/:id', requireAuth, requireRole('admin'), deleteEvent);
export default r;
