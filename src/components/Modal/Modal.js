import React from 'react'
import styled from 'styled-components'

const Modal = ({ open, children }) => {
  return <Background open={open}>{children}</Background>
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  backdrop-filter: blur(2px);
  padding: 18px;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  position: fixed;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  transition: visibility 0.2s, opacity 0.2s linear;
  justify-content: center;
  align-items: center;
`

export default Modal
