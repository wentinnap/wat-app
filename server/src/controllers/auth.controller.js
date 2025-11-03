import bcrypt from 'bcryptjs';
import { pool } from '../db.js';
import { signToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const { email, password, full_name } = req.body;
  if (!email || !password || !full_name) return res.status(400).json({ message: 'Missing fields' });
  const [dups] = await pool.execute('SELECT id FROM users WHERE email=?',[email]);
  if (dups.length) return res.status(409).json({ message: 'Email already in use' });
  const hash = await bcrypt.hash(password, 10);
  await pool.execute(
    'INSERT INTO users (email, password_hash, full_name) VALUES (?,?,?)',
    [email, hash, full_name]
  );
  res.json({ message: 'Registered' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.execute('SELECT * FROM users WHERE email=? AND is_active=1', [email]);
  const user = rows[0];
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  res.json({
    token,
    user: { id: user.id, role: user.role, email: user.email, full_name: user.full_name }
  });
};
