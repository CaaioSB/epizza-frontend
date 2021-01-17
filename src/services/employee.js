import client from 'providers/fetchClient'

export const getEmployers = () => client.get('/v1/employee')

export const postEmployers = data => client.post('/v1/employee', data)
