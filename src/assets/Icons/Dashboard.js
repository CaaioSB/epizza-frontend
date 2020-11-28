import * as React from 'react'

function SvgDashboard(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      class='feather feather-grid'
    >
      <rect x='3' y='3' width='7' height='7'></rect>
      <rect x='14' y='3' width='7' height='7'></rect>
      <rect x='14' y='14' width='7' height='7'></rect>
      <rect x='3' y='14' width='7' height='7'></rect>
    </svg>
  )
}

export default SvgDashboard