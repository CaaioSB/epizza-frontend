import styled from 'styled-components'
import { space, layout, typography, border, position } from 'styled-system'

import HandsUp from './png/hands-up.png'
import Pizza from './png/pizza.png'
import Eye from './png/eye.png'

const EmojiComponent = styled.img`
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
  ${typography};
  ${border};
  ${position}
`

export default EmojiComponent
export { HandsUp, Pizza, Eye }
