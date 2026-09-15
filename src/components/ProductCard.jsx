import { Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="h-40 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-brand-dark">{product.name}</h3>
          {/* P1 fix: badge now reads product.isVeg instead of always showing "100% VEG" */}
          <span
            className={
              'shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold ' +
              (product.isVeg
                ? 'border-green-600 text-green-700'
                : 'border-red-600 text-red-700')
            }
            aria-label={product.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
          >
            {product.isVeg ? 'VEG' : 'NON-VEG'}
          </span>
        </div>
        <p className="mb-3 flex-1 text-sm text-gray-600">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-brand-dark">
            {product.price != null ? `₹${product.price}` : 'Price TBD'}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex items-center gap-1 rounded-full bg-brand-red px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} aria-hidden="true" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
