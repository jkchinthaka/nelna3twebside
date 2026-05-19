import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage, isFirebaseConfigured } from '../firebase/firebase.js'

function assertFirebaseReady() {
  if (!isFirebaseConfigured || !storage) {
    throw new Error('Firebase Storage is not configured. Cannot upload files yet.')
  }
}

export async function uploadFile(path, file) {
  assertFirebaseReady()
  const fileRef = ref(storage, path)
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
}
