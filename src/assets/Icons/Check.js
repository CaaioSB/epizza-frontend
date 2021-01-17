import * as React from 'react'
import PropTypes from 'prop-types'

function SvgCheck(props) {
  return (
    <svg {...props} width='23' height='24' viewBox='0 0 23 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M19.1666 6L8.62492 17L3.83325 12'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

SvgCheck.defaultProps = {
  width: 24,
  height: 24,
  strokeWidth: 2
}

SvgCheck.propTypes = {
  strokeWidth: PropTypes.number
}

export default SvgCheck
