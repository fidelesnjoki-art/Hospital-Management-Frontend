import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AdminDoctors from '../pages/admin/AdminDoctors'
import { getDoctors } from '../api/appointments'
import { createDoctor } from '../api/adminDoctors'

vi.mock('../api/appointments', () => ({
  getDoctors: vi.fn()
}))

vi.mock('../api/adminDoctors', () => ({
  createDoctor: vi.fn(),
  deleteDoctor: vi.fn()
}))

describe('AdminDoctors', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows the add-doctor form fields', async () => {
    getDoctors.mockResolvedValue([])
    render(<AdminDoctors />)

    expect(screen.getByText(/doctor display name/i)).toBeInTheDocument()
    expect(screen.getByText(/^email/i)).toBeInTheDocument()
    expect(screen.getByText(/^password/i)).toBeInTheDocument()

    
    await waitFor(() => {
      expect(screen.getByText('No doctors are currently available.')).toBeInTheDocument()
    })
  })

  it('shows validation errors when submitting the form empty', async () => {
    getDoctors.mockResolvedValue([])
    const { container } = render(<AdminDoctors />)

    await waitFor(() => {
      expect(screen.getByText('No doctors are currently available.')).toBeInTheDocument()
    })


    fireEvent.submit(container.querySelector('form'))

    expect(await screen.findByText('Doctor display name is required.')).toBeInTheDocument()
    expect(createDoctor).not.toHaveBeenCalled()
  })

  it('shows "No doctors are currently available" when the list is empty', async () => {
    getDoctors.mockResolvedValue([])
    render(<AdminDoctors />)

    await waitFor(() => {
      expect(screen.getByText('No doctors are currently available.')).toBeInTheDocument()
    })
  })

  it('shows doctors in the table once loaded', async () => {
    getDoctors.mockResolvedValue([
      { id: 1, doctor_name: 'Dr. Amina Yusuf', specialty: 'Cardiology' }
    ])
    render(<AdminDoctors />)

    await waitFor(() => {
      expect(screen.getByText('Dr. Amina Yusuf')).toBeInTheDocument()
      expect(screen.getByText('Cardiology')).toBeInTheDocument()
    })
  })
})