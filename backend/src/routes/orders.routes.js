import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { orderLimiter } from '../middleware/rateLimiters.js';
import {
  createOrder,
  listOrders,
  getOrder,
  updateOrderStatus,
} from '../controllers/orders.controller.js';

const router = Router();

// Public — called from the customer-facing checkout flow.
router.post('/', orderLimiter, asyncHandler(createOrder));

// Admin dashboard only.
router.get('/', requireAdminAuth, asyncHandler(listOrders));
router.get('/:id', requireAdminAuth, asyncHandler(getOrder));
router.patch('/:id/status', requireAdminAuth, asyncHandler(updateOrderStatus));

export default router;
