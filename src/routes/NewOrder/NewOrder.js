import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Prompt } from 'react-router-dom'
import { toast } from 'react-toastify'

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
import Column, { ColumnResponsive, ColumnDesktop, ColumnMobile } from 'components/Column'
import Row from 'components/Row'
import Text from 'components/Text'
import HorizontalLine from 'components/HorizontalLine'
import VerticalLine from 'components/VerticalLine'
import { OrderProductComponent } from 'components/Ordering'
import EmojiComponent from 'components/Emoji'
import Checkbox from 'components/Checkbox'
import Image from 'components/Image'
import Input from 'components/Input'

import { useOrder } from 'context/order-context'

import { getProducts } from 'services/product'
import { getPaymentsMethods } from 'services/payments-methods'

const NewOrder = () => {
  const [products, setProducts] = useState([])
  const [paymentsMethods, setPaymentsMethods] = useState([])
  const [moneyPayment, setMoneyPaymant] = useState(false)
  const [changeValue, setChangeValue] = useState(0.0)
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
  const { watch, register, handleSubmit, setValue, getValue } = useForm()
  const history = useHistory()

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

  useEffect(() => {
    console.log(watch())
    setChangeValue(parseFloat(watch()?.toPay - orderDetails.total).toFixed(2))
    // setValue('change', 'Troco: R$ 1,00')

    setMoneyPaymant(watch()?.paymentsMethods?.money)
  }, [watch()])

  const handleFinishOrder = async () => {
    try {
      if (!finishOrder) {
        const { data } = await getPaymentsMethods()
        setPaymentsMethods(data)
      }
    } catch {
      toast.error('Ocorreu um erro ao buscar os métodos de pagamento.')
      toast.info('Devido um problema técnico estamos aceitando apenas pagamento em dinheiro.')
      setPaymentsMethods([])
    } finally {
      setFinishOrder(!finishOrder)
    }
  }

  const onSubmit = values => {
    console.log(values)
  }

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
            <Button mt={40} color='secondary' onClick={handleFinishOrder}>
              Concluir
            </Button>
          }
        />
        <RouteLeavingGuard
          when={finishOrder}
          navigate={() => history.goBack()}
          shouldBlockNavigation={() => {
            return true
          }}
        />
        <Modal open={finishOrder} position='fixed'>
          <Card maxWidth='600px' maxHeight='90vh' text='Checkout' overflow='auto' emoji='pizza'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row mt={18}>
                <ColumnResponsive width='100%' display='flex' justifyContent='space-between'>
                  <Column>
                    <Row>
                      <Text fontWeight='bold'>Nome:&ensp;</Text>
                      <Text>{customer?.name}</Text>
                    </Row>

                    <Row>
                      <Text fontWeight='bold'>Celular:&ensp;</Text>
                      <Text>{customer?.cellPhone}</Text>
                    </Row>

                    <Row>
                      <Text fontWeight='bold'>Rua:&ensp;</Text>
                      <Text>{customer?.address?.street}</Text>
                    </Row>

                    <Row>
                      <Text fontWeight='bold'>Cidade:&ensp;</Text>
                      <Text>
                        {customer?.address?.city}, {customer?.address?.federativeUnit}
                      </Text>
                    </Row>

                    <Row>
                      <Text fontWeight='bold'>CEP:&ensp;</Text>
                      <Text>{customer?.address?.cep}</Text>
                    </Row>
                  </Column>
                  <ColumnDesktop>
                    <VerticalLine mx={18} />
                  </ColumnDesktop>
                  <ColumnMobile>
                    <HorizontalLine my={8} />
                  </ColumnMobile>
                  <Column maxHeight={150} overflow='auto' display='inline-grid'>
                    {orderProducts.map(({ urls, ...product }) => (
                      <OrderProductComponent item={product} src={urls[0]} />
                    ))}
                  </Column>
                </ColumnResponsive>
              </Row>
              <Column>
                <Row mt={18} justifyContent='space-between'>
                  <Row>
                    <Text fontSize='larger' fontWeight='bold'>
                      Método de Pagamento
                    </Text>
                    <EmojiComponent emoji='creditCard' />
                  </Row>
                  <Row>
                    <Text fontWeight='bold'>Total:&ensp;</Text>
                    <Text fontWeight='600'>R$ {orderDetails?.total}</Text>
                  </Row>
                </Row>
                <Row></Row>
                <Row width='100%' justifyContent='space-between'>
                  <Column width='100%'>
                    <Grid width='70px'>
                      {paymentsMethods?.map(({ id, slug, url }) => (
                        <Checkbox
                          register={register}
                          name={`paymentsMethods.${slug}`}
                          key={id}
                          placeholder={<Image backgroundColor='white' width={30} src={url} />}
                        />
                      ))}
                    </Grid>
                  </Column>
                </Row>
                {moneyPayment && (
                  <Row mt={18}>
                    <ColumnResponsive justifyContent='space-between' width='100%'>
                      <Input
                        width='65%'
                        register={register}
                        name='toPay'
                        placeholder='Quantia que será paga em dinheiro'
                        onChange={() => {
                          setValue('change', 'Troco: R$ 1,00')
                        }}
                      />
                      <Input
                        width='30%'
                        register={register}
                        name='change'
                        value={`Troco: R$ ${changeValue}`}
                        readonly
                      />
                    </ColumnResponsive>
                  </Row>
                )}
              </Column>
              <Row mt={18}>
                <ColumnResponsive width='100%'>
                  <Button mr={8} type='button' color='secondary' onClick={handleFinishOrder}>
                    EDITAR PEDIDO
                  </Button>
                  <Button ml={8} type='submit'>
                    FINALIZAR PEDIDO
                  </Button>
                </ColumnResponsive>
              </Row>
            </form>
          </Card>
        </Modal>
      </>
    )
  }
}

export default NewOrder
