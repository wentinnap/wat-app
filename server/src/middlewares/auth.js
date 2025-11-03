import { verifyToken } from '../utils/jwt.js';

export const requireAuth = (req, res, next) => {
  const bearer = req.headers.authorization;
  const token = bearer?.startsWith('Bearer ') ? bearer.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { id, role, email }
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalid/expired' });
  }
};
