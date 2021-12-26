import React, { createContext, useState, useContext, useEffect } from 'react'

import { distanceMatrixService } from 'helpers/helper'
import { customerSchema } from 'helpers/yup-schemas'

const OrderContext = createContext()

const useOrder = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

const OrderProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [customer, setCustomer] = useState({})
  const [order, setOrder] = useState({
    paymentsMethods: {},
    total: 0,
    shipping: { distance: '0 km', fare: 0 }
  })

  useEffect(() => {
    customerSchema.validate(customer, { abortEarly: false }).then(() => {
      const {
        address: { street, neighborhood, city, federativeUnit, cep }
      } = customer

      var companyOrigin = 'Alameda Rio Negro, 300 - Alphaville, Barueri - SP, 06454-000'
      const customerDestination = `${street} - ${neighborhood}, ${city} - ${federativeUnit}, ${cep}`

      distanceMatrixService([companyOrigin], [customerDestination], initMap)
    })
  }, [customer])

  const initMap = ({ rows }) => {
    try {
      const elements = rows[0]?.elements
      const {
        distance: { text: distance, value: meters }
      } = elements.find(element => element.status === 'OK')

      const fare = parseFloat(((meters / 1000) * 2).toFixed(2))

      setOrder({
        ...order,
        total: order?.total + fare,
        shipping: { distance: distance, fare }
      })
    } catch {
      console.log('Ocorreu um erro ao calcular a distância.')
    }
  }

  const appendProduct = productToAppend => {
    const hasProduct = products.some(product => product._id === productToAppend._id)
    setOrder({
      ...order,
      total: parseFloat((parseFloat(order.total) + parseFloat(productToAppend.price)).toFixed(2))
    })

    if (hasProduct) {
      return setProducts(
        products.map(product => {
          return product._id === productToAppend._id ? { ...product, quantity: product.quantity + 1 } : product
        })
      )
    }

    setProducts([...products, { ...productToAppend, quantity: 1 }])
  }

  const removeProduct = productToRemove => {
    setProducts(products.filter(product => product !== productToRemove))
  }

  const updateProduct = productToUpdade => {
    setProducts(
      producuts.filter(product => {
        if (product.id === productToUpdade) {
          return { ...product, ...productToUpdade }
        }
      })
    )
  }

  const cancelOrder = () => {
    setProducts([])
    setCustomer({})
    setOrder({
      paymentsMethods: {},
      total: 0,
      shipping: { distance: '0 km', fare: 0 }
    })
  }

  const saveOrder = () => {
    const newProducts = products?.map(({ _id, quantity, price }) => {
      return { _id, quantity, price, total: price * quantity }
    })

    const newOrder = {
      customerId: customer?._id,
      address: customer?.address,
      products: newProducts,
      ...order
    }
  }

  return (
    <OrderContext.Provider
      value={{
        products,
        customer,
        order,
        cancelOrder,
        saveOrder,
        setCustomer,
        setProducts,
        appendProduct,
        removeProduct,
        updateProduct
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export { OrderProvider, useOrder }
