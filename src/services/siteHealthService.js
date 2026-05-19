import { requestJson, unwrapCollection } from './httpClient.js'

export async function getSites() {
  const payload = await requestJson('/api/sites', { method: 'GET' })
  return unwrapCollection(payload)
}

export async function createSite(payload) {
  return requestJson('/api/sites', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function runAudit(siteId, options = {}) {
  return requestJson(`/api/sites/${siteId}/audits/run`, {
    method: 'POST',
    body: JSON.stringify(options),
  })
}

export async function getLatestAudit(siteId) {
  return requestJson(`/api/sites/${siteId}/audits/latest`, { method: 'GET' })
}
