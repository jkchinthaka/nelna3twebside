import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ClipboardList, Mail, Boxes, Newspaper, Users } from 'lucide-react'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Mail },
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/news', label: 'News', icon: Newspaper },
  { to: '/admin/users', label: 'Users', icon: Users },
]

function MobileAdminBottomNav() {
  return (
    <nav
      aria-label="Admin quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-1 backdrop-blur lg:hidden dark:border-slate-700 dark:bg-slate-900/95"
    >
      <ul className="flex gap-1 overflow-x-auto pb-1">
        {links.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.to} className="shrink-0">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex min-h-[44px] min-w-[78px] flex-col items-center justify-center rounded-lg px-2 text-[11px] font-medium ${
                    isActive
                      ? 'text-brand-green-700 dark:text-brand-green-200'
                      : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MobileAdminBottomNav
