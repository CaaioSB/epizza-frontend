import React, { Fragment } from 'react'
import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'
import { space, layout, typography, shadow, border } from 'styled-system'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'

import Icon from 'components/Icon'
import Text from 'components/Text'
import Row from 'components/Row'
import Column, { ColumnDesktop, ColumnMobile } from 'components/Column'
import { MEDIADESKTOP } from 'helpers'

export const CardPeopleComponent = ({ name, cpf, cep, email, actions, isLoading, ...props }) => {
  return (
    <CardPeople {...props}>
      {isLoading ? (
        <Skeleton height={40} width={40} />
      ) : (
        <Icon icon='user' width={44} height={44} minwidth={44} minheight={44} strokeWidth={1} />
      )}
      <People width='100%' ml={30}>
        <Row width='100%' position='relative'>
          {isLoading ? (
            <Row width='100%'>
              <span style={{ width: '100%', position: 'relative' }}>
                <ColumnMobile>
                  <Skeleton height={15} count={3} />
                </ColumnMobile>
                <ColumnDesktop>
                  <Skeleton height={23} count={1} width='90%' />
                  <Skeleton height={40} width={40} style={{ right: 60, top: 0, position: 'absolute' }} />
                  <Skeleton height={40} width={40} style={{ right: 0, top: 0, position: 'absolute' }} />
                </ColumnDesktop>
              </span>
            </Row>
          ) : (
            <Text
              width='100%'
              style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
              fontWeight='500'
            >
              {name}
            </Text>
          )}
        </Row>
        <PeopleInformations>
          {cpf && (
            <Text color='gray' variant='small' mr={10}>
              {cpf ? (
                <Fragment>
                  <b>CPF: </b>
                  {cpf}
                </Fragment>
              ) : (
                <Skeleton />
              )}
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
        {isLoading ? (
          <Fragment>
            <Row width='100%' justifyContent='space-between'>
              <span style={{ width: '49%' }}>
                <Skeleton height={40} />
              </span>
              <span style={{ width: '49%' }}>
                <Skeleton height={40} />
              </span>
            </Row>
          </Fragment>
        ) : (
          <Fragment>{actions}</Fragment>
        )}
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
    & > span {
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
  paddingX: 20,
  paddingY: 20,
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
