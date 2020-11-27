import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Text from 'components/Text'
import Button from 'components/Button'
import { ColumnDesktop, ColumnMobile } from 'components/Column'
import IconButton from 'components/IconButton'
import Icon from 'components/Icon'
import Theme from 'theme'
import { useAuth } from 'context/auth-context'

const MenuComponent = ({ title, color }) => {
  const { logout } = useAuth()
  const history = useHistory()
  const [openedMenu, setOpenedMenu] = useState(false)

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
          <IconButton alignSelf='start' icon='menu' color='white' onClick={() => setOpenedMenu(!openedMenu)} />
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
          {menuItems.map((item, index) => (
            <Button my={10} key={item.route + index} color='primary' onClick={() => pushTo(item.route)}>
              {item.label}
            </Button>
          ))}
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
  border-bottom: 1px solid #f4f4f4;
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

  -webkit-transition: height 0.5s ease-in-out;
  -moz-transition: height 0.5s ease-in-out;
  -o-transition: height 0.5s ease-in-out;
  transition: height 0.5s ease-in-out;
`
)

export default MenuComponent
