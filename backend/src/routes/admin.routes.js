import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimiters.js';
import { login, me } from '../controllers/admin.controller.js';

const router = Router();

router.post('/login', loginLimiter, asyncHandler(login));
router.get('/me', requireAdminAuth, asyncHandler(me));

export default router;
