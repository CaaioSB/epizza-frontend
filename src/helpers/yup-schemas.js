import { useCallback } from 'react'

import * as yup from 'yup'
import ptBR from './locale-ptBR'

yup.setLocale(ptBR)

export const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        return {
          values,
          errors: {}
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )

export const loginSchema = yup.object().shape({
  email: yup.string().email('Insira um e-mail válido').required(),
  password: yup.string().required()
})

export const productSchema = yup.object().shape({
  title: yup.string().label('Título').required(),
  type: yup.string().label('Tipo do Produto').required(),
  description: yup.string().label('Descrição').required().max(200),
  urls: yup.array().label('Imagem'),
  slug: yup.string().label('Slug'),
  price: yup.number().label('Preço').required().moreThan(1),
  active: yup.boolean().label('Ativo'),
  ingredients: yup.array().label('Ingredientes').min(1)
})

export const employeeSchema = yup.object({
  name: yup.string().label('Nome').required(),
  role: yup.array().label('Cargo').required().min(1),
  genre: yup.number().label('Genêro').oneOf([0, 1], '${path} é um campo obrigatório').required(),
  email: yup.string().label('E-mail').email().required(),
  cpf: yup.string().label('CPF').required(),
  rg: yup.string().label('Registro Geral').required(),
  mobileNumber: yup.string().label('Telefone Celular').required(),
  cep: yup.string().label('CEP').required(),
  street: yup.string().label('Rua').required(),
  number: yup.string().label('Número').required(),
  neighborhood: yup.string().label('Bairro').required(),
  city: yup.string().label('Cidade').required(),
  state: yup.string().label('Estado').required(),
  active: yup.bool().label('Ativo'),
  password: yup
    .string()
    .label('Senha')
    .matches('.{8,}', 'A Senha deve conter pelo menos oito caracteres.')
    .matches('(?=.*?[A-Z])', 'A Senha deve conter pelo menos uma letra maiúscula.')
    .matches('(?=.*?[a-z])', 'A Senha deve conter pelo menos uma letra minúscula.')
    .matches('(?=.*?[0-9])', 'A Senha deve conter pelo menos uma número.')
})

export const roleSchema = yup.object({
  name: yup.string().label('Nome').required(),
  actions: yup.array().label('Permissões').required().min(1)
})
