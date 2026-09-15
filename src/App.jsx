import React from 'react';
import { CartProvider } from './context/CartContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import BestSellers from './components/BestSellers.jsx';
import Menu from './components/Menu.jsx';
import Offers from './components/Offers.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import Branches from './components/Branches.jsx';
import About from './components/About.jsx';
import Reviews from './components/Reviews.jsx';
import Gallery from './components/Gallery.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-dark-950 text-white selection:bg-brand-red selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <BestSellers />
          <Menu />
          <Offers />
          <WhyChooseUs />
          <Branches />
          <About />
          <Reviews />
          <Gallery />
          <CTA />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
