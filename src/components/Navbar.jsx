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
import mango3dLogo from '../assets/mongo3dlogo.png'

const directLinks = [
  { to: '/', key: 'nav.home', fallback: 'Home' },
  { to: '/product-finder', key: 'nav.productFinder', fallback: 'Product Finder' },
  { to: '/quality-safety', key: 'nav.quality', fallback: 'Quality & Safety' },
  { to: '/contact', key: 'nav.contact', fallback: 'Contact' },
]

const dropdownMenus = [
  {
    id: 'products',
    key: 'nav.products',
    fallback: 'Products',
    items: [
      { to: '/products', label: 'All Products' },
      { to: '/products?cat=frozen', label: 'Frozen Range' },
      { to: '/products?cat=value-added', label: 'Value Added' },
      { to: '/recipes', label: 'Recipes' },
    ],
  },
  {
    id: 'company',
    key: 'nav.company',
    fallback: 'Company',
    items: [
      { to: '/about', label: 'About Us' },
      { to: '/process', label: 'Process' },
      { to: '/sustainability', label: 'Sustainability & CSR' },
      { to: '/certifications', label: 'Certifications' },
      { to: '/traceability', label: 'Traceability' },
    ],
  },
  {
    id: 'resources',
    key: 'nav.resources',
    fallback: 'Resources',
    items: [
      { to: '/news', label: 'News & Updates' },
      { to: '/faq', label: 'FAQ' },
      { to: '/privacy', label: 'Privacy' },
      { to: '/terms', label: 'Terms' },
    ],
  },
]

function isPathActive(pathname, to) {
  const path = String(to).split('?')[0]
  return pathname === path || pathname.startsWith(`${path}/`)
}

