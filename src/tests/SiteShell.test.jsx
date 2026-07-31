import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import SiteShell from '../components/SiteShell'
import { useAuth } from '../context/AuthContext'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn()
}))

describe('SiteShell', () => {
  it('shows Sign in and Register links when no one is logged in', () => {
    useAuth.mockReturnValue({ user: null, logout: vi.fn() })
    render(<MemoryRouter><SiteShell><p>page content</p></SiteShell></MemoryRouter>)
    expect(screen.getByText('Sign in')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('shows patient links and a Log out button when a patient is logged in', () => {
    useAuth.mockReturnValue({ user: { role: 'patient' }, logout: vi.fn() })
    render(<MemoryRouter><SiteShell><p>page content</p></SiteShell></MemoryRouter>)
    expect(screen.getByText('My appointments')).toBeInTheDocument()
    expect(screen.getByText('Book a visit')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument()
  })

  it('calls logout when the Log out button is clicked', async () => {
    const logoutMock = vi.fn()
    useAuth.mockReturnValue({ user: { role: 'doctor' }, logout: logoutMock })
    const user = userEvent.setup()
    render(<MemoryRouter><SiteShell><p>page content</p></SiteShell></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: /log out/i }))
    expect(logoutMock).toHaveBeenCalled()
  })

  it('renders the page content passed as children', () => {
    useAuth.mockReturnValue({ user: null, logout: vi.fn() })
    render(<MemoryRouter><SiteShell><p>page content</p></SiteShell></MemoryRouter>)
    expect(screen.getByText('page content')).toBeInTheDocument()
  })
})
