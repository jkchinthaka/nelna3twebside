import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react'
import useAuth from '../context/useAuth.js'
import logo from '../assets/nelna-logo.png'
import {
  COMPANY_LOCATION_SHORT,
  MAP_LINK,
  PRIMARY_PHONE,
} from '../data/companyContact.js'

const directLinks = [
  { to: '/', key: 'nav.home', fallback: 'Home' },
  { to: '/about', key: 'nav.about', fallback: 'About' },
  { to: '/quality-safety', key: 'nav.quality', fallback: 'Quality & Safety' },
  { to: '/contact', key: 'nav.contact', fallback: 'Contact' },
]

const dropdownMenus = [
  {
    id: 'business',
    key: 'nav.business',
    fallback: 'For Business',
    items: [
      { to: '/contact', label: 'Contact Sales' },
      { to: '/contact#distributor-partnership', label: 'Become a Distributor' },
    ],
  },
  {
    id: 'company',
    key: 'nav.company',
    fallback: 'Company',
    items: [
      { to: '/process', label: 'Our Process' },
      { to: '/sustainability', label: 'Sustainability & CSR' },
      { to: '/certifications', label: 'Certifications' },
      { to: '/traceability', label: 'Traceability' },
      { to: '/news', label: 'News & Updates' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
]

function isPathActive(pathname, to) {
  const path = String(to).split('?')[0]
  return pathname === path || pathname.startsWith(`${path}/`)
}

function TopBar() {
  return (
    <>
      <div className="site-topbar md:hidden" aria-label="Site notice">
        <div className="site-topbar__shell">
          <p className="site-topbar__tagline site-topbar__tagline--compact">Trusted Since 1996</p>
        </div>
      </div>

      <div className="site-topbar hidden md:block lg:hidden" aria-label="Contact shortcuts">
        <div className="site-topbar__shell">
          <p className="site-topbar__tagline hidden min-[860px]:block">Trusted Sri Lankan Poultry Since 1996</p>
          <p className="site-topbar__tagline min-[860px]:hidden">Trusted Since 1996</p>
          <div className="site-topbar__actions">
            <a href={`tel:${PRIMARY_PHONE.tel}`} className="site-topbar__chip">
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{PRIMARY_PHONE.display}</span>
            </a>
            <a href={MAP_LINK} target="_blank" rel="noreferrer" className="site-topbar__chip">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="max-w-[8.5rem] truncate sm:max-w-none">{COMPANY_LOCATION_SHORT}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="site-topbar hidden lg:block" aria-label="Contact information">
        <div className="site-topbar__shell">
          <p className="site-topbar__tagline">Trusted Sri Lankan Poultry Since 1996</p>
          <div className="site-topbar__actions">
            <a href={`tel:${PRIMARY_PHONE.tel}`} className="site-topbar__chip">
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{PRIMARY_PHONE.display}</span>
            </a>
            <a href="mailto:info@nelna.lk" className="site-topbar__chip">
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>info@nelna.lk</span>
            </a>
            <a href={MAP_LINK} target="_blank" rel="noreferrer" className="site-topbar__chip">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{COMPANY_LOCATION_SHORT}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

function DesktopNav({ pathname, t }) {
  const [openMenu, setOpenMenu] = useState(null)

  return (
    <nav className="site-navbar__nav" aria-label="Primary navigation">
      <div className="site-nav-pill">
        {directLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className="relative">
            {({ isActive }) => (
              <span className={`site-nav-link ${isActive ? 'site-nav-link--active' : ''}`}>
                {t(link.key, { defaultValue: link.fallback })}
              </span>
            )}
          </NavLink>
        ))}

        {dropdownMenus.map((menu) => {
          const isOpen = openMenu === menu.id
          const isActive = menu.items.some((item) => isPathActive(pathname, item.to))

          return (
            <div
              key={menu.id}
              className="site-nav-dropdown"
              onMouseEnter={() => setOpenMenu(menu.id)}
              onMouseLeave={() => setOpenMenu((value) => (value === menu.id ? null : value))}
            >
              <button
                type="button"
                onClick={() => setOpenMenu((value) => (value === menu.id ? null : menu.id))}
                className={`site-nav-link ${isActive ? 'site-nav-link--active' : ''}`}
                aria-expanded={isOpen}
                aria-haspopup="menu"
              >
                {t(menu.key, { defaultValue: menu.fallback })}
                <ChevronDown
                  className={`ml-0.5 h-4 w-4 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {isOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16 }}
                    className="site-nav-dropdown__menu"
                    role="menu"
                  >
                    <p className="site-nav-dropdown__label">{t(menu.key, { defaultValue: menu.fallback })}</p>
                    {menu.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        onClick={() => setOpenMenu(null)}
                        className={({ isActive: itemActive }) =>
                          `site-nav-dropdown__item ${itemActive ? 'site-nav-dropdown__item--active' : ''}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

function UserMenu({ user, role, logout }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const initials = useMemo(() => {
    const base = user?.displayName || user?.name || user?.email || 'U'
    return String(base).trim().charAt(0).toUpperCase()
  }, [user])

  const dashboardLink = role === 'distributor' ? '/distributor' : '/admin'
  const dashboardLabel = role === 'distributor' ? 'Distributor Portal' : 'Admin Portal'
  const DashboardIcon = role === 'distributor' ? Truck : ShieldCheck

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-brand-green text-sm font-bold text-nelna-white shadow-[0_12px_28px_-14px_rgba(39,116,58,0.95)] ring-2 ring-brand-green-100 transition hover:scale-[1.03] hover:brightness-95"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        {initials}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.16 }}
            className="site-nav-dropdown__menu site-nav-dropdown__menu--align-end"
          >
            <Link
              to={dashboardLink}
              onClick={() => setOpen(false)}
              className="site-nav-dropdown__item gap-2"
            >
              <DashboardIcon className="h-4 w-4 text-brand-green-700" aria-hidden="true" />
              <span>{dashboardLabel}</span>
            </Link>
            <button
              type="button"
              onClick={async () => {
                setOpen(false)
                await logout()
              }}
              className="site-nav-dropdown__item w-full gap-2 text-left"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span>Logout</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const { user, role, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setMobileExpanded(null)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  const pathname = location.pathname
  const isHomeHero = pathname === '/' && !isScrolled

  const navbarStateClass = isScrolled
    ? 'site-navbar--scrolled'
    : isHomeHero
      ? 'site-navbar--overlay'
      : ''

  return (
    <header className="site-header">
      <TopBar />

      <div className={`site-navbar ${navbarStateClass}`}>
        <div className="site-navbar__shell">
          <div className="site-navbar__brand">
            <Link to="/" className="site-navbar__logo-link" aria-label="Nelna Farm home">
              <img
                src={logo}
                alt="Nelna Farm logo"
                className="site-navbar__logo-img"
                width={64}
                height={64}
              />
              <div>
                <p className="site-navbar__wordmark-title">NELNA</p>
                <p className="site-navbar__wordmark-sub">Farm</p>
              </div>
            </Link>
          </div>

          <DesktopNav key={pathname} pathname={pathname} t={t} />

          <div className="site-navbar__cta">
            <Link to="/contact" className="nav-cta">
              Contact Sales
            </Link>
            {user ? <UserMenu user={user} role={role} logout={logout} /> : null}
          </div>

          <div className="site-navbar__mobile">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="site-navbar__mobile-toggle"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-nelna-dark/52 backdrop-blur-[2px] lg:hidden"
            onClick={closeMobile}
            role="presentation"
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="site-mobile-drawer"
              aria-label="Mobile navigation panel"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-nelna-dark-soft px-5 py-4">
                <div className="inline-flex items-center gap-2.5">
                  <img
                    src={logo}
                    alt="Nelna Farm logo"
                    className="site-navbar__logo-img"
                    width={44}
                    height={44}
                  />
                  <div>
                    <p className="text-sm font-bold tracking-[0.03em] text-nelna-green">NELNA FARM</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-nelna-dark-bg opacity-70">
                      Navigation
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="site-navbar__mobile-toggle"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Mobile primary navigation">
                <div className="space-y-1.5">
                  {directLinks.map((link) => (
                    <NavLink key={link.to} to={link.to} onClick={closeMobile} className="block">
                      {({ isActive }) => (
                        <span className={`site-mobile-drawer__link ${isActive ? 'site-mobile-drawer__link--active' : ''}`}>
                          {t(link.key, { defaultValue: link.fallback })}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-5 border-t border-nelna-dark-soft pt-4">
                  {dropdownMenus.map((menu) => {
                    const expanded = mobileExpanded === menu.id

                    return (
                      <div key={menu.id} className="mb-2 overflow-hidden rounded-xl border border-nelna-dark-soft bg-nelna-white">
                        <button
                          type="button"
                          onClick={() => setMobileExpanded((value) => (value === menu.id ? null : menu.id))}
                          className="flex min-h-[44px] w-full items-center justify-between px-4 text-left text-nav font-semibold text-nelna-dark-bg"
                          aria-expanded={expanded}
                        >
                          <span>{t(menu.key, { defaultValue: menu.fallback })}</span>
                          <ChevronDown className={`h-4 w-4 shrink-0 transition ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>

                        <AnimatePresence initial={false}>
                          {expanded ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.16 }}
                              className="overflow-hidden border-t border-nelna-dark-soft"
                            >
                              <div className="space-y-1 p-2">
                                {menu.items.map((item) => (
                                  <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={closeMobile}
                                    className={({ isActive }) =>
                                      `block site-mobile-drawer__link ${isActive ? 'site-mobile-drawer__link--active' : ''}`
                                    }
                                  >
                                    {item.label}
                                  </NavLink>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </nav>

              <div className="space-y-3 border-t border-nelna-dark-soft p-4">
                <Link to="/contact" onClick={closeMobile} className="nav-cta w-full">
                  Contact Sales
                </Link>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${PRIMARY_PHONE.tel}`}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-nelna-dark-soft bg-nelna-green-soft px-3 text-sm font-semibold text-nelna-dark-bg transition hover:bg-nelna-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-nelna-green" aria-hidden="true" />
                    <span>{PRIMARY_PHONE.display}</span>
                  </a>
                  <a
                    href="mailto:info@nelna.lk"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-nelna-dark-soft bg-nelna-green-soft px-3 text-sm font-semibold text-nelna-dark-bg transition hover:bg-nelna-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-nelna-green" aria-hidden="true" />
                    <span>Email</span>
                  </a>
                </div>

                {user ? (
                  <>
                    <Link
                      to={role === 'distributor' ? '/distributor' : '/admin'}
                      onClick={closeMobile}
                      className="nav-cta w-full bg-nelna-green-light border-nelna-green-light"
                    >
                      {role === 'distributor' ? 'Open Distributor Portal' : 'Open Admin Portal'}
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        closeMobile()
                        await logout()
                      }}
                      className="nav-cta w-full bg-nelna-green-dark border-nelna-green-dark"
                    >
                      Logout
                    </button>
                  </>
                ) : null}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
