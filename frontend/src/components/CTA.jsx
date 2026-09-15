import React from 'react';
import { businessConfig } from '../data/business.js';
import { useCart } from '../hooks/useCart.js';

export default function CTA() {
  const { setIsCartOpen } = useCart();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${businessConfig.images.ctaBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/95 to-dark-950/80" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-red text-white shadow-lg shadow-brand-red/30 mb-4">
          Hot & Fresh
        </span>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          READY FOR YOUR NEXT CRAVING?
        </h2>

        <p className="mt-4 text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Whether you want a hot pizza for dine-in or a doorstep delivery in Madhuban & Belthara, we are ready to bake.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-800 hover:bg-dark-700 text-white font-bold text-sm tracking-wide border border-white/10 transition-colors"
          >
            VIEW MENU
          </a>
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-red hover:bg-red-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-brand-red/30 transition-all active:scale-95"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </section>
  );
}
