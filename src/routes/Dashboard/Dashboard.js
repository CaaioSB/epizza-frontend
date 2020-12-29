import React from 'react'

import Container from 'components/Container'
import Body from 'components/Body'
import InfoRectangle from 'components/InfoRectangle/InfoRectangle'
import CardChartComponent from '../../components/CardChart/CardChart'
import Grid from 'components/Grid'
import ColumnDesktop from 'components/Column'

const Dashboard = () => (
  <Container>
    <Body text='Dashboard' emoji='chart'>
      <InfoRectangle
        mb={50}
        color='secondary'
        title='Veja as estastísticas do seu comercio'
        subtitle='Esta é uma versão beta, o seu feedback é muito importante para nós!'
      ></InfoRectangle>
      <ColumnDesktop>
        <Grid>
          <CardChartComponent value='2' text='Pedidos realizados' icon='shoppingCart' porcentage={2} />
          <CardChartComponent value='0' text='Entregas realizadas' icon='truck' porcentage={0} />
          <CardChartComponent value='1' text='Pedidos preparados' icon='bell' porcentage={50} color='primary' />
          <CardChartComponent value='0' text='Pedidos cancelados' icon='x' porcentage={0} />
        </Grid>
      </ColumnDesktop>
    </Body>
  </Container>
)

export default Dashboard
