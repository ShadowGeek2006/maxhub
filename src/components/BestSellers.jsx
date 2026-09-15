import SectionHeading from './SectionHeading'
import ProductCard from './ProductCard'
import { menuItems, bestSellerIds } from '../data/menuData'

export default function BestSellers() {
  const items = menuItems.filter((i) => bestSellerIds.includes(i.id))

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Fan favorites" title="Best Sellers" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  )
}
