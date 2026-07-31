import apiClient from './client'

export async function createDoctor(payload) {
  const response = await apiClient.post('/admin/doctors/', payload)
  return response.data
}

export async function deleteDoctor(doctorId) {
  await apiClient.delete(`/admin/doctors/${doctorId}/`)
}
