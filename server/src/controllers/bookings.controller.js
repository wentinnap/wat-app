import { pool } from '../db.js';

export const createBooking = async (req, res) => {
  const { event_id, booking_title, booking_datetime } = req.body;
  await pool.execute(
    'INSERT INTO bookings (user_id, event_id, booking_title, booking_datetime) VALUES (?,?,?,?)',
    [req.user.id, event_id || null, booking_title || null, booking_datetime]
  );
  res.json({ message: 'Booking created' });
};

export const listBookings = async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const sql = isAdmin
    ? `SELECT b.*, u.full_name FROM bookings b JOIN users u ON b.user_id=u.id ORDER BY b.created_at DESC`
    : `SELECT * FROM bookings WHERE user_id=? ORDER BY created_at DESC`;
  const params = isAdmin ? [] : [req.user.id];
  const [rows] = await pool.execute(sql, params);
  res.json(rows);
};

export const setStatus = async (req, res) => {
  const { id } = req.params;
  const { status, cancel_reason } = req.body; // confirmed|rejected|canceled
  if (!['confirmed','rejected','canceled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  await pool.execute(
    `UPDATE bookings SET status=?, cancel_reason=?, canceled_at = IF(?='canceled', NOW(), NULL), updated_at=NOW() WHERE id=?`,
    [status, cancel_reason || null, status, id]
  );
  res.json({ message: 'Status updated' });
};
