import crypto from 'node:crypto';

// Human-readable, date-prefixed, collision-resistant order number.
// Example: MPH-20260915-4F2A1C
// Uses random bytes rather than a sequential counter to avoid race
// conditions under concurrent requests without needing a DB lock/transaction.
export function generateOrderNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const suffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `MPH-${y}${m}${d}-${suffix}`;
}
