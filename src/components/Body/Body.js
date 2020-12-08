import React from 'react'
import styled from 'styled-components'
import { layout } from 'styled-system'

import Row from 'components/Row'
import Text from 'components/Text'
import EmojiComponent from 'components/Emoji'

const BodyComponent = ({ textMargin, text, emoji, children, ...props }) => (
  <Body {...props}>
    <Row alignItems='center' mb={50}>
      <Text mb={textMargin} variant='big' fontWeight={600}>
        {text}
      </Text>
      {emoji && <EmojiComponent emoji={emoji} />}
    </Row>
    {children}
  </Body>
)

const Body = styled.div`
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  ${layout}
`

export default BodyComponent
