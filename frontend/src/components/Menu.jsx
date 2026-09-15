import React, { useState } from 'react';
import SectionHeading from './SectionHeading.jsx';
import ProductCard from './ProductCard.jsx';
import { menuCategories, menuItems } from '../data/menu.js';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-dark-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Authentic & Fresh"
          title="EXPLORE OUR MENU"
          description="From authentic cheesy pizzas to crispy burgers, spicy sides, and chilled coolers."
        />

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 space-x-2 sm:space-x-3 no-scrollbar">
          {menuCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap active:scale-95 ${
                  isActive
                    ? "bg-brand-red text-white shadow-lg shadow-brand-red/30 ring-2 ring-brand-red/50"
                    : "bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700 border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No items found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
