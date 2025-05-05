"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { deleteItemFromCart } from "../actions/deleteItemFromCart"
import { useCart } from "../context/CartContext" // Import the cart context

export function NewCartItem({ menuItem, sizes, cartItem, ingredients, mySize }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { decrementCart } = useCart() // Get the decrementCart function

  // Function to handle item deletion
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteItemFromCart(cartItem.nonce)
      // Update cart count immediately
      decrementCart()
    } catch (error) {
      console.error("Error deleting item:", error)
      setIsDeleting(false)
    }
  }

  // Get ingredient names for display
  const getIngredientNames = () => {
    if (!ingredients) return []

    return cartItem.ingredientIds
      .map((id) => {
        const ingredient = ingredients.find((ing) => ing.menu_item_id === id)
        return ingredient?.name
      })
      .filter((name) => name && !name.includes("Size")) // Filter out size ingredients
  }

  const ingredientNames = getIngredientNames()

  // Calculate item price
  const calculateItemPrice = () => {
    if (!ingredients) return 0

    let total = 0
    for (const id of cartItem.ingredientIds) {
      const ingredient = ingredients.find((ing) => ing.menu_item_id === id)
      if (ingredient) {
        total += ingredient.price
      }
    }
    return total
  }

  const itemPrice = calculateItemPrice()

  return (
    <div className="flex items-start gap-4">
      {/* Item image */}
      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
        {menuItem.photo_url ? (
          <img
            src={menuItem.photo_url || "/placeholder.svg"}
            alt={menuItem.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
        )}
      </div>

      {/* Item details */}
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium text-lg">{menuItem.name}</h3>
          <div className="font-semibold">${itemPrice.toFixed(2)}</div>
        </div>

        {/* Size badge */}
        <div className="mt-1">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Size: {mySize}
          </span>
        </div>

        {/* Ingredients list */}
        {ingredientNames.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            <p className="line-clamp-2">{ingredientNames.join(", ")}</p>
          </div>
        )}
      </div>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-gray-400 hover:text-red-600 transition-colors p-1"
        aria-label="Remove item"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  )
}
