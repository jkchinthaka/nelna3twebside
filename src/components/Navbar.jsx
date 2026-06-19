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
  { to: '/about', key: 'nav.about', fallback: 'About Us' },
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
      <div className="site-topbar lg:hidden" aria-label="Site notice">
        <div className="site-topbar__shell site-topbar__shell--compact">
          <p className="site-topbar__tagline site-topbar__tagline--compact">Trusted Since 1996</p>
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
    <nav className="site-navbar__nav hidden lg:flex" aria-label="Primary navigation">
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

function MobileDrawer({ pathname, t, user, role, logout, closeMobile, mobileExpanded, setMobileExpanded }) {
  const menuLabel = (menu) => t(menu.key, { defaultValue: menu.fallback }) || menu.fallback

  return (
    <>
      <div className="site-mobile-drawer__header">
        <div className="site-mobile-drawer__brand">
          <span className="site-navbar__logo-frame">
            <img
              src={logo}
              alt="Nelna Farm logo"
              className="site-navbar__logo-img"
              width={128}
              height={128}
              decoding="async"
            />
          </span>
          <div className="min-w-0">
            <p className="site-mobile-drawer__title">NELNA FARM</p>
            <p className="site-mobile-drawer__subtitle">Navigation</p>
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

      <div className="site-mobile-drawer__body">
        <nav className="site-mobile-drawer__section" aria-label="Mobile primary navigation">
          {directLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={closeMobile} className="block">
              {({ isActive }) => (
                <span className={`site-mobile-drawer__link ${isActive ? 'site-mobile-drawer__link--active' : ''}`}>
                  {t(link.key, { defaultValue: link.fallback })}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="site-mobile-drawer__section">
          {dropdownMenus
            .filter((menu) => menu.items?.length > 0)
            .map((menu) => {
              const expanded = mobileExpanded === menu.id
              const isGroupActive = menu.items.some((item) => isPathActive(pathname, item.to))
              const label = menuLabel(menu)

              return (
                <div key={menu.id} className="site-mobile-drawer__accordion">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded((value) => (value === menu.id ? null : menu.id))}
                    className={`site-mobile-drawer__accordion-toggle ${isGroupActive ? 'site-mobile-drawer__accordion-toggle--active' : ''}`}
                    aria-expanded={expanded}
                    aria-controls={`mobile-menu-${menu.id}`}
                  >
                    <span>{label}</span>
                    <ChevronDown
                      className={`site-mobile-drawer__chevron ${expanded ? 'site-mobile-drawer__chevron--open' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <motion.div
                        id={`mobile-menu-${menu.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.16 }}
                        className="site-mobile-drawer__submenu-wrap"
                      >
                        <div className="site-mobile-drawer__submenu">
                          {menu.items.map((item) => (
                            <NavLink
                              key={`${menu.id}-${item.to}`}
                              to={item.to}
                              onClick={closeMobile}
                              className={({ isActive }) =>
                                `site-mobile-drawer__link site-mobile-drawer__link--sub ${isActive ? 'site-mobile-drawer__link--active' : ''}`
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

        <div className="site-mobile-drawer__cta-group">
          <Link to="/contact" onClick={closeMobile} className="nav-cta site-mobile-drawer__cta">
            Contact Sales
          </Link>

          <div className="site-mobile-drawer__quick-actions">
            <a href={`tel:${PRIMARY_PHONE.tel}`} className="site-mobile-drawer__quick-btn">
              <Phone className="h-4 w-4 shrink-0 text-nelna-green" aria-hidden="true" />
              <span>{PRIMARY_PHONE.display}</span>
            </a>
            <a href="mailto:info@nelna.lk" className="site-mobile-drawer__quick-btn">
              <Mail className="h-4 w-4 shrink-0 text-nelna-green" aria-hidden="true" />
              <span>Email</span>
            </a>
          </div>

          {user ? (
            <div className="site-mobile-drawer__account">
              <Link
                to={role === 'distributor' ? '/distributor' : '/admin'}
                onClick={closeMobile}
                className="nav-cta site-mobile-drawer__cta bg-nelna-green-light border-nelna-green-light"
              >
                {role === 'distributor' ? 'Open Distributor Portal' : 'Open Admin Portal'}
              </Link>
              <button
                type="button"
                onClick={async () => {
                  closeMobile()
                  await logout()
                }}
                className="nav-cta site-mobile-drawer__cta bg-nelna-green-dark border-nelna-green-dark"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
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
          <div className="site-navbar__brand min-w-0 shrink">
            <Link to="/" className="site-navbar__logo-link" aria-label="Nelna Farm home">
              <span className="site-navbar__logo-frame">
                <img
                  src={logo}
                  alt="Nelna Farm logo"
                  className="site-navbar__logo-img"
                  width={128}
                  height={128}
                  decoding="async"
                />
              </span>
              <div className="min-w-0">
                <p className="site-navbar__wordmark-title">NELNA</p>
                <p className="site-navbar__wordmark-sub">Farm</p>
              </div>
            </Link>
          </div>

          <DesktopNav key={pathname} pathname={pathname} t={t} />

          <div className="site-navbar__cta hidden lg:flex">
            <Link to="/contact" className="nav-cta">
              Contact Sales
            </Link>
            {user ? <UserMenu user={user} role={role} logout={logout} /> : null}
          </div>

          <div className="site-navbar__mobile lg:hidden">
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
              <MobileDrawer
                pathname={pathname}
                t={t}
                user={user}
                role={role}
                logout={logout}
                closeMobile={closeMobile}
                mobileExpanded={mobileExpanded}
                setMobileExpanded={setMobileExpanded}
              />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
