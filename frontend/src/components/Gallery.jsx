import React, { useEffect, useRef, useState } from 'react';
import SectionHeading from './SectionHeading.jsx';
import { galleryImages } from '../data/gallery.js';
import { X } from 'lucide-react';

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);
  const closeButtonRef = useRef(null);
  const previouslyFocused = useRef(null);

  // P1 fix: scroll lock + Escape-to-close + dialog semantics + focus handling,
  // matching the same pattern used in CartDrawer.
  useEffect(() => {
    if (!activeImage) return;

    previouslyFocused.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setActiveImage(null);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [activeImage]);

  return (
    <section id="gallery" className="py-20 bg-dark-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Visual Feast"
          title="FOOD & MOMENTS"
          description="A glimpse of our loaded crusts, hot appetizers, and kitchen preparation."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveImage(img)}
              aria-label={`View larger image: ${img.title}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-52 sm:h-64 bg-dark-800 border border-white/5 hover:border-brand-red/40 transition-all text-left"
            >
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                  {img.category}
                </span>
                <h4 className="text-sm font-bold text-white">{img.title}</h4>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
            aria-hidden="false"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-lightbox-title"
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                onClick={() => setActiveImage(null)}
                aria-label="Close image"
                className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white"
              >
                <X className="w-7 h-7" aria-hidden="true" />
              </button>
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="w-full max-h-[75vh] object-contain rounded-2xl border border-white/10"
              />
              <div className="mt-4 text-center">
                <h3 id="gallery-lightbox-title" className="text-lg font-bold text-white">{activeImage.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{activeImage.caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
