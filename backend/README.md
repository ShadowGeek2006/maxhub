# Max Pizza Hub — Backend

Backend API for **persistent order management + admin dashboard** — the first approved backend requirement for Max Pizza Hub. Scope is deliberately minimal: this is an API only. No menu/inventory management, no payments, no dashboard UI (that's frontend engineering territory — see `00_MAX_PIZZA_HUB_OVERVIEW.md`).

## What this does

- Persists every order (currently placed via WhatsApp on the frontend) to a real database instead of only going out as a WhatsApp message.
- Gives the team an authenticated API to list orders, view details, and move an order through its status (`PENDING → PREPARING → READY → COMPLETED`, or `CANCELLED`) — the data layer an admin dashboard UI would be built on.
- Computes prices server-side from unit price × quantity — the client can never dictate what an order costs.

## What this does NOT do

- No admin dashboard **UI** — this ships the API only. Project Lead owns building the frontend for it.
- No menu/inventory database — menu items are still defined in the frontend; order items are stored as a snapshot at order time.
- No payment processing.
- No public admin signup — admin accounts are created via a server-side CLI script only (see below).

## Stack

Node.js + Express + Prisma + SQLite (swappable to Postgres for production by changing one line — see `prisma/schema.prisma`). Chosen for minimal moving parts: no external services to stand up for local dev, in keeping with the project's "avoid unnecessary dependencies" guideline.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:
- `JWT_SECRET` — generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- `CORS_ORIGIN` — the frontend's origin (e.g. `http://localhost:5173` for local Vite dev)

Then:

```bash
npx prisma migrate dev --name init   # creates the SQLite DB + tables
npm run create-admin -- <username> <password>   # create your first admin login
npm run dev                           # starts on http://localhost:4000
```

`GET /api/health` should return `{"status":"ok"}` once it's running.

## API Contract

Base path: `/api`

### `POST /api/orders` — create an order
**Auth:** none (public — called from checkout) · **Rate limit:** 15 requests / 10 min per IP

Request body:
```json
{
  "customerName": "Ravi Kumar",
  "customerPhone": "9219034055",
  "orderType": "PICKUP",
  "deliveryAddress": "required only if orderType is DELIVERY",
  "notes": "optional, max 500 chars",
  "items": [
    { "name": "Margherita Pizza", "quantity": 2, "unitPrice": 199, "isVeg": true }
  ]
}
```
Required fields: `customerName`, `customerPhone`, `orderType` (`PICKUP`|`DELIVERY`), `items` (min 1). `deliveryAddress` required when `orderType` is `DELIVERY`.

Response `201`:
```json
{ "order": { "id": "...", "orderNumber": "MPH-20260915-4F2A1C", "status": "PENDING", "total": 497, "items": [...], "createdAt": "..." } }
```
Errors: `400` invalid payload (validation details included), `429` rate limited.

### `GET /api/orders` — list orders (admin)
**Auth:** `Authorization: Bearer <token>` required

Query params (all optional): `status`, `orderType`, `search` (matches name/phone/order number), `from`/`to` (ISO datetime), `page` (default 1), `pageSize` (default 20, max 100).

Response `200`: `{ "orders": [...], "pagination": { "page", "pageSize", "total", "totalPages" } }`

### `GET /api/orders/:id` — order detail (admin)
**Auth:** required · Response `200`: `{ "order": {...} }` · Errors: `404` if not found.

### `PATCH /api/orders/:id/status` — update order status (admin)
**Auth:** required · Body: `{ "status": "PREPARING" }` (one of `PENDING`, `PREPARING`, `READY`, `COMPLETED`, `CANCELLED`)
Response `200`: `{ "order": {...} }` · Errors: `400` invalid status, `404` not found.

### `POST /api/admin/login`
**Auth:** none · **Rate limit:** 8 requests / 15 min per IP
Body: `{ "username": "...", "password": "..." }`
Response `200`: `{ "token": "...", "expiresIn": "12h", "admin": { "id", "username" } }`
Errors: `401` invalid credentials (generic — doesn't reveal which field was wrong).

### `GET /api/admin/me`
**Auth:** required · Response `200`: `{ "admin": { "id", "username" } }` — lets a dashboard verify a stored token on load.

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `PORT` | no (default 4000) | |
| `NODE_ENV` | no | set to `production` in prod — enforces a strong `JWT_SECRET` |
| `DATABASE_URL` | yes | `file:./dev.db` locally; a Postgres URL in production |
| `JWT_SECRET` | yes | long random string, 32+ chars in production |
| `JWT_EXPIRES_IN` | no (default 12h) | |
| `CORS_ORIGIN` | no (default localhost:5173) | comma-separated list of allowed frontend origins |

## Security review (what's implemented)

- All input validated server-side with `zod` — the client's declared `total` is never trusted; the server recomputes it from `quantity × unitPrice`.
- Passwords hashed with `bcryptjs` (cost factor 12); no plaintext ever stored or logged.
- Admin routes require a JWT (`jsonwebtoken`); invalid/expired/forged tokens all return the same generic `401`.
- No public admin registration endpoint — accounts are created only via `npm run create-admin` on the server, by someone with shell access.
- Login and order-creation endpoints are rate-limited to blunt brute-forcing and spam.
- `helmet` sets standard security headers; CORS is restricted to an explicit origin allowlist (not `*`).
- JSON body size capped at 100kb — this API never needs large payloads.
- Errors return generic messages to the client; full error detail is logged server-side only, never leaked in a response (stack traces only appear when `NODE_ENV=development`).
- Data minimization: only `customerName`, `customerPhone`, and (if delivery) `deliveryAddress` are stored — no unnecessary customer data.

**Not yet implemented / left for the next requirement:** account lockout after repeated failed logins (rate limiting covers the immediate risk), refresh tokens (12h expiry means re-login, which is acceptable for MVP), audit log of who changed an order's status (currently any authenticated admin can do anything — fine for a single shared admin account, worth revisiting if multiple staff accounts are added).

## Testing performed

Could not run a live SQLite-backed test *in this sandboxed tool environment* — its network allowlist blocks `binaries.prisma.sh` (Prisma's engine-binary host), so `prisma generate`/`migrate` can't download the native query engine here. This is a sandbox restriction only; on a normal machine with full internet access, `npm install` + `npx prisma migrate dev` resolves it automatically.

What was actually verified:
- Every source file syntax-checked (`node --check`).
- Validation schemas and order-number generation unit-tested directly (rejects empty items, negative prices, missing delivery address, invalid status values; confirms client-supplied `total` is ignored).
- Full HTTP layer exercised end-to-end (21 checks) against an in-memory stand-in for the database: health check, order creation with server-computed pricing, auth-required routes correctly rejecting missing/forged tokens, login with correct/incorrect credentials, full order lifecycle (create → list → get → update status), 404s, and 400s on bad input.

**Recommended before this goes further:** once you run `npx prisma migrate dev` locally, re-run a quick smoke test against the real SQLite file to confirm the Prisma queries behave the same way the stub did — the stub is a faithful re-implementation but isn't Prisma itself.

## Frontend integration

At checkout, alongside (or instead of) building the WhatsApp deep link, call:

```js
const res = await fetch(`${API_BASE_URL}/api/orders`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName,
    customerPhone,
    orderType,          // 'PICKUP' or 'DELIVERY'
    deliveryAddress,     // only if orderType is DELIVERY
    notes,
    items: cartItems.map(i => ({ name: i.name, quantity: i.qty, unitPrice: i.price, isVeg: i.isVeg })),
  }),
});
const { order } = await res.json();
// order.orderNumber can be shown to the customer and/or included in the WhatsApp message
```

Do this **before** clearing the cart, so a failed request doesn't lose the customer's order. If the request fails, fall back to WhatsApp-only (don't block the order on the backend being up).

For the future dashboard, the admin flow is: `POST /api/admin/login` → store the returned token → send it as `Authorization: Bearer <token>` on every `/api/orders*` call → `GET /api/admin/me` on app load to check if the stored token is still valid.

## Limitations

- SQLite's `contains` filter (used by the `search` query param) is case-sensitive — fine for an MVP admin search, worth swapping to Postgres `ILIKE` if that becomes annoying.
- No pagination cursor, just offset-based `page`/`pageSize` — fine at this order volume.
- Status transitions aren't restricted (e.g. nothing stops moving `COMPLETED` back to `PENDING`) — kept permissive on purpose for MVP; add a transition map if that turns out to matter operationally.
