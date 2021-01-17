import React from 'react'

import Container from 'components/Container'
import Body from 'components/Body'
import Input from 'components/Input'
import Column, { ColumnResponsive } from 'components/Column'
import ButtonComponent from 'components/Button'

const NewEmployee = () => {
  return (
    <Container>
      <Body text='Novo Funcionário'>
        <Column width='100%'>
          <Input placeholder='Nome Completo' />
          <ColumnResponsive>
            <Input placeholder='CPF' />
            <Input placeholder='RG' />
            <Input placeholder='Telefone Celular' />
          </ColumnResponsive>
          <ColumnResponsive>
            <Input width='40%' placeholder='CEP' />
            <Input placeholder='Rua' />
            <Input width='40%' placeholder='Nº' />
          </ColumnResponsive>
          <ColumnResponsive>
            <Input placeholder='Bairro' />
            <Input placeholder='Cidade' />
            <Input placeholder='Estado' />
          </ColumnResponsive>
        </Column>
        <ButtonComponent width={100} alignSelf='flex-end'>
          Salvar
        </ButtonComponent>
      </Body>
    </Container>
  )
}

export default NewEmployee
