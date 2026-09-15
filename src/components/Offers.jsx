import React from 'react';
import SectionHeading from './SectionHeading.jsx';
import { sampleOffers } from '../data/offers.js';
import { Tag } from 'lucide-react';
import { useCart } from '../hooks/useCart.js';

export default function Offers() {
  const { setIsCartOpen } = useCart();

  return (
    <section id="offers" className="py-20 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Special Deals"
          title="DEALS & COMBOS"
          description="Pocket-friendly pizza specials designed for students, weekend family gatherings, and cheese lovers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleOffers.map((offer) => (
            <div
              key={offer.id}
              className={`p-6 sm:p-8 rounded-2xl glass-card bg-gradient-to-br ${offer.accentColor} border ${offer.borderGlow} flex flex-col justify-between transition-all hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-white">
                    {offer.badge}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold bg-dark-950/80 px-2.5 py-1 rounded border border-white/10 text-brand-orange">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{offer.promoCode}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">{offer.title}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-cream">{offer.tagline}</p>
                <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Sample offer for demo</span>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white text-dark-950 font-bold text-xs hover:bg-brand-cream transition-colors active:scale-95"
                >
                  Order on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
