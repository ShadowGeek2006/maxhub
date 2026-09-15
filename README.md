# Max Pizza Hub

Mobile-first React + Vite website for Max Pizza Hub, with WhatsApp-based ordering.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Lucide React icons
- React Context + localStorage for cart state
- No backend (WhatsApp deep link ordering)

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
  components/     UI components (Navbar, Hero, Menu, CartDrawer, ...)
  context/        CartContext — cart state + localStorage persistence
  data/           businessData.js (canonical contact/branch info), menuData.js
  utils/          whatsapp.js — WhatsApp order link builder
```

## Known placeholders — verify before production

See `00_MAX_PIZZA_HUB_OVERVIEW.md` (P0/P1/P2) for the full list. In short:

- Business phone/WhatsApp numbers and address in `src/data/businessData.js` are from the visiting card and are **not yet verified**.
- Menu prices in `src/data/menuData.js` are `null` (unknown) — do not guess and publish.
- Images under `public/images/` are placeholder SVGs, not real restaurant photography.
- Offers and Reviews sections are intentionally empty until real, approved content is provided.

## Ownership

See `00_MAX_PIZZA_HUB_OVERVIEW.md` for the no-clash ownership matrix (Sudheer: UI/UX, Vaishnavi: brand/assets, Ayush: backend if needed, Project Lead: frontend engineering/security/QA/deployment).
