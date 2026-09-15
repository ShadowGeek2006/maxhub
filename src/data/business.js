// ============================================================================
// EDIT THIS FILE WITH REAL BUSINESS INFORMATION
// Centralized configuration for Max Pizza Hub.
// Update placeholders with verified phone numbers, branch addresses, and links.
// ============================================================================

export const businessConfig = {
  brandName: "MAX PIZZA HUB",
  logoTextPrimary: "MAX",
  logoTextSecondary: "PIZZA HUB",
  tagline: "YOUR CRAVINGS. OUR PIZZA.",
  subheading: "Freshly baked pizzas, loaded with flavour and made for every craving.",
  establishedYear: 2024,
  copyrightYear: 2026,

  // IMPORTANT: Replace with real WhatsApp number (e.g., '919876543210')
  whatsappNumber: "+91-XXXXXXXXXX", 
  generalPhone: "+91-XXXXXXXXXX",
  instagramUrl: "https://instagram.com/your_handle_placeholder",
  facebookUrl: "https://facebook.com/your_handle_placeholder",

  stats: [
    { label: "Active Branches", value: "2", suffix: "" },
    { label: "Pizza Choices", value: "15", suffix: "+" },
    { label: "Happy Customers", value: "1000", suffix: "+" },
    { label: "Fresh Daily Dough", value: "100", suffix: "%" },
  ],

  branches: [
    {
      id: "madhuban",
      name: "MAX PIZZA HUB — Madhuban",
      shortName: "Madhuban Branch",
      locality: "Madhuban, Mau",
      state: "Uttar Pradesh, India",
      addressPlaceholder: "Main Market Road, Near Town Center, Madhuban, Mau, Uttar Pradesh",
      phonePlaceholder: "+91-XXXXXXXXXX",
      whatsappNumber: "+91-XXXXXXXXXX",
      openingHoursPlaceholder: "11:00 AM – 10:30 PM (Everyday)",
      googleMapsUrl: "https://maps.google.com/?q=Madhuban+Mau+Uttar+Pradesh",
      isMainBranch: true,
      features: ["Dine-in", "Takeaway", "Quick Delivery"],
    },
    {
      id: "belthara",
      name: "MAX PIZZA HUB — Belthara",
      shortName: "Belthara Branch",
      locality: "Belthara Road",
      state: "Uttar Pradesh, India",
      addressPlaceholder: "Station Road, Near Bus Stand, Belthara Road, Ballia/Mau Border, Uttar Pradesh",
      phonePlaceholder: "+91-XXXXXXXXXX",
      whatsappNumber: "+91-XXXXXXXXXX",
      openingHoursPlaceholder: "11:30 AM – 10:00 PM (Everyday)",
      googleMapsUrl: "https://maps.google.com/?q=Belthara+Road+Uttar+Pradesh",
      isMainBranch: false,
      features: ["Dine-in", "Takeaway", "Quick Delivery"],
    },
  ],

  images: {
    heroPizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    aboutAmbience: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    ctaBackground: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1600&q=80",
  },
};
