import * as React from 'react'
import PropTypes from 'prop-types'

function SvgMapPin(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={props.color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-map-pin'
    >
      <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
      <circle cx='12' cy='10' r='3'></circle>
    </svg>
  )
}

SvgMapPin.defaultProps = {
  width: 24,
  height: 24,
  strokeWidth: 2,
  color: 'white'
}

SvgMapPin.propTypes = {
  strokeWidth: PropTypes.number
}

export default SvgMapPin
