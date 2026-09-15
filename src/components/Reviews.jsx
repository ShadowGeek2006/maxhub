import React, { useState } from 'react';
import SectionHeading from './SectionHeading.jsx';
import { sampleReviews } from '../data/reviews.js';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? sampleReviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === sampleReviews.length - 1 ? 0 : prev + 1));
  };

  const current = sampleReviews[currentIndex];

  return (
    <section id="reviews" className="py-20 bg-dark-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          subtitle="Customer Love"
          title="WHAT OUR CUSTOMERS SAY"
          description="Illustrative sample reviews from students and families visiting our Madhuban and Belthara counters."
        />

        <div className="glass-panel p-8 sm:p-12 rounded-3xl relative border border-white/10 shadow-2xl">
          <Quote className="w-12 h-12 text-brand-red/20 mx-auto mb-4" />

          {/* Stars */}
          <div className="flex justify-center space-x-1 mb-6 text-brand-orange">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          {/* Comment */}
          <p className="text-base sm:text-xl font-medium text-gray-200 leading-relaxed italic max-w-2xl mx-auto">
            "{current.comment}"
          </p>

          {/* Author */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-base font-bold text-white">{current.author}</h4>
            <p className="text-xs text-brand-orange font-semibold mt-0.5">
              {current.role} • {current.branch}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={prevReview}
              className="p-2.5 rounded-full bg-dark-800 hover:bg-dark-700 text-white border border-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-gray-400">
              {currentIndex + 1} / {sampleReviews.length}
            </span>
            <button
              onClick={nextReview}
              className="p-2.5 rounded-full bg-dark-800 hover:bg-dark-700 text-white border border-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
