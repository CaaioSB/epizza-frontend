import * as React from 'react'
import PropTypes from 'prop-types'

function SvgAwards(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      class='feather feather-award'
    >
      <circle cx='12' cy='8' r='7'></circle>
      <polyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88'></polyline>
    </svg>
  )
}

SvgAwards.defaultProps = {
  width: 24,
  height: 24,
  strokeWidth: 2
}

SvgAwards.propTypes = {
  strokeWidth: PropTypes.number
}

export default SvgAwards
