import { requestJson } from './httpClient.js'

const SETTINGS_URL = '/api/contact-settings'

export async function getContactSettings() {
  return requestJson(SETTINGS_URL, { method: 'GET' })
}

export async function updateContactSettings(payload) {
  return requestJson(SETTINGS_URL, {
    method: 'PUT',
    body: JSON.stringify(payload || {}),
  })
}
