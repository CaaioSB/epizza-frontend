import * as React from 'react'
import PropTypes from 'prop-types'

function SvgWarning(props) {
  return (
    <svg {...props} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.29 3.86002L1.82002 18C1.64539 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3438 1.64151 19.6872 1.81445 19.9905C1.98738 20.2939 2.23675 20.5468 2.53773 20.7239C2.83871 20.901 3.18082 20.9962 3.53002 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5468 22.0127 20.2939 22.1856 19.9905C22.3585 19.6872 22.449 19.3438 22.448 18.9945C22.4471 18.6453 22.3547 18.3024 22.18 18L13.71 3.86002C13.5318 3.56613 13.2807 3.32314 12.9812 3.15451C12.6817 2.98587 12.3438 2.89728 12 2.89728C11.6563 2.89728 11.3184 2.98587 11.0188 3.15451C10.7193 3.32314 10.4683 3.56613 10.29 3.86002V3.86002Z'
        stroke='white'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path d='M12 9V13' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
      <path d='M12 17H12.01' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
    </svg>
  )
}

SvgWarning.defaultProps = {
  width: 24,
  height: 24,
  strokeWidth: 2
}

SvgWarning.propTypes = {
  strokeWidth: PropTypes.number
}

export default SvgWarning
