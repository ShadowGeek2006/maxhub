import { apiRequest } from './api.js';

// Public checkout API client — POST /api/orders (no auth).
// Per the backend handoff's "Important Integration Rules": never send
// client-calculated totals or database menu IDs — only name/quantity/unitPrice/isVeg.
export async function placeOrder({
  customerName,
  customerPhone,
  orderType,
  deliveryAddress,
  notes,
  cartItems,
}) {
  const payload = {
    customerName,
    customerPhone,
    orderType, // 'PICKUP' | 'DELIVERY'
    ...(orderType === 'DELIVERY' ? { deliveryAddress } : {}),
    ...(notes ? { notes } : {}),
    items: cartItems.map((item) => ({
      name: item.name,
      quantity: Number(item.quantity),
      unitPrice: Number(item.price),
      isVeg: Boolean(item.isVeg ?? true),
    })),
  };

  const data = await apiRequest('/api/orders', { method: 'POST', body: payload });
  return data.order;
}
