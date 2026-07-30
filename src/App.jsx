import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import PatientDashboard from './pages/patient/PatientDashboard'
import PatientHome from './pages/patient/PatientHome'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import DoctorHistory from './pages/doctor/DoctorHistory'
import AdminHome from './pages/admin/AdminHome'
import AdminDoctors from './pages/admin/AdminDoctors'
import Settings from './pages/Settings'

function Home() { const { user, loading } = useAuth(); if (loading) return null; return <Navigate to={user?.role === 'admin' ? '/admin' : user?.role === 'doctor' ? '/doctor' : '/patient'} replace /> }
function App() { return <AuthProvider><BrowserRouter><Routes><Route path="/login" element={<Login />} /><Route path="/signup" element={<Signup />} />
  <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}><Route index element={<Home />} /><Route path="patient" element={<ProtectedRoute requiredRole="patient"><PatientDashboard /></ProtectedRoute>} /><Route path="patient/book" element={<ProtectedRoute requiredRole="patient"><PatientHome /></ProtectedRoute>} /><Route path="patient/profile" element={<ProtectedRoute requiredRole="patient"><Settings /></ProtectedRoute>} />
  <Route path="doctor" element={<ProtectedRoute requiredRole="doctor"><DoctorDashboard /></ProtectedRoute>} /><Route path="doctor/history" element={<ProtectedRoute requiredRole="doctor"><DoctorHistory /></ProtectedRoute>} /><Route path="doctor/appointments/:id" element={<ProtectedRoute requiredRole="doctor"><DoctorAppointments /></ProtectedRoute>} /><Route path="doctor/profile" element={<ProtectedRoute requiredRole="doctor"><Settings /></ProtectedRoute>} />
  <Route path="admin" element={<ProtectedRoute requiredRole="admin"><AdminHome /></ProtectedRoute>} /><Route path="admin/appointments" element={<ProtectedRoute requiredRole="admin"><AdminHome /></ProtectedRoute>} /><Route path="admin/doctors" element={<ProtectedRoute requiredRole="admin"><AdminDoctors /></ProtectedRoute>} /><Route path="admin/profile" element={<ProtectedRoute requiredRole="admin"><Settings /></ProtectedRoute>} /></Route><Route path="*" element={<Home />} /></Routes></BrowserRouter></AuthProvider> }
export default App
