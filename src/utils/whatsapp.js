import { businessConfig } from '../data/business.js';

export function sendWhatsAppOrder({
  cartItems,
  cartTotal,
  customerName,
  customerPhone,
  branchId,
  orderType,
  address,
  notes,
}) {
  if (!cartItems || cartItems.length === 0) {
    return { success: false, message: "Your cart is empty. Please add items before placing an order." };
  }

  const targetBranch = businessConfig.branches.find(b => b.id === branchId) || businessConfig.branches[0];
  let rawPhone = targetBranch.whatsappNumber || businessConfig.whatsappNumber || "";
  const cleanedPhone = rawPhone.replace(/[^\d]/g, "");

  if (!cleanedPhone || cleanedPhone.includes("XXXXX") || cleanedPhone.length < 10) {
    return {
      success: false,
      message: `WhatsApp orders are not active yet because the restaurant phone number is set to placeholder (${rawPhone}). Please update src/data/business.js with your real phone number.`,
    };
  }

  const itemsText = cartItems
    .map((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      return `${index + 1}. *${item.name}* x ${item.quantity} = ₹${itemSubtotal}`;
    })
    .join("\n");

  const dateStr = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text = 
`🍕 *NEW ORDER - MAX PIZZA HUB* 🍕
--------------------------------
📅 *Time:* ${dateStr}
📍 *Branch:* ${targetBranch.name}
🛵 *Order Type:* ${orderType.toUpperCase()}

👤 *Customer Details:*
• Name: ${customerName || "Customer"}
• Phone: ${customerPhone || "Not provided"}
${orderType === "delivery" ? `• Delivery Address: ${address || "Address not provided"}\n` : ""}
${notes ? `📝 *Special Instructions:* ${notes}\n` : ""}
🛒 *Items Ordered:*
${itemsText}

--------------------------------
💰 *Grand Total: ₹${cartTotal}*
--------------------------------
_Please confirm my order and share estimated preparation time. Thank you!_`;

  const encodedMessage = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  return { success: true };
}
