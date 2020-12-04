import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import NewOrder from 'routes/NewOrder'
import Dashboard from 'routes/Dashboard'
import NewCustomer from 'routes/NewCustomer'
import Customers from 'routes/Customers'
import { ColumnResponsive } from 'components/Column'
import Menu from 'components/Menu'

const AuthenticatedApp = () => (
  <Switch>
    <ColumnResponsive>
      <Menu title='LáPavaelli Pizzaria' color='primary' />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/neworder' component={NewOrder} />
      <Route path='/newcustomer' component={NewCustomer} />
      <Route path='/customers' component={Customers} />
      <Redirect to='/neworder' />
    </ColumnResponsive>
  </Switch>
)

export default AuthenticatedApp
