import { fallbackProducts } from '../data/products.js'
import fallbackProductImage from '../assets/organic.jpg'
import { requestJson, unwrapCollection } from './httpClient.js'

const PRODUCTS_URL = '/api/products'

const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i

function resolveProductImageUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return fallbackProductImage
  }

  if (ABSOLUTE_URL_PATTERN.test(imageUrl) || imageUrl.startsWith('/') || imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
    return imageUrl
  }

  return fallbackProductImage
}

export async function getProducts() {
  try {
    const payload = await requestJson(PRODUCTS_URL, { method: 'GET' })
    const products = unwrapCollection(payload)
    return Array.isArray(products)
      ? products.map((product) => ({
          ...product,
          imageUrl: resolveProductImageUrl(product?.imageUrl),
        }))
      : []
  } catch (error) {
    console.warn('API unavailable, using fallback products.', error)
    return fallbackProducts
  }
}

export async function addProduct(payload) {
  // For admin use; throw if API fails
  return requestJson(PRODUCTS_URL, {
    method: 'POST',
    body: JSON.stringify(payload || {}),
  })
}

export async function updateProduct(id, payload) {
  return requestJson(`${PRODUCTS_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload || {}),
  })
}

export async function deleteProduct(id) {
  return requestJson(`${PRODUCTS_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}
