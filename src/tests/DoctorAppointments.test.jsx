import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DoctorAppointments from '../pages/doctor/DoctorAppointments'
import { getDoctorAppointments, recordTreatment, saveDiagnosis } from '../api/doctor'

vi.mock('../api/doctor', () => ({
  getDoctorAppointments: vi.fn(),
  recordTreatment: vi.fn(),
  saveDiagnosis: vi.fn()
}))

const sampleAppointment = {
  id: 1,
  patient_username: 'jane_doe',
  date: '2026-08-01',
  scheduled_time: '09:30:00',
  diagnosis: '',
  treatment: ''
}

function renderWithState(appointment) {
  return render(
    <MemoryRouter
      initialEntries={[{ pathname: '/doctor/appointments/1', state: { appointment } }]}
    >
      <Routes>
        <Route path="/doctor/appointments/:id" element={<DoctorAppointments />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('DoctorAppointments', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows the patient and appointment details when passed in directly', () => {
    renderWithState(sampleAppointment)

    expect(screen.getByText('jane_doe')).toBeInTheDocument()
    expect(screen.getByText(/2026-08-01/)).toBeInTheDocument()
  })

  it('shows an error message if the appointment cannot be found', async () => {
    getDoctorAppointments.mockResolvedValue([])

    render(
      <MemoryRouter initialEntries={['/doctor/appointments/1']}>
        <Routes>
          <Route path="/doctor/appointments/:id" element={<DoctorAppointments />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText('This appointment could not be found.')).toBeInTheDocument()
  })

  it('disables the complete-treatment button until treatment is entered', () => {
    renderWithState(sampleAppointment)

    const completeButton = screen.getByRole('button', { name: /save treatment and complete/i })
    expect(completeButton).toBeDisabled()
  })

  it('lets a doctor save a diagnosis on its own', async () => {
    saveDiagnosis.mockResolvedValue({})
    const user = userEvent.setup()
    renderWithState(sampleAppointment)

    await user.type(screen.getByLabelText(/diagnosis/i), 'Seasonal flu')
    await user.click(screen.getByRole('button', { name: /save diagnosis/i }))

    await waitFor(() => {
      expect(saveDiagnosis).toHaveBeenCalledWith('1', 'Seasonal flu')
    })
    expect(await screen.findByText('Diagnosis saved.')).toBeInTheDocument()
  })

  it('lets a doctor complete an appointment by entering treatment and submitting', async () => {
    recordTreatment.mockResolvedValue({})
    const user = userEvent.setup()
    renderWithState(sampleAppointment)

    await user.type(screen.getByLabelText(/treatment/i), 'Rest and fluids')
    const completeButton = screen.getByRole('button', { name: /save treatment and complete/i })
    expect(completeButton).toBeEnabled()

    await user.click(completeButton)

    await waitFor(() => {
      expect(recordTreatment).toHaveBeenCalledWith('1', { diagnosis: '', treatment: 'Rest and fluids' })
    })
  })
})