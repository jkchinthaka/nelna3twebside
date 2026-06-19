function normalizeBaseUrl(value) {
  const cleaned = String(value || '').trim().replace(/\s+/g, '')
  return cleaned.replace(/\/+$/, '')
}

function isLocalhostUrl(value) {
  return /localhost|127\.0\.0\.1/i.test(String(value || ''))
}

/**
 * Whether the Express/Mongo admin API should be called.
 * Static Cloudflare deploys skip API calls and use bundled defaults instead.
 */
export function hasAdminApiBackend() {
  const flag = import.meta.env.VITE_ENABLE_BACKEND_API

  if (flag === 'true') {
    return true
  }

  if (flag === 'false') {
    return false
  }

  const configuredBase = normalizeBaseUrl(
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE || '',
  )

  if (!configuredBase) {
    return import.meta.env.DEV
  }

  if (isLocalhostUrl(configuredBase)) {
    return import.meta.env.DEV
  }

  return true
}

export function resolveApiBaseUrl() {
  const configuredBase = normalizeBaseUrl(
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE || '',
  )

  if (!configuredBase) {
    return ''
  }

  if (import.meta.env.PROD && isLocalhostUrl(configuredBase)) {
    return ''
  }

  if (import.meta.env.DEV && isLocalhostUrl(configuredBase)) {
    return ''
  }

  return configuredBase
}
