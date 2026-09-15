import React from 'react';
import SectionHeading from './SectionHeading.jsx';
import ProductCard from './ProductCard.jsx';
import { menuItems } from '../data/menu.js';
import { ArrowRight } from 'lucide-react';

export default function BestSellers() {
  const bestSellers = menuItems.filter(item => item.isBestSeller);

  return (
    <section id="bestsellers" className="py-20 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle="Top Rated"
          title="THE CROWD FAVOURITES"
          description="Hand-stretched, loaded with premium toppings, and baked to golden perfection. Here is what Madhuban & Belthara love the most."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellers.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#menu"
            className="inline-flex items-center space-x-2 text-brand-orange hover:text-brand-red font-bold text-sm tracking-wide transition-colors group"
          >
            <span>Explore Complete Menu</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
