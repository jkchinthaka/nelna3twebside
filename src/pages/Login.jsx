import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Lock, ShieldCheck } from 'lucide-react'
import useAuth from '../context/useAuth.js'
import { Button, Input } from '../components/ui/index.js'
import logo from '../assets/nelna-logo.jpg'

function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, role, user, error } = useAuth()

  const [formState, setFormState] = useState({ email: '', password: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (user && role === 'admin') navigate('/admin')
    if (user && role === 'distributor') navigate('/distributor')
  }, [user, role, navigate])

  const handleChange = (event) => {
    setFormState((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')

    try {
      await login(formState.email, formState.password)
      setStatus('success')
    } catch (requestError) {
      console.error(requestError)
      setStatus('error')
    }
  }

  return (
    <div className="bg-nelna-green-soft py-12">
      <div className="page-shell">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-nelna-dark-soft bg-nelna-white shadow-card lg:grid-cols-[0.95fr_1.05fr]">
          <section className="surface-brand-green p-8 md:p-10">
            <div className="inline-flex items-center gap-3">
              <img src={logo} alt="Nelna Farm logo" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-display text-xl font-extrabold">NELNA FARM</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow-200">Corporate Portal</p>
              </div>
            </div>

            <h1 className="mt-8 font-display text-3xl font-extrabold leading-tight md:text-4xl">
              Secure Login for Admin and Distributor Teams
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-nelna-white/90">
              Access product operations, orders, inquiries, and dashboard tools. All portal activity is role protected.
            </p>

            <div className="mt-8 space-y-3 text-sm text-nelna-white/90">
              <p className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-yellow-200" aria-hidden="true" />
                Firebase authentication enabled
              </p>
              <p className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4 text-brand-yellow-200" aria-hidden="true" />
                Role-based route protection for admin and distributor views
              </p>
            </div>
          </section>

          <section className="p-8 md:p-10">
            <h2 className="text-2xl font-bold text-nelna-dark">{t('portal.title')}</h2>
            <p className="mt-2 text-sm text-nelna-dark/80">
              Sign in with your assigned portal credentials.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <Input
                name="email"
                label="Username or Email"
                value={formState.email}
                onChange={handleChange}
                autoComplete="username"
                required
              />
              <Input
                name="password"
                label={t('portal.password')}
                value={formState.password}
                onChange={handleChange}
                type="password"
                autoComplete="current-password"
                required
              />

              <div className="rounded-xl border border-brand-yellow-200 bg-brand-yellow-50 p-3 text-xs text-brand-yellow-900">
                Development fallback login: user / USER
              </div>

              <Button type="submit" loading={status === 'loading'} className="w-full justify-center">
                {status === 'loading' ? 'Signing in...' : t('portal.login')}
              </Button>

              {status === 'error' ? (
                <p className="text-sm font-semibold text-nelna-green-dark-700">
                  {error || 'Login failed. Check your credentials and try again.'}
                </p>
              ) : null}

              <button
                type="button"
                className="text-sm font-semibold text-brand-green-700"
                onClick={() => {
                  // Placeholder for future OTP/reset workflows.
                }}
              >
                Forgot password? (coming soon)
              </button>
            </form>

            <p className="mt-6 text-xs text-nelna-dark/70">
              Security note: for protection, do not share portal credentials over chat apps.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Login
