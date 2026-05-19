import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SEO from './SEO.jsx'
import ScrollToTopButton from './ScrollToTopButton.jsx'

const routeMeta = {
  '/': {
    title: 'Nelna Farm | Sri Lanka’s Trusted Poultry & Frozen Food Brand',
    description:
      'Nelna Farm delivers premium poultry, frozen food, and farm-fresh protein with strict quality, safety, and sustainability standards.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Nelna Farm',
      description:
        'Premium poultry and frozen food with strict quality, safety, and sustainability standards.',
    },
  },
  '/products': {
    title: 'Products | Nelna Farm',
    description: 'Explore broiler chicken, eggs, and processed poultry products.',
  },
  '/about': {
    title: 'About Us | Nelna Farm',
    description: 'Learn about Nelna Farm history, mission, and certifications.',
  },
  '/quality-safety': {
    title: 'Quality & Safety | Nelna Farm',
    description: 'Biosecurity, certifications, and safety practices at Nelna Farm.',
  },
  '/sustainability': {
    title: 'Sustainability & CSR | Nelna Farm',
    description: 'Sustainability initiatives and CSR commitments at Nelna Farm.',
  },
  '/news': {
    title: 'News & Updates | Nelna Farm',
    description: 'Latest updates and announcements from Nelna Farm.',
  },
  '/contact': {
    title: 'Contact | Nelna Farm',
    description: 'Reach Nelna Farm for inquiries, orders, and partnerships.',
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
  }
  const canonical = `${siteUrl}${location.pathname}`
  const schema = meta.schema
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
        canonical={canonical}
        schema={schema}
        siteName={siteName}
        locale={locale}
      />
      <Navbar />
      <main
        id="main-content"
        className={`pt-20 ${isPortalRoute ? '' : 'public-content-readability'}`}
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default Layout
