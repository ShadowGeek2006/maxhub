import { primaryBranch } from '../data/businessData'

export default function CTA() {
  return (
    <section className="bg-brand-red py-16 text-center text-white">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-3xl font-bold">Hungry? Order now.</h2>
        <p className="mt-2 text-white/90">Fresh food, delivered via WhatsApp ordering.</p>
        <a
          href="#menu"
          className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold text-brand-red hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Order Now
        </a>
        <p className="mt-4 text-sm text-white/80">
          Or call {primaryBranch.phone} {/* ⚠️ verify before launch */}
        </p>
      </div>
    </section>
  )
}
