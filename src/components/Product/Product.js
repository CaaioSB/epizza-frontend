import React from 'react'
import styled from 'styled-components'

import Text from 'components/Text'
import Button from 'components/Button'
import Row from 'components/Row'
import Column from 'components/Column'
import Icon from 'components/Icon'

const ProductComponent = ({ title, amount, price, ...props }) => (
  <Product {...props}>
    <ProductImage src='https://www.jornaldafronteira.com.br/wp-content/uploads/2019/07/5d11589e51f93-10.jpg' />
    <Row justifyContent='space-between'>
      <Column>
        <Text mt={20}>{title}</Text>
        <Row>
          {amount && (
            <Text variant='small' mr={20}>
              <Icon icon='user' width='15px' height='15px' /> {amount}
            </Text>
          )}
          {price && <Text variant='small'>R$ {price}</Text>}
        </Row>
      </Column>
      <Column>
        <Button width={100} mt={20} px={10}>
          Adicionar
        </Button>
      </Column>
    </Row>
  </Product>
)

const Product = styled.div`
  width: 100%;
  height: 200px;
`

const ProductImage = styled.img`
  width: 100%;
  height: 120px;
  border: none;
  border-radius: 15px;
  background-color: #cacaca;
  object-fit: cover;
`

export default ProductComponent
