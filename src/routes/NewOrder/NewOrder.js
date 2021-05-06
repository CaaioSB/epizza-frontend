import React, { useState, useEffect } from 'react'
import { useHistory, Prompt } from 'react-router-dom'

import Card from 'components/Card'
import Modal from 'components/Modal'
import Container from 'components/Container'
import Body from 'components/Body'
import Grid from 'components/Grid'
import VerticalButton from 'components/VerticalButton'
import Product from 'components/Product'
import Ordering from 'components/Ordering'
import Button from 'components/Button'
import RouteLeavingGuard from 'components/RouteLeavingGuard'
import Column from 'components/Column'
import Row from 'components/Row'
import Text from 'components/Text'
import HorizontalLine from 'components/HorizontalLine'

import { useOrder } from 'context/order-context'

import { getProducts } from 'services/product'

const NewOrder = () => {
  const [products, setProducts] = useState([])
  const [productType, setProductType] = useState('all')
  const [finishOrder, setFinishOrder] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const {
    products: orderProducts,
    customer: customerDetails,
    order: orderDetails,
    customer,
    cancelOrder,
    appendProduct,
    saveOrder,
    removeProduct,
    updateProduct
  } = useOrder()
  const history = useHistory()

  console.log(customer)
  console.log(orderProducts)
  console.log(orderDetails)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const { data: productsData } = await getProducts()

        setProducts(productsData)
      } catch (ex) {
        console.log(ex)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()

    return () => {
      cancelOrder()
    }
  }, [])

  if (!customerDetails?._id) {
    history.push({ pathname: '/managerial/customers', state: { mode: 'newOrder' } })
    return null
  } else {
    return (
      <>
        <Container className='newOrderContainer' justifyContent='space-between'>
          <Body text='Novo Pedido' emoji='box'>
            <Grid width='70px' fr='70px'>
              <VerticalButton text='Tudo' icon='catalog' actived />
            </Grid>
            <Grid mt='70px' width='270px' fr='1fr'>
              {(isLoading &&
                Array(5)
                  .fill()
                  .map((_, index) => <Product key={`productSkeleton${index}`} isLoading={true} />)) ||
                products.map(product => (
                  <Product
                    key={product._id}
                    actions={
                      <Button width={100} mt={20} px={10} onClick={() => appendProduct(product)}>
                        Adicionar
                      </Button>
                    }
                    title={product.title}
                    amount={5}
                    price={product.price}
                    src={product.urls[0]}
                  />
                ))}
            </Grid>
          </Body>
        </Container>
        <Ordering
          text='Os Items'
          emoji='pizza'
          items={orderProducts}
          totalPrice={orderDetails.total}
          actions={
            <Button mt={40} color='secondary' onClick={saveOrder}>
              Concluir
            </Button>
          }
        />
        <RouteLeavingGuard
          when={true}
          navigate={() => history.goBack()}
          shouldBlockNavigation={() => {
            return true
          }}
        />
        <Modal open={true}>
          <Card text='Checkout' emoji='pizza'>
            <Row mt={18}>
              <Column>
                <Row>
                  <Text fontWeight='bold'>Nome:&ensp;</Text>
                  <Text>{customer?.name}</Text>
                </Row>

                <Row>
                  <Text fontWeight='bold'>Celular:&ensp;</Text>
                  <Text>{customer?.cellPhone}</Text>
                </Row>
                <HorizontalLine my={8} />
                <Row>
                  <Text fontWeight='bold'>Rua:&ensp;</Text>
                  <Text>{customer?.address?.street}</Text>
                </Row>

                <Row>
                  <Text fontWeight='bold'>Cidade/UF:&ensp;</Text>
                  <Text>
                    {customer?.address?.city}, {customer?.address?.federativeUnit}
                  </Text>
                </Row>

                <Row>
                  <Text fontWeight='bold'>CEP:&ensp;</Text>
                  <Text>{customer?.address?.cep}</Text>
                </Row>
              </Column>
              <Column></Column>
            </Row>
            <Row mt={18}>
              <Button onClick={saveOrder}>FINALIZAR PEDIDO</Button>
            </Row>
          </Card>
        </Modal>
      </>
    )
  }
}

export default NewOrder
