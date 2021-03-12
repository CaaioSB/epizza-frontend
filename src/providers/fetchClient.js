import axios from 'axios'
import { getToken } from 'helpers/auth'

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  baseURL: 'http://localhost:2020'
})

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
})

export default api
