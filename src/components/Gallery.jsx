import { useState } from 'react'
import SectionHeading from './SectionHeading'
import Modal from './Modal'

// ⚠️ Placeholder gallery — swap for approved restaurant photography.
const images = [
  '/images/placeholder-food.svg',
  '/images/placeholder-food.svg',
  '/images/placeholder-food.svg',
  '/images/placeholder-food.svg',
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="bg-brand-cream py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Gallery" title="A Taste of What We Serve" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {images.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(src)}
              className="overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
              aria-label={`View gallery image ${idx + 1}`}
            >
              <img src={src} alt="" loading="lazy" className="h-32 w-full object-cover sm:h-40" />
            </button>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title="Gallery image">
        {active && <img src={active} alt="Enlarged gallery view" className="w-full rounded" />}
      </Modal>
    </section>
  )
}
