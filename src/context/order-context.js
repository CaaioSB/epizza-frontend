import React, { createContext, useState, useContext } from 'react'

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
  const [order, setOrder] = useState({ paymentsMethods: {}, total: 0 })

  const appendProduct = productToAppend => {
    const hasProduct = products.some(product => product._id === productToAppend._id)
    setOrder({ ...order, total: (parseFloat(order.total) + parseFloat(productToAppend.price)).toFixed(2) })

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
    setOrder({ paymentsMethods: {}, total: 0 })
  }

  const saveOrder = () => {
    const newProducts = products?.map(({ _id, quantity, price }) => {
      return { _id, quantity, price, total: price * quantity }
    })

    const newOrder = { customerId: customer?._id, address: customer?.address, products: newProducts, ...order }

    console.log(newOrder)
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
