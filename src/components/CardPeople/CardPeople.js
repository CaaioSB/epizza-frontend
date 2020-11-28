import React from 'react'
import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'
import { space, layout, typography, shadow, border } from 'styled-system'
import PropTypes from 'prop-types'

import Icon from 'components/Icon'
import Text from 'components/Text'
import Row from 'components/Row'
import Column from 'components/Column'
import IconButton from 'components/IconButton'
import { MEDIADESKTOP } from 'helpers'

const CardPeopleComponent = ({ name, cpf, cep, email, ...props }) => {
  return (
    <CardPeople {...props}>
      <Icon icon='user' width={44} height={44} minWidth={44} minHeight={44} strokeWidth={1} />
      <People ml={30}>
        <Row>
          <Text style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} fontWeight='500'>
            {name}
          </Text>
        </Row>
        <PeopleInformations>
          {cpf && (
            <Text color='gray' variant='small' mr={10}>
              <b>CPF:</b> {cpf}
            </Text>
          )}
          {cep && (
            <Text color='gray' variant='small' mr={10}>
              <b>CEP:</b> {cep}
            </Text>
          )}
          {email && (
            <Text
              color='gray'
              variant='small'
              mr={10}
              style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              <b>E-MAIL:</b> {email}
            </Text>
          )}
        </PeopleInformations>
      </People>
      <Row ml='auto'>
        <IconButton m={0} width='100%' icon='edit' color='secondary' mr={20} />
        <IconButton m={0} width='100%' icon='arrowRight' color='primary' />
      </Row>
    </CardPeople>
  )
}

const CardPeople = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: ${MEDIADESKTOP}px) {
    & > svg {
      display: none;
    }

    flex-direction: column;
    display: block;
  }

  ${space};
  ${layout};
  ${typography};
  ${border};
  ${shadow};
`

const People = styled(Column)`
  @media (max-width: ${MEDIADESKTOP}px) {
    margin: 0;
  }
`

const PeopleInformations = styled(Row)`
  @media (max-width: ${MEDIADESKTOP}px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`

CardPeopleComponent.defaultProps = {
  borderRadius: 15,
  padding: 20,
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
}

CardPeopleComponent.propTypes = {
  name: PropTypes.string,
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default CardPeopleComponent
