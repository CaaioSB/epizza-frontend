import axios from 'axios'
import { getToken } from 'helpers/auth'

const token = getToken()
console.log(token)
const provider = axios.create({
  baseURL: 'http://localhost:2020',
  headers: { 'Content-Type': 'application/json', Authorization: token }
})

export default provider
