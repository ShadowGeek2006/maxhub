import { useState } from 'react'
import { Menu as MenuIcon, ShoppingCart, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { businessData } from '../data/businessData'

const links = [
  { href: '#menu', label: 'Menu' },
  { href: '#offers', label: 'Offers' },
  { href: '#branches', label: 'Branches' },
  { href: '#about', label: 'About' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#gallery', label: 'Gallery' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, setIsOpen } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-red focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Main navigation">
        <a href="#top" className="text-lg font-bold text-brand-dark">
          {businessData.name}
        </a>

        <ul className="hidden gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-gray-700 hover:text-brand-red">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative rounded-full p-2 text-brand-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red"
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <ShoppingCart size={22} aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-red px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            className="rounded p-2 text-brand-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <MenuIcon size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <ul className="flex flex-col gap-1 border-t border-gray-100 px-4 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
