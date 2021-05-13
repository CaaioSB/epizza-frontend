import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { color } from 'styled-system'
import styled, { keyframes } from 'styled-components'
import { Controller } from 'react-hook-form'

import Column from 'components/Column'
import Row from 'components/Row'
import Text from 'components/Text'
import IconButton from 'components/IconButton'
import Icon from 'components/Icon'
import { MEDIADESKTOP } from 'helpers/constants'

export const InputFileComponent = ({
  label,
  name,
  register,
  control,
  placeholder,
  error,
  accept,
  disabled,
  type,
  ...props
}) => {
  const [fileName, setFileName] = useState()

  return (
    <ResponsiveInput {...props}>
      <Row position='relative'>
        <input
          id='file'
          accept={accept}
          style={{ display: 'none' }}
          type='file'
          onChange={e => setFileName(e.target.files[0].name || null)}
        />
        <UploadButton color='primary' htmlFor='file'>
          <span>
            <Icon icon='upload' color='white' />
          </span>
        </UploadButton>
        {control ? (
          <Controller
            as={Input}
            name={name}
            forwardRef={register}
            control={control}
            placeholder={fileName || placeholder}
            error={error}
            {...props}
          />
        ) : (
          <Input name={name} placeholder={placeholder} error={error} {...props} />
        )}
      </Row>
      <StyledText error={error} color='red' ml={10} variant='tiny'>
        {error || `${placeholder} incorreto`}
      </StyledText>
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

const Input = styled.input`
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

const UploadButton = styled.label`
  background-color: ${props => `${props.theme.palette[props.color].main}`};
  min-width: 50px;
  min-height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
`

const StyledText = styled(Text)`
  visibility: ${({ error }) => (error ? 'visible' : 'hidden')};
`

InputFileComponent.defaultProps = {
  width: 'fit',
  mb: 30
}

InputFileComponent.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool
}

export default InputFileComponent
