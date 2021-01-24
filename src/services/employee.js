import client from 'providers/fetchClient'

export const getEmployers = () => client.get('/v1/employee')

export const postEmployee = data => client.post('/v1/employee', data)

export const putEmployee = data => client.put('/v1/employee', data)
