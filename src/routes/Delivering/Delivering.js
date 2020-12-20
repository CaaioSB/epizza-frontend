import React, { Fragment } from 'react'

import Container from 'components/Container'
import Body from 'components/Body'
import Ordering from 'components/Ordering'
import ProductDetails from 'components/ProductDetails'
import IconButton from 'components/IconButton'

const Delivering = () => {
  return (
    <Fragment>
      <Container>
        <Body text='Entregas' emoji='transit'>
          <ProductDetails
            actions={
              <Fragment>
                <IconButton m={0} mr={10} icon='warning' color='secondary' />
                <IconButton m={0} mr={10} icon='waze' color='#31c6f7' />
                <IconButton m={0} mr={10} icon='mapPin' color='#35a152' />
                <IconButton m={0} icon='check' color='primary' />
              </Fragment>
            }
            quantity={1}
            coords={[-23.48919, -46.85054]}
            name='Calabresa'
            items={['Calabresa', 'Cebola']}
            description='sem cebola'
          />
        </Body>
      </Container>
      <Ordering text='Entregas realizadas' />
    </Fragment>
  )
}

export default Delivering
