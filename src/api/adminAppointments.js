import apiClient from './client'

export async function getAdminAppointments(filters = {}) {
  const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value))
  const res = await apiClient.get('/admin/appointments/', { params })
  return res.data
}
export async function updateAppointmentStatus(id, status) { const res = await apiClient.patch(`/admin/appointments/${id}/status/`, { status }); return res.data }
