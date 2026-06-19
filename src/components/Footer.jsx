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
  Twitter,
} from 'lucide-react'
import wordmarkLogo from '../assets/Vector Smart Object.png'
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
  { to: '/news', label: 'News & Updates' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const certificationLinks = [
  { to: '/certifications', label: 'ISO 22000' },
  { to: '/certifications', label: 'HACCP & GMP' },
  { to: '/certifications', label: 'Halal Certified' },
]

const businessHours = 'Mon–Fri 8:00–17:00 · Sat 8:00–12:00'

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
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer__shell">
        <div className="site-footer__newsletter">
          <div className="site-footer__newsletter-copy">
            <p className="site-footer__newsletter-eyebrow">Stay Connected</p>
            <h2 className="site-footer__newsletter-title">Nelna Farm Updates</h2>
          </div>
          <form className="site-footer__newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
            <input
              type="email"
              className="site-footer__newsletter-input"
              placeholder="Your email address"
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
            <button type="submit" className="site-footer__newsletter-btn">
              Subscribe
            </button>
          </form>
          {newsletterStatus.message ? (
            <p
              className={`site-footer__newsletter-status site-footer__newsletter-status--${newsletterStatus.type}`}
              aria-live="polite"
            >
              {newsletterStatus.message}
            </p>
          ) : null}
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo-link" aria-label="Nelna Farm home">
              <img
                src={wordmarkLogo}
                alt="Nelna Farm"
                loading="lazy"
                width={220}
                height={56}
                className="site-footer__logo"
              />
            </Link>
            <p className="site-footer__brand-text">
              Nelna Farm (Pvt) Ltd delivers premium poultry and food products with certified quality,
              food safety, and dependable nationwide distribution across Sri Lanka.
            </p>
            <ul className="site-footer__contact-list">
              <li>
                <MapPin className="site-footer__contact-icon" aria-hidden="true" />
                <span className="site-footer__contact-text">{COMPANY_ADDRESS_FULL}</span>
              </li>
              <li>
                <Phone className="site-footer__contact-icon" aria-hidden="true" />
                <span className="site-footer__phones">
                  {TELEPHONES.map((phone) => (
                    <a key={phone.tel} href={`tel:${phone.tel}`} className="site-footer__link">
                      {phone.display}
                    </a>
                  ))}
                </span>
              </li>
              <li>
                <Phone className="site-footer__contact-icon" aria-hidden="true" />
                <a href={`tel:${MOBILE.tel}`} className="site-footer__link">
                  Mobile: {MOBILE.display}
                </a>
              </li>
              <li>
                <Mail className="site-footer__contact-icon" aria-hidden="true" />
                <a href="mailto:info@nelna.lk" className="site-footer__link">
                  info@nelna.lk
                </a>
              </li>
              <li>
                <Clock className="site-footer__contact-icon" aria-hidden="true" />
                <span className="site-footer__contact-text">{businessHours}</span>
              </li>
            </ul>
            <div className="site-footer__social">
              {socialLinks
                .filter(({ href }) => Boolean(href))
                .map(({ label, Icon, href }) => (
                  <a
                    key={`social-${label}`}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="site-footer__social-link"
                    aria-label={`Follow Nelna Farm on ${label}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
            </div>
          </div>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">For Business</h3>
            <ul className="site-footer__links">
              {businessLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="site-footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">Quality &amp; Safety</h3>
            <ul className="site-footer__links">
              {qualityLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="site-footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">Company</h3>
            <ul className="site-footer__links">
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="site-footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="site-footer__heading site-footer__heading--spaced">Certifications</h3>
            <ul className="site-footer__links">
              {certificationLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="site-footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="site-footer__whatsapp">
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noreferrer"
                className="site-footer__link site-footer__link--accent"
              >
                WhatsApp: {MOBILE.display}
              </a>
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            Copyright {currentYear} Nelna Farm (Pvt) Ltd. All rights reserved.
          </p>
          <div className="site-footer__legal">
            <Link to="/privacy" className="site-footer__link">
              Privacy
            </Link>
            <Link to="/terms" className="site-footer__link">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
