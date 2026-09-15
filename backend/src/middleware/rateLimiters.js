import rateLimit from 'express-rate-limit';

// Public order-creation endpoint: generous enough for real customers
// placing a few orders, tight enough to blunt scripted abuse/spam.
export const orderLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many orders from this device. Please try again shortly.' },
});

// Admin login: strict, to slow down credential brute-forcing.
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});
