import React from 'react'
import { useHistory } from 'react-router-dom'

import Container from 'components/Container'
import Body from 'components/Body'
import { ColumnResponsive } from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'

const Roles = () => {
  const history = useHistory()

  return (
    <Container>
      <Body text='Cargos'>
        <ColumnResponsive mb={20} alignItems='baseline'>
          <Input mb={0} width='100%' placeholder='Busque pelo nome do cargo' />
          <Button px={10} width={120} mx={15}>
            Pesquisar
          </Button>
          <Button onClick={() => history.push('/managerial/newrole')} px={10} width={160} color='secondary'>
            Novo Cargo
          </Button>
        </ColumnResponsive>
      </Body>
    </Container>
  )
}

export default Roles
