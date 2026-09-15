# Max Pizza Hub

Mobile-first React + Vite website for Max Pizza Hub, with WhatsApp-based ordering across two branches (Madhuban, Belthara).

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Lucide React icons
- React Context + localStorage for cart state
- No backend (WhatsApp deep-link ordering)

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/     UI components (Navbar, Hero, Menu, CartDrawer, Gallery, ...)
  context/        CartContext — cart state + localStorage persistence
  hooks/          useCart — CartContext consumer hook
  data/           business.js (canonical branch/contact info), menu.js, offers.js, gallery.js, reviews.js
  utils/          whatsapp.js — WhatsApp order message builder
```

## Known placeholders — verify before production

- Business phone/WhatsApp numbers and exact address wording in `src/data/business.js` are unverified — `sendWhatsAppOrder` deliberately blocks checkout while the number contains `XXXXX`, so orders can't silently go nowhere.
- `businessConfig.images` (hero/about/CTA) and several menu/gallery images still point at Unsplash stock photos — swap for approved restaurant photography before launch.
- Offers in `src/data/offers.js` and reviews in `src/data/reviews.js` should be confirmed as real before the site goes live (reviews in particular must not be published as genuine unless they are).
- JSON-LD structured data in `index.html` carries the same two branch addresses as `business.js` — keep both in sync if either changes.

## Ownership

See `00_MAX_PIZZA_HUB_OVERVIEW.md` for the no-clash ownership matrix (Sudheer: UI/UX + initial build, Vaishnavi: brand/assets, Ayush: backend if needed, Project Lead: frontend engineering/security/QA/deployment).
