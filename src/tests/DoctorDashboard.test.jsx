import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DoctorDashboard from '../pages/doctor/DoctorDashboard'
import { getDoctorAppointments } from '../api/doctor'

vi.mock('../api/doctor', () => ({
  getDoctorAppointments: vi.fn()
}))

function renderPage() {
  return render(
    <MemoryRouter>
      <DoctorDashboard />
    </MemoryRouter>
  )
}

describe('DoctorDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows "No upcoming appointments" when the list is empty', async () => {
    getDoctorAppointments.mockResolvedValue([])
    renderPage()

    await waitFor(() => {
      expect(screen.getByText('No upcoming appointments.')).toBeInTheDocument()
    })
  })

  it('shows appointment details when appointments are loaded', async () => {
    getDoctorAppointments.mockResolvedValue([
      { id: 1, patient_username: 'jane_doe', date: '2026-08-01', scheduled_time: '09:30:00', status: 'confirmed' }
    ])
    renderPage()

    await waitFor(() => {
      expect(screen.getByText('jane_doe')).toBeInTheDocument()
      expect(screen.getByText('Confirmed')).toBeInTheDocument()
    })
  })

  it('links each appointment to its record page', async () => {
    getDoctorAppointments.mockResolvedValue([
      { id: 42, patient_username: 'jane_doe', date: '2026-08-01', scheduled_time: '09:30:00', status: 'confirmed' }
    ])
    renderPage()

    await waitFor(() => {
      const link = screen.getByRole('link', { name: /open record/i })
      expect(link).toHaveAttribute('href', '/doctor/appointments/42')
    })
  })

  it('shows an error message if appointments fail to load', async () => {
    getDoctorAppointments.mockRejectedValue(new Error('network error'))
    renderPage()

    expect(await screen.findByText('Could not load upcoming appointments.')).toBeInTheDocument()
  })
})