import React from 'react'
import styled from 'styled-components'
import { color, space, layout } from 'styled-system'
import PropTypes from 'prop-types'

import * as Icons from 'assets/Icons'

const IconComponent = ({ icon, ...props }) => {
  const IconSrc = Icons[`${icon[0].toUpperCase()}${icon.slice(1).replace(/([-_]\w)/g, g => g[1].toUpperCase())}`]

  return IconSrc ? <IconSrc {...props} /> : <Icons.X {...props} />
}

const Icon = styled(IconComponent)`
  ${color}
  ${space}
  ${layout}
`

Icon.defaultProps = {
  icon: 'settings',
  width: 24,
  height: 24
}

Icon.propTypes = {
  icon: PropTypes.string
}

export default Icon
