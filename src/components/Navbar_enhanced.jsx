import { useEffect, useState } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { 
  ChevronDown, Menu, X, ShoppingBag, ShieldCheck, Leaf, User, 
  LogOut, Phone, Mail, MapPin, Search, ArrowRight 
} from 'lucide-react'
import useAuth from '../context/useAuth.js'
import logo from '../assets/nelna-logo.png'

// Top Bar Component
const TopBar = () => (
  <div className="bg-brand-950 text-nelna-white py-2 px-4 hidden lg:block border-b border-brand-800">
    <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium tracking-wide">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 opacity-100 transition-opacity">
          <Phone className="w-3 h-3" /> +94 112 40 50 91-94
        </span>
        <span className="flex items-center gap-2 opacity-100 transition-opacity">
          <Mail className="w-3 h-3" /> nelnasales@nelna.lk
        </span>
        <a 
          href="https://www.google.com/maps/place/Nelna+Group+of+Companies/@6.9819911,80.1639191,794m/data=!3m1!1e3!4m6!3m5!1s0x3ae3aa0cdfebd2ed:0x8de576efa2e5c3a!8m2!3d6.9820919!4d80.1662358!16s%2Fg%2F1pp2vmvl_?entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 opacity-100 transition-opacity"
        >
          <MapPin className="w-3 h-3" /> Meethirigala, Sri Lanka
        </a>
      </div>
      <div className="flex items-center gap-4">
        <span className="opacity-100">Island-wide Delivery Available</span>
        <div className="h-3 w-px bg-nelna-white/20"></div>
        <Link to="/news" className="hover:text-gold-400 transition-colors">News & Updates</Link>
        <Link to="/contact" className="hover:text-gold-400 transition-colors">Support</Link>
      </div>
    </div>
  </div>
);

