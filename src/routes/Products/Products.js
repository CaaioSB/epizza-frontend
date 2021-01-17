import React, { useEffect, useState, Fragment } from 'react'
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'

import { getProducts } from 'services/product'
import Container from 'components/Container'
import Body from 'components/Body'
import Product from 'components/Product'
import { ColumnResponsive } from 'components/Column'
import Input from 'components/Input'
import ButtonComponent from 'components/Button'
import IconButton from 'components/IconButton'
import { useDebounce } from 'hooks/debounce'

const Products = () => {
  const [search, setSearch] = useState()
  const [products, setProducts] = useState([])
  const [productsBackup, setProductsBackup] = useState([])

  const debouncedSearch = useDebounce(search, 500)
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: products } = await getProducts()
        setProducts(products)
        setProductsBackup(products)
      } catch (err) {
        toast.error('Ocorreu um erro ao obter os produtos, tente novamente mais tarde.')
        new Error(err)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setProducts(productsBackup.filter(product => product.title.toLowerCase().includes(debouncedSearch.toLowerCase())))
  }, [debouncedSearch])

  return (
    <Container>
      <Body text='Produtos'>
        <ColumnResponsive mb={20} alignItems='baseline'>
          <Input
            mb={0}
            width='100%'
            placeholder='Busque pelo nome'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <ButtonComponent px={10} width={120} mx={15}>
            Pesquisar
          </ButtonComponent>
          <ButtonComponent px={10} width={140} color='secondary' onClick={() => history.push('/managerial/newproduct')}>
            Novo Produto
          </ButtonComponent>
        </ColumnResponsive>
        {products.map(product => (
          <Product
            actions={
              <Fragment>
                <IconButton
                  onClick={() =>
                    history.push({ pathname: `/managerial/editproduct/${product['slug']}`, state: { product } })
                  }
                  m={0}
                  width='100%'
                  icon='edit'
                  color='secondary'
                  mr={20}
                />
                <IconButton m={0} width='100%' icon='arrowRight' color='primary' />
              </Fragment>
            }
            title={product.title}
            price={product.price}
            src={product.urls[0]}
          />
        ))}
      </Body>
    </Container>
  )
}

export default Products
