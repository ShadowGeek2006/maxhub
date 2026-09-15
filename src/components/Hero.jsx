import { businessData } from '../data/businessData'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-dark text-white">
      <img
        src="/images/placeholder-hero.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-24 sm:py-32">
        <h1 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">
          {businessData.name}
        </h1>
        <p className="max-w-md text-lg text-white/90">{businessData.tagline}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#menu"
            className="rounded-full bg-brand-red px-6 py-3 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            View Menu
          </a>
          <a
            href="#branches"
            className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Find a Branch
          </a>
        </div>
      </div>
    </section>
  )
}
