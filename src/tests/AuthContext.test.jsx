import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { getMe } from '../api/auth'

// Mock the API module so no real network request happens
vi.mock('../api/auth', () => ({
  getMe: vi.fn(),
  logout: vi.fn()
}))

// A tiny test component that just shows what useAuth() returns
function TestConsumer() {
  const { user, loading } = useAuth()
  if (loading) return <p>Loading...</p>
  return <p>{user ? `Logged in as ${user.name}` : 'Not logged in'}</p>
}

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('shows "Not logged in" when there is no token in localStorage', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Not logged in')).toBeInTheDocument()
    })
  })

  it('shows the logged-in user when a valid token exists', async () => {
    localStorage.setItem('access_token', 'fake-token')
    getMe.mockResolvedValue({ name: 'Dr. Smith' })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Logged in as Dr. Smith')).toBeInTheDocument()
    })
  })

  it('shows "Not logged in" if the token is invalid and getMe fails', async () => {
    localStorage.setItem('access_token', 'bad-token')
    getMe.mockRejectedValue(new Error('unauthorized'))

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Not logged in')).toBeInTheDocument()
    })
  })
})