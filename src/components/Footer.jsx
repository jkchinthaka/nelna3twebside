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
import BrandChickenMascot from './BrandChickenMascot.jsx'
import {
  COMPANY_ADDRESS_FULL,
  getWhatsAppHref,
  MOBILE,
  TELEPHONES,
} from '../data/companyContact.js'

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
    <footer className="surface-brand-green pt-14">
      <div className="page-shell">
        <section className="rounded-2xl border border-white/20 bg-black/10 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="font-display text-xl font-bold text-white md:text-2xl">
                Stay Connected with Nelna Farm
              </h2>
              <p className="mt-2 text-sm text-white/90 md:text-base">
                Receive product updates, quality announcements, and news from Sri Lanka&apos;s trusted poultry brand.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleNewsletterSubmit} noValidate>
              <input
                type="email"
                className="field-base rounded-pill border-white/25 bg-white/10 text-white placeholder:text-white/60"
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
          <div className="relative space-y-4 sm:col-span-2 lg:col-span-4">
            <BrandChickenMascot
              size="xs"
              className="pointer-events-none absolute -right-1 top-0 opacity-25 lg:-right-4"
            />
            <Link to="/" className="relative inline-flex items-center gap-3" aria-label="Nelna Farm home">
              <img
                src={wordmarkLogo}
                alt="Nelna Farm"
                loading="lazy"
                width={250}
                height={64}
                className="h-14 w-[220px] object-cover object-center md:h-16 md:w-[250px]"
              />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-white/90">
              Nelna Farm (Pvt) Ltd is a Sri Lankan poultry and food company delivering premium protein products with certified quality, food safety, and dependable nationwide distribution.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, Icon, href }) => {
                const iconClassName =
                  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/25 bg-white/10 text-white'

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
              <p className="text-xs text-white/75">Official social channels will be linked here soon.</p>
            ) : null}
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-300">For Business</h3>
            <ul className="space-y-2">
              {businessLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-white/90 transition hover:text-brand-yellow-300">
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
                  <Link to={item.to} className="text-sm text-white/90 transition hover:text-brand-yellow-300">
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
                  className="inline-flex w-fit rounded-md bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
            <h3 className="mb-4 mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-300">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-white/90 transition hover:text-brand-yellow-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-8 border-t border-white/15 py-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-300">Contact</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                <span>{COMPANY_ADDRESS_FULL}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-white">Tel: </span>
                  {TELEPHONES.map((phone, index) => (
                    <span key={phone.tel}>
                      {index > 0 ? <span className="text-white/60"> / </span> : null}
                      <a href={`tel:${phone.tel}`} className="transition hover:text-brand-yellow-300">
                        {phone.display}
                      </a>
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                <a href={`tel:${MOBILE.tel}`} className="transition hover:text-brand-yellow-300">
                  Mobile: {MOBILE.display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                <a href="mailto:info@nelna.lk" className="transition hover:text-brand-yellow-300">info@nelna.lk</a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href={getWhatsAppHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#25D366] transition hover:underline"
                >
                  WhatsApp: {MOBILE.display}
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
            <ul className="space-y-2 text-sm text-white/90">
              {businessHours.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-3 border-t border-white/15 py-5 text-xs text-white/85 sm:flex-row sm:items-center sm:justify-between">
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
