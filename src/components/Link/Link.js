import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Text from 'components/Text'

const getProps = ({ to, textVariant, ...props }) => {
  if (to) {
    return {
      to,
      as: Link,
      ...props
    }
  }

  return {
    as: 'a',
    ...props
  }
}

export const LinkComponent = props => <LinkText {...getProps(props)} />

const LinkText = styled(Text)`
  text-decoration: ${({ textDecoration }) => textDecoration};
  color: ${({ theme, color }) => theme.palette[color].main};
`

LinkComponent.defaultProps = {
  textDecoration: 'none',
  color: 'secondary'
}

LinkComponent.propTypes = {
  textDecoration: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  color: PropTypes.string
}

export default LinkComponent
