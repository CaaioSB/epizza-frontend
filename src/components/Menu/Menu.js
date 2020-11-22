import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Text from 'components/Text'
import Column from 'components/Column'
import Row from 'components/Row'
import Button from 'components/Button'
import IconButton from 'components/IconButton'
import Theme from 'theme'
import { useAuth } from 'context/auth-context'

const MenuComponent = ({ title, color }) => {
  const { logout } = useAuth()
  const history = useHistory()

  const menuItems = [
    {
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      label: 'Novo Pedido',
      route: '/neworder'
    }
  ]

  return (
    <Theme>
      <Menu>
        <Column width='100%' justifyContent='space-between'>
          <Wrapper>
            <Row justifyContent='center'>
              <Text mt={50} variant='medium'>
                {title}
              </Text>
            </Row>

            <Column mt={60}>
              {menuItems.map((menuItem, index) => {
                return (
                  <Row key={`${index}${menuItem.route}`}>
                    <MenuButton color={color} onClick={() => history.push(menuItem.route)}>
                      {menuItem.label}
                    </MenuButton>
                  </Row>
                )
              })}
            </Column>
          </Wrapper>

          <Wrapper>
            <Row>
              <Wrapper>
                <IconButton />
              </Wrapper>
              <IconButton ml='auto' color='secondary' icon='settings' />
              <IconButton blink color='secondary' icon='bell' />
            </Row>
            <Row>
              <MenuButton color={color} onClick={logout}>
                Sair
              </MenuButton>
            </Row>
          </Wrapper>
        </Column>
      </Menu>
    </Theme>
  )
}

const Menu = styled.div`
  width: 315px;
  height: 100vh;
  background-color: #fdfdfb;
  border-right: 1px solid #f4f4f4;
  padding: 0 50px;
  display: flex;
  justify-content: center;
`

const MenuButton = styled(Button)`
  height: 45px;

  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 20px;

  border-radius: 15px;
  margin-bottom: 20px;
`

const Wrapper = styled.div``

export default MenuComponent
