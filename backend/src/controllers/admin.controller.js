import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { env } from '../config/env.js';
import { ApiError } from '../middleware/errorHandler.js';
import { loginSchema } from '../validators/admin.validators.js';

// POST /api/admin/login
// There is deliberately no public registration endpoint — admin accounts
// are created via `npm run create-admin` on the server, not over HTTP.
export async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, 'Invalid login payload', parsed.error.flatten());
  }
  const { username, password } = parsed.data;

  const user = await prisma.adminUser.findUnique({ where: { username } });

  // Same generic error whether the username doesn't exist or the password
  // is wrong — don't let the response reveal which one failed.
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new ApiError(401, 'Invalid username or password');
  }

  const token = jwt.sign({ sub: user.id, username: user.username }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  res.json({ token, expiresIn: env.jwtExpiresIn, admin: { id: user.id, username: user.username } });
}

// GET /api/admin/me — lets the dashboard verify a stored token is still
// valid and fetch the current admin's identity on app load.
export async function me(req, res) {
  res.json({ admin: req.admin });
}
