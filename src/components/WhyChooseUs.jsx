import { Clock, Leaf, Truck, Star } from 'lucide-react'
import SectionHeading from './SectionHeading'

const points = [
  { icon: Clock, title: 'Fast Service', desc: 'Hot food, quickly prepared.' },
  { icon: Leaf, title: 'Fresh Ingredients', desc: 'Made fresh, every order.' },
  { icon: Truck, title: 'Easy Ordering', desc: 'Order in a few taps via WhatsApp.' },
  { icon: Star, title: 'Local Favorite', desc: 'Trusted by regulars in the area.' },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-cream py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Why Us" title="Why Choose Max Pizza Hub" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl bg-white p-6 text-center shadow-sm">
              <Icon className="mx-auto mb-3 text-brand-red" size={32} aria-hidden="true" />
              <h3 className="font-semibold text-brand-dark">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
