import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

function ProtectedRoute({ roles, children }) {
  const { user, role, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-nelna-dark/70">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/portal" replace />
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
