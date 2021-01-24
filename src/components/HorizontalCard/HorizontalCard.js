import React from 'react'
import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'
import { space, layout, typography, shadow, border } from 'styled-system'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'

import Icon from 'components/Icon'
import Text from 'components/Text'
import Row from 'components/Row'
import Column from 'components/Column'
import { MEDIADESKTOP } from 'helpers'

const HorizontalCardComponent = ({ name, description, action, icon, isLoading, ...props }) => {
  return (
    <Row width='100%' minHeight={44}>
      {isLoading ? (
        <span style={{ width: '100%' }}>
          <Skeleton width='100%' height={80} count={1} />
        </span>
      ) : (
        <HorizontalCard {...props}>
          {icon && <Icon icon={icon} width={44} height={44} minWidth={44} minHeight={44} strokeWidth={1} />}

          <Card ml={30}>
            <Row justifyContent='space-between'>
              <Column>
                <Text style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} fontWeight='500'>
                  {name}
                </Text>
                <CardInformations>
                  {description && (
                    <Text color='gray' variant='small'>
                      {description}
                    </Text>
                  )}
                </CardInformations>
              </Column>
              {action}
            </Row>
          </Card>
        </HorizontalCard>
      )}
    </Row>
  )
}

const HorizontalCard = styled.div`
  width: 100%;
  min-height: 44px;
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

const Card = styled(Column)`
  width: 100%;

  @media (max-width: ${MEDIADESKTOP}px) {
    margin: 0;
  }
`

const CardInformations = styled(Row)`
  @media (max-width: ${MEDIADESKTOP}px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`

HorizontalCardComponent.defaultProps = {
  borderRadius: 15,
  padding: 20,
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
}

HorizontalCardComponent.propTypes = {
  name: PropTypes.string,
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default HorizontalCardComponent
