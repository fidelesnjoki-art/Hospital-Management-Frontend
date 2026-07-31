import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '../context/AuthContext'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn()
}))

function renderWithRoute(initialPath, requiredRole) {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<p>Login page</p>} />
        <Route path="/patient" element={<p>Patient home</p>} />
        <Route path="/doctor" element={<p>Doctor home</p>} />
        <Route path="/admin" element={<p>Admin home</p>} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute requiredRole={requiredRole}>
              <p>Secret content</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  it('shows a loading message while auth is still loading', () => {
    useAuth.mockReturnValue({ user: null, loading: true })
    renderWithRoute('/protected')
    expect(screen.getByText('Loading your account...')).toBeInTheDocument()
  })

  it('redirects to login when no user is logged in', () => {
    useAuth.mockReturnValue({ user: null, loading: false })
    renderWithRoute('/protected')
    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('redirects to the correct home page when the user has the wrong role', () => {
    useAuth.mockReturnValue({ user: { role: 'doctor' }, loading: false })
    renderWithRoute('/protected', 'admin')
    expect(screen.getByText('Doctor home')).toBeInTheDocument()
  })

  it('shows the protected content when the user has the correct role', () => {
    useAuth.mockReturnValue({ user: { role: 'admin' }, loading: false })
    renderWithRoute('/protected', 'admin')
    expect(screen.getByText('Secret content')).toBeInTheDocument()
  })

  it('shows the protected content when no specific role is required', () => {
    useAuth.mockReturnValue({ user: { role: 'patient' }, loading: false })
    renderWithRoute('/protected')
    expect(screen.getByText('Secret content')).toBeInTheDocument()
  })
})
