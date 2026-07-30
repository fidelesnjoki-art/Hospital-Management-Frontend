import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function homeFor(role) { return role === 'admin' ? '/admin' : role === 'doctor' ? '/doctor' : '/patient' }

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth()
  if (loading) return <p className="p-10 text-center text-sm text-ink/60">Loading your account...</p>
  if (!user) return <Navigate to="/login" replace />
  if (requiredRole && user.role !== requiredRole) return <Navigate to={homeFor(user.role)} replace />
  return children
}
