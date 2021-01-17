import React from 'react'
import { useHistory } from 'react-router-dom'

import Container from 'components/Container'
import Button from 'components/Button'

const NotFound = () => {
  const history = useHistory()

  return (
    <Container justifyContent='center' alignItems='center'>
      404 Página não entrada...
      <Button width={150} onClick={history.goBack}>
        VOLTAR ATRÁS
      </Button>
    </Container>
  )
}

export default NotFound
