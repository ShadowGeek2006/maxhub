import React from 'react';
import SectionHeading from './SectionHeading.jsx';
import { Sparkles, Flame, Award, HeartHandshake } from 'lucide-react';
import { businessConfig } from '../data/business.js';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Sparkles,
      title: "Fresh Dough Daily",
      desc: "Slow-fermented artisan dough prepared fresh every single morning. Never frozen, always crispy outside and airy inside.",
    },
    {
      icon: Flame,
      title: "100% Real Mozzarella",
      desc: "Generous layers of premium dairy cheese ensuring the iconic golden crust and satisfying cheese pull every time.",
    },
    {
      icon: Award,
      title: "Loaded with Flavour",
      desc: "Rich custom-seasoned tomato sauces and authentic desi tandoori spices tailored to your favourite local taste buds.",
    },
    {
      icon: HeartHandshake,
      title: "Local Favourite",
      desc: "Proudly serving the community across Madhuban and Belthara with honest prices and warm hospitality.",
    },
  ];

  return (
    <section className="py-24 bg-dark-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="The Max Difference"
          title="WHY CHOOSE MAX PIZZA HUB?"
          description="We take pizza seriously so you can enjoy every single bite with family and friends."
        />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-red/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-5 text-brand-orange group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Brand Stats */}
        <div className="mt-16 glass-panel rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {businessConfig.stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <span className="text-brand-orange">{s.value}</span>
                <span className="text-brand-red">{s.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
