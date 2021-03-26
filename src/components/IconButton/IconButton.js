import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import propTypes from '@styled-system/prop-types'
import { space, layout, border, flexbox, position } from 'styled-system'

import SVG from 'components/Icon'
import Theme from 'theme'

const IconComponent = ({ color, stroke = 'black', icon, blink, photo, children, ...props }) => (
  <Theme>
    <Icon color={color} {...props}>
      {children}
      {blink && <Alert />}
      {icon ? <SVG stroke={stroke} icon={icon} /> : photo && <Image stroke={stroke} src={photo} />}
    </Icon>
  </Theme>
)

const pulseAlert = (primary, secondary) => keyframes`
  0% { background-color: ${primary}; }
  50% { background-color: ${secondary}; }
  100% {  background-color: ${primary}; }
`

const Icon = styled.button`
  width: 40px;
  height: 40px;
  margin: 20px 0;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  /* :not(:last-child) {
    margin-right: 20px;
  } */

  border-radius: 15px;
  background-color: ${({ color, theme }) => (color.startsWith('#') ? color : theme.palette[color]?.main)};
  color: ${({ color, theme }) => `${theme.palette[color]?.typography}`};
  transition: background-color 0.5s;

  &:hover {
    background-color: ${({ theme, color }) => theme.palette[color]?.dark};
  }

  ${space};
  ${layout};
  ${border};
  ${flexbox};
  ${position};
  ${border}
`

const Image = styled.img`
  width: 100%;
  border-radius: 15px;
`

const Alert = styled.div`
  background-color: ${({ color, theme }) => `${theme.palette[color]?.main}`};
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0px;
  left: 30px;

  border: 1px solid #ffffff;
  border-radius: 15px;
  animation: ${({ theme }) => pulseAlert(theme.palette['primary']?.main, theme.palette['secondary']?.main)} 1s;
  animation-iteration-count: infinite;
`

IconComponent.defaultProps = {
  color: 'primary',
  borderRadius: 15,
  minwidth: 40,
  minheight: 40
}

IconComponent.propTypes = {
  disabled: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default IconComponent
