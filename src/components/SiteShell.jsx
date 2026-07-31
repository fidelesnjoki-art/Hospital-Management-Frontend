import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function SiteChrome() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const destination = user?.role === 'admin' ? '/admin' : user?.role === 'doctor' ? '/doctor' : '/patient'
  function signOut() { logout(); navigate('/login') }
  const links = user?.role === 'patient' ? [['/patient', 'My appointments'], ['/patient/book', 'Book a visit'], ['/patient/profile', 'Profile']] : user?.role === 'doctor' ? [['/doctor', 'Upcoming'], ['/doctor/history', 'History'], ['/doctor/profile', 'Profile']] : user?.role === 'admin' ? [['/admin', 'Overview'], ['/admin/appointments', 'Appointments'], ['/admin/doctors', 'Manage doctors'], ['/admin/profile', 'Profile']] : [['/login', 'Sign in'], ['/signup', 'Register']]
  return <header className="site-header"><div className="site-container site-header-inner"><Link to={user ? destination : '/login'} className="site-brand"><i>+</i><span>HospitalMS<small>HEALTHCARE</small></span></Link><nav className="site-nav" aria-label="Primary navigation">{links.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</nav>{user && <div className="site-header-actions"><button onClick={signOut} className="site-button site-button-ghost">Log out</button></div>}</div></header>
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-container"><strong>HospitalMS Healthcare</strong><span>0712496142</span><a href="mailto:hospitalms@gmail.com">hospitalms@gmail.com</a><span>© {new Date().getFullYear()} HospitalMS</span></div></footer>
}

export default function SiteShell({ children }) {
  return <div className="site-page"><SiteChrome /><main>{children}</main><SiteFooter /></div>
}
