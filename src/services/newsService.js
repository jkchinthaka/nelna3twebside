import { fallbackNews } from '../data/news.js'
import { devLogOnce } from '../utils/devLogOnce.js'
import { requestJson, unwrapCollection } from './httpClient.js'

const NEWS_URL = '/api/news'

let cachedNews = null
let inFlightRequest = null

async function fetchNews() {
  try {
    const payload = await requestJson(NEWS_URL, { method: 'GET' })
    const news = unwrapCollection(payload)
    return Array.isArray(news) && news.length ? news : fallbackNews
  } catch (error) {
    devLogOnce(
      'news-api',
      'News API unavailable. Using local fallback news.',
      error,
    )
    return fallbackNews
  }
}

export async function getNews() {
  if (cachedNews) {
    return cachedNews
  }

  if (!inFlightRequest) {
    inFlightRequest = fetchNews()
      .then((news) => {
        cachedNews = news
        return news
      })
      .finally(() => {
        inFlightRequest = null
      })
  }

  return inFlightRequest
}

export async function getNewsById(id) {
  try {
    const item = await requestJson(`${NEWS_URL}/${encodeURIComponent(id)}`, { method: 'GET' })
    return item || null
  } catch (error) {
    devLogOnce(
      'news-item-api',
      'News item API unavailable. Using local fallback news item.',
      error,
    )
    return fallbackNews.find((item) => item.id === id) || null
  }
}

export async function addNews(payload) {
  cachedNews = null
  return requestJson(NEWS_URL, {
    method: 'POST',
    body: JSON.stringify(payload || {}),
  })
}

export async function updateNews(id, payload) {
  cachedNews = null
  return requestJson(`${NEWS_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload || {}),
  })
}

export async function deleteNews(id) {
  cachedNews = null
  return requestJson(`${NEWS_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}
