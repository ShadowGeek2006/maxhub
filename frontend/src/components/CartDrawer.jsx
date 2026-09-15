import React, { useEffect, useRef, useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, AlertCircle, MessageCircle, Loader2 } from 'lucide-react';
import { useCart } from '../hooks/useCart.js';
import { businessConfig } from '../data/business.js';
import { sendWhatsAppOrder } from '../utils/whatsapp.js';
import { placeOrder } from '../utils/placeOrder.js';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [branchId, setBranchId] = useState(businessConfig.branches[0]?.id || 'madhuban');
  const [orderType, setOrderType] = useState('pickup');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  // P1 fix: scroll lock + Escape-to-close + focus trap + restore focus on close,
  // matching the dialog semantics below (role="dialog", aria-modal).
  useEffect(() => {
    if (!isCartOpen) return;

    previouslyFocused.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      setErrorMessage('Please enter your delivery address.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Backend integration (client-approved): create the order record first —
      // the backend is the source of truth for totals, so we never send our
      // own cartTotal. Per the handoff's integration checklist, the WhatsApp
      // confirmation is only sent AFTER the order is successfully created,
      // so we never end up with a WhatsApp message that has no backend record.
      const order = await placeOrder({
        customerName,
        customerPhone,
        orderType: orderType === 'delivery' ? 'DELIVERY' : 'PICKUP',
        deliveryAddress: orderType === 'delivery' ? address : undefined,
        notes,
        cartItems,
      });

      const result = sendWhatsAppOrder({
        cartItems,
        cartTotal,
        customerName,
        customerPhone,
        branchId,
        orderType,
        address,
        notes,
        orderNumber: order.orderNumber,
      });

      if (!result.success) {
        // Order is already saved on the backend at this point — only the
        // WhatsApp hand-off failed (e.g. placeholder phone number). Surface
        // that distinctly instead of implying the whole order failed.
        setErrorMessage(
          `Order ${order.orderNumber} was placed, but the WhatsApp message couldn't be sent: ${result.message}`
        );
        return;
      }

      // P0 fix: cart clears and drawer closes once the order has actually been
      // created on the backend and handed off to WhatsApp.
      clearCart();
      setIsCartOpen(false);
      setCustomerName('');
      setCustomerPhone('');
      setOrderType('pickup');
      setAddress('');
      setNotes('');
    } catch (err) {
      setErrorMessage(err.message || 'Could not place the order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          tabIndex={-1}
          className="w-screen max-w-md bg-dark-900 border-l border-white/10 shadow-2xl flex flex-col outline-none"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-dark-950">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-brand-orange" aria-hidden="true" />
              <h2 id="cart-drawer-title" className="text-lg font-bold text-white">Your Pizza Order</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" aria-hidden="true" />
                <p className="text-gray-400 font-medium">Your cart is empty</p>
                <p className="text-xs text-gray-500 mt-1">Add some hot pizzas from the menu!</p>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="glass-card p-3 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex-1 pr-3">
                        <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                        <span className="text-xs text-brand-orange font-semibold">₹{item.price} each</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-dark-800 rounded-lg p-1 border border-white/5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="p-1 rounded text-gray-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white" aria-live="polite">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="p-1 rounded text-gray-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="text-right">
                    <button
                      onClick={clearCart}
                      className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                    >
                      Clear All Items
                    </button>
                  </div>
                </div>

                {/* Checkout Details */}
                <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-white/10" noValidate>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    Order Information
                  </h3>

                  {errorMessage && (
                    <div role="alert" className="p-3 rounded-lg bg-red-900/30 border border-red-500/40 text-red-200 text-xs flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Branch Selection */}
                  <div>
                    <label htmlFor="cart-branch" className="block text-xs font-semibold text-gray-300 mb-1">Select Branch</label>
                    <select
                      id="cart-branch"
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
                    >
                      {businessConfig.branches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Order Type */}
                  <div>
                    <span className="block text-xs font-semibold text-gray-300 mb-1" id="order-type-label">Order Type</span>
                    <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="order-type-label">
                      <button
                        type="button"
                        onClick={() => setOrderType('pickup')}
                        aria-pressed={orderType === 'pickup'}
                        className={`py-2 text-xs font-bold rounded-lg transition-colors border ${
                          orderType === 'pickup'
                            ? "bg-brand-red/20 border-brand-red text-white"
                            : "bg-dark-800 border-white/5 text-gray-400 hover:bg-dark-700"
                        }`}
                      >
                        Takeaway / Pickup
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        aria-pressed={orderType === 'delivery'}
                        className={`py-2 text-xs font-bold rounded-lg transition-colors border ${
                          orderType === 'delivery'
                            ? "bg-brand-red/20 border-brand-red text-white"
                            : "bg-dark-800 border-white/5 text-gray-400 hover:bg-dark-700"
                        }`}
                      >
                        Home Delivery
                      </button>
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="cart-name" className="block text-xs font-semibold text-gray-300 mb-1">Your Name *</label>
                      <input
                        id="cart-name"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label htmlFor="cart-phone" className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
                      <input
                        id="cart-phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  {/* Address if Delivery */}
                  {orderType === 'delivery' && (
                    <div>
                      <label htmlFor="cart-address" className="block text-xs font-semibold text-gray-300 mb-1">Delivery Address *</label>
                      <textarea
                        id="cart-address"
                        rows={2}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House no., street, landmark..."
                        className="w-full bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  )}

                  {/* Special Notes */}
                  <div>
                    <label htmlFor="cart-notes" className="block text-xs font-semibold text-gray-300 mb-1">Special Instructions</label>
                    <input
                      id="cart-notes"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Extra oregano, less spicy, etc."
                      className="w-full bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg shadow-green-600/30 transition-all active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                          <span>Placing order…</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-5 h-5" aria-hidden="true" />
                          <span>ORDER ON WHATSAPP (₹{cartTotal})</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-gray-500 text-center mt-2">
                      Direct WhatsApp order — no online gateway fees.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
