import React from 'react'
import styled from 'styled-components'
import { position, space, layout } from 'styled-system'
import PropTypes from 'prop-types'

import STRING_TO_EMOJIS from 'assets/Emojis'

const EmojiComponent = ({ emoji, ...props }) => {
  return <Emoji src={STRING_TO_EMOJIS[emoji]} {...props} />
}

const Emoji = styled.img`
  width: 26px;
  max-height: 26px;
  margin-left: 10px;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  ${space};
  ${layout};
  ${position}
`
Emoji.defaultProps = {
  icon: 'settings',
  width: 24,
  height: 24
}

Emoji.propTypes = {
  icon: PropTypes.string
}

export default EmojiComponent
