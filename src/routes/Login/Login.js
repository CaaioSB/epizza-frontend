import React from 'react'
import { useForm } from 'react-hook-form'

import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'
import Row from 'components/Row'
import Card from 'components/Card'
import Text from 'components/Text'
import { Pizza } from 'components/Emoji'
import { useAuth } from 'context/auth-context'
import { loginSchema } from 'helpers/yup-schemas'

const Login = () => {
  const { login } = useAuth()

  const { register, handleSubmit, errors, formState } = useForm({ validationSchema: loginSchema })

  const onSubmit = async values => {
    try {
      await login(values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Column
      height='100%'
      as='form'
      autocomplete='off'
      onSubmit={handleSubmit(onSubmit)}
      alignItems='center'
      justifyContent='center'
    >
      <Card text='Login' emoji={Pizza} textMargin={100}>
        <Input name='email' register={register} placeholder='E-mail ou CPF' error={errors.email?.message} />
        <Input
          name='password'
          register={register}
          placeholder='Senha'
          error={errors.password?.message}
          type='password'
        />
        <Row mt={70}>
          <Button type='button' color='secondary' width='large'>
            Esqueci minha senha
          </Button>
          <Button type='submit' color='primary' width='xlarge' isLoading={formState.isSubmitting}>
            Login
          </Button>
        </Row>
        <Row mt={25} justifyContent='center'>
          <Text variant='tiny'>E-Pizza versão 1.0</Text>
        </Row>
      </Card>
    </Column>
  )
}

export default Login
