import React from 'react'
import styled from 'styled-components'
import { border, space, layout } from 'styled-system'

export const VerticalLineComponent = props => {
  return <VerticalLine {...props} />
}

const VerticalLine = styled.hr`
  ${border}
  ${space}
  ${layout}
`

VerticalLine.defaultProps = {
  borderLeft: '1px solid #cdcdcd',
  height: '100%'
}

export default VerticalLineComponent
