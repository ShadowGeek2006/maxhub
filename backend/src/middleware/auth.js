import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

// Protects admin-only routes. Expects: Authorization: Bearer <token>
export function requireAdminAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.admin = { id: payload.sub, username: payload.username };
    next();
  } catch {
    // Deliberately generic — don't reveal whether the token was expired,
    // malformed, or forged.
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
