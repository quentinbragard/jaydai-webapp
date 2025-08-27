import axios from 'axios'

// Get API URL from environment or use default
const getApiUrl = () => {
  try {
    // Check for Next.js environment variable
    if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL
    }
  } catch (error) {
    console.warn('Could not access process.env:', error)
  }
  
  try {
    // Check for browser environment variable (if set via window)
    if (typeof window !== 'undefined' && window.__NEXT_PUBLIC_API_URL__) {
      return window.__NEXT_PUBLIC_API_URL__
    }
  } catch (error) {
    console.warn('Could not access window.__NEXT_PUBLIC_API_URL__:', error)
  }
  
  // Default fallback
  return 'http://localhost:8000'
}

// Create axios instance with base configuration
const apiUrl = getApiUrl()
console.log('API URL configured as:', apiUrl)

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      // Redirect to login if needed
    }
    return Promise.reject(error)
  }
)

// Templates API
export const templatesApi = {
  getAll: () => api.get('/prompts/templates/'),
  getById: (id) => api.get(`/prompts/templates/${id}`),
  create: (data) => api.post('/prompts/templates/', data),
  update: (id, data) => api.put(`/prompts/templates/${id}`, data),
  delete: (id) => api.delete(`/prompts/templates/${id}`),
}

// Blocks API
export const blocksApi = {
  getAll: () => api.get('/prompts/blocks/'),
  getById: (id) => api.get(`/prompts/blocks/${id}`),
  create: (data) => api.post('/prompts/blocks/', data),
  update: (id, data) => api.put(`/prompts/blocks/${id}`, data),
  delete: (id) => api.delete(`/prompts/blocks/${id}`),
}

// Folders API
export const foldersApi = {
  getAll: () => api.get('/prompts/folders/'),
  getById: (id) => api.get(`/prompts/folders/${id}`),
  create: (data) => api.post('/prompts/folders/', data),
  update: (id, data) => api.put(`/prompts/folders/${id}`, data),
  delete: (id) => api.delete(`/prompts/folders/${id}`),
}

// Search API
export const searchApi = {
  search: (query) => api.get(`/prompts/search/?q=${encodeURIComponent(query)}`),
}

export default api

