import React from 'react'
import styled from 'styled-components'

import Row from 'components/Row'
import Text from 'components/Text'
import EmojiComponent from 'components/Emoji'
import { MEDIATABLET } from 'helpers'

const BodyComponent = ({ textMargin, text, emoji, children }) => (
  <Body>
    <Row mb={50}>
      <Text mb={textMargin} variant='big' fontWeight={600}>
        {text}
      </Text>
      <EmojiComponent emoji={emoji} />
    </Row>
    {children}
  </Body>
)

const Body = styled.div``

export default BodyComponent
