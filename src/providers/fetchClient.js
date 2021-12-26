import axios from 'axios'
import { getToken } from 'helpers/auth'

const api = axios.create({
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
