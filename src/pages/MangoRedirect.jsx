import { useEffect } from 'react'
import nelnaLogo from '../assets/nelna-logo.jpg'
import mango3dLogo from '../assets/mongo3dlogo.png'

const REDIRECT_URL = 'https://nelnamango.com/'
const REDIRECT_DELAY_MS = 900

function MangoRedirect() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.replace(REDIRECT_URL)
    }, REDIRECT_DELAY_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-green-950 via-brand-green-900 to-brand-green-800 px-6 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-md">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow-200">Welcome</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold">Nelna Family</h1>

        <div className="mt-6 flex items-center justify-center gap-4">
          <img src={nelnaLogo} alt="Nelna LK" className="h-16 w-16 rounded-full object-cover ring-2 ring-white/60" />
          <span className="h-1 w-10 rounded-full bg-brand-yellow-300/80" />
          <img src={mango3dLogo} alt="Nelna Mango" className="h-16 w-16 rounded-full object-cover ring-2 ring-white/60" />
        </div>

        <p className="mt-5 text-sm font-medium text-brand-green-50">
          Redirecting you to Nelna Mango...
        </p>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <span className="block h-full w-full origin-left animate-pulse rounded-full bg-brand-yellow-300" />
        </div>
      </section>
    </main>
  )
}

export default MangoRedirect