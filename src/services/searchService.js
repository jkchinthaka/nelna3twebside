import { requestJson } from './httpClient.js'

export async function searchProducts(query, userLocation, filters) {
  return requestJson('/api/ai-search', {
    method: "POST",
    body: JSON.stringify({
      query,
      userLocation,
      filters
    })
  })
}
