import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import Column from 'components/Column'
import Row from 'components/Row'
import Text from 'components/Text'
import EmojiComponent, { Eye } from 'components/Emoji'

const InputComponent = ({ label, name, register, placeholder, error, disabled, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState(type)

  const handlePasswordVisible = () => {
    setShowPassword(!showPassword)

    !showPassword ? setInputType('text') : setInputType(type)
  }

  return (
    <Column {...props}>
      <Row position='relative'>
        <Input name={name} ref={register} placeholder={placeholder} error={error} type={inputType} />
        {type === 'password' && (
          <EmojiComponent
            top={10}
            right={15}
            position='absolute'
            src={Eye}
            onMouseOver={() => handlePasswordVisible()}
            onMouseOut={() => handlePasswordVisible()}
          />
        )}
      </Row>
      <StyledText error={error} color='red' ml={10} variant='tiny'>
        {error || `${placeholder} incorreto`}
      </StyledText>
    </Column>
  )
}

const pulseError = keyframes`
  0% { border: 1px solid #cc0000; }
  50% { border: 1px solid #ff8282; }
  100% { border: 1px solid #cc0000; }
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  background-color: #f8f8f7;
  border-radius: 18px;
  animation: ${pulseError} 1s;
  animation-iteration-count: ${({ error }) => (error ? 'infinite' : '0')};
  padding: ${({ type }) => (type === 'password' ? '4px 50px 4px 20px' : '4px 20px 4px 20px')};
`

const StyledText = styled(Text)`
  visibility: ${({ error }) => (error ? 'visible' : 'hidden')};
`

InputComponent.defaultProps = {
  width: 'fit',
  mb: 30
}

InputComponent.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool
}

export default InputComponent
