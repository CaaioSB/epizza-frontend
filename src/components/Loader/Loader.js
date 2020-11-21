import React from 'react'
import PropTypes from 'prop-types'
import { PulseLoader } from 'react-spinners'

const Loader = () => <PulseLoader size={5} color='#FFFFFF'></PulseLoader>

Loader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default Loader
