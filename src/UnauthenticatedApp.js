import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from 'routes/Login'
import TwoFactorAuthentication from 'routes/TwoFactorAuthentication'

const UnauthenticatedApp = () => (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/twofactorAuthentication' component={TwoFactorAuthentication} />
    <Redirect to='/login' />
  </Switch>
)

export default UnauthenticatedApp
