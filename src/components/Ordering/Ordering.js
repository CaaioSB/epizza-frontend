import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { layout } from 'styled-system'

import Column, { ColumnDesktop, ColumnMobile } from 'components/Column'
import Row from 'components/Row'
import Text from 'components/Text'
import Link from 'components/Link'
import Image from 'components/Image'
import Button from 'components/Button'

const OrderingComponent = ({ type, color }) => {
  const [orderOpened, setOrderOpened] = useState(false)

  useEffect(() => {
    orderOpened ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')
  }, [orderOpened])

  return (
    <Fragment>
      <ColumnDesktop width={500}>
        <Ordering>{BagItems(type)}</Ordering>
      </ColumnDesktop>
      <ColumnMobile>
        <MobileOrder color={color}>
          <Row ml={20} width='100%' height='70px' alignItems='center'>
            <Column mr={20} width='100%'>
              <Row mr={20} justifyContent='space-between'>
                <Text fontWeight={600}>0</Text>
                <Text
                  onClick={() => setOrderOpened(!orderOpened)}
                  position='absolute'
                  width='100%'
                  textAlign='center'
                  pr={40}
                  fontWeight={600}
                >
                  {type !== 'kitchen' ? 'Ver sacola' : 'Ver items finalizados'}
                </Text>
                <Text fontWeight={600}>{type !== 'kitchen' && 'R$ 50.00'}</Text>
              </Row>
            </Column>
          </Row>
          <MobileOrderDetaild opened={orderOpened}>{BagItems(type)}</MobileOrderDetaild>
        </MobileOrder>
      </ColumnMobile>
    </Fragment>
  )
}

export const OrderProductComponent = ({ quantity = 1, name, value, hidePrice, ...props }) => (
  <OrderProduct {...props}>
    <Row alignItems='center'>
      <Column>
        <Text
          fontSize={13}
          fontWeight={600}
          style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {quantity} x
        </Text>
      </Column>
      <Column px={10}>
        <Image
          width={60}
          height={30}
          borderRadius={6}
          style={{ objectFit: 'cover' }}
          src='https://www.jornaldafronteira.com.br/wp-content/uploads/2019/07/5d11589e51f93-10.jpg'
        />
      </Column>
      <Column style={{ textOverflow: 'ellipsis', overflow: 'auto', width: '100%' }}>
        <Text
          fontSize={13}
          fontWeight={600}
          style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {name}
        </Text>
      </Column>
      {hidePrice && (
        <Column pl={10}>
          <Text
            fontSize={13}
            fontWeight={600}
            style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            R$ {value}
          </Text>
        </Column>
      )}
    </Row>
  </OrderProduct>
)

const BagItems = type => (
  <Fragment>
    <ColumnDesktop>
      <Text fontWeight={700}>{type !== 'kitchen' ? 'Os Items' : 'Items finalizados'}</Text>
    </ColumnDesktop>
    {type !== 'kitchen' && (
      <DeliveryCard>
        <Row justifyContent='space-between'>
          <Column>
            <Text fontSize={12}>Alameda R. Branco, nº 123</Text>
            <Text fontSize={12} style={{ whiteSpace: 'nowrap' }}>
              Depuração
            </Text>
            <Text fontSize={12} style={{ whiteSpace: 'nowrap' }}>
              Barueri, SP - 00000-000
            </Text>
          </Column>
          <Column>
            <Link fontSize={11} color='secondary' style={{ whiteSpace: 'nowrap' }}>
              Editar
            </Link>
          </Column>
        </Row>
      </DeliveryCard>
    )}
    <Order>
      <OrderProductComponent name='Pizza de Calabresa' hidePrice={type !== 'kitchen'} />
    </Order>
    <OrderDetaild>
      {type !== 'kitchen' && (
        <Row justifyContent='space-between'>
          <Column alignSelf='center'>
            <Text variant='small' fontWeight={600}>
              Total
            </Text>
          </Column>
          <Column>
            <Text fontWeight={600}>R$ 00.00</Text>
          </Column>
        </Row>
      )}
      <Row>
        <Button mt={40} color='secondary'>
          Concluir
        </Button>
      </Row>
    </OrderDetaild>
  </Fragment>
)

const Ordering = styled.div`
  height: 100vh;
  padding: 50px 45px;
  background-color: #fdfdfb;
  border-left: 1px solid #f4f4f4;
  display: flex;
  flex-direction: column;
`

const DeliveryCard = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 15px;
  margin-top: 40px;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.typography};
`

const Order = styled.div`
  height: 100%;
  margin: 40px 0;
  overflow: auto;
  display: inline-grid;
  grid-auto-rows: max-content;
`

const OrderProduct = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px 5px 10px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${layout}
`

const OrderDetaild = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  margin-top: auto;
`

const MobileOrder = styled(ColumnMobile)`
  width: 100vw;
  min-height: 70px;
  position: fixed;
  bottom: 0;
  background-color: ${({ color, theme }) => theme.palette[color].main};
  color: ${({ color, theme }) => theme.palette[color].typography};
  /* z-index: 1; */
`

const MobileOrderDetaild = styled(Row)`
  width: 100vw;
  height: ${({ opened }) => (opened ? 'calc(100vh - 70px)' : '0px')};
  padding: 0 20px;
  position: relative;
  top: 0;
  z-index: 1;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;

  .newOrderContainer {
    overflow: ${({ opened }) => (opened ? 'hidden' : 'unset')};
  }

  body {
    overflow: ${({ opened }) => (opened ? 'hidden' : 'unset')};
  }

  -webkit-transition: height 0.5s ease-in-out;
  -moz-transition: height 0.5s ease-in-out;
  -o-transition: height 0.5s ease-in-out;
  transition: height 0.5s ease-in-out;
`

OrderingComponent.defaultProps = {
  color: 'primary'
}

export default OrderingComponent
