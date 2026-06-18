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
import logo from '../assets/nelna-logo.jpg'
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
    <div className="hidden border-b border-nelna-white/10 bg-nelna-green-dark text-nelna-white lg:block">
      <div className="page-shell flex min-h-topbar items-center justify-between gap-3 py-1 text-topbar">
        <p className="font-medium uppercase tracking-[0.1em] text-nelna-white/90">
          Trusted Sri Lankan poultry since 1996
        </p>
        <div className="flex items-center gap-2 text-nelna-white xl:gap-3">
          <a
            href={`tel:${PRIMARY_PHONE.tel}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-nelna-white/10 px-3 py-1 transition hover:bg-nelna-white/20 hover:text-nelna-gold"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{PRIMARY_PHONE.display}</span>
          </a>
          <a
            href="mailto:info@nelna.lk"
            className="inline-flex items-center gap-1.5 rounded-full bg-nelna-white/10 px-3 py-1 transition hover:bg-nelna-white/20 hover:text-nelna-gold"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span>info@nelna.lk</span>
          </a>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-nelna-white/10 px-3 py-1 transition hover:bg-nelna-white/20 hover:text-nelna-gold xl:inline-flex"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{COMPANY_LOCATION_SHORT}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

function DesktopNav({ pathname, t }) {
  const [openMenu, setOpenMenu] = useState(null)

  return (
    <nav className="hidden flex-1 items-center justify-center px-2 lg:flex" aria-label="Primary navigation">
      <div className="flex items-center gap-0.5 rounded-full border border-nelna-dark-soft/90 bg-nelna-white/95 px-1.5 py-1 shadow-sm backdrop-blur">
        {directLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className="relative block rounded-full">
            {({ isActive }) => (
              <span
                className={`relative inline-flex min-h-[38px] items-center whitespace-nowrap rounded-full px-3 text-nav font-semibold tracking-[0.01em] transition ${
                  isActive
                    ? 'text-brand-green-800'
                    : 'text-nelna-dark/90 hover:text-brand-green-700'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="desktop-nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-nelna-white shadow-sm ring-1 ring-brand-green-100"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                ) : null}
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
              className="relative"
              onMouseEnter={() => setOpenMenu(menu.id)}
              onMouseLeave={() => setOpenMenu((value) => (value === menu.id ? null : value))}
            >
              <button
                type="button"
                onClick={() => setOpenMenu((value) => (value === menu.id ? null : menu.id))}
                className={`relative inline-flex min-h-[38px] items-center gap-1 whitespace-nowrap rounded-full px-3 text-[0.875rem] font-semibold transition ${
                  isActive
                    ? 'text-brand-green-800'
                    : 'text-nelna-dark/90 hover:text-brand-green-700'
                }`}
                aria-expanded={isOpen}
                aria-haspopup="menu"
              >
                {isActive ? (
                  <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-brand-green-500" />
                ) : null}
                {t(menu.key, { defaultValue: menu.fallback })}
                <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              <AnimatePresence>
                {isOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-1/2 top-full z-50 mt-3 w-60 -translate-x-1/2 rounded-2xl border border-nelna-dark-soft/90 bg-nelna-white/[0.97] p-2 shadow-popover backdrop-blur"
                    role="menu"
                  >
                    <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-nelna-dark/70">
                      {t(menu.key, { defaultValue: menu.fallback })}
                    </p>
                    {menu.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        className={({ isActive: itemActive }) =>
                          `relative block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                            itemActive
                              ? 'bg-brand-green-50 text-brand-green-800'
                              : 'text-nelna-dark/90 hover:bg-nelna-green-soft hover:text-brand-green-700'
                          }`
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
            className="absolute right-0 top-full z-50 mt-3 w-56 rounded-2xl border border-nelna-dark-soft bg-nelna-white p-2 shadow-popover"
          >
            <Link
              to={dashboardLink}
              onClick={() => setOpen(false)}
              className="flex min-h-[42px] items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-nelna-dark/90 transition hover:bg-nelna-green-soft"
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
              className="flex min-h-[42px] w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-nelna-green-dark-700 transition hover:bg-nelna-green-dark-50"
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
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  const pathname = location.pathname

  return (
    <header className="fixed inset-x-0 top-0 z-header">
      <TopBar />

      <div
        className={`border-b transition duration-300 ${
          isScrolled
            ? 'nav-scrolled border-brand-green-100/80 bg-nelna-white/95 shadow-nav backdrop-blur-md'
            : 'border-nelna-dark-soft/80 bg-nelna-white/98'
        }`}
      >
        <div className="page-shell flex min-h-header items-center gap-3 py-1.5">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
            <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="Nelna Farm home">
              <div className="relative">
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-nelna-gold/70 to-nelna-green/40 opacity-0 blur-[1px] transition group-hover:opacity-100" />
                <img
                  src={logo}
                  alt="Nelna Farm logo"
                  className="relative h-10 w-10 rounded-full border border-nelna-white object-cover shadow-sm ring-1 ring-brand-green-100 sm:h-12 sm:w-12"
                />
              </div>
              <div>
                <p className="font-display text-lg font-extrabold leading-none tracking-[0.02em] text-nelna-green-dark sm:text-xl">
                  NELNA
                </p>
                <p className="hidden text-[0.65rem] font-bold uppercase tracking-[0.24em] text-nelna-gold sm:block">
                  Farm
                </p>
              </div>
            </Link>


          </div>

          <DesktopNav key={pathname} pathname={pathname} t={t} />

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Link to="/contact" className="btn-primary px-5 py-2.5 text-sm">
              Contact Sales
            </Link>
            {user ? (
              <UserMenu user={user} role={role} logout={logout} />
            ) : null}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-nelna-dark/25 bg-nelna-white text-nelna-dark/90 shadow-sm transition hover:border-brand-green-300 hover:text-brand-green-700"
              aria-label="Open menu"
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
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="ml-auto flex h-full w-full max-w-[23rem] flex-col border-l border-nelna-dark-soft bg-gradient-to-b from-nelna-white via-nelna-white to-brand-green-50/35"
              aria-label="Mobile navigation panel"
            >
              <div className="flex items-center justify-between border-b border-nelna-dark-soft px-5 py-4">
                <div className="inline-flex items-center gap-2.5">
                  <img
                    src={logo}
                    alt="Nelna Farm logo"
                    className="h-10 w-10 rounded-full border border-nelna-white object-cover shadow-sm ring-1 ring-brand-green-100"
                  />
                  <div>
                    <p className="text-sm font-bold tracking-[0.03em] text-brand-green-800">NELNA FARM</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-nelna-dark/70">Navigation</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-nelna-dark/25 bg-nelna-white text-nelna-dark/90 shadow-sm"
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
                        <span
                          className={`relative flex min-h-[46px] items-center rounded-xl border px-4 text-nav font-semibold transition ${
                            isActive
                              ? 'border-brand-green-200 bg-brand-green-50 text-brand-green-800 shadow-sm'
                              : 'border-transparent text-nelna-dark/90 hover:border-brand-green-100 hover:bg-nelna-white'
                          }`}
                        >
                          {isActive ? <span className="absolute bottom-1 left-4 h-0.5 w-9 rounded-full bg-brand-green-500" /> : null}
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
                      <div key={menu.id} className="mb-2 rounded-xl border border-nelna-dark-soft/80 bg-nelna-white/80">
                        <button
                          type="button"
                          onClick={() => setMobileExpanded((value) => (value === menu.id ? null : menu.id))}
                          className="flex min-h-[46px] w-full items-center justify-between px-4 text-left text-nav font-semibold text-nelna-dark"
                          aria-expanded={expanded}
                        >
                          <span>{t(menu.key, { defaultValue: menu.fallback })}</span>
                          <ChevronDown className={`h-4 w-4 transition ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
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
                                      `block rounded-lg px-3 py-2 text-nav transition ${
                                        isActive
                                          ? 'bg-brand-green-50 font-semibold text-brand-green-800'
                                          : 'text-nelna-dark/90 hover:bg-nelna-green-soft'
                                      }`
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

              <div className="space-y-2 border-t border-nelna-dark-soft p-4">
                <Link to="/contact" onClick={closeMobile} className="btn-primary w-full justify-center text-sm">
                  Contact Sales
                </Link>

                {user ? (
                  <>
                    <Link
                      to={role === 'distributor' ? '/distributor' : '/admin'}
                      onClick={closeMobile}
                      className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-green px-4 py-2.5 text-sm font-bold text-nelna-white shadow-sm transition hover:brightness-95"
                    >
                      {role === 'distributor' ? 'Open Distributor Portal' : 'Open Admin Portal'}
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        closeMobile()
                        await logout()
                      }}
                      className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-nelna-green-dark-500 px-4 py-2.5 text-sm font-bold text-nelna-white shadow-sm transition hover:bg-nelna-green-dark-600"
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
