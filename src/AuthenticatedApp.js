import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import NewOrder from 'routes/NewOrder'
import Dashboard from 'routes/Dashboard'
import NewCustomer from 'routes/NewCustomer'
import Customers from 'routes/Customers'
import Orders from 'routes/Orders'
import Order from 'routes/Order'
import { ColumnResponsive } from 'components/Column'
import Menu from 'components/Menu'

const AuthenticatedApp = () => (
  <Switch>
    <ColumnResponsive>
      <Menu title='LáPavaelli Pizzaria' color='primary' />
      <Route path='/dashboard' exact component={Dashboard} />
      <Route path='/neworder' component={NewOrder} />
      <Route path='/newcustomer' component={NewCustomer} />
      <Route path='/customers' component={Customers} />
      <Route path='/orders' component={Orders} />
      <Route path='/order/:id' component={Order} />
      <Redirect to='/dashboard' />
    </ColumnResponsive>
  </Switch>
)

export default AuthenticatedApp