function Navbar() {
  const { t } = useTranslation()
  const { user, role, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [productsHover, setProductsHover] = useState(false)
  const location = useLocation()
  
  const isHome = location.pathname === '/'

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.quality'), path: '/quality-safety' },
    { name: t('nav.sustainability'), path: '/sustainability' },
    // News and Contact moved to clearer locations or kept
  ]

  // Styles
  const navBackground = isScrolled 
    ? 'bg-nelna-white/90 backdrop-blur-md shadow-soft border-b border-brand-100/50' 
    : isHome ? 'bg-transparent' : 'bg-nelna-white/90 backdrop-blur-md shadow-sm';
    
  const textColor = isScrolled || !isHome ? 'text-brand-950' : 'text-nelna-white';
  const logoText = isScrolled || !isHome ? 'text-brand-900' : 'text-nelna-white';
  const hoverColor = isScrolled || !isHome ? 'hover:text-brand-600' : 'hover:text-gold-400';
  const iconColor = isScrolled || !isHome ? 'text-brand-800' : 'text-nelna-white';
  const borderColor = isScrolled || !isHome ? 'border-brand-100' : 'border-nelna-white/20';

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Top Bar - Hide on scroll to save space, or keep if preferred. Let's hide on scroll for cleaner sticky nav */}
        <motion.div 
          animate={{ height: isScrolled ? 0 : 'auto', opacity: isScrolled ? 0 : 1 }}
          className="overflow-hidden"
        >
          <TopBar />
        </motion.div>

        {/* Main Navbar */}
        <motion.header
          className={`transition-all duration-300 ease-in-out px-6 ${navBackground} ${isScrolled ? 'py-3' : 'py-5'}`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group relative z-50">
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 transition-all duration-300 ${borderColor}`}>
                <img src={logo} alt="Nelna Farm" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className={`font-display text-xl font-bold tracking-tight leading-none transition-colors ${logoText}`}>
                  Nelna
                </span>
                <span className={`text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-colors ${isScrolled || !isHome ? 'text-brand-600' : 'text-nelna-white'}`}>
                  Farm
                </span>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              
               {/* Product Mega Menu Trigger */}
               <div
                className="relative px-3 py-2"
                onMouseEnter={() => setProductsHover(true)}
                onMouseLeave={() => setProductsHover(false)}
              >
                <button
                  className={`group flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors ${textColor} ${hoverColor}`}
                >
                  {t('nav.products')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${productsHover ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {productsHover && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full mt-2 w-[650px] -translate-x-1/2 pt-2"
                    >
                       <div className="rounded-2xl bg-nelna-white shadow-float border border-brand-100 overflow-hidden flex">
                          {/* Sidebar */}
                          <div className="w-1/3 bg-brand-50 p-6 flex flex-col justify-between">
                             <div>
                               <h3 className="font-display font-bold text-brand-900 text-lg mb-2">Our Harvest</h3>
                               <p className="text-xs text-brand-600 mb-4">Fresh from the farm to your table.</p>
                             </div>
                             <NavLink to="/products" className="text-xs font-bold uppercase tracking-wider text-brand-700 hover:text-brand-900 flex items-center gap-2 group">
                               View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                             </NavLink>
                          </div>
                          
                          {/* Links Grid */}
                          <div className="w-2/3 p-6 grid grid-cols-2 gap-x-8 gap-y-4">
                             <div>
                                <h4 className="text-xs font-bold uppercase text-nelna-dark/60 tracking-wider mb-3">Categories</h4>
                                <ul className="space-y-2">
                                   <li><NavLink to="/products?cat=fruits" className="block text-sm font-medium text-nelna-dark/90 hover:text-brand-600 transition-colors">Fresh Fruits</NavLink></li>
                                   <li><NavLink to="/products?cat=vegetables" className="block text-sm font-medium text-nelna-dark/90 hover:text-brand-600 transition-colors">Vegetables</NavLink></li>
                                   <li><NavLink to="/products?cat=dairy" className="block text-sm font-medium text-nelna-dark/90 hover:text-brand-600 transition-colors">Dairy Products</NavLink></li>
                                </ul>
                             </div>
                             <div>
                                <h4 className="text-xs font-bold uppercase text-nelna-dark/60 tracking-wider mb-3">Highlights</h4>
                                <div className="space-y-3">
                                   <NavLink to="/products/mangoes" className="flex items-center gap-3 group">
                                      <div className="w-10 h-10 rounded-lg bg-nelna-gold-soft flex items-center justify-center text-nelna-gold group-hover:bg-nelna-gold-soft transition-colors">
                                        <Leaf className="w-5 h-5" />
                                      </div>
                                      <div>
                                        <span className="block text-sm font-bold text-nelna-dark group-hover:text-nelna-gold">Premium Mangoes</span>
                                        <span className="text-[10px] text-nelna-dark/70">Seasonal Special</span>
                                      </div>
                                   </NavLink>
                                </div>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Links */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={() =>
                    `px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 relative group ${textColor} ${hoverColor}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-current transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
                    </>
                  )}
                </NavLink>
              ))}
              
              <NavLink to="/contact" className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${textColor} ${hoverColor}`}>
                Contact
              </NavLink>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search Trigger (Visual Only for now) */}
              <button className={`p-2 rounded-full transition-all hover:bg-nelna-dark/10 ${iconColor}`}>
                 <Search className="w-5 h-5" />
              </button>
              
              {user ? (
                <div className="relative group pl-2">
                   <div className={`cursor-pointer flex items-center gap-2 pr-1 ${textColor}`}>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-nelna-white font-bold shadow-md">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold hidden sm:block max-w-[80px] truncate">{user.name}</span>
                   </div>
                    {/* User Dropdown */}
                   <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                      <div className="overflow-hidden rounded-xl bg-nelna-white border border-nelna-green-soft shadow-float py-1">
                        {role === 'admin' && (
                           <NavLink to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-nelna-dark/90 hover:bg-nelna-green-soft">
                              <ShieldCheck className="w-4 h-4 text-brand-500" /> Admin Panel
                           </NavLink>
                        )}
                        <NavLink to="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-nelna-dark/90 hover:bg-nelna-green-soft">
                           <ShoppingBag className="w-4 h-4 text-brand-500" /> My Orders
                        </NavLink>
                        <div className="h-px bg-nelna-green-soft my-1"></div>
                        <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-nelna-green-dark600 hover:bg-nelna-green-soft50">
                           <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                   </div>
                </div>
              ) : (
                <NavLink 
                  to="/login"
                  className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transform transition-all hover:-translate-y-0.5 hover:shadow-xl ${
                    isScrolled || !isHome 
                      ? 'bg-brand-600 text-nelna-white hover:bg-brand-700 shadow-brand-200' 
                      : 'bg-nelna-white text-brand-950 hover:bg-brand-50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>{t('nav.login')}</span>
                </NavLink>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${iconColor} hover:bg-nelna-white/10`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-nelna-white lg:hidden"
          >
             <div className="h-full flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-nelna-green-soft">
                   <div className="flex items-center gap-2">
                      <img src={logo} alt="Nelna" className="w-8 h-8 rounded-full" />
                      <span className="font-display font-bold text-lg text-brand-900">Nelna Farm</span>
                   </div>
                   <button onClick={() => setIsOpen(false)} className="p-2 bg-nelna-green-soft rounded-full text-nelna-dark/80">
                      <X className="w-6 h-6" />
                   </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                   <div className="flex flex-col gap-4">
                      <NavLink to="/" onClick={() => setIsOpen(false)} className={({isActive}) => `text-2xl font-display font-bold ${isActive ? 'text-brand-600' : 'text-nelna-dark'}`}>{t('nav.home')}</NavLink>
                      <NavLink to="/products" onClick={() => setIsOpen(false)} className={({isActive}) => `text-2xl font-display font-bold ${isActive ? 'text-brand-600' : 'text-nelna-dark'}`}>{t('nav.products')}</NavLink>
                      <NavLink to="/about" onClick={() => setIsOpen(false)} className={({isActive}) => `text-2xl font-display font-bold ${isActive ? 'text-brand-600' : 'text-nelna-dark'}`}>{t('nav.about')}</NavLink>
                      <NavLink to="/quality-safety" onClick={() => setIsOpen(false)} className={({isActive}) => `text-2xl font-display font-bold ${isActive ? 'text-brand-600' : 'text-nelna-dark'}`}>{t('nav.quality')}</NavLink>
                      <NavLink to="/contact" onClick={() => setIsOpen(false)} className={({isActive}) => `text-2xl font-display font-bold ${isActive ? 'text-brand-600' : 'text-nelna-dark'}`}>{t('nav.contact')}</NavLink>
                   </div>
                   
                   <div className="h-px bg-nelna-green-soft w-full"></div>
                   
                   <div className="flex flex-col gap-3">
                      <Link to="/products?cat=fruits" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-xl bg-brand-50 text-brand-900 font-medium">
                         <span>Fresh Fruits</span>
                         <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-xl bg-nelna-green-soft text-nelna-dark font-medium">
                         <span>Support Center</span>
                         <Phone className="w-4 h-4" />
                      </Link>
                   </div>

                   {!user && (
                      <NavLink to="/login" onClick={() => setIsOpen(false)} className="mt-auto w-full py-4 bg-brand-600 text-nelna-white rounded-xl font-bold text-center shadow-lg active:scale-95 transition-transform">
                         {t('nav.login')}
                      </NavLink>
                   )}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
