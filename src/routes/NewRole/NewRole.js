import React, { useState, Fragment } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
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
import { postRole, putRole } from 'services/role'

const NewRole = ({ location: { state } }) => {
  const [isEdit] = useState(state?.role !== undefined)
  const history = useHistory()
  const roleResolver = useYupValidationResolver(roleSchema)

  const { register, handleSubmit, control, errors } = useForm({
    resolver: roleResolver,
    defaultValues: {
      ...state?.role,
      actions: allActions.filter(action => state?.role.actions.includes(action.name))
    }
  })

  const { fields: actions, append, remove } = useFieldArray({ control, name: 'actions' })

  const onSubmit = async data => {
    try {
      if (isEdit) {
        await putRole({
          ...data,
          id: state.role._id,
          actions: data?.actions.map(action => action.name)
        })
        toast.success('As alterações foram salvas com sucesso.')
      }

      await postRole({
        ...data,
        actions: data?.actions.map(action => action.name)
      })
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
          <Select
            error={errors?.actions?.message}
            onChange={e => {
              const { options, value } = e.target
              append({
                name: value,
                label: options[options.selectedIndex].label
              })
            }}
          >
            <Option>Permissões (listadas abaixo)</Option>
            {allActions.map(action => {
              if (!actions.some(selectedAction => selectedAction.name === action.name)) {
                return <Option value={action.name}>{action.label}</Option>
              }
            })}
          </Select>
          <Column mb={18}>
            {Array.isArray(actions) ? (
              actions?.map((action, index) => {
                return (
                  <Fragment>
                    <Row key={action.id} width='100%' my={5}>
                      <HorizontalCard
                        name={action?.label}
                        action={
                          <IconButton type='button' m={0} icon='X' color='secondary' onClick={() => remove(index)} />
                        }
                      />
                    </Row>

                    <Input
                      style={{ display: 'none' }}
                      control={control}
                      name={`actions[${index}].name`}
                      defaultValue={`${action?.name}`}
                    />
                    <Input
                      style={{ display: 'none' }}
                      control={control}
                      name={`actions[${index}].label`}
                      defaultValue={`${action?.label}`}
                    />
                  </Fragment>
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
