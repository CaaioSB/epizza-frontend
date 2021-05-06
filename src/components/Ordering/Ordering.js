import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { layout } from 'styled-system'

import Column, { ColumnDesktop, ColumnMobile } from 'components/Column'
import Row from 'components/Row'
import Text from 'components/Text'
import Link from 'components/Link'
import Image from 'components/Image'
import Button from 'components/Button'

const renderingModes = {
  default: {
    orderingTitle: 'Os items',
    startButtonText: 'Concluir',
    showDeliveryCard: true,
    hasItemPrice: true,
    hasItemQuantity: true,
    hasTotalPrice: true
  },
  kitchen: {
    orderingTitle: 'Ver items finalizados',
    startButtonText: 'Finalizar',
    showDeliveryCard: false,
    hasItemPrice: false,
    hasItemQuantity: true,
    hasTotalPrice: false
  },
  delivery: {
    orderingTitle: 'Entregas selecionadas',
    startButtonText: 'Iniciar',
    showDeliveryCard: false,
    hasItemPrice: false,
    hasItemQuantity: false,
    hasTotalPrice: false
  }
}

const OrderingComponent = ({ text, type, actions, totalPrice, items, color }) => {
  const [orderOpened, setOrderOpened] = useState(false)

  useEffect(() => {
    orderOpened ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')
  }, [orderOpened])

  return (
    <Fragment>
      <ColumnDesktop width={500}>
        <Ordering>
          <BagItems text={text} type={type} totalPrice={totalPrice} actions={actions} items={items} />
        </Ordering>
      </ColumnDesktop>
      <ColumnMobile>
        <MobileOrder color={color}>
          <Row ml={20} width='100%' height='70px' alignItems='center'>
            <Column mr={20} width='100%'>
              <Row mr={20} justifyContent='space-between'>
                <Text
                  onClick={() => setOrderOpened(!orderOpened)}
                  position='absolute'
                  width='100%'
                  textAlign='center'
                  pr={40}
                  fontWeight={600}
                >
                  {text || renderingModes[type].orderingTitle}
                </Text>
                <Text fontWeight={600} width='100%' textAlign='end'>
                  R$ {totalPrice && `${totalPrice}`}
                </Text>
              </Row>
            </Column>
          </Row>
          <MobileOrderDetaild opened={orderOpened}>
            <BagItems text={text} type={type} totalPrice={totalPrice} actions={actions} items={items} />
          </MobileOrderDetaild>
        </MobileOrder>
      </ColumnMobile>
    </Fragment>
  )
}

export const OrderProductComponent = ({ item, type, quantity, name, price, src, ...props }) => (
  <OrderProduct {...props}>
    <Row alignItems='center'>
      {item?.quantity && (
        <Column>
          <Text
            fontSize={13}
            fontWeight={600}
            style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            {item.quantity} x
          </Text>
        </Column>
      )}
      <Column px={10}>
        <Image src={src} width={60} height={30} borderRadius={6} style={{ objectFit: 'cover' }} />
      </Column>
      <Column style={{ textOverflow: 'ellipsis', overflow: 'auto', width: '100%' }}>
        <Text
          fontSize={13}
          fontWeight={600}
          style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {item?.title}
        </Text>
      </Column>
      {item?.price && (
        <Column pl={10}>
          <Text
            fontSize={13}
            fontWeight={600}
            style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            R$ {(item.price * item.quantity).toFixed(2)}
          </Text>
        </Column>
      )}
    </Row>
  </OrderProduct>
)

const BagItems = ({ text, type, actions, delivery, totalPrice, items, ...props }) => (
  <Fragment>
    <ColumnDesktop>
      <Text fontWeight={700}>{text || renderingModes[type].orderingTitle}</Text>
    </ColumnDesktop>
    {delivery && (
      <DeliveryCard>
        <Row justifyContent='space-between'>
          <Column>
            <Text fontSize={12}>{delivery?.street}</Text>
            <Text fontSize={12} style={{ whiteSpace: 'nowrap' }}>
              {delivery?.neightboor}
            </Text>
            <Text fontSize={12} style={{ whiteSpace: 'nowrap' }}>
              {delivery?.city}, {delivery?.state} - {delivery?.postalCode}
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
      {items?.map(item => (
        <OrderProductComponent item={item} src={item.urls[0]} />
      ))}
    </Order>
    <OrderDetaild>
      {renderingModes[type].hasTotalPrice && (
        <Row justifyContent='space-between'>
          <Column alignSelf='center'>
            <Text variant='small' fontWeight={600}>
              Total
            </Text>
          </Column>
          <Column>
            <Text fontWeight={600}>R$ {totalPrice}</Text>
          </Column>
        </Row>
      )}
      <Row>
        {items?.length >= 1 && !actions ? (
          <Button mt={40} color='secondary'>
            {renderingModes[type].startButtonText}
          </Button>
        ) : (
          actions
        )}
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
  color: 'primary',
  type: 'default'
}

export default OrderingComponent
