import { apiRequest } from './api.js';

// Admin API client — login + JWT-authenticated order management.
//
// Security note (Project Lead decision, deviates from the handoff's sample
// code): the token is kept in sessionStorage, not localStorage. Both are
// readable by any script on the page if it's ever compromised (XSS), but
// sessionStorage clears when the tab closes, which meaningfully narrows the
// exposure window for an admin session compared to a token that persists
// indefinitely. If "stay logged in across browser restarts" becomes a real
// requirement, that should go through a backend-set httpOnly cookie instead
// of client-side storage, not by switching back to localStorage.
const TOKEN_KEY = 'mph_admin_token';

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    // sessionStorage can throw in private-browsing/locked-down contexts —
    // the admin session simply won't persist across reloads in that case.
  }
}

export function clearToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // no-op
  }
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function adminLogin(username, password) {
  const data = await apiRequest('/api/admin/login', {
    method: 'POST',
    body: { username, password },
  });
  setToken(data.token);
  return data;
}

export function adminLogout() {
  clearToken();
}

// Verifies the stored token is still valid — used to restore a session on
// page load. Callers should treat a thrown error (esp. 401) as "not logged in".
export async function fetchAdminSession() {
  const data = await apiRequest('/api/admin/me', { headers: authHeaders() });
  return data.admin;
}

export async function fetchOrders(params = {}) {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );
  const search = new URLSearchParams(cleanParams).toString();
  const path = `/api/orders${search ? `?${search}` : ''}`;
  return apiRequest(path, { headers: authHeaders() });
}

export async function fetchOrderById(orderId) {
  const data = await apiRequest(`/api/orders/${orderId}`, { headers: authHeaders() });
  return data.order;
}

export async function updateOrderStatus(orderId, status) {
  const data = await apiRequest(`/api/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: { status },
  });
  return data.order;
}

export const ORDER_STATUSES = ['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'];
