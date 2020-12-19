import React from 'react'

import Row from 'components/Row'
import Column from 'components/Column'
import Container from 'components/Container'
import Body from 'components/Body'
import OrderList from 'components/Order'

const Orders = () => (
  <Container>
    <Body height='100%' text='Pedidos' emoji='order'>
      <Row height='100%' overflow='auto'>
        <OrderList orderNumber={'0001'} />
        <OrderList orderNumber={'0002'} />
        <OrderList orderNumber={'0003'} />
      </Row>
    </Body>
  </Container>
)

export default Orders
