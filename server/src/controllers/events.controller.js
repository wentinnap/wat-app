import { pool } from '../db.js';
export const listEvents = async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM events ORDER BY start_datetime DESC');
  res.json(rows);
};
export const createEvent = async (req, res) => {
  const { title, description, location, start_datetime, end_datetime } = req.body;
  await pool.execute(
    'INSERT INTO events (title, description, location, start_datetime, end_datetime, created_by) VALUES (?,?,?,?,?,?)',
    [title, description || null, location || null, start_datetime, end_datetime, req.user.id]
  );
  res.json({ message: 'Created' });
};
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, start_datetime, end_datetime } = req.body;
  await pool.execute(
    `UPDATE events SET title=?, description=?, location=?, start_datetime=?, end_datetime=?, updated_at=NOW() WHERE id=?`,
    [title, description || null, location || null, start_datetime, end_datetime, id]
  );
  res.json({ message: 'Updated' });
};
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  await pool.execute('DELETE FROM events WHERE id=?', [id]);
  res.json({ message: 'Deleted' });
};
