import client from 'providers/fetchClient'

export const getProducts = () => client.get('/v1/products')

export const postProducts = data => client.post('/v1/products', data)
