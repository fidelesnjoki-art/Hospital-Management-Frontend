import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AdminHome from '../pages/admin/AdminHome'
import { getDoctors } from '../api/appointments'
import { getAdminAppointments, updateAppointmentStatus } from '../api/adminAppointments'

vi.mock('../api/appointments', () => ({
  getDoctors: vi.fn()
}))

vi.mock('../api/adminAppointments', () => ({
  getAdminAppointments: vi.fn(),
  updateAppointmentStatus: vi.fn()
}))

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminHome />
    </MemoryRouter>
  )
}

describe('AdminHome', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows a loading message while appointments are being fetched', () => {
    getDoctors.mockReturnValue(new Promise(() => {})) // never resolves
    getAdminAppointments.mockReturnValue(new Promise(() => {}))
    renderPage()

    expect(screen.getByText('Loading appointments...')).toBeInTheDocument()
  })

  it('shows a friendly message when there are no matching appointments', async () => {
    getDoctors.mockResolvedValue([])
    getAdminAppointments.mockResolvedValue([])
    renderPage()

    await waitFor(() => {
      expect(screen.getByText('No appointments match these filters.')).toBeInTheDocument()
    })
  })

  it('shows appointment details in the table once loaded', async () => {
    getDoctors.mockResolvedValue([])
    getAdminAppointments.mockResolvedValue([
      {
        id: 1,
        patient_username: 'jane_doe',
        doctor_name: 'Dr. Amina Yusuf',
        date: '2026-08-01',
        scheduled_time: '09:30:00',
        status: 'pending'
      }
    ])
    renderPage()

    await waitFor(() => {
      expect(screen.getByText('jane_doe')).toBeInTheDocument()
      expect(screen.getByText('Dr. Amina Yusuf')).toBeInTheDocument()
    })
  })

  it('lets an admin change an appointment status', async () => {
    getDoctors.mockResolvedValue([])
    getAdminAppointments.mockResolvedValue([
      {
        id: 1,
        patient_username: 'jane_doe',
        doctor_name: 'Dr. Amina Yusuf',
        date: '2026-08-01',
        scheduled_time: '09:30:00',
        status: 'pending'
      }
    ])
    updateAppointmentStatus.mockResolvedValue({ status: 'confirmed' })
    const user = userEvent.setup()
    renderPage()

    await waitFor(() => {
      expect(screen.getByText('jane_doe')).toBeInTheDocument()
    })

    const statusSelect = screen.getByDisplayValue('pending')
    await user.selectOptions(statusSelect, 'confirmed')

    expect(updateAppointmentStatus).toHaveBeenCalledWith(1, 'confirmed')
  })

  it('has a link to manage doctors', async () => {
    getDoctors.mockResolvedValue([])
    getAdminAppointments.mockResolvedValue([])
    renderPage()

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /manage doctors/i })).toBeInTheDocument()
    })
  })
})