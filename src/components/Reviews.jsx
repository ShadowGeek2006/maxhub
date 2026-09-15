import { Star } from 'lucide-react'
import SectionHeading from './SectionHeading'

// ⚠️ Placeholder reviews — replace with real, verifiable customer reviews
// before launch. Never publish fabricated testimonials as genuine.
const reviews = []

export default function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Testimonials" title="What Customers Say" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Real customer reviews will appear here once collected.
          </p>
        )}
        {reviews.map((r, idx) => (
          <div key={idx} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-2 flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < r.rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">{r.text}</p>
            <p className="mt-3 text-sm font-semibold text-brand-dark">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
