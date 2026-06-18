/** Production site URL — set VITE_SITE_URL in deployment (e.g. https://nelna.lk) */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://nelna.lk'
).replace(/\/+$/, '')

export const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Nelna Farm'
