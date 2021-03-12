import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import Container from 'components/Container'
import Body from 'components/Body'
import Column from 'components/Column'
import Row from 'components/Column'
import Input from 'components/Input'
import Select, { Option } from 'components/Select'
import Button from 'components/Button'
import HorizontalCard from 'components/HorizontalCard'
import IconButton from 'components/IconButton'

import { actions as allActions } from 'helpers/constants'
import { roleSchema, useYupValidationResolver } from 'helpers/yup-schemas'
import { postRole } from 'services/role'

const NewRole = ({ location: { state } }) => {
  const [actions, setActions] = useState(state?.role?.actions || [])
  const [isEdit, setIsEdit] = useState(false)
  const history = useHistory()

  const roleResolver = useYupValidationResolver(roleSchema)
  const {
    register,
    handleSubmit,
    control,
    errors,
    getValues,
    setValue,
    formState: { isSubmitting }
  } = useForm({ defaultValues: state?.role || { name: '', actions: [] }, resolver: roleResolver })

  useEffect(() => {
    if (state?.role) {
      setIsEdit(true)
      setValue('actions', state?.role?.actions)
    }
  }, [])

  const onSubmit = async data => {
    try {
      if (isEdit) {
        await postRole({ id: state.role._id, ...data })
        toast.success('As alterações foram salvas com sucesso.')
      }

      await postRole(data)
      toast.success('O cargo foi criado com sucesso.')

      history.goBack()
    } catch ({ response }) {
      toast.error(`Ocorreu um erro ao salvar as alterações. Tente novamente mais tarde. (${response.data.message})`)
    }
  }

  return (
    <Container>
      <Body text='Novo Cargo'>
        <Column as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='name'
            placeholder='Nome do Cargo'
            error={errors?.name?.message}
            register={register}
            control={control}
          />
          <Input
            style={{ display: 'none' }}
            register={register}
            control={control}
            onChange={e => {
              const currentValue = e.target.value

              // Se houver "actions" definidas como string, converta para array.
              if (typeof currentValue === 'string') {
                setValue('actions', [...currentValue.split(',')])
              }
            }}
            name='actions'
            placeholder='Permissões'
          />
          <Select
            error={errors?.actions?.message}
            onChange={e => {
              const currentValue = getValues('actions')
              setActions(currentValue.concat(e.target.value))

              // Se não haver "actions" adicionadas, adiciona a primeira.
              if (currentValue === undefined) {
                return setValue('actions', [e.target.value])
              }

              // Se já houver "actions", incremente a selecionada.
              if (Array.isArray(currentValue)) {
                return setValue('actions', [...currentValue, e.target.value])
              }

              // Se houver "actions" definidas como string, converta para array e adicione a nova.
              if (typeof currentValue === 'string') {
                return setValue('actions', [...currentValue.split(','), e.target.value])
              }
            }}
          >
            <Option>Permissões (listadas abaixo)</Option>
            {allActions.map(action => {
              if (!actions?.includes(action['name'])) {
                return <Option value={action.name}>{action.label}</Option>
              }
            })}
          </Select>
          <Column mb={5}>
            {Array.isArray(actions) ? (
              actions?.map(action => {
                const { 0: actionData } = allActions.filter(currentAction => currentAction['name'] === action)

                return (
                  <Row width='100%' my={5}>
                    <HorizontalCard
                      name={actionData?.label}
                      action={
                        <IconButton
                          type='button'
                          m={0}
                          icon='X'
                          color='secondary'
                          onClick={() => {
                            const currentActions = getValues('actions')

                            setValue(
                              'actions',
                              currentActions.filter(appendedAction => appendedAction !== actionData['name'])
                            )

                            return setActions(getValues('actions'))
                          }}
                        />
                      }
                    />
                  </Row>
                )
              })
            ) : (
              <HorizontalCard isLoading />
            )}
          </Column>
          <Button width={100} alignSelf='flex-end'>
            Salvar
          </Button>
        </Column>
      </Body>
    </Container>
  )
}

export default NewRole
