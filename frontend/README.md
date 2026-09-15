# Max Pizza Hub

Mobile-first React + Vite website for Max Pizza Hub, with backend-integrated order management and WhatsApp order confirmation, across two branches (Madhuban, Belthara). Includes a JWT-protected admin dashboard at `/admin` for managing orders.

## Stack

- React 18 + Vite 6
- Tailwind CSS 3
- Lucide React icons
- React Context + localStorage for cart state
- Backend REST API (Ayush) for order creation + admin order management — see `src/utils/api.js`, `placeOrder.js`, `adminApi.js`
- WhatsApp deep-link sent as order confirmation after the backend order is created

## Getting started

```bash
cp .env.example .env   # then set VITE_API_BASE_URL to your backend
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
  components/     Public site UI components (Navbar, Hero, Menu, CartDrawer, Gallery, ...)
  admin/          Admin dashboard (AdminApp, AdminLogin, AdminOrders) — served at /admin
  context/        CartContext — cart state + localStorage persistence
  hooks/          useCart — CartContext consumer hook
  data/           business.js (canonical branch/contact info), menu.js, offers.js, gallery.js, reviews.js
  utils/          api.js (shared fetch client), placeOrder.js (public checkout), adminApi.js (JWT admin client), whatsapp.js (WhatsApp confirmation)
```

## How checkout works now

1. Customer fills the cart form in `CartDrawer` and submits.
2. `placeOrder()` calls `POST /api/orders` on the backend — the backend computes and owns the real total; the frontend never sends its own calculated total.
3. Only once the backend confirms the order (HTTP 201) does the app open the WhatsApp confirmation message (now includes the backend's `orderNumber`), and only then does the cart clear and the drawer close.
4. If the backend call fails, the customer sees the actual error and the cart is left untouched so they can retry — no order is silently lost either direction.

## Admin dashboard (`/admin`)

- Login (`POST /api/admin/login`) — session token stored in `sessionStorage`, not `localStorage` (clears on tab close; narrows the exposure window if the site were ever compromised via XSS). See the comment in `src/utils/adminApi.js` for the reasoning and what a longer-lived session would actually require (an httpOnly cookie from the backend, not client storage).
- Session restore on load via `GET /api/admin/me`; a `401` anywhere in the dashboard is treated as an expired session and drops back to login.
- Order list with status filter, order-type filter, search, and pagination (`GET /api/orders`).
- Per-order status update (`PATCH /api/orders/:id/status`).
- No client-side router dependency was added — `/admin` is handled by a plain `window.location.pathname` check in `main.jsx` to keep the bundle small. `vercel.json` rewrites every path to `index.html` so a direct link/refresh on `/admin` doesn't 404.

## Deploying to Vercel

1. Push this repo to GitHub, import it into Vercel (framework preset: Vite — auto-detected).
2. In the Vercel project's **Environment Variables**, set `VITE_API_BASE_URL` to your deployed backend's HTTPS URL (not `localhost`) for Production (and Preview, if you want preview deployments to hit a staging backend).
3. On the backend, add the deployed Vercel domain (e.g. `https://max-pizza-hub.vercel.app`) to `CORS_ORIGIN` — the browser will block the API calls otherwise.
4. `vercel.json` already handles SPA routing (`/admin` won't 404 on refresh) and sets baseline security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
5. Redeploy after any env var change — Vercel doesn't hot-apply them to already-built output.

## Security notes

- `npm audit`: 0 vulnerabilities as of this build (Vite pinned to `6.4.3`, which fixes the dev-server path-traversal advisories present in `5.4.x`).
- No `dangerouslySetInnerHTML`, no `eval()`, anywhere in the codebase.
- No secrets committed — `.env` is git-ignored, only `.env.example` (no real values) is tracked.
- Admin JWT lives in `sessionStorage`; the actual admin credentials must never be committed anywhere (the original backend handoff doc had a sample username/password written in plain text — treat that as compromised and rotate it on the backend before going live).
- The public checkout form still validates on the client for UX, but the backend is the source of truth for totals and item pricing — the frontend never sends a calculated total.

## Known placeholders — verify before production

- Business phone/WhatsApp numbers and exact address wording in `src/data/business.js` are unverified — `sendWhatsAppOrder` deliberately blocks checkout while the number contains `XXXXX`, so WhatsApp confirmations can't silently go nowhere (the backend order itself still gets created either way).
- `businessConfig.images` (hero/about/CTA) and several menu/gallery images still point at Unsplash stock photos — swap for approved restaurant photography before launch.
- Offers in `src/data/offers.js` and reviews in `src/data/reviews.js` are explicitly labeled as samples in the UI — confirm real ones before launch, and never publish reviews as genuine unless they are.
- JSON-LD structured data in `index.html` carries the same two branch addresses as `business.js` — keep both in sync if either changes.
- Rotate the sample admin credentials (`manager` / `Passw0rd123`) on the backend before this goes anywhere near production.

## Ownership

See `00_MAX_PIZZA_HUB_OVERVIEW.md` for the no-clash ownership matrix (Sudheer: UI/UX + initial build, Vaishnavi: brand/assets, Ayush: backend, Project Lead: frontend engineering/security/QA/deployment).
