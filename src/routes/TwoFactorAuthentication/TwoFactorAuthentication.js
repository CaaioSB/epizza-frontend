import React, { useState, Fragment, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useHistory } from 'react-router-dom'

import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'
import Row from 'components/Row'
import Card from 'components/Card'
import Text from 'components/Text'
import Splash from 'components/Splash'
import { useAuth } from 'context/auth-context'
import { useYupValidationResolver, loginSchema } from 'helpers/yup-schemas'
import { ColumnResponsive } from 'components/Column'

const TwoFactorAuthentication = ({ location: { state } }) => {
  const [reCaptchaToken, setReCaptchaToken] = useState()
  const [twoFactorAuthenticationCode, setTwoFactorAuthenticationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { login } = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (!state) {
      history.push('/')
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    const authenticate = async () => {
      if (twoFactorAuthenticationCode.length === 6) {
        setIsLoading(true)

        try {
          const token = await executeRecaptcha('twoFactorAuthentication_page')

          await login({ ...state, twoFactorAuthenticationCode, token })
        } catch ({ request, ...rest }) {
          toast.error(rest.response.data.message)
          setIsLoading(false)
        }
      }
    }

    authenticate()
  }, [twoFactorAuthenticationCode])

  const firstInput = useRef(null)
  const secondInput = useRef(null)
  const thirdInput = useRef(null)
  const fourthInput = useRef(null)
  const fifthInput = useRef(null)
  const sixthInput = useRef(null)

  const getRef = index => {
    switch (index) {
      case 0:
        return firstInput
      case 1:
        return secondInput
      case 2:
        return thirdInput
      case 3:
        return fourthInput
      case 4:
        return fifthInput
      case 5:
        return sixthInput
    }
  }

  const storeCode = () => {
    for (let i = 0; i < 6; i++) {
      if (i === 0) setTwoFactorAuthenticationCode('')

      const currentInput = getRef(i)
      setTwoFactorAuthenticationCode(current => `${current}${currentInput.current.value}`)
    }
  }

  const handleChange = (e, index) => {
    storeCode()

    if (e.target.value.length === 1 && index !== 5) {
      const nextInput = getRef(index + 1)
      if (nextInput) {
        return nextInput.current.focus()
      }
    }
  }

  const goToPreviusInput = (e, index) => {
    storeCode()

    if (e.keyCode === 8 && e.target.value === '') {
      const previusInput = getRef(index - 1)

      if (previusInput) {
        return previusInput.current.focus()
      }
    }
  }

  return (
    <Fragment>
      <Column height='100%' p={20} as='form' autocomplete='off' alignItems='center' justifyContent='center'>
        <Card text='Autenticação' emoji='pizza' textMargin={100}>
          <Row mx={5} mb={10}>
            <Text variant='REGULAR'>Olá {state?.name},</Text>
          </Row>
          <Row mx={5} mb={20}>
            <Text variant='small'>
              Enviamos um código de verificação para o seu e-mail!
              <br />
              Digite-o abaixo para ter acesso à plataforma.
            </Text>
          </Row>
          <Row justifyContent='center' alignItems='center'>
            {Array(6)
              .fill()
              .map((_, index) => (
                <Input
                  mx={5}
                  disabled={isLoading}
                  width={50}
                  name={`digit_${index}`}
                  register={getRef(index)}
                  onChange={e => handleChange(e, index)}
                  onKeyDown={e => goToPreviusInput(e, index)}
                  maxLength={1}
                />
              ))}
          </Row>
          <ColumnResponsive mt={70}>
            <Button isLoading={isLoading} type='button' color='secondary'>
              Não recebi o código
            </Button>
          </ColumnResponsive>
        </Card>
      </Column>
    </Fragment>
  )
}

export default TwoFactorAuthentication
