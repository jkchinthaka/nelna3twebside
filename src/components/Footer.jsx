import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Twitter,
} from 'lucide-react'
import wordmarkLogo from '../assets/Vector Smart Object.png'

const businessLinks = [
  { to: '/contact', label: 'Contact Sales' },
  { to: '/contact#distributor-partnership', label: 'Become a Distributor' },
  { to: '/portal', label: 'Portal Login' },
]

const qualityLinks = [
  { to: '/quality-safety', label: 'Quality & Safety' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/traceability', label: 'Traceability' },
  { to: '/process', label: 'Our Process' },
  { to: '/sustainability', label: 'Sustainability' },
]

const companyLinks = [
  { to: '/about', label: 'About Nelna' },
  { to: '/process', label: 'Our Process' },
  { to: '/news', label: 'News & Updates' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const businessHours = [
  'Monday to Friday: 8:00 AM - 5:00 PM',
  'Saturday: 8:00 AM - 12:00 PM',
  'Sunday: Closed',
]

const socialLinks = [
  { label: 'Facebook', Icon: Facebook, href: import.meta.env.VITE_SOCIAL_FACEBOOK || '' },
  { label: 'Instagram', Icon: Instagram, href: import.meta.env.VITE_SOCIAL_INSTAGRAM || '' },
  { label: 'LinkedIn', Icon: Linkedin, href: import.meta.env.VITE_SOCIAL_LINKEDIN || '' },
  { label: 'X', Icon: Twitter, href: import.meta.env.VITE_SOCIAL_X || '' },
]

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

function Footer() {
  const currentYear = new Date().getFullYear()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState({ type: 'idle', message: '' })

  const hasAnySocialLink = socialLinks.some((item) => Boolean(item.href))

  const handleNewsletterSubmit = (event) => {
    event.preventDefault()

    const email = newsletterEmail.trim()
    if (!isValidEmail(email)) {
      setNewsletterStatus({
        type: 'error',
        message: 'Enter a valid email address to subscribe.',
      })
      return
    }

    const subject = encodeURIComponent('Newsletter Subscription Request')
    const body = encodeURIComponent(`Please subscribe this email to Nelna Farm updates: ${email}`)
    window.location.href = `mailto:info@nelna.lk?subject=${subject}&body=${body}`

    setNewsletterEmail('')
    setNewsletterStatus({
      type: 'success',
      message: 'Subscription request prepared. Please confirm in your email app.',
    })
  }

  return (
    <footer className="bg-brand-green-950 pt-14 text-brand-green-50">
      <div className="page-shell">
        <section className="rounded-2xl border border-brand-green-700 bg-brand-green-900/80 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="font-display text-xl font-bold text-white md:text-2xl">
                Stay Connected with Nelna Farm
              </h2>
              <p className="mt-2 text-sm text-brand-green-100 md:text-base">
                Receive product updates, quality announcements, and news from Sri Lanka&apos;s trusted poultry brand.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleNewsletterSubmit} noValidate>
              <input
                type="email"
                className="field-base rounded-pill border-brand-green-600 bg-brand-green-950 text-brand-green-50 placeholder:text-brand-green-200"
                placeholder="Enter your email"
                aria-label="Newsletter email"
                value={newsletterEmail}
                onChange={(event) => {
                  setNewsletterEmail(event.target.value)
                  if (newsletterStatus.type !== 'idle') {
                    setNewsletterStatus({ type: 'idle', message: '' })
                  }
                }}
                required
              />
              <button type="submit" className="btn-yellow whitespace-nowrap px-5 py-3">
                Subscribe
              </button>
            </form>
            {newsletterStatus.message ? (
              <p
                className={`text-xs font-medium lg:col-span-2 ${
                  newsletterStatus.type === 'error' ? 'text-brand-red-300' : 'text-brand-yellow-200'
                }`}
                aria-live="polite"
              >
                {newsletterStatus.message}
              </p>
            ) : null}
          </div>
        </section>

        <section className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-4 sm:col-span-2 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Nelna Farm home">
              <img
                src={wordmarkLogo}
                alt="Nelna Farm"
                loading="lazy"
                width={250}
                height={64}
                className="h-14 w-[220px] object-cover object-center md:h-16 md:w-[250px]"
              />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-brand-green-100">
              Nelna Farm (Pvt) Ltd is a Sri Lankan poultry and food company delivering premium protein products with certified quality, food safety, and dependable nationwide distribution.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, Icon, href }) => {
                const iconClassName =
                  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-brand-green-600 bg-brand-green-900/95 text-brand-green-50'

                if (!href) {
                  return (
                    <span
                      key={`social-${label}`}
                      className={`${iconClassName} cursor-not-allowed opacity-60`}
                      title={`${label} link coming soon`}
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  )
                }

                return (
                  <a
                    key={`social-${label}`}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${iconClassName} transition hover:border-brand-yellow-300 hover:text-brand-yellow-300`}
                    aria-label={`Follow Nelna Farm on ${label}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
            {!hasAnySocialLink ? (
              <p className="text-xs text-brand-green-200">Official social channels will be linked here soon.</p>
            ) : null}
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-300">For Business</h3>
            <ul className="space-y-2">
              {businessLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-brand-green-100 transition hover:text-brand-yellow-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-300">Quality & Safety</h3>
            <ul className="space-y-2">
              {qualityLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-brand-green-100 transition hover:text-brand-yellow-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-300">Certifications</h3>
            <div className="flex flex-col gap-2">
              {['Halal Certified', 'ISO 22000', 'HACCP & GMP', 'Farm Fresh Quality'].map((item) => (
                <span
                  key={item}
                  className="inline-flex w-fit rounded-md bg-brand-green-600 px-3 py-1 text-xs font-semibold text-white"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
            <h3 className="mb-4 mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-300">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-brand-green-100 transition hover:text-brand-yellow-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-8 border-t border-brand-green-800 py-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-300">Contact</h3>
            <ul className="space-y-3 text-sm text-brand-green-100">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                <span>3A, Hathduwa Estate, Ranwala, Meethirigala, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                <a href="tel:+94112405091" className="transition hover:text-brand-yellow-300">+94 11 240 5091-94</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                <a href="mailto:info@nelna.lk" className="transition hover:text-brand-yellow-300">info@nelna.lk</a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://wa.me/94762718923"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#25D366] transition hover:underline"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                <span>ISO 22000, HACCP, GMP, Halal</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-300">Business Hours</h3>
            <ul className="space-y-2 text-sm text-brand-green-100">
              {businessHours.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-3 border-t border-brand-green-800 py-5 text-xs text-brand-green-100 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {currentYear} Nelna Farm (Pvt) Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="transition hover:text-brand-yellow-300">Privacy</Link>
            <Link to="/terms" className="transition hover:text-brand-yellow-300">Terms</Link>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer
