import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'
import { Controller } from 'react-hook-form'

const CheckBoxComponent = ({ color, name, register, control, setValue, value, placeholder, ...props }) => {
  return (
    <CheckBoxWrapper {...props}>
      <label>
        <CheckBox ref={register} name={name} color={color} type='checkbox' />
        {placeholder}
      </label>
    </CheckBoxWrapper>
  )
}

const CheckBoxWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  background-color: #f8f8f7;
  border: 1px solid #ddd;
  border-radius: 2px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 17px;
  height: 17px;
  cursor: pointer;
  position: relative;
  top: 5px;
  margin-right: 10px;

  &:checked {
    background-color: ${({ color, theme }) => `${theme.palette[color].main}`};
    background: ${({ color, theme }) => `${theme.palette[color].main}`}
      url('data:image/gif;base64,R0lGODlhCwAKAIABAP////3cnSH5BAEKAAEALAAAAAALAAoAAAIUjH+AC73WHIsw0UCjglraO20PNhYAOw==')
      3px 3px no-repeat;
  }
`

CheckBoxComponent.defaultProps = {
  color: 'primary'
}

CheckBoxComponent.propTypes = {
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default CheckBoxComponent
