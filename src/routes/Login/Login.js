import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'
import Row from 'components/Row'
import Card from 'components/Card'
import Text from 'components/Text'
import { useAuth } from 'context/auth-context'
import { useYupValidationResolver, loginSchema } from 'helpers/yup-schemas'
import { ColumnResponsive } from 'components/Column'
import { version } from '../../../package.json'

const Login = () => {
  const { login } = useAuth()

  const resolver = useYupValidationResolver(loginSchema)
  const {
    register,
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting }
  } = useForm({ resolver })

  const onSubmit = async values => {
    try {
      await login(values)
    } catch ({ request, ...rest }) {
      toast.error(rest?.response?.data?.message || 'Não foi possível autenticar, tente novamente mais tarde.')
    }
  }

  return (
    <Column
      height='100%'
      p={20}
      as='form'
      autocomplete='off'
      onSubmit={handleSubmit(onSubmit)}
      alignItems='center'
      justifyContent='center'
    >
      <Card text='Login' emoji='pizza' textMargin={100}>
        <Input
          error={errors.email?.message}
          name='email'
          register={register}
          control={control}
          placeholder='E-mail ou CPF'
        />

        <Input
          error={errors.password?.message}
          name='password'
          register={register}
          control={control}
          placeholder='Senha'
          type='password'
        />
        <ColumnResponsive mt={70}>
          <Button type='button' color='secondary' width='200px' mr={20}>
            Esqueci minha senha
          </Button>
          <Button type='submit' color='primary' width='xlarge' isLoading={isSubmitting}>
            Login
          </Button>
        </ColumnResponsive>
        <Row mt={25} justifyContent='center'>
          <Text variant='tiny'>E-Pizza versão {version}</Text>
        </Row>
      </Card>
    </Column>
  )
}

export default Login
