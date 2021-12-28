import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'
import { Controller } from 'react-hook-form'

import Column from 'components/Column'
import Row from 'components/Row'
import Text from 'components/Text'
import EmojiComponent from 'components/Emoji'
import { MEDIADESKTOP } from 'helpers/constants'

import { FormatMoney } from 'helpers'

export const InputComponent = ({
  label,
  name,
  register,
  control,
  readonly,
  placeholder,
  error,
  disabled,
  type,
  ref,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState(type)

  const handlePasswordVisible = () => {
    setShowPassword(!showPassword)

    !showPassword ? setInputType('text') : setInputType(type)
  }

  return (
    <ResponsiveInput {...props}>
      <Row position='relative'>
        {control ? (
          <Controller
            as={Input}
            name={name}
            forwardRef={register}
            control={control}
            placeholder={placeholder}
            error={error}
            type={inputType}
            disabled={disabled}
            ref={ref}
            {...props}
          />
        ) : (
          <Input
            name={name}
            placeholder={placeholder}
            error={error}
            type={inputType}
            disabled={disabled}
            ref={register}
            readonly={readonly}
            {...props}
          />
        )}
        {type === 'password' && (
          <EmojiComponent
            top={10}
            right={15}
            position='absolute'
            emoji='eye'
            onMouseOver={() => handlePasswordVisible()}
            onMouseOut={() => handlePasswordVisible()}
          />
        )}
      </Row>
      {error && (
        <StyledText error={error} color='red' ml={10} variant='tiny'>
          {error || `${placeholder} incorreto`}
        </StyledText>
      )}
    </ResponsiveInput>
  )
}

export const InputCurrencyComponent = ({
  label,
  name,
  register,
  control,
  readOnly,
  placeholder,
  error,
  disabled,
  prefix,
  ...props
}) => {
  const moneyInput = useRef(null)

  return (
    <ResponsiveInput {...props}>
      <Row>
        <Column
          minWidth='fit-content'
          px={10}
          height='50px'
          backgroundColor='primary'
          color='white'
          display='flex'
          justifyContent='center'
          alignItems='center'
          borderRadius='18px 0 0 18px'
        >
          {prefix ? prefix : 'R$'}
        </Column>

        <InputCurrency
          ref={ref => {
            moneyInput.current = ref
            register(ref)
          }}
          name={name}
          placeholder={placeholder}
          label={label}
          readOnly={readOnly}
          error={error}
          disabled={disabled}
          onKeyDown={e => FormatMoney(moneyInput.current, 20, e)}
          {...props}
        />
      </Row>
    </ResponsiveInput>
  )
}

const pulseError = keyframes`
  0% { border: 1px solid #cc0000; }
  50% { border: 1px solid #ff8282; }
  100% { border: 1px solid #cc0000; }
`

const ResponsiveInput = styled(Column)`
  @media (max-width: ${MEDIADESKTOP}px) {
    width: 100%;
  }
`
const StyledInput = css`
  width: 100%;
  height: 50px;
  background-color: #f8f8f7;
  border-radius: 18px;
  animation: ${pulseError} 1s;
  animation-iteration-count: ${({ error }) => (error ? 'infinite' : '0')};
  padding: ${({ type }) => (type === 'password' ? '4px 50px 4px 20px' : '4px 20px 4px 20px')};

  @media (min-width: ${MEDIADESKTOP}px) {
    width: 100%;
  }
`

const Input = styled.input`
  ${StyledInput}
`

const InputCurrency = styled.input`
  ${StyledInput}

  border-radius: 0 18px 18px 0;
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
