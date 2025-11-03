import { pool } from '../db.js';

export const logPageView = async (req, res, next) => {
  if (req.method !== 'GET') return next();
  const path = req.path;
  try {
    await pool.execute(
      'INSERT INTO page_views (user_id, path, ip, ua) VALUES (?,?,?,?)',
      [req.user?.id || null, path, req.ip, req.headers['user-agent']?.slice(0,255)]
    );
  } catch (e) { /* ignore */ }
  next();
};
