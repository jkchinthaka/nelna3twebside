import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { LoadingSpinner } from './components/ui/index.js'

const Home = lazy(() => import('./pages/Home.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const BusinessEntity = lazy(() => import('./pages/BusinessEntity.jsx'))
const QualitySafety = lazy(() => import('./pages/QualitySafety.jsx'))
const Sustainability = lazy(() => import('./pages/Sustainability.jsx'))
const Certifications = lazy(() => import('./pages/Certifications.jsx'))
const Traceability = lazy(() => import('./pages/Traceability.jsx'))
const Recipes = lazy(() => import('./pages/Recipes.jsx'))
const FAQ = lazy(() => import('./pages/FAQ.jsx'))
const Process = lazy(() => import('./pages/Process.jsx'))
const News = lazy(() => import('./pages/News.jsx'))
const NewsDetail = lazy(() => import('./pages/NewsDetail.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'))
const DistributorDashboard = lazy(() => import('./pages/DistributorDashboard.jsx'))
const ManageProducts = lazy(() => import('./pages/admin/ManageProducts.jsx'))
const ManageOrders = lazy(() => import('./pages/admin/ManageOrders.jsx'))
const ManageInquiries = lazy(() => import('./pages/admin/ManageInquiries.jsx'))
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers.jsx'))
const ManageNews = lazy(() => import('./pages/admin/ManageNews.jsx'))
const SiteHealthDashboard = lazy(() => import('./pages/admin/SiteHealthDashboard.jsx'))
const ContactSettings = lazy(() => import('./pages/admin/ContactSettings.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const ProductFinder = lazy(() => import('./pages/ProductFinder.jsx'))
const MangoRedirect = lazy(() => import('./pages/MangoRedirect.jsx'))

function RouteFallback() {
  return (
    <div className="page-shell py-16">
      <LoadingSpinner label="Loading page..." />
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/mango" element={<MangoRedirect />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/entity/:id" element={<BusinessEntity />} />
            <Route path="/quality-safety" element={<QualitySafety />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/traceability" element={<Traceability />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/process" element={<Process />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product-finder" element={<ProductFinder />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/portal" element={<Login />} />
            <Route path="/login" element={<Navigate to="/portal" replace />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ManageProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ManageOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/inquiries"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ManageInquiries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ManageNews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/site-health"
              element={
                <ProtectedRoute roles={['admin']}>
                  <SiteHealthDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contact-settings"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ContactSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/distributor"
              element={
                <ProtectedRoute roles={['admin', 'distributor']}>
                  <DistributorDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
