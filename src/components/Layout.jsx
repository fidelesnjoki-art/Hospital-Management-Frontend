import { Outlet } from 'react-router-dom'
import SiteShell from './SiteShell'

export default function Layout() {
  return <SiteShell><Outlet /></SiteShell>
}
