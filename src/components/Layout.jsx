import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navByRole = {
  patient: [['/patient', 'My appointments'], ['/patient/book', 'Book appointment'], ['/patient/profile', 'Profile']],
  doctor: [['/doctor', 'Upcoming'], ['/doctor/history', 'History'], ['/doctor/profile', 'Profile']],
  admin: [['/admin', 'Overview'], ['/admin/appointments', 'Appointments'], ['/admin/profile', 'Profile']],
}

export default function Layout() {
  const { user, logout } = useAuth(); const navigate = useNavigate()
  const links = navByRole[user?.role] || []
  return <div className="min-h-screen bg-paper"><header className="border-b border-ink/15 bg-panel px-4 py-4 sm:px-6"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4"><Link to={links[0]?.[0] || '/'} className="font-display text-2xl font-bold text-ink">HospitalMS</Link><nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-ink/75">{links.map(([to, label]) => <Link key={to} to={to} className="hover:text-ink">{label}</Link>)}<span className="hidden text-xs text-ink/55 md:inline">{user?.full_name || user?.username}</span><button onClick={() => { logout(); navigate('/login') }} className="border border-ink/20 px-3 py-2 text-xs hover:border-ink">Log out</button></nav></div></header><main><Outlet /></main></div>
}
