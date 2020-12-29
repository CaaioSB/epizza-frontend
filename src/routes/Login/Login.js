import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'
import Row from 'components/Row'
import Card from 'components/Card'
import Text from 'components/Text'
import { useAuth } from 'context/auth-context'
import { loginSchema } from 'helpers/yup-schemas'
import { ColumnResponsive } from 'components/Column'
import { version } from '../../../package.json'

const Login = () => {
  const { login } = useAuth()

  const { register, handleSubmit, errors, formState } = useForm({ validationSchema: loginSchema })

  const onSubmit = async values => {
    try {
      await login(values)
    } catch ({ request, ...rest }) {
      console.log(rest.response.data)
      toast.error(rest.response.data.message)
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
        <Input name='email' register={register} placeholder='E-mail ou CPF' error={errors.email?.message} />
        <Input
          name='password'
          register={register}
          placeholder='Senha'
          error={errors.password?.message}
          type='password'
        />
        <ColumnResponsive mt={70}>
          <Button type='button' color='secondary' width='200px' mr={20}>
            Esqueci minha senha
          </Button>
          <Button type='submit' color='primary' width='xlarge' isLoading={formState.isSubmitting}>
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
