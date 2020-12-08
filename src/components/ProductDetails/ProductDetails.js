import React from 'react'
import styled from 'styled-components'

import Image from 'components/Image'
import Row from 'components/Row'
import Column, { ColumnResponsive } from 'components/Column'
import Text from 'components/Text'
import Grid from 'components/Grid'
import IconButton from 'components/IconButton'

const ProductDetailsComponent = ({ quantity, name, items, description, ...props }) => {
  return (
    <ProductDetails>
      <ColumnResponsive height='100%'>
        <Column height='100%'>
          <Image
            max-width='200px'
            height={200}
            borderRadius='15px 0 0 15px'
            style={{ objectFit: 'cover' }}
            src='https://www.jornaldafronteira.com.br/wp-content/uploads/2019/07/5d11589e51f93-10.jpg'
          />
        </Column>
        <Column width='100%' p={20}>
          <Row>
            <Text fontWeight={600}>{quantity}</Text>
            <Text fontWeight={500} mx={10}>
              x
            </Text>
            <Text fontWeight={600}>{name}</Text>
          </Row>
          <Row height='100%' mt={20}>
            <Column width='100%'>
              <Grid height='100%'>
                <Column>
                  {items.map(item => (
                    <Text>{item}</Text>
                  ))}
                </Column>
                <Column justifyContent='space-between'>
                  <Row>{description}</Row>
                  <Row alignSelf='flex-end'>
                    <IconButton m={0} mr={10} icon='warning' color='secondary' />
                    <IconButton m={0} icon='check' />
                  </Row>
                </Column>
              </Grid>
            </Column>
          </Row>
        </Column>
      </ColumnResponsive>
    </ProductDetails>
  )
}

const ProductDetails = styled.div`
  width: 100%;
  min-height: 200px;
  height: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #ffffff;
`

export default ProductDetailsComponent
