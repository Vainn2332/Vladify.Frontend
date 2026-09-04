/**
 * Origin of the Vladify API, e.g. `http://localhost:7222`. Configured through
 * `VITE_API_BASE_URL` and inlined at build time, so it must never be a secret.
 * Any trailing slash is stripped so paths can be concatenated directly.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
  /\/+$/,
  "",
);
