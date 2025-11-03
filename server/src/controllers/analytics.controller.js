import { pool } from '../db.js';

export const dailyActiveUsers = async (req, res) => {
  const [rows] = await pool.execute(`
    SELECT DATE(viewed_at) as day,
           COUNT(DISTINCT IFNULL(user_id, CONCAT(ip,'|',DATE(viewed_at)))) as dau,
           COUNT(*) as pageviews
    FROM page_views
    GROUP BY DATE(viewed_at)
    ORDER BY day DESC
    LIMIT 30
  `);
  res.json(rows);
};
