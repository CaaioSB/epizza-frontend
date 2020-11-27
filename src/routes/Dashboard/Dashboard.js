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
          <CardChartComponent value='5.0' text='irineu' icon='x' porcentage={10} />
          <CardChartComponent value='100' text='teste' icon='x' porcentage={25} />
          <CardChartComponent color='primary' value='1000' text='debug' icon='x' porcentage={50} />
          <CardChartComponent value='1.0' text='text' icon='x' porcentage={100} />
        </Grid>
      </ColumnDesktop>
    </Body>
  </Container>
)

export default Dashboard
