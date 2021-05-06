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
import { useDebounce } from 'hooks/debounce'

const Employee = () => {
  const [employersBackup, setEmployersBackup] = useState([])
  const [employers, setEmployers] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const debouncedSearch = useDebounce(search, 500)

  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const {
          data: { employers }
        } = await getEmployers()
        setEmployers(employers)
        setEmployersBackup(employers)
      } catch (err) {
        toast.error('Ocorreu um erro desconhecido, tente novamente mais tarde.')
        throw err
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setEmployers(
      employersBackup.filter(
        employee =>
          employee?.name.toLowerCase().includes(search.toLowerCase()) ||
          employee?.cpf.toLowerCase().includes(search.toLowerCase()) ||
          employee?.email.toLowerCase().includes(search.toLowerCase()) ||
          employee?.cep.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [debouncedSearch])

  return (
    <Container>
      <Body text='Funcionários'>
        <ColumnResponsive mb={20} alignItems='baseline'>
          <Input
            mb={0}
            width='100%'
            placeholder='Busque pelo nome, CPF ou CEP'
            onChange={e => setSearch(e.target.value)}
          />
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
                <Row key={`employeeSkeleton_${index}`} mb={10}>
                  <CardPeople isLoading />
                </Row>
              ))}
          </Fragment>
        ) : (
          employers.map(employee => (
            <Row key={employee?.cpf} mb={10}>
              <CardPeople
                name={employee.name}
                cpf={employee?.cpf}
                cep={employee?.cep}
                email={employee.email}
                actions={
                  <Fragment>
                    <IconButton
                      onClick={() =>
                        history.push({ pathname: `/managerial/editemployee/${employee['_id']}`, state: { employee } })
                      }
                      m={0}
                      icon='edit'
                      color='secondary'
                    />
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
