import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Container from 'components/Container'
import Body from 'components/Body'
import Input from 'components/Input'
import Column, { ColumnResponsive } from 'components/Column'
import ButtonComponent from 'components/Button'
import { useYupValidationResolver, employeeSchema } from 'helpers/yup-schemas'

const NewEmployee = ({ location: { state } }) => {
  const resolver = useYupValidationResolver(employeeSchema)
  const { register, handleSubmit, control, errors } = useForm({ resolver, defaultValues: state?.employee })

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Column as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Body text={state?.employee ? 'Editar Funcionário' : 'Novo Funcionário'}>
          <Column width='100%'>
            <Input
              register={register}
              control={control}
              error={errors?.name && errors?.name?.message}
              name='name'
              placeholder='Nome Completo'
            />
            <ColumnResponsive>
              <Input
                register={register}
                control={control}
                error={errors?.cpf && errors?.cpf?.message}
                name='cpf'
                placeholder='CPF'
              />
              <Input
                register={register}
                control={control}
                error={errors?.rg && errors?.rg?.message}
                name='rg'
                placeholder='RG'
              />
              <Input
                register={register}
                control={control}
                error={errors?.telcel && errors?.telcel?.message}
                name='telcel'
                placeholder='Telefone Celular'
              />
            </ColumnResponsive>
            <ColumnResponsive>
              <Input
                register={register}
                control={control}
                error={errors?.cep && errors?.cep?.message}
                name='cep'
                width='40%'
                placeholder='CEP'
              />
              <Input
                register={register}
                control={control}
                error={errors?.street && errors?.street?.message}
                name='street'
                placeholder='Rua'
              />
              <Input
                register={register}
                control={control}
                error={errors?.number && errors?.number?.message}
                name='number'
                width='40%'
                placeholder='Nº'
              />
            </ColumnResponsive>
            <ColumnResponsive>
              <Input
                register={register}
                control={control}
                error={errors?.neightboor && errors?.neightboor?.message}
                name='neightboor'
                placeholder='Bairro'
              />
              <Input
                register={register}
                control={control}
                error={errors?.city && errors?.city?.message}
                name='city'
                placeholder='Cidade'
              />
              <Input
                register={register}
                control={control}
                error={errors?.state && errors?.state?.message}
                name='state'
                placeholder='Estado'
              />
            </ColumnResponsive>
          </Column>
          <ButtonComponent width={100} alignSelf='flex-end'>
            Salvar
          </ButtonComponent>
        </Body>
      </Container>
    </Column>
  )
}

export default NewEmployee
