import axios from 'axios'

export const API_KEY_HEADER = 'X-API-Key'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
  timeout: 15_000,
})
