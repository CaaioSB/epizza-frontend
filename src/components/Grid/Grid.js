import React from 'react'
import styled from 'styled-components'

export const GridComponent = ({ children, ...props }) => <Grid {...props}>{children}</Grid>

const Grid = styled.div(
  ({ width, height, fr, mt }) => `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${width || '200px'}, ${fr || '1fr'}));
  grid-gap: 1em;
  justify-content: space-between;
  margin-top: ${mt};
  height: ${height};
`
)

export default GridComponent
