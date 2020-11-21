import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, typography, color, border } from 'styled-system'
import propTypes from '@styled-system/prop-types'

import Loader from 'components/Loader'
import Theme from 'theme'
import Row from 'components/Row'

const ButtonComponent = ({ children, isLoading, ...props }) => (
  <Theme>
    <Button {...props}>{isLoading ? <Loader /> : children}</Button>
  </Theme>
)

const Button = styled.button`
  background-color: ${props => `${props.theme.palette[props.color].main}`};
  color: ${props => `${props.theme.palette[props.color].typography}`};

  :hover {
    background-color: ${props => `${props.theme.palette[props.color].dark}`};
    transition: background-color 0.2s;
  }

  :not(:last-child) {
    margin-right: 20px;
  }
  ${space};
  ${layout};
  ${typography};
  ${border}
`

ButtonComponent.defaultProps = {
  width: 'regular',
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
