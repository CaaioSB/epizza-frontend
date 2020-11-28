import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import NewOrder from 'routes/NewOrder'
import Dashboard from 'routes/Dashboard'
import { ColumnResponsive } from 'components/Column'
import Menu from 'components/Menu'

const AuthenticatedApp = () => (
  <Switch>
    <ColumnResponsive>
      <Menu title='Pizzaria' color='primary' />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/neworder' component={NewOrder} />
      <Redirect to='/dashboard' />
    </ColumnResponsive>
  </Switch>
)

export default AuthenticatedApp
