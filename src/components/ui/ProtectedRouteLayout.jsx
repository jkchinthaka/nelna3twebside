import { Navigate } from 'react-router-dom'
import useAuth from '../../context/useAuth.js'
import LoadingSpinner from './LoadingSpinner.jsx'

function ProtectedRouteLayout({ roles, children }) {
  const { user, role, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner label="Checking access..." />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/portal" replace />
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="page-shell section-spacing">
      {children}
    </div>
  )
}

export default ProtectedRouteLayout
