import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
})

export const registerUser = async (payload) => {
  const { data } = await api.post('/users/register', payload)
  return data
}

export const loginUser = async (payload) => {
  const { data } = await api.post('/users/login', payload)
  return data
}

export const getTasks = async (token) => {
  const { data } = await api.get('/tasks', authConfig(token))
  return data
}

export const createTask = async (token, payload) => {
  const { data } = await api.post('/tasks', payload, authConfig(token))
  return data
}

export const updateTask = async (token, taskId, payload) => {
  const { data } = await api.put(`/tasks/${taskId}`, payload, authConfig(token))
  return data
}

export const deleteTask = async (token, taskId) => {
  const { data } = await api.delete(`/tasks/${taskId}`, authConfig(token))
  return data
}

export default api