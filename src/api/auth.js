import apiClient from './client'

export async function login(username, password) {
  const res = await apiClient.post('/auth/login/', { username: username.trim(), password })
  localStorage.setItem('access_token', res.data.access)
  localStorage.setItem('refresh_token', res.data.refresh)
  return res.data
}

export async function register(fullName, email, password, phone) {
  const payload = { full_name: fullName, email, password, phone }
  const res = await apiClient.post('/auth/register/', payload)
  return res.data
}

export async function getMe() { const res = await apiClient.get('/auth/me/'); return res.data }
export function logout() { localStorage.removeItem('access_token'); localStorage.removeItem('refresh_token') }
