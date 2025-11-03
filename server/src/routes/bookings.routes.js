import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/role.js';
import { createBooking, listBookings, setStatus } from '../controllers/bookings.controller.js';

const r = Router();
r.get('/', requireAuth, listBookings);
r.post('/', requireAuth, createBooking);
r.put('/:id/status', requireAuth, requireRole('admin'), setStatus);
export default r;
