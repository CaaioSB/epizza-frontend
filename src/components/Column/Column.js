import React from 'react'
import styled from 'styled-components'

import Row from 'components/Row'

import { MEDIADESKTOP } from 'helpers'

const ColumnComponent = props => <Row flexDirection='column' {...props} />

export const ColumnResponsive = styled(ColumnComponent)`
  flex-direction: column-reverse;
  flex-flow: column;

  @media (min-width: ${MEDIADESKTOP}px) {
    width: 100%;
    flex-direction: column;
    flex-flow: initial;

    /* > *:not(:first-child):not(:last-child) {
      margin: 0 20px;
    } */
  }
`

export const ColumnDesktop = styled(ColumnComponent)`
  display: none;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: flex;
  }
`

export const ColumnMobile = styled(ColumnComponent)`
  display: flex;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: none;
  }
`

export default ColumnComponent
