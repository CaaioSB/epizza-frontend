import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, typography, color, border } from 'styled-system'
import propTypes from '@styled-system/prop-types'

import Theme from 'theme'
import Text from 'components/Text'
import Row from 'components/Row'
import EmojiComponent from 'components/Emoji'

const CardComponent = ({ text, emoji, textMargin, children, ...props }) => {
  return (
    <Card {...props}>
      <Row>
        <Text mb={textMargin} variant='big' fontWeight={600}>
          {text}
        </Text>
        <EmojiComponent emoji={emoji} />
      </Row>
      {children}
    </Card>
  )
}

const Card = styled.div`
  padding: 40px;
  background: #ffffff;
  box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.1);
  ${space};
  ${layout};
  ${typography};
  ${border}
`

CardComponent.defaultProps = {
  color: 'white',
  borderRadius: 15
}

CardComponent.propTypes = {
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default CardComponent
