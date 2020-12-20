import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Text from 'components/Text'
import Column from 'components/Column'
import Row from 'components/Row'
import { OrderProductComponent } from 'components/Ordering'
import IconButton from 'components/IconButton'

const Order = ({ orderNumber, color = 'success' }) => {
  const history = useHistory()

  return (
    <OrderContainer>
      <Row height='100%'>
        <Column width='100%' justifyContent='space-between'>
          <OrderStatus color={color} />
          <Column>
            <Row mx={40} mt={20}>
              <Text>
                Pedido <b>#{orderNumber}</b>
              </Text>
            </Row>
            <OrderBody>
              <OrderProductComponent type='default' quantity={1} name='Calabresa' value='50.00' />
            </OrderBody>
          </Column>
          <OrderBottom>
            <Row>
              <IconButton icon='warning' color='secondary' />
              <IconButton icon='start' color='primary' ml={20} onClick={() => history.push(`/order/${orderNumber}`)} />
            </Row>
          </OrderBottom>
        </Column>
      </Row>
    </OrderContainer>
  )
}

const OrderContainer = styled.div`
  width: 400px;
  height: 98%;
  position: relative;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
`

const OrderStatus = styled.div`
  width: 20px;
  height: 100%;
  position: absolute;
  border-radius: 15px 0 0 15px;
  background-color: ${({ theme, color }) => theme.palette.default[color]};
`

const OrderBody = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: overlay;
  overflow-x: hidden;
  padding: 20px 20px 20px 40px;
`

const OrderBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`

export default Order
