import React from 'react'
import { useHistory } from 'react-router-dom'

import Container from 'components/Container'
import Body from 'components/Body'
import { ColumnResponsive } from 'components/Column'
import Input from 'components/Input'
import ButtonComponent from 'components/Button'
import HorizontalCard from 'components/HorizontalCard'
import IconButton from 'components/IconButton'
import Row from 'components/Row'

const Modules = [
  {
    label: 'Funcionários',
    route: '/managerial/employers',
    description: 'Visualizar, editar e remover funcionários',
    icon: 'user'
  },
  {
    label: 'Produtos',
    route: '/managerial/products',
    description: 'Visualizar, editar e remover produtos',
    icon: 'shoppingCart'
  },
  {
    label: 'Clientes',
    route: '/managerial/customers',
    description: 'Visualizar, editar e remover clientes',
    icon: 'users'
  },
  {
    label: 'Entregas',
    route: '/managerial/deliveries',
    description: 'Visualizar entregas',
    icon: 'truck'
  },
  {
    label: 'Cargos',
    route: '/managerial/roles',
    description: 'Visualizar, editar e remover cargos',
    icon: 'awards'
  }
]

const Managerial = () => {
  const history = useHistory()

  return (
    <Container>
      <Body text='Gerenciamento' emoji='folder'>
        <ColumnResponsive mb={20} alignItems='baseline'>
          <Input mb={0} width='100%' placeholder='Busque pelo nome do modulo' />
          <ButtonComponent px={10} width={120} mx={15}>
            Buscar
          </ButtonComponent>
        </ColumnResponsive>
        {Modules.map((module, index) => (
          <Row mb={10} key={index}>
            <HorizontalCard
              icon={module.icon}
              name={module.label}
              description={module.description}
              action={<IconButton m={0} icon='external' color='primary' onClick={() => history.push(module.route)} />}
            />
          </Row>
        ))}
      </Body>
    </Container>
  )
}

export default Managerial
