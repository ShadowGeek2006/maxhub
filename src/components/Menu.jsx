import { useState } from 'react'
import SectionHeading from './SectionHeading'
import ProductCard from './ProductCard'
import { categories, menuItems } from '../data/menuData'

export default function Menu() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? menuItems : menuItems.filter((i) => i.category === active)

  return (
    <section id="menu" className="bg-brand-cream py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Our Menu" title="What We're Serving" />

        <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Menu categories">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={
                'rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red ' +
                (active === cat
                  ? 'bg-brand-red text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100')
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No items in this category yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
