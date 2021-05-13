import React from 'react'
import styled from 'styled-components'
import { border, space } from 'styled-system'

export const HorizontalLineComponent = props => {
  return <HorizontalLine {...props} />
}

const HorizontalLine = styled.hr`
  ${border}
  ${space}
`

HorizontalLine.defaultProps = {
  border: '1px solid #cdcdcd'
}

export default HorizontalLineComponent