function TopBar() {
  return (
    <div className="hidden border-b border-brand-green-800/80 bg-gradient-to-r from-brand-green-950 via-brand-green-900 to-brand-green-800 text-brand-green-50 lg:block">
      <div className="page-shell flex min-h-[42px] items-center justify-between gap-4 py-1.5 text-[11px] xl:text-xs">
        <p className="font-semibold uppercase tracking-[0.12em] text-brand-yellow-200">
          Delivering Sri Lanka's Trusted Poultry Excellence Since 1998
        </p>
        <div className="flex items-center gap-2 text-brand-green-50 xl:gap-3">
          <a
            href="tel:+94112405091"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 transition hover:bg-white/20 hover:text-brand-yellow-200"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>+94 11 240 5091-94</span>
          </a>
          <a
            href="mailto:info@nelna.lk"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 transition hover:bg-white/20 hover:text-brand-yellow-200"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span>info@nelna.lk</span>
          </a>
          <a
            href="https://maps.google.com/?q=Nelna+Farm,+Meethirigala"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 transition hover:bg-white/20 hover:text-brand-yellow-200 xl:inline-flex"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Meethirigala, Sri Lanka</span>
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
      <div className="flex items-center gap-0.5 rounded-full border border-slate-200/90 bg-white/95 px-1.5 py-1 shadow-sm backdrop-blur">
        {directLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className="relative block rounded-full">
            {({ isActive }) => (
              <span
                className={`relative inline-flex min-h-[40px] items-center whitespace-nowrap rounded-full px-3.5 text-[0.92rem] font-semibold tracking-[0.01em] transition ${
                  isActive
                    ? 'text-brand-green-800'
                    : 'text-slate-700 hover:text-brand-green-700'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="desktop-nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm ring-1 ring-brand-green-100"
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
                className={`relative inline-flex min-h-[40px] items-center gap-1 whitespace-nowrap rounded-full px-3.5 text-[0.92rem] font-semibold transition ${
                  isActive
                    ? 'text-brand-green-800'
                    : 'text-slate-700 hover:text-brand-green-700'
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
                    className="absolute left-1/2 top-full z-50 mt-3 w-60 -translate-x-1/2 rounded-2xl border border-slate-200/90 bg-white/[0.97] p-2 shadow-popover backdrop-blur"
                    role="menu"
                  >
                    <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
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
                              : 'text-slate-700 hover:bg-slate-100 hover:text-brand-green-700'
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
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-gradient-to-br from-brand-green-500 to-brand-green-700 text-sm font-bold text-white shadow-[0_12px_28px_-14px_rgba(39,116,58,0.95)] ring-2 ring-brand-green-100 transition hover:scale-[1.03]"
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
            className="absolute right-0 top-full z-50 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-popover"
          >
            <Link
              to={dashboardLink}
              onClick={() => setOpen(false)}
              className="flex min-h-[42px] items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
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
              className="flex min-h-[42px] w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-brand-red-700 transition hover:bg-brand-red-50"
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
  const mangoRedirectPath = '/mango'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <TopBar />

      <div
        className={`border-b transition duration-300 ${
          isScrolled
            ? 'border-brand-green-100 bg-white shadow-md'
            : 'border-slate-200/80 bg-white'
        }`}
      >
        <div className="page-shell flex min-h-[74px] items-center gap-3 py-2 sm:min-h-[82px]">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
            <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="Nelna Farm home">
              <div className="relative">
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-brand-yellow-300/70 to-brand-green-500/40 opacity-0 blur-[1px] transition group-hover:opacity-100" />
                <img
                  src={logo}
                  alt="Nelna Farm logo"
                  className="relative h-10 w-10 rounded-full border border-white object-cover shadow-sm ring-1 ring-brand-green-100 sm:h-12 sm:w-12"
                />
              </div>
              <div>
                <p className="font-display text-lg font-extrabold leading-none tracking-[0.02em] text-brand-green-800 sm:text-xl">
                  NELNA
                </p>
                <p className="hidden text-[0.65rem] font-bold uppercase tracking-[0.24em] text-brand-yellow-700 sm:block">
                  Farm
                </p>
              </div>
            </Link>

            <Link
              to={mangoRedirectPath}
              className="hidden min-h-[44px] items-center gap-2 rounded-full border border-brand-green-200 bg-white px-2.5 py-1.5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-green-300 lg:inline-flex"
              aria-label="Open Nelna Mango website"
            >
              <img
                src={mango3dLogo}
                alt="Nelna Mango"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-xs font-bold uppercase tracking-[0.11em] text-brand-green-800 xl:inline">
                Nelna Mango
              </span>
            </Link>
          </div>

          <DesktopNav key={pathname} pathname={pathname} t={t} />

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Link
              to="/products#bulk-order"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-red-500 px-4 py-2 text-sm font-bold text-white shadow-[0_14px_30px_-18px_rgba(218,35,40,0.9)] transition hover:bg-brand-red-600"
            >
              Order Now
            </Link>
            {user ? (
              <UserMenu user={user} role={role} logout={logout} />
            ) : null}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <Link
              to={mangoRedirectPath}
              className="inline-flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full border border-brand-green-200 bg-white p-1 shadow-sm"
              aria-label="Open Nelna Mango website"
            >
              <img
                src={mango3dLogo}
                alt="Nelna Mango"
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-brand-green-300 hover:text-brand-green-700"
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
            className="fixed inset-0 z-[70] bg-slate-900/52 backdrop-blur-[2px] lg:hidden"
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="ml-auto flex h-full w-full max-w-[23rem] flex-col border-l border-slate-200 bg-gradient-to-b from-white via-white to-brand-green-50/35"
              aria-label="Mobile navigation panel"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="inline-flex items-center gap-2.5">
                  <img
                    src={logo}
                    alt="Nelna Farm logo"
                    className="h-10 w-10 rounded-full border border-white object-cover shadow-sm ring-1 ring-brand-green-100"
                  />
                  <div>
                    <p className="text-sm font-bold tracking-[0.03em] text-brand-green-800">NELNA FARM</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Navigation</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm"
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
                          className={`relative flex min-h-[46px] items-center rounded-xl border px-4 text-sm font-semibold transition ${
                            isActive
                              ? 'border-brand-green-200 bg-brand-green-50 text-brand-green-800 shadow-sm'
                              : 'border-transparent text-slate-700 hover:border-brand-green-100 hover:bg-white'
                          }`}
                        >
                          {isActive ? <span className="absolute bottom-1 left-4 h-0.5 w-9 rounded-full bg-brand-green-500" /> : null}
                          {t(link.key, { defaultValue: link.fallback })}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  {dropdownMenus.map((menu) => {
                    const expanded = mobileExpanded === menu.id

                    return (
                      <div key={menu.id} className="mb-2 rounded-xl border border-slate-200/80 bg-white/80">
                        <button
                          type="button"
                          onClick={() => setMobileExpanded((value) => (value === menu.id ? null : menu.id))}
                          className="flex min-h-[46px] w-full items-center justify-between px-4 text-left text-sm font-semibold text-slate-800"
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
                              className="overflow-hidden border-t border-slate-200"
                            >
                              <div className="space-y-1 p-2">
                                {menu.items.map((item) => (
                                  <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={closeMobile}
                                    className={({ isActive }) =>
                                      `block rounded-lg px-3 py-2 text-sm transition ${
                                        isActive
                                          ? 'bg-brand-green-50 font-semibold text-brand-green-800'
                                          : 'text-slate-700 hover:bg-slate-100'
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

              <div className="space-y-2 border-t border-slate-200 p-4">
                <Link
                  to="/products#bulk-order"
                  onClick={closeMobile}
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-red-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-red-600"
                >
                  Order Now
                </Link>

                <Link
                  to={mangoRedirectPath}
                  onClick={closeMobile}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-brand-green-200 bg-white px-4 py-2 text-sm font-bold text-brand-green-800 shadow-sm transition hover:border-brand-green-300"
                >
                  <img src={mango3dLogo} alt="Nelna Mango" className="h-7 w-7 rounded-full object-cover" />
                  Visit Nelna Mango
                </Link>

                {user ? (
                  <>
                    <Link
                      to={role === 'distributor' ? '/distributor' : '/admin'}
                      onClick={closeMobile}
                      className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-green-700"
                    >
                      {role === 'distributor' ? 'Open Distributor Portal' : 'Open Admin Portal'}
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        closeMobile()
                        await logout()
                      }}
                      className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-red-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-red-600"
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
