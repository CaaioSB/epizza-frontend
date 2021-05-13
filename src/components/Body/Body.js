import React from 'react'
import styled from 'styled-components'
import { layout } from 'styled-system'
import { useHistory } from 'react-router-dom'

import Row from 'components/Row'
import Icon from 'components/Icon'
import Text from 'components/Text'
import Link from 'components/Link'
import EmojiComponent from 'components/Emoji'

export const BodyComponent = ({ textMargin, text, emoji, children, ...props }) => {
  const history = useHistory()

  return (
    <StyledBody {...props}>
      <Row alignItems='center' mb={50}>
        {
          <Link style={{ color: 'black' }} onClick={() => history.goBack()}>
            <Icon icon='arrowLeft' />
          </Link>
        }
        <Text mb={textMargin} ml={5} variant='big' fontWeight={600}>
          {text}
        </Text>
        {emoji && <EmojiComponent emoji={emoji} />}
      </Row>
      {children}
    </StyledBody>
  )
}

const StyledBody = styled.div`
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  ${layout}
`

export default BodyComponent
