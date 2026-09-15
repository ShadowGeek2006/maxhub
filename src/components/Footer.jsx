import { businessData, primaryBranch } from '../data/businessData'

export default function Footer() {
  return (
    <footer className="bg-brand-dark py-10 text-white/80">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-white">{businessData.name}</h3>
            <p className="mt-2 text-sm">{businessData.tagline}</p>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-white">Contact</h4>
            {/* P1 fix: reads from the same canonical businessData used by
                Branches/CTA/Navbar instead of a second hardcoded copy. */}
            <p className="text-sm">{primaryBranch.address}</p>
            <p className="mt-1 text-sm">{primaryBranch.phone}</p>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#menu" className="hover:text-white">Menu</a></li>
              <li><a href="#branches" className="hover:text-white">Branches</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {businessData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
