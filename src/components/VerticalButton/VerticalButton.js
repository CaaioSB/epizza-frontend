import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import Text from 'components/Text'

const VerticalButtonComponent = ({ text, icon, actived, ...props }) => (
  <VerticalButton {...props} actived={actived}>
    <IconCircle actived={actived}>
      <Icon icon={icon} />
    </IconCircle>
    <StyledText>{text}</StyledText>
  </VerticalButton>
)

const VerticalButton = styled.button`
  width: 70px;
  height: 130px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: ${({ theme, color, actived }) => (actived && theme.palette[color].main) || '#ffffff'};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.12);
`

const IconCircle = styled.div`
  width: 54px;
  height: 54px;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: ${({ actived }) => !actived && '2px solid #EAE8E4'};
  background-color: white;
`

const StyledText = styled(Text)`
  position: absolute;
  top: 70px;
  font-weight: 500;
  font-size: 9pt;
`

VerticalButtonComponent.defaultProps = {
  color: 'secondary',
  backgroundColor: 'white'
}

VerticalButtonComponent.propTypes = {
  color: PropTypes.string
}

export default VerticalButtonComponent
