import AdminSidebar from './AdminSidebar.jsx'
import MobileAdminBottomNav from './MobileAdminBottomNav.jsx'
import { PageHeader } from './ui/index.js'

function AdminShell({ eyebrow = 'Admin', title, subtitle, actions, children }) {
  return (
    <div className="min-h-screen bg-nelna-green-soft dark:bg-nelna-dark">
      <div className="mx-auto flex max-w-[1440px] lg:min-h-screen">
        <AdminSidebar />
        <div className="w-full flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} actions={actions} />
          {children}
        </div>
      </div>
      <MobileAdminBottomNav />
    </div>
  )
}

export default AdminShell
