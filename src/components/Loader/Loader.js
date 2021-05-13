import React from 'react'
import PropTypes from 'prop-types'
import { PulseLoader } from 'react-spinners'

export const LoaderComponent = () => <PulseLoader size={5} color='#FFFFFF'></PulseLoader>

LoaderComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default LoaderComponent
