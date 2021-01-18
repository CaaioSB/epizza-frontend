import client from 'providers/fetchClient'

export const getCustomers = () => client.get('/v1/customer')

export const postCustomers = data => client.post('/v1/customer', data)
