import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Mail,
  Users,
  Newspaper,
  Activity,
  MapPin,
  Settings,
} from 'lucide-react'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Mail },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/news', label: 'News', icon: Newspaper },
  { to: '/admin/site-health', label: 'Site Health', icon: Activity },
  { to: '/admin/contact-settings', label: 'Contact Settings', icon: MapPin },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-nelna-dark-soft bg-nelna-white p-4 lg:block dark:border-nelna-green-dark dark:bg-nelna-dark">
      <nav aria-label="Admin" className="space-y-1">
        {links.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-green-50 text-brand-green-700 dark:bg-brand-green-950/40 dark:text-brand-green-200'
                    : 'text-nelna-dark/90 hover:bg-nelna-green-soft dark:text-nelna-white/90 dark:hover:bg-nelna-green-dark'
                }`
              }
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default AdminSidebar
