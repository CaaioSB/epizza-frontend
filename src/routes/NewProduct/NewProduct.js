import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import Container from 'components/Container'
import Body from 'components/Body'
import Input from 'components/Input'
import InputFile from 'components/InputFile'
import Column, { ColumnResponsive } from 'components/Column'
import Select, { Option } from 'components/Select'
import ButtonComponent from 'components/Button'
import { useYupValidationResolver, productSchema } from 'helpers/yup-schemas'
import { postProducts } from 'services/product'

const NewProduct = ({ location: { state } }) => {
  const [productFile, setProductFile] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const resolver = useYupValidationResolver(productSchema)
  const { register, handleSubmit, control, errors } = useForm({
    resolver,
    defaultValues: state?.product
  })
  const history = useHistory()

  const onSubmit = async data => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('files', productFile)
    formData.append('slug', data.title.replace(' ', '-').toLowerCase())

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    try {
      const { data } = await postProducts(formData)
      toast.success(data.message)
      history.goBack()
    } catch (err) {
      toast.error('Ocorreu um erro, tente novamente mais tarde.')
      new Error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Body text={state?.product ? 'Editar Produto' : 'Novo Produto'}>
        <Column width='100%' as='form' onSubmit={handleSubmit(onSubmit)}>
          <ColumnResponsive>
            <Input
              error={errors?.title && errors?.title?.message}
              width='40%'
              name='title'
              register={register}
              control={control}
              placeholder='Nome do Produto'
            />
            <Input
              error={errors?.description && errors?.description?.message}
              name='description'
              register={register}
              control={control}
              placeholder='Descrição do Produto'
            />
          </ColumnResponsive>
          <ColumnResponsive>
            <Input
              error={errors?.ingredients && errors?.ingredients?.message}
              width='40%'
              name='ingredients'
              register={register}
              control={control}
              placeholder='Ingredientes'
            />
            <Input
              error={errors?.price && errors?.price?.message}
              width='30%'
              name='price'
              register={register}
              control={control}
              placeholder='Preço'
            />
            <Select register={register} control={control} name='type' width='30%'>
              <Option>Selecione o Tipo</Option>
              <Option value='pizza'>Pizza</Option>
              <Option value='bebibas'>Bebibas</Option>
              <Option value='marmitas'>Marmitas</Option>
            </Select>
          </ColumnResponsive>
          <ColumnResponsive>
            <InputFile
              error={errors?.urls && errors?.urls?.message}
              name='urls'
              register={register}
              control={control}
              placeholder='Anexe uma imagem para o produto'
              accept='image/*'
              onChange={evt => setProductFile(evt.target.files[0])}
            />
          </ColumnResponsive>
          <ButtonComponent type='submit' width={100} alignSelf='flex-end' isLoading={isLoading}>
            Salvar
          </ButtonComponent>
        </Column>
      </Body>
    </Container>
  )
}

export default NewProduct
