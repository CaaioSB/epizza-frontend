import React from 'react'
import styled from 'styled-components'
import { layout } from 'styled-system'
import { Controller } from 'react-hook-form'

import Row from 'components/Row'

const SelectComponent = ({ error, children, width, control, ref, ...props }) => {
  return (
    <Row width={width || '100%'} mb={30}>
      {control ? (
        <Controller as={<Select>{children}</Select>} {...props} control={control} ref={ref} />
      ) : (
        <Select {...props}>{children}</Select>
      )}

      {error && (
        <StyledText error={error} color='red' ml={10} variant='tiny'>
          {error || `${placeholder} incorreto`}
        </StyledText>
      )}
    </Row>
  )
}

export const Option = ({ value, children }) => <option value={value}>{children}</option>

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
  background-image: linear-gradient(#503e9d, #503e9d), linear-gradient(-135deg, transparent 50%, #503e9d 50%),
    linear-gradient(-225deg, transparent 50%, #503e9d 50%), linear-gradient(#503e9d 42%, #fff 42%);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: 0px 100%, 50px 40px, 40px 55px, 50px 100%;
  background-position: right 20px center, right bottom, right bottom, right bottom;

  ${layout}
`

export default SelectComponent
