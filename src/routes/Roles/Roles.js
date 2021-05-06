import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import Container from 'components/Container'
import Body from 'components/Body'
import Column, { ColumnResponsive } from 'components/Column'
import Row from 'components/Row'
import HorizontalCard from 'components/HorizontalCard'
import Input from 'components/Input'
import Button from 'components/Button'
import IconButton from 'components/IconButton'

import { getRoles } from 'services/role'

const Roles = () => {
  const history = useHistory()
  const [roles, setRoles] = useState()
  const [isLoading, setIsLoading] = useState([])

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoading(true)
        const { data } = await getRoles()
        setRoles(data)
      } catch {
        toast.error('Ocorreu um erro desconhecido. Tente novamente mais tarde.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoles()
  }, [])

  return (
    <Container>
      <Body text='Cargos'>
        <ColumnResponsive mb={20} alignItems='baseline'>
          <Input mb={0} width='100%' placeholder='Busque pelo nome do cargo' />
          <Button px={10} width={120} mx={15}>
            Pesquisar
          </Button>
          <Button onClick={() => history.push('/managerial/newrole')} px={10} width={160} color='secondary'>
            Novo Cargo
          </Button>
        </ColumnResponsive>
        <Column>
          {isLoading ? (
            <Fragment>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Row key={`roleCardSkeleton${index}`} mb={10}>
                    <HorizontalCard key={index} isLoading />
                  </Row>
                ))}
            </Fragment>
          ) : (
            roles?.map(role => (
              <Row key={role._id} mb={10}>
                <HorizontalCard
                  icon='awards'
                  name={role.name}
                  description={role.actions.join(' | ')}
                  action={
                    <IconButton
                      m={0}
                      icon='external'
                      color='primary'
                      onClick={() => history.push({ pathname: `/managerial/editrole/${role['_id']}`, state: { role } })}
                    />
                  }
                />
              </Row>
            ))
          )}
        </Column>
      </Body>
    </Container>
  )
}

export default Roles
