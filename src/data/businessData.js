// Canonical business data — single source of truth.
// Every component (Navbar, Footer, Branches, CTA, WhatsApp ordering) must
// read from here instead of hardcoding its own copy.
//
// ⚠️ VERIFY BEFORE PRODUCTION (see 00_MAX_PIZZA_HUB_OVERVIEW.md, P0):
// address spelling, phone/WhatsApp numbers, hours, and social links are
// taken from the visiting card and are NOT production-approved yet.

export const businessData = {
  name: 'Max Pizza Hub',
  tagline: 'Fresh. Hot. Fast.',
  branches: [
    {
      id: 'madhuban',
      name: 'Max Pizza Hub — Madhuban',
      address: 'Madhuban, Near Union Bank of India, Uarauli', // ⚠️ unverified spelling
      phone: '9219034055', // ⚠️ verify before launch
      whatsapp: '919219034055', // ⚠️ verify: which number actually receives WhatsApp orders
      altPhone: '8568805963', // ⚠️ verify
      hours: 'Hours not yet confirmed', // ⚠️ placeholder — do not ship as fact
      mapsUrl: '', // ⚠️ add verified Google Maps link before launch
    },
  ],
  social: {
    instagram: '', // ⚠️ add verified link
    facebook: '', // ⚠️ add verified link
  },
}

// Convenience: the primary branch, used wherever the site only needs "the" number.
export const primaryBranch = businessData.branches[0]
