import React from 'react';
import SectionHeading from './SectionHeading.jsx';
import { businessConfig } from '../data/business.js';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { useCart } from '../hooks/useCart.js';

export default function Branches() {
  const { setIsCartOpen } = useCart();

  return (
    <section id="branches" className="py-20 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Visit Us Locally"
          title="OUR BRANCHES"
          description="Serving delicious hot pizzas right in your neighbourhood. Dine-in, takeaway, or direct WhatsApp delivery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {businessConfig.branches.map((branch) => (
            <div
              key={branch.id}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between hover:border-brand-red/40 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-red/10 text-brand-orange border border-brand-red/20">
                    {branch.isMainBranch ? "Main Branch" : "Second Branch"}
                  </span>
                  <div className="flex space-x-2">
                    {branch.features.map((feat, i) => (
                      <span key={i} className="text-[10px] bg-dark-800 text-gray-400 px-2 py-0.5 rounded">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white">{branch.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{branch.locality} • {branch.state}</p>

                <div className="mt-6 space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-start space-x-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>{branch.addressPlaceholder}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
                    <span>{branch.phonePlaceholder}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Clock className="w-5 h-5 text-brand-orange flex-shrink-0" />
                    <span>{branch.openingHoursPlaceholder}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-3">
                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-white font-bold text-xs border border-white/10 transition-colors"
                >
                  <span>GET DIRECTIONS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-brand-red hover:bg-red-600 text-white font-bold text-xs shadow-lg shadow-brand-red/25 transition-all active:scale-95"
                >
                  ORDER NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
