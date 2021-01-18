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
  name: yup.string().label('Nome').required()
  // role: yup.number().label('Cargo').required(),
  // genre: yup.number().label('Genêro').oneOf([0, 1]).required(),
  // email: yup.string().label('E-mail').email().required()
})
