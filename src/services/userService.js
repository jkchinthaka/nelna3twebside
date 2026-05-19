import { requestJson, unwrapCollection } from './httpClient.js'

const USERS_URL = '/api/users'

const localUsersKey = 'nelna_local_users'

function readLocalUsers() {
  const raw = localStorage.getItem(localUsersKey)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.warn('Failed to parse local users', error)
    return []
  }
}

function writeLocalUsers(users) {
  localStorage.setItem(localUsersKey, JSON.stringify(users))
}

export async function getUsers() {
  try {
    const payload = await requestJson(USERS_URL, { method: 'GET' })
    const users = unwrapCollection(payload)
    return Array.isArray(users) ? users : []
  } catch (error) {
    console.warn('Failed to load users from API, using local cache.', error)
    return readLocalUsers()
  }
}

export async function upsertUser(uid, payload) {
  try {
    const saved = await requestJson(`${USERS_URL}/${encodeURIComponent(uid)}`, {
      method: 'PUT',
      body: JSON.stringify(payload || {}),
    })
    return saved
  } catch (error) {
    console.warn('Failed to save user to API, caching locally.', error)
    const users = readLocalUsers()
    const index = users.findIndex((user) => user.id === uid)
    if (index >= 0) {
      users[index] = { ...users[index], ...payload, id: uid }
    } else {
      users.push({ id: uid, ...payload })
    }
    writeLocalUsers(users)
    return { id: uid, ...payload }
  }
}
