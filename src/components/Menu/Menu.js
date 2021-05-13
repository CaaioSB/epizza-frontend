import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Text from 'components/Text'
import Button from 'components/Button'
import Column, { ColumnDesktop, ColumnMobile } from 'components/Column'
import Row from 'components/Row'
import IconButton from 'components/IconButton'
import Icon from 'components/Icon'
import Theme from 'theme'
import { useAuth } from 'context/auth-context'

export const MenuComponent = ({ title, color }) => {
  const { logout } = useAuth()
  const history = useHistory()
  const [openedMenu, setOpenedMenu] = useState(false)
  const [haveNotifications, setHaveNotifications] = useState(true)

  const menuItems = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'Dashboard'
    },
    {
      label: 'Novo Pedido',
      route: '/neworder',
      icon: 'ShoppingCart'
    },
    {
      label: 'Cozinha',
      route: '/orders',
      icon: 'Awards'
    },
    {
      label: 'Entregas',
      route: '/delivery',
      icon: 'Truck'
    },
    {
      label: 'Gerencial',
      route: '/managerial',
      icon: 'Slider'
    }
  ]

  const pushTo = route => {
    history.push(route)
    setOpenedMenu(false)
  }

  return (
    <Theme>
      <ColumnDesktop>
        <SideMenu opened={openedMenu}>
          <Column>
            <Row minWidth={40} width='100%' style={{ contain: 'content' }}>
              <IconButton alignSelf='start' icon='menu' color='white' onClick={() => setOpenedMenu(!openedMenu)} />
              <Row>
                <Text
                  ml={10}
                  variant='medium'
                  width='60%'
                  position='absolute'
                  textAlign='center'
                  alignSelf='center'
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {title}
                </Text>
              </Row>
            </Row>
            {menuItems.map((item, index) => (
              <ResponsiveMenuButton
                my={10}
                key={item.route + index}
                opened={openedMenu}
                color='primary'
                onClick={() => pushTo(item.route)}
              >
                {!openedMenu && <Icon icon={item?.icon} />}
                {openedMenu && item.label}
              </ResponsiveMenuButton>
            ))}
          </Column>
          <Row minWidth={40} width='100%' justifyContent='space-between' style={{ contain: 'content' }}>
            <IconButton
              minWidth={40}
              alignSelf='start'
              photo='https://avatars1.githubusercontent.com/u/34246280?s=460&u=3ff9b3bf163c613f5bbab45e8b501151761fd7d4&v=4'
              color='secondary'
              blink={haveNotifications && !openedMenu}
            />
            <Row>
              <IconButton
                mx={5}
                minWidth={40}
                alignSelf='start'
                icon='logout'
                color='primary'
                onClick={() => logout()}
              />
              <IconButton mx={5} minWidth={40} alignSelf='start' icon='settings' color='secondary' />
              <IconButton
                mx={5}
                minWidth={40}
                alignSelf='start'
                icon='bell'
                blink={haveNotifications}
                color='secondary'
              />
            </Row>
          </Row>
        </SideMenu>
      </ColumnDesktop>
      <ColumnMobile>
        <TopMenu color={color}>
          <IconButton
            m={0}
            position='absolute'
            icon='menu'
            color='primary'
            stroke='white'
            onClick={() => setOpenedMenu(!openedMenu)}
          />
          <Text variant='medium' color='white' display='flex' alignSelf='center' justifyContent='center' width='100%'>
            {title}
          </Text>
        </TopMenu>
        <Menu opened={openedMenu}>
          <Column>
            {menuItems.map((item, index) => (
              <Button my={10} key={item.route + index} color='primary' onClick={() => pushTo(item.route)}>
                {item.label}
              </Button>
            ))}
          </Column>
          <Row minWidth={40} width='100%' justifyContent='space-between' style={{ contain: 'content' }}>
            <IconButton
              minWidth={40}
              alignSelf='start'
              photo='https://avatars1.githubusercontent.com/u/34246280?s=460&u=3ff9b3bf163c613f5bbab45e8b501151761fd7d4&v=4'
              color='secondary'
              blink={haveNotifications && !openedMenu}
            />
            <Row>
              <IconButton
                mx={5}
                minWidth={40}
                alignSelf='start'
                icon='logout'
                color='primary'
                onClick={() => logout()}
              />
              <IconButton mx={5} minWidth={40} alignSelf='start' icon='settings' color='secondary' />
              <IconButton
                mx={5}
                minWidth={40}
                alignSelf='start'
                icon='bell'
                blink={haveNotifications}
                color='secondary'
              />
            </Row>
          </Row>
        </Menu>
      </ColumnMobile>
    </Theme>
  )
}

const SideMenu = styled.div(
  ({ opened }) => `
  width: ${opened ? '300px' : '70px'};
  padding: 0 20px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fdfdfb;
  border-right: 1px solid #f4f4f4;
  justify-content: space-between;

  -webkit-transition: width 0.5s ease-in-out;
  -moz-transition: width 0.5s ease-in-out;
  -o-transition: width 0.5s ease-in-out;
  transition: width 0.5s ease-in-out;
`
)

const ResponsiveMenuButton = styled(Button)(
  ({ opened }) => `
  width: ${opened ? '250px' : '40px'};
`
)

const TopMenu = styled.div(
  ({ theme, color }) => `
  width: 100vw;
  height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: ${theme.palette[color].main};
`
)

const Menu = styled.div(
  ({ opened }) => `
  width: 100vw;
  padding: 0 20px;
  height: ${opened ? 'calc(100vh - 70px)' : '0px'};
  contain: content;
  background-color: #fdfdfb;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  -webkit-transition: height 0.5s ease-in-out;
  -moz-transition: height 0.5s ease-in-out;
  -o-transition: height 0.5s ease-in-out;
  transition: height 0.5s ease-in-out;
`
)

export default MenuComponent
