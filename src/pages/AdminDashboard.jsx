import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Boxes, ClipboardList, Mail, Users, Newspaper, Activity, MapPin } from 'lucide-react'
import AdminShell from '../components/AdminShell.jsx'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  EmptyState,
  Skeleton,
  StatCard,
} from '../components/ui/index.js'
import { getProducts } from '../services/productService.js'
import { getOrders } from '../services/orderService.js'
import { getInquiries } from '../services/inquiryService.js'
import { getUsers } from '../services/userService.js'
import { getNews } from '../services/newsService.js'
import { getLatestAudit, getSites } from '../services/siteHealthService.js'

const cards = [
  {
    label: 'Manage Products',
    description: 'Create, edit, and showcase your product catalog.',
    path: '/admin/products',
    icon: Boxes,
  },
  {
    label: 'Manage Orders',
    description: 'Track bulk orders and update fulfillment status.',
    path: '/admin/orders',
    icon: ClipboardList,
  },
  {
    label: 'Manage Inquiries',
    description: 'Respond to customer inquiries and follow ups.',
    path: '/admin/inquiries',
    icon: Mail,
  },
  {
    label: 'Manage Users',
    description: 'Assign roles and manage distributor access.',
    path: '/admin/users',
    icon: Users,
  },
  {
    label: 'Manage News',
    description: 'Publish updates and press releases.',
    path: '/admin/news',
    icon: Newspaper,
  },
  {
    label: 'SEO & Site Health',
    description: 'Run audits and monitor site performance.',
    path: '/admin/site-health',
    icon: Activity,
  },
  {
    label: 'Contact & Location',
    description: 'Update the Find Us section and contact details.',
    path: '/admin/contact-settings',
    icon: MapPin,
  },
]

function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    products: 0,
    newOrders: 0,
    pendingInquiries: 0,
    news: 0,
    users: 0,
    siteHealth: 0,
    lowStockItems: 0,
  })

  const quickLinks = useMemo(() => cards, [])

  useEffect(() => {
    let active = true

    async function loadDashboard() {
      setLoading(true)
      try {
        const [products, orders, inquiries, users, news, sites] = await Promise.all([
          getProducts(),
          getOrders(),
          getInquiries(),
          getUsers(),
          getNews(),
          getSites().catch(() => []),
        ])

        let siteHealthScore = 0
        if (Array.isArray(sites) && sites.length > 0) {
          const latest = await getLatestAudit(sites[0]._id).catch(() => null)
          siteHealthScore = latest?.audit?.overallScore || 0
        }

        if (!active) return

        setStats({
          products: products.length,
          newOrders: orders.filter((item) => String(item.status || '').toLowerCase() === 'new').length,
          pendingInquiries: inquiries.filter((item) => ['new', 'pending'].includes(String(item.status || '').toLowerCase())).length,
          news: news.length,
          users: users.length,
          siteHealth: siteHealthScore,
          lowStockItems: 0,
        })
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      active = false
    }
  }, [])

  const kpis = [
    { title: 'Total Products', value: stats.products, tone: 'default' },
    { title: 'New Orders', value: stats.newOrders, tone: 'accent' },
    { title: 'Pending Inquiries', value: stats.pendingInquiries, tone: 'accent' },
    { title: 'Published News', value: stats.news, tone: 'default' },
    { title: 'Registered Users', value: stats.users, tone: 'default' },
    { title: 'Site Health Score', value: `${stats.siteHealth}/100`, tone: 'default' },
    { title: 'Low Stock Items', value: stats.lowStockItems, tone: 'danger' },
    { title: 'Recent Activity', value: 'Live', hint: 'Operational placeholder', tone: 'accent' },
  ]

  return (
    <AdminShell
      title="Executive Dashboard"
      subtitle="Track products, sales operations, content updates, and website health from one control surface."
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-28" />)
          : kpis.map((kpi) => (
              <StatCard
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                hint={kpi.hint}
                tone={kpi.tone}
              />
            ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardBody className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.path}
                  to={card.path}
                  className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700 dark:bg-brand-green-950/40 dark:text-brand-green-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{card.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{card.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
            ) : (
              <EmptyState
                title="Activity feed placeholder"
                description="Live operational events, status transitions, and user activity logs will appear here."
              />
            )}
          </CardBody>
        </Card>
      </section>

      <section className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Sales and Traffic Insights</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
              Chart integration placeholder for revenue, inquiry conversion, and site traffic trends.
            </div>
          </CardBody>
        </Card>
      </section>
    </AdminShell>
  )
}

export default AdminDashboard
