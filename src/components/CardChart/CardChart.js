import React from 'react'
import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'
import { space, layout, typography, shadow, border } from 'styled-system'

import Icon from 'components/Icon'
import Text from 'components/Text'
import Column from 'components/Column'
import Row from 'components/Row'

export const CardChartComponent = ({ color, icon, value, text, porcentage = 0, ...props }) => {
  return (
    <CardChart {...props}>
      <Row>
        <IconCircle>
          <Icon icon={icon} />
        </IconCircle>
        <Column width='100%' alignItems='flex-end'>
          <Row>
            <Text fontWeight='800'>{value}</Text>
          </Row>
          <Row>
            <Text>{text}</Text>
          </Row>
        </Column>
      </Row>
      <Row>
        <ProgressBar>
          <Bar porcentage={porcentage} color={color}>
            <Text position='absolute' fontSize={1}>
              {`${porcentage}%`}
            </Text>
          </Bar>
        </ProgressBar>
      </Row>
    </CardChart>
  )
}

const CardChart = styled.div`
  display: flex;
  flex-direction: column;
  ${space};
  ${layout};
  ${typography};
  ${border};
  ${shadow};
`

const IconCircle = styled.div`
  width: 60px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #cbcbcb;
  border-radius: 50%;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  margin-top: 15px;
  background-color: #cbcbcb;
  border-radius: 15px;
`

const Bar = styled.div(
  ({ porcentage, color, theme }) => `
  width: ${`${porcentage}%`};
  height: 20px;
  background-color: ${theme.palette[color].main};
  color: ${theme.palette[color].typography};
  border-radius: 15px;
  display: flex;
  justify-content: center;
`
)

CardChartComponent.defaultProps = {
  height: 120,
  color: 'secondary',
  borderRadius: 15,
  padding: 20,
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
}

CardChartComponent.propTypes = {
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default CardChartComponent
