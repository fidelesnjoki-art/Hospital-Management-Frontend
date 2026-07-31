import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn()
}))

describe('Layout', () => {
  it('renders the site header and the matched page content together', () => {
    useAuth.mockReturnValue({ user: null, logout: vi.fn() })

    render(
      <MemoryRouter initialEntries={['/some-page']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="some-page" element={<p>some page content</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    // header/nav from SiteShell is present
    expect(screen.getByText('Sign in')).toBeInTheDocument()
    // the matched child route rendered through Outlet
    expect(screen.getByText('some page content')).toBeInTheDocument()
  })
})