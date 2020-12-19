import * as React from 'react'
import PropTypes from 'prop-types'

function SvgWaze(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={props.color}
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      class='feather feather-map'
    >
      <polygon points='1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6'></polygon>
      <line x1='8' y1='2' x2='8' y2='18'></line>
      <line x1='16' y1='6' x2='16' y2='22'></line>
    </svg>
  )
}

SvgWaze.defaultProps = {
  width: 24,
  height: 24,
  strokeWidth: 2,
  color: 'white'
}

SvgWaze.propTypes = {
  strokeWidth: PropTypes.number
}

export default SvgWaze
