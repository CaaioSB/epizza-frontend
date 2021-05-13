import React from 'react'
import styled, { keyframes } from 'styled-components'
import { layout } from 'styled-system'
import { Controller } from 'react-hook-form'

import Row from 'components/Row'
import Text from 'components/Text'
import Column from 'components/Column'

export const SelectComponent = ({ error, children, width, control, ref, ...props }) => {
  return (
    <Column width={width || '100%'} mb={30}>
      <Row width={width || '100%'}>
        {control ? (
          <Controller as={<Select error={error}>{children}</Select>} {...props} control={control} ref={ref} />
        ) : (
          <Select error={error} {...props}>
            {children}
          </Select>
        )}
      </Row>
      {error && (
        <StyledText error={error} color='red' ml={10} variant='tiny'>
          {error || `${placeholder} incorreto`}
        </StyledText>
      )}
    </Column>
  )
}

export const Option = ({ value, children, disabled }) => (
  <option disabled={disabled} value={value}>
    {children}
  </option>
)

const pulseError = keyframes`
  0% { border: 1px solid #cc0000; }
  50% { border: 1px solid #ff8282; }
  100% { border: 1px solid #cc0000; }
`

const Select = styled.select`
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  line-height: 1;
  outline: 0;
  padding: 4px 20px;
  height: 50px;
  border-radius: 18px;
  background-color: #f8f8f7;
  color: #797979;
  animation: ${pulseError} 1s;
  animation-iteration-count: ${({ error }) => (error ? 'infinite' : '0')};
  background-image: linear-gradient(#503e9d, #503e9d), linear-gradient(-135deg, transparent 50%, #503e9d 50%),
    linear-gradient(-225deg, transparent 50%, #503e9d 50%), linear-gradient(#503e9d 42%, #fff 42%);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: 0px 100%, 50px 40px, 40px 55px, 50px 100%;
  background-position: right 20px center, right bottom, right bottom, right bottom;

  ${layout}
`

const StyledText = styled(Text)`
  visibility: ${({ error }) => (error ? 'visible' : 'hidden')};
`

export default SelectComponent
