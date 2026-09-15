import { MapPin, Phone } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { businessData } from '../data/businessData'

export default function Branches() {
  return (
    <section id="branches" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Visit Us" title="Our Branches" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {businessData.branches.map((b) => (
          <div key={b.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-brand-dark">{b.name}</h3>
            <p className="mt-2 flex items-start gap-2 text-sm text-gray-600">
              <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              {b.address}
            </p>
            <a
              href={`tel:${b.phone}`}
              className="mt-2 flex w-fit items-center gap-2 text-sm text-brand-red hover:underline"
            >
              <Phone size={16} aria-hidden="true" />
              {b.phone}
            </a>
            <p className="mt-2 text-sm text-gray-500">{b.hours}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
