import client from 'providers/fetchClient'

export const postRole = data => client.post('/v1/role', data)

export const putRole = data => client.put('/v1/role', data)

export const getRoles = () => client.get('/v1/role')
