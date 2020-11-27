import React from 'react'
import styled from 'styled-components'

const GridComponent = ({ children, ...props }) => <Grid {...props}>{children}</Grid>

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1em;
`

export default GridComponent
