import { getDefaultContactSettings } from '../data/companyContact.js'
import { devLogOnce } from '../utils/devLogOnce.js'
import { requestJson, unwrapPayload } from './httpClient.js'

const SETTINGS_URL = '/api/contact-settings'

let cachedSettings = null
let inFlightRequest = null

async function fetchContactSettings() {
  try {
    const payload = await requestJson(SETTINGS_URL, { method: 'GET' })
    const settings = unwrapPayload(payload)

    if (settings && typeof settings === 'object') {
      return { ...getDefaultContactSettings(), ...settings }
    }
  } catch (error) {
    devLogOnce(
      'contact-settings-api',
      'Contact settings API unavailable. Using official company defaults.',
      error,
    )
  }

  return getDefaultContactSettings()
}

export async function getContactSettings() {
  if (cachedSettings) {
    return cachedSettings
  }

  if (!inFlightRequest) {
    inFlightRequest = fetchContactSettings()
      .then((settings) => {
        cachedSettings = settings
        return settings
      })
      .finally(() => {
        inFlightRequest = null
      })
  }

  return inFlightRequest
}

export async function updateContactSettings(payload) {
  const response = await requestJson(SETTINGS_URL, {
    method: 'PUT',
    body: JSON.stringify(payload || {}),
  })

  const settings = unwrapPayload(response)
  cachedSettings = settings && typeof settings === 'object'
    ? { ...getDefaultContactSettings(), ...settings }
    : getDefaultContactSettings()

  return cachedSettings
}
