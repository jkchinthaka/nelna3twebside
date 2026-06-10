const loggedKeys = new Set()

export function devLogOnce(key, message, error) {
  if (!import.meta.env.DEV) {
    return
  }

  if (loggedKeys.has(key)) {
    return
  }

  loggedKeys.add(key)

  if (error) {
    console.warn(message, error)
    return
  }

  console.warn(message)
}
