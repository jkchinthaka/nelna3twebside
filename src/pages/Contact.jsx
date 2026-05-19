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


const whatsappNumber = '94762718923'
const notificationEmail = 'info@nelna.lk'

const defaultSettings = {
  locationTitle: 'Our Location',
  addressLines: ['3A, Hathduwa Estate,', 'Ranwala, Meethirigala,', 'Sri Lanka'],
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12666.529853758257!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae300c30985474d%3A0x62957754388373!2sNelna%20Agri%20Development%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1625637258000!5m2!1sen!2slk',
  mapLink: 'https://maps.google.com/?q=Nelna+Farm,+Meethirigala',
  directionsLabel: 'Get Directions',
  phoneTitle: 'Phone Support',
  phoneNumbers: ['+94 11 240 5091-94', '+94 77 123 4567'],
  emailTitle: 'Email',
  emails: ['info@nelna.lk', 'sales@nelna.lk'],
  hoursTitle: 'Working Hours',
  workingHours: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 8:00 AM - 12:00 PM'],
}

function isValidEmail(value) {
  if (!value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidPhone(value) {
  return /^\+?[0-9\s-]{7,20}$/.test(String(value || '').trim())
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
        if (mounted && settings) {
          setContactSettings({ ...defaultSettings, ...settings })
        }
      } catch (error) {
        console.warn('Failed to load contact settings', error)
        if (mounted) {
          setSettingsError('Contact settings are temporarily unavailable. Showing standard company contact details.')
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
        recipients: [notificationEmail],
        whatsappNumber,
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

        window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`
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
  const primaryPhone = (safeSettings.phoneNumbers?.[0] || defaultSettings.phoneNumbers[0]).replace(/\s+/g, '')

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
      lines: safeSettings.phoneNumbers,
      actionLabel: 'Call Now',
      actionHref: `tel:${primaryPhone}`,
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
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-brand-green-950 via-brand-green-900 to-brand-green-800 py-16 text-white">
        <div className="page-shell">
          <p className="inline-flex rounded-pill border border-brand-yellow-300/65 bg-brand-yellow-500/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-50">
            Contact and Sales Support
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-white md:text-5xl">Find Us and Get in Touch</h1>
          <p className="mt-4 max-w-3xl text-base font-medium text-brand-green-50/95 md:text-lg">
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
                      <h2 className="text-base font-semibold tracking-tight text-slate-900">{card.title}</h2>
                      <div className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                        {card.lines?.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
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
              <h2 className="text-base font-semibold tracking-tight text-slate-900">Department Contacts</h2>
              <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
                <li>Sales: sales@nelna.lk</li>
                <li>Distributor Support: distributors@nelna.lk</li>
                <li>Quality & Safety: quality@nelna.lk</li>
              </ul>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-brand-green-300 bg-brand-green-100/70 px-4 py-2 text-sm font-semibold text-brand-green-800"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Quick Contact
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
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                Tell us your location, product interest, and expected monthly volume. Our sales team will review partnership opportunities, supply planning, and onboarding support.
              </p>
            </div>
            <SectionTitle
              className="mt-5"
              title="Send an Inquiry"
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
                hint="Format: +94 7X XXX XXXX"
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

              <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-1">
                <Button type="submit" loading={status === 'loading'}>
                  Submit Inquiry
                </Button>
                {status === 'success' ? <p className="text-sm font-semibold text-brand-green-700">Inquiry sent successfully.</p> : null}
                {status === 'error' ? <p className="text-sm font-semibold text-brand-red-700">Please review your details and try again.</p> : null}
              </div>
            </form>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Contact
