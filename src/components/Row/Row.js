import styled from 'styled-components'
import { space, layout, color, flexbox, border, shadow, position } from 'styled-system'
import propTypes from '@styled-system/prop-types'

import { MEDIADESKTOP } from 'helpers'

const RowComponent = styled.div`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor?.startsWith('#') ? backgroundColor : theme.palette[backgroundColor]?.main};
  display: flex;
  ${flexbox}
  ${space}
  ${layout}
  ${color}
  ${border}
  ${shadow}
  ${position};
`

RowComponent.propTypes = {
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.color,
  ...propTypes.flexbox,
  ...propTypes.border,
  ...propTypes.shadow,
  ...propTypes.position
}

export const RowDesktop = styled(RowComponent)`
  display: none;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: flex;
  }

  ${space}
`

export const RowMobile = styled(RowComponent)`
  display: flex;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: none;
  }

  ${space}
`

export default RowComponent
