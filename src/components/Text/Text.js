import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout, typography, color, variant, position, flexbox } from 'styled-system'
import propTypes from '@styled-system/prop-types'

const BIG = 'big'
const MEDIUM = 'medium'
const REGULAR = 'regular'
const SMALL = 'small'
const TINY = 'tiny'

export const TextComponent = styled.p(
  variant({
    variants: {
      [BIG]: {
        fontSize: 24,
        lineHeight: '29px'
      },
      [MEDIUM]: {
        fontSize: 20,
        lineHeight: '24px'
      },
      [REGULAR]: {
        fontSize: 16,
        lineHeight: '25px'
      },
      [SMALL]: {
        fontSize: 14,
        lineHeight: '17px'
      },
      [TINY]: {
        fontSize: 12,
        lineHeight: '17px'
      }
    }
  }),
  space,
  layout,
  typography,
  color,
  position,
  flexbox
)

TextComponent.propTypes = {
  variant: PropTypes.oneOf([BIG, MEDIUM, REGULAR, SMALL, TINY]),
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.position
}

export default TextComponent
