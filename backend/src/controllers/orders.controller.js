import { prisma } from '../lib/prisma.js';
import { ApiError } from '../middleware/errorHandler.js';
import { generateOrderNumber } from '../utils/orderNumber.js';
import {
  createOrderSchema,
  listOrdersQuerySchema,
  updateOrderStatusSchema,
} from '../validators/orders.validators.js';

// POST /api/orders — public, called from the customer-facing site at
// checkout (alongside, or instead of, the WhatsApp deep link).
export async function createOrder(req, res) {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, 'Invalid order payload', parsed.error.flatten());
  }
  const data = parsed.data;

  // Prices/totals are always computed server-side from unit prices —
  // never trusted from the client — to prevent a tampered request from
  // setting an arbitrary total.
  const items = data.items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    isVeg: item.isVeg,
    subtotal: Number((item.quantity * item.unitPrice).toFixed(2)),
  }));
  const subtotal = Number(items.reduce((sum, i) => sum + i.subtotal, 0).toFixed(2));
  const total = subtotal; // No delivery fee / tax / discount logic yet — add here when approved.

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      orderType: data.orderType,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      deliveryAddress: data.deliveryAddress,
      notes: data.notes,
      subtotal,
      total,
      items: { create: items },
    },
    include: { items: true },
  });

  res.status(201).json({ order });
}

// GET /api/orders — admin only. Filterable, paginated list for the
// dashboard's main order queue/history view.
export async function listOrders(req, res) {
  const parsed = listOrdersQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw new ApiError(400, 'Invalid query parameters', parsed.error.flatten());
  }
  const { status, orderType, search, from, to, page, pageSize } = parsed.data;

  const where = {
    ...(status ? { status } : {}),
    ...(orderType ? { orderType } : {}),
    ...(from || to
      ? {
          createdAt: {
            ...(from ? { gte: new Date(from) } : {}),
            ...(to ? { lte: new Date(to) } : {}),
          },
        }
      : {}),
    ...(search
      ? {
          OR: [
            { customerName: { contains: search } },
            { customerPhone: { contains: search } },
            { orderNumber: { contains: search } },
          ],
        }
      : {}),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.order.count({ where }),
  ]);

  res.json({
    orders,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
}

// GET /api/orders/:id — admin only. Single order detail.
export async function getOrder(req, res) {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: true },
  });
  if (!order) throw new ApiError(404, 'Order not found');
  res.json({ order });
}

// PATCH /api/orders/:id/status — admin only. Moves an order through the
// fulfillment lifecycle from the dashboard.
export async function updateOrderStatus(req, res) {
  const parsed = updateOrderStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, 'Invalid status payload', parsed.error.flatten());
  }

  const existing = await prisma.order.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, 'Order not found');

  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status: parsed.data.status },
    include: { items: true },
  });

  res.json({ order });
}
