import React from 'react'

import Container from 'components/Container'
import Body from 'components/Body'
import Grid from 'components/Grid'
import VerticalButton from 'components/VerticalButton'
import Product from 'components/Product'
import Ordering from 'components/Ordering'

const NewOrder = () => {
  return (
    <>
      <Container className='newOrderContainer' justifyContent='space-between'>
        <Body text='Novo Pedido' emoji='box'>
          <Grid width='70px' fr='70px'>
            <VerticalButton text='Tudo' icon='catalog' actived />
            <VerticalButton text='Pizzas' icon='pizza' />
            <VerticalButton text='Bebidas' icon='drink' />
            <VerticalButton text='Marmitex' icon='launch' />
            <VerticalButton text='Lanches' icon='marmitex' />
            <VerticalButton text='Esfihas' icon='esfiha' />
            <VerticalButton text='Mais Vendidos' icon='star' />
          </Grid>
          <Grid mt='70px' width='270px' fr='1fr'>
            <Product title='Pizza de Queijo' amount={5} price='50,00' />
          </Grid>
        </Body>
      </Container>
      <Ordering text='Os Items' emoji='pizza'></Ordering>
    </>
  )
}

export default NewOrder
