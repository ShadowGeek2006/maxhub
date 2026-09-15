# Max Pizza Hub — Monorepo

Two independently deployed services in one repo:

- **`frontend/`** — React + Vite site (public menu/checkout + `/admin` order dashboard). Deploys to **Vercel**.
- **`backend/`** — Express + Prisma order-management API. Deploys to **Render** (or Railway/Fly — anywhere that runs a persistent Node process + Postgres).

They are deployed as two separate services, not one. Vercel is excellent for the frontend (static build + edge hosting) but isn't a good fit for this backend as built — it's a stateful Express server with a SQL database behind it, which needs a host that keeps a process running and a database that persists across restarts. That's what the Render blueprint below sets up.

## Deployment order

### 1. Backend → Render

```bash
cd backend
```

Before deploying, switch the database from SQLite (used for local dev) to Postgres for production — this is a one-line change already anticipated in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"   // was "sqlite"
  url      = env("DATABASE_URL")
}
```

Then on [render.com](https://render.com): **New → Blueprint**, point it at this repo, and it will read `backend/render.yaml` and provision both the web service and a free Postgres database automatically (JWT_SECRET is auto-generated; you only need to fill in `CORS_ORIGIN` once you know your Vercel URL — see step 3).

Once it's live, create your first admin login by opening a **Shell** on the Render service (Render dashboard → your service → Shell tab) and running:

```bash
npm run create-admin -- <username> <a-strong-password>
```

Confirm it's up: `https://<your-render-service>.onrender.com/api/health` should return `{"status":"ok"}`.

### 2. Frontend → Vercel

```bash
cd frontend
```

Push to GitHub, import into Vercel (framework auto-detected as Vite). In the Vercel project's **Environment Variables**, set:

```
VITE_API_BASE_URL = https://<your-render-service>.onrender.com
```

Deploy.

### 3. Close the loop — CORS

Back on Render, update the backend's `CORS_ORIGIN` env var to your real Vercel domain (e.g. `https://max-pizza-hub.vercel.app`), and redeploy the backend service. Until this is set correctly, the browser will block every request from the deployed frontend to the backend (this is expected — CORS is doing its job).

## Local development

Two terminals:

```bash
# Terminal 1 — backend
cd backend
cp .env.example .env   # edit JWT_SECRET, leave DATABASE_URL as the sqlite default
npm install
npx prisma migrate dev --name init
npm run create-admin -- admin your-local-password
npm run dev             # http://localhost:4000

# Terminal 2 — frontend
cd frontend
cp .env.example .env    # VITE_API_BASE_URL=http://localhost:4000 (the default)
npm install
npm run dev              # http://localhost:5173
```

## What was fixed / verified during integration

**Backend (`backend/`):**
- `prisma/schema.prisma` had the `Order` model defined **twice** — a working version (plain `String` status/type, matching how SQLite and the rest of the code actually use it) and a second, broken duplicate referencing `OrderStatus`/`OrderType` Prisma enums that were never defined anywhere. This would have failed `prisma generate` outright. Removed the broken duplicate.
- Couldn't run a live Prisma+SQLite test in this environment (Prisma's engine-binary host is network-blocked here — same restriction the backend's own README already disclosed hitting). What *was* verified here: every source file syntax-checked clean, and the zod validators + order-number generator were executed directly (12/12 checks passed: rejects empty items/negative prices/missing delivery address/invalid statuses, ignores a client-supplied `total`, generates unique correctly-formatted order numbers).
- Otherwise this backend is solid: server-side price computation (client total never trusted), bcrypt password hashing, generic auth error messages, admin accounts creatable only via server-side CLI (never an HTTP endpoint), rate limiting on login and order creation, `helmet` security headers, explicit CORS allowlist, capped JSON body size, no stack traces leaked to clients.

**Frontend (`frontend/`):** see `frontend/README.md` for the full list from the earlier integration pass (checkout now creates the backend order before sending the WhatsApp confirmation, `/admin` dashboard, Vite security-patch pin, sessionStorage for the admin token, Vercel security headers).

## Before this goes fully live

- Rotate/replace the sample admin credentials that appeared in plaintext in the original handoff doc (`manager` / `Passw0rd123`) — create a real admin via `npm run create-admin` and never use that sample pair.
- Confirm real business data (branch phone numbers, address wording, opening hours) in `frontend/src/data/business.js` — still placeholders pending client verification.
- Swap Unsplash placeholder images for approved restaurant photography.
- Once deployed, do one real order end-to-end (place an order on the live site → confirm it appears in `/admin` → update its status) before telling the client it's ready.
