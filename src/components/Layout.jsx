import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SEO from './SEO.jsx'
import ScrollToTopButton from './ScrollToTopButton.jsx'
import FloatingWhatsAppButton from './FloatingWhatsAppButton.jsx'
import { getOrganizationSchema } from '../data/companyContact.js'

const routeMeta = {
  '/': {
    title: 'Nelna Farm | Premium Chicken, Eggs and Fresh Produce in Sri Lanka',
    description:
      'Nelna Farm is a trusted Sri Lankan food and poultry company delivering premium chicken products, eggs, fresh produce, and value-added foods with certified quality and reliable distribution.',
    keywords:
      'Nelna Farm, Sri Lanka poultry company, premium chicken Sri Lanka, frozen chicken products, eggs supplier Sri Lanka, fresh produce Sri Lanka, food safety certified poultry, distributor poultry Sri Lanka',
    useOrganizationSchema: true,
  },
  '/products': {
    title: 'Products | Nelna Farm',
    description: 'Explore broiler chicken, eggs, and processed poultry products.',
    keywords: 'Nelna products, chicken products Sri Lanka, value-added poultry, frozen food catalog Sri Lanka',
  },
  '/about': {
    title: 'About Us | Nelna Farm',
    description: 'Learn about Nelna Farm history, mission, and certifications.',
    keywords: 'about Nelna Farm, Sri Lankan poultry company history, Nelna certifications',
  },
  '/quality-safety': {
    title: 'Quality & Safety | Nelna Farm',
    description: 'Biosecurity, certifications, and safety practices at Nelna Farm.',
    keywords: 'poultry food safety Sri Lanka, ISO 22000 poultry, HACCP poultry, Halal poultry Sri Lanka',
  },
  '/sustainability': {
    title: 'Sustainability & CSR | Nelna Farm',
    description: 'Sustainability initiatives and CSR commitments at Nelna Farm.',
    keywords: 'sustainable poultry Sri Lanka, CSR Nelna Farm, responsible farming Sri Lanka',
  },
  '/news': {
    title: 'News & Updates | Nelna Farm',
    description: 'Latest updates and announcements from Nelna Farm.',
    keywords: 'Nelna news, poultry industry updates Sri Lanka, Nelna announcements',
  },
  '/contact': {
    title: 'Contact | Nelna Farm',
    description:
      'Contact Nelna Farm (Pvt) Ltd at No 03A, Hathduwa Estate, Ranwala, Meethirigala. Tel: 0112-405091 / 0112-405092 / 0112-405094. Mobile: 0777774029.',
    keywords: 'contact Nelna Farm, poultry distributor inquiry Sri Lanka, Nelna sales contact',
    useOrganizationSchema: true,
  },
  '/certifications': {
    title: 'Certifications | Nelna Farm',
    description: 'Download and verify Nelna Farm certifications and compliance documents.',
  },
  '/traceability': {
    title: 'Traceability | Nelna Farm',
    description: 'Verify batch information and cold-chain status for Nelna Farm products.',
  },
  '/recipes': {
    title: 'Recipes | Nelna Farm',
    description: 'Chef-approved recipes and best cut guides from Nelna Farm.',
  },
  '/faq': {
    title: 'FAQ | Nelna Farm',
    description: 'Storage, delivery, certifications, and wholesale FAQs.',
  },
  '/process': {
    title: 'Our Process | Nelna Farm',
    description: 'Farm-to-distribution timeline of Nelna Farm quality standards.',
  },
  '/privacy': {
    title: 'Privacy Policy | Nelna Farm',
    description: 'Learn how Nelna Farm handles and protects your data.',
  },
  '/terms': {
    title: 'Terms & Conditions | Nelna Farm',
    description: 'Terms and conditions for using Nelna Farm services.',
  },
  '/portal': {
    title: 'Portal Login | Nelna Farm',
    description: 'Secure login for administrators and distributors.',
  },
  '/login': {
    title: 'Portal Login | Nelna Farm',
    description: 'Secure login for administrators and distributors.',
  },
  '/admin': {
    title: 'Admin Dashboard | Nelna Farm',
    description: 'Manage products, orders, inquiries, and users.',
  },
  '/distributor': {
    title: 'Distributor Dashboard | Nelna Farm',
    description: 'Review assigned orders and distribution activity.',
  },
}

function Layout() {
  const location = useLocation()
  const isPortalRoute =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/distributor')
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin
  const siteName = import.meta.env.VITE_SITE_NAME || 'Nelna Farm'
  const locale = import.meta.env.VITE_SITE_LOCALE || 'en_LK'
  const meta = routeMeta[location.pathname] || {
    title: `${siteName} | Premium Poultry & Frozen Food in Sri Lanka`,
    description: 'Trusted poultry and frozen food brand with farm-to-fork quality and safety standards.',
    keywords:
      'Sri Lanka poultry company, premium chicken supplier, frozen food distribution, Nelna Farm',
  }
  const canonical = `${siteUrl}${location.pathname}`
  const schema = meta.useOrganizationSchema
    ? getOrganizationSchema(siteUrl)
    : meta.schema
      ? {
          ...meta.schema,
          url: siteUrl,
          name: siteName,
        }
      : undefined

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={canonical}
        schema={schema}
        siteName={siteName}
        locale={locale}
      />
      <Navbar />
      <main
        id="main-content"
        className={`pt-header-offset ${isPortalRoute ? '' : 'public-content-readability'}`}
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <Footer />
      {!isPortalRoute ? <FloatingWhatsAppButton /> : null}
      <ScrollToTopButton />
    </div>
  )
}

export default Layout
