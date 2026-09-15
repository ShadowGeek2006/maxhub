import { env } from '../config/env.js';

// Thrown intentionally by controllers for expected error cases
// (validation failures, not-found, etc.) with a known HTTP status.
export class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route not found' });
}

// Must be registered LAST, after all routes.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    // Log full detail server-side only. Never send stack traces or raw
    // DB/error internals to the client.
    console.error('[unhandled error]', err);
  }

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal server error' : err.message,
    ...(err.details ? { details: err.details } : {}),
    ...(env.nodeEnv === 'development' && statusCode >= 500 ? { stack: err.stack } : {}),
  });
}
