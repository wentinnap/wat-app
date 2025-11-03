import { pool } from '../db.js';
export const listUsers = async (req, res) => {
  const [rows] = await pool.execute('SELECT id, email, full_name, role, is_active, created_at FROM users ORDER BY created_at DESC');
  res.json(rows);
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { role, is_active } = req.body;
  await pool.execute('UPDATE users SET role=?, is_active=? WHERE id=?', [role, is_active ? 1 : 0, id]);
  res.json({ message: 'Updated' });
};
