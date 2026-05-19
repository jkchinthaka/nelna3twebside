import { requestJson } from './httpClient.js'

const baseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL

export const hasNotificationBackend = Boolean(baseUrl)

async function postNotification(endpoint, type, payload) {
  if (!baseUrl) return

  return requestJson(`${baseUrl}/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify({ type, payload }),
  })
}

export async function notifyEmail(type, payload) {
  return postNotification('notify', type, payload)
}

export async function notifyWhatsApp(type, payload) {
  return postNotification('notify-whatsapp', type, payload)
}
