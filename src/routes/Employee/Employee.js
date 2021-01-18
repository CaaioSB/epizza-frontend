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
import { getEmployers } from 'services/employee'
import Skeleton from 'react-loading-skeleton'

const Employee = () => {
  const [employers, setEmployers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const {
          data: { employers }
        } = await getEmployers()
        setEmployers(employers)
      } catch (err) {
        toast.error('Ocorreu um erro desconhecido, tente novamente mais tarde.')
        throw err
      } finally {
        setIsLoading(false)
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
          employers.map(employee => (
            <Row mb={10}>
              <CardPeople
                name={employee.name}
                cpf='000 000 000 00'
                cep='00000000'
                email={employee.email}
                actions={
                  <Fragment>
                    <IconButton
                      onClick={() =>
                        history.push({ pathname: `/managerial/editemployee/${employee['_id']}`, state: { employee } })
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
              />
            </Row>
          ))
        )}
      </Body>
    </Container>
  )
}

export default Employee
