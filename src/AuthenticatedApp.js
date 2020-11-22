import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from 'routes/Home'
import Dashboard from 'routes/Dashboard'
import Row from 'components/Row'
import Menu from 'components/Menu'

const AuthenticatedApp = () => (
  <Switch>
    <Row>
      <Menu title='Pizzaria' color='primary' />
      <Route path='/home' component={Home} />
      <Route path='/dashboard' component={Dashboard} />
      <Redirect to='/home' />
    </Row>
  </Switch>
)

export default AuthenticatedApp
