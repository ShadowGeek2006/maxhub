import React from 'react';
import { businessConfig } from '../data/business.js';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark-950 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-brand-red">MAX</span>
              <span className="text-2xl font-black text-white">PIZZA HUB</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Freshly baked pizzas, loaded with flavour and made for every craving. Serving Madhuban & Belthara.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href={businessConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={businessConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Full Menu</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">Crowd Favourites</a></li>
              <li><a href="#offers" className="hover:text-white transition-colors">Deals & Offers</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Branches — P1 fix: reads businessConfig.branches instead of a
              second hardcoded copy of the addresses (was previously out of
              sync with src/data/business.js). */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Our Branches</h4>
            <div className="space-y-3 text-xs text-gray-400">
              {businessConfig.branches.map((b) => (
                <div key={b.id}>
                  <span className="text-white font-semibold block">{b.shortName}:</span>
                  <span>{b.addressPlaceholder}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contact Info</h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>{businessConfig.generalPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange" />
                <span>Uttar Pradesh, India</span>
              </div>
              <p className="text-[11px] text-gray-500 pt-2">
                Update phone & maps links in <code className="text-gray-400">src/data/business.js</code>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          © {businessConfig.copyrightYear} {businessConfig.brandName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
