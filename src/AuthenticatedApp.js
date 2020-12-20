import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import NewOrder from 'routes/NewOrder'
import Dashboard from 'routes/Dashboard'
import NewCustomer from 'routes/NewCustomer'
import Customers from 'routes/Customers'
import Order from 'routes/Order'
import Orders from 'routes/Orders'
import Delivery from 'routes/Delivery'
import Delivering from 'routes/Delivering'
import { ColumnResponsive } from 'components/Column/Column'
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
      <Route path='/delivery' exact component={Delivery} />
      <Route path='/delivery/:id' component={Delivering} />
      <Redirect to='/dashboard' />
    </ColumnResponsive>
  </Switch>
)

export default AuthenticatedApp
