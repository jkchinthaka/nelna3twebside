import { requestJson, unwrapCollection } from './httpClient.js'

const INQUIRIES_URL = '/api/inquiries'

export async function getInquiries() {
  try {
    const payload = await requestJson(INQUIRIES_URL, { method: 'GET' })
    const inquiries = unwrapCollection(payload)
    return Array.isArray(inquiries) ? inquiries : []
  } catch (error) {
    console.warn('Failed to load inquiries', error)
    return []
  }
}

export async function addInquiry(payload) {
  return requestJson(INQUIRIES_URL, {
    method: 'POST',
    body: JSON.stringify(payload || {}),
  })
}

export async function updateInquiry(id, payload) {
  return requestJson(`${INQUIRIES_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload || {}),
  })
}
