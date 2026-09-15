import { z } from 'zod';

const orderItemSchema = z.object({
  name: z.string().trim().min(1).max(120),
  quantity: z.number().int().positive().max(50),
  unitPrice: z.number().nonnegative().max(100000),
  isVeg: z.boolean().optional().default(true),
});

export const createOrderSchema = z
  .object({
    customerName: z.string().trim().min(1).max(120),
    // Kept as a loose string (not a strict phone regex) since local phone
    // formats vary; server just needs a contactable value.
    customerPhone: z.string().trim().min(6).max(20),
    orderType: z.enum(['PICKUP', 'DELIVERY']),
    deliveryAddress: z.string().trim().min(1).max(300).optional(),
    notes: z.string().trim().max(500).optional(),
    items: z.array(orderItemSchema).min(1).max(50),
  })
  .refine((data) => data.orderType !== 'DELIVERY' || !!data.deliveryAddress, {
    message: 'deliveryAddress is required when orderType is DELIVERY',
    path: ['deliveryAddress'],
  });

export const listOrdersQuerySchema = z.object({
  status: z.enum(['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED']).optional(),
  orderType: z.enum(['PICKUP', 'DELIVERY']).optional(),
  search: z.string().trim().max(120).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().max(100).optional().default(20),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED']),
});
