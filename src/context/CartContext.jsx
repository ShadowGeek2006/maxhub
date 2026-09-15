import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'maxhub_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage can fail (private mode, quota) — cart still works in-memory
    }
  }, [items])

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }]
    })
    setIsOpen(true)
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  // P0 fix: called after a successful WhatsApp order hand-off so the cart
  // empties and the drawer closes instead of lingering with stale items.
  function clearCartAndClose() {
    setItems([])
    setIsOpen(false)
  }

  const total = useMemo(
    () => items.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0),
    [items]
  )
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  const value = {
    items,
    isOpen,
    setIsOpen,
    addItem,
    updateQty,
    removeItem,
    clearCartAndClose,
    total,
    count,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
