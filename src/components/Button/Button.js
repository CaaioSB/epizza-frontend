import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, typography, border } from 'styled-system'
import propTypes from '@styled-system/prop-types'

import Loader from 'components/Loader'
import Text from 'components/Text'
import Theme from 'theme'
import { MEDIATABLET, MEDIADESKTOP } from 'helpers'

const ButtonComponent = ({ to, children, isLoading, ...props }) => (
  <Theme>
    <Button {...props}>{isLoading ? <Loader /> : <Text>{children}</Text>}</Button>
  </Theme>
)

const Button = styled.button`
  background-color: ${props => `${props.theme.palette[props.color].main}`};
  color: ${props => `${props.theme.palette[props.color].typography}`};
  font-size: 12pt;
  white-space: nowrap;
  transition: background-color 0.5s ease, width 0.5s ease-in-out;

  :hover {
    background-color: ${props => `${props.theme.palette[props.color].dark}`};
  }

  @media (max-width: ${MEDIADESKTOP}px) {
    width: 100%;
    margin: 10px 0;
  }

  ${space};
  ${layout};
  ${typography};
  ${border}
`

ButtonComponent.defaultProps = {
  width: 'fit',
  height: 'xsmall',
  color: 'primary',
  borderRadius: 15
}

ButtonComponent.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default ButtonComponent
