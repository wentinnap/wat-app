import { pool } from '../db.js';

export const listNews = async (req, res) => {
  const isAdmin = req.user?.role === 'admin';
  const [rows] = await pool.execute(
    isAdmin
      ? 'SELECT * FROM news ORDER BY COALESCE(published_at, created_at) DESC'
      : 'SELECT * FROM news WHERE is_hidden=0 ORDER BY COALESCE(published_at, created_at) DESC'
  );
  res.json(rows);
};

export const createNews = async (req, res) => {
  const { title, content, cover_url, is_hidden, published_at } = req.body;
  const created_by = req.user.id;
  await pool.execute(
    'INSERT INTO news (title, content, cover_url, is_hidden, published_at, created_by) VALUES (?,?,?,?,?,?)',
    [title, content, cover_url || null, is_hidden ? 1 : 0, published_at || null, created_by]
  );
  res.json({ message: 'Created' });
};

export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, cover_url, is_hidden, published_at } = req.body;
  await pool.execute(
    `UPDATE news SET title=?, content=?, cover_url=?, is_hidden=?, published_at=?, updated_at=NOW() WHERE id=?`,
    [title, content, cover_url || null, is_hidden ? 1 : 0, published_at || null, id]
  );
  res.json({ message: 'Updated' });
};

export const deleteNews = async (req, res) => {
  const { id } = req.params;
  await pool.execute('DELETE FROM news WHERE id=?', [id]);
  res.json({ message: 'Deleted' });
};
