import { useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { primaryBranch } from '../data/businessData'
import { buildWhatsAppOrderLink } from '../utils/whatsapp'
import Modal from './Modal'

// P1 decision (documented, not left implicit): phone is REQUIRED at
// checkout — the order is placed over WhatsApp and the business needs a
// callback number if the WhatsApp account itself isn't reachable.
export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, total, clearCartAndClose } = useCart()
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', notes: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    if (!customer.name.trim()) next.name = 'Name is required.'
    if (!customer.phone.trim()) next.phone = 'Phone number is required.'
    else if (!/^\d{10}$/.test(customer.phone.trim())) next.phone = 'Enter a valid 10-digit phone number.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleCheckout(e) {
    e.preventDefault()
    if (items.length === 0) return
    if (!validate()) return

    const link = buildWhatsAppOrderLink({
      whatsappNumber: primaryBranch.whatsapp,
      customer,
      items,
      branchName: primaryBranch.name,
    })

    window.open(link, '_blank', 'noopener,noreferrer')

    // P0 fix: cart clears and drawer closes once the order has been
    // handed off to WhatsApp, instead of leaving stale items behind.
    clearCartAndClose()
    setCustomer({ name: '', phone: '', address: '', notes: '' })
  }

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Your Cart" side>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <p className="font-medium text-brand-dark">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.price != null ? `₹${item.price} each` : 'Price TBD'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="rounded-full border border-gray-200 p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-red"
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus size={14} aria-hidden="true" />
                  </button>
                  <span aria-live="polite" className="w-6 text-center text-sm">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="rounded-full border border-gray-200 p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-red"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus size={14} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-right font-semibold text-brand-dark">Total: ₹{total}</p>

          <form onSubmit={handleCheckout} className="flex flex-col gap-3" noValidate>
            <div>
              <label htmlFor="cust-name" className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="cust-name"
                type="text"
                value={customer.name}
                onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'cust-name-error' : undefined}
              />
              {errors.name && (
                <p id="cust-name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="cust-phone" className="mb-1 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                id="cust-phone"
                type="tel"
                value={customer.phone}
                onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'cust-phone-error' : undefined}
              />
              {errors.phone && (
                <p id="cust-phone-error" className="mt-1 text-xs text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="cust-address" className="mb-1 block text-sm font-medium text-gray-700">
                Delivery address (optional)
              </label>
              <textarea
                id="cust-address"
                rows={2}
                value={customer.address}
                onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
              />
            </div>

            <div>
              <label htmlFor="cust-notes" className="mb-1 block text-sm font-medium text-gray-700">
                Notes (optional)
              </label>
              <input
                id="cust-notes"
                type="text"
                value={customer.notes}
                onChange={(e) => setCustomer((c) => ({ ...c, notes: e.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-brand-red px-4 py-2.5 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
            >
              Order via WhatsApp
            </button>
          </form>
        </div>
      )}
    </Modal>
  )
}
