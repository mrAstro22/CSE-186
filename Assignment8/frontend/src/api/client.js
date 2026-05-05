// This API helper is to connect the frontend and backend on render
// Utilizing Environent Variables defined on Render
// Removes need for fetch(localhost)

/* global fetch */
/* eslint-env browser */
const API = import.meta.env.VITE_API_URL;

/**
 *
 * @param path
 * @param options
 */
export function apiFetch(path, options = {}) {
  return fetch(`${API}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  });
}
