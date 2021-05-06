import React from 'react'

import { AuthProvider } from './auth-context'
import { UserProvider } from './user-context'
import { OrderProvider } from './order-context'

const AppProviders = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <OrderProvider>{children}</OrderProvider>
    </UserProvider>
  </AuthProvider>
)

export default AppProviders
