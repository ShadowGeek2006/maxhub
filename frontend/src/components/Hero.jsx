import React from 'react';
import { businessConfig } from '../data/business.js';
import { useCart } from '../hooks/useCart.js';
import { MapPin, Sparkles, Flame, Clock, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { setIsCartOpen } = useCart();

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-dark-950">
      
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-12 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Status */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-dark-900 border border-white/10 text-xs font-semibold text-gray-200 shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-brand-red" />
                <span>Madhuban • Belthara</span>
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-[10px] bg-brand-red text-white px-2 py-0.5 rounded-full font-bold uppercase">
                NOW SERVING
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08]">
              YOUR CRAVINGS. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-orange to-yellow-400">
                OUR PIZZA.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Freshly baked artisan pizzas, loaded with 100% real mozzarella cheese, rich sauces, and handpicked toppings.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <a
                href="#menu"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-dark-900 hover:bg-dark-800 text-white font-bold text-xs tracking-wide border border-white/15 flex items-center justify-center space-x-2 group transition-colors"
              >
                <span>EXPLORE MENU</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange hover:opacity-90 text-white font-bold text-xs tracking-wider shadow-xl shadow-brand-red/30 transition-all active:scale-95 flex items-center justify-center space-x-1.5"
              >
                <span>ORDER NOW</span>
                <Flame className="w-4 h-4 fill-current animate-bounce" />
              </button>
            </div>

            {/* Feature Chips */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1.5 bg-dark-900/70 border border-white/5 px-3 py-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-spin" />
                <span className="text-gray-200">Daily Fresh Dough</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-dark-900/70 border border-white/5 px-3 py-1.5 rounded-lg">
                <Flame className="w-3.5 h-3.5 text-brand-red" />
                <span className="text-gray-200">100% Real Mozzarella</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-dark-900/70 border border-white/5 px-3 py-1.5 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-green-400" />
                <span className="text-gray-200">Hot in ~20 Mins</span>
              </div>
            </div>

          </div>

          {/* Right: Rotating Pizza Plate */}
          <div className="lg:col-span-5 relative flex justify-center items-center select-none">
            
            {/* Spinning Glow */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-brand-red/25 blur-2xl animate-pulse pointer-events-none" />

            {/* Container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 group">
              
              {/* Outer Dashed Orbit Ring */}
              <div
                className="absolute -inset-3 rounded-full border-2 border-dashed border-brand-orange/40 pointer-events-none animate-spin"
                style={{ animationDuration: '40s' }}
              />

              {/* Slow 360 Rotating Pizza */}
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-white/10 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={businessConfig.images.heroPizza}
                  alt="Max Special Supreme Pizza"
                  className="w-full h-full object-cover rounded-full animate-spin"
                  style={{ animationDuration: '35s' }}
                />
              </div>

              {/* Floating Badge 1: Hot & Crispy */}
              <div className="absolute -top-2 -right-2 glass-panel px-3.5 py-2 rounded-xl border border-white/15 shadow-xl flex items-center space-x-2 animate-bounce">
                <Flame className="w-4 h-4 text-brand-red fill-current" />
                <div>
                  <span className="text-[9px] uppercase font-bold text-brand-orange block">Oven Fresh</span>
                  <span className="text-xs font-bold text-white">Hot & Crispy</span>
                </div>
              </div>

              {/* Floating Badge 2: Best Seller */}
              <div className="absolute -bottom-3 -left-2 glass-panel px-3.5 py-2 rounded-xl border border-white/15 shadow-xl animate-bounce">
                <span className="text-[9px] uppercase font-bold text-brand-orange block">BEST SELLER</span>
                <span className="text-xs font-bold text-white block">Max Special Supreme</span>
                <span className="text-[10px] font-bold text-green-400 block mt-0.5">Starting ₹189</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}