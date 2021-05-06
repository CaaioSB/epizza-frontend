import React, { useEffect, useState } from 'react'
import { Location } from 'history'
import { Prompt } from 'react-router-dom'

import Modal from 'components/Modal'
import Text from 'components/Text'
import Row from 'components/Row'
import Column, { ColumnResponsive } from 'components/Column'
import Button from 'components/Button'

const RouteLeavingGuard = ({ when, navigate, shouldBlockNavigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [lastLocation, setLastLocation] = useState(null)
  const [confirmedNavigation, setConfirmedNavigation] = useState(false)

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleBlockedNavigation = nextLocation => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      setModalVisible(true)
      setLastLocation(nextLocation)
      return false
    }
    return true
  }

  const handleConfirmNavigationClick = () => {
    setModalVisible(false)
    setConfirmedNavigation(true)
  }

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location with your navigate function
      navigate(lastLocation.pathname)
    }
  }, [confirmedNavigation, lastLocation])

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />

      <Modal open={modalVisible}>
        <Column>
          <Row mb={18}>
            <Column>
              <Text variant='big' fontWeight={600} textAlign='center'>
                Você realmente deseja cancelar este pedido?
              </Text>
              <Text variant='small' fontWeight={600} textAlign='center'>
                Se cancelar você será redirecionado ao último módulo em que você esteve.
              </Text>
            </Column>
          </Row>
          <ColumnResponsive>
            <Row width='100%'>
              <Button width='90%' color='secondary' onClick={() => handleConfirmNavigationClick()}>
                SIM
              </Button>
            </Row>
            <Row width='100%' justifyContent='flex-end'>
              <Button width='90%' onClick={() => closeModal()}>
                NÃO
              </Button>
            </Row>
          </ColumnResponsive>
        </Column>
      </Modal>
    </>
  )
}
export default RouteLeavingGuard
