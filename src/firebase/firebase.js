import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

function isValidValue(value) {
  if (!value) return false
  const trimmed = String(value).trim()
  if (!trimmed) return false
  if (trimmed === 'your_api_key') return false
  if (trimmed === 'your_project_id') return false
  if (trimmed === 'your_sender_id') return false
  if (trimmed === 'your_app_id') return false
  return true
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured =
  isValidValue(firebaseConfig.apiKey) &&
  isValidValue(firebaseConfig.authDomain) &&
  isValidValue(firebaseConfig.projectId) &&
  isValidValue(firebaseConfig.storageBucket) &&
  isValidValue(firebaseConfig.messagingSenderId) &&
  isValidValue(firebaseConfig.appId)

let app = null
export let auth = null
export let db = null
export let storage = null

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  } catch (error) {
    console.error('Firebase initialization failed. Check your .env values.', error)
  }
} else if (import.meta.env.VITE_DEBUG_FIREBASE === 'true') {
  console.info(
    'Firebase is not configured. Running in fallback auth mode. Set VITE_DEBUG_FIREBASE=true to keep this log visible.',
  )
}
