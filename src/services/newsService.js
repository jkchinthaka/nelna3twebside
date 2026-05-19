import { fallbackNews } from '../data/news.js'
import { requestJson, unwrapCollection } from './httpClient.js'

const NEWS_URL = '/api/news'

export async function getNews() {
  try {
    const payload = await requestJson(NEWS_URL, { method: 'GET' })
    const news = unwrapCollection(payload)
    return Array.isArray(news) && news.length ? news : fallbackNews
  } catch (error) {
    console.warn('API unavailable, using fallback news.', error)
    return fallbackNews
  }
}

export async function getNewsById(id) {
  try {
    const item = await requestJson(`${NEWS_URL}/${encodeURIComponent(id)}`, { method: 'GET' })
    return item || null
  } catch (error) {
    console.warn('API unavailable, using fallback news item.', error)
    return fallbackNews.find((item) => item.id === id) || null
  }
}

export async function addNews(payload) {
  return requestJson(NEWS_URL, {
    method: 'POST',
    body: JSON.stringify(payload || {}),
  })
}

export async function updateNews(id, payload) {
  return requestJson(`${NEWS_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload || {}),
  })
}

export async function deleteNews(id) {
  return requestJson(`${NEWS_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}
