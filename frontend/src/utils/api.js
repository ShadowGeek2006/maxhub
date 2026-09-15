// Shared API configuration for the Max Pizza Hub backend (order management +
// admin dashboard), per the backend handoff (Section: Critical Notes).
//
// Base URL is read from an env var instead of being hardcoded, so it can be
// pointed at production without editing source: set VITE_API_BASE_URL in a
// .env file (see .env.example). Falls back to the local dev backend.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

/**
 * Thin wrapper around fetch that standardizes JSON handling and error
 * messages across the public and admin API clients, per the handoff's
 * instruction to "handle API errors explicitly rather than assuming every
 * response is successful."
 */
export async function apiRequest(path, { method = 'GET', headers = {}, body } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    throw new Error('Could not reach the server. Check your connection and try again.');
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Some responses (e.g. rate-limit 429 from certain middlewares) may not
    // return JSON — fall through with data = null rather than crashing.
  }

  if (!response.ok) {
    const message = data?.error || `Request failed (${response.status})`;
    const err = new Error(message);
    err.status = response.status;
    throw err;
  }

  return data;
}
