import * as React from 'react'
import PropTypes from 'prop-types'

function SvgShoppingCart(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-shopping-cart'
    >
      <circle cx='9' cy='21' r='1'></circle>
      <circle cx='20' cy='21' r='1'></circle>
      <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
    </svg>
  )
}

SvgShoppingCart.defaultProps = {
  width: 24,
  height: 24,
  strokeWidth: 2
}

SvgShoppingCart.propTypes = {
  strokeWidth: PropTypes.number
}

export default SvgShoppingCart
