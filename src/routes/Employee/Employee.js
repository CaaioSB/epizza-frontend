import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import Container from 'components/Container'
import Body from 'components/Body'
import { ColumnResponsive } from 'components/Column'
import Row from 'components/Row'
import Input from 'components/Input'
import ButtonComponent from 'components/Button'
import CardPeople from 'components/CardPeople'
import IconButton from 'components/IconButton'
import Grid from 'components/Grid'
import { getEmployers } from 'services/employee'

const Employee = () => {
  const [employers, setEmployers] = useState([])

  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { employers }
        } = await getEmployers()

        console.log(employers)
        setEmployers(employers)
      } catch (err) {
        console.log(err)
        toast.error('Ocorreu um erro desconhecido, tente novamente mais tarde.')
        throw err
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <Body text='Funcionários'>
        <ColumnResponsive mb={20} alignItems='baseline'>
          <Input mb={0} width='100%' placeholder='Busque pelo nome, CPF ou CEP' />
          <ButtonComponent px={10} width={120} mx={15}>
            Pesquisar
          </ButtonComponent>
          <ButtonComponent
            onClick={() => history.push('/managerial/newemployee')}
            px={10}
            width={160}
            color='secondary'
          >
            Novo Funcionário
          </ButtonComponent>
        </ColumnResponsive>
        {employers.map(employee => (
          <Row my={16}>
            <CardPeople
              name={employee.name}
              cpf='000 000 000 00'
              cep='00000000'
              email={employee.email}
              actions={
                <Fragment>
                  <IconButton m={0} width='100%' icon='edit' color='secondary' mr={20} />
                  <IconButton m={0} width='100%' icon='arrowRight' color='primary' />
                </Fragment>
              }
            />
          </Row>
        ))}
      </Body>
    </Container>
  )
}

export default Employee
