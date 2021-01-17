import * as React from 'react'
import PropTypes from 'prop-types'

function SvgUser(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-user'
    >
      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
      <circle cx='12' cy='7' r='4'></circle>
    </svg>
  )
}

SvgUser.defaultProps = {
  width: 24,
  height: 24,
  strokeWidth: 2
}

SvgUser.propTypes = {
  strokeWidth: PropTypes.number
}

export default SvgUser
