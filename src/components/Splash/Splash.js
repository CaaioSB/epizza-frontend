import React from 'react'
import styled, { keyframes } from 'styled-components'

export const SplashComponent = ({ isLoading }) => {
  return (
    <Splash isLoading={isLoading}>
      <Logo src='https://res.cloudinary.com/epizza/image/upload/v1611869212/whitelabel/epizzaLogo_swiqeu.svg' />
    </Splash>
  )
}

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-15px);
	}
	100% {
		transform: translatey(0px);
	}
`

const Splash = styled.div(
  ({ isLoading }) => `
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${isLoading ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: #fff;
`
)

const Logo = styled.img`
  width: 5%;
  animation: ${float} 1.5s;
  animation-iteration-count: infinite;
`

export default SplashComponent
