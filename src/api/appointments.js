import apiClient from './client'

export async function getDoctors(specialty) {
  const res = await apiClient.get('/doctors/', { params: specialty ? { specialty } : undefined })
  return res.data
}

export async function getSlots(doctorId) {
  const res = await apiClient.get('/slots/', { params: { doctor: doctorId } })
  return res.data
}

export async function bookAppointment(slotId) {
  const res = await apiClient.post('/appointments/book/', { slot_id: slotId })
  return res.data
}
