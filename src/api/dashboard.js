import apiClient from './client'

export async function getPatientDashboard() { const res = await apiClient.get('/dashboard/patient/'); return res.data }
export async function getAccountSettings() { const res = await apiClient.get('/auth/settings/'); return res.data }
export async function updateAccountSettings(payload) { const res = await apiClient.patch('/auth/settings/', payload); return res.data }
