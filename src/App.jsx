import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BestSellers from './components/BestSellers'
import Menu from './components/Menu'
import Offers from './components/Offers'
import WhyChooseUs from './components/WhyChooseUs'
import Branches from './components/Branches'
import About from './components/About'
import Reviews from './components/Reviews'
import Gallery from './components/Gallery'
import CTA from './components/CTA'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

// Component flow matches 00_MAX_PIZZA_HUB_OVERVIEW.md section 1:
// App → CartProvider → Navbar → Hero → BestSellers → Menu → Offers →
// WhyChooseUs → Branches → About → Reviews → Gallery → CTA → Footer → CartDrawer
export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main id="main-content">
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
    </CartProvider>
  )
}
