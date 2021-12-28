import React from 'react'
import styled, { keyframes } from 'styled-components'

import Text from 'components/Text'
import Column from 'components/Column'

export const FormHelperTextComponent = ({ children, helperText, ...props }) => {
  return (
    <Column>
      {children}
      {helperText && <FormHelperText {...props}>{helperText}</FormHelperText>}
    </Column>
  )
}

const pulseError = keyframes`
  0% { color: #cc0000; }
  50% { color: #ff8282; }
  100% { color:  #cc0000; }
`

const FormHelperText = styled(Text)`
  color: initial;
  animation-name: ${pulseError};
  animation-duration: 1s;
  animation-iteration-count: ${({ error }) => (error ? 'infinite' : '0')};
`

FormHelperTextComponent.defaultProps = {
  variant: 'tiny',
  error: false
}

export default FormHelperTextComponent
