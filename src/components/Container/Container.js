import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, color } from 'styled-system'

import Column from 'components/Column'
import Grid from 'components/Grid'

import { MEDIADESKTOP } from 'helpers'

const ContainerComponent = ({ children, as = Column, ...props }) => (
  <Container as={as} {...props}>
    {children}
  </Container>
)

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px;

  @media (max-width: ${MEDIADESKTOP}px) {
    max-width: ${MEDIADESKTOP + 80}px;
    padding: 40px;
    margin-left: 0px;
    margin-right: 0px;
  }

  ${space}
  ${layout}
  ${color}
`

ContainerComponent.propTypes = {
  as: PropTypes.element
}

export default ContainerComponent
