import React from 'react';
import SectionHeading from './SectionHeading.jsx';
import { businessConfig } from '../data/business.js';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const highlights = [
    "Handcrafted artisan dough prepared daily",
    "100% real dairy mozzarella cheese",
    "Fresh local ingredients & custom spices",
    "Fast, hospitable, and friendly counter service",
  ];

  return (
    <section id="about" className="py-24 bg-dark-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={businessConfig.images.aboutAmbience}
                alt="Max Pizza Hub Ambience"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-left-6 glass-panel p-5 rounded-2xl border border-white/10 shadow-2xl max-w-xs">
              <p className="text-xs uppercase tracking-widest text-brand-orange font-bold">Born in U.P.</p>
              <p className="text-sm font-bold text-white mt-1">
                Bringing premium cafe-style pizza to Madhuban & Belthara.
              </p>
            </div>
          </div>

          {/* Text side */}
          <div>
            <SectionHeading
              align="left"
              subtitle="Our Story"
              title="MORE THAN JUST PIZZA."
              description="At Max Pizza Hub, we believe good food brings people closer together. Whether it's college students catching up after exams or families celebrating weekend dinners, we bake every single slice with love, generosity, and bold flavours."
            />

            <div className="space-y-3 mt-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center space-x-6">
              <div>
                <div className="text-2xl font-black text-white">Madhuban</div>
                <div className="text-xs text-gray-400">Mau, U.P.</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-black text-white">Belthara</div>
                <div className="text-xs text-gray-400">Ballia / Mau, U.P.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
