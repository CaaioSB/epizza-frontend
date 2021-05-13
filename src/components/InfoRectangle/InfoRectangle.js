import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import propTypes from '@styled-system/prop-types'
import { border, position, space, layout, color } from 'styled-system'

import Icon from 'components/Icon'
import Text from 'components/Text'
import Row from 'components/Row'
import Column from 'components/Column'
import { MEDIADESKTOP } from 'helpers'

export const InfoRectangleComponent = ({ title, subtitle, color, ...props }) => (
  <InfoRectangle color={color} {...props}>
    <Row>
      <Column height='fit-content'>
        <Text variant='medium'>{title}</Text>
        <Text mt={10} color='#96918B' variant='small'>
          {subtitle}
        </Text>
      </Column>
    </Row>
  </InfoRectangle>
)

const InfoRectangle = styled.div`
  height: auto;
  padding: 35px;
  background-color: ${({ color, theme }) => `${theme.palette[color].main}70`};
  color: ${({ color, theme }) => `${theme.palette[color].typographyMain}`};
  ${space};
  ${layout};
  ${color}
  ${border}
  ${position}
`

const InfoSVG = styled.div`
  @media (max-width: ${MEDIADESKTOP}px) {
    display: none;
  }
`

InfoRectangleComponent.defaultProps = {
  width: 'fit',
  // height: 'large',
  color: 'secondary',
  borderRadius: 15
}

InfoRectangleComponent.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default InfoRectangleComponent
