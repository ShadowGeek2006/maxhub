import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../hooks/useCart.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Menu", href: "#menu" },
    { label: "Favourites", href: "#bestsellers" },
    { label: "Offers", href: "#offers" },
    { label: "Branches", href: "#branches" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Gallery", href: "#gallery" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-panel shadow-2xl py-3" : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Glowing Pizza Slice Emblem */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-brand-red via-brand-orange to-yellow-500 p-[2px] shadow-lg shadow-brand-red/40 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#120808] rounded-[14px] flex items-center justify-center overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-8 h-8">
                  <defs>
                    <linearGradient id="navFire" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E6392F" />
                      <stop offset="60%" stopColor="#FF8A00" />
                      <stop offset="100%" stopColor="#FFD000" />
                    </linearGradient>
                  </defs>
                  <path d="M 20 28 Q 50 18 80 28 Q 50 24 20 28" fill="#B95C0E" stroke="#873600" strokeWidth="2" />
                  <path d="M 22 30 Q 50 22 78 30 L 50 82 Z" fill="url(#navFire)" />
                  <path d="M 27 32 Q 50 26 73 32 L 50 78 Z" fill="#FFA500" opacity="0.9" />
                  <circle cx="40" cy="42" r="6" fill="#C0392B" stroke="#922B21" strokeWidth="1" />
                  <circle cx="60" cy="45" r="5.5" fill="#C0392B" stroke="#922B21" strokeWidth="1" />
                  <circle cx="50" cy="62" r="5" fill="#C0392B" stroke="#922B21" strokeWidth="1" />
                  <path d="M 46 36 Q 49 30 54 34 Q 50 39 46 36" fill="#2ECC71" />
                  <path d="M 33 55 Q 31 49 37 51 Q 35 57 33 55" fill="#2ECC71" />
                </svg>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 border-2 border-[#0B0B0B] flex items-center justify-center text-[8px] font-black text-black">
              ★
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-1.5 leading-none">
              <span className="text-xl sm:text-2xl font-black text-brand-red tracking-tight">MAX</span>
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">PIZZA HUB</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-extrabold tracking-widest text-brand-orange uppercase block mt-1">
              Madhuban • Belthara
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-gray-300">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-brand-orange transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-dark-800/80 border border-white/10 hover:bg-dark-700 text-white transition-all active:scale-95 shadow-md"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-5 h-5 text-brand-orange" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-brand-red/40">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange hover:opacity-90 text-white font-bold text-xs tracking-wider shadow-lg shadow-brand-red/25 transition-all active:scale-95"
          >
            ORDER NOW
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-bold text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full py-3 rounded-xl bg-brand-red text-white font-bold text-xs shadow-lg"
          >
            ORDER NOW
          </button>
        </div>
      )}
    </header>
  );
}
