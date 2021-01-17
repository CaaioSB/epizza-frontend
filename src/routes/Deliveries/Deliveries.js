import React, { Fragment } from 'react'

import Container from 'components/Container'
import Body from 'components/Body'
import Grid from 'components/Grid'
import Product from 'components/Product'
import IconButton from 'components/IconButton'
import Button from 'components/Button'

const Deliverys = () => {
  return (
    <Container>
      <Body text='Entregas' emoji='bike'>
        <Product
          actions={
            <Fragment>
              <Button px={10} mx={15}>
                ENTREGA REALIZADA
              </Button>
              <IconButton m={0} width='100%' icon='arrowRight' color='primary' />
            </Fragment>
          }
          title='João Cleber'
          price='4,00'
          coords={[-23.48919, -46.85054]}
        />
        <Product
          actions={
            <Fragment>
              <Button px={10} mx={15}>
                DESTINATÁRIO AUSENTE
              </Button>
              <IconButton m={0} width='100%' icon='arrowRight' color='primary' />
            </Fragment>
          }
          title='João Cleber'
          price='4,00'
          coords={[-23.48919, -46.85054]}
        />
        <Product
          actions={
            <Fragment>
              <Button px={10} mx={15}>
                ENDEREÇO NÃO ENCONTRADO
              </Button>
              <IconButton m={0} width='100%' icon='arrowRight' color='primary' />
            </Fragment>
          }
          title='João Cleber'
          price='4,00'
          coords={[-23.48919, -46.85054]}
        />
      </Body>
    </Container>
  )
}

export default Deliverys
