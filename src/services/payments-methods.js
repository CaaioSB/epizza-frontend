import client from 'providers/fetchClient'

export const getPaymentsMethods = () => client.get('/v1/payments-methods')

export const postPaymentsMethods = data => client.post('/v1/payments-methods', data)
