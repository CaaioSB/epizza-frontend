import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import Container from 'components/Container'
import Body from 'components/Body'
import Column, { ColumnResponsive } from 'components/Column'
import Row from 'components/Row'
import Input from 'components/Input'
import ButtonComponent from 'components/Button'
import CardPeople from 'components/CardPeople'
import Grid from 'components/Grid'
import { getCustomers } from 'services/customers'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { data } = await getCustomers()
        setCustomers(data)
      } catch (err) {
        toast.error('Ocorreu um erro desconhecido. Tente novamente mais tarde.')
        throw err
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <Body text='Clientes' emoji='man'>
        <ColumnResponsive mb={20} alignItems='baseline'>
          <Input mb={0} width='100%' placeholder='Busque pelo nome, CPF ou CEP' />
          <ButtonComponent px={10} width={120} mx={15}>
            Pesquisar
          </ButtonComponent>
          <ButtonComponent
            onClick={() => history.push('/managerial/newcustomer')}
            px={10}
            width={140}
            color='secondary'
          >
            Novo Cliente
          </ButtonComponent>
        </ColumnResponsive>
        <Column>
          {isLoading ? (
            <Fragment>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Row mb={10}>
                    <CardPeople key={index} isLoading />
                  </Row>
                ))}
            </Fragment>
          ) : (
            customers.map(customer => (
              <Row mb={10}>
                <CardPeople name={customer.name} email={customer.email} />
              </Row>
            ))
          )}
        </Column>
      </Body>
    </Container>
  )
}

export default Customers
