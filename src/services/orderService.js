import { requestJson, unwrapCollection } from './httpClient.js'

const ORDERS_URL = '/api/orders'

export async function getOrders() {
  try {
    const payload = await requestJson(ORDERS_URL, { method: 'GET' })
    const orders = unwrapCollection(payload)
    return Array.isArray(orders) ? orders : []
  } catch (error) {
    console.warn('Failed to load orders', error)
    return []
  }
}

export async function addOrder(payload) {
  return requestJson(ORDERS_URL, {
    method: 'POST',
    body: JSON.stringify(payload || {}),
  })
}

export async function updateOrder(id, payload) {
  return requestJson(`${ORDERS_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload || {}),
  })
}
