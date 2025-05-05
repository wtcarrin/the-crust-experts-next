"use client"

import { useCart } from "../context/CartContext"

export function CartCounter() {
  const { cartCount } = useCart()

  // Only show an indicator dot if there are items in the cart
  if (cartCount === 0) return null

  return <span className="absolute -top-2 -right-2 bg-red-600 h-3 w-3 rounded-full"></span>
}
