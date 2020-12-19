import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import Container from 'components/Container'
import Body from 'components/Body'
import Ordering from 'components/Ordering'
import Product from 'components/Product'
import Grid from 'components/Grid'
import Button from 'components/Button'

const Delivery = () => {
  const history = useHistory()

  return (
    <Fragment>
      <Container>
        <Body text='Entregas disponíveis' emoji='bike'>
          <Grid width='270px' fr='1fr'>
            <Product title='João Cleber' price='4,00' coords={[-23.48919, -46.85054]} />
            <Product title='Luis Gustavo' price='8,00' coords={[-23.48919, -46.85054]} />
            <Product title='Caio Batista' price='9,00' coords={[-23.48919, -46.85054]} />
            <Product title='Lucas Gomes' price='10,00' coords={[-23.48919, -46.85054]} />
          </Grid>
        </Body>
      </Container>
      <Ordering
        type='delivery'
        actions={
          <Button mt={40} color='secondary' onClick={() => history.push('/delivery/1')}>
            Iniciar
          </Button>
        }
      />
    </Fragment>
  )
}

export default Delivery
