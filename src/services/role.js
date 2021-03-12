import client from 'providers/fetchClient'

export const getRoles = () => client.get('/v1/role')

export const postRole = data => client.put('/v1/role', data)
