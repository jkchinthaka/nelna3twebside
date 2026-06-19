import { useEffect, useMemo, useState } from 'react'
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import {
  Button,
  ErrorState,
  Input,
  LoadingSpinner,
  SectionTitle,
  Textarea,
} from '../components/ui/index.js'
import { addInquiry } from '../services/inquiryService.js'
import { hasNotificationBackend, notifyEmail, notifyWhatsApp } from '../services/notificationService.js'
import { getContactSettings } from '../services/contactSettingsService.js'
import BrandChickenMascot from '../components/BrandChickenMascot.jsx'
import {
  getDefaultContactSettings,
  getWhatsAppHref,
  MOBILE,
  NOTIFICATION_EMAIL,
  PHONE_CONTACT_GROUPS,
  PRIMARY_PHONE,
} from '../data/companyContact.js'

const defaultSettings = getDefaultContactSettings()

function isValidEmail(value) {
  if (!value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidPhone(value) {
  return /^\+?[0-9\s-]{7,20}$/.test(String(value || '').trim())
}

function PhoneContactLines() {
  return (
    <div className="mt-2 space-y-2 text-sm font-medium text-nelna-dark/90">
      {PHONE_CONTACT_GROUPS.map((group) => (
        <p key={group.prefix}>
          <span className="font-semibold text-nelna-dark">{group.prefix}: </span>
          {group.numbers.map((number, index) => (
            <span key={number.tel}>
              {index > 0 ? <span className="text-nelna-dark/60"> / </span> : null}
              <a
                href={`tel:${number.tel}`}
                className="text-brand-green-700 transition hover:text-brand-green-900 hover:underline"
              >
                {number.display}
              </a>
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}

function Contact() {
  const [contactSettings, setContactSettings] = useState(defaultSettings)
  const [settingsLoading, setSettingsLoading] = useState(true)
  const [settingsError, setSettingsError] = useState('')

  const [formState, setFormState] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState(null)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let mounted = true

    const loadSettings = async () => {
      setSettingsLoading(true)
      setSettingsError('')

      try {
        const settings = await getContactSettings()
        if (mounted) {
          setContactSettings(settings)
        }
      } catch {
        if (mounted) {
          setContactSettings(defaultSettings)
        }
      } finally {
        if (mounted) {
          setSettingsLoading(false)
        }
      }
    }

    loadSettings()

    return () => {
      mounted = false
    }
  }, [])

  const formErrors = useMemo(() => {
    const errors = {}

    if (!formState.name.trim()) {
      errors.name = 'Name is required.'
    }

    if (!formState.phone.trim()) {
      errors.phone = 'Phone number is required.'
    } else if (!isValidPhone(formState.phone)) {
      errors.phone = 'Enter a valid phone number.'
    }

    if (!isValidEmail(formState.email)) {
      errors.email = 'Enter a valid email address.'
    }

    if (!formState.message.trim()) {
      errors.message = 'Message is required.'
    }

    return errors
  }, [formState])

  const canSubmit = Object.keys(formErrors).length === 0

  const handleChange = (event) => {
    setFormState((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
  }

  const getFieldError = (field) => {
    if (!submitted && !touched[field]) {
      return undefined
    }
    return formErrors[field]
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)

    if (!canSubmit) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      await addInquiry(formState)

      const notificationPayload = {
        ...formState,
        recipients: [NOTIFICATION_EMAIL],
        whatsappNumber: MOBILE.whatsapp,
      }

      if (hasNotificationBackend) {
        await Promise.all([
          notifyEmail('inquiry', notificationPayload),
          notifyWhatsApp('inquiry', notificationPayload),
        ])
      }

      if (!hasNotificationBackend) {
        const lines = [
          `Name: ${formState.name}`,
          formState.company ? `Company: ${formState.company}` : null,
          `Phone: ${formState.phone}`,
          formState.email ? `Email: ${formState.email}` : null,
          `Message: ${formState.message}`,
        ].filter(Boolean)

        window.location.href = getWhatsAppHref(lines.join('\n'))
      }

      setStatus('success')
      setFormState({ name: '', company: '', phone: '', email: '', message: '' })
      setTouched({})
      setSubmitted(false)
    } catch (error) {
      console.error('Failed to submit inquiry', error)
      setStatus('error')
    }
  }

  const safeSettings = contactSettings || defaultSettings

  const detailCards = [
    {
      icon: MapPin,
      title: safeSettings.locationTitle,
      lines: safeSettings.addressLines,
      actionLabel: safeSettings.directionsLabel,
      actionHref: safeSettings.mapLink,
    },
    {
      icon: Phone,
      title: safeSettings.phoneTitle,
      isPhoneCard: true,
      actionLabel: 'Call Now',
      actionHref: PRIMARY_PHONE.tel,
    },
    {
      icon: Mail,
      title: safeSettings.emailTitle,
      lines: safeSettings.emails,
      actionLabel: 'Send Email',
      actionHref: `mailto:${safeSettings.emails?.[0] || defaultSettings.emails[0]}`,
    },
    {
      icon: Clock,
      title: safeSettings.hoursTitle,
      lines: safeSettings.workingHours,
    },
  ]

  return (
    <div className="bg-nelna-green-soft">
      <section className="surface-brand-green relative overflow-hidden py-16">
        <BrandChickenMascot
          size="sm"
          variant="float"
          animate
          className="pointer-events-none absolute bottom-2 right-4 z-0 hidden opacity-85 sm:block md:right-10"
        />
        <div className="page-shell relative z-10">
          <p className="inline-flex rounded-pill border border-brand-yellow-300/65 bg-brand-yellow-500/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-50">
            Contact and Sales Support
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-nelna-white md:text-5xl">Find Us and Get in Touch</h1>
          <p className="mt-4 max-w-3xl text-base font-medium text-nelna-white/90 md:text-lg">
            Reach Nelna Farm for product inquiries, distribution partnerships, and food-safety related questions.
          </p>
        </div>
      </section>

      <section className="page-shell -mt-8 pb-12">
        {settingsError ? (
          <div className="mb-5">
            <ErrorState title="Using fallback contact details" description={settingsError} onRetry={() => window.location.reload()} retryLabel="Retry" />
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            {settingsLoading ? (
              <div className="surface-card flex min-h-[220px] items-center justify-center p-6">
                <LoadingSpinner label="Loading contact settings..." />
              </div>
            ) : (
              detailCards.map((card) => (
                <article key={card.title} className="surface-card p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700">
                      <card.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <h2 className="text-base font-semibold tracking-tight text-nelna-dark">{card.title}</h2>
                      {card.isPhoneCard ? (
                        <PhoneContactLines />
                      ) : (
                        <div className="mt-2 space-y-1 text-sm font-medium text-nelna-dark/90">
                          {card.lines?.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      )}
                      {card.actionHref ? (
                        <a
                          href={card.actionHref}
                          target={card.actionHref.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-green-700"
                        >
                          {card.actionLabel}
                          <Navigation className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))
            )}

            <article className="surface-card p-5 md:p-6">
              <h2 className="text-base font-semibold tracking-tight text-nelna-dark">Department Contacts</h2>
              <ul className="mt-3 space-y-2 text-sm font-medium text-nelna-dark/90">
                <li>Sales: sales@nelna.lk</li>
                <li>Distributor Support: distributors@nelna.lk</li>
                <li>Quality & Safety: quality@nelna.lk</li>
              </ul>
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-brand-green-300 bg-brand-green-100/70 px-4 py-2 text-sm font-semibold text-brand-green-800"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp: {MOBILE.display}
              </a>
            </article>

            <article className="surface-card overflow-hidden p-0">
              <iframe
                title="Nelna Farm location"
                src={safeSettings.mapEmbedUrl}
                loading="lazy"
                className="h-72 w-full border-0"
              />
            </article>
          </div>

          <div id="distributor-partnership" className="surface-card p-5 md:p-7 h-fit">
            <div className="rounded-2xl border border-brand-green-100 bg-brand-green-50/65 p-4">
              <h2 className="text-base font-bold text-brand-green-900 md:text-lg">
                Distributor and Dealer Partnership Inquiries
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-nelna-dark/90">
                Tell us your location, product interest, and expected monthly volume. Our sales team will review partnership opportunities, supply planning, and onboarding support.
              </p>
            </div>
            <SectionTitle
              className="mt-5"
              title="Have an Inquiry?"
              subtitle="We usually respond within the same business day."
            />
            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit} noValidate>
              <Input
                name="name"
                label="Name"
                value={formState.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={getFieldError('name')}
              />
              <Input
                name="company"
                label="Company"
                value={formState.company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="phone"
                label="Phone"
                value={formState.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                hint="Format: 0777774029 or +94 77 777 4029"
                error={getFieldError('phone')}
              />
              <Input
                name="email"
                label="Email (optional)"
                value={formState.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getFieldError('email')}
              />
              <Textarea
                className="md:col-span-2"
                name="message"
                label="Message"
                value={formState.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                required
                error={getFieldError('message')}
              />

              <div className="md:col-span-2 space-y-3 pt-1">
                <Button type="submit" loading={status === 'loading'} variant="primary" className="w-full sm:w-auto">
                  Send Message
                </Button>
                {status === 'success' ? (
                  <div className="form-feedback form-feedback--success" role="alert">
                    ✓ Message sent! We&apos;ll contact you within 24 hours.
                  </div>
                ) : null}
                {status === 'error' ? (
                  <div className="form-feedback form-feedback--error" role="alert">
                    ✗ Something went wrong. Please call us or WhatsApp directly.
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
