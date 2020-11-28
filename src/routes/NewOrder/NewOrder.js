import React from 'react'

import Container from 'components/Container'
import Body from 'components/Body'
import { ColumnResponsive } from 'components/Column'
import Input from 'components/Input'
import ButtonComponent from 'components/Button'
import CardPeople from 'components/CardPeople'
import Grid from 'components/Grid'

const NewOrder = () => {
  return (
    <Container>
      <Body text='Selecione o Cliente' emoji='man'>
        <ColumnResponsive mb={20} alignItems='baseline'>
          <Input mb={0} width='100%' placeholder='Busque pelo nome, CPF ou CEP' />
          <ButtonComponent px={10} width={120} mx={15}>
            Pesquisar
          </ButtonComponent>
          <ButtonComponent px={10} width={140} color='secondary'>
            Novo Cliente
          </ButtonComponent>
        </ColumnResponsive>
        <Grid>
          <CardPeople name='Caio' cpf='000 000 000 00' cep='00000000' email='caio@gmail.com' />
        </Grid>
      </Body>
    </Container>
  )
}

export default NewOrder
