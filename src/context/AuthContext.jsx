import { useEffect, useMemo, useState, useCallback } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../firebase/firebase.js'
import AuthContext from './authContext.js'

const localAuthKey = 'nelna_local_auth'
const localAdmin = {
  username: 'user',
  password: 'USER',
  role: 'admin',
  name: 'Admin User',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('guest')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth || !db) {
      const stored = localStorage.getItem(localAuthKey)
      if (stored) {
        try {
          const session = JSON.parse(stored)
          setUser({ uid: 'local-admin', email: session.username, displayName: session.name })
          setRole(session.role || 'admin')
        } catch (storageError) {
          console.warn('Failed to read local auth session', storageError)
          setUser(null)
          setRole('guest')
        }
      } else {
        setUser(null)
        setRole('guest')
      }
      setLoading(false)
      return undefined
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      setError(null)
      if (!currentUser) {
        setRole('guest')
        setLoading(false)
        return
      }

      try {
        const snapshot = await getDoc(doc(db, 'users', currentUser.uid))
        const data = snapshot.data()
        setRole(data?.role || 'distributor')
      } catch (error) {
        setRole('distributor')
        setError('Failed to load role information.')
        console.error('Failed to load user role', error)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const login = useCallback(async (email, password) => {
    setError(null)
    if (!isFirebaseConfigured || !auth) {
      if (email === localAdmin.username && password === localAdmin.password) {
        const session = { username: localAdmin.username, role: localAdmin.role, name: localAdmin.name }
        localStorage.setItem(localAuthKey, JSON.stringify(session))
        setUser({ uid: 'local-admin', email: session.username, displayName: session.name })
        setRole(session.role)
        return
      }

      setError('Invalid credentials.')
      throw new Error('Invalid credentials.')
    }

    if (email === localAdmin.username && password === localAdmin.password) {
      const session = { username: localAdmin.username, role: localAdmin.role, name: localAdmin.name }
      localStorage.setItem(localAuthKey, JSON.stringify(session))
      setUser({ uid: 'local-admin', email: session.username, displayName: session.name })
      setRole(session.role)
      return
    }

    await signInWithEmailAndPassword(auth, email, password)
  }, [])

  const logout = useCallback(async () => {
    if (!isFirebaseConfigured || !auth) {
      localStorage.removeItem(localAuthKey)
      setUser(null)
      setRole('guest')
      return
    }
    localStorage.removeItem(localAuthKey)
    await signOut(auth)
  }, [])

  const value = useMemo(
    () => ({ user, role, loading, error, login, logout }),
    [user, role, loading, error, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
