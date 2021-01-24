import client from 'providers/fetchClient'

export const getRoles = () => client.get('/v1/role')
