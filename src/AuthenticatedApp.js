import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ColumnResponsive } from 'components/Column/Column'
import Menu from 'components/Menu'

import NewOrder from 'routes/NewOrder'
import Dashboard from 'routes/Dashboard'
import NewCustomer from 'routes/NewCustomer'
import Customers from 'routes/Customers'
import Employee from 'routes/Employee'
import NewEmployee from 'routes/NewEmployee'
import Order from 'routes/Order'
import Orders from 'routes/Orders'
import Delivery from 'routes/Delivery'
import Delivering from 'routes/Delivering'
import Managerial from 'routes/Managerial'
import Products from 'routes/Products'
import NewProduct from 'routes/NewProduct'
import Deliverys from 'routes/Deliveries'
import Roles from 'routes/Roles'
import NewRole from 'routes/NewRole'
import NotFound from 'routes/NotFound'

import { useUser } from 'context/user-context'

const AuthenticatedApp = () => {
  const { user } = useUser()

  const hasPermission = (allowedRoles, allowedComponent) => {
    if (user) {
      return !user?.role.some(role => allowedRoles.includes(role.code)) ? allowedComponent : NotFound
    }
  }

  return (
    <ColumnResponsive>
      <Menu title='LáPavaelli Pizzaria' color='primary' />
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/neworder' component={NewOrder} />
        <Route path='/customers' component={Customers} />
        <Route path='/orders' component={Orders} />
        <Route path='/order/:id' component={Order} />
        <Route path='/delivery' exact component={Delivery} />
        <Route path='/delivery/:id' component={Delivering} />
        <Route path='/managerial' exact component={Managerial} />
        <Route path='/managerial/customers' component={Customers} />
        <Route path='/managerial/newcustomer' component={NewCustomer} />

        <Route path='/managerial/employers' component={Employee} />
        <Route path='/managerial/newemployee' component={NewEmployee} />
        <Route path='/managerial/editemployee/:id' component={NewEmployee} />

        <Route path='/managerial/products' component={Products} />
        <Route path='/managerial/newproduct' exact component={NewProduct} />
        <Route path='/managerial/editproduct/:id' exact component={NewProduct} />

        <Route path='/managerial/roles' component={Roles} />
        <Route path='/managerial/newrole' component={NewRole} />
        <Route path='/managerial/editrole/:id' component={NewRole} />

        <Route path='/managerial/deliveries' component={Deliverys} />
        <Redirect to='/' />
        <Route component={NotFound} />
      </Switch>
    </ColumnResponsive>
  )
}

export default AuthenticatedApp
