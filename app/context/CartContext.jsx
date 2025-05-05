"use client"

import { createContext, useContext, useState } from "react"

// Create the context
const CartContext = createContext({
  cartCount: 0,
  incrementCart: () => {},
  decrementCart: () => {},
  refreshCart: () => {},
})

// Provider component
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0)

  // Increment cart count (used when adding items)
  const incrementCart = () => {
    setCartCount((prevCount) => prevCount + 1)
  }

  // Decrement cart count (used when removing items)
  const decrementCart = () => {
    setCartCount((prevCount) => Math.max(0, prevCount - 1))
  }

  // Reset cart count (no API call)
  const refreshCart = () => {
    setCartCount(0)
  }

  return (
    <CartContext.Provider value={{ cartCount, incrementCart, decrementCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart context
export function useCart() {
  return useContext(CartContext)
}
