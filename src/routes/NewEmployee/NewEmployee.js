import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import Container from 'components/Container'
import Body from 'components/Body'
import Input from 'components/Input'
import Select, { Option } from 'components/Select'
import Column, { ColumnResponsive } from 'components/Column'
import ButtonComponent from 'components/Button'
import IconButton from 'components/IconButton'
import Checkbox from 'components/Checkbox'
import HorizontalCard from 'components/HorizontalCard'
import { useYupValidationResolver, employeeSchema } from 'helpers/yup-schemas'
import { postEmployee, putEmployee } from 'services/employee'
import { toast } from 'react-toastify'
import { getRoles } from 'services/role'

const NewEmployee = ({ location: { state } }) => {
  const [isEdit] = useState(state?.employee !== undefined)
  const [roles, setRoles] = useState([])

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data: roles } = await getRoles()

        setRoles(roles)
      } catch (err) {
        console.log(errr)
      }
    }

    fetchRoles()
  }, [])

  const history = useHistory()
  const resolver = useYupValidationResolver(employeeSchema)
  const {
    register,
    handleSubmit,
    control,
    errors,
    getValues,
    setValue,
    formState: { isSubmitting }
  } = useForm({ resolver, defaultValues: state?.employee })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = async data => {
    // Novo Funcionário
    if (!isEdit) {
      try {
        const response = await postEmployee(data)
        toast.success(response?.data?.message)
      } catch (err) {
        toast.error('Ocorreu um erro desconhecido. Tente novamente mais tarde.')
        throw err
      } finally {
        return history.goBack()
      }
    }

    // Modo de edição
    try {
      const response = await putEmployee({ id: state?.employee['_id'], ...data })
      toast.success(response?.data?.message)
    } catch (err) {
      toast.error('Ocorreu um erro desconhecido. Tente novamente mais tarde.')
      throw err
    } finally {
      return history.goBack()
    }
  }

  return (
    <Column as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Body text={state?.employee ? 'Editar Funcionário' : 'Novo Funcionário'}>
          <Column width='100%'>
            <ColumnResponsive>
              <Input
                register={register}
                control={control}
                error={errors?.name && errors?.name?.message}
                name='name'
                placeholder='Nome Completo'
              />
              <Select
                register={register}
                control={control}
                error={errors?.genre && errors?.genre?.message}
                name='genre'
              >
                <Option value={-1}>Genêro</Option>
                <Option value={1}>Masculino</Option>
                <Option value={0}>Feminino</Option>
              </Select>
              <Input
                register={register}
                control={control}
                error={errors?.email && errors?.email?.message}
                name='email'
                placeholder='Email'
              />
            </ColumnResponsive>
            <ColumnResponsive>
              <Input
                disabled={isEdit}
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
                error={errors?.mobileNumber && errors?.mobileNumber?.message}
                name='mobileNumber'
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
                error={errors?.neighborhood && errors?.neighborhood?.message}
                name='neighborhood'
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
              <Input
                style={{ display: 'none' }}
                register={register}
                control={control}
                onChange={e => {
                  const currentValue = e.target.value

                  // Se houver "roles" definidas como string, converta para array.
                  if (typeof currentValue === 'string') {
                    setValue('role', [...currentValue.split(',')])
                  }
                }}
                name='role'
                placeholder='Regras'
              />
            </ColumnResponsive>
            <ColumnResponsive>
              <Select
                error={errors?.role && errors?.role?.message}
                onChange={e => {
                  const currentValue = getValues('role')
                  setRoles(roles.map(role => role))

                  // Se não haver "roles" adicionadas, adiciona a primeira.
                  if (currentValue === undefined) {
                    return setValue('role', [e.target.value])
                  }

                  // Se já houver "roles", incremente a selecionada.
                  if (Array.isArray(currentValue)) {
                    return setValue('role', [...currentValue, e.target.value])
                  }

                  // Se houver "roles" definidas como string, converta para array e adicione a nova.
                  if (typeof currentValue === 'string') {
                    return setValue('role', [...currentValue.split(','), e.target.value])
                  }
                }}
              >
                <Option>Permissões (listadas abaixo)</Option>
                {roles?.map(role => {
                  if (!getValues('role')?.includes(role['_id'])) {
                    return (
                      <Option key={role['_id']} value={role['_id']}>
                        {role.name}
                      </Option>
                    )
                  }
                })}
              </Select>
            </ColumnResponsive>
            <ColumnResponsive>
              {Array.isArray(getValues('role')) || !isEdit ? (
                getValues('role')?.map(role => {
                  const { 0: roleData } = roles.filter(currentRole => currentRole['_id'] === role)

                  return (
                    <Column key={role} width='100%' mx={2}>
                      <HorizontalCard
                        name={roleData.name}
                        action={
                          <IconButton
                            type='button'
                            m={0}
                            icon='X'
                            color='secondary'
                            onClick={() => {
                              const currentRoles = getValues('role')

                              setValue(
                                'role',
                                currentRoles.filter(appendedRole => appendedRole !== roleData['_id'])
                              )

                              return setRoles(roles.map(role => role))
                            }}
                          />
                        }
                      />
                    </Column>
                  )
                })
              ) : (
                <HorizontalCard isLoading />
              )}
            </ColumnResponsive>
            <Checkbox placeholder='Funcionário ativo?' name='active' register={register} />
          </Column>
          <ButtonComponent width={100} alignSelf='flex-end' isLoading={isSubmitting}>
            Salvar
          </ButtonComponent>
        </Body>
      </Container>
    </Column>
  )
}

export default NewEmployee
