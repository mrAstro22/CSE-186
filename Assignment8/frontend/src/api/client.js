const API = import.meta.env.VITE_API_URL;

export function apiFetch(path, options = {}) {
  const base = API.replace(/\/$/, ''); // remove trailing slash safely

  return fetch(`${base}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
}