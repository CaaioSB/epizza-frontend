import React from 'react'
import { useParams } from 'react-router-dom'

import Container from 'components/Container'
import Body from 'components/Body'
import ProductDetails from 'components/ProductDetails'
import Ordering from 'components/Ordering'

const Order = () => {
  const { id: orderId } = useParams()

  return (
    <>
      <Container>
        <Body text={`Preparo  #${orderId}`} emoji='pizza'>
          <ProductDetails quantity={1} name='Calabresa' items={['Calabresa', 'Cebola']} description='sem cebola' />
        </Body>
      </Container>
      <Ordering type='kitchen' />
    </>
  )
}

export default Order
