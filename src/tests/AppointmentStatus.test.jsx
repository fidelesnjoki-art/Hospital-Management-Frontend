import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AppointmentStatus from '../components/AppointmentStatus'

describe('AppointmentStatus', () => {
  it('shows "Pending" when status is pending', () => {
    render(<AppointmentStatus status="pending" />)
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('shows "Confirmed" when status is confirmed', () => {
    render(<AppointmentStatus status="confirmed" />)
    expect(screen.getByText('Confirmed')).toBeInTheDocument()
  })

  it('shows "Completed" when status is completed', () => {
    render(<AppointmentStatus status="completed" />)
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('shows "Cancelled" when status is cancelled', () => {
    render(<AppointmentStatus status="cancelled" />)
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
  })

  it('falls back to showing the raw status if it is not recognized', () => {
    render(<AppointmentStatus status="unknown-status" />)
    expect(screen.getByText('unknown-status')).toBeInTheDocument()
  })
})
