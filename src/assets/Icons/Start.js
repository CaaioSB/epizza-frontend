import * as React from 'react'
import PropTypes from 'prop-types'

function SvgStart(props) {
  return (
    <svg {...props} width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 1L15 10L1 19V1Z' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

SvgStart.defaultProps = {
  width: 24,
  height: 24,
  strokeWidth: 2
}

SvgStart.propTypes = {
  strokeWidth: PropTypes.number
}

export default SvgStart
