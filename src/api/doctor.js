import apiClient from './client'

export async function getDoctorAppointments() { const res = await apiClient.get('/doctor/appointments/'); return res.data }
export async function getDoctorHistory() { const res = await apiClient.get('/doctor/dashboard/'); return res.data }
export async function saveDiagnosis(id, diagnosis) { const res = await apiClient.patch(`/doctor/appointments/${id}/diagnosis/`, { diagnosis }); return res.data }
export async function recordTreatment(id, payload) { const res = await apiClient.patch(`/doctor/appointments/${id}/treatment/`, payload); return res.data }
