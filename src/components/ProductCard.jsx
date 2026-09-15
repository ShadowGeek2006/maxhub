import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart.js';

export default function ProductCard({ item }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-red/10 group">
      {/* Image container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-dark-800">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />

        {/* Veg/non-veg indicator — P1 fix: reads item.isVeg instead of a
            hardcoded "100% VEG" label, so a non-veg item is never mislabeled. */}
        <div
          className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center space-x-1.5"
          aria-label={item.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ring-2 ${
              item.isVeg ? 'bg-green-500 ring-green-500/20' : 'bg-red-500 ring-red-500/20'
            }`}
          />
          <span
            className={`text-[10px] font-semibold tracking-wider uppercase ${
              item.isVeg ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {item.isVeg ? '100% VEG' : 'NON-VEG'}
          </span>
        </div>

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 right-3 bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg shadow-brand-red/30">
            {item.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors">
            {item.name}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Price</span>
            <span className="text-xl font-extrabold text-white tracking-tight">
              {item.priceDisplay || `₹${item.price}`}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all duration-200 active:scale-95 ${
              justAdded
                ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                : "bg-brand-red hover:bg-red-600 text-white shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
